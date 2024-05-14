import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { AttendanceDetailComponent } from './attendance/attendance-detail/attendance-detail.component';
import { AttendanceFormComponent } from './attendance/attendance-form/attendance-form.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { HolidaysDetailsComponent } from './holidays/holidays-details/holidays-details.component';
import { HolidaysFormComponent } from './holidays/holidays-form/holidays-form.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { ShiftSchedulerDetailComponent } from './shift-scheduler/shift-scheduler-detail/shift-scheduler-detail.component';
import { ShiftSchedulerFormComponent } from './shift-scheduler/shift-scheduler-form/shift-scheduler-form.component';
import { ShiftSchedulerComponent } from './shift-scheduler/shift-scheduler.component';
import { WaiverHourDetailsComponent } from './waiver-hour/waiver-hour-details/waiver-hour-details.component';
import { WaiverHourFormComponent } from './waiver-hour/waiver-hour-form/waiver-hour-form.component';
import { WaiverHourComponent } from './waiver-hour/waiver-hour.component';
import { WorkCalendarFormComponent } from './work-calendar/work-calendar-form/work-calendar-form.component';
import { WorkCalendarViewComponent } from './work-calendar/work-calendar-view/work-calendar-view.component';
import { WorkCalendarComponent } from './work-calendar/work-calendar.component';


const routes: Routes = [
  {
    path: 'work-calendar',
    component: WorkCalendarComponent
  },
  {
    path: 'work-calendar/view/:id',
    component: WorkCalendarViewComponent
  },
  {
    path: 'work-calendar/create',
    component: WorkCalendarFormComponent
  },
  {
    path: 'work-calendar/edit/:id',
    component: WorkCalendarFormComponent
  },
  {
    path: 'attendance',
    component: AttendanceComponent
  },
  {
    path: 'attendance/create',
    component: AttendanceFormComponent
  },
  {
    path: 'attendance/edit/:id',
    component: AttendanceFormComponent
  },
  {
    path: 'attendance/view/:id',
    component: AttendanceDetailComponent
  },
  {
    path: 'shift',
    component: ShiftSchedulerComponent
  },
  {
    path: 'holidays',
    component: HolidaysComponent
  },
  {
    path: 'holidays/create',
    component: HolidaysFormComponent
  },

  {
    path: 'holidays/edit/:id',
    component: HolidaysFormComponent
  },
  {
    path: 'holidays/view/:id',
    component: HolidaysDetailsComponent
  },
  {
    path: 'waiver-hour',
    component: WaiverHourComponent
  },
  {
    path: 'waiver-hour/create',
    component: WaiverHourFormComponent
  },
  {
    path: 'waiver-hour/edit/:id',
    component: WaiverHourFormComponent
  },
  {
    path: 'waiver-hour/view/:id',
    component: WaiverHourDetailsComponent
  },
  {
    path: 'shift/create',
    component: ShiftSchedulerFormComponent
  },
  {
    path: 'shift/edit/:id',
    component: ShiftSchedulerFormComponent
  },
  {
    path: 'shift/view/:id',
    component: ShiftSchedulerDetailComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbDatepickerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCUfly7j3_rrfccyEZjVy3honDg-7pyhjg'
    })
  ],
  declarations: [AttendanceComponent, WorkCalendarComponent, WorkCalendarViewComponent, ShiftSchedulerComponent, ShiftSchedulerFormComponent, ShiftSchedulerDetailComponent, AttendanceFormComponent,AttendanceDetailComponent, WorkCalendarFormComponent, HolidaysComponent, HolidaysFormComponent, WaiverHourComponent, WaiverHourFormComponent, HolidaysDetailsComponent, WaiverHourDetailsComponent]

})
export class TimeAndAttendanceModule { }
