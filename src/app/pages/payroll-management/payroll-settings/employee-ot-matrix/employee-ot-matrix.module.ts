import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { EmployeeOtMatrixFormComponent } from './employee-ot-matrix-form/employee-ot-matrix-form.component';
import { EmployeeOtMatrixViewComponent } from './employee-ot-matrix-view/employee-ot-matrix-view.component';
import { EmployeeOtMatrixComponent } from './employee-ot-matrix.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeOtMatrixComponent,
  },
  {
    path: 'create',
    component: EmployeeOtMatrixFormComponent
  },
  {
    path: 'edit/:id',
    component: EmployeeOtMatrixFormComponent
  },
  {
    path: 'view/:id',
    component: EmployeeOtMatrixViewComponent
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
  declarations: [EmployeeOtMatrixComponent, EmployeeOtMatrixFormComponent, EmployeeOtMatrixViewComponent]
})
export class EmployeeOtMatrixModule { }
