import { DatePipe, Location } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { format } from 'date-fns';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { JsonListService } from 'src/app/shared/services/json-list/json-list.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { SubSink } from 'subsink';
import { attendanceFormData, employeeFilterMeta, formSections } from '../attendance.data';
const _ = require('lodash');


@Component({
  selector: 'app-attendance-form',
  templateUrl: './attendance-form.component.html',
  styleUrls: ['./attendance-form.component.scss']
})
export class AttendanceFormComponent {
  theme: string = this.sharedService.getTheme();
  employeeFilterMeta: any = employeeFilterMeta
  id: any;
  formSections = formSections;
  formData: any = attendanceFormData;
  attendanceForm: FormGroup;
  col: any = 4;
  isProcessing: boolean = false;
  isLoading: boolean = false;
  offset: any = 0;
  submit: boolean = false;
  headerText: any;
  formTemplate: any;
  attachmentSaved: boolean = false;
  private routeSub: Subscription | undefined;
  listPatchData: any;
  private modalRef: NgbModalRef;
  calendarDaysList: any;
  attendanceStatusList: any;
  attendanceStatusOriginalList: any;
  minDate: Date;
  shiftId: any;
  workCalendarId: any;
  componentCheckMsg: string = '';
  attendanceExistCheckMsg: string = '';
  isOnPaidLeave: boolean = false;
  isOnUnPaidLeave: boolean = false;
  selectedEmployee: any = {};
  showReason: boolean = false;
  breakHours: any = "";
  additionalBreakHours: any = "";
  totalBreakHours: any = "";
  tempStandardHour: any = "";
  private subs = new SubSink();
  isDayloading: boolean = false;
  isWorkCalendarloading: boolean = false;
  isShiftloading: boolean = false;

  constructor(private dynamicFormService: DynamicFormService, public sharedService: SharedService, private route: ActivatedRoute, private apiService: ApiService, private _location: Location, private cdRef: ChangeDetectorRef, private modalService: NgbModal, private jsonListService: JsonListService) { }

  assignTemplate(headerText, formTemplate) {
    this.headerText = headerText;
    this.formTemplate = formTemplate;
  }

  savePopupForm(event, formName) {
    this.attachmentSaved = true;
    this.cdRef.detectChanges();
  }

  cancelPopupForm(event, formName) {
    this.attendanceForm.reset();
    this.attachmentSaved = false;
    this.cdRef.detectChanges();
  }
  calculateHours() {
    this.cdRef.detectChanges();
    if (!this.id) {
      this.attendanceForm.patchValue({
        "overtimeHour": "00:00",
        "lessHourWorked": "00:00",
        "actualHour": "00:00",
      });
    }
    if (this.attendanceForm.get('firstTimeIn').value && this.attendanceForm.get('lastTimeOut').value) {
      this.attendanceForm.patchValue({
        "actualHour": this.sharedService.getTimeDifference(this.attendanceForm.get('firstTimeIn').value, this.attendanceForm.get('lastTimeOut').value)
      });

      if (new Date('1970-01-01T' + this.attendanceForm.get('actualHour').value + ':00') > new Date('1970-01-01T' + this.attendanceForm.get('totalHour').value + ':00')) {
        this.attendanceForm.patchValue({
          "overtimeHour": this.sharedService.getTimeDifference(this.attendanceForm.get('totalHour').value, this.attendanceForm.get('actualHour').value),
          "lessHourWorked": "00:00"
        })
      }
      else if (new Date('1970-01-01T' + this.attendanceForm.get('actualHour').value + ':00') < new Date('1970-01-01T' + this.attendanceForm.get('totalHour').value + ':00')) {
        this.attendanceForm.patchValue({
          "lessHourWorked": this.sharedService.getTimeDifference(this.attendanceForm.get('actualHour').value, this.attendanceForm.get('totalHour').value),
          "overtimeHour": "00:00"
        })
      }
      this.cdRef.detectChanges();
    }
  }
  getWaiverHour(id) {
    this.subs.add(
      this.apiService.get(`time-attendance/waiver-hour?employee.id=${id ? id : ''}`).subscribe({
        next: (waiver: any) => {
          if (waiver?.data?.length > 0) {
            let waiverData = waiver?.data?.[0];
            if ((new Date(format(new Date(this.attendanceForm.value['date']), 'yyyy/MM/dd')).getTime() >= new Date(format(new Date(waiverData?.fromDate), 'yyyy/MM/dd')).getTime()) && (new Date(format(new Date(this.attendanceForm.value['date']), 'yyyy/MM/dd')).getTime() <= new Date(format(new Date(waiverData.toDate), 'yyyy/MM/dd')).getTime())) {


              this.attendanceForm.patchValue({
                "waiverHour": waiverData.hour < 10 ? "0" + waiverData.hour + ":00" : waiverData.hour.toString()
              });
              this.assignHours()
            }
            else {

            }
          }

        },
        error: (error: any) => {

        }
      }
      )
    )

  }

