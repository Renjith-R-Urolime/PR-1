import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DetailsCardData } from 'src/app/shared/meta-interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { detailsCardList } from '../../shift-scheduler/shift.data';
import { formSections } from '../shift.data';

@Component({
  selector: 'app-shift-scheduler-detail',
  templateUrl: './shift-scheduler-detail.component.html',
  styleUrls: ['./shift-scheduler-detail.component.scss']
})
export class ShiftSchedulerDetailComponent implements OnInit {
  detailsCardData: DetailsCardData = {
    meta: detailsCardList,
    data: []
  };
  private routeSub: Subscription | undefined;
  weekendConfig: any;
  isLoading: boolean = true;
  enableHalf: boolean = false;
  @Input() ifWorkCalendarView: boolean = false;
  @Input() id: any;
  @Input() headingToHide: any;


  daysOfWeeks: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  daysOfWeek: { name: string, isChecked: boolean }[] = [
    { name: 'Sun', isChecked: false },
    { name: 'Mon', isChecked: false },
    { name: 'Tue', isChecked: false },
    { name: 'Wed', isChecked: false },
    { name: 'Thu', isChecked: false },
    { name: 'Fri', isChecked: false },
    { name: 'Sat', isChecked: false },
  ];
  formSections = formSections;
  activeTemplateName: string;
  formTemplateRef: TemplateRef<any>;
  data: any;
  headerText: string
  formTemplate: TemplateRef<any>
  calendarData: any
  weekDefinedStatus: boolean = false
  modifyTimingData: any
  toleranceMarginData: any
  listOfDays: any[] = [{ "day": 'Sunday', "checked": false }, { "day": 'Monday', "checked": false }, { "day": 'Tuesday', "checked": false }, { "day": 'Wednesday', "checked": false }, { "day": 'Thursday', "checked": false }, { "day": 'Friday', "checked": false }, { "day": 'Saturday', "checked": false }];
  columnVisibility: boolean[] = [false, false, false, false, false, false, false];
  selectedHalfDay: string | null = null;
  hasSelectedHalf: boolean = false;
  isAdditionalBreak: any

  theme: string = this.sharedService.getTheme();
  totalBreakTime: any;
  totalAdditionalBreak: any;
  ;


  constructor(private sharedService: SharedService, private apiService: ApiService, private route: ActivatedRoute, private cdRef: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.id && !changes.id.firstChange) {
      this.isLoading=true
      this.daysOfWeeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      this.daysOfWeek = [
        { name: 'Sun', isChecked: false },
        { name: 'Mon', isChecked: false },
        { name: 'Tue', isChecked: false },
        { name: 'Wed', isChecked: false },
        { name: 'Thu', isChecked: false },
        { name: 'Fri', isChecked: false },
        { name: 'Sat', isChecked: false },
      ];
      this.listOfDays= [{ "day": 'Sunday', "checked": false }, { "day": 'Monday', "checked": false }, { "day": 'Tuesday', "checked": false }, { "day": 'Wednesday', "checked": false }, { "day": 'Thursday', "checked": false }, { "day": 'Friday', "checked": false }, { "day": 'Saturday', "checked": false }];
      this.columnVisibility= [false, false, false, false, false, false, false];
      this.totalBreakTime=null
      this.totalAdditionalBreak=null
      this.ngOnInit()
    }
  }


  ngOnInit() {
    if (!this.ifWorkCalendarView) {
      this.routeSub = this.route.params.subscribe(params => {
        this.id = params['id'];
      });
    }
    if (this.id) {
      this.isLoading = true;

      this.apiService.get(`time-attendance/shift/${this.id}`).subscribe({
        next: (res: any) => {
          if (res) {
            this.data = res.data

            this.calcuateTotalTime()
            this.modifyTiming()
            this.calendarData = this.data?.workCalendar

            this.weekendConfig = res.data.weekendDetails;

            this.weekendConfig.forEach(week => {
              week.day.forEach(day => {
                if (day.status) {
                  const matchedDay = this.daysOfWeek.find(d => d.name.substring(0, 3).toLowerCase() === day.name.substring(0, 3).toLowerCase() && !d.isChecked);
                  if (matchedDay) {
                    const index = this.daysOfWeek.indexOf(matchedDay);
                    matchedDay.isChecked = true;
                    this.listOfDays[index].checked = false
                    this.columnVisibility[index] = true
                  }
                  if (day?.selectedHalf) {
                    this.enableHalf = true
                  }
                }
              });
            });

            this.listOfDays.forEach(day => {
              let allDaysTrue = true;
              this.weekendConfig.forEach(week => {
                const currentDay = week.day.find(d => d.name.toLowerCase() === day.day.toLowerCase());
                if (currentDay && !currentDay.status) {
                  allDaysTrue = false;
                }
              });
              if (allDaysTrue) {
                day.checked = true;
              }
            });




            this.isAdditionalBreak = this.data?.isAdditionalBreak === true ? this.data?.isAdditionalBreak : ""
            this.enableHalf = this.hasSelectedHalfInWeekendDetails();
            this.isLoading = false;
            this.cdRef.detectChanges();
            this.isWeekDefined()
          }
        }, error: (error: any) => {
          this.isLoading = false;
          this.cdRef.detectChanges();

          console.error(error);

        }
      });
    }

  }


  modifyTiming() {
    this.modifyTimingData = this.data?.modifyTiming
  }

  calcuateTotalTime() {
    if (this.data && this.data.breakFrom && this.data.breakTo) {
      this.totalBreakTime = this.sharedService.getTimeDifference(this.data.breakFrom, this.data.breakTo);
    }

    if (this.data && this.data.additionalBreakFrom && this.data.additionalBreakTo) {
      this.totalAdditionalBreak = this.sharedService.getTimeDifference(this.data.additionalBreakFrom, this.data.additionalBreakTo);
    }
  }

  isStatusTrue(day: any): boolean {
    return day.status;
  }

  getFormTemplate(template: TemplateRef<any>, name: string) {


    this.formTemplateRef = template
    this.activeTemplateName = name


  }

  assignTemplate(headerText, formTemplate) {
    this.headerText = headerText;
    this.formTemplate = formTemplate;
  }

  isAdditionalBreakEnabled(): boolean {
    return this.data?.additionalBreakFrom && this.data?.additionalBreakTo;
  }

  additionalBreak(): boolean {
    return this.data?.additionalBreakFrom && this.data?.additionalBreakTo;
  }

  hasSelectedHalfInWeekendDetails(): boolean {
    if (this.weekendConfig) {
      for (const week of this.weekendConfig) {
        for (const day of week.day) {
          if (day.selectedHalf) {
            return true;
          }
        }
      }
    }
    return false;
  }

  isWeekDefined() {
    this.weekDefinedStatus = this.weekendConfig?.some(config =>
      config?.day.some(day => day?.status)
    );
  }

}
