import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseTypeComponent } from './expense-type.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ExpenseTypeComponent,
  }

]

@NgModule({
  declarations: [ExpenseTypeComponent],
  imports: [
    CommonModule,
    UiModule,
    InlineSVGModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
})
export class ExpenseTypeModule { }
