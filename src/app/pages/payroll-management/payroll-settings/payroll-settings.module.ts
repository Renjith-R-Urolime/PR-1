import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { PayrollSettingsComponent } from './payroll-settings.component';

const routes: Routes = [
  {
    path: '',
    component: PayrollSettingsComponent,
  },
  {
    path: 'contribution-summary',
    loadChildren: () =>
      import('./contribution-summary/contribution-summary.module').then((m) => m.ContributionSummaryModule),
  },
  {
    path: 'employee-ot-matrix',
    loadChildren: () =>
      import('./employee-ot-matrix/employee-ot-matrix.module').then((m) => m.EmployeeOtMatrixModule),
  },
  {
    path: 'intermediary-table',
    loadChildren: () =>
      import('./payroll-intermediary-table/payroll-intermediary-table.module').then((m) => m.PayrollIntermediaryTableModule),
  },
  {
    path: 'eos-sub-type',
    loadChildren: () =>
      import('./eos-sub-type/eos-sub-type.module').then((m) => m.EosSubTypeModule),
  },
  {
    path: 'component-mapping',
    loadChildren: () =>
      import('./component-mapping/component-mapping.module').then((m) => m.ComponentMappingModule),
  },
  {
    path: 'expense-type',
    loadChildren: () =>
      import('./expense-type/expense-type.module').then((m) => m.ExpenseTypeModule),
  },

]

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    InlineSVGModule,
    RouterModule.forChild(routes),
  ],
  declarations: [PayrollSettingsComponent]
})
export class PayrollSettingsModule { }
