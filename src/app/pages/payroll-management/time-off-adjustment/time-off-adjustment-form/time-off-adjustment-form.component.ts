import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { addMonths, differenceInDays } from 'date-fns';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { S3UploadService } from 'src/app/shared/services/s3-upload.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { employeeFilterMeta, formSections, timeoffAdjustmentFormMeta } from '../timeoff-adjustment-data';

@Component({
  selector: 'app-time-off-adjustment-form',
  templateUrl: './time-off-adjustment-form.component.html',
  styleUrls: ['./time-off-adjustment-form.component.scss']
})
export class TimeOffAdjustmentFormComponent implements OnInit {

  uploadDocumentForm: FormGroup;
  timeoffAdjustmentForm: FormGroup;
  formData: any ;
  detectedError: boolean = false;
  isLoading: boolean = true;
  formSections: Sections = formSections;
  submit: boolean = false;
  browseReset: boolean = false;
  payrollCycleDays;
  timeoffAdjustmentData: any = [];
  isProcessing: boolean = false;
  theme: string = this.sharedService.getTheme();
  id;
  days = 30;
  lockTransaction:boolean = false;
  employeeFilterMeta: any = employeeFilterMeta
  baseCompSum = 0;
  uploadSaved: boolean = false;
  formTemplateRef: TemplateRef<any>;
  activeTemplateName: string;
  private modalRef: NgbModalRef;
  private valueChangesSubscription: Subscription;
  private unsubscribe: Subscription[] = [];
  minDate: Date;
  maxDate: Date;
  attendanceStatus: boolean = false;
  checkAttendance: boolean = false;
  checkMsg: string = '';
  checkLeave: boolean = false;
  leaveStatus: boolean = false;