  checkIfBreakTobeIncluded(modifyTiming) {


    // new Date('1970-01-01T' + + ':00')

    if (this.selectedEmployee?.shift?.excludeBreak) {




      if (new Date('1970-01-01T' + modifyTiming.endTime + ':00') > new Date('1970-01-01T' + this.selectedEmployee.shift.breakTo + ':00')) {
        this.breakHours = this.sharedService.getTimeDifference(this.selectedEmployee?.shift?.breakFrom, this.selectedEmployee?.shift?.breakTo);
      }
    }
    if (this.selectedEmployee?.shift?.isAdditionalBreak) {




      if (new Date('1970-01-01T' + modifyTiming.endTime + ':00') > new Date('1970-01-01T' + this.selectedEmployee.shift.additionalBreakTo + ':00')) {
        this.additionalBreakHours = this.sharedService.getTimeDifference(this.selectedEmployee?.shift?.additionalBreakFrom, this.selectedEmployee?.shift?.additionalBreakTo);
      }
    }
    if (this.breakHours && this.additionalBreakHours) {
      this.totalBreakHours = this.sharedService.getTimeSum(this.breakHours, this.additionalBreakHours);
    }
    else if (this.breakHours === "" && this.additionalBreakHours) {
      this.totalBreakHours = this.additionalBreakHours;
    }
    else if (this.breakHours && this.additionalBreakHours === "") {
      this.totalBreakHours = this.breakHours;
    }


    this.attendanceForm.patchValue({
      "totalHour": this.sharedService.getTimeDifference(this.totalBreakHours, this.attendanceForm.get('standardHour').value)
    })


  }


  checkWeekend(shiftId) {


    //feching shift details to get weekendDetails
    this.subs.add(this.apiService.get(`time-attendance/shift/${shiftId ? shiftId : ''}`).subscribe({
      next: (shift: any) => {
        let modifyTiming: any = [];


        let weekNumber = Math.ceil((new Date(this.attendanceForm.value["date"]).getDate() + 6 - new Date(this.attendanceForm.value["date"]).getDay()) / 7);

        let datePipe = new DatePipe('en-US');

        let dayOfWeek: string = datePipe.transform(new Date(this.attendanceForm.value["date"]), 'EEEE');
        modifyTiming = shift?.data?.modifyTiming?.filter(day => day.name.toLowerCase() === dayOfWeek.toLowerCase());
        if (modifyTiming?.[0].isChecked) {





          this.attendanceForm.patchValue({
            "standardHour": this.sharedService.getTimeDifference(modifyTiming[0].startTime, modifyTiming[0].endTime)
          });

          this.checkIfBreakTobeIncluded(modifyTiming[0]);
        }
        else {


          this.attendanceForm.patchValue({
            "standardHour": shift?.data?.totalHours,
            "breakHour": this.totalBreakHours ? this.totalBreakHours : "00:00",
          });
          this.assignHours();
        }

        // this.assignHours();

        //status of day from shift weekendDetails information
        let dayStatus = shift?.["data"]?.["weekendDetails"][weekNumber - 1]["day"].filter(value => value.name.toLowerCase() === dayOfWeek.toLowerCase()
        )[0].status;

        if (dayStatus) {
          dayStatus = shift?.["data"]?.["weekendDetails"][weekNumber - 1]["day"].filter(value => value.name.toLowerCase() === dayOfWeek.toLowerCase()
          )[0]?.selectedHalf ? false : true;
        }

        switch (dayStatus) {
          case true:
            this.attendanceForm.patchValue({
              "calendarDay": 2
            })
            break;
          case false:
            this.attendanceForm.patchValue({
              "calendarDay": 1
            })
            break;
        }
        this.isDayloading=false;
      },
      error: (error: any) => {

      }
    }))
  }

