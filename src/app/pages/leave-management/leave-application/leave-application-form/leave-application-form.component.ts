import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateParserFormatter, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { add, addDays, format, isAfter, isBefore, isEqual, isSameDay } from 'date-fns';
import { forkJoin } from 'rxjs';
import { ModalComponent } from 'src/app/_metronic/partials';
import { ApiService } from 'src/app/shared/services/api.service';
import { DateCalculationService } from 'src/app/shared/services/date-calculation.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { S3UploadService } from 'src/app/shared/services/s3-upload.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { cardMetaData, employeeFilterMeta, formMeta, formSections, } from '../leave-application-data';


@Component({
  selector: 'app-leave-application-form',
  templateUrl: './leave-application-form.component.html',
  styleUrls: ['./leave-application-form.component.scss']
})
export class LeaveApplicationFormComponent implements OnInit {

  leaveApplicationForm: FormGroup;
  detectedError: boolean = false;
  leaveTypeList = [];
  leaveLoading: boolean = false;
  balanceList = [];
  selectedLeaveType: any;
  isLoading: boolean = true;
  formSections: Sections = formSections;
  formData: any = formMeta;
  isWeekendInclude: true;
  isHolidayInclude: true;
  submit: boolean = false;
  leaveApplicationData: any = [];
  isProcessing: boolean = false;
  rejoinMinDate;
  onBoardDate;
  hireDate;
  theme: string = this.sharedService.getTheme();
  id;
  docValidatnMsg = '';
  negativeLvMsg = '';
  entitlementMsg = '';
  maxLvMsg = '';
  leaveReasonList = [];
  holidayList = [];
  shiftId;
  leavePlanId;
  workCalendarId;
  shiftData: any;
  durationCondition = ["id!=3"];
  leavePayId;
  allowHourly: boolean = true;
  employeeFilterMeta: any = employeeFilterMeta
  dependentList = [];
  uploadSaved: boolean = false;
  formTemplateRef: TemplateRef<any>;
  activeTemplateName: string;
  private modalRef: NgbModalRef;
  uploadDocumentForm: FormGroup;
  leaveBalanceData = [];
  minDate: Date;
  maxDate: Date;
  includeWeekend: boolean = true;
  includeHoliday: boolean = true;
  availableDays = 0;
  leaveDays = 0;
  balanceDays = 0;
  empSelected:any
  lopDays = 0;
  cardJsonData = cardMetaData;
  selectedLeaveName: any;
  selectedAvailableDays: any;
  employeeId:any
  // leaveMeta = formMeta;
  constructor(public sharedService: SharedService, private formBuilder: FormBuilder, private ngbFormatter: NgbDateParserFormatter, private dynamicFormService: DynamicFormService, private route: ActivatedRoute, public apiService: ApiService, private modalService: NgbModal, private cdRef: ChangeDetectorRef, private s3service: S3UploadService, private router: Router, private calculateService: DateCalculationService) { }

  sample(event) {


  }

  ngOnInit() {


    //this.formData.labels[9].hide = true;
    this.route.params.subscribe(params => {
      // Access route parameters here
      this.id = params['id'];
    });



    this.route.queryParams.subscribe(params => {
      this.isLoading=true
      const employeeId: string = params['employeeId'] || '';
      this.employeeId=employeeId
    });

    this.leaveApplicationForm = this.dynamicFormService.createControl(this.formData);
    this.uploadDocumentForm = this.formBuilder.group({
      type: [null],
      name: [''],
      files: [[]]
    });
    this.formData.labels[8].hide = true;
    this.formData.labels[9].hide = true;
    this.formData.labels[3].hide = true;







    if(this.employeeId){

      this.apiService.get(`core-hr/employee/?employeeId=${this.employeeId}`,'leaveApplication').subscribe({
        next: (result:any) => {
            this.leaveApplicationForm.patchValue({
        "employeeId": result?.data?.[0]?.id,
      })
          this.onEmployeeChange(result?.data?.[0], false)
     this.empSelected=result?.data?.[0]
     this.isLoading=false

        }
      });
    }
    else{
      this.isLoading=false
    }

    if (this.id) {
      this.formData.labels[9].hide = false;
      this.getLeaveApplicationData();
    }
    else {
    //  this.isLoading = false;
      this.onDateSelected(this.leaveApplicationForm.value.startDate, 'startDate')
      this.onDateSelected(this.leaveApplicationForm.value.endDate, 'endDate')
    }
    /* this.leaveApplicationForm.controls.startDate.valueChanges.pipe(debounceTime(500), take(1) ).subscribe(() => {
      if (this.leaveApplicationForm.value.startDate) {
          this.leaveApplicationForm.patchValue({
            "endDate": this.leaveApplicationForm.value.startDate
          })
      }

    }) */
    /*  this.leaveApplicationForm.valueChanges.subscribe(() => {
         this.formData.labels[11].hide = this.leaveApplicationForm.value.duration === '3' ? true : false
     }); */
  }

