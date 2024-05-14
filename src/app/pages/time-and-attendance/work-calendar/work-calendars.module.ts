import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { WorkCalendarFormComponent } from './work-calendar-form/work-calendar-form.component';
import { WorkCalendarViewComponent } from './work-calendar-view/work-calendar-view.component';
import { WorkCalendarComponent } from './work-calendar.component';

const routes: Routes = [
  {
    path: '',
    component: WorkCalendarComponent
  },
  {
    path: 'view/:id',
    component: WorkCalendarViewComponent
  },
  {
    path: 'create',
    component: WorkCalendarFormComponent
  },
  {
    path: 'edit/:id',
    component: WorkCalendarFormComponent
  },
  {
    path: 'shift',
    loadChildren: () =>
      import('../shift-scheduler/shift-scheduler.module').then((m) => m.ShiftSchedulerModule),
  },
  {
    path: 'holiday',
    loadChildren: () =>
      import('../holidays/holidays.module').then((m) => m.HolidaysModule),
  },
  {
    path: 'waiver',
    loadChildren: () =>
      import('../waiver-hour/waiver-hour.module').then((m) => m.WaiverHourModule),
  },
]
@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbDatepickerModule
  ],
  declarations: [WorkCalendarComponent,WorkCalendarFormComponent,WorkCalendarViewComponent]

})
export class WorkCalemdarsModule { }
