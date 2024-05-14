import { Pipe, PipeTransform } from '@angular/core';
import Decimal from 'decimal.js';

@Pipe({
  name: 'decimalFormat'
})
export class DecimalFormatPipe implements PipeTransform {

    defaultDeciamlPlaces: number = 2;
    transform(value: number, decimalPlaces: number): string {
        const decimalValue = new Decimal(value);
        return decimalValue.toFixed(decimalPlaces || this.defaultDeciamlPlaces);
    }
}
