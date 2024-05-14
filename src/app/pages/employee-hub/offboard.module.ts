import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { EmployeeExitFormComponent } from '../employee/employee-offboard/employee-exit/employee-exit-form/employee-exit-form.component';
import { EmployeeExitViewComponent } from '../employee/employee-offboard/employee-exit/employee-exit-view/employee-exit-view.component';
import { EmployeeExitComponent } from '../employee/employee-offboard/employee-exit/employee-exit.component';
import { EosRequestFormComponent } from '../employee/employee-offboard/eos-request/eos-request-form/eos-request-form.component';
import { EosRequestViewComponent } from '../employee/employee-offboard/eos-request/eos-request-view/eos-request-view.component';
import { EosRequestComponent } from '../employee/employee-offboard/eos-request/eos-request.component';
const routes: Routes = [
  {
    path: 'eos-request',
    component: EosRequestComponent,
  },
  {
    path: 'eos-request/create',
    component: EosRequestFormComponent,
  },
  {
    path: 'eos-request/view/:id',
    component: EosRequestViewComponent,
  },
  {
    path: 'eos-request/edit/:id',
    component: EosRequestFormComponent,
  },
  {
    path: 'employee-exit',
    component: EmployeeExitComponent,
  },
  {
    path: 'employee-exit/create',
    component: EmployeeExitFormComponent,
  },
  {
    path: 'employee-exit/view/:id',
    component: EmployeeExitViewComponent,
  },
  {
    path: 'employee-exit/edit/:id',
    component: EmployeeExitFormComponent,
  }
  ]

@NgModule({
  declarations: [
    EosRequestComponent,EosRequestFormComponent,EosRequestViewComponent, EmployeeExitComponent, EmployeeExitFormComponent, EmployeeExitViewComponent

  ],
  imports: [

    UiModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgbDatepickerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmployeeOffboardModule { }
