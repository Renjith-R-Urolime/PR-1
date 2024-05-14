import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Injectable({
    providedIn: 'root'
  })
export class DynamicFormService {
    constructor(private fb: FormBuilder) { }
      //create form controls
  createControl(formData) {
    const group = this.fb.group({});
    formData.labels.forEach((field: any) => {
      // if (field.type === "button") return;
      const control = this.fb.control(
        {
          value:field.defaultValue,
          disabled: field.disable
        },
          this.bindValidations(field.validations || [])
      ); //create form control and validators for that field
      group.addControl(field.labelName.defaultValue, control);
    });
    return group;
  }
  bindValidations(validations: any) {
    if (validations.length > 0) {
    const validList = [];
    validations.forEach(valid => {
    validList.push(valid.validator);
    });
    return Validators.compose(validList);
    }
    return null;
  }
  getUpdatedData(form){
    const updatedData = {};
    // Iterate over form controls
    for (const controlName in form.controls) {
      const control = form.get(controlName);
      // Check if the control is dirty (changed by the user)
      if (control.dirty) {
        updatedData[controlName] = control.value;
      }
    }
    return updatedData;
  }
}
