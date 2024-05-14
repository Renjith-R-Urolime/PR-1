import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { QRCodeModule } from 'angularx-qrcode';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ClipboardModule } from 'ngx-clipboard';
import { DrawersModule } from 'src/app/_metronic/partials/layout/drawers/drawers.module';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { WidgetsModule } from 'src/app/shared/ui/widgets/widgets.module';
import { ContributionRegisterDetailComponent } from '../contribution-register/contribution-register-detail/contribution-register-detail.component';
import { ContributionRegisterFormComponent } from '../contribution-register/contribution-register-form/contribution-register-form.component';
import { ContributionRegisterComponent } from '../contribution-register/contribution-register.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeHomeComponent } from './employee-home.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { EmployeePillTabComponent } from './employee-profile/employee-pill-tab/employee-pill-tab.component';
import { PayrollPillTabComponent } from './employee-profile/payroll-pill-tab/payroll-pill-tab.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LeavePillTabComponent } from './employee-profile/leave-pill-tab/leave-pill-tab.component';
import { DocumentsCredentialsPillTabComponent } from './employee-profile/documents-credentials-pill-tab/documents-credentials-pill-tab.component';
import { OverviewPillTabComponent } from './employee-profile/overview-pill-tab/overview-pill-tab.component';


const routes: Routes = [
  {
    path: '',
    component: EmployeeHomeComponent,
  },
  {
    path: 'create',
    component: EmployeeFormComponent,
  },
  {
    path: 'edit/:id',
    component: EmployeeFormComponent,
  },
  {
    path: 'view/:id',
    component: EmployeeProfileComponent,
  },
  {
    path: 'contribution-register/:id/create',
    component: ContributionRegisterFormComponent
  },
  
  {
    path: 'contribution-register/:id', // here id represents employee id
    component: ContributionRegisterComponent
  },
  {
    path: 'contribution-register/view/:id',
    component: ContributionRegisterDetailComponent
  },
  {
    path: 'contribution-register/edit/:id', // here id represents contribution-register id
    component: ContributionRegisterFormComponent
  },
]

@NgModule({
  imports: [
    CommonModule,
    NgApexchartsModule,
    InlineSVGModule,
    ClipboardModule,
    WidgetsModule,
    QRCodeModule,
    UiModule,
    DrawersModule,
    RouterModule.forChild(routes),
    NgbDatepickerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [EmployeeFormComponent, EmployeeHomeComponent, EmployeeProfileComponent, ContributionRegisterFormComponent, ContributionRegisterDetailComponent, ContributionRegisterComponent, EmployeePillTabComponent, PayrollPillTabComponent, LeavePillTabComponent, DocumentsCredentialsPillTabComponent, OverviewPillTabComponent],
})
export class EmployeeHomeModule { }
