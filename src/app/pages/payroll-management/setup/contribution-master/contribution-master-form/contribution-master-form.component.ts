
import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { S3UploadService } from 'src/app/shared/services/s3-upload.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { classificationApplicabilityFormData, contributionMasterFormData, formSections, tableFormData } from '../contribution-master.data';

@Component({
  selector: 'app-contribution-master-form',
  templateUrl: './contribution-master-form.component.html',
  styleUrls: ['./contribution-master-form.component.scss']
})
export class ContributionMasterFormComponent implements OnInit {
  orginalFormGroup: any
  isLoading: boolean = false;
  tempData: any;
  isProcessing: boolean = false;
  theme: string = this.sharedService.getTheme();
  submit: boolean = false;
  detectedError: boolean = false;
  componentListLoading: boolean = false;
  onDrawerSaveData: any = []
  defineRangeAlert: boolean = false
  tableMeta = tableFormData;
  formSections: Sections = formSections
  contributionMasterForm: FormGroup;
  classificationApplicabilityForm: FormGroup;
  tableContributionMasterForm: FormGroup;
  formData: any = contributionMasterFormData;
  classificationApplicabilityFormData: any = classificationApplicabilityFormData
  id;
  rowValues: any[] = [];
  contributionMasterData: any = [];
  col: any = 4
  currentFormDrawerName: string
  currentDefineRangeForm:any
  headerText: string;
  formTemplate: TemplateRef<any>;
  indexValue: number
  classificationApplicabilityFormSaved: boolean = false
  employerSubFormSaved: boolean = false
  employeeSubFormSaved: boolean = false
  contributionSetupDetailsStatus: boolean = true
  contributionSetupDetailsNationalityStatus: boolean = true
  savedDefineRangeState:any
  private modalRef: NgbModalRef;

  inputValue: number
  cumulativePercentage: number
  saveButtonDisable: boolean = true
  totalPercentage: number
  percentageAlert: boolean = false
  destroy: any
  deletedItemIds: number[] = [];
  formDrawerId: any
  subsidiaryFilter: string[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiService, private sanitizer: DomSanitizer, private modalService: NgbModal, private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private dynamicFormService: DynamicFormService, public sharedService: SharedService, private _location: Location, private s3service: S3UploadService) { }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  getContributionData() {
    this.isLoading = true;
    this.apiService.get(`payroll/setup/contribution/${this.id}`).subscribe({
      next: (res: any) => {
        if (res) {
          this.subsidiaryFilter = [`subsidiary=${res?.data?.subsidiary?.map(item => item.id).join(',')}`];

          this.contributionMasterData = res?.data;
          this.isLoading = false;
          const keysToCheck = ['department', 'subsidiary', 'jurisdiction', 'location', 'class'];
          const isDataPresent = this.isAnyKeyWithData(keysToCheck, res?.data);
          if (isDataPresent) {
            this.classificationApplicabilityFormSaved = true
          }
          this.contributionMasterForm.patchValue({
            name: this.contributionMasterData.name,
            baseComponent: this.contributionMasterData?.baseComponent,
            creditAccountId: this.contributionMasterData?.creditAccount?.id,
            debitAccountId: this.contributionMasterData?.debitAccount?.id,
            payrollComponentId: this.contributionMasterData?.payrollComponent?.id,
            salaryThreshold:this.contributionMasterData?.salaryThreshold,
            ageThreshold:this.contributionMasterData?.ageThreshold,
            defineRange:this.contributionMasterData?.defineRange

          })

          this.contributionMasterForm.addControl('contributionSetupDetails', this.fb.array([this.createSubForm()]));


          for (var i = 0; i <= res?.data?.contributionSetupDetails?.length - 1; i++) {
            const items = this.contributionMasterForm.get('contributionSetupDetails') as FormArray;
            items.push(this.createSubForm());
            if(this.contributionMasterData?.defineRange==true){
              for (var k = 0; k < res?.data?.contributionSetupDetails[i]?.employerContributionDefineRange?.length - 1; k++) {
                const items = this.contributionMasterForm.get('contributionSetupDetails') as FormArray;
                const nestedFormArray = items.at(i).get('employerContributionDefineRange') as FormArray;
                nestedFormArray.push(this.createNextedSubFormDefineRange());
              }
              for (var j = 0; j < res?.data?.contributionSetupDetails[i]?.employeeContributionDefineRange?.length - 1; j++) {
                const items = this.contributionMasterForm.get('contributionSetupDetails') as FormArray;
                const nestedFormArray = items.at(i).get('employeeContributionDefineRange') as FormArray;
                nestedFormArray.push(this.createNextedSubFormDefineRange());
              }
            }
            else{
              for (var k = 0; k < res?.data?.contributionSetupDetails[i]?.employerContributionDetails?.length - 1; k++) {
                const items = this.contributionMasterForm.get('contributionSetupDetails') as FormArray;
                const nestedFormArray = items.at(i).get('employerContributionDetails') as FormArray;
                nestedFormArray.push(this.createNextedSubForm());
              }
              for (var j = 0; j < res?.data?.contributionSetupDetails[i]?.employeeContributionDetails?.length - 1; j++) {
                const items = this.contributionMasterForm.get('contributionSetupDetails') as FormArray;
                const nestedFormArray = items.at(i).get('employeeContributionDetails') as FormArray;
                nestedFormArray.push(this.createNextedSubForm());
              }
            }
          }
          ////////////////////////////////////If Edit mode need to be activated//////////////////////////////////////////////////////////////////
          res?.data?.contributionSetupDetails.forEach(item => {
            if (item.employerContributionDetails && item.employerContributionDetails[0] && item.employerContributionDetails[0].name) {
              item.editModeEmployerContribution = true;
            }

            if (item.employeeContributionDetails && item.employeeContributionDetails[0] && item.employeeContributionDetails[0].name) {
              item.editModeEmployeeContribution = true;
            }
          });
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          this.contributionMasterForm.get('contributionSetupDetails').patchValue(res?.data?.contributionSetupDetails)
          if (this.contributionMasterData.contributionSetupDetails.length != 0) {
            this.removeItem(res?.data?.contributionSetupDetails?.length)
          }
        }
      }, error: (error: any) => {
        this.detectedError = true;


      }


    });

    if (this.isObjectEmpty(this.classificationApplicabilityForm?.value)) {
      this.classificationApplicabilityFormSaved = false
    }
    else {
      this.classificationApplicabilityFormSaved = true
    }



  }

