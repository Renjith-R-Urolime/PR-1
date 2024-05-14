import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { PayrollCycleFormComponent } from './payroll-cycle-form/payroll-cycle-form.component';
import { PayrollCycleViewComponent } from './payroll-cycle-view/payroll-cycle-view.component';
import { PayrollCycleComponent } from './payroll-cycle.component';

const routes: Routes = [
  {
    path: '',
    component: PayrollCycleComponent,
  },
  {
    path: 'create',
    component: PayrollCycleFormComponent
  },
  {
    path: 'edit/:id',
    component: PayrollCycleFormComponent
  },
  {
    path: 'view/:id',
    component: PayrollCycleViewComponent
  },

]

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    InlineSVGModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PayrollCycleComponent, PayrollCycleFormComponent, PayrollCycleViewComponent]
})
export class PayrollCycleModule { }
