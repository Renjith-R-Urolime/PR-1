import { Component, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { classificationApplicabilityFormMeta } from './classification-applicability.data';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';

@Component({
  selector: 'app-classification-applicability',
  templateUrl: './classification-applicability.component.html',
  styleUrls: ['./classification-applicability.component.scss']
})
export class ClassificationApplicabilityComponent {
  classificationApplicabilityFormSaved: any
  classificationApplicabilityForm: FormGroup;

  @Input() classificationApplicabilityFormData: any = classificationApplicabilityFormMeta
  @Input() patchData: any
  @Input() isCountryIncluded: any = true

  coutryFetchCondition: any
  subsidiaryFilter: string[] = [];
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  constructor(private dynamicFormService: DynamicFormService, private cdRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.classificationApplicabilityForm = this.dynamicFormService.createControl(this.classificationApplicabilityFormData)
    console.log(this.patchData, 'patch data');
    if (this.patchData) {
      if (this.isCountryIncluded) {
        this.coutryFetchCondition = [`country=${this.patchData?.country.id}`]
      }
      this.subsidiaryFilter = [`subsidiary=${this.patchData?.subsidiary.map(item => item.id ? item.id : item).join(',')}`];
    }
    const keysToCheck = ['department', 'subsidiary', 'jurisdiction', 'location', 'class', 'country'];
    const isDataPresent = this.isAnyKeyWithData(keysToCheck, this.patchData);
    if (isDataPresent) {
      this.classificationApplicabilityFormSaved = true
    }
    else {
      this.classificationApplicabilityFormSaved = false
    }

  }


  getFormTemplate(formTemp, name) {

  }


  onCountryChange(event) {
    console.log(event, 'event');
    if (event) {
      this.coutryFetchCondition = [`country=${event.id}`]
    }
    else {
      this.coutryFetchCondition = []
    }
    this.cdRef.detectChanges();

  }


  onSubsidiaryChange(event) {

    if (this.classificationApplicabilityForm.value?.subsidiary !== 'ALL' && event?.length > 0) {


      this.subsidiaryFilter = [`subsidiary=${event.map(item => item.id ? item.id : item).join(',')}`];
    } else {
      this.subsidiaryFilter = []
    }
  }

  onDrawerSave(event) {
    const keysToCheck = ['department', 'subsidiary', 'jurisdiction', 'location', 'class', 'country'];
    const isDataPresent = this.isAnyKeyWithData(keysToCheck, this.classificationApplicabilityForm.value);
    if (isDataPresent) {
      this.classificationApplicabilityFormSaved = true
    }
    else {
      this.classificationApplicabilityFormSaved = false
    }
    // this.onSubmit.emit({
    //   ...this.mapClassificationApplicabilityValues(this.classificationApplicabilityForm.value),
    //   filter: this.createClassificationApplicabilityFilterObject()
    // }); // Emit selected names through the new event emitter

    const formValues = this.mapClassificationApplicabilityValues(this.classificationApplicabilityForm.value);
    const filterObject = this.createClassificationApplicabilityFilterObject();

    // Filter out country if isCountryIncluded is false
    if (!this.isCountryIncluded && formValues.hasOwnProperty('country')) {
      delete formValues['country'];
    }

    this.onSubmit.emit({
      ...formValues,
      filter: filterObject
    });

  }




  createClassificationApplicabilityFilterObject(): any {
    if (this.classificationApplicabilityForm?.value?.subsidiary?.length > 0 && this.classificationApplicabilityForm?.value?.subsidiary != 'ALL' && this.classificationApplicabilityForm?.value?.subsidiary != null) {
      let subsidaryData = this.classificationApplicabilityForm?.value?.subsidiary
      return {
        jurisdiction: `subsidiary=${subsidaryData.map(item => item.id ? item.id : item).join(',')}`,
        location: `subsidiary=${subsidaryData.map(item => item.id ? item.id : item).join(',')}`,
        department: `subsidiary=${subsidaryData.map(item => item.id ? item.id : item).join(',')}`,
        class: `subsidiary=${subsidaryData.map(item => item.id ? item.id : item).join(',')}`,
      };
    }
    else if (this.classificationApplicabilityForm?.value?.country?.length > 0) {
      let countryData = [this.classificationApplicabilityForm?.value?.country]
      return {
        subsidiary: `country=${countryData.map(item => item.id ? item.id : item).join(',')}`,
        jurisdiction: `country=${countryData.map(item => item.id ? item.id : item).join(',')}`,
        location: `country=${countryData.map(item => item.id ? item.id : item).join(',')}`,
        department: `country=${countryData.map(item => item.id ? item.id : item).join(',')}`,
        class: `country=${countryData.map(item => item.id ? item.id : item).join(',')}`,
      };
    }
    else {
      return null;
    }
  }

  mapClassificationApplicabilityValues(obj: { [key: string]: any }): { [key: string]: any } {

    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => {
        if (key !== 'country' && (value === undefined || value === null || (Array.isArray(value) && value.length === 0))) {
          return [key, 'ALL'];
        }
        else if (key == 'country' && (value === undefined || value === null || (Array.isArray(value) && value.length === 0))) {
          return [key, null];
        }
        else {
          return [key, value];
        }
      })
    );
  }


  isAnyKeyWithData(keys, dataObject) {
    for (const key of keys) {
      if (dataObject?.[key] && dataObject?.[key]?.length > 0) {
        return true; // Data is present in at least one key
      }
    }

    return false; // No data found in any of the specified keys
  }

}
