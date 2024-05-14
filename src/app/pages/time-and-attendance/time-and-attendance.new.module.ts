import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'attendance',
    loadChildren: () =>
      import('./attendance/attendance.module').then((m) => m.AttendanceModule),
  },
  {
    path: 'calendar',
    loadChildren: () =>
      import('./work-calendar/work-calendars.module').then((m) => m.WorkCalemdarsModule),
  },
  {
    path: 'roaster-planner',
    loadChildren: () =>
      import('./work-calendar/work-calendars.module').then((m) => m.WorkCalemdarsModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsModule),
  },
]
@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  declarations: []
})
export class TimeAndAttendanceModule { }
