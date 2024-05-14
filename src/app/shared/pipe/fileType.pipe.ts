import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileType'
})
export class FileTypePipe implements PipeTransform {
  transform(fileName: string): string | null {
    if (fileName) {
      const allowedImageTypes = ['jpeg', 'jpg', 'png', 'tiff', 'svg', 'webp'];
      const fileExtension = fileName.split('.').pop()?.toLowerCase();


      if (fileExtension && allowedImageTypes.includes(fileExtension)) {
        return 'image';
      } else {
        return fileExtension || null;
      }
    }

    return null;
  }
}