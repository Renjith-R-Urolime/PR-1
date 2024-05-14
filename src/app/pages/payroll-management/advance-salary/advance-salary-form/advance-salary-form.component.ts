import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { addMonths, addYears, format } from 'date-fns';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { S3UploadService } from 'src/app/shared/services/s3-upload.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { advanceSalaryFormMeta, employeeFilterMeta, formSections } from '../advance-salary-data';
@Component({
  selector: 'app-advance-salary-form',
  templateUrl: './advance-salary-form.component.html',
  styleUrls: ['./advance-salary-form.component.scss']
})
export class AdvanceSalaryFormComponent implements OnInit {

  advanceSalaryForm: FormGroup;
  formData: any;
  detectedError: boolean = false;
  isLoading: boolean = true;
  formSections: Sections = formSections;
  employeeFilterMeta: any = employeeFilterMeta
  submit: boolean = false;
  advanceSalaryData: any = [];
  isProcessing: boolean = false;
  theme: string = this.sharedService.getTheme();
  employeeList: any = [];
  installmentTable: any = [];
  id;
  advanceStatus: boolean = false;
  loanStatus: boolean = false;
  checkAdvance: boolean = false;
  checkLoan: boolean = false;
  private unsubscribe: Subscription[] = [];
  private modalRef: NgbModalRef;
  installMinDate: Date;
  checkMsg: string = '';

  constructor(public sharedService: SharedService, private dynamicFormService: DynamicFormService, private s3service: S3UploadService, private route: ActivatedRoute, public apiService: ApiService, private modalService: NgbModal, private cdRef: ChangeDetectorRef) { }


  ngOnInit() {
    this.formData = advanceSalaryFormMeta;
    this.formData.labels[11].hide = true;
    this.formData.labels[10].hide = true;
    const routeSub = this.route.params.subscribe(params => {
      // Access route parameters here
      this.id = params['id'];
    });
    this.installMinDate = new Date();
    this.advanceSalaryForm = this.dynamicFormService.createControl(this.formData);
    if (this.id) {
      this.formData.labels[11].hide = false;
      this.getSalaryAdvanceData();
    }
    else {
      this.isLoading = false;
    }
    const valueSub = this.advanceSalaryForm.valueChanges.subscribe(() => {
      if (this.advanceSalaryForm.value.amount && this.advanceSalaryForm.value.noOfInstallment && this.advanceSalaryForm.value.installmentStartDate && this.advanceSalaryForm.value.installmentRecoveryType) {
        this.calculateInstallments();
      }
    });
    this.unsubscribe.push(valueSub, routeSub)
  }
  getSalaryAdvanceData() {
    this.isLoading = true;
    this.apiService.get(`payroll/salary-advance/${this.id}`).subscribe({
      next: (res: any) => {
        if (res) {


          this.advanceSalaryData = res?.data;
          this.advanceSalaryForm.patchValue(res?.data)
          this.advanceSalaryForm.patchValue({
            "employeeId": res?.data?.employee?.id
          });
          if(res?.data?.paymentMethod === '1'){
            this.formData.labels[10].hide = false;
          }
          else{
            this.formData.labels[10].hide = true;
          }
          this.installMinDate = new Date(res?.data?.installmentStartDate)
          this.isLoading = false;
          this.cdRef.detectChanges();
        }
      }, error: (error: any) => {
        this.detectedError = true;


      }


    });
  }
  checkComponent() {
    this.checkMsg = '';
    this.apiService.get(`payroll/salary-advance/check/component/${this.advanceSalaryForm.value.requestType}`).subscribe({
      next: (res: any) => {
        if (res) {

          if (this.advanceSalaryForm.value.requestType === '1') {
            this.checkAdvance = true;
            this.advanceStatus = res?.status;
          }
          else {
            this.checkLoan = true;
            this.loanStatus = res?.status;
          }
          if (!res?.status) {
            this.checkMsg = 'Please ensure Component Mapping is completed before proceeding with this transaction.'
          }
          this.cdRef.detectChanges();
        }
      }, error: (error: any) => {
        this.detectedError = true;


      }


    });
  }
  // customValidator(control){
  //   // Check if the field is empty and if the controlling field has specific value
  //   if (!control.value && control.parent && control.parent.get('paymentMethod').value === 'Payroll') {
  //     return { requiredMessage: 'This field is required when specific value is selected.' };
  //   }
  //   return null;
  // }
  // onPaymentMethodChange(event) {
  //   this.advanceSalaryForm.patchValue({
  //     "payrollType": null
  //   })
  //
  //   if (Number(event.id )=== 1) {
  //
  //     this.advanceSalaryForm.get('payrollType').setValidators([Validators.required,this.customValidator]);
  //
  //
  //   }
  //   else {
  //     this.advanceSalaryForm.get('payrollType').clearValidators();
  //
  //
  //   }
  //   this.advanceSalaryForm.get('payrollType').updateValueAndValidity();

