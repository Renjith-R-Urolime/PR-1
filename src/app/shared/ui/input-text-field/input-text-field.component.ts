import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { capitalCase } from 'change-case-all';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-input-text-field',
  templateUrl: './input-text-field.component.html',
  styleUrls: ['./input-text-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextFieldComponent),
      multi: true,
    },
  ],
})
export class InputTextFieldComponent implements ControlValueAccessor {

  inputValue: boolean | string | number | GLfloat;
  theme: string = this.sharedService.getTheme();
  isFocused: boolean = false;
  afterDecimal: number = 2;
  @Input() maxLength: any = Infinity;
  @Input() minLength: any = Infinity;
  @Input() emailVerify: boolean = false;
  @Input() isVisible: boolean = true;
  @Input() patchValue: string;
  @Input() isFieldDisabled: boolean = false;
  @Input() type: string = 'text';
  @Input() placeholder: any = capitalCase('Enter ' + this.type);
  @Input() ngClass: any;
  @Input() name: string;
  @Input() min: any = 0;
  @Input() max: any = Infinity;
  @Input() isLableDisabled: boolean = false;
  @Input() digitBeforeDecimal: number = Infinity;
  @Input() digitAfterDecimal: number;
  @Input() radioBtnID: number | string;
  @Output() inputValueChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() inputBlurChange: EventEmitter<any> = new EventEmitter<any>();



