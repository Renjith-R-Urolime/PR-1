import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { TimeOffAdjustmentFormComponent } from './time-off-adjustment-form/time-off-adjustment-form.component';
import { TimeOffAdjustmentComponent } from './time-off-adjustment.component';
import { TimeoffAdjustmentViewComponent } from './timeoff-adjustment-view/timeoff-adjustment-view.component';

const routes: Routes = [
  {
    path: '',
    component: TimeOffAdjustmentComponent,
  },
  {
    path: 'create',
    component: TimeOffAdjustmentFormComponent
  },
  {
    path: 'edit/:id',
    component: TimeOffAdjustmentFormComponent
  },
  {
    path: 'view/:id',
    component: TimeoffAdjustmentViewComponent
  },

]

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    InlineSVGModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [TimeOffAdjustmentComponent, TimeOffAdjustmentFormComponent, TimeoffAdjustmentViewComponent]
})
export class TimeOffAdjustmentModule { }
