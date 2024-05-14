import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbDatepickerModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ModalsModule } from 'src/app/_metronic/partials';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { HolidaysDetailsComponent } from './holidays-details/holidays-details.component';
import { HolidaysFormComponent } from './holidays-form/holidays-form.component';
import { HolidaysComponent } from './holidays.component';
const routes: Routes = [
  {
    path: '',
    component: HolidaysComponent
  },
  {
    path: 'create',
    component: HolidaysFormComponent
  },
  {
    path: 'edit/:id',
    component: HolidaysFormComponent
  },
  {
    path: 'view/:id',
    component: HolidaysDetailsComponent
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
  declarations: [HolidaysFormComponent, HolidaysComponent, HolidaysDetailsComponent]
})
export class HolidaysModule { }
