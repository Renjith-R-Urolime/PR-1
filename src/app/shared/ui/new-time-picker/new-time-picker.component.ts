import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { format, parse } from 'date-fns';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-new-time-picker',
  templateUrl: './new-time-picker.component.html',
  styleUrls: ['./new-time-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NewTimePickerComponent),
      multi: true
    }
  ]
})
export class NewTimePickerComponent implements ControlValueAccessor {
  @ViewChild('dropdownContainerHour') dropdownContainerHour: ElementRef;
  @ViewChild('dropdownContainerMinute') dropdownContainerMinute: ElementRef;
  theme: string = this.sharedService.getTheme();
  isFocused: boolean = false;
  // showDropdown: boolean;
  hourValue: string;
  minuteValue: string;
  timeValue: string;
  valueConfirmed: any;
  showDropdown: boolean = false;
  // timeValue: string = '';
  hours: string[] = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  minutes: string[] = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
  selectedPeriod: string;
  selectedHour: string;
  selectedMinute: string;
  outputValue: string;
  timevalue: string;
  selectedMeridien: string
  @Output() inputValueChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() isDisabled: any = false;
  @Input() isTimeIntervalMode: boolean = false;
  onChange: (Value: any) => void;
  onTouched: () => void;
  @Input() timeFormat: any = 'HH-MM AM/PM';
  maxLength: number;


  constructor(public sharedService: SharedService, private cdRef: ChangeDetectorRef, private elementRef: ElementRef,) {
  }
  onDiscard() {
    // this.showDropdown = false;
    this.hourValue = ''; // Clear the hour input
    this.minuteValue = ''; // Clear the minute input
    this.timeValue = '';
    this.toggleDropdown();
    this.valueConfirmed.emit(false);
  }
  ngOnInit(): void {
    if (this.isTimeIntervalMode) {
      this.hours = Array.from({ length: 11 }, (_, i) => (i + 1).toString().padStart(2, '0'));
      this.hours.unshift("00");
    }

  }

  onManualInput(event: Event) {
    console.log("this working second");

    // Parse the manually entered time value
    const parts = this.timeValue.split(/[\s:|-]+/);
    // Update selected values based on manual input
    let hour = parts[0];
    let minute = parts[1];
    let period = parts[2]?.toUpperCase();


    // If the format is HH:MM or HH-MM, convert to 24-hour format
    // if (this.timeFormat.includes('HH:MM') || this.timeFormat.includes('HH-MM')) {
    //   // If the period is PM and hour is not 12, add 12 to hour
    //   if (period === 'PM' && hour !== '12') {
    //     hour = (parseInt(hour) + 12).toString();
    //   }
    //   // If the period is AM and hour is 12, set hour to 00
    //   if (period === 'AM' && hour === '12') {
    //     hour = '00';
    //   }
    // }
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const inputLength = inputValue.length;
    if (this.timeFormat.includes('AM/PM')) {
      this.maxLength = 8;
      if (parseInt(hour) > 12) {
        this.timeValue = '12' + this.timeValue.slice(2); // Update timeValue instead of inputElement.value
        hour = '12'; // Limit hour to 12
      }
      if (parseInt(minute) > 59) {
        this.timeValue = this.timeValue.slice(0, 3) + '59'; // Update timeValue instead of inputElement.value
        minute = '59'; // Limit minute to 59
      }
    }
    else {
      this.maxLength = 5;
      if (parseInt(hour) > 23) {
        inputElement.value = '24' + inputElement.value.slice(2);
        hour = '24'; // Limit hour to 23
      }
      if (parseInt(minute) > 59) {
        this.timeValue = this.timeValue.slice(0, 3) + '59'; // Update timeValue instead of inputElement.value
        minute = '59'; // Limit minute to 59
      }
    }
    console.log(hour, minute, period)
    // Update selected values
    this.selectedHour = hour;
    this.selectedMinute = minute;
    this.selectedPeriod = period;

    console.log(this.outputValue)
    // this.inputValueChange.emit(this.outputValue);
    this.getFormattedTime24();
    // Update the dropdown to reflect manual input
    this.updateDropdown();
  }



