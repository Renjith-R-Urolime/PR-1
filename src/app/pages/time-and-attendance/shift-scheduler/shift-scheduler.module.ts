import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbDatepickerModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ModalsModule } from 'src/app/_metronic/partials';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { ShiftSchedulerDetailComponent } from './shift-scheduler-detail/shift-scheduler-detail.component';
import { ShiftSchedulerFormComponent } from './shift-scheduler-form/shift-scheduler-form.component';
import { ShiftSchedulerComponent } from './shift-scheduler.component';

const routes: Routes = [
  {
    path: '',
    component: ShiftSchedulerComponent
  },
  {
    path: 'create',
    component: ShiftSchedulerFormComponent
  },
  {
    path: 'edit/:id',
    component: ShiftSchedulerFormComponent
  },
  {
    path: 'view/:id',
    component: ShiftSchedulerDetailComponent
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
  ],
  declarations: [ShiftSchedulerComponent, ShiftSchedulerFormComponent, ShiftSchedulerDetailComponent]
})
export class ShiftSchedulerModule { }
