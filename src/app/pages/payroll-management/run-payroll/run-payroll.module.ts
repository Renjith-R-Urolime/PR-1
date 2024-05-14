import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { CreatePayrollComponent } from './create-payroll/create-payroll.component';
import { PayrollSubmitComponent } from './payroll-submit/payroll-submit.component';
import { RunPayrollComponent } from './run-payroll.component';

const routes: Routes = [
  {
    path: '',
    component: RunPayrollComponent,
  },
  {
    path: ':type',
    component: CreatePayrollComponent
  },
  {
    path: 'success/:batchId',
    component: PayrollSubmitComponent
  },
  // {
  //   path: 'payslip/preview/:batchId',
  //   component: PreviewReportComponent
  // },
]

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    InlineSVGModule,
    RouterModule.forChild(routes),
    // NgApexchartsModule,
    // NgxSkeletonLoaderModule
  ],
  declarations: [RunPayrollComponent, CreatePayrollComponent, PayrollSubmitComponent]
})
export class RunPayrollModule { }