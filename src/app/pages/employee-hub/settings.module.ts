import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbDatepickerModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ModalsModule } from 'src/app/_metronic/partials';
import { ModuleSettingsComponent } from 'src/app/shared/ui/module-settings/module-settings.component';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { EmployeeLeavePlanDetailsComponent } from '../employee/employee-leave-plan/employee-leave-plan-details/employee-leave-plan-details.component';
import { EmployeeLeavePlanFormComponent } from '../employee/employee-leave-plan/employee-leave-plan-form/employee-leave-plan-form.component';
import { EmployeeLeavePlanComponent } from '../employee/employee-leave-plan/employee-leave-plan.component';
import { EmployeeSettingsListComponent } from '../employee/employee-settings/employee-settings-list/employee-settings-list.component';
import { PayStructureFormComponent } from '../employee/pay-structure/pay-structure-form/pay-structure-form.component';
import { PayStructureViewComponent } from '../employee/pay-structure/pay-structure-view/pay-structure-view.component';
import { PayStructureComponent } from '../employee/pay-structure/pay-structure.component';


const routes: Routes = [
  {
    path: '',
    component: ModuleSettingsComponent,
  },
  {
    path: 'pay-structure',
    component: PayStructureComponent,
  },
  {
    path: 'pay-structure/create',
    component: PayStructureFormComponent,
  },
  {
    path: 'pay-structure/edit/:id',
    component: PayStructureFormComponent,
  },
  {
    path: 'pay-structure/view/:id',
    component: PayStructureViewComponent,
  },
  {
    path: 'employee-leave-plan',
    component: EmployeeLeavePlanComponent,
  },
  {
    path: 'employee-leave-plan/create',
    component: EmployeeLeavePlanFormComponent,
  },
  {
    path: 'employee-leave-plan/edit/:id',
    component: EmployeeLeavePlanFormComponent,
  },
  {
    path: 'employee-leave-plan/view/:id',
    component: EmployeeLeavePlanDetailsComponent,
  },
  {
    path: ':sub',
    component: EmployeeSettingsListComponent,
  }
]

@NgModule({
  declarations: [
    EmployeeSettingsListComponent,EmployeeLeavePlanDetailsComponent,EmployeeLeavePlanFormComponent,EmployeeLeavePlanComponent,PayStructureViewComponent,PayStructureFormComponent,PayStructureComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    RouterModule.forChild(routes),
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    NgbToastModule,
    ReactiveFormsModule,
    ModalsModule,
    NgbDatepickerModule,
  ]
})
export class EmployeeSettingsModule { }
