import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToJson'
})
export class DateToJsonPipe implements PipeTransform {

  transform(value: string): any {
    if (!value) {
      return null;
    }

    const dateFormats = ['yyyy/MM/dd', 'dd/MM/yyyy']; // Add more formats as needed

    for (const format of dateFormats) {
      const parsedDate = this.tryParseDate(value, format);
      if (parsedDate) {

        return parsedDate;
      }
    }

    console.error('Invalid date format. Supported formats are:', dateFormats.join(', '));
    return null;
  }

  private tryParseDate(value: string, format: string): any {
    const parts = value.split(/[\/\-]/);
    const formatParts = format.split(/[\/\-]/);

    if (parts.length === formatParts.length) {
      const dateInfo: any = {};
      for (let i = 0; i < formatParts.length; i++) {
        const part = formatParts[i].toLowerCase();
        if (part.includes('y')) {
          dateInfo.year = parseInt(parts[i], 10);
        } else if (part.includes('m')) {
          dateInfo.month = parseInt(parts[i], 10);
        } else if (part.includes('d')) {
          dateInfo.day = parseInt(parts[i], 10);
        }
      }

      return dateInfo;
    }

    return null;
  }
}
