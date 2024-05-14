import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date | string | null | undefined): string {
    if (!value) return '';
    const timestamp = new Date(value);
    return (formatDistanceToNow(timestamp, { addSuffix: true })).replace('about ', '');
  }


}
