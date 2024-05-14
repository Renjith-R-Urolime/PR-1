import { Pipe, PipeTransform } from '@angular/core';
import { RenamedTabs } from 'src/app/_metronic/layout/components/aside/tabs';

@Pipe({
  name: 'renameValue'
})
export class RenameValuePipe implements PipeTransform {

  transform(value: any): any {

    if( RenamedTabs[value] ){
      value = RenamedTabs[value]
    }

    return value;
  }

}
