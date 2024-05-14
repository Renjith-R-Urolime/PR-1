import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { format, parse } from 'date-fns';
import { SharedService } from '../../services/shared.service';
@Component({
  selector: 'app-input-time-field',
  templateUrl: './input-time-field.component.html',
  styleUrls: ['./input-time-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTimeFieldComponent),
      multi: true
    }
  ]
})
export class InputTimeFieldComponent implements OnInit, ControlValueAccessor {
  theme: string = this.sharedService.getTheme();
  hourValue: string = '01';
  minuteValue: string = '00';
  timeValue: string;
  showDropdown = false;
  hourTimeArray: any
  minTimeArray: any
  hourArrayIndex: any = 0
  minuteArrayIndex: any = 0
  @Input() isDisabled : boolean = true;
  @Input() format: any = '12'; // Set the initial format to 'twelw'
  @Output() valueConfirmed: EventEmitter<any> = new EventEmitter();
  onChange: (Value: any) => void;
  onTouch: any = () => { }
  selectedMeridien: string = 'AM';

  constructor(public sharedService: SharedService, private elementRef: ElementRef, private cdRef: ChangeDetectorRef,) {
  }

  buildHourArray(format): string[] {
    if (format === 12) {
      return Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    } else if (format === 24) {
      return Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    } else {
      throw new Error("Invalid format. Supported formats are 12 and 24.");
    }
  }


  buildMinuteArray(): string[] {
    return Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
  }


  writeValue(value: any) {

    if (value) {
      if (this.format === '12') {
        // Convert the 24-hour time to 12-hour format
        const parsedDate = parse(value, 'HH:mm', new Date());
        this.hourValue = format(parsedDate, 'hh');
        this.hourArrayIndex = parseInt(this.hourValue) > 12 ? parseInt(this.hourValue) - 13 : parseInt(this.hourValue) - 1;
        this.minuteValue = format(parsedDate, 'mm');
        this.minuteArrayIndex = parseInt(this.minuteValue)
        this.selectedMeridien = format(parsedDate, 'a').toUpperCase();
        this.timeValue = `${this.hourValue}:${this.minuteValue} ${this.selectedMeridien}`;
      } else if (this.format === '24') {
        // Use 24-hour time as is
        const [hour, minute] = value.split(':');
        this.hourValue = hour;
        this.minuteValue = minute;
        this.timeValue = `${this.hourValue}:${this.minuteValue}`;
        this.hourArrayIndex = parseInt(this.hourValue)
        this.minuteArrayIndex = parseInt(this.minuteValue)
      }
    }
  }


  @HostListener('wheel', ['$event'])
  onScroll(event: WheelEvent): void {
    const scrollableDiv = document.getElementById('scrollableDiv');
    const newScrollTop = scrollableDiv.scrollTop + event.deltaY;
    scrollableDiv.scrollTop = newScrollTop;
    event.preventDefault();
  }



  newSelectionEventHour(event) {
    this.hourArrayIndex = parseInt(event)
    this.hourValue = this.hourTimeArray[event]
    this.onConfirm()
  }

  newSelectionEventMinutes(event) {
    this.minuteArrayIndex = parseInt(event)
    this.minuteValue = this.minTimeArray[event]
    this.onConfirm()
  }


  registerOnChange(fn: any) {
    this.onChange = fn; // Save the callback function provided by Angular
  }
  registerOnTouched(fn: any) {
    this.onTouch = fn; // Save the callback function for when the input is touched
  }
  ngOnInit(): void {
    if (parseInt(this.format) == 12) {
      this.hourTimeArray = this.buildHourArray(12);
    }
    else {
      this.hourTimeArray = this.buildHourArray(24);
    }
    this.minTimeArray = this.buildMinuteArray()
  }

  toggleMeridien(selectedValue: string) {
    this.selectedMeridien = selectedValue;
    this.onConfirm()
  }
  toggleDropdown() {
    if(this.isDisabled){
      this.showDropdown = !this.showDropdown;
    }
  }
  onDiscard() {
    // this.showDropdown = false;
    this.hourValue = ''; // Clear the hour input
    this.minuteValue = ''; // Clear the minute input
    this.timeValue = '';
    this.toggleDropdown();
    this.valueConfirmed.emit(false);
  }

  onConfirm() {

    this.valueConfirmed.emit(true);
    if (!this.hourValue) {
      this.hourValue = '00';
    }
    if (!this.minuteValue) {
      this.minuteValue = '00';
    }

    if (this.format === '12') {
      const timeString = this.hourValue + ':' + this.minuteValue + ' ' + this.selectedMeridien;
      this.timeValue = timeString


      const date = parse(timeString, 'h:mm a', new Date());
      const formattedTime = format(date, 'HH:mm');

      this.onChange(formattedTime)

    } else {
      this.timeValue = `${this.hourValue}:${this.minuteValue}`;

      this.onChange(this.timeValue)
    }
    // this.toggleDropdown();
    this.cdRef.detectChanges();
  }

  @HostListener('document:click', ['$event'])
  closeDropdownOnClickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }


  zeroFormatting(event, type) {
    let value = event?.target?.value || event
    value = parseInt(value.replace(/\D/g, '').substring(0, 2), 10);
    if (value < 10) {
      if (type === 'hr') {
        this.hourValue = `0${value}`
      } else if (type === 'min') {
        this.minuteValue = `0${value}`
      }
    }
  }

}
