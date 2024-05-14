import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [

  {
    path: 'configuration',
    loadChildren: () =>
      import('./setup/setup.module').then((m) => m.SetupModule),
  },
  {
    path: 'loan-and-advance',
    loadChildren: () =>
      import('./advance-salary/advance-salary.module').then((m) => m.AdvanceSalaryModule),
  },
  {
    path: 'adjustment',
    loadChildren: () =>
      import('./adjustment-deduction/adjustment.module').then((m) => m.AdjustmentModule),
  },
  {
    path: 'deduction',
    loadChildren: () =>
      import('./adjustment-deduction/deduction.module').then((m) => m.DeductionModule),
  },
  {
    path: 'overtime',
    loadChildren: () =>
      import('./overtime-transaction/overtime-transaction.module').then((m) => m.OvertimeTransactionModule),
  },
  {
    path: 'reimbursement',
    loadChildren: () =>
      import('./reimbursement/reimbursement.module').then((m) => m.ReimbursementModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./payroll-settings/payroll-settings.module').then((m) => m.PayrollSettingsModule),
  },
  {
    path: 'run',
    loadChildren: () =>
      import('./run-payroll/run-payroll.module').then((m) => m.RunPayrollModule),
  },
  {
    path: 'intermediary-table',
    loadChildren: () =>
      import('./payroll-settings/payroll-intermediary-table/payroll-intermediary-table.module' ).then((m) => m.PayrollIntermediaryTableModule),
  },
  {
    path: 'time-off-adjustment',
    loadChildren: () =>
      import('./time-off-adjustment/time-off-adjustment.module').then((m) => m.TimeOffAdjustmentModule),
  },
]
@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  declarations: []
})
export class PayrollManagementModule { }
