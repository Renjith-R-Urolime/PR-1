import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbDatepickerModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ModalsModule } from 'src/app/_metronic/partials';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { WaiverHourDetailsComponent } from './waiver-hour-details/waiver-hour-details.component';
import { WaiverHourFormComponent } from './waiver-hour-form/waiver-hour-form.component';
import { WaiverHourComponent } from './waiver-hour.component';

const routes: Routes = [
  {
    path: '',
    component: WaiverHourComponent
  },
  {
    path: 'create',
    component: WaiverHourFormComponent
  },
  {
    path: 'edit/:id',
    component: WaiverHourFormComponent
  },
  {
    path: 'view/:id',
    component: WaiverHourDetailsComponent
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
  declarations: [WaiverHourComponent, WaiverHourFormComponent, WaiverHourDetailsComponent]
})
export class WaiverHourModule { }
