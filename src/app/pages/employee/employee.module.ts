import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbDatepickerModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ModalsModule } from 'src/app/_metronic/partials';
import { ModuleSettingsComponent } from 'src/app/shared/ui/module-settings/module-settings.component';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { EmployeeSettingsListComponent } from './employee-settings/employee-settings-list/employee-settings-list.component';
import { EmployeeSettingsComponent } from './employee-settings/employee-settings.component';
import { PayStructureFormComponent } from './pay-structure/pay-structure-form/pay-structure-form.component';
import { PayStructureViewComponent } from './pay-structure/pay-structure-view/pay-structure-view.component';
import { PayStructureComponent } from './pay-structure/pay-structure.component';
import { PayrollOnboardFormComponent } from './payroll-onboard/payroll-onboard-form/payroll-onboard-form.component';
import { PayrollOnboardComponent } from './payroll-onboard/payroll-onboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { EmployeeLeavePlanComponent } from './employee-leave-plan/employee-leave-plan.component';
import { EmployeeLeavePlanFormComponent } from './employee-leave-plan/employee-leave-plan-form/employee-leave-plan-form.component';
import { EmployeeLeavePlanDetailsComponent } from './employee-leave-plan/employee-leave-plan-details/employee-leave-plan-details.component';
import { PreviewReportComponent } from '../payroll-management/run-payroll/preview-report/preview-report.component';


const routes: Routes = [
  {
      path: 'master',
      loadChildren: () => import('./employee-home/employee-home.module').then((m) => m.EmployeeHomeModule),
   },
   {
    path: 'manage',
    loadChildren: () => import('./manage-employee/manage-employee.module').then((m) => m.ManageEmployeeModule),
 },
 {
  path: 'employee-offboard',
  loadChildren: () => import('./employee-offboard/employee-offboard.module').then((m) => m.EmployeeOffboardModule),
},
  // {
  //   path: 'payroll-offboard',
  //   component: PayrollOffboardComponent,
  // },
  {

    path: 'onboard',
    component: PayrollOnboardComponent,
  },

  // {
  //   path: 'manage-employee',
  //   loadChildren: () =>
  //     import('./manage-employee/manage-employee.module').then((m) => m.ManageEmployeeModule),

  // },

  // {

  //   path: 'warnings',
  //   component: WarningsComponent,
  // },
  // {
  //   path: 'warnings/view/:id',
  //   component: WarningsViewComponent,
  // },
  // {
  //   path: 'grievance',
  //   component: GrievanceComponent,
  // },
  // {

  //   path: 'grievance/view/:id',
  //   component: GrievanceViewComponent,
  // },
  // {
  //   path: 'payroll-offboard/view/:id',
  //   component: PayrollOffboardViewComponent,
  // },
  // {
  //   path: 'assignment-task',
  //   component: AssignmentAndTaskComponent,
  // },
  // {
  //   path: 'dependentList',
  //   component: DependentComponent
  // },
  // {
  //   path: 'dependentList/view/:id',
  //   component: DependentViewComponent
  // },
  // {
  //   path: 'assignment-task/view/:id',
  //   component: AssignmentAndTaskViewComponent,
  // },
  {
    path: 'travels',
    loadChildren: () =>
      import('./travel/travels.module').then((m) => m.TravelModule),
  },
  // {
  //   path: 'manage-employee',
  //   component: ManageEmployeeComponent,
  // },
  // {
  //   path: 'manage-employee/view/:id',
  //   component: ManageEmployeeViewComponent,
  // },
  // {
  //   path: 'peopleList',
  //   component: PeopleListComponent,
  // },
  {
    path: 'onboard/:id',
    component: PayrollOnboardFormComponent,
  },
  {
    path: 'payslip-preview/:batchId',
    component: PreviewReportComponent
  },
  {
    path: 'settings',
    component: ModuleSettingsComponent,
  },
  {
    path: 'settings/pay-structure',
    component: PayStructureComponent,
  },
  {
    path: 'settings/pay-structure/create',
    component: PayStructureFormComponent,
  },
  {
    path: 'settings/pay-structure/edit/:id',
    component: PayStructureFormComponent,
  },
  {
    path: 'settings/pay-structure/view/:id',
    component: PayStructureViewComponent,
  },
  {
    path: 'settings/employee-leave-plan',
    component: EmployeeLeavePlanComponent,
  },
  {
    path: 'settings/employee-leave-plan/create',
    component: EmployeeLeavePlanFormComponent,
  },
  {
    path: 'settings/employee-leave-plan/edit/:id',
    component: EmployeeLeavePlanFormComponent,
  },
  {
    path: 'settings/employee-leave-plan/view/:id',
    component: EmployeeLeavePlanDetailsComponent,
  },
  {
    path: 'settings/:sub',
    component: EmployeeSettingsListComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    NgApexchartsModule,
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
  declarations: [EmployeeSettingsComponent, EmployeeSettingsListComponent, PayrollOnboardComponent, PayrollOnboardFormComponent, PayStructureComponent, PayStructureFormComponent, PayStructureViewComponent,EmployeeLeavePlanComponent,EmployeeLeavePlanFormComponent, EmployeeLeavePlanDetailsComponent]

})
export class EmployeeModule { }