  onCancel() {
    this._location.back();
  }

  assignTemplate(headerText, formTemplate, i, name) {
    this.headerText = headerText;
    this.formDrawerId = 'kt_drawer_form_toggle_error'

    this.formTemplate = formTemplate;
    this.currentFormDrawerName = name
    this.indexValue = i
    this.totalPercentageAllowed(i, name)
    if (this.cumulativePercentage) {
      this.formDrawerId = 'kt_drawer_form_toggle'
    }
  }

  totalPercentageAllowed(i, name) {

    if (name === 'employer') {
      const items = this.contributionMasterForm.get('contributionSetupDetails') as FormArray;
      const employerPercentage = items.at(i).get('employerContribution') as FormControl
      this.cumulativePercentage = employerPercentage.value

    }
    else if (name === 'employee') {
      const items = this.contributionMasterForm.get('contributionSetupDetails') as FormArray;
      const employeePercentage = items.at(i).get('employeeContribution') as FormControl
      this.cumulativePercentage = employeePercentage.value
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.contributionMasterForm = this.dynamicFormService.createControl(this.formData);

    this.classificationApplicabilityForm = this.dynamicFormService.createControl(this.classificationApplicabilityFormData)
    if (this.id) {
      this.getContributionData();
    }
    else{
      this.contributionMasterForm.addControl('contributionSetupDetails', this.fb.array([this.createSubForm()]));
    }

    if (this.isObjectEmpty(this.classificationApplicabilityForm?.value)) {
      this.classificationApplicabilityFormSaved = false
    }
    else {
      this.classificationApplicabilityFormSaved = true
    }


  }

  createSubForm(): FormGroup {
    const formGroup = {};
    formGroup['employerContributionDetails'] = this.fb.array([this.createNextedSubForm()]);
    formGroup['employeeContributionDetails'] = this.fb.array([this.createNextedSubForm()]);
    formGroup['employerContributionDefineRange'] = this.fb.array([this.createNextedSubFormDefineRange()]);
    formGroup['employeeContributionDefineRange'] = this.fb.array([this.createNextedSubFormDefineRange()]);

    formGroup['nationality'] = new FormControl()
    formGroup['id'] = new FormControl()
if(this.contributionMasterForm.value.defineRange){
  formGroup['employerContribution'] = new FormControl('')
  formGroup['employeeContribution'] = new FormControl('')
}
else{
  formGroup['employerContribution'] = new FormControl('',this.contributionMasterForm.value.defineRange!=true ? Validators.required : null)
  formGroup['employeeContribution'] = new FormControl('',this.contributionMasterForm.value.defineRange!=true ? Validators.required : null)
}

    formGroup['viewMode'] = new FormControl(false);
    formGroup['editModeEmployerContribution'] = new FormControl(false);
    formGroup['editModeEmployeeContribution'] = new FormControl(false);

    return this.fb.group(formGroup);
  }




  ///////////////////Define Range ///////////////////////////////////////////////////////////////////////////////////////////////
  createNextedSubFormDefineRange(i?): FormGroup {
    const formGroup = {};
    formGroup['minimumYear'] = new FormControl(0)
    formGroup['maximumYear'] = new FormControl('',this.contributionMasterForm.value.defineRange==true? [Validators.required, this.validateToGreaterThanFrom.bind(this)]:null)
    formGroup['percentage'] = new FormControl('', this.contributionMasterForm.value.defineRange==true?Validators.required:null)
    return this.fb.group(formGroup);
  }


  ///////////////////Define Range Employer contribution///////////////////////////////////////////////////////////////////////////////////////////////


  removeEmployerDefineRange(index) {
    this.defineRangeAlert = false
    this.removeItemEmployerDefineRange(index);

  }

  removeItemEmployerDefineRange(index: number) {
    const items = this.contributionMasterForm.get('contributionSetupDetails') as FormArray;
    const rowFormGroup = items.at(this.indexValue) as FormGroup;
    const nestedForm = rowFormGroup.get('employerContributionDefineRange') as FormArray
    if (nestedForm.length == 1) {
      nestedForm.removeAt(index)
      nestedForm.push(this.createNextedSubFormDefineRange());
      this.defineRangeAlert = false
    }
    else {
      this.defineRangeAlert = false
      nestedForm.removeAt(index)
    }
  }

  onToggleChange(event,name){
    if(name=='defineRange'){
      const items = this.contributionMasterForm.get('contributionSetupDetails') as FormArray;
      items.value.forEach(item => {
        if (item.id) {
            this.deletedItemIds.push(item.id);
        }
    });
      items.clear();
      items.push(this.createSubForm());
      this.contributionSetupDetailsStatus = true
    }
  }

  addMoreEmployerContributionSubFormDefineRange(index) {
    let contributionSetupDetails = this.employerContributionSetupDefineRange(index)
    if (contributionSetupDetails['status'] == 'VALID') {


      this.defineRangeAlert = false
      const items = this.contributionMasterForm.get('contributionSetupDetails') as FormArray;

      const nestedFormArray = items.at(index).get('employerContributionDefineRange') as FormArray;
      const lastItem = nestedFormArray.length > 0 ? nestedFormArray.at(nestedFormArray.length - 1).get('maximumYear').value : 0


      nestedFormArray.push(this.createNextedSubFormDefineRange(nestedFormArray.length + 1));
      const newFromValue = parseFloat(lastItem);
      nestedFormArray.at(nestedFormArray.length - 1).get('minimumYear').patchValue(newFromValue);
    }
    else {
      this.defineRangeAlert = true
    }
  }


  employerContributionSetupDefineRange(index) {
    return this.contributionMasterForm.controls.contributionSetupDetails['controls'][index]['controls']['employerContributionDefineRange']
  }



  ///////////////////Define Range Employee contribution///////////////////////////////////////////////////////////////////////////////////////////////



  removeEmployeeDefineRange(index) {
    this.defineRangeAlert = false
    this.removeItemEmployeeDefineRange(index);

  }

  removeItemEmployeeDefineRange(index: number) {
    const items = this.contributionMasterForm.get('contributionSetupDetails') as FormArray;
    const rowFormGroup = items.at(this.indexValue) as FormGroup;
    const nestedForm = rowFormGroup.get('employeeContributionDefineRange') as FormArray
    if (nestedForm.length == 1) {
      nestedForm.removeAt(index)
      nestedForm.push(this.createNextedSubFormDefineRange());
      this.defineRangeAlert = false
    }
    else {
      this.defineRangeAlert = false
      nestedForm.removeAt(index)
    }
  }


  addMoreEmployeeContributionSubFormDefineRange(index) {
    let contributionSetupDetails = this.employeeContributionSetupDefineRange(index)
    if (contributionSetupDetails['status'] == 'VALID') {


      this.defineRangeAlert = false
      const items = this.contributionMasterForm.get('contributionSetupDetails') as FormArray;

      const nestedFormArray = items.at(index).get('employeeContributionDefineRange') as FormArray;
      const lastItem = nestedFormArray.length > 0 ? nestedFormArray.at(nestedFormArray.length - 1).get('maximumYear').value : 0


      nestedFormArray.push(this.createNextedSubFormDefineRange(nestedFormArray.length + 1));
      const newFromValue = parseFloat(lastItem);
      nestedFormArray.at(nestedFormArray.length - 1).get('minimumYear').patchValue(newFromValue);
    }
    else {
      this.defineRangeAlert = true
    }
  }


  employeeContributionSetupDefineRange(index) {
    return this.contributionMasterForm.controls.contributionSetupDetails['controls'][index]['controls']['employeeContributionDefineRange']
  }


  newModel(model, headerText, i,name) {
    this.defineRangeAlert = false
    this.indexValue = i
    ////////////Saving the previous state ///////////////
    if(name=='employer'){
      const items = this.contributionMasterForm.get('contributionSetupDetails') as FormArray;
      this.currentDefineRangeForm= items.at(i).get('employerContributionDefineRange') as FormArray;
      this.savedDefineRangeState = this.currentDefineRangeForm.value;
    }
    else if(name=='employee'){
      const items = this.contributionMasterForm.get('contributionSetupDetails') as FormArray;
      this.currentDefineRangeForm= items.at(i).get('employeeContributionDefineRange') as FormArray;
      this.savedDefineRangeState = this.currentDefineRangeForm.value;
    }

    this.headerText = headerText
    this.modalRef = this.modalService.open(model, {
      size: 'xl', scrollable: false, windowClass: 'settings-form-modal', backdrop: 'static'
    });
  }

  handleCancelModalClick() {
    this.defineRangeAlert = false
    this.modalRef.close();
    this.currentDefineRangeForm.clear()
    this.savedDefineRangeState.forEach(item => {
      this.currentDefineRangeForm.push(this.createNextedSubFormDefineRange());
    });
    this.currentDefineRangeForm.patchValue(this.savedDefineRangeState)
  }

  onModelSubmit(name) {
    let contributionSetupDetailsEmployer = this.employerContributionSetupDefineRange(this.indexValue)
    let contributionSetupDetailsEmployee = this.employeeContributionSetupDefineRange(this.indexValue)

if(name=='employer'){
if(contributionSetupDetailsEmployer['status'] == 'VALID'){
  this.modalRef.close();
}
else{
  this.defineRangeAlert = true
}
}
else if(name=='employee'){
  if(contributionSetupDetailsEmployee['status'] == 'VALID'){
    this.modalRef.close();
  }
  else{
    this.defineRangeAlert = true
  }
}
  }


  createNextedSubForm(i?): FormGroup {
    const formGroup = {};
    formGroup['name'] = new FormControl('')
    formGroup['percentage'] = new FormControl('')
    formGroup['sno'] = new FormControl(i || 1)
    return this.fb.group(formGroup);
  }


  validateToGreaterThanFrom(control: FormControl): { [key: string]: boolean } | null {
    const fromValue = control.parent?.get('minimumYear')?.value;
    const toValue = control.value;

    // Check if 'minimumYear' is greater than 'maximumYear'
    if (fromValue !== null && toValue !== null && fromValue >= toValue) {
      return { 'toGreaterThanFrom': true };
    }

    return null;
  }
  onDrawerSave(event) {
    if (this.currentFormDrawerName == "employer") {
      this.totalPercentageAccumulated(this.indexValue, 'employer')
      if (this.totalPercentage <= this.cumulativePercentage) {
        this.formFields.at(this.indexValue).patchValue({
          "editModeEmployerContribution": true
        })

        this.saveButtonDisable = false
        this.percentageAlert = false
        this.employerSubFormSaved = true

      }
      else {
        this.saveButtonDisable = true
        this.percentageAlert = true

      }
    }
    else if (this.currentFormDrawerName == "employee") {
      this.totalPercentageAccumulated(this.indexValue, 'employee')
      if (this.totalPercentage <= this.cumulativePercentage) {
        this.saveButtonDisable = false
        this.percentageAlert = false
        this.employeeSubFormSaved = true
        this.formFields.at(this.indexValue).patchValue({
          "editModeEmployeeContribution": true
        })


      }
      else {
        this.saveButtonDisable = true
        this.percentageAlert = true
      }
    }
    else if (this.currentFormDrawerName == 'classificationApplicability') {
      this.onDrawerSaveData = this.classificationApplicabilityForm.value



      this.saveButtonDisable = false
      if (this.isObjectEmpty(this.classificationApplicabilityForm?.value)) {
        this.classificationApplicabilityFormSaved = false
      }
      else {
        this.classificationApplicabilityFormSaved = true
      }

    }

  }
  onDrawerCancel(event) {
    this.percentageAlert = false
    if (this.currentFormDrawerName == 'classificationApplicability') {
      this.classificationApplicabilityForm.reset(this.onDrawerSaveData)
    }
  }

  addMore() {
    const items = this.contributionMasterForm.get('contributionSetupDetails') as FormArray;
        const isDuplicateNationality = this.hasDuplicateNationalities(this.contributionMasterForm?.value?.contributionSetupDetails)

    if (items.status == 'VALID') {

      if (!isDuplicateNationality) {
        this.contributionSetupDetailsStatus = true
        this.contributionSetupDetailsNationalityStatus = true

        items.push(this.createSubForm());
      }
      else {
        this.contributionSetupDetailsNationalityStatus = false
      }
    }
    else {
      this.contributionSetupDetailsStatus = false
    }
  }

  addMoreEmployerContributionSubForm(index) {
    let contributionSetupDetails = this.contributionSetupDetails(index)
    if (contributionSetupDetails['status'] == 'VALID') {
      this.totalPercentageAccumulated(index, 'employer')


      if (this.totalPercentage < this.cumulativePercentage) {
        this.percentageAlert = false
        const items = this.contributionMasterForm.get('contributionSetupDetails') as FormArray;
        const nestedFormArray = items.at(index).get('employerContributionDetails') as FormArray;
        nestedFormArray.push(this.createNextedSubForm(nestedFormArray.length + 1));
      }
      else {
        this.percentageAlert = true
      }
    }
  }







  contributionSetupDetails(index) {
    return this.contributionMasterForm.controls.contributionSetupDetails['controls'][index]['controls']['employerContributionDetails']
  }


  employeeContributionDetails(index) {
    return this.contributionMasterForm.controls.contributionSetupDetails['controls'][index]['controls']['employeeContributionDetails']
  }


  totalPercentageAccumulated(index, name) {
    if (name == 'employer') {
      let contributionSetupDetails = this.contributionSetupDetails(index)
      let totalPercentageAccumulated = contributionSetupDetails['value']
      this.totalPercentage = totalPercentageAccumulated.reduce((acc, item) => acc + (parseFloat(item.percentage) || 0), 0);

    }
    else {
      let employeeContributionDetails = this.employeeContributionDetails(index)
      let totalPercentageAccumulated = employeeContributionDetails['value']
      this.totalPercentage = totalPercentageAccumulated.reduce((acc, item) => acc + (parseFloat(item.percentage) || 0), 0);

    }
  }


  addMoreEmployeeContributionSubForm(index) {
    let employeeContributionDetails = this.employeeContributionDetails(index)
    if (employeeContributionDetails['status'] == 'VALID') {
      this.totalPercentageAccumulated(index, 'employee')

      if (this.totalPercentage < this.cumulativePercentage) {
        this.percentageAlert = false
        const items = this.contributionMasterForm.get('contributionSetupDetails') as FormArray;
        const nestedFormArray = items.at(index).get('employeeContributionDetails') as FormArray;
        nestedFormArray.push(this.createNextedSubForm(nestedFormArray.length + 1));
      }
      else {
        this.percentageAlert = true
      }
    }
  }


  get formFields(): FormArray {
    return this.contributionMasterForm.get('contributionSetupDetails') as FormArray;
  }

  // get employeeContributionSubformFields(): FormArray {
  //   const rowsArray = this.contributionMasterForm.get('contributionSetupDetails') as FormArray;
  //   if (rowsArray.length >= 1) {
  //     const requiredRow = rowsArray.at(this.indexValue) as FormGroup;
  //     return requiredRow.get('employeeContributionDetails') as FormArray;
  //   }
  // }


  // get employerContributionSubformFields(): FormArray {

  //   const rowsArray = this.contributionMasterForm.get('contributionSetupDetails') as FormArray;
  //   if (rowsArray.length >= 1) {
  //     const requiredRow = rowsArray.at(this.indexValue) as FormGroup;
  //     return requiredRow.get('employerContributionDetails') as FormArray;
  //   }
  // }

  onSubmit() {
    this.submit = true;

    const isDuplicateNationality = this.hasDuplicateNationalities(this.contributionMasterForm?.value?.contributionSetupDetails)
    let classificationData = this.mapClassificationApplicabilityValues(this.classificationApplicabilityForm.value)
    let classificationfilter = { filters: this.createClassificationApplicabilityFilterObject() }



    if ((this.contributionMasterForm.controls?.contributionSetupDetails['status'] != 'VALID')) {
      this.contributionSetupDetailsStatus = false
    }
    else if (isDuplicateNationality) {
      this.contributionSetupDetailsNationalityStatus = false
    }
    else if (this.contributionMasterForm.controls.name['status'] != 'VALID') {
      return '';
    }
    else {
      this.contributionSetupDetailsStatus = true
      this.contributionSetupDetailsNationalityStatus = true

      this.isProcessing = true;
      const dataToDelete = {
        destroy: {
          contributionSetupDetails: this.deletedItemIds,
        }
      }

      const destroyField = dataToDelete.destroy.contributionSetupDetails.length > 0
        ? dataToDelete
        : undefined;



      const transformedFormData = {
        ...this.contributionMasterForm.value,
        ...destroyField,
        contributionSetupDetails: this.contributionMasterForm.value.contributionSetupDetails.map(contribution => ({
          ...contribution,
          nationality: parseInt(contribution.nationality)
        })),
      };
      let data = this.sharedService.removeUndefinedAndNullFields(transformedFormData)

      if (this.id) {
        this.apiService.put(`payroll/setup/contribution/${this.id}`, { ...data, ...classificationData, ...classificationfilter }, 'contribution').subscribe({
          next: (res: any) => {
            if (res) {
              this.sharedService.handleSuccessModel({ id: this.id });
            }
          },
          error: (error: any) => {
            this.handleError(error);
          }
        }
        );
      }
      else {
        this.apiService.post(`payroll/setup/contribution`, { ...data, ...classificationData, ...classificationfilter }, 'contribution').subscribe({
          next: (res: any) => {
            if (res) {
              this.sharedService.handleSuccessModel({ id: res?._id });
            }
          },
          error: (error: any) => {
            this.handleError(error);
          }
        }
        );
      }

    }
  }



  createClassificationApplicabilityFilterObject(): any {
    if (this.subsidiaryFilter.length > 0) {
      const filterString = this.subsidiaryFilter.join('&');
      return {
        jurisdiction: filterString,
        location: filterString,
        department: filterString,
        class: filterString,
      };
    } else if (this.classificationApplicabilityForm?.value?.subsidiary?.length > 0 && this.classificationApplicabilityForm?.value?.subsidiary!='ALL' ) {
      let subsidaryData = this.classificationApplicabilityForm?.value?.subsidiary
      return {
        jurisdiction: `subsidiary=${subsidaryData.map(item => item.id).join(',')}`,
        location: `subsidiary=${subsidaryData.map(item => item.id).join(',')}`,
        department: `subsidiary=${subsidaryData.map(item => item.id).join(',')}`,
        class: `subsidiary=${subsidaryData.map(item => item.id).join(',')}`,
      };
    }
    else {
      return null;
    }
  }



  mapClassificationApplicabilityValues(obj: { [key: string]: any }): { [key: string]: any } {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => {
        if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) {
          return [key, 'ALL'];
        } else {
          return [key, value];
        }
      })
    );
  }







  private handleError(error: any) {
    this.isProcessing = false;
    this.detectedError = true;
    this.cdRef.detectChanges();


  }


  setMode(val, index, mode?) {
    const items = this.contributionMasterForm.get('contributionSetupDetails') as FormArray;

    if (mode === 'delete') {
      this.contributionSetupDetailsNationalityStatus = true
      if (items.length == 1) {
        //////////////////////////////////////////
        const itemsArray = this.contributionMasterForm.get('contributionSetupDetails') as FormArray;
        const requiredItem = itemsArray.at(index).value;
        if (requiredItem.id != null) {
          this.deletedItemIds.push(requiredItem.id);
        }
        ///////////////////////////////////////////

        items.clear();
        this.addMore()
        this.formFields.at(0).patchValue({
          nationality: 'null'
        });
      }
      else {
        this.removeItem(index);
      }
    }
    else {
      if (mode === 'edit') {

        this.tempData = this.formFields.at(index).value;

      }
      else if (mode === 'cancel') {
        const rowIndex = index; // Replace with the index you want to update

        // Create an object with the new value
        const updatedValue = {
          nationality: this.rowValues[index]?.nationality,
          employerContribution: this.rowValues[index]?.employerContribution,
          employeeContribution: this.rowValues[index]?.employeeContribution,
        };
        // Get the specific FormGroup at the specified index
        const rowFormGroup = items.at(rowIndex) as FormGroup;
        // Use patchValue to update the control's value
        rowFormGroup.patchValue(updatedValue);
      }
      else if (mode === 'softSubmit') {
        const rowValue = {
          nationality: this.formFields.at(index).get('nationality').value,
          employerContribution: this.formFields.at(index).get('employerContribution').value,
          employeeContribution: this.formFields.at(index).get('employeeContribution').value
        };
        this.rowValues[index] = rowValue;
        // Update the FormGroup values for the specific row
      }

      this.formFields.at(index).patchValue({
        "viewMode": val
      })

    }
  }

  onEdit(index) {

  }
  removeItem(index: number) {
    const itemsArray = this.contributionMasterForm.get('contributionSetupDetails') as FormArray;
    const requiredItem = itemsArray.at(index).value;
    if (requiredItem.id != null) {
      this.deletedItemIds.push(requiredItem.id);
    }
    itemsArray.removeAt(index);
  }

  deleteEmployerSubForm(indexValue, subIndex) {
    const items = this.contributionMasterForm.get('contributionSetupDetails') as FormArray;
    const rowFormGroup = items.at(indexValue) as FormGroup;
    const nestedForm = rowFormGroup.get('employerContributionDetails') as FormArray
    if (nestedForm.length == 1) {
      nestedForm.removeAt(subIndex)
      nestedForm.push(this.createNextedSubForm(1));
      this.percentageAlert = false
    }
    else {
      this.percentageAlert = false
      nestedForm.removeAt(subIndex)
    }


  }
  deleteEmployeeSubForm(indexValue, subIndex) {
    const items = this.contributionMasterForm.get('contributionSetupDetails') as FormArray;
    const rowFormGroup = items.at(indexValue) as FormGroup;
    const nestedForm = rowFormGroup.get('employeeContributionDetails') as FormArray
    if (nestedForm.length == 1) {
      nestedForm.removeAt(subIndex)
      nestedForm.push(this.createNextedSubForm(1));
      this.percentageAlert = false
    }
    else {
      this.percentageAlert = false
      nestedForm.removeAt(subIndex)
    }

  }
  checkFilled(i) {
  }

  isAnyKeyWithData(keys, dataObject) {
    for (const key of keys) {
      if (dataObject[key] && dataObject[key].length > 0) {
        return true; // Data is present in at least one key
      }
    }

    return false; // No data found in any of the specified keys
  }



  hasDuplicateNationalities(contributionSetupDetails: any[]): boolean {
    const nationalityIds: Set<string> = new Set();
    for (const item of contributionSetupDetails) {
      const nationalityId = typeof item?.nationality === 'object' ? item?.nationality?.id : item?.nationality;
      if (nationalityIds.has(nationalityId)) return true;
      nationalityIds.add(nationalityId);
    }

    return false;
  }


  isObjectEmpty(obj: any): boolean {
    for (const key in obj) {
      if (
        obj[key] !== undefined &&
        obj[key] !== null &&
        obj[key] !== '' &&
        !(Array.isArray(obj[key]) && obj[key].length === 0)
      ) {
        return false;
      }
    }
    return true;
  }

  onSubsidiaryChange(event) {

    if (this.classificationApplicabilityForm.value?.subsidiary !== 'ALL' && event.length > 0) {
      this.subsidiaryFilter = [`subsidiary=${event.map(item => item.id).join(',')}`];
    } else {
      this.subsidiaryFilter = []
    }
  }


}