  scrollDropdownToHighlightedItem(): void {
    if (this.dropdownContainerHour && this.dropdownContainerHour.nativeElement && this.dropdownContainerMinute && this.dropdownContainerMinute.nativeElement) {
      const dropdownContainerHour = this.dropdownContainerHour.nativeElement;
      const dropdownContainerMinute = this.dropdownContainerMinute.nativeElement;

      let scrollHour
      let scrollMinute

      scrollHour = dropdownContainerHour.querySelector(`[data-hour="${this.selectedHour}"]`);

      scrollMinute = dropdownContainerMinute.querySelector(`[data-minute="${this.selectedMinute}"]`);


      if (scrollHour) {
        const containerRect = dropdownContainerHour.getBoundingClientRect();
        const itemRect = scrollHour.getBoundingClientRect();
        const scrollTop = dropdownContainerHour.scrollTop;
        const itemTopRelativeToContainer = itemRect.top - containerRect.top;
        const itemBottomRelativeToContainer = itemRect.bottom - containerRect.top;
        if (itemBottomRelativeToContainer > containerRect.height) {

          dropdownContainerHour.scrollTop = scrollTop + itemTopRelativeToContainer;

        }
      }


      if (scrollMinute) {
        const containerRect = dropdownContainerMinute.getBoundingClientRect();
        const itemRect = scrollMinute.getBoundingClientRect();
        const scrollTop = dropdownContainerMinute.scrollTop;
        const itemTopRelativeToContainer = itemRect.top - containerRect.top;
        const itemBottomRelativeToContainer = itemRect.bottom - containerRect.top;
        if (itemBottomRelativeToContainer > containerRect.height) {

          dropdownContainerMinute.scrollTop = scrollTop + itemTopRelativeToContainer;

        }
      }
    }
  }


