import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { PayrollIntermediaryTableDetailComponent } from './payroll-intermediary-table-detail/payroll-intermediary-table-detail.component';
import { PayrollIntermediaryTableComponent } from './payroll-intermediary-table.component';

const routes: Routes = [
  {
    path: '',
    component: PayrollIntermediaryTableComponent,
  },
  {
    path: 'view/:id',
    component: PayrollIntermediaryTableDetailComponent
  },

]

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    InlineSVGModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PayrollIntermediaryTableComponent, PayrollIntermediaryTableDetailComponent]
})
export class PayrollIntermediaryTableModule { }
