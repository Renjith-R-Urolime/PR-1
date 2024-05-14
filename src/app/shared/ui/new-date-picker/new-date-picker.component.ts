import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'input-date-picker',
  templateUrl: './new-date-picker.component.html',
  styleUrls: ['./new-date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NewDatePickerComponent),
      multi: true,
    },
  ],
})
export class NewDatePickerComponent {

  myDateValue: string | number | Date;
  @Output() inputValueChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() dateChange = new EventEmitter<string>();

  datePickerConfig: Partial<BsDatepickerConfig>
  @Output() dateSelected = new EventEmitter<String>();
  // myDateValue: Date;
  theme: string = this.sharedService.getTheme();
  @Input() initialDate: string; // Input property to receive the initial date from the parent
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  @Input() maxDate: Date;
  @Input() minDate: Date;
  @Input() isDisabled:boolean=false;


  constructor(public sharedService: SharedService, private cdRef: ChangeDetectorRef) {
    this.datePickerConfig = {
      showWeekNumbers: false,
      value: null,
      containerClass:'calendar-'+this.theme,
      dateInputFormat: 'YYYY/MM/DD',
      customTodayClass:'today'
      // containerClass: this.colorTheme
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.maxDate && !changes.maxDate.firstChange){
      this.maxDate = new Date(changes.maxDate.currentValue)
    }
    if(changes.minDate && !changes.minDate.firstChange){
      this.minDate = new Date(changes.minDate.currentValue)
    }
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    if (this.initialDate) {
      this.myDateValue = new Date(this.initialDate);
    }
  }

  onDateChange(newDate: Date) {
    const formattedDate = this.formatDate(newDate);
    this.onChange(formattedDate);
    this.onTouched();

    this.dateSelected.emit(formattedDate);
  }

  writeValue(value: string): void {
    if(this.maxDate){
      this.maxDate = new Date(this.maxDate)
    }
    if(this.minDate){
      this.minDate = new Date(this.minDate)
    }
    if (value) {
      this.myDateValue = new Date(value);
    } else {
      this.myDateValue = null;
    }

    this.cdRef.detectChanges();
  }
  onInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    // You can add any additional logic or validation here
    this.inputValueChange.emit(inputValue); // Emit the value to the parent component
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implement if you need to handle disabled state
  }

  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}/${month}/${day}`;
  }


  formateDate(event){
    const regex =  /^[0-9\/]*$/  ;
    const  value = event.target.value;
    if(!regex.test (value )) {
      event.target.value = value. slice( 0 , -1 );
    // Remove the last character
        }
  }


}
