import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { AdvanceSalaryFormComponent } from './advance-salary-form/advance-salary-form.component';
import { AdvanceSalaryViewComponent } from './advance-salary-view/advance-salary-view.component';
import { AdvanceSalaryComponent } from './advance-salary.component';

const routes: Routes = [
  {
    path: '',
    component: AdvanceSalaryComponent,
  },
  {
    path: 'create',
    component: AdvanceSalaryFormComponent
  },
  {
    path: 'edit/:id',
    component: AdvanceSalaryFormComponent
  },
  {
    path: 'view/:id',
    component: AdvanceSalaryViewComponent
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
  declarations: [AdvanceSalaryComponent,AdvanceSalaryFormComponent,AdvanceSalaryViewComponent]
})
export class AdvanceSalaryModule { }
