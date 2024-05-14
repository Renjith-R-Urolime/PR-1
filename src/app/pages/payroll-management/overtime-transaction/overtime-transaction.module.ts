import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { OvertimeTransactionDetailComponent } from './overtime-transaction-detail/overtime-transaction-detail.component';
import { OvertimeTransactionFormComponent } from './overtime-transaction-form/overtime-transaction-form.component';
import { OvertimeTransactionComponent } from './overtime-transaction.component';

const routes: Routes = [
  {
    path: '',
    component: OvertimeTransactionComponent,
  },
  {
    path: 'create',
    component: OvertimeTransactionFormComponent
  },
  {
    path: 'edit/:id',
    component: OvertimeTransactionFormComponent
  },
  {
    path: 'view/:id',
    component: OvertimeTransactionDetailComponent
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
  declarations: [OvertimeTransactionComponent, OvertimeTransactionFormComponent, OvertimeTransactionDetailComponent]
})
export class OvertimeTransactionModule { }
