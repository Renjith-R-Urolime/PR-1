import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { AdjustmentDeductionFormComponent } from './adjustment-deduction/adjustment-deduction-form/adjustment-deduction-form.component';
import { AdjustmentDeductionViewComponent } from './adjustment-deduction/adjustment-deduction-view/adjustment-deduction-view.component';
import { AdjustmentDeductionComponent } from './adjustment-deduction/adjustment-deduction.component';
import { AdvanceSalaryFormComponent } from './advance-salary/advance-salary-form/advance-salary-form.component';
import { AdvanceSalaryViewComponent } from './advance-salary/advance-salary-view/advance-salary-view.component';
import { AdvanceSalaryComponent } from './advance-salary/advance-salary.component';
import { OvertimeTransactionDetailComponent } from './overtime-transaction/overtime-transaction-detail/overtime-transaction-detail.component';
import { OvertimeTransactionFormComponent } from './overtime-transaction/overtime-transaction-form/overtime-transaction-form.component';
import { OvertimeTransactionComponent } from './overtime-transaction/overtime-transaction.component';
import { ComponentMappingFormComponent } from './payroll-settings/component-mapping/component-mapping-form/component-mapping-form.component';
import { ComponentMappingViewComponent } from './payroll-settings/component-mapping/component-mapping-view/component-mapping-view.component';
import { ComponentMappingComponent } from './payroll-settings/component-mapping/component-mapping.component';
import { ContributionSummaryDetailComponent } from './payroll-settings/contribution-summary/contribution-summary-detail/contribution-summary-detail.component';
import { ContributionSummaryComponent } from './payroll-settings/contribution-summary/contribution-summary.component';
import { EmployeeOtMatrixFormComponent } from './payroll-settings/employee-ot-matrix/employee-ot-matrix-form/employee-ot-matrix-form.component';
import { EmployeeOtMatrixViewComponent } from './payroll-settings/employee-ot-matrix/employee-ot-matrix-view/employee-ot-matrix-view.component';
import { EmployeeOtMatrixComponent } from './payroll-settings/employee-ot-matrix/employee-ot-matrix.component';
import { EosSubTypeComponent } from './payroll-settings/eos-sub-type/eos-sub-type.component';
import { PayrollIntermediaryTableDetailComponent } from './payroll-settings/payroll-intermediary-table/payroll-intermediary-table-detail/payroll-intermediary-table-detail.component';
import { PayrollIntermediaryTableComponent } from './payroll-settings/payroll-intermediary-table/payroll-intermediary-table.component';
import { PayrollSettingsComponent } from './payroll-settings/payroll-settings.component';
import { CreatePayrollComponent } from './run-payroll/create-payroll/create-payroll.component';
import { PayrollSubmitComponent } from './run-payroll/payroll-submit/payroll-submit.component';
import { PreviewReportComponent } from './run-payroll/preview-report/preview-report.component';
import { RunPayrollComponent } from './run-payroll/run-payroll.component';
import { TimeOffAdjustmentFormComponent } from './time-off-adjustment/time-off-adjustment-form/time-off-adjustment-form.component';
import { TimeOffAdjustmentComponent } from './time-off-adjustment/time-off-adjustment.component';
import { TimeoffAdjustmentViewComponent } from './time-off-adjustment/timeoff-adjustment-view/timeoff-adjustment-view.component';
const routes: Routes = [
  {
    path: 'salary-advance',
    component: AdvanceSalaryComponent
  },
  {
    path: 'salary-advance/create',
    component: AdvanceSalaryFormComponent
  },
  {
    path: 'salary-advance/edit/:id',
    component: AdvanceSalaryFormComponent
  },
  {
    path: 'salary-advance/view/:id',
    component: AdvanceSalaryViewComponent
  },
  {
    path: 'adjustment',
    component: AdjustmentDeductionComponent
  },
  {
    path: 'adjustment/create',
    component: AdjustmentDeductionFormComponent
  },
  {
    path: 'adjustment/edit/:id',
    component: AdjustmentDeductionFormComponent
  },
  {
    path: 'adjustment/view/:id',
    component: AdjustmentDeductionViewComponent
  },
  {
    path: 'deduction',
    component: AdjustmentDeductionComponent
  },
  {
    path: 'deduction/create',
    component: AdjustmentDeductionFormComponent
  },
  {
    path: 'deduction/edit/:id',
    component: AdjustmentDeductionFormComponent
  },
  {
    path: 'deduction/view/:id',
    component: AdjustmentDeductionViewComponent
  },
  {
    path: 'time-off-adjustment/create',
    component: TimeOffAdjustmentFormComponent
  },
  {
    path: 'time-off-adjustment/edit/:id',
    component: TimeOffAdjustmentFormComponent
  },
  {
    path: 'time-off-adjustment/view/:id',
    component: TimeoffAdjustmentViewComponent
  },
  {
    path: 'time-off-adjustment',
    component: TimeOffAdjustmentComponent
  },
  {
    path: 'setup',
    loadChildren: () =>
      import('./setup/setup.module').then((m) => m.SetupModule),
  },
  {
    path: 'run-payroll',
    component: RunPayrollComponent
  },
  {
    path: 'run-payroll/:type',
    component: CreatePayrollComponent
  },
  {
    path: 'payroll-success/:batchId',
    component: PayrollSubmitComponent
  },
  {
    path: 'payslip-preview/:batchId',
    component: PreviewReportComponent
  },
  {
    path: 'overtime',
    component: OvertimeTransactionComponent
  },
  {
    path: 'overtime/create',
    component: OvertimeTransactionFormComponent
  },
  {
    path: 'overtime/view/:id',
    component: OvertimeTransactionDetailComponent
  },
  {
    path: 'overtime/edit/:id',
    component: OvertimeTransactionFormComponent
  },
  {
    path: 'run-payroll/edit',
    component: RunPayrollComponent
  },
  {
    path: 'settings',
    component: PayrollSettingsComponent
  },
  {
    path: 'settings/component-mapping',
    component: ComponentMappingComponent
  },
  {
    path: 'settings/component-mapping/create',
    component: ComponentMappingFormComponent
  },
  {
    path: 'settings/component-mapping/edit/:id',
    component: ComponentMappingFormComponent
  },
  {
    path: 'settings/component-mapping/view/:id',
    component: ComponentMappingViewComponent
  },
  {
    path: 'settings/eos-sub-type',
    component: EosSubTypeComponent
  },
  {
    path: 'settings/contribution-summary',
    component: ContributionSummaryComponent
  },
  {
    path: 'settings/contribution-summary/view/:id',
    component: ContributionSummaryDetailComponent
  },
  {
    path: 'settings/employee-ot-matrix',
    component: EmployeeOtMatrixComponent
  },
  {
    path: 'settings/employee-ot-matrix/create',
    component: EmployeeOtMatrixFormComponent
  },
  {
    path: 'settings/employee-ot-matrix/edit/:id',
    component: EmployeeOtMatrixFormComponent
  },
  {
    path: 'settings/employee-ot-matrix/view/:id',
    component: EmployeeOtMatrixViewComponent
  },
  {
    path: 'intermediary-table',
    component: PayrollIntermediaryTableComponent
  },
  {
    path: 'intermediary-table/view/:id',
    component: PayrollIntermediaryTableDetailComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    UiModule,
    InlineSVGModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    NgxExtendedPdfViewerModule,
    NgxSkeletonLoaderModule
  ],
  declarations: [TimeOffAdjustmentComponent,TimeoffAdjustmentViewComponent,RunPayrollComponent, AdvanceSalaryComponent, AdvanceSalaryFormComponent, AdvanceSalaryViewComponent, PayrollSettingsComponent, ContributionSummaryComponent, ContributionSummaryDetailComponent, OvertimeTransactionComponent, OvertimeTransactionDetailComponent, OvertimeTransactionFormComponent,AdjustmentDeductionFormComponent, AdjustmentDeductionViewComponent, AdjustmentDeductionComponent,TimeOffAdjustmentFormComponent, PayrollIntermediaryTableComponent, PayrollIntermediaryTableDetailComponent, ComponentMappingComponent,ComponentMappingFormComponent,ComponentMappingViewComponent, CreatePayrollComponent, PayrollSubmitComponent,PreviewReportComponent, EmployeeOtMatrixComponent, EmployeeOtMatrixFormComponent, EmployeeOtMatrixViewComponent, EosSubTypeComponent]
})
export class PayrollManagementModule { }
