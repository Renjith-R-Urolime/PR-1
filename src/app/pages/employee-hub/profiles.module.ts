import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { WidgetsModule } from 'src/app/shared/ui/widgets/widgets.module';
import { ContributionRegisterDetailComponent } from '../employee/contribution-register/contribution-register-detail/contribution-register-detail.component';
import { ContributionRegisterFormComponent } from '../employee/contribution-register/contribution-register-form/contribution-register-form.component';
import { ContributionRegisterComponent } from '../employee/contribution-register/contribution-register.component';
import { DependentViewComponent } from '../employee/dependents/dependent-view/dependent-view.component';
import { DependentComponent } from '../employee/dependents/dependent/dependent.component';
import { EmployeeFormComponent } from '../employee/employee-home/employee-form/employee-form.component';
import { EmployeeHomeComponent } from '../employee/employee-home/employee-home.component';
import { DocumentsCredentialsPillTabComponent } from '../employee/employee-home/employee-profile/documents-credentials-pill-tab/documents-credentials-pill-tab.component';
import { EmployeePillTabComponent } from '../employee/employee-home/employee-profile/employee-pill-tab/employee-pill-tab.component';
import { EmployeeProfileComponent } from '../employee/employee-home/employee-profile/employee-profile.component';
import { LeavePillTabComponent } from '../employee/employee-home/employee-profile/leave-pill-tab/leave-pill-tab.component';
import { OverviewPillTabComponent } from '../employee/employee-home/employee-profile/overview-pill-tab/overview-pill-tab.component';
import { PayrollPillTabComponent } from '../employee/employee-home/employee-profile/payroll-pill-tab/payroll-pill-tab.component';
import { PayrollOnboardFormComponent } from '../employee/payroll-onboard/payroll-onboard-form/payroll-onboard-form.component';
import { PayrollOnboardComponent } from '../employee/payroll-onboard/payroll-onboard.component';
// import { PreviewReportComponent } from '../payroll-management/run-payroll/preview-report/preview-report.component';

const routes: Routes = [
    {
        path: 'employee',
        component: EmployeeHomeComponent,
      },
      {
        path: 'employee/create',
        component: EmployeeFormComponent
      },
      {
        path: 'employee/edit/:id',
        component: EmployeeFormComponent
      },
      {
        path: 'employee/view/:id',
        component: EmployeeProfileComponent,
      },
      {
        path: 'employee/contribution-register/:id/create',
        component: ContributionRegisterFormComponent
      },
      {
        path: 'employee/contribution-register/edit/:id',
        component: ContributionRegisterFormComponent
      },
      {
        path: 'employee/contribution-register/:id',
        component: ContributionRegisterComponent
      },
      {
        path: 'employee/contribution-register/view/:id',
        component: ContributionRegisterDetailComponent
      },
      // {
      //   path: 'payslip-preview/:batchId',
      //   component: PreviewReportComponent
      // },
      {
        path: 'payroll-enrollment',
        component: PayrollOnboardComponent,
      },
      {
        path: 'payroll-enrollment/:id',
        component: PayrollOnboardFormComponent,
      },
      {
        path: 'payroll-enrollment/edit/:id',
        component: PayrollOnboardFormComponent,
      },
      {
        path: 'dependents',
        component: DependentComponent
      },
      {
        path: 'dependents/view/:id',
        component: DependentViewComponent
      },
  ]

@NgModule({
  declarations: [ DependentViewComponent, DependentComponent,PayrollOnboardComponent,EmployeeHomeComponent,EmployeeFormComponent,EmployeeProfileComponent,EmployeePillTabComponent,PayrollPillTabComponent,LeavePillTabComponent,DocumentsCredentialsPillTabComponent,OverviewPillTabComponent,PayrollOnboardFormComponent,ContributionRegisterFormComponent,ContributionRegisterComponent,ContributionRegisterDetailComponent

  ],
  imports: [
    UiModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgbDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    WidgetsModule,
    NgApexchartsModule
  ]
})
export class EmployeeProfileModule { }
