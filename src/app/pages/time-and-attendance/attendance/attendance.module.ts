import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbDatepickerModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ModalsModule } from 'src/app/_metronic/partials';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { AttendanceDetailComponent } from './attendance-detail/attendance-detail.component';
import { AttendanceFormComponent } from './attendance-form/attendance-form.component';
import { AttendanceComponent } from './attendance.component';
const routes: Routes = [
  {
    path: '',
    component: AttendanceComponent
  },
  {
    path: 'create',
    component: AttendanceFormComponent
  },
  {
    path: 'edit/:id',
    component: AttendanceFormComponent
  },
  {
    path: 'view/:id',
    component: AttendanceDetailComponent
  },
]

@NgModule({
  imports: [
    CommonModule,
    InlineSVGModule,
    RouterModule.forChild(routes),
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    NgbToastModule,
    ReactiveFormsModule,
    ModalsModule,
    NgbDatepickerModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyCUfly7j3_rrfccyEZjVy3honDg-7pyhjg'
    // })
  ],
  declarations: [AttendanceComponent, AttendanceFormComponent, AttendanceDetailComponent]
})
export class AttendanceModule { }
