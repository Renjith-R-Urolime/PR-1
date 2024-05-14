import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchHighlight'
})
export class SearchHighlightPipe implements PipeTransform {
  transform(value: string, searchText: string): string {
    if (!searchText || !value) {
      return value;
    }
    const index = value.toLowerCase().indexOf(searchText.toLowerCase());
    if (index === -1) {
      return value;
    }
    const partOne = value.substring(0, index);
    const partTwo = value.substring(index, index + searchText.length);
    const partThree = value.substring(index + searchText.length);
    return `${partOne}<span class="text-black">${partTwo}</span>${partThree}`;
  }
}
