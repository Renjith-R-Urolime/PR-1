import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdjustmentDeductionFormComponent } from './adjustment-deduction-form/adjustment-deduction-form.component';
import { AdjustmentDeductionViewComponent } from './adjustment-deduction-view/adjustment-deduction-view.component';
import { AdjustmentDeductionComponent } from './adjustment-deduction.component';
import { AdjustmentDeductionModule } from './adjustment-deduction.module';

const routes: Routes = [
  {
    path: '',
    component: AdjustmentDeductionComponent,
  },
  {
    path: 'create',
    component: AdjustmentDeductionFormComponent
  },
  {
    path: 'edit/:id',
    component: AdjustmentDeductionFormComponent
  },
  {
    path: 'view/:id',
    component: AdjustmentDeductionViewComponent
  },

]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    AdjustmentDeductionModule
  ],
  declarations: []
})
export class AdjustmentModule { }
