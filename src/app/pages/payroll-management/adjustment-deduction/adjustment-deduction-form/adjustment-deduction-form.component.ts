import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { addMonths, format } from 'date-fns';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { S3UploadService } from 'src/app/shared/services/s3-upload.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { adjustmentFormMeta, deductionFormMeta, deductionFormSections, employeeFilterMeta, formSections } from '../adjustment-deduction-data';
@Component({
  selector: 'app-adjustment-deduction-form',
  templateUrl: './adjustment-deduction-form.component.html',
  styleUrls: ['./adjustment-deduction-form.component.scss']
})
export class AdjustmentDeductionFormComponent implements OnInit {

  adjustmentDeductionForm: FormGroup;
  formData: any;
  frequencyDisable:boolean = false;
  detectedError: boolean = false;
  isLoading: boolean = true;
  formSections: Sections;
  submit: boolean = false;
  adjustmentData: any = [];
  isProcessing: boolean = false;
  theme: string = this.sharedService.getTheme();
  id;
  employeeFilterMeta: any = employeeFilterMeta
  dateArray: Date[] = [];
  private unsubscribe: Subscription[] = [];
  minDate: Date;

  constructor(public sharedService: SharedService, private dynamicFormService: DynamicFormService, private route: ActivatedRoute, public apiService: ApiService, private modalService: NgbModal, private cdRef: ChangeDetectorRef, private s3service: S3UploadService, private router: Router) { }

  onEmployeeChange(event) {
    this.adjustmentDeductionForm.patchValue({
      "date":null
    })



    // it has been mentioned that joiningDate<=payrollOnboardDate always
    if(event.hireDate && event.payrollOnboardDate){
    this.minDate = new Date(event.payrollOnboardDate);
    }
    else{
      this.minDate = new Date(event.hireDate);
    }
    this.cdRef.detectChanges();
  }

  goToList() {
    this.router.navigate([`/payroll-management/adjustment`]);
    this.sharedService.onModalClose();
  }
  goToView() {
    this.router.navigate([`/payroll-management/adjustment/view/${this.id}`]);
    this.sharedService.onModalClose();
  }

ngOnInit() {
  const urlSegments = this.router.url.split('/').map(segment => segment.toLowerCase());

  if (urlSegments.includes('adjustment')) {
    this.formSections = formSections;
    this.formData = adjustmentFormMeta;
  }
  else {
    this.formSections = deductionFormSections;
    this.formData = deductionFormMeta;
  }
  this.formData.labels[5].hide = true;
    this.formData.labels[6].hide = true;
    this.formData.labels[10].hide = true;
  const routeSub = this.route.params.subscribe(params => {
    // Access route parameters here
    this.id = params['id'];
  });
  this.adjustmentDeductionForm = this.dynamicFormService.createControl(this.formData);
  if (this.id) {
    this.formData.labels[10].hide = false;
    this.frequencyDisable = true;
    this.getAdjustmentData();
  }
  else {
    this.isLoading = false;
  }
  const valueChangeSub = this.adjustmentDeductionForm.valueChanges.subscribe(() => {
    if (this.adjustmentDeductionForm.value.date && this.adjustmentDeductionForm.value.noOfMonth) {
      this.calculateEndDate();
    }
    if (this.adjustmentDeductionForm.value.date && this.adjustmentDeductionForm.value.amount && this.adjustmentDeductionForm.value.noOfMonth) {
      this.calculateDates();
    }

  });
  this.unsubscribe.push(routeSub, valueChangeSub);
}
getAdjustmentData() {
  this.isLoading = true;
  this.apiService.get(`payroll/adjustment/${this.id}`).subscribe({
    next: (res: any) => {
      if (res) {
        this.adjustmentData = res?.data;
        this.adjustmentDeductionForm.patchValue(res?.data)
        this.adjustmentDeductionForm.patchValue({
          "employeeId": res?.data?.employee?.id,
          "componentId": res?.data?.component?.id
        });

        this.minDate = new Date( res?.data?.employee?.payPeriodStartDate);
        this.isLoading = false;
        this.cdRef.detectChanges();
      }
    }, error: (error: any) => {
      this.detectedError = true;


    }


  });
}
onSubmit() {


  let apiUrl = '';
  let recordName = '';
  const urlSegments = this.router.url.split('/').map(segment => segment.toLowerCase());

  if (urlSegments.includes('adjustment')) {
    apiUrl = 'payroll/adjustment';
    recordName = 'Adjustment'
  }
  else {
    apiUrl = 'payroll/deduction';
    recordName = 'Deduction'
  }
  this.submit = true;
  if (this.adjustmentDeductionForm.invalid) {
    return '';
  }
  else {
    this.isProcessing = true;

    if (this.id) {
      this.apiService.put(`${apiUrl}/${this.id}`, this.adjustmentDeductionForm.value, recordName).subscribe({
        next: (res: any) => {
          if (res) {
            this.sharedService.handleSuccessModel({ id: res._id});
          }
        },
        error: (error: any) => {
          this.handleError(error);
        }
      }
      );

    }
    else {
      this.apiService.post(apiUrl, this.adjustmentDeductionForm.value, recordName).subscribe({
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

onModelCancel() {
  this.sharedService.onModalClose();
}
handleError(error: any) {
  this.isProcessing = false;
  this.detectedError = true;
  this.cdRef.detectChanges();


}
onFileSelect(event) {
  const file = event.target.files[0];
  this.s3service.uploadFile(file).then((imageKey: string) => {

    this.adjustmentDeductionForm.patchValue({
      "attachment": imageKey
    })
  })
    .catch((error: any) => {
      console.error('Error patching image key:', error);
    });

}
onFrequencyChange(event: any) {
  if (this.adjustmentDeductionForm.value.frequency === '1') {
    this.formData.labels[5].hide = false;
    this.formData.labels[6].hide = false;
  } else {
    this.formData.labels[5].hide = true;
    this.formData.labels[6].hide = true;
    this.dateArray = [];
    this.adjustmentDeductionForm.patchValue({
      "noOfMonth": '',
      "toDate": ''
    }, { emitEvent: false })
  }
}
calculateDates() {
  this.dateArray = [];
  let currentDate = new Date(this.adjustmentDeductionForm.value.date);
  for (let i = 0; i < this.adjustmentDeductionForm.value.noOfMonth; i++) {
    this.dateArray.push(addMonths(currentDate, i));
  }

}
ngOnDestroy() {
  this.unsubscribe.forEach((sb) => sb.unsubscribe());
}
calculateEndDate() {
  if (this.adjustmentDeductionForm.value.noOfMonth > 0) {
    const endDate = addMonths(new Date(this.adjustmentDeductionForm.value.date), (this.adjustmentDeductionForm.value.noOfMonth) - 1)
    this.adjustmentDeductionForm.patchValue({
      "toDate": format(endDate, 'yyyy/MM/dd')
    }, { emitEvent: false })
  }
  else {
    this.adjustmentDeductionForm.patchValue({
      "toDate": ''
    }, { emitEvent: false })
  }
}
onDateSelected(selectedDate: Date, fieldName: string): void {

  // Update the form control with the selected date
  this.adjustmentDeductionForm.get(fieldName)?.setValue(selectedDate);
}
}