  checkIfHoliday(workCalendarId) {


    let holidayList = [];
    this.subs.add(this.apiService.get(`time-attendance/holiday?workCalendar=${workCalendarId ? workCalendarId : ''}`).subscribe({
      next: (holiday: any) => {
        if (holiday) {
          holidayList = holiday.data.filter(value => new Date(format(new Date(value.date), 'yyyy/MM/dd')).getTime() === new Date(format(new Date(this.attendanceForm.value["date"]), 'yyyy/MM/dd')).getTime());
          if (holidayList.length > 0) {
            this.attendanceForm.patchValue({
              "calendarDay": 3
            });
            this.isDayloading=false;
          }
          else {
            this.checkWeekend(this.selectedEmployee?.shift?.id);
          }
        }
      },
      error: (error: any) => {

      }
    }
    ))
  }

  checkIfOnLeave(empId, date, leavePlanId?) {
    this.attendanceForm.patchValue({
      "attendanceStatus": null
    })
    let dateSelected: any
    let leaveTypeId: any;

    if (typeof date === 'object') {
      dateSelected = format(date, 'yyyy-MM-dd');
    }
    if (typeof date === 'string') {
      dateSelected = date;
    }
    this.subs.add(this.apiService.get(`leave/application`).subscribe({
      next: (res: any) => {
        if (res) {
          if (res?.data?.length > 0) {
            res?.data.map(leave => {
              if (leave?.employee?.id == empId) {
                if ((new Date(format(new Date(leave?.startDate), 'yyyy/MM/dd')).getTime() <= new Date(format(new Date(dateSelected), 'yyyy/MM/dd')).getTime()) && (new Date(format(new Date(leave?.endDate), 'yyyy/MM/dd')).getTime() >= new Date(format(new Date(dateSelected), 'yyyy/MM/dd')).getTime())) {
                  leaveTypeId = leave?.leaveType?.id;

                  this.apiService.get(`leave/configuration/${leavePlanId ? leavePlanId : ''}`).subscribe({
                    next: (leaveConfig: any) => {
                      leaveConfig?.data?.leaveTypes?.map(leaveType => {
                        if (Number(leaveType?.id) === Number(leaveTypeId)) {
                          if (Number(leaveType?.leaveItemType?.id) === 1) {
                            this.isOnPaidLeave = true;
                            if (this.isOnPaidLeave) {
                              this.attendanceForm.patchValue({
                                "attendanceStatus": 3
                              })
                            }
                            this.isOnUnPaidLeave = false;
                          }
                          if (Number(leaveType?.leaveItemType?.id) === 2) {
                            this.isOnUnPaidLeave = true;
                            if (this.isOnUnPaidLeave) {
                              this.attendanceForm.patchValue({
                                "attendanceStatus": 4
                              })
                              this.isOnPaidLeave = false;
                            }
                          }
                          this.cdRef.detectChanges();
                        }
                      })
                    },
                    error(err) {


                    },
                  })
                }
                else {

                  this.isOnPaidLeave = false;
                  this.isOnUnPaidLeave = false;
                  this.assignAttendanceStatusList(this.attendanceStatusOriginalList);
                }
              }
              else {

                this.isOnPaidLeave = false;
                this.isOnUnPaidLeave = false;
                this.assignAttendanceStatusList(this.attendanceStatusOriginalList);

              }
            }
            );

          }
        }
      },
      error(err) {

      },
    }))
  }

