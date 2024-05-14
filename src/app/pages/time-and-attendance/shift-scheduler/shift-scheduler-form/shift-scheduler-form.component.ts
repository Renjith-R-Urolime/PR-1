import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ModalComponent } from 'src/app/_metronic/partials';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { JsonListService } from 'src/app/shared/services/json-list/json-list.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { classificationFormData, formData, formSections, toleranceMarginFormData } from '../shift.data';

@Component({
  selector: 'app-shift-scheduler-form',
  templateUrl: './shift-scheduler-form.component.html',
  styleUrls: ['./shift-scheduler-form.component.scss']
})
export class ShiftSchedulerFormComponent implements OnInit {
  theme: string = this.sharedService.getTheme();
  id: any;
  formSections = formSections;
  formData: any = formData;
  toleranceMarginFormData: any = toleranceMarginFormData;
  classificationFormData: any = classificationFormData;
  shiftForm: FormGroup;
  toleranceForm: FormGroup;
  classificationForm: FormGroup;
  col: any = 4;
  offset: any = 0;
  defineWeekendstatus: boolean = false
  headerText: any;
  formTemplate: any;
  toleranceSaved: boolean = false;
  classificationSaved: boolean = false;
  isWorkCalendarLoaded: boolean = false
  workCalendarSaved: boolean = false
  modifyTimingSaved: boolean = false;
  validBreakTime: boolean = true
  validAdditionalBreakTime: boolean = true
  modifyTimingFormStatus: boolean = false
  workCalendarFormSavedStatus: boolean = false
  daysOfWeek: { name: string, isChecked: boolean }[] = [
    { name: 'Sun', isChecked: false },
    { name: 'Mon', isChecked: false },
    { name: 'Tue', isChecked: false },
    { name: 'Wed', isChecked: false },
    { name: 'Thu', isChecked: false },
    { name: 'Fri', isChecked: false },
    { name: 'Sat', isChecked: false },
  ];
  daysOfWeeks: any[] = [
    { name: 'Sunday', isChecked: false, startTime: '', endTime: '' },
    { name: 'Monday', isChecked: false, startTime: '', endTime: '' },
    { name: 'Tuesday', isChecked: false, startTime: '', endTime: '' },
    { name: 'Wednesday', isChecked: false, startTime: '', endTime: '' },
    { name: 'Thursday', isChecked: false, startTime: '', endTime: '' },
    { name: 'Friday', isChecked: false, startTime: '', endTime: '' },
    { name: 'Saturday', isChecked: false, startTime: '', endTime: '' },
  ];


  daysOfWeeksDefineWeekend: any[] = [
    { name: 'Sunday', isChecked: false, startTime: '', endTime: '' },
    { name: 'Monday', isChecked: false, startTime: '', endTime: '' },
    { name: 'Tuesday', isChecked: false, startTime: '', endTime: '' },
    { name: 'Wednesday', isChecked: false, startTime: '', endTime: '' },
    { name: 'Thursday', isChecked: false, startTime: '', endTime: '' },
    { name: 'Friday', isChecked: false, startTime: '', endTime: '' },
    { name: 'Saturday', isChecked: false, startTime: '', endTime: '' },
  ];

  workCalendar: number[] = [];
  regularFrom: string;
  regularTo: string;
  isHalfWeekendEnabled: boolean;
  shiftType: string;
  finalForm: any = {}
  shiftTiming: { day: string, from: string, to: string }[] = [];

  // Inside your component class
  columnVisibility: boolean[] = [false, false, false, false, false, false, false];
  enableHalf: boolean = false;
  formTemplateRef: TemplateRef<any>;
  listOfDays: any[] = [{ "day": 'Sunday', "checked": false }, { "day": 'Monday', "checked": false }, { "day": 'Tuesday', "checked": false }, { "day": 'Wednesday', "checked": false }, { "day": 'Thursday', "checked": false }, { "day": 'Friday', "checked": false }, { "day": 'Saturday', "checked": false }];
  weekendConfig: any = [];
  hideme: boolean[] = [];
  private modalRef: NgbModalRef;
  isProcessing: boolean = false;
  showAdditionalBreak: boolean = false;
  submit: boolean = false;
  private routeSub: Subscription | undefined;
  minutesArr: any = [];
  hoursArr: any = [];
  savedToleranceState: any = ''
  savedModifyingTimingState: any
  savedWorkCalendarState: any
  isLoading: boolean = false;
  listPatchData: any;
  calendarData: any;
  selectAllChecked: boolean = false;
  detectedError: boolean;
  selectedCalendar: any;
  activeTemplateName: string;
  showDropdown: boolean = false;

