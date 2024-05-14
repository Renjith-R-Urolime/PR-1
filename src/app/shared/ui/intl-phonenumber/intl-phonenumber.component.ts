import { Component, EventEmitter, Input, Optional, Output, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { SharedService } from '../../services/shared.service';
import { JsonListService } from '../../services/json-list/json-list.service';
@Component({
  selector: 'app-intl-phonenumber',
  templateUrl: './intl-phonenumber.component.html',
  styleUrls: ['./intl-phonenumber.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: IntlPhonenumberComponent,
      multi: true
    }
  ]
})
export class IntlPhonenumberComponent implements ControlValueAccessor, OnInit, OnChanges {

  phoneNumber: string | number;
  @Input() countryCode: string | number = 971;
  flag;
  phoneNumberData: any = {
    code: this.countryCode,
    isoCode: 'AE',
    emoji: '🇦🇪'
  }
  isPhoneNumberValid: boolean = false;
  onBlur: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() placeholder: string;
  @Input() ngClass: any;
  @Output() onPhoneChange: EventEmitter<any> = new EventEmitter();
  // ControlValueAccessor implementation
  onChange: any = () => { };
  onTouch: any = () => { };
  @Input() controlName: string;
  countryList:any;
  @Input() isFirstChange:boolean=false;

  constructor(@Optional() private controlContainer: ControlContainer,private sharedService: SharedService,  private jsonListService: JsonListService) { }

  writeValue(value: any): void {
    if (value) {
      this.phoneNumberData = value;
      this.phoneNumber = value?.number
      this.countryCode = value?.code
      this.flag = value?.emoji
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled
  }
  setControl(controlStatus) {
    const control = this.controlContainer?.control?.get(this.controlName);
    if (control) {
      if (!controlStatus) {
        control.setErrors({ 'incorrect': true });
      }
      else {
        control.setErrors(null);
      }
    }
  }
  onCountryChange(event) {
    this.phoneNumberData['code'] = event?.phoneCode;
    this.phoneNumberData['isoCode'] = event?.iso2;
    this.phoneNumberData['emoji'] = event?.emoji;
    this.isPhoneNumberValid = this.checkPhoneNumberValid();
    if (this.isRequired) {  
      if (this.phoneNumberData.number) {
        this.onChange(this.phoneNumberData)
        this.onPhoneChange.emit(this.isPhoneNumberValid);
      }
      else {
        if(this.isFirstChange){
          this.onChange(this.phoneNumberData);
          this.writeValue(this.phoneNumberData);
         }
         else{
          this.onChange(null)
         }
      }
    }
    else {
      this.onPhoneChange.emit(this.isPhoneNumberValid);
      this.onChange(this.phoneNumberData);
      this.writeValue(this.phoneNumberData);
    }
  }

  onInputBlur(event) {
    this.phoneNumberData['number'] = event?.target.value
    this.onBlur = true
    this.isPhoneNumberValid = this.checkPhoneNumberValid()
    if (this.isRequired) {
      if (event?.target.value) {
        this.onPhoneChange.emit(this.isPhoneNumberValid);
        this.onChange(this.phoneNumberData)
      }
      else {
        this.onChange(null)
      }
    }
    else {
      this.onPhoneChange.emit(this.isPhoneNumberValid);
      this.onChange(this.phoneNumberData)
    }

    this.setControl(this.isPhoneNumberValid);
  }

  onNumberRestrict(event) {
    //event.target.value = event.target.value.replace(/[^0-9.-]/g, '');
    event.target.value = event.target.value.slice(0, 10);
  }
  onKeyDown(event: KeyboardEvent): void {
    // Check if the pressed key is 'e' or 'E'
    if (event.key.toLowerCase() === 'e') {
      // Prevent the default action (i.e., prevent typing 'e')
      event.preventDefault();
    }
  }

  checkPhoneNumberValid() {
    if (!this.phoneNumberData || !this.phoneNumberData.code || !this.phoneNumberData.number) {
      return true;
    }
    const phoneUtil = PhoneNumberUtil.getInstance();
    const parsedPhoneNumber = phoneUtil.parse(this.phoneNumberData.number, this.phoneNumberData.isoCode); // Replace 'US' with the appropriate country code
    return phoneUtil.isValidNumber(parsedPhoneNumber);
    /*  const phoneNumber = `(+${this.phoneNumberData.code}) ${this.phoneNumberData.number}`;
     const result = phone(phoneNumber, { validateMobilePrefix: false });
     return result.isValid; */
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.countryCode && changes.countryCode.firstChange && this.isFirstChange){
      this.jsonListService.getDataList('country').subscribe({
        next: (result) => {
          this.countryList= result;
          this.countryList.filter(value=>{
            if(value.id===this.countryCode){
              this.onCountryChange(value)
              return value;
            }
          });
        }
      })
     
    }
    if (changes.countryCode && !changes.countryCode.firstChange) {
      this.countryList.filter(value=>{
        if(value.id===this.countryCode){
          this.onCountryChange(value)
          return value;
        }
      });
    }
    
  }

  ngOnInit(){
    this.jsonListService.getDataList('country').subscribe({
      next: (result) => {
        this.countryList= result;
      }
    })
  }
}