  checkIfDuplicate(empId, date) {

    this.attendanceExistCheckMsg = "";
    this.subs.add(this.apiService.get('time-attendance/attendance').subscribe({
      next: (res: any) => {
        if ((res?.data?.filter(value => value.employee?.id === empId && new Date(format(new Date(value.date), 'yyyy/MM/dd')).getTime() === new Date(format(new Date(date), 'yyyy/MM/dd')).getTime())).length > 0) {
          this.attendanceExistCheckMsg = "Attendance exist for the employee for the date choosen. Please choose another date.";
          this.attendanceForm.patchValue({
            "date": ""
          }, { emitEvent: false });
        }
        else {
          if (this.selectedEmployee?.workCalendar?.id) {
            this.checkIfHoliday(this.selectedEmployee?.workCalendar?.id);
          }
          if (this.selectedEmployee?.shift?.id) {
            this.getWaiverHour(empId);
          }

          if (date) {
            this.checkIfOnLeave(this.selectedEmployee?.id, date, this.selectedEmployee.leavePlanId ? this.selectedEmployee.leavePlanId : '');
          };

        }
        this.cdRef.detectChanges();
      },
      error(err) {

      },
    }))
  }
  calculateBreakHours() {
    if (this.selectedEmployee?.shift?.excludeBreak) {
      this.breakHours = this.sharedService.getTimeDifference(this.selectedEmployee?.shift?.breakFrom, this.selectedEmployee?.shift?.breakTo);


    }
    if (this.selectedEmployee?.shift?.isAdditionalBreak) {
      this.additionalBreakHours = this.sharedService.getTimeDifference(this.selectedEmployee?.shift?.additionalBreakFrom, this.selectedEmployee?.shift?.additionalBreakTo);


    }
    if (this.breakHours && this.additionalBreakHours) {
      this.totalBreakHours = this.sharedService.getTimeSum(this.breakHours, this.additionalBreakHours);


    }
    else if (this.breakHours === "" && this.additionalBreakHours) {
      this.totalBreakHours = this.additionalBreakHours;


    }
    else if (this.breakHours && this.additionalBreakHours === "") {
      this.totalBreakHours = this.breakHours;


    }

  }
  onEmployeeChange(event) {
    this.isDayloading = true;




    this.selectedEmployee = event;
    this.checkIfDuplicate(event?.id, this.attendanceForm.get('date').value);
    this.minDate = event.payrollOnboardDate ? new Date(event.payrollOnboardDate) : new Date();
    this.calculateBreakHours();

    this.attendanceForm.patchValue({
      "shiftId": event.shift.id,
      "workCalendarId": event.workCalendar.id,
      "waiverHour": "00:00",
      // "standardHour": event.shift.totalHours,
      "breakHour": this.totalBreakHours ? this.totalBreakHours : "00:00",
      "actualHour": "00:00",
      "overtimeHour": "00:00",
      "totalHour": "00:00",
      "lessHourWorked": "00:00",
    });
    // this.assignHours();

  }



  assignHours() {
    // if (this.totalBreakHours !== "") {
    //
    //   this.tempStandardHour = this.sharedService.getTimeDifference(this.totalBreakHours,this.attendanceForm.get('standardHour').value);
    // }
    // else {
    //   this.tempStandardHour = this.attendanceForm.get('standardHour').value;
    // }


    this.attendanceForm.patchValue({
      "totalHour": this.sharedService.getTimeDifference(this.attendanceForm.get('waiverHour').value ? this.attendanceForm.get('waiverHour').value : "00:00", this.attendanceForm.get('standardHour').value),
    });

    this.cdRef.detectChanges();
  }

  onCancel() {
    this._location.back();
  }

