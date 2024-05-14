import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from "ng-inline-svg-2";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { UiModule } from 'src/app/shared/ui/ui.module';

const routes: Routes = [
  {
    path: 'cycle',
    loadChildren: () =>
      import('./payroll-cycle/payroll-cycle.module').then((m) => m.PayrollCycleModule),
  },
  {
    path: 'component',
    loadChildren: () =>
      import('./payroll-component/payroll-component.module').then((m) => m.PayrollComponentModule),
  },
  {
    path: 'contribution',
    loadChildren: () =>
      import('./contribution-master/contribution-master.module').then((m) => m.ContributionMasterModule),
  },
  {
    path: 'contract',
    loadChildren: () =>
      import('./contract-master/contract-master.module').then((m) => m.ContractMasterModule),
  },
  {
    path: 'overtime-setup',
    loadChildren: () =>
      import('./overtime-setup/overtime-setup.module').then((m) => m.OvertimeSetupModule),
  },
]
@NgModule({
  imports: [
    CommonModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgxSkeletonLoaderModule,
    RouterModule.forChild(routes),
    NgbPaginationModule
  ],
  declarations: []
})
export class SetupModule { }
