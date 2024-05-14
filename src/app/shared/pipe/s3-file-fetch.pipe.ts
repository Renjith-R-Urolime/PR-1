import { Pipe, PipeTransform } from '@angular/core';
import { S3UploadService } from '../services/s3-upload.service';

@Pipe({
  name: 's3FileFetch'
})
export class S3FileFetchPipe implements PipeTransform {

  constructor(private s3service: S3UploadService) { }

  async transform(value: string, type = 'url', ...args: unknown[]): Promise<any> {
    if (!value || value === 'Null') return null;

    try {
      if (type === 'base64') {
        const file = await this.s3service.getFile(value);
        return file ? file.base64Data : null;
      } else if (type === 'url') {
        const url = await this.s3service.generatePreSignedURL(value);
        return url || null;
      }
    } catch (error) {
      console.error('An error occurred:', error);
      return null;
    }
  }
}