  constructor(public sharedService: SharedService, private dynamicFormService: DynamicFormService, private s3service: S3UploadService, private route: ActivatedRoute, public apiService: ApiService, private modalService: NgbModal, private cdRef: ChangeDetectorRef, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formData = timeoffAdjustmentFormMeta;


    this.formData.labels[10].hide = true;

    const routeSub = this.route.params.subscribe(params => {
      // Access route parameters here
      this.id = params['id'];
    });
    this.timeoffAdjustmentForm = this.dynamicFormService.createControl(this.formData);
    // this.uploadDocumentForm = this.formBuilder.group({
    //   type: [''],
    //   name: [''],
    //   attachment: []
    // });
    if (this.id) {
      this.formData.labels[10].hide = false;

      this.gettimeOffData();

    }
    else {
      this.isLoading = false;
    }
    this.subscribeToValueChanges();
  }
  ngOnDestroy() {
    this.unsubscribeFromValueChanges();
  }
  subscribeToValueChanges() {


    this.valueChangesSubscription = this.timeoffAdjustmentForm.valueChanges.subscribe(() => {
      if(!this.lockTransaction){
        if (this.timeoffAdjustmentForm.value.startDate && this.timeoffAdjustmentForm.value.endDate) {


          // this.calculateNumberOfDays();
          this.calDays()
        }
        else {
          this.timeoffAdjustmentForm.patchValue({
            "days": '',
            "LOPDays": '',
            "amount": 0
          }, { emitEvent: false })
        }
        if (this.timeoffAdjustmentForm.value.timeOffType && this.timeoffAdjustmentForm.value.startDate && this.timeoffAdjustmentForm.value.endDate) {
          this.calculateLossOfPay();
        }
        else {
          this.timeoffAdjustmentForm.patchValue({
            "LOPDays": '',
            "amount": 0
          }, { emitEvent: false })
        }
      }

    });
  }
  unsubscribeFromValueChanges() {
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
  }
  gettimeOffData() {
    this.isLoading = true;
    this.apiService.get(`payroll/time-off-adjustment/${this.id}`).subscribe({
      next: (res: any) => {
        if (res) {
          this.timeoffAdjustmentData = res?.data;
          if(res?.data?.attendanceID || res?.data?.leaveID){
            this.lockTransaction = true;
          }
          this.unsubscribeFromValueChanges();
          this.timeoffAdjustmentForm.patchValue(res?.data, { emitEvent: false, onlySelf: true })
          this.timeoffAdjustmentForm.patchValue({
            "employeeId": res?.data?.employee?.id
          }, { emitEvent: false, onlySelf: true })

          this.timeoffAdjustmentForm.patchValue(res?.data?.attachment)
          this.timeoffAdjustmentForm.patchValue({
            "attachment": res?.data?.attachment
          })
          // this.uploadDocumentForm.value.files.patchValue(res?.data?.attachment.files[0])

          //
          this.isLoading = false;
          this.baseCompSum = res?.data?.employee?.grossPay ? res?.data?.employee?.grossPay : 0;
          this.payrollCycleDays = res?.data?.employee?.payrollCycle;
          if(res?.data?.employee?.payrollCycle?.cycleType?.id === '2' || res?.data?.employee?.payrollCycle?.cycleType?.id === '3'){
            this.days = 30;
          }
          else{
            this.days = this.getDays(res?.data?.employee?.payrollCycle?.dayFrom)
          }
          this.cdRef.detectChanges();
          this.subscribeToValueChanges();
        }
      }, error: (error: any) => {
        this.detectedError = true;


      }


    });
  }
  onSubmit() {

    this.submit = true;
    if (this.timeoffAdjustmentForm.invalid || this.checkValidity()) {


      return '';
    }
    else {


      this.isProcessing = true;

      if (this.id) {
        this.apiService.put(`payroll/time-off-adjustment/${this.id}`, this.timeoffAdjustmentForm.value).subscribe({
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
        let reqBody = { ...this.timeoffAdjustmentForm.getRawValue() };
        this.apiService.post(`payroll/time-off-adjustment`, reqBody, 'Time Off Adjustment'
        ).subscribe({
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
  checkValidity() {





    if (this.timeoffAdjustmentForm.value.requestType === '2') {
      if (this.checkAttendance) {
        return !this.attendanceStatus;
      }
      else {
        return false
      }
    }
    else {
      if (this.checkLeave) {
        return !this.leaveStatus;
      }
      else {
        return false
      }
    }

  }
  requestTypeChange() {


    if (this.timeoffAdjustmentForm.value.type === '1') {
      if (!this.checkAttendance) {
        this.checkComponent();
      }
      else {
        if (!this.attendanceStatus) {
          this.checkMsg = 'Please ensure Component Mapping is completed before proceeding with this transaction.'
        }
        else {
          this.checkMsg = '';
        }
      }
    }
    else {
      if (!this.checkLeave) {
        this.checkComponent();
      }
      else {
        if (!this.leaveStatus) {
          this.checkMsg = 'Please ensure Component Mapping is completed before proceeding with this transaction.'
        }
        else {
          this.checkMsg = '';
        }
      }
    }
  }
  checkComponent() {
    this.checkMsg = '';
    let checkId
    if (this.timeoffAdjustmentForm.value.type === '1') {
      checkId = 7
    } else {
      checkId = 8
    }
    if (checkId) {
      this.apiService.get(`payroll/time-off-adjustment/check/component/${checkId}`).subscribe({
        next: (res: any) => {
          if (res) {
            if (this.timeoffAdjustmentForm.value.type === '8') {
              this.checkAttendance = true;
              this.attendanceStatus = res?.status;
            }
            else {
              this.checkLeave = true;
              this.leaveStatus = res?.status;

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
  }
  handleError(error: any) {
    this.isProcessing = false;
    this.detectedError = true;
    this.cdRef.detectChanges();


  }
  calculateLossOfPay() {
    const startTimestamp = new Date(this.timeoffAdjustmentForm.value.startDate);
    const endTimestamp = new Date(this.timeoffAdjustmentForm.value.endDate);
    const totalDays = differenceInDays(endTimestamp, startTimestamp) + 1;
    let lopDays;
    if (this.timeoffAdjustmentForm.value.timeOffType === "2") {
      lopDays = totalDays * 0.75;
    }
    else if (this.timeoffAdjustmentForm.value.timeOffType === "3") {
      lopDays = totalDays * 0.5;
    }
    else if (this.timeoffAdjustmentForm.value.timeOffType === "4") {
      lopDays = totalDays * 0.25;
    }
    else if (this.timeoffAdjustmentForm.value.timeOffType === "5") {
      lopDays = totalDays;
    }
    let perDayRate;
    if(this.payrollCycleDays?.cycleType?.id === '2'){
      const difference = this.getDays(this.payrollCycleDays?.dayFrom);
      const grossPerDayRate = this.baseCompSum / this.days;
      const UOM = difference ? this.days / difference : this.days;
      perDayRate = (grossPerDayRate) * (UOM);
    }
    else{
      const grossPerDayRate = this.baseCompSum / this.days;
      perDayRate = grossPerDayRate
    }
    this.timeoffAdjustmentForm.patchValue({
      "LOPDays": lopDays,
      "amount": this.baseCompSum ? (lopDays * perDayRate).toFixed(3) : 0
    }, { emitEvent: false })

  }
  calculateNumberOfDays() {

    const startTimestamp = new Date(this.timeoffAdjustmentForm.value.startDate);
    const endTimestamp = new Date(this.timeoffAdjustmentForm.value.endDate);



    this.timeoffAdjustmentForm.patchValue({
      "days": differenceInDays(endTimestamp, startTimestamp) + 1
    }, { emitEvent: false })

  }
  calDays() {
    const startTimestamp = new Date(this.timeoffAdjustmentForm.value.startDate);
    const endTimestamp = new Date(this.timeoffAdjustmentForm.value.endDate);
    this.sharedService.getDateDifference(startTimestamp, endTimestamp)

    this.timeoffAdjustmentForm.patchValue({
      "days": this.sharedService.getDateDifference(startTimestamp, endTimestamp)
    }, { emitEvent: false })


  }
  getFormTemplate(template: TemplateRef<any>, name: string) {
    this.formTemplateRef = template
    this.activeTemplateName = name;
    this.resetFilePond();
  }
  onDrawerSave(event) {
    this.uploadSaved = true;
  }
  onDrawerCancel(event) {

  }

  // onFileUpload(event) {
  //

  //   this.uploadDocumentForm.patchValue({
  //     attachment: event.files
  //   })
  // }
  fetchSalaryDetails(event) {

    this.baseCompSum = event?.grossPay ? event?.grossPay : 0;
    this.payrollCycleDays = event?.payrollCycle;
    if(event?.payrollCycle?.cycleType?.id === '2' || event?.payrollCycle?.cycleType?.id === '3'){
      this.days = 30;
    }
    else{
      if(event?.payrollCycle?.dayFrom){
        const difference = this.getDays(event?.payrollCycle?.dayFrom);

        this.days = difference ? difference : 30
      }
      else{
        this.days = 30;
      }

    }
    if (this.timeoffAdjustmentForm.value.timeOffType && this.timeoffAdjustmentForm.value.startDate && this.timeoffAdjustmentForm.value.endDate) {
      this.calculateLossOfPay();
    }
    else {
      this.timeoffAdjustmentForm.patchValue({
        "days": '',
        "LOPDays": '',
        "amount": 0
      }, { emitEvent: false })
    }
  }
  getDays(dayFrom){
     // Get the current date
     const currentDate = new Date();

     // Calculate the start date of the cycle
     const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayFrom);

     // Calculate the end date of the cycle
     const endDate = addMonths(startDate,1);
     // Calculate the difference in days

     return differenceInDays(endDate, startDate);
  }
  onDateSelected(selectedDate: Date, fieldName: string): void {
    if (fieldName === "startDate") {
      this.minDate = new Date(selectedDate)

    }
    if (fieldName === "endDate") {
      this.maxDate = new Date(selectedDate)

    }
  }
  private resetFilePond() {
    this.browseReset = true;
    setTimeout(() => {
      this.browseReset = false;
    }, 1000);
  }
}
