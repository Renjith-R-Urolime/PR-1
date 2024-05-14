import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {

  transform(arr: any[], prop: string): number {
    if (!Array.isArray(arr) || arr.length === 0) {
      return 0;
    }
    return arr.reduce((total, item) => total + item[prop], 0);
  }

}
