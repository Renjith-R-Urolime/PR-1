import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManageSubsidiaryComponent } from './manage-subsidiary/manage-subsidiary.component';
import { ManageSalaryComponent } from './manage-salary/manage-salary.component';
import { ManageBankDetailsComponent } from './manage-bank-details/manage-bank-details.component';
import { ManageSubsidiaryViewComponent } from './manage-subsidiary/manage-subsidiary-view/manage-subsidiary-view.component';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { ManageSalaryViewComponent } from './manage-salary/manage-salary-view/manage-salary-view.component';
import { ManageBankDetailsViewComponent } from './manage-bank-details/manage-bank-details-view/manage-bank-details-view.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { ManageEmployeeViewComponent } from './manage-employee/manage-employee-view/manage-employee-view.component';
import { ManageBankDetailsFormComponent } from './manage-bank-details/manage-bank-details-form/manage-bank-details-form.component';
import { ManageSalaryFormComponent } from './manage-salary/manage-salary-form/manage-salary-form.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageClassificationComponent } from './manage-classification/manage-classification.component';
import { ManageClassificationFormComponent } from './manage-classification/manage-classification-form/manage-classification-form.component';
import { ManageClassificationViewComponent } from './manage-classification/manage-classification-view/manage-classification-view.component';
import { ManageShiftComponent } from './manage-shift/manage-shift.component';
import { ManageShiftFormComponent } from './manage-shift/manage-shift-form/manage-shift-form.component';
import { ManageShiftViewComponent } from './manage-shift/manage-shift-view/manage-shift-view.component';

const routes: Routes = [
  //   {
  //     path: 'work-calendar/view/:id',
  //     component: WorkCalendarComponent
  //   },
  {
    path: 'manage-employee',
    component: ManageEmployeeComponent,
  },
  {
    path: 'manage-employee/view/:id',
    component: ManageEmployeeViewComponent,
  },
  
  {
    path: 'manage-subsidiary',
    component: ManageSubsidiaryComponent,
  },
  {
    path: 'manage-subsidiary/view/:id',
    component: ManageSubsidiaryViewComponent,
  },
  {
    path: 'manage-salary',
    component: ManageSalaryComponent,
  },
  {
    path: 'manage-salary/view/:id',
    component: ManageSalaryViewComponent,
  },
  {
    path: 'manage-salary/create',
    component: ManageSalaryFormComponent
  },
  {
    path: 'manage-salary/edit/:id',
    component: ManageSalaryFormComponent
  },
  {
    path: 'manage-bank-details',
    component: ManageBankDetailsComponent,
  },
    {
    path: 'manage-bank-details/view/:id',
    component: ManageBankDetailsViewComponent,
  },
  {
    path: 'manage-bank-details/add',
    component: ManageBankDetailsFormComponent
  },
  {
    path: 'manage-bank-details/edit/:id',
    component: ManageBankDetailsFormComponent
  },
  {
    path: 'manage-classification',
    component: ManageClassificationComponent,
  },
  {
    path: 'manage-classification/view/:id',
    component: ManageClassificationViewComponent,
  },
  {
    path: 'manage-classification/create',
    component: ManageClassificationFormComponent
  },
  {
    path: 'manage-classification/edit/:id',
    component: ManageClassificationFormComponent
  },
  {
    path: 'manage-shift',
    component: ManageShiftComponent,
  },
  {
    path: 'manage-shift/view/:id',
    component: ManageShiftViewComponent,
  },
  {
    path: 'manage-shift/create',
    component: ManageShiftFormComponent
  },
  {
    path: 'manage-shift/edit/:id',
    component: ManageShiftFormComponent
  },
  // {
  //   path: 'manage-bank-details/view/:id',
  //   component: ManageBankDetailsViewComponent,
  // },

  // {
  //   path: 'run-payroll',
  //   component: RunPayrollLandingComponent
  // },
  // {
  //   path: 'run-payroll/edit',
  //   component: RunPayrollComponent
  // },

  // {
  //   path: 'manage-bank-details/edit',
  //   component: ManageBankDetailsViewComponent
  // },
  ]

@NgModule({
  declarations: [
    ManageEmployeeComponent, ManageEmployeeViewComponent,
    ManageSalaryComponent, ManageSalaryViewComponent,
    ManageSubsidiaryComponent, ManageSubsidiaryViewComponent,
    
    
   ManageBankDetailsComponent,
               ManageBankDetailsViewComponent,
               ManageBankDetailsFormComponent,
               ManageSalaryFormComponent,
               ManageClassificationComponent,
               ManageClassificationFormComponent,
               ManageClassificationViewComponent,
               ManageShiftComponent,
               ManageShiftFormComponent,
               ManageShiftViewComponent,
               
  ],
  imports: [
 
    UiModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgbDatepickerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ManageEmployeeModule { }