  @ViewChild('workCalendarTemplate', { static: true }) workCalendarTemplate: TemplateRef<any>;
  defaultWorkCalendarMapping: any;
  data: any;
  toleranceFromValue: void;
  toleranceToValue: void;
  calendarId: any;
  selectedHalf: string;
  fetchedCalendarId:any
  endTimeNotSelectedError: boolean;

  constructor(private jsonListService: JsonListService, public sharedService: SharedService, private route: ActivatedRoute, private apiService: ApiService, private _location: Location, private dynamicFormService: DynamicFormService, private cdRef: ChangeDetectorRef, private modalService: NgbModal) { }


  ngOnInit(): void {


    this.shiftForm = this.dynamicFormService.createControl(this.formData);

    this.toleranceForm = this.dynamicFormService.createControl(this.toleranceMarginFormData);
    this.classificationForm = this.dynamicFormService.createControl(this.classificationFormData);

    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });


    this.route.queryParams.subscribe(params => {
      const calendarId: string[] = params['calendarId'] || [];
      this.fetchedCalendarId=calendarId

    });










    if (this.id) {
      this.isLoading = true;
      this.apiService.get(`time-attendance/shift/${this.id}`).subscribe({
        next: (res: any) => {
          if (res) {
            //this.editData = res.data;
            this.shiftForm.patchValue(res.data);
            this.toleranceForm.patchValue(res.data)
            if (this.shiftForm.value['isAdditionalBreak']) {
              this.showAdditionalBreak = true
            }
            this.calculateTotalBreakTime()
            this.calculateTotalAdditionalBreakTime()
            if (res?.data?.modifyTiming) {
              let status = res?.data?.modifyTiming.some(day => day.isChecked)
              if (status) {


                this.modifyTimingSaved = true
                this.daysOfWeeks = res?.data?.modifyTiming
              }
              else {
                this.dataForModifyTiming()
              }
            }
            else {
              this.dataForModifyTiming()
            }
            //    this.listPatchData = res.data;
            this.data = res.data

            this.getCalendarData()
            this.weekendConfig = res.data.weekendDetails;

            ///////////////////////////////Check if any day is active //////////////////////////////////////////////////////////////////////////////

            // Iterate over each week in weekendDetails and check if any day is a holiday
            this.weekendConfig.forEach(week => {
              week.day.forEach(day => {
                if (day.status) {
                  const matchedDay = this.daysOfWeek.find(d => d.name.substring(0, 3).toLowerCase() === day.name.substring(0, 3).toLowerCase() && !d.isChecked);
                  if (matchedDay) {
                    const index = this.daysOfWeek.indexOf(matchedDay);
                    matchedDay.isChecked = true;
                    this.listOfDays[index].checked = true
                    this.columnVisibility[index] = true
                  }
                  if (day?.selectedHalf) {
                    this.enableHalf = true
                    this.showDropdown = true
                  }


                }
              });
            });
            this.defineWeekendstatus = this.daysOfWeek.some(day => day.isChecked)

            this.isLoading = false;
            this.cdRef.detectChanges();
          }
        }, error: (error: any) => {
          this.isLoading = false;
          this.cdRef.detectChanges();

          console.error(error);

        }
      });
    }
    else {
      this.getCalendarData()
      this.isLoading = true;
      // this.getCalendarData()
      const numberOfWeeks = 52;

      for (let weekNumber = 1; weekNumber <= numberOfWeeks; weekNumber++) {
        const weekObject = {
          week: `Week ${weekNumber}`,
          day: []
        };

        for (const day of this.daysOfWeeksDefineWeekend) {
          const dayObject = {
            name: day.name.toLowerCase(),
            status: false,
          };
          weekObject.day.push(dayObject);
        }

        this.weekendConfig.push(weekObject);
      }

    }
  }




  ////////////////////////////////////////////Calcualte hour //////////////////////////////////////////////////////////////////////
  calculateTotalHours() {


    const time1Input = this.shiftForm.value['regularFrom'];
    const time2Input = this.shiftForm.value['regularTo'];


    if (time1Input && time2Input) {
      const totalHours = this.sharedService.getTimeDifference(time1Input, time2Input);

      this.shiftForm.patchValue({ "totalHours": totalHours });
      this.calculateTotalBreakTime()
      this.calculateTotalAdditionalBreakTime()
    }
    else {
      this.shiftForm.patchValue({ "totalHours": '00:00' });
    }



    this.daysOfWeeks.forEach(day => {
      day.startTime = time1Input;
      day.endTime = time2Input;
      day.isChecked = false
    });
    this.modifyTimingSaved = false
    this.shiftForm.patchValue({
      "modifyTiming": this.daysOfWeeks
    })
    this.cdRef.detectChanges();
  }


  dataForModifyTiming() {
    const regularFrom = this.shiftForm.value['regularFrom'];
    const regularTo = this.shiftForm.value['regularTo'];
    this.daysOfWeeks.forEach(day => {
      day.startTime = regularFrom;
      day.endTime = regularTo;
      day.isChecked = false
    });
  }

  calculateTotalBreakTime() {
    const breakFrom = this.shiftForm.value['breakFrom'];
    const breakTo = this.shiftForm.value['breakTo'];
    const regularFrom = this.shiftForm.value['regularFrom'];
    const regularTo = this.shiftForm.value['regularTo'];
    const totalHours = this.shiftForm.value['totalHours'];
    let midNightTime = "24:00"
    let totalBreakTime = '00:00';

    if (breakFrom && breakTo) {


      totalBreakTime = this.sharedService.getTimeDifference(breakFrom, breakTo);
      if (regularFrom && regularTo) {


        //////////////////////////////checking if the it is next day////////////////////////////////////////
        const diffFromMidNightBreakTime = this.sharedService.getTimeDifference(breakFrom, midNightTime);
        const diffFromMidNightRegularTime = this.sharedService.getTimeDifference(regularFrom, midNightTime);

        let compareRegularTime = this.compareTimes(diffFromMidNightRegularTime, totalHours)
        let compareBreakTime = this.compareTimes(diffFromMidNightBreakTime, totalBreakTime)
        let compareRegularFromAndBreakFrom = this.compareTimes(regularFrom, breakFrom)

        let regularToDate, regularFromDate, breakToDate, breakFromDate
        if (compareRegularTime < 0) {
          regularToDate = new Date(`2000-01-02T${regularTo}`);
        }
        else {
          regularToDate = new Date(`2000-01-01T${regularTo}`);
        }

        if (compareBreakTime < 0) {
          breakToDate = new Date(`2000-01-02T${breakTo}`);
        }
        else {
          breakToDate = new Date(`2000-01-01T${breakTo}`);
        }
        regularFromDate = new Date(`2000-01-01T${regularFrom}`)
        breakFromDate = new Date(`2000-01-01T${breakFrom}`)
        if (compareRegularFromAndBreakFrom > 0) {
          breakToDate = new Date(`2000-01-02T${breakTo}`);
          breakFromDate = new Date(`2000-01-02T${breakFrom}`)
        }
        this.validBreakTime = breakFromDate >= regularFromDate && breakToDate <= regularToDate;


        if (this.compareTimes(totalHours, totalBreakTime) < 0) {
          this.validBreakTime = false
        }
      }
      else {
        this.validBreakTime = false
      }
    }

    this.shiftForm.patchValue({ "totalBreakTime": totalBreakTime });
    this.cdRef.detectChanges();
  }

  calculateTotalAdditionalBreakTime() {
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    const additionalBreakFrom = this.shiftForm.value['additionalBreakFrom'];
    const additionalBreakTo = this.shiftForm.value['additionalBreakTo'];
    const regularFrom = this.shiftForm.value['regularFrom'];
    const regularTo = this.shiftForm.value['regularTo'];
    const totalHours = this.shiftForm.value['totalHours'];
    let midNightTime = "24:00"
    let totalAdditionalBreakTime = '00:00';

    if (additionalBreakFrom && additionalBreakTo) {


      totalAdditionalBreakTime = this.sharedService.getTimeDifference(additionalBreakFrom, additionalBreakTo);
      if (regularFrom && regularTo) {


        //////////////////////////////checking if the it is next day////////////////////////////////////////
        const diffFromMidNightBreakTime = this.sharedService.getTimeDifference(additionalBreakFrom, midNightTime);
        const diffFromMidNightRegularTime = this.sharedService.getTimeDifference(regularFrom, midNightTime);

        let compareRegularTime = this.compareTimes(diffFromMidNightRegularTime, totalHours)
        let compareBreakTime = this.compareTimes(diffFromMidNightBreakTime, totalAdditionalBreakTime)
        let compareRegularFromAndBreakFrom = this.compareTimes(regularFrom, additionalBreakFrom)

        let regularToDate, regularFromDate, breakToDate, breakFromDate
        if (compareRegularTime < 0) {
          regularToDate = new Date(`2000-01-02T${regularTo}`);
        }
        else {
          regularToDate = new Date(`2000-01-01T${regularTo}`);
        }

        if (compareBreakTime < 0) {
          breakToDate = new Date(`2000-01-02T${additionalBreakTo}`);
        }
        else {
          breakToDate = new Date(`2000-01-01T${additionalBreakTo}`);
        }
        regularFromDate = new Date(`2000-01-01T${regularFrom}`)
        breakFromDate = new Date(`2000-01-01T${additionalBreakFrom}`)
        if (compareRegularFromAndBreakFrom > 0) {
          breakToDate = new Date(`2000-01-02T${additionalBreakTo}`);
          breakFromDate = new Date(`2000-01-02T${additionalBreakFrom}`)
        }
        this.validAdditionalBreakTime = breakFromDate >= regularFromDate && breakToDate <= regularToDate;


        if (this.compareTimes(totalHours, totalAdditionalBreakTime) < 0) {
          this.validAdditionalBreakTime = false
        }
      }
      else {
        this.validAdditionalBreakTime = false
      }
    }

    this.shiftForm.patchValue({ "totalAdditionalBreakTime": totalAdditionalBreakTime });
    this.cdRef.detectChanges();
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
  }

  considerAdditionalBreak(event) {

    if (event.target.checked) {
      this.showAdditionalBreak = true;
    }
    else {

      const totalHours = this.shiftForm.value['totalHours'];
      const totalBreakTime = this.shiftForm.value['totalAdditionalBreakTime'];

      if (this.shiftForm.value['excludeAdditionalBreak'] == true) {
        if (totalHours && totalBreakTime) {
          this.shiftForm.patchValue({
            "totalHours": this.includeHours(totalHours, totalBreakTime)
          })
        }
      }
      this.cdRef.detectChanges();
      this.showAdditionalBreak = false;
      this.validAdditionalBreakTime = true
      this.shiftForm.patchValue({
        "additionalBreakFrom": '',
        "additionalBreakTo": '',
        "totalAdditionalBreakTime": "00:00",
        "excludeAdditionalBreak": false
      })



    }

  }

  /////////////////////////////////////////Compare time //////////////////////////////////////////////////////////////////////
  compareTimes(time1: string, time2: string): number {
    // Split time strings into hours and minutes
    const [hour1, minute1] = time1.split(':').map(Number)|| time1.split('-').map(Number);
    const [hour2, minute2] = time2.split(':').map(Number)|| time2.split('-').map(Number);

    // Compare hours
    if (hour1 !== hour2) {
      return hour1 - hour2; // Compare hours directly
    } else {
      // If hours are equal, compare minutes
      return minute1 - minute2;
    }
  }


  /////////////////////////////////////////////////Time difference///////////////////////////////////////////////////////////////////////////
  timeDifference(time1: string, time2: string): string {


    // Split time strings into hours and minutes
    const [hour1, minute1] = time1.split(':').map(Number)|| time1.split('-').map(Number);
    const [hour2, minute2] = time2.split(':').map(Number)|| time2.split('-').map(Number);

    // Calculate the difference in minutes
    let totalMinutes = (hour2 * 60 + minute2) - (hour1 * 60 + minute1);



    // Convert total minutes to hours and remaining minutes
    const hours = Math.trunc(totalMinutes / 60);


    const minutes = totalMinutes % 60;

    // Format the time difference
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
  }

  /////////////////////////////////////////////////////Include break///////////////////////////////////////////////////////////////////////////

  includeHours(time1: string, time2: string): string {


    // Split time strings into hours and minutes
    const [hour1, minute1] = time1.split(':').map(Number) || time1.split('-').map(Number);
    const [hour2, minute2] = time2.split(':').map(Number) || time2.split('-').map(Number);

    // Calculate the difference in minutes
    let totalMinutes = (hour2 * 60 + minute2) + (hour1 * 60 + minute1);



    // Convert total minutes to hours and remaining minutes
    const hours = Math.trunc(totalMinutes / 60);


    const minutes = totalMinutes % 60;

    // Format the time difference
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  excludeBreak(event) {

    if (event.target.checked) {
      const totalHours = this.shiftForm.value['totalHours'];
      const totalBreakTime = this.shiftForm.value['totalBreakTime'];
      if (totalHours && totalBreakTime) {
        this.shiftForm.patchValue({
          "totalHours": this.timeDifference(totalBreakTime, totalHours)
        })
      }

      this.cdRef.detectChanges();
    }
    else {
      const totalHours = this.shiftForm.value['totalHours'];
      const totalBreakTime = this.shiftForm.value['totalBreakTime'];
      if (totalHours && totalBreakTime) {
        this.shiftForm.patchValue({
          "totalHours": this.includeHours(totalHours, totalBreakTime)
        })
      }

      this.cdRef.detectChanges();
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  excludeAdditionalBreak(event) {
    if (event.target.checked) {
      const totalHours = this.shiftForm.value['totalHours'];
      const totalBreakTime = this.shiftForm.value['totalAdditionalBreakTime'];
      if (totalHours && totalBreakTime) {
        this.shiftForm.patchValue({
          "totalHours": this.timeDifference(totalBreakTime, totalHours)
        })
      }

      this.cdRef.detectChanges();
    }
    else {
      const totalHours = this.shiftForm.value['totalHours'];
      const totalBreakTime = this.shiftForm.value['totalAdditionalBreakTime'];
      if (totalHours && totalBreakTime) {
        this.shiftForm.patchValue({
          "totalHours": this.includeHours(totalHours, totalBreakTime)
        })
      }

      this.cdRef.detectChanges();
    }
  }

  ////////////////////////////////////Form drawer popup //////////////////////////////////////////////////

  getFormTemplate(template: TemplateRef<any>, name: string) {
    if (name == 'modifyTiming') {


      const time1Input = this.shiftForm.value['regularFrom'];
      const time2Input = this.shiftForm.value['regularTo'];


      if (time1Input && time2Input && (time1Input != null) && (time2Input != null)) {
        this.formTemplateRef = template
        this.activeTemplateName = name
        this.modifyTimingFormStatus = true
        this.savedModifyingTimingState = JSON.stringify(this.daysOfWeeks);


      }

    }
    else if (name == 'workCalendar') {
      this.formTemplateRef = template
      this.activeTemplateName = name
      this.savedWorkCalendarState = JSON.stringify(this.calendarData)
    }
    else {
      this.formTemplateRef = template
      this.activeTemplateName = name
    }
  }


  ////////////////////////////////////Form drawer Save//////////////////////////////////////////////////

  applyPopupForm(event, headerText) {


    if (headerText == 'modifyTiming') {
      let status = this.daysOfWeeks.some(day => day.isChecked)
      if (status) {
        this.modifyTimingSaved = true
        this.savedModifyingTimingState = JSON.stringify(this.daysOfWeeks);


        this.shiftForm.patchValue({
          "modifyTiming": this.daysOfWeeks
        })
      }
      else {
        this.modifyTimingSaved = false
      }
    }
    else if (headerText == 'workCalendar') {
      this.savedWorkCalendarState = JSON.stringify(this.calendarData);
      this.calendarMapping()
    }


    // this.classificationSaved = true;
    this.cdRef.detectChanges();
    this.formTemplateRef = null
    this.modifyTimingFormStatus = false
  }



  ///////////////////////////Calendar mapping //////////////////////////////////


  calendarMapping() {
    const checkedIds = this.calendarData
      .filter(item => item.isChecked === true)
      .map(item => item.id);
    this.shiftForm.patchValue({ "workCalendar": checkedIds });

    if (this.shiftForm?.value?.workCalendar.length > 0) {
      this.workCalendarFormSavedStatus = true
    }
    else {
      this.workCalendarFormSavedStatus = false
    }
  }










  ////////////////////////////////////Form drawer Cancell//////////////////////////////////////////////////


  cancelPopupForm(event, headerText) {
    if (headerText == 'modifyTiming') {
      this.cdRef.detectChanges();
      this.formTemplateRef = null
      this.modifyTimingFormStatus = false
      this.daysOfWeeks = JSON.parse(this.savedModifyingTimingState)
    }
    else if (headerText == 'workCalendar') {
      this.calendarData = JSON.parse(this.savedWorkCalendarState);
      if (this.shiftForm?.value?.workCalendar?.length > 0) {
        this.workCalendarFormSavedStatus = true
      }
      else {
        this.workCalendarFormSavedStatus = false
      }
    }

    this.classificationForm.reset();

  }


  ////////////////////////////////////Modal open  Cancell//////////////////////////////////////////////////




  openToleranceModal(modal) {
    this.modalRef = this.modalService.open(modal, {
      size: 'md', scrollable: false, windowClass: 'emp-settings-modal', backdrop: 'static'
    });
    this.savedToleranceState = this.toleranceForm.value
  }

  onCancelTolerance() {


    this.toleranceForm.patchValue({
      "toleranceMarginStartTime": this.savedToleranceState?.toleranceMarginStartTime,
      "toleranceMarginEndTime": this.savedToleranceState?.toleranceMarginEndTime
    })
    this.cdRef.detectChanges();
    this.modalRef.close();
  }



  onSaveTolerance() {
    let toleranceMarginStartTime = this.toleranceForm.get('toleranceMarginStartTime').value
    let toleranceMarginEndTime = this.toleranceForm.get('toleranceMarginEndTime').value


    if (toleranceMarginStartTime || toleranceMarginEndTime ) {
      this.toleranceSaved = true;
      this.cdRef.detectChanges();
    }
    else {
      this.toleranceSaved = false;
      this.cdRef.detectChanges();
    }
    this.savedToleranceState = this.toleranceForm.value


    this.modalRef.close();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  onSubmit() {
    this.submit = true
    this.isProcessing = true;
    this.finalForm = {
      ...this.shiftForm.value,
      ...this.toleranceForm.value
    };
    this.finalForm['weekendDetails'] = this.weekendConfig;
    //this.finalForm = this.shiftForm.value


    if (this.shiftForm.invalid || !this.validAdditionalBreakTime || !this.validBreakTime || !this.isWorkCalendarLoaded) {
      this.isProcessing = false;
      return;
    }
    else {
      this.submit = false;
      let data = this.finalForm;

      data['createdBy'] = 1
      if (!this.id) {

        this.apiService.post(`time-attendance/shift`, data,'shift').subscribe({
          next: (res: any) => {
            if (res) {

              this.isProcessing = false;
              this.cdRef.detectChanges();
              this.modalRef = this.modalService.open(ModalComponent, {
                centered: true,
                size: 'fit',
                windowClass: 'full-screen-modal',
                backdrop: 'static',
                keyboard: false
              });
              this.sharedService.handleSuccessModel({ id: res._id });
              //   this._location.back();
            }
          },
          error: (error: any) => {
            this.cdRef.detectChanges();
            this.isProcessing = false;


          }
        }
        );
      }
      else {

        this.apiService.put(`time-attendance/shift/${this.id}`, data,'shift').subscribe({
          next: (res: any) => {
            if (res) {

              this.isProcessing = false;
              this.cdRef.detectChanges();
              this.modalRef = this.modalService.open(ModalComponent, {
                centered: true,
                size: 'fit',
                windowClass: 'full-screen-modal',
                backdrop: 'static',
                keyboard: false
              });
              this.sharedService.handleSuccessModel({ id: this.id });
            }
            else {
              this.isProcessing = false;
              this.cdRef.detectChanges();
            }
          },
          error: (error: any) => {
            this.isProcessing = false;
            this.cdRef.detectChanges();


          }
        });
      }
    }

  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getCalendarData() {
    this.apiService.get(`time-attendance/work-calendar?limit=max`).subscribe({
      next: (res: any) => {
        if (res) {

          this.calendarData = res.data
          if (Array.isArray(this.calendarData)) {
            this.calendarData.forEach(calendar => {
              calendar.isChecked = false;
              if (calendar.id === this.fetchedCalendarId) {
                calendar.isChecked = true;
              }
            });
            if (this.fetchedCalendarId) {
              this.workCalendarFormSavedStatus = true
            }
            else {
              this.workCalendarFormSavedStatus = false
            }

            if (this.id) {
              const updatedFullData = this.calendarData.map(item => {
                const exists = this.data?.workCalendar.some(data => data.id === item.id);
                item.isChecked = exists;
                return item;
              });
              this.calendarData = updatedFullData
              this.isWorkCalendarLoaded = true
              if (this.data?.workCalendar?.length > 0) {
                this.workCalendarFormSavedStatus = true
              }
              else {
                this.workCalendarFormSavedStatus = false
              }
            }

            this.isWorkCalendarLoaded = true

            this.calendarMapping()



          } else {
            console.error("calendarData is undefined or not an array");
          }
          this.cdRef.detectChanges();
        }
      },
      error: (error: any) => {
        this.detectedError = true;
        //   this.isLoading = false;

        console.error(error);

      }
    });
  }



  ///////////////////////////////////////reset the half day///////////////////////////////////////////////////////////

  removeSelectedHalf(weeks) {
    // Loop through each week object
    return weeks.map(week => {
      // Loop through each day object within the week
      const updatedDays = week.day.map(day => {
        // Remove the selectedHalf key from the day object
        const { selectedHalf, ...rest } = day;
        return rest;
      });
      // Return the updated week object with days without selectedHalf key
      return { ...week, day: updatedDays };
    });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  toggleColumnVisibility(event, dayName: string) {
    const columnIndex = this.daysOfWeek.findIndex(day => day.name === dayName);
    this.defineWeekendstatus = this.daysOfWeek.some(day => day.isChecked)


    if (columnIndex !== -1) {
      if (event.target.checked) {
        this.columnVisibility[columnIndex] = true;
      } else {
        this.columnVisibility[columnIndex] = false;
      }
      const dayPrefix = dayName.substring(0, 3).toLowerCase();


      for (const week of this.weekendConfig) {
        for (const day of week.day) {
          if (day.name.startsWith(dayPrefix)) {
            day.status = this.columnVisibility[columnIndex];
            day.selectedHalf = null
          }
        }
      }
      //   this.updateSelectAllCheckbox();
      this.updateRightsArray(dayPrefix, this.columnVisibility[columnIndex]);
    }
  }

  updateRightsArray(dayPrefix: string, isChecked: boolean) {
    const rightIndex = this.listOfDays.findIndex(right => right.day.toLowerCase().startsWith(dayPrefix));
    if (rightIndex !== -1) {
      this.listOfDays[rightIndex].checked = isChecked;
    }
  }

  // updateSelectAllCheckbox() {
  //   const allChecked = this.daysOfWeek.every(day => day.isChecked);
  //   const selectAllCheckbox = this.listOfDays.find(right => right.day.toLowerCase() === 'all');
  //   if (selectAllCheckbox) {
  //     selectAllCheckbox.checked = allChecked;
  //   }
  // }


  toggleDropdown() {
    this.showDropdown = this.enableHalf;

    if (!this.showDropdown) {
      this.weekendConfig = this.removeSelectedHalf(this.weekendConfig)
    }

  }

  openTolerance(event) {

  }
  changeValue(i) {
    this.hideme[i] = !this.hideme[i];
  }
  getWeekendConfig() {
    for (let i = 0; i <= this.weekendConfig.length; i++) {
      this.hideme.push(true);
    }
    this.hideme[0] = false;
    this.cdRef.detectChanges();
  }

  selectAllweeks(event, index) {


    if (event.target.checked) {
      this.daysOfWeek[index].isChecked = true
      this.listOfDays[index].checked = true;
      this.weekendConfig.forEach(element => {
        element.day[index].status = true;

        this.cdRef.detectChanges();
      })
    }
    else {
      this.daysOfWeek[index].isChecked = false
      this.listOfDays[index].checked = false;
      this.weekendConfig.forEach(element => {
        element.day[index].status = false;
        element.day[index].selectedHalf = null

        this.cdRef.detectChanges();
      })
    }
  }

  unCheckDay(event: any, weekIndex: number, dayIndex: number): void {


    // const selectedWeek = this.weekendConfig[weekIndex];
    // const selectedDay = selectedWeek.day[dayIndex];
    // selectedDay.status = event.target.checked;
  }


  updateShiftTiming(event, i) {
    if (event.target.checked == false) {
      const regularFrom = this.shiftForm.value['regularFrom'];
      const regularTo = this.shiftForm.value['regularTo'];
      this.daysOfWeeks[i].startTime = regularFrom;
      this.daysOfWeeks[i].endTime = regularTo;
    }

    // const existingShift = this.shiftTiming.find((shift: any) => shift.day === day.name);
    // if (existingShift) {
    //   existingShift.from = day.startTime;
    //   existingShift.to = day.endTime;
    // } else {
    //   this.shiftTiming.push({ day: day.name, from: day.startTime, to: day.endTime });
    // }
    // if (day.startTime) {
    //   if (!day.endTime) {
    //     this.endTimeNotSelectedError = true;
    //   } else {
    //     this.endTimeNotSelectedError = false;
    //   }
    // }
  }






  convertTo12HourFormat(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    const formattedTime = `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
    return formattedTime;
  }















  bothTimesSelected(day: any): boolean {
    return !!day.startTime && !!day.endTime;
  }

  checkBothTimesSelected(day: any) {
    this.bothTimesSelected(day);
  }

  selectedShiftType: string;

  updateSelectedHalf(weekIndex: number, dayIndex: number, selectedHalf: string) {
    this.weekendConfig[weekIndex].day[dayIndex].selectedHalf = selectedHalf;
  }


  onCancel() {
    this._location.back();
  }



  openDrawerWithTemplate(template: TemplateRef<any>) {

  }



  changeShift(event) {


  }

  assignTemplate(headerText, formTemplate) {
    this.headerText = headerText;
    this.formTemplate = formTemplate;
  }



  onSelectAll() {
    for (let calendarItem of this.calendarData) {
      calendarItem.isChecked = this.selectAllChecked;
    }
    this.workCalendar = this.calendarData.filter(item => item.isChecked).map(item => item.id);
  }


  getSelectedItems(): any[] {
    this.workCalendar = this.calendarData.filter(item => item.isChecked).map(item => item.id);
    return this.workCalendar;
  }

  hasSelectedHalfInWeekendDetails(): boolean {
    if (this.weekendConfig) {
      for (const week of this.weekendConfig) {
        for (const day of week.day) {
          if (day.selectedHalf === "1st Half" || day.selectedHalf === "2nd Half") {
            return true;
          }
        }
      }
    }
    return false;
  }

  applyPopupForm1(event, formName) {


    this.finalForm.isHalfWeekendEnabled = this.classificationForm.value['isHalfWeekendEnabled'];
    this.finalForm.shiftType = this.classificationForm.value['shiftType'];

    this.classificationSaved = true;
    this.cdRef.detectChanges();
  }

}