  constructor(private sharedService: SharedService, private route: ActivatedRoute) { }
  // ControlValueAccessor methods
  writeValue(value: any): void {
    if (this.type === 'url') {
      value?.startsWith('https://') ? this.inputValue = value?.substring(8) : value;
    }
    else {
      this.inputValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }


  onInput(event: Event) {
    if (this.type === 'number' || this.type === 'height' || this.type === 'weight' || this.type === 'decimal') {
      this.onNumberRestrict(event)
    }
    const inputValue = (event.target as HTMLInputElement).value;
    // You can add any additional logic or validation here
    this.inputValueChange.emit(inputValue); // Emit the value to the parent component

  }

  onKeyDown(event: KeyboardEvent): void {
    // Check if the pressed key is 'e' or 'E'
    if (event.key.toLowerCase() === 'e' || event.key.toLowerCase() === '-' || event.key.toLowerCase() === '+') {
      // Prevent the default action (i.e., prevent typing 'e')
      event.preventDefault();
    }
  }

  // setDisabledState(isDisabled: boolean): void {
  //   if(isDisabled !== undefined){
  //       this.isFieldDisabled = isDisabled
  //   }
  //   // Implement this method if you want to handle the component's disabled state.
  // }

  // Custom change handler
  onChange(value: any): void {
    this.inputValue = value;
  }

  // Custom touch handler
  onTouched(): void {
    // You can add custom touch behavior here if needed.
  }
  setValue(event) {
    this.isFocused = false
    let text;
    let value = event?.target?.value;
    if (this.type === 'url') {
      text = 'https://' + value
    } else {
      text = value
    }
    this.onChange(text)
    this.inputBlurChange.emit(text); // Emit the value to the parent component
  }

  onInputFocus() {
    this.isFocused = true;
  }

  onAmountInput(event) {

    // Remove non-numeric characters
    let value = event.target.value.replace(/[^0-9.]/g, '');
    //check for max value
    if (event.target.value > this.max) {
      event.target.value = this.max;
    }
    //check for min value
    else if (event.target.value < this.min) {
      event.target.value = this.min;
    }
    else {
      let valueBefore;
      let valueAfter;
      if (value.includes('.')) {
        valueBefore = value.split('.')[0]
        valueAfter = value.split('.')[1]
      }
      else {
        valueBefore = value;

      }
      if (valueBefore) {
        if (this.digitBeforeDecimal) {
          if (valueBefore && valueBefore.length > this.digitBeforeDecimal) {
            valueBefore = valueBefore.slice(0, this.digitBeforeDecimal);
            event.target.value = valueBefore;
          }
        }
        else {
          if (valueBefore && valueBefore.length > this.sharedService.numberOfDigitSBeforeDecimal) {
            valueBefore = valueBefore.slice(0, this.sharedService.numberOfDigitSBeforeDecimal);
            event.target.value = valueBefore;
          }
        }
      }
      if (valueAfter) {
        if (this.digitAfterDecimal) {
          if (valueAfter.length > this.digitAfterDecimal) {
            valueAfter = valueAfter.slice(0, this.digitAfterDecimal);
            event.target.value = valueBefore + '.' + valueAfter;
          }
          else {
            event.target.value = valueBefore + '.' + valueAfter;
          }
        }
        else {
          if (valueAfter.length > this.sharedService.numberOfDigitAftereDecimal) {
            valueAfter = valueAfter.slice(0, this.sharedService.numberOfDigitAftereDecimal);
            event.target.value = valueBefore + '.' + valueAfter;
          }
          else {
            event.target.value = valueBefore + '.' + valueAfter;
          }
        }
      }
    }
  }

  toggleCheckbox(value) {

    this.inputValue = value;
    this.onChange(value);
    // You can add any additional logic or validation here
    this.inputValueChange.emit(this.inputValue); // Emit the value to the parent component
  }

  onRadioBtnSelected() {
    this.inputValue = this.radioBtnID;
    this.onChange(this.radioBtnID);
    this.inputValueChange.emit(this.inputValue);
  }

  restrictInputLength(event: any): void {
    let inputValue = event.target.value;
  }
  onNumberRestrict(event) {
    if (this.type === 'number') {
      let value = event.target.value.replace(/[^\d]/g, '');

      //check for maxValue
      if (event.target.value > this.max) {
        let temp = Number(event.target.value.slice(0, String(this.max).length));
        if (temp > this.max) {
          event.target.value = this.max;
        } else {
          event.target.value = temp;
        }
      }

      //check for minValue
      if (event.target.value < this.min) {


        event.target.value = this.min;
      }

      //check for maximum digits
      if (String(event.target.value).length > this.maxLength) {
        event.target.value = Number(event.target.value.slice(0, this.maxLength))
      }

      //check for minimum digits
      // if (String(event.target.value).length < this.minLength) {
      //   event.target.value = Number(event.target.value.slice(0, this.maxLength))
      // }

    }
    else {
      let value = event.target.value.replace(/[^\d.]/g, '');
      //check for max value
      if (event.target.value > this.max) {
        event.target.value = this.max;
      }
      //check for min value
      else if (event.target.value < this.min) {
        event.target.value = this.min;
      }
      else {
        let valueBefore;
        let valueAfter;
        if (value.includes('.')) {
          valueBefore = value.split('.')[0]
          valueAfter = value.split('.')[1]
        }
        else {
          valueBefore = value;

        }
        if (valueBefore) {
          if (this.digitBeforeDecimal) {
            if (valueBefore && valueBefore.length > this.digitBeforeDecimal) {
              valueBefore = valueBefore.slice(0, this.digitBeforeDecimal);
              event.target.value = valueBefore;
            }
          }
          else {
            if (valueBefore && valueBefore.length > this.sharedService.numberOfDigitSBeforeDecimal) {
              valueBefore = valueBefore.slice(0, this.sharedService.numberOfDigitSBeforeDecimal);
              event.target.value = valueBefore;
            }
          }
        }
        if (valueAfter) {
          if (this.digitAfterDecimal) {
            if (valueAfter.length > this.digitAfterDecimal) {
              valueAfter = valueAfter.slice(0, this.digitAfterDecimal);
              event.target.value = valueBefore + '.' + valueAfter;
            }
            else {
              event.target.value = valueBefore + '.' + valueAfter;
            }
          }
          else {
            if (valueAfter.length > this.sharedService.numberOfDigitAftereDecimal) {
              valueAfter = valueAfter.slice(0, this.sharedService.numberOfDigitAftereDecimal);
              event.target.value = valueBefore + '.' + valueAfter;
            }
            else {
              event.target.value = valueBefore + '.' + valueAfter;
            }
          }
        }
      }
    }

  }
}
