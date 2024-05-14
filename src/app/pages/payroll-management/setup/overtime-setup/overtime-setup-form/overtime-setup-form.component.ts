import { ChangeDetectorRef, Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbDateParserFormatter, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { classificationApplicabilityFormMeta, formSections, overtimeSetupFormMeta } from '../overtime-setup.data';
@Component({
  selector: 'app-overtime-setup-form.component.ts',
  templateUrl: './overtime-setup-form.component.html',
  styleUrls: ['./overtime-setup-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OvertimeSetupFormComponent {
  isLoading: boolean = false;
  detectedError: boolean = false;
  overtimeSetupForm: FormGroup;
  submit: boolean = false;
  formSections: Sections = formSections;
  formData: any = overtimeSetupFormMeta;
  theme: string = this.sharedService.getTheme();
  overtimeSetupData: any = {};
  formTemplate: TemplateRef<any>;
  activeTemplateName: string
  isProcessing: boolean = false
  leaveApplicationForm: FormGroup;
  classificationApplicabilityForm: FormGroup;
  classificationApplicabilityFormData: any = classificationApplicabilityFormMeta
  saveButtonDisable: boolean = false
  headerText: string
  employeeOtMatrixFormSaved: boolean = false
  col: any = 4
  isVariablePay: boolean = false
  isSalaryPay: boolean = false
  isNight: boolean = false
  isSpecificDay: boolean = false
  private modalRef: NgbModalRef;
  public activeModal: NgbActiveModal
  classificationApplicabilityFormSaved: boolean = false
  defineRangeFormSaved: boolean = false
  overtimeCalculationFormSaved: boolean = false
  onDrawerSaveData: any = []
  rangeStatus: boolean = true
  rangePreviousState: any
  formula: any = { expression: '', variables: [] };
  formattedExpression: any = ''
  availableVariables: any[] = [
    { name: 'OT Hour', value: '$otHour' },
    { name: 'OT Rate', value: '$otRate' },
    { name: 'OT Ratio', value: '$otRatio' },
    { name: 'Per hour Salary', value: '$perHourSalary' },
    { name: 'Per Day Salary', value: '$perDay' },
  ];
  previousSavedFormula: any = ""
  showTrySection: boolean = false
  showFormulaSection: boolean = true
  result: any
  showResult: boolean = false
  formattedFormula: string = '';
  formulaCondition: any
  infithraFormula: any
  formulaMakerStatus: boolean = false
  isOtTypeFixed: boolean = false
  subsidiaryFilter: string[] = [];

  constructor(public cdr: ChangeDetectorRef, public sharedService: SharedService, private fb: FormBuilder, private ngbFormatter: NgbDateParserFormatter, private dynamicFormService: DynamicFormService, private route: ActivatedRoute, public apiService: ApiService, private modalService: NgbModal, private cdRef: ChangeDetectorRef, private router: Router) { }
  id;
  @ViewChild('customTemplate') customTemplate: TemplateRef<any>;

  ngOnInit() {

    this.route.params.subscribe(params => {
      // Access route parameters here
      this.id = params['id'];
    });
    this.overtimeSetupForm = this.dynamicFormService.createControl(this.formData);
    this.classificationApplicabilityForm = this.dynamicFormService.createControl(this.classificationApplicabilityFormData)
    this.overtimeSetupForm.addControl('ranges', this.fb.array([this.createSubForm()]));
    const newControl = this.fb.control(null)
    this.overtimeSetupForm.addControl('overtimeFormula', newControl);

    if (this.id) {
      this.getOvertimeSetupData();
    }

    if (!this.id) {
      const items = this.overtimeSetupForm.get('ranges') as FormArray;
      items.at(0).get('from').patchValue("00:00");
      this.formData.labels.forEach(label => label.hide = true);

      const indicesToShow: number[] = [0, 1, 2, 3, 4, 12, 15, 18];

      indicesToShow.forEach(index => {
        this.formData.labels[index].hide = false;
      });


    }


    if (this.isObjectEmpty(this.classificationApplicabilityForm?.value)) {
      this.classificationApplicabilityFormSaved = false
    }
    else {
      this.classificationApplicabilityFormSaved = true
    }
    this.isOtTypeFixed = false;

  }
  onSubsidiaryChange(event) {

    if (this.classificationApplicabilityForm.value?.subsidiary !== 'ALL' && event.length > 0) {
      this.subsidiaryFilter = [`subsidiary=${event.map(item => item.id).join(',')}`];
    } else {
      this.subsidiaryFilter = []
    }
  }
  getFormTemplate(template: TemplateRef<any>, headerText: string, name: string) {

    this.activeTemplateName = name
    this.headerText = headerText;
    this.formTemplate = template;

    if (this.headerText == 'overtimeCalculationCustomFormula') {
      if (this.previousSavedFormula != "") {
        this.formattedExpression = JSON.parse(this.previousSavedFormula)
      }
    }
  }

  newModel(model, headerText) {
    this.rangeStatus = true;
    const rangesArray = this.overtimeSetupForm.get('ranges') as FormArray;
    this.rangePreviousState = rangesArray.value.map((item: any) => ({ ...item }));
    this.headerText = headerText
    this.modalRef = this.modalService.open(model, {
      size: 'lg', scrollable: false, windowClass: 'settings-form-modal', backdrop: 'static'
    });
  }

  employeeOtMatrixModal(model, headerText) {
    this.headerText = headerText
    this.modalRef = this.modalService.open(model, {
      size: 'md', scrollable: false, windowClass: 'settings-form-modal', backdrop: 'static'
    });
  }


  onModelSubmit() {
    const items = this.overtimeSetupForm.get('ranges') as FormArray;
    let status = this.checkGraduatedTiering(items.value)

    const firstItem = items.at(0);
    if (items.status == 'VALID' && status == true) {
      this.modalRef.close();
      this.rangeStatus = true
      this.defineRangeFormSaved = true
    }
    else if (items.length == 1 && firstItem.get('from').value == '00:00' &&
      !firstItem.get('to').value &&
      !firstItem.get('otRate').value) {
      this.rangeStatus = true
      this.modalRef.close();
    }
    else {
      this.rangeStatus = false

    }
  }

  handleCancelModalClick() {
    const rangesArray = this.overtimeSetupForm.get('ranges') as FormArray;

    // Clear existing controls in the FormArray
    rangesArray.clear();

    // Patch values from the saved state
    this.rangePreviousState.forEach((item: any) => {
      rangesArray.push(this.createSubForm(item.from, item.to, item.otRate));
    });
    this.modalRef.close();
  }


  handleCancelModalClickEmplyeeMatrix() {
    this.modalRef.close();
  }
  addMore() {
    const items = this.overtimeSetupForm.get('ranges') as FormArray;
    if (items.status == 'VALID') {
      const lastItem = items.length > 0 ? items.at(items.length - 1).get('to').value : '00:00'
      this.rangeStatus = true
      items.push(this.createSubForm());
      const newFromValue = this.incrementTime(lastItem)

      items.at(items.length - 1).get('from').patchValue(newFromValue);
    }
    else {
      this.rangeStatus = false
    }
  }

  //////////////////////////////////////Graduated tiring of hour ///////////////////////////////////////////////////////////////////
  incrementTime(time: string): string {
    const [hoursStr, minutesStr] = time.split(':');

    let hours = parseInt(hoursStr, 10);
    let minutes = parseInt(minutesStr, 10);
    minutes++;
    if (minutes === 60) {
      hours++;
      minutes = 0;
    }
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  }

  onSubmit() {

    if (this.overtimeSetupForm?.value.overtimeFormulaType == '1') {
      this.overtimeSetupForm.patchValue({
        overtimeFormula: this.infithraFormula
      })
    }

    if (this.overtimeSetupForm?.value.type == '1') {
      this.isOtTypeFixed = true;
    }

    this.submit = true;
    if (this.overtimeSetupForm.controls.name['status'] != 'VALID') {
      return '';
    }
    else {
      this.isProcessing = true;
      const refinedData = this.sharedService.removeUndefinedAndNullFields({ ...this.overtimeSetupForm.value })

      let classificationData
      let classificationfilter
      if (this.classificationApplicabilityForm.dirty) {
        classificationData = this.mapClassificationApplicabilityValues(this.classificationApplicabilityForm.value)
        classificationfilter = { filters: this.createClassificationApplicabilityFilterObject() }
      }
      else {
        classificationData = {},
          classificationfilter = {}
      }
      if (this.id) {
        let updatedOtFormData = this.dynamicFormService.getUpdatedData(this.overtimeSetupForm)
        this.apiService.put(`payroll/setup/overtime-setup/${this.id}`, { ...updatedOtFormData, ...classificationData, ...classificationfilter }, 'overtime-setup').subscribe({
          next: (res: any) => {
            if (res) {

              if (this.isOtTypeFixed) {
                this.sharedService.handleSuccessModel({ id: this.id, btnTemplate: this.customTemplate });
              }
              else {
                this.sharedService.handleSuccessModel({ id: this.id });
              }
            }
          },
          error: (error: any) => {

          }
        }
        );
      }
      else {



        this.apiService.post(`payroll/setup/overtime-setup`, { ...refinedData, ...classificationData, ...classificationfilter }, 'overtime-setup').subscribe({
          next: (res: any) => {
            if (res) {

              if (this.isOtTypeFixed) {
                this.sharedService.handleSuccessModel({ id: res?._id, btnTemplate: this.customTemplate });
              }
              else {
                this.sharedService.handleSuccessModel({ id: res?._id });
              }

            }
          },
          error: (error: any) => {

          }
        }
        );
      }

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

  createClassificationApplicabilityFilterObject(): any {
    if (this.subsidiaryFilter.length > 0) {
      const filterString = this.subsidiaryFilter.join('&');
      return {
        jurisdiction: filterString,
        location: filterString,
        department: filterString,
        class: filterString,
      };
    } else if (this.classificationApplicabilityForm?.value?.subsidiary?.length > 0 && this.classificationApplicabilityForm?.value?.subsidiary!='ALL') {
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
  onDrawerSave(event) {

    this.onDrawerSaveData = this.classificationApplicabilityForm.value

    if (this.headerText == 'overtimeCalculationCustomFormula') {
      this.formulaMakerStatus = true
      this.finalFormula()
    }


    if (this.headerText == 'classificationApplicability') {

      if (this.isObjectEmpty(this.classificationApplicabilityForm?.value)) {
        this.classificationApplicabilityFormSaved = false
      }
      else {
        this.classificationApplicabilityFormSaved = true
      }
    }

  }

  onDrawerCancel(event) {
    if (this.headerText == 'classificationApplicability') {
      this.classificationApplicabilityForm.reset(this.onDrawerSaveData)
    }
  }

  remove(index) {
    this.rangeStatus = true
    this.removeItem(index);
  }



  removeItem(index: number) {
    const itemsArray = this.overtimeSetupForm.get('ranges') as FormArray;
    const requiredItem = itemsArray.at(index).value;
    if (itemsArray.length != 1) {
      itemsArray.removeAt(index);
    }
    else {
      itemsArray.clear()
      itemsArray.push(this.createSubForm());
      itemsArray.at(0).get('from').patchValue('00:00');
    }
  }

  createSubForm(from?: number, to?: number, otRate?: number): FormGroup {
    const formGroup = {};
    formGroup['from'] = new FormControl(from, Validators.required)
    formGroup['to'] = new FormControl(to, [Validators.required, this.validateToGreaterThanFrom.bind(this)])
    formGroup['otRate'] = new FormControl(otRate, Validators.required)
    return this.fb.group(formGroup);
  }

  validateToGreaterThanFrom(control: FormControl): { [key: string]: boolean } | null {
    const fromValue = control.parent?.get('from')?.value;
    const toValue = control.value;

    // Check if 'to' is greater than 'from'
    if (fromValue !== null && toValue !== null && fromValue >= toValue) {
      return { 'toGreaterThanFrom': true };
    }

    return null;
  }

  onCalendarDayChange(event) {
    if (this.overtimeSetupForm?.value.type == "3" || this.overtimeSetupForm?.value?.type?.id == "3") {
      let workingDayIncluded = this.overtimeSetupForm?.value.calendarDay.includes('1') || this.overtimeSetupForm?.value.calendarDay.some(obj => obj.id === '1')
      if (workingDayIncluded) {
        this.formData.labels[18].hide = false;
      }
      else {
        this.formData.labels[18].hide = true;
        this.resetIsNight()
      }
    }
  }








  onOtTypeChange(event: any) {
    this.resetIsNight()
    this.resetPayableCycle()
    this.resetInfithraFormula()

    if (event.id == '1' || event.id == '2') {
      this.formulaCondition = [`id=1`]
    }
    else {
      this.formulaCondition = [`id!=1`]
    }


    if (event?.id == '2') {
      this.formData.labels[5].hide = false;
      this.formData.labels[7].hide = true;
      this.formData.labels[8].hide = true;
      this.formData.labels[9].hide = true;
      this.formData.labels[10].hide = true;
      this.formData.labels[11].hide = true;
      this.formData.labels[12].hide = false;
      this.formData.labels[6].hide = true;
      this.formData.labels[16].hide = true;
      this.formData.labels[17].hide = true;
      this.formData.labels[18].hide = false;


    }
    else if (event?.id == '3') {
      this.formData.labels[5].hide = true;
      this.formData.labels[6].hide = false;
      this.formData.labels[7].hide = false;
      this.formData.labels[8].hide = false;
      this.formData.labels[9].hide = false;
      this.formData.labels[10].hide = false;
      this.formData.labels[11].hide = false;
      this.formData.labels[12].hide = false;
      this.formData.labels[16].hide = true;
      this.formData.labels[17].hide = true;
      this.formData.labels[18].hide = true;
      this.onCalendarDayChange('')

    }
    else {
      this.formData.labels[5].hide = true;
      this.formData.labels[7].hide = true;
      this.formData.labels[8].hide = true;
      this.formData.labels[9].hide = true;
      this.formData.labels[6].hide = true;
      this.formData.labels[10].hide = true;
      this.formData.labels[11].hide = true;
      this.formData.labels[12].hide = false;
      this.formData.labels[16].hide = true;
      this.formData.labels[20].hide = true;
      this.formData.labels[17].hide = false;
      this.formData.labels[18].hide = false;

    }
  }

  onCheckboxTypeChange(event, controls) {

    if (event.target.checked == true && this.overtimeSetupForm?.value?.type == '1') {
      this.formData.labels[19].hide = false;
      this.formData.labels[20].hide = false;
      this.formData.labels[21].hide = true;

    }
    else if (event.target.checked == true) {
      this.formData.labels[19].hide = false;
      this.formData.labels[20].hide = false;
      this.formData.labels[21].hide = false;

    }
    else {
      this.formData.labels[19].hide = true;
      this.formData.labels[20].hide = true;
      this.formData.labels[21].hide = true;
      this.overtimeSetupForm.patchValue({
        startTime: '',
        endTime: '',
        nightRate: ''
      })
    }
  }

  onPayableCycleChange(event) {

    if (event.name == 'Specific Day') {
      this.formData.labels[16].hide = false;
    }
    else {
      this.formData.labels[16].hide = true;
    }

  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////


  onOvertimeCalculationChange(event) {

    if (event.id == '1') {
      this.formData.labels[13].hide = false;
      this.formData.labels[14].hide = true;
    }
    else {
      this.formData.labels[13].hide = true;
      this.formData.labels[14].hide = false;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  getOvertimeSetupData() {
    this.isLoading = true;
    this.apiService.get(`payroll/setup/overtime-setup/${this.id}`).subscribe({
      next: (res: any) => {
        if (res) {
          this.subsidiaryFilter = [`subsidiary=${res?.data?.subsidiary?.map(item => item.id).join(',')}`];

          const keysToCheckClassificationData = ['department', 'subsidiary', 'jurisdiction', 'location', 'class'];
          const isClassificationDataPresent = this.isAnyKeyWithData(keysToCheckClassificationData, res?.data);
          if (isClassificationDataPresent) {
            this.classificationApplicabilityFormSaved = true
          }


          let items = this.overtimeSetupForm.get('ranges') as FormArray;
          for (var i = 0; i <= res?.data?.ranges?.length - 1; i++) {
            items.push(this.createSubForm());
          }
          this.removeItem(items.length - 1)
          this.rangeStatus = true
          this.overtimeSetupData = res?.data;
          this.overtimeSetupForm.patchValue(this.overtimeSetupData)
          this.classificationApplicabilityForm.patchValue(this.overtimeSetupData)

if((res?.data?.ranges?.length==1 && !res?.data?.ranges?.to)  || res?.data?.ranges?.length==0 ){
  let itemsArray = this.overtimeSetupForm.get('ranges') as FormArray;
  itemsArray.clear()
  itemsArray.push(this.createSubForm());
  itemsArray.at(0).get('from').patchValue('00:00');
}
          const startTime = this.overtimeSetupData?.startTime
          const endTime = this.overtimeSetupData?.endTime



          if (this.overtimeSetupData?.overtimeFormulaType?.id == '2') {
            if (this.overtimeSetupData?.overtimeFormula) {
              this.formulaMakerStatus = true
              const formulaString = this.overtimeSetupData?.overtimeFormula;
              const transformedString = this.availableVariables.reduce(
                (result, variable) => {
                  const regex = new RegExp('\\' + variable.value, 'g');
                  return result.replace(regex, `<span class="bg-${this.theme} button-display">${variable.name}</span>`);
                },
                formulaString
              );

              this.formattedExpression = transformedString
              this.formula.expression = this.overtimeSetupData?.overtimeFormula;
            }
          }







          let startTimeConverted, endTimeConverted
          if (startTime != null) {
            startTimeConverted = startTime.split(":").slice(0, 2).join(":")
          }
          if (endTime != null) {
            endTimeConverted = endTime.split(":").slice(0, 2).join(":")

          }

          this.overtimeSetupForm.patchValue({
            startTime: startTimeConverted,
            endTime: endTimeConverted,
          })

          this.isLoading = false;
          if (this.overtimeSetupData?.isNight == true && this.overtimeSetupData?.type?.id == '1') {
            this.formData.labels[19].hide = false;
            this.formData.labels[20].hide = false;
            this.formData.labels[21].hide = true;
          }
          else if (this.overtimeSetupData?.isNight == true) {
            this.formData.labels[19].hide = false;
            this.formData.labels[20].hide = false;
            this.formData.labels[21].hide = false;
          }
          else {
            this.formData.labels[19].hide = true;
            this.formData.labels[20].hide = true;
            this.formData.labels[21].hide = true;
          }
          if (this.overtimeSetupData?.payableCycle?.name == 'Specific Day') {
            this.formData.labels[16].hide = false;
          }
          else {
            this.formData.labels[16].hide = true;
          }
          if (this.overtimeSetupData?.type?.id == '2') {
            this.formulaCondition = [`id=1`]
            this.formData.labels[5].hide = false;
            this.formData.labels[7].hide = true;
            this.formData.labels[8].hide = true;
            this.formData.labels[9].hide = true;
            this.formData.labels[10].hide = true;
            this.formData.labels[11].hide = true;
            this.formData.labels[12].hide = false;
            this.formData.labels[13].hide = true;
            this.formData.labels[17].hide = true;
            let defineRangeData = this.overtimeSetupData?.ranges?.[0]
            if (defineRangeData?.to) {
              this.defineRangeFormSaved = true
            }

          }
          else if (this.overtimeSetupData?.type?.id == '3') {
            this.formulaCondition = [`id!=1`]
            this.formData.labels[5].hide = true;
            this.formData.labels[6].hide = false;
            this.formData.labels[7].hide = false;
            this.formData.labels[8].hide = false;
            this.formData.labels[9].hide = false;
            this.formData.labels[10].hide = false;
            this.formData.labels[11].hide = false;
            this.formData.labels[12].hide = false;
            this.formData.labels[17].hide = true;
            this.onCalendarDayChange('')

          }
          else if (this.overtimeSetupData?.type?.id == '1') {
            this.formulaCondition = [`id=1`]
            this.formData.labels[5].hide = true;
            this.formData.labels[7].hide = true;
            this.formData.labels[8].hide = true;
            this.formData.labels[9].hide = true;
            this.formData.labels[10].hide = true;
            this.formData.labels[11].hide = true;
            this.formData.labels[12].hide = false;
            this.formData.labels[17].hide = false;
          }

          if (this.overtimeSetupData?.overtimeFormulaType?.id == 1) {
            this.formData.labels[13].hide = false;
            this.formData.labels[14].hide = true;
          }
          else if (this.overtimeSetupData?.overtimeFormulaType?.id == 2) {
            this.formData.labels[13].hide = true;
            this.formData.labels[14].hide = false;
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
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////Check for graduated tiering //////////////////
  checkGraduatedTiering(objects): boolean {
    for (let i = 1; i < objects.length; i++) {
      const prevRange = this.convertToMinutes(objects[i - 1]);
      const currentRange = this.convertToMinutes(objects[i]);

      if (currentRange.from !== prevRange.to + 1 || currentRange.to <= currentRange.from) {
        return false;
      }
    }
    return true;
  }

  convertToMinutes(range) {
    const [fromHours, fromMinutes] = range.from.split(':').map(Number);
    const [toHours, toMinutes] = range.to.split(':').map(Number);
    return {
      from: fromHours * 60 + fromMinutes,
      to: toHours * 60 + toMinutes
    };
  }



  isAnyKeyWithData(keys, dataObject) {

    for (const key of keys) {
      if (dataObject[key] && dataObject[key].length > 0) {
        return true; // Data is present in at least one key
      }
    }

    return false; // No data found in any of the specified keys
  }


  ////////////////////////////////////Formula calculator//////////////////////////////////////////////////////////////////////////////////////////////////////////



  addVariable(variable: any): void {

    this.formula.expression += variable.value;
    this.formattedExpression += `<span class="bg-${this.theme} button-display">${variable.name}</span>`
  }

  addOperator(operator: string): void {
    this.formula.expression += ` ${operator} `;
    this.formattedExpression += ` ${operator} `
  }


  clearFormula(): void {
    this.formula.expression = '';
    this.formattedExpression = ''

    this.formula.variables = [];
  }


  addNumber(num: number): void {
    this.formula.expression += num;
    this.formattedExpression += num

  }



  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  finalFormula() {
    this.previousSavedFormula = JSON.stringify(this.formattedExpression);;
    const finalFormula = this.formula.expression;

    this.overtimeSetupForm.patchValue({
      overtimeFormula: finalFormula
    })

  }


  openVariableInput() {
    this.showFormulaSection = false;
    this.showTrySection = true
  }


  showformulaSection() {
    this.showFormulaSection = true;
    this.showTrySection = false
  }



  resetIsNight() {
    this.overtimeSetupForm.patchValue({ isNight: false })
    this.formData.labels[19].hide = true;
    this.formData.labels[20].hide = true;
    this.formData.labels[21].hide = true;
    this.overtimeSetupForm.patchValue({
      startTime: '',
      endTime: '',
      nightRate: ''
    })
  }



  onInfithraFormulaChange(event) {
    if (event) {
      this.infithraFormula = event?.formula
    }
  }


  resetOvertimeFormulaType() {
    this.overtimeSetupForm.patchValue({ overtimeFormulaType: 'null' })
    this.formData.labels[13].hide = true;
    this.cdr.detectChanges();
  }

  resetPayableCycle() {

    this.overtimeSetupForm.patchValue(
      { payableCycle: 'null' }
    )
    this.formData.labels[16].hide = true;

  }


  resetInfithraFormula() {
    this.overtimeSetupForm.patchValue(
      { infithraFormula: 'null' }
    )

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


  goToCreateEmployeeOtMatrix() {
    this.router.navigate(['payroll-management/settings/employee-ot-matrix/create']);
    this.sharedService.onModalClose();
  }

  listAll() {
    this.router.navigate(['payroll-management/setup/overtime-setup']);
    this.sharedService.onModalClose();
  }


}