  submitorm() {
    if (this.attendanceForm.invalid && (this.attendanceExistCheckMsg !== '')) {
      this.isProcessing = false;
      return;
    }
    else {
      this.submit = false;
      let data = this.attendanceForm.value;


      data['createdBy'] = 1
      if (!this.id) {

        this.subs.add(this.apiService.post(`time-attendance/attendance`, data, 'attendance').subscribe({
          next: (res: any) => {
            if (res) {

              this.isProcessing = false;
              this.cdRef.detectChanges();
              this.sharedService.handleSuccessModel({ id: res._id });
              //   this._location.back();
            }
          },
          error: (error: any) => {
            this.cdRef.detectChanges();
            this.isProcessing = false;


          }
        }
        ))
      }
      else {


        this.subs.add(this.apiService.put(`time-attendance/attendance/${this.id}`, data, 'attendance').subscribe({
          next: (res: any) => {
            if (res) {

              this.isProcessing = false;
              this.cdRef.detectChanges();
              this.sharedService.handleSuccessModel({ id: this.id });
              // this._location.back();
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
        }))
      }
    }
  }

  onSubmit() {
    this.submit = true;
    this.isProcessing = true;
    this.componentCheckMsg = '';
    let id = 8;
    if (Number(this.attendanceForm.value.attendanceStatus) === 2) {
      this.subs.add(this.apiService.get(`time-attendance/attendance/check/component/${id ? id : ''}`).subscribe({
        next: (res: any) => {
          if (res) {
            if (!res.status) {
              this.componentCheckMsg = 'Please ensure Component Mapping is completed before proceeding with this transaction.'
              this.isProcessing = false;
            }
            else {
              this.submitorm();
            }
          }
        }
      }))
    }
    else {
      this.submitorm();
    }
  }

  enableDisablePresent() {
    if (this.attendanceStatusList.length === 0) {
      this.attendanceStatusList = _.cloneDeep(this.attendanceStatusOriginalList);
      this.assignAttendanceStatusList(this.attendanceStatusList);
    }



    if ((!this.attendanceForm.value.firstTimeIn) && (!this.attendanceForm.value.lastTimeOut)) {
      if (this.attendanceStatusList.length > 0) {
        this.attendanceStatusList.forEach(value => {
          if (parseInt(value.id) === 1) {
            value["disabled"] = true;
          }
        })
      }
    }
    else {
      if (this.attendanceStatusList.length > 0) {
        this.attendanceStatusList.forEach(value => {
          if (parseInt(value.id) === 1) {
            delete value.disabled;
          }
        })
      }
    }

    if (this.attendanceStatusList.length > 0) {
      this.attendanceStatusList.forEach(value => {
        if (parseInt(value.id) === 3) {
          if (this.isOnPaidLeave) {
            delete value.disabled;
          }
          else {
            value["disabled"] = true;
          }
        }
        if (parseInt(value.id) === 4) {
          if (this.isOnUnPaidLeave) {
            delete value.disabled;
          }
          else {
            value["disabled"] = true;
          }
        }
      })
    }

    this.attendanceStatusList = _.cloneDeep(this.attendanceStatusList);
    this.cdRef.detectChanges();
  }
  checkIfReasonRequired(event) {
    if (this.attendanceStatusList.length > 0) {
      this.enableDisablePresent();
      this.enableDisableAbsent();
    }
    if (Number(event?.id) === 6 || Number(event?.id) === 5) {
      this.showReason = true;
    }
    else {
      this.showReason = false;
    }
    this.cdRef.detectChanges();
  }
  enableDisableAbsent() {
    if (this.attendanceStatusList.length === 0) {
      this.attendanceStatusList = _.cloneDeep(this.attendanceStatusOriginalList);
      this.assignAttendanceStatusList(this.attendanceStatusList);
    }

    if ((!this.attendanceForm.value.firstTimeIn) && (!this.attendanceForm.value.lastTimeOut)) {
      if (this.attendanceStatusList.length > 0) {
        this.attendanceStatusList.forEach(value => {
          if (parseInt(value.id) === 2) {
            delete value.disabled;
          }
          if (parseInt(value.id) === 5) {
            delete value.disabled;
          }
          if (parseInt(value.id) === 6) {
            delete value.disabled;
          }
        })
      }
    }
    else {
      if (this.attendanceStatusList.length > 0) {
        this.attendanceStatusList.forEach(value => {
          if (parseInt(value.id) === 2) {
            value["disabled"] = true;
          }
          if (parseInt(value.id) === 5) {
            value["disabled"] = true;
          }
          if (parseInt(value.id) === 6) {
            value["disabled"] = true;
          }
        })
      }
    }
    this.attendanceStatusList = _.cloneDeep(this.attendanceStatusList);
    this.cdRef.detectChanges();
  }
  assignAttendanceStatusList(list) {
    list.forEach(item => {
      const id = parseInt(item.id);
      if (id >= 3 && id <= 7) {
        item.disabled = true;
      }
    });
    if (list.length > 0) {
      this.attendanceStatusList = _.cloneDeep(list);
    }
    if (this.attendanceStatusList.length > 0) {
      this.enableDisablePresent();
      this.enableDisableAbsent();
    }
  }

  ngAfterViewInit() {
    if (this.id) {
      this.isDayloading= true;
      this.isWorkCalendarloading = true;
      this.isShiftloading = true;
      this.isLoading = true;
      this.subs.add(this.apiService.get(`time-attendance/attendance/${this.id}`).subscribe({
        next: (res: any) => {
          if (res) {




            this.selectedEmployee = res?.data?.employee;
            this.attendanceForm.reset();
            //this.editData = res.data;
            this.attendanceForm.patchValue({
              "actualHour": res?.data?.actualHour ? res.data.actualHour : "00:00"
            })

            try {
              this.attendanceForm.patchValue({
                "attachment": res?.data?.attachment ? res.data.attachment : '',
                "firstTimeIn": res?.data?.firstTimeIn ? res?.data?.firstTimeIn : null,
                "lastTimeOut": res?.data?.lastTimeOut ? res?.data?.lastTimeOut : null,
                "calendarDay": res?.data?.['calendarDay']?.id ? res?.data?.['calendarDay']?.id : '',
                "workCalendarId": res?.data?.workCalendar?.id,
                "shiftId": res?.data?.shift?.id,
                "attendanceStatus": res?.data?.attendanceStatus?.id,
                "waiverHour": res?.data?.waiverHour ? res?.data?.waiverHour : "00:00",
                "overtimeHour": res?.data?.overtimeHour ? res.data.overtimeHour : "00:00",
                "lessHourWorked": res?.data?.lessHourWorked ? res.data.lessHourWorked : "00:00",
                "standardHour": res?.data?.standardHour ? res.data.standardHour : "00:00",
                "breakHour": res?.data?.breakHour ? res.data.breakHour : "00:00",
                "totalHour": res?.data?.totalHour ? res.data.totalHour : "00:00",
                "status": res?.data?.status?.id
              });
              this.isDayloading=false;
              this.isWorkCalendarloading = false;
              this.isShiftloading = false;
              this.attendanceForm.patchValue({
                "employeeId": res?.data?.employee?.id,
                "date": res?.data?.date
              }, { emitEvent: false });
              this.cdRef.detectChanges();

            } catch (error) {

            }


            this.listPatchData = res.data;
            this.isLoading = false;
            this.calculateHours();
            this.assignHours();


            this.cdRef.detectChanges();
          }
        }, error: (error: any) => {
          this.isLoading = false;
          this.cdRef.detectChanges();
          console.error(error);

        }
      }))
    }
    else {
      this.attendanceForm.patchValue({
        "waiverHour": "00:00",
        "standardHour": "00:00",
        "breakHour": "00:00",
        "actualHour": "00:00",
        "overtimeHour": "00:00",
        "totalHour": "00:00",
        "lessHourWorked": "00:00",
      });
      this.attendanceForm.patchValue({
        "date": new Date()
      }, { emitEvent: false })
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.add(
      this.routeSub = this.route.params.subscribe(params => {
        this.id = params['id'];
      }),

      this.jsonListService.getDataList('calendarDay').subscribe({
        next: (result) => {
          this.calendarDaysList = result;
        }
      })
    )
    //creating forms
    this.attendanceForm = this.dynamicFormService.createControl(attendanceFormData);

    this.subs.add(
      this.jsonListService.getDataList('attendanceStatus').subscribe({
        next: (result) => {
          this.attendanceStatusOriginalList = _.cloneDeep(result);

          let temp = _.cloneDeep(result);
          this.assignAttendanceStatusList(temp);
        }
      }),

      this.attendanceForm.get('date').valueChanges.subscribe(value => {
        this.checkIfDuplicate(this.selectedEmployee?.id, value);
      }),

      this.attendanceForm.get("firstTimeIn").valueChanges.subscribe(
        (value) => {
          this.attendanceForm.patchValue({
            "attendanceStatus": null
          })
          this.attendanceStatusList = []
          this.attendanceStatusList = _.cloneDeep(this.attendanceStatusOriginalList);


          if (this.attendanceStatusOriginalList.length > 0) {
            this.enableDisablePresent();
            this.enableDisableAbsent();
          }
        }),

      this.attendanceForm.get("lastTimeOut").valueChanges.subscribe(
        (value) => {
          this.attendanceForm.patchValue({
            "attendanceStatus": null
          })
          this.attendanceStatusList = [];
          this.attendanceStatusList = _.cloneDeep(this.attendanceStatusOriginalList);
          if (this.attendanceStatusOriginalList.length > 0) {
            this.enableDisablePresent();
            this.enableDisableAbsent();
          }

        }),

      this.attendanceForm.get("attendanceStatus").valueChanges.subscribe(
        (value) => {
          this.attendanceStatusList = []
          this.attendanceStatusList = _.cloneDeep(this.attendanceStatusOriginalList);
          if (this.attendanceStatusOriginalList) {
            this.enableDisablePresent();
          }
        })
    )
    this.cdRef.detectChanges();
  }
  onDateSelected(selectedDate: Date) {
    this.attendanceForm.get("date").setValue(selectedDate);
  }
}