  getLeaveApplicationData() {
    this.isLoading = true;
    this.apiService.get(`leave/application/${this.id}`).subscribe({
      next: (res: any) => {
        if (res) {
          this.leaveApplicationData = res?.data;
          this.availableDays = res?.data?.availableDays;
            this.balanceDays = this.availableDays - res?.data?.leaveDays;
          this.leaveApplicationForm.patchValue(res?.data)
          this.leaveApplicationForm.patchValue({
            "employeeId": res?.data?.employee?.id,
            "leaveTypeId": res?.data?.leaveType?.id,
            "status": res?.data?.status?.id
          })

          this.onEmployeeChange(res?.data?.employee, true)
          this.onDateSelected(this.leaveApplicationForm.value.startDate, 'startDate')
          this.onDateSelected(this.leaveApplicationForm.value.endDate, 'endDate')
          this.leaveApplicationForm.patchValue({
            "leaveTypeId": res?.data?.leaveType?.id,
            "leaveDuration": res?.data?.leaveDuration?.id,
            "reasonId": res?.data?.reason?.id
          })
          if (res?.data?.reason?.id === '0') {
            this.formData.labels[8].hide = false;
          } else {
            this.formData.labels[8].hide = true;
          }

          this.leaveDays = res?.data?.leaveDays,
            this.lopDays = res?.data?.lossOfPayDays
          if (res?.data?.leaveDuration?.id != '3') {
            this.formData.labels[3].hide = true;
            this.formData.labels[6].hide = false;
          }
          else {
            this.durationCondition = [];
            this.formData.labels[3].hide = false;
            this.formData.labels[6].hide = true;
          }
          this.cdRef.detectChanges();
        }
      }, error: (error: any) => {
        this.detectedError = true;

        console.error(error);
      }


    });
  }
  checkValidity() {
    let invalid = false;
    let isdocInvalid = false, isNegativeInvalid = false, isMaxInvalid = false, entitlement = false;

    if (!isNaN(this.selectedLeaveType?.thresholdDays)) {
      if (this.selectedLeaveType?.documentMandatory && this.leaveDays >= this.selectedLeaveType?.thresholdDays) {
        if (this.leaveApplicationForm.value.attachment === null || this.leaveApplicationForm.value.attachment === '' || this.leaveApplicationForm.value.attachment === undefined) {
          isdocInvalid = true;
          this.docValidatnMsg = 'Document Mandatory'
        }
      }
    }


    if (this.selectedLeaveType?.allowNegative) {
      if (this.balanceDays >= 0) {
        isNegativeInvalid = false;
      } else {
        if (!isNaN(this.selectedLeaveType?.negativeLeaveLimit)) {
          if (Math.abs(this.balanceDays) > this.selectedLeaveType?.negativeLeaveLimit) {
            isNegativeInvalid = true;
            this.negativeLvMsg = `Maximum neagtive leave allowed is ${this.selectedLeaveType?.negativeLeaveLimit}`
          }
        }
      }
    }
    if (this.selectedLeaveType?.maxLeaveAllowed != null && this.selectedLeaveType?.maxLeaveAllowed != undefined && this.selectedLeaveType?.maxLeaveAllowed != '') {
      if (this.leaveDays > this.selectedLeaveType?.maxLeaveAllowed) {
        isMaxInvalid = true;
        this.maxLvMsg = `Maximum leave allowed is ${this.selectedLeaveType?.maxLeaveAllowed}`;
      }
    }
    if (this.selectedLeaveType?.entitlement?.applicableAfterEmploymentDays != null && this.selectedLeaveType?.entitlement?.applicableAfterEmploymentDays != undefined && this.selectedLeaveType?.entitlement?.applicableAfterEmploymentDays != '') {

      const tenureDate = addDays(new Date(this.hireDate), this.selectedLeaveType?.entitlement?.applicableAfterEmploymentDays);
      const startDate = new Date(this.leaveApplicationForm.value.startDate);
      const endDate = new Date(this.leaveApplicationForm.value.endDate);
      if (isAfter(tenureDate, endDate)) {
        entitlement = true;
        const formatedDate = format(tenureDate, 'yyyy-MM-dd')
        this.entitlementMsg = `You can apply your ${this.selectedLeaveType?.name} after ${formatedDate}`
        // Handle the case where the new date is not within the specified range
      }
    }
    if (isNegativeInvalid || isdocInvalid || isMaxInvalid || entitlement) {
      invalid = true;
    }
    return invalid;
  }
  onSubmit() {

    this.docValidatnMsg = '';
    this.negativeLvMsg = '';
    this.maxLvMsg = '';
    this.submit = true;

    if (this.leaveApplicationForm.invalid || this.checkValidity()) {
      return '';
    }
    else {
      this.isProcessing = true;

      if (this.id) {
        const reqBody = {
          ...this.dynamicFormService.getUpdatedData(this.leaveApplicationForm),
          "leaveDays": this.leaveDays,
          "lossOfPayDays": this.lopDays
        }
        this.apiService.put(`leave/application/${this.id}`, reqBody, 'leave-application').subscribe({
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
        const reqBody = {
          ...this.leaveApplicationForm.getRawValue(),
          "leaveDays": this.leaveDays,
          "lossOfPayDays": this.lopDays
        }
        this.apiService.post(`leave/application`, reqBody, 'leave-application').subscribe({
          next: (res: any) => {
            if (res) {
              this.sharedService.handleSuccessModel({ id: res._id });
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

  handleError(error: any) {
    this.isProcessing = false;
    this.detectedError = true;
    this.cdRef.detectChanges();
    console.error(error);

  }
  getEmployeeLeaveData() {

    if (this.leaveApplicationForm.value.employeeId) {
      return this.apiService.get(`leave/application/types/${this.leaveApplicationForm.value.employeeId}`);
    }
  }

  getShiftDetails(id: any) {
    if (id) {
      return this.apiService.get(`time-attendance/shift/${id}`);
    }
  }

  getHolidayList(id: any) {
    if (id) {
      return this.apiService.get(`time-attendance/holiday?workCalendar=${id}`);
    }
  }
  onEmployeeChange(event, editmode) {
    if (event) {
      this.leaveLoading = true;
      this.hireDate = event?.hireDate;
      this.onBoardDate = event?.payrollOnboardDate;
      if (!editmode) {
        const startDate = new Date(this.leaveApplicationForm.value.startDate);
        const onboardDate = new Date(this.onBoardDate);

        if (isBefore(startDate, onboardDate)) {

          const currentDate = new Date(); // Get the current date
          if (isBefore(currentDate, onboardDate)) {
            this.leaveApplicationForm.patchValue({
              "startDate": null,
              "endDate": null
            });
          } else {
            this.leaveApplicationForm.patchValue({
              "startDate": currentDate,
              "endDate": currentDate
            });
          }
        }
      }
      forkJoin({
        leaveData: this.getEmployeeLeaveData(),
        shiftDetails: this.getShiftDetails(event?.shift?.id),
        holidayList: this.getHolidayList(event?.workCalendar?.id)
      }).subscribe({
        next: (results: any) => {
          this.leaveBalanceData = results.leaveData.data;
          this.leaveTypeList = [...results.leaveData.data];
          this.balanceList = [...results.leaveData.data];




          this.balanceList.sort((a, b) => a.name.localeCompare(b.name));
          this.shiftData = results.shiftDetails.data;
          this.holidayList = results.holidayList.data;
          if (editmode) {
            const selectedType = this.leaveTypeList?.find(i => i.id === this.leaveApplicationForm.value.leaveTypeId)

            this.leaveReasonList = [...selectedType?.leaveReasons];
            //this.availableDays = selectedType?.availableDays;
            //this.balanceDays = this.availableDays;
            this.leavePayId = selectedType?.leavePayType?.id;
            this.selectedLeaveName = selectedType?.name;
            this.sortLeaveTypeList(this.leaveApplicationForm.value.leaveTypeId)
            /*             if(selectedType?.allowHourly && selectedType?.entitlementUnit?.id === '2'){
                          this.formData.labels[3].hide = false;
                        }
                        else{
                          if(selectedType?.entitlementUnit?.id === '1'){
                            if(selectedType?.allowHourly){
                              this.formData.labels[3].hide = false;
                            }
                            else{
                              this.formData.labels[3].hide = true;
                            }
                          }
                        } */
          }
          this.leaveLoading = false;
          this.isLoading = false;
          /*  const nextDay = this.getNextWorkingDay();
           if (nextDay) {
             this.leaveApplicationForm.patchValue({
               "rejoiningDate": nextDay
             })
           } */
          this.cdRef.detectChanges();
        },
        error: (error: any) => {
          // Handle errors here
          this.detectedError = true;
          console.error(error);
        }
      });
      //this.getEmployeeLeaveData();
      //this.getShiftDetails(event?.shift?.id)
      //this.getHolidayList(event?.workCalendar?.id)
      if (!editmode) {
        this.allowHourly = true;
        this.leaveApplicationForm.patchValue({
          "leaveTypeId": null,
          "leaveDuration": null,
          "hour": null
        })
        this.durationCondition = ["id!=3"];
        this.leaveApplicationForm.get('leaveDuration').enable();
        this.formData.labels[3].hide = true;
        this.selectedLeaveType = null;
        this.selectedLeaveName = '';
      }

      // this.formData.labels[11].hide = false;
    }
    else {
      this.leaveTypeList = [];
      this.balanceList = [];
      this.shiftData = null;
      this.leaveBalanceData = [];
      this.holidayList = [];
      this.leaveReasonList = [];
      this.allowHourly = true;
      this.leaveApplicationForm.patchValue({
        "leaveTypeId": null,
        "leaveDuration": null,
        "hour": null
      });
      this.selectedLeaveType = null;
      this.leaveApplicationForm.get('leaveDuration').enable();
      this.formData.labels[3].hide = true;
      this.durationCondition = ["id!=3"];
      this.selectedLeaveName = '';
      this.onBoardDate = null;
      //this.formData.labels[11].hide = false;
    }
    this.cdRef.detectChanges();
  }

  onTypeChange(event) {

    this.sortLeaveTypeList(event?.id)
    if (event) {
      this.selectedLeaveType = event;
      this.selectedLeaveName = event.name;
      this.selectedAvailableDays = event.availableDays;



      this.leaveReasonList = [...event?.leaveReasons];
      this.isWeekendInclude = event?.includeWeekend;
      this.isHolidayInclude = event?.includeHoliday;
      this.availableDays = event?.availableDays;
      this.leavePayId = event?.leavePayType?.id
      if (event?.allowHourly && event?.entitlementUnit?.id === '2') {
        this.durationCondition = [];
        this.leaveApplicationForm.patchValue({
          "leaveDuration": "3"
        })
        this.leaveApplicationForm.get('leaveDuration').disable();
        this.allowHourly = true;
        this.formData.labels[3].hide = false;
      }
      else {
        this.formData.labels[3].hide = true;
        if (event?.entitlementUnit?.id === '1') {
          if (event?.allowHourly) {
            this.durationCondition = [];
            this.allowHourly = true;
          }
          else {
            this.durationCondition = ["id!=3"];
            this.allowHourly = false;
          }
        }
        this.leaveApplicationForm.get('leaveDuration').enable();
        this.leaveApplicationForm.patchValue({
          "leaveDuration": this.durationCondition.length > 0 && this.leaveApplicationForm.value.leaveDuration === "3" ? "1" : this.leaveApplicationForm.value.leaveDuration ? this.leaveApplicationForm.value.leaveDuration : "1",
          "hour": null
        },{emitEvent:false})
      }
      if (this.leaveApplicationForm.value.startDate && this.leaveApplicationForm.value.endDate) {
        if (this.isWeekendInclude && this.isHolidayInclude) {
          const startTimestamp = new Date(this.leaveApplicationForm.value.startDate);
          const endTimestamp = new Date(this.leaveApplicationForm.value.endDate);
          this.leaveDays = this.sharedService.getDateDifference(startTimestamp, endTimestamp);
          if(this.leaveApplicationForm.value.leaveDuration === '2'){
            this.leaveDays = this.leaveDays / 2;
           }
          this.balanceDays = this.availableDays - this.leaveDays;
          this.calculateLOPDays(event?.leavePayType?.id)
        }
        else if (!this.isWeekendInclude && !this.isHolidayInclude) {
          this.calculateLeaveDays('both', event?.leavePayType?.id);
        }
        else if (!this.isWeekendInclude) {
          this.calculateLeaveDays('weekend', event?.leavePayType?.id);
        }
        else if (!this.isHolidayInclude) {
          this.calculateLeaveDays('holiday', event?.leavePayType?.id);
        }

        const nextDay = this.getNextWorkingDay();
        if (nextDay) {
          this.leaveApplicationForm.patchValue({
            "rejoiningDate": nextDay
          })
        }
      }
      else {
        this.leaveDays = 0;
        this.lopDays = 0;
        this.balanceDays = 0;
      }




      if (event?.instructionMessage !== '' && event?.instructionMessage !== undefined && event?.instructionMessage !== null && event?.instructionMessage) {
        this.modalRef = this.modalService.open(ModalComponent, {
          centered: true,
          size: 'fit',
          windowClass: 'full-screen-modal',
          backdrop: 'static',
          keyboard: false
        });
        this.modalRef.componentInstance.successMessage = event?.instructionMessage;
        this.modalRef.componentInstance.sumbmittingLogo = './assets/media/png/success-loading.png';
        this.modalRef.componentInstance.modalLogo = './assets/media/gif/success.gif';
        this.modalRef.componentInstance.isButton = 'false';
        this.modalRef.componentInstance.modalName = 'info';
      }
      //this.durationCondition = event?.allowHourly || event?.entitlementUnit === '2' ? [] : ["id!=3"]
      // this.formData.labels[11].hide = false;
      /* if(event?.leaveRule?.allowHourly || event?.entitlementUnit === '2'){
        this.allowHourly = true;
      }
      else{
        this.allowHourly = false;
      } */
    }
    else {
      this.selectedLeaveType = null;
      this.leaveApplicationForm.patchValue({
        "leaveDuration": null,
        "hour": null
      })
      this.leaveApplicationForm.get('leaveDuration').enable();
      this.formData.labels[3].hide = true;
      this.durationCondition = ["id!=3"];
      this.allowHourly = true;
      this.leaveReasonList = [];
      this.selectedLeaveName = '';
    }
    this.cdRef.detectChanges();
  }
  onInputChange(name) {

    this.onDateSelected(this.leaveApplicationForm.value[name], name)




    if (name === 'startDate' || name === 'endDate') {
      if (this.leaveApplicationForm.value.leaveDuration === '3') {

        this.leaveApplicationForm.patchValue({
          "endDate": this.leaveApplicationForm.value.startDate
        })

      }
      if (this.isWeekendInclude && this.isHolidayInclude) {
        const startTimestamp = new Date(this.leaveApplicationForm.value.startDate);
        const endTimestamp = new Date(this.leaveApplicationForm.value.endDate);
        this.leaveDays = this.sharedService.getDateDifference(startTimestamp, endTimestamp);
        if(this.leaveApplicationForm.value.leaveDuration === '2'){
          this.leaveDays = this.leaveDays / 2;
         }
        this.balanceDays = this.availableDays - this.leaveDays;
        this.calculateLOPDays(this.leavePayId)
      }
      else if (!this.isWeekendInclude && !this.isHolidayInclude) {
        this.calculateLeaveDays('both', this.leavePayId);
      }
      else if (!this.isWeekendInclude) {
        this.calculateLeaveDays('weekend', this.leavePayId);
      }
      else if (!this.isHolidayInclude) {
        this.calculateLeaveDays('holiday', this.leavePayId);
      }

      const nextDay = this.getNextWorkingDay();
      if (nextDay) {
        this.leaveApplicationForm.patchValue({
          "rejoiningDate": nextDay
        })
      }
    }

  }
  getNextWorkingDay() {
    let nextDay = add(new Date(this.leaveApplicationForm.value.endDate), { days: 1 });
    const rejoinDate = this.isWeekend(nextDay)

    return format(rejoinDate, 'yyyy/MM/dd');
  }

  isWeekend(calDate) {

    const weekend = this.calculateService.checkWeekend(calDate, this.shiftData);

    if (weekend) {
      const nextDay = add(calDate, { days: 1 });
      return this.isWeekend(nextDay);
    }
    else {
      return calDate;
    }


  }

  /*  isWeekend(calDate){
     const year = calDate.getFullYear();

     // Get the start date of the year
     const startDateOfYear = new Date(year, 0, 1);

     // Calculate the difference in milliseconds
     const diffInMilliseconds = calDate.getTime() - startDateOfYear.getTime();

     // Calculate the number of weeks since the start of the year
     const weekNumber = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24 * 7));

     // Calculate the week number within the 52-week cycle
     let week = weekNumber % 52;
     if (week === 0) {
       week = 52;
     }


     const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
     const dayOfWeekName = daysOfWeek[calDate.getDay()];


     const weekend = this.shiftData?.weekendDetails?.[week-1]?.day?.find(day => day.name === dayOfWeekName.toLowerCase());
     return weekend;
   } */
  onReasonChange(event) {
    if (event?.id === '0') {
      this.formData.labels[8].hide = false;
    }
    else {
      this.formData.labels[8].hide = true;
    }
  }
  getFormTemplate(template: TemplateRef<any>, name: string) {
    this.formTemplateRef = template
    this.activeTemplateName = name
  }
  onDurationChange(event) {
    if (event?.id === '3') {
      this.leaveApplicationForm.patchValue({
        "endDate": this.leaveApplicationForm.value.startDate
      },{emitEvent:false})
      this.onInputChange('startDate');
      this.lopDays = 0;
      this.formData.labels[3].hide = false;
      this.formData.labels[6].hide = true;
    }
    else {
      if (event?.id === '2') {
        this.leaveDays = this.leaveDays / 2;
        this.lopDays = this.lopDays / 2;
        this.balanceDays = this.availableDays - this.leaveDays;
      }
      else {
        this.onInputChange('startDate');
      }
      this.leaveApplicationForm.patchValue({
        "hour": null
      })
      this.formData.labels[3].hide = true;
      this.formData.labels[6].hide = false;
    }
    //this.formData.labels[11].hide = event?.id === '3' ? true : false;
  }
  onDrawerSave(event) {

    this.uploadSaved = true;
  }
  onDrawerCancel(event) {

  }

  onFileUpload(event) {
    this.uploadDocumentForm.patchValue({
      files: event.files
    })
  }
  onDateSelected(selectedDate: Date, fieldName: string): void {



    if (fieldName === "startDate") {
      this.minDate = new Date(selectedDate)

    }
    if (fieldName === "endDate") {
      this.maxDate = new Date(selectedDate)

      this.rejoinMinDate = addDays(this.maxDate, 1)
    }
    // Update the form control with the selected date
    this.cdRef.detectChanges();
  }
  calculateLeaveDays(type, payType) {
    let count = 0;

    if (this.leaveApplicationForm.value.startDate && this.leaveApplicationForm.value.endDate) {
      const startTimestamp = new Date(this.leaveApplicationForm.value.startDate);
      const endTimestamp = new Date(this.leaveApplicationForm.value.endDate);
      let currentDate = startTimestamp;


      const days = this.sharedService.getDateDifference(startTimestamp, endTimestamp);

      if (type === 'weekend') {
        while (isBefore(currentDate, endTimestamp) || isEqual(currentDate, endTimestamp)) {
          const isWeekend = this.calculateService.checkWeekend(currentDate, this.shiftData);
          if (isWeekend) {
            count++;
          }
          currentDate = addDays(currentDate, 1);
        }
        this.leaveDays = days - count;
        if(this.leaveApplicationForm.value.leaveDuration === '2'){
         this.leaveDays = this.leaveDays / 2;
        }
        this.balanceDays = this.availableDays - this.leaveDays;
      }
      else if (type === 'holiday') {
        this.holidayList.forEach(dateObj => {
          while (isBefore(currentDate, endTimestamp) || isEqual(currentDate, endTimestamp)) {
            if (isSameDay(new Date(dateObj.date), currentDate)) {
              count++;
            }
            currentDate = addDays(currentDate, 1);
          }
        })

        this.leaveDays = days - count;
        if(this.leaveApplicationForm.value.leaveDuration === '2'){
          this.leaveDays = this.leaveDays / 2;
         }
        this.balanceDays = this.availableDays - this.leaveDays;
      }
      else {



        while (isBefore(currentDate, endTimestamp) || isEqual(currentDate, endTimestamp)) {


          let isHoliday = false;
          let isWeekend = false;
          this.holidayList.forEach(dateObj => {
            if (isSameDay(new Date(dateObj.date), currentDate)) {
              isHoliday = true;
            }
          });
          if (!isHoliday) {
            isWeekend = this.calculateService.checkWeekend(currentDate, this.shiftData);
          }

          if (isHoliday || isWeekend) {
            count++;
          }
          currentDate = addDays(currentDate, 1);
        }
        this.leaveDays = days - count;
        if(this.leaveApplicationForm.value.leaveDuration === '2'){
          this.leaveDays = this.leaveDays / 2;
         }
        this.balanceDays = this.availableDays - this.leaveDays;

      }
      this.calculateLOPDays(payType)
    }
  }
  calculateLOPDays(timeOffType) {
    if (this.leaveApplicationForm.value.duration === '3') {
      this.lopDays = 0;
    }
    else {
      if (timeOffType === "1") {
        this.lopDays = 0;
      }
      else if (timeOffType === "2") {
        this.lopDays = this.leaveDays * 0.75;
      }
      else if (timeOffType === "3") {
        this.lopDays = this.leaveDays * 0.5;
      }
      else if (timeOffType === "4") {
        this.lopDays = this.leaveDays * 0.25;
      }
      else if (timeOffType === "5") {
        this.lopDays = this.leaveDays
      }
      else if (timeOffType === "6") {
        this.lopDays = this.leaveDays * this.selectedLeaveType?.decrementValue;
      }
      else {
        this.lopDays = 0;
      }
    }
    if(this.leaveApplicationForm.value.leaveDuration === '2'){
      this.lopDays = this.lopDays / 2;
     }

  }
  sortLeaveTypeList(id) {
    // Sort balanceList alphabetically based on name
    this.balanceList.sort((a, b) => a.name.localeCompare(b.name));

    // Move the active card to the beginning if activeLeaveTypeId exists
    if (id) {
      const activeIndex = this.balanceList.findIndex(leaveType => leaveType.id === id);
      if (activeIndex !== -1) {
        const activeLeaveType = this.balanceList.splice(activeIndex, 1)[0];
        this.balanceList.unshift(activeLeaveType);
      }
    }


  }
}
