import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { PayrollComponentFormComponent } from './payroll-component-form/payroll-component-form.component';
import { PayrollComponentViewComponent } from './payroll-component-view/payroll-component-view.component';
import { PayrollComponentComponent } from './payroll-component.component';

const routes: Routes = [
  {
    path: '',
    component: PayrollComponentComponent,
  },
  {
    path: 'create',
    component: PayrollComponentFormComponent
  },
  {
    path: 'edit/:id',
    component: PayrollComponentFormComponent
  },
  {
    path: 'view/:id',
    component: PayrollComponentViewComponent
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
  declarations: [PayrollComponentComponent, PayrollComponentFormComponent, PayrollComponentViewComponent]
})
export class PayrollComponentModule { }