  updateDropdown() {
    // Validate selectedHour
    if (this.selectedHour && (+this.selectedHour < 1 || +this.selectedHour > 24)) {
      this.selectedHour = null; // Reset if it's out of bounds
    }

    // Validate selectedMinute
    if (this.selectedMinute && (+this.selectedMinute < 0 || +this.selectedMinute > 59)) {
      this.selectedMinute = null; // Reset if it's out of bounds
    }

    // If selectedHour is greater than 12, convert it to 12-hour format and set period to PM
    if (this.selectedHour && (+this.selectedHour > 12)) {
      this.selectedHour = (parseInt(this.selectedHour) - 12).toString().padStart(2, '0');
      this.selectedPeriod = 'PM';
    } else {
      // If selectedHour is in the range 01-12, pad with leading zero if necessary
      this.selectedHour = this.selectedHour.padStart(2, '0');
    }

    // Update the dropdown values
    this.hours = Array.from({ length: 12 }, (_, i) => {
      const hour = (i + 1).toString().padStart(2, '0'); // Hours in the range 01-12
      return hour;
    });
    this.minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
  }


  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    if (this.showDropdown == true) {
      if (this.showDropdown) {
        setTimeout(() => {
          this.scrollDropdownToHighlightedItem();
        }, 10);
      }
    }

  }

  selectHour(hour: string) {
    this.selectedHour = hour;
    this.timeValue = this.formatTime();
    this.onChange(this.getFormattedTime24())
    this.cdRef.detectChanges();
    this.scrollToSelected(this.dropdownContainerHour.nativeElement);
  }

  selectMinute(minute: string) {
    this.selectedMinute = minute;
    this.timeValue = this.formatTime();
    this.onChange(this.getFormattedTime24())
    this.cdRef.detectChanges();
    this.scrollToSelected(this.dropdownContainerMinute.nativeElement);
  }

  scrollToSelected(container: HTMLElement) {
    const selectedOption = container.querySelector('.bg-' + this.theme); // Adjust selector based on your highlighting class
    if (selectedOption) {
      if (this.isHTMLElement(selectedOption)) { // Custom type guard function
        const selectedOptionAsHTMLElement = selectedOption as HTMLElement;
        const selectedOptionHeight = selectedOptionAsHTMLElement.offsetHeight;
        const containerHeight = container.clientHeight;
        const selectedOptionTop = selectedOptionAsHTMLElement.offsetTop;

        // Ensure at least some scrolling even for partially visible items
        const scrollAmount = Math.max(0, selectedOptionTop - containerHeight / 5); // Minimum scroll to make it visible at the top

        // Refined scrolling logic for optimal behavior
        if (selectedOptionTop > containerHeight) { // Selected item entirely below viewport
          container.scrollTop = selectedOptionTop;
        } else if (selectedOptionTop + selectedOptionHeight > containerHeight) { // Selected item partially below viewport
          container.scrollTop = selectedOptionTop - (containerHeight - selectedOptionHeight); // Scroll to fully reveal the selected item
        } else { // Selected item already partially visible
          container.scrollTop = scrollAmount; // Minor scroll for visual alignment
        }
      }
    }
  }

  isHTMLElement(element: Element): element is HTMLElement {
    return element instanceof HTMLElement;
  }

  selectPeriod(period: string) {
    this.selectedPeriod = period === this.selectedPeriod ? null : period;
    this.timeValue = this.formatTime();
    this.showDropdown = false; // Close the dropdown
    this.onChange(this.getFormattedTime24())
  }

  formatTime(): string {
    if (this.isTimeIntervalMode) {
      const formattedHour = this.selectedHour || '00';
      const formattedMinute = this.selectedMinute || '00';

      // Return time in the format "HH-MM"
      return `${formattedHour}-${formattedMinute}`;
    } else {
      const formattedHour = this.selectedHour || '12';
      const formattedMinute = this.selectedMinute || '00';
      const period = this.selectedPeriod || 'AM';

      // Check the desired format and format the time accordingly
      switch (this.timeFormat) {
        case 'HH-MM AM/PM':
          // Return time in the format "HH-MM AM/PM"
          return `${formattedHour}-${formattedMinute} ${period}`;
        case 'HH-MM':
          // Return time in the format "HH-MM"
          return `${formattedHour}-${formattedMinute}`;
        case 'HH:MM AM/PM':
          // Return time in the format "HH:MM AM/PM"
          return `${formattedHour}:${formattedMinute} ${period}`;
        case 'HH:MM':
          // Return time in the format "HH:MM"
          return `${formattedHour}:${formattedMinute}`;
        case 'HH:PM':
          // Return time in the format "HH:PM"
          return `${formattedHour}:${period}`;
        default:
          // Default to returning time in "HH:MM AM/PM" format
          return `${formattedHour}:${formattedMinute} ${period}`;
      }
    }
  }

  onConfirm() {
    this.showDropdown = false; // Close the dropdown
  }

  writeValue(value: string): void {
    if (typeof value === 'string' && value.match(/^\d{2}:\d{2}:\d{2}$/)) {
      value = value.slice(0, -3); // Trim the last three characters
    }

    if (value) {
      if (this.isTimeIntervalMode) {
        let [hours, minutes] = value.split(':');
        this.selectedHour = hours;
        this.selectedMinute = minutes;
        this.timeValue = value;
      } else {
        const parsedDate = parse(value, 'HH:mm', new Date());
        this.selectedHour = format(parsedDate, 'hh');
        this.selectedMinute = format(parsedDate, 'mm');
        this.selectedPeriod = format(parsedDate, 'a').toUpperCase();

        switch (this.timeFormat) {
          case 'HH-MM AM/PM':
            this.timeValue = `${this.selectedHour}-${this.selectedMinute} ${this.selectedPeriod}`;
            break;
          case 'HH-MM':
            this.timeValue = `${this.selectedHour}-${this.selectedMinute}`;
            break;
          case 'HH:MM AM/PM':
            this.timeValue = `${this.selectedHour}:${this.selectedMinute} ${this.selectedPeriod}`;
            break;
          case 'HH:MM':
            this.timeValue = `${this.selectedHour}:${this.selectedMinute}`;
            break;
          default:
            this.timeValue = `${this.selectedHour}:${this.selectedMinute} ${this.selectedPeriod}`;
            break;
        }
      }
    } else {
      this.clearSelection();
    }
  }


  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  private parseTimeValue() {
    const parts = this.timeValue.split(/[\s:]+/);

    this.selectedHour = parts[0];
    this.selectedMinute = parts[1];
    this.selectedPeriod = parts[2] || 'AM';

    this.updateDropdown();
  }

  private clearSelection() {
    this.selectedHour = null;
    this.selectedMinute = null;
    this.selectedPeriod = 'AM';
    this.timeValue = ''
    const newValue = null
    this.inputValueChange.emit(newValue);
  }

  private getFormattedTime24(): string {
    if (this.timeValue == '') {
      const newValue = null
      this.onChange(newValue); // Update the form control value
      // this.inputValueChange.emit(true);
      console.log(newValue)
      this.inputValueChange.emit(newValue);
      return newValue;
    }
    else {
      const formattedHour = this.selectedHour || '00';
      console.log(formattedHour);
      
      const formattedMinute = this.selectedMinute || '00';
      console.log(formattedMinute);

      const periodMultiplier = this.selectedPeriod === 'PM' ? (+formattedHour === 12 ? 12 : 0) : 0;
      console.log(periodMultiplier);

      const hour24 = (+formattedHour % 12) + periodMultiplier;
      console.log(hour24);

      const newValue = `${hour24.toString().padStart(2, '0')}:${formattedMinute}`;
      this.onChange(newValue); // Update the form control value
      // this.inputValueChange.emit(true);
      console.log(newValue)
      this.inputValueChange.emit(newValue);
      return newValue;
    }
  }
  @HostListener('document:click', ['$event'])
  closeDropdownOnClickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showDropdown = false;
      this.isDisabled = false;
    }
  }

  onInputFocus() {
    this.isFocused = true;
  }
  onKeyDown(event: KeyboardEvent): void {
    // Check if the pressed key is a number, ":", "a", "A", "p", "P", or "Backspace"
    const isNumber = !isNaN(Number(event.key));
    const isColon = event.key === ':';
    const isAM = event.key.toLowerCase() === 'a' || event.key.toLowerCase() === 'm';
    const isPM = event.key.toLowerCase() === 'p' || event.key.toLowerCase() === 'm';
    const isBackspace = event.key === 'Backspace';

    // Allow only numbers, ":", "a", "A", "p", "P", and backspace, prevent other characters
    if (!isNumber && !isColon && !isAM && !isPM && !isBackspace) {
      // Prevent the default action (i.e., prevent typing)
      event.preventDefault();
    } else {
      const inputElement = event.target as HTMLInputElement;
      const inputValue = inputElement.value;
      const inputLength = inputValue.length;
      switch (this.timeFormat) {
        case 'HH:MM AM/PM':
          if (inputLength === 2 && !isColon && !isBackspace) {
            inputElement.value += ':';
          }
          if (inputLength === 5 && !isBackspace) {
            inputElement.value += ' ';
          }
          break;
        case 'HH-MM AM/PM':
          // Handle the keydown logic for this time format
          if (inputLength === 2 && !isColon && !isBackspace) {
            inputElement.value += '-';
          }
          if (inputLength === 5 && !isBackspace) {
            inputElement.value += ' ';
          }
          if (inputLength === 8 && !isBackspace) {
            inputElement.value += ' ';
          }
          break;
        case 'HH:MM':
          // Handle the keydown logic for this time format
          if (inputLength === 2 && !isColon && !isBackspace) {
            inputElement.value += ':';
          }
          break;
        case 'HH-MM':
          // Handle the keydown logic for this time format
          if (inputLength === 2 && !isColon && !isBackspace) {
            inputElement.value += '-';
          }
          break;
        default:
          // Handle default case if needed
          break;
      }

    }

  }




}