  // }

  onSubmit() {

    this.submit = true;
    if (this.advanceSalaryForm.invalid || this.checkValidity()) {


      return '';
    }
    else {

      this.isProcessing = true;

      if (this.id) {
        this.apiService.put(`payroll/salary-advance/${this.id}`, this.advanceSalaryForm.value, 'advance-salary').subscribe({
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
        this.apiService.post(`payroll/salary-advance`, this.advanceSalaryForm.value, 'Advance salary').subscribe({
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
  onFileSelect(event) {
    const file = event.target.files[0];
    this.s3service.uploadFile(file).then((imageKey: string) => {

      this.advanceSalaryForm.patchValue({
        "attachment": imageKey
      })
    })
      .catch((error: any) => {
        console.error('Error patching image key:', error);
      });

  }
  calculateInstallmentDates(startDate, installmentIndex, recoveryType) {


    switch (recoveryType.toString()) {
      case '1':
        return addMonths(startDate, installmentIndex);
      case '2':
        return addMonths(startDate, installmentIndex * 2);
      case '3':
        return addMonths(startDate, installmentIndex * 3);
      case '4':
        return addMonths(startDate, installmentIndex * 6);
      case '5':
        return addYears(startDate, installmentIndex);
      default:
        throw new Error('Invalid recovery type');
    }
  }
  calculateInstallments() {
    if (this.advanceSalaryForm.value.amount && this.advanceSalaryForm.value.noOfInstallment) {
      const installmentAmount = this.advanceSalaryForm.value.amount / this.advanceSalaryForm.value.noOfInstallment;

      const startDate = new Date(this.advanceSalaryForm.value.installmentStartDate);
      // Assuming startDate, installmentAmount, and format are already defined

      this.installmentTable = Array.from({ length: this.advanceSalaryForm.value.noOfInstallment }, (_, index) => {
        const installmentDate = this.calculateInstallmentDates(startDate, index, this.advanceSalaryForm.value.installmentRecoveryType);
        return { amount: installmentAmount, date: format(installmentDate, 'yyyy/MM/dd') };
      });
    }

  }

  handleError(error: any) {
    this.isProcessing = false;
    this.detectedError = true;
    this.cdRef.detectChanges();


  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  requestTypeChange() {
    if (this.advanceSalaryForm.value.requestType === '1') {
      if (!this.checkAdvance) {
        this.checkComponent();
      }
      else {
        if (!this.advanceStatus) {
          this.checkMsg = 'Please ensure Component Mapping is completed before proceeding with this transaction.'
        }
        else {
          this.checkMsg = '';
        }
      }
    }
    else {
      if (!this.checkLoan) {
        this.checkComponent();
      }
      else {
        if (!this.loanStatus) {
          this.checkMsg = 'Please ensure Component Mapping is completed before proceeding with this transaction.'
        }
        else {
          this.checkMsg = '';
        }
      }
    }
  }
  checkValidity() {
    if (this.advanceSalaryForm.value.requestType === '1') {
      if (this.checkAdvance) {
        return !this.advanceStatus;
      }
      else {
        return false
      }
    }
    else {
      if (this.checkLoan) {
        return !this.loanStatus;
      }
      else {
        return false
      }
    }
  }
  paymentMethodChange(event){
    if(event){
      if(event?.id === '1'){
        this.formData.labels[10].hide = false;
      }
      else{
        this.formData.labels[10].hide = true;
      }
    }
    else{
      this.formData.labels[10].hide = true;
    }
  }
}
