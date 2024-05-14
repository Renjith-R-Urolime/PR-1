import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: string[], property?: string, args?:any): string[] {
    switch(args){
      case 'alphabeticalOrder':
        if (!Array.isArray(array)) {
          return array;
        }

        if (array && array.length > 0) {
          return array.sort((a, b) => {
              const idA = parseInt(a['id']);
              const idB = parseInt(b['id']);

              if (idA > 0 && idB > 0) {
                  return a[property].localeCompare(b[property]);
              } else if (idA > 0) {
                  return -1;
              } else if (idB > 0) {
                  return 1;
              } else {
                  return 0;
              }
          });
      }
        break;
    }
  }
}
