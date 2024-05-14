import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { UiModule } from "src/app/shared/ui/ui.module";
import { ManageBankDetailsFormComponent } from "../employee/manage-employee/manage-bank-details/manage-bank-details-form/manage-bank-details-form.component";
import { ManageBankDetailsViewComponent } from "../employee/manage-employee/manage-bank-details/manage-bank-details-view/manage-bank-details-view.component";
import { ManageBankDetailsComponent } from "../employee/manage-employee/manage-bank-details/manage-bank-details.component";
import { ManageClassificationFormComponent } from "../employee/manage-employee/manage-classification/manage-classification-form/manage-classification-form.component";
import { ManageClassificationViewComponent } from "../employee/manage-employee/manage-classification/manage-classification-view/manage-classification-view.component";
import { ManageClassificationComponent } from "../employee/manage-employee/manage-classification/manage-classification.component";
import { ManageEmployeeViewComponent } from "../employee/manage-employee/manage-employee/manage-employee-view/manage-employee-view.component";
import { ManageEmployeeComponent } from "../employee/manage-employee/manage-employee/manage-employee.component";
import { ManageSalaryFormComponent } from "../employee/manage-employee/manage-salary/manage-salary-form/manage-salary-form.component";
import { ManageSalaryViewComponent } from "../employee/manage-employee/manage-salary/manage-salary-view/manage-salary-view.component";
import { ManageSalaryComponent } from "../employee/manage-employee/manage-salary/manage-salary.component";
import { ManageShiftFormComponent } from "../employee/manage-employee/manage-shift/manage-shift-form/manage-shift-form.component";
import { ManageShiftViewComponent } from "../employee/manage-employee/manage-shift/manage-shift-view/manage-shift-view.component";
import { ManageShiftComponent } from "../employee/manage-employee/manage-shift/manage-shift.component";
import { ManageSubsidiaryViewComponent } from "../employee/manage-employee/manage-subsidiary/manage-subsidiary-view/manage-subsidiary-view.component";
import { ManageSubsidiaryComponent } from "../employee/manage-employee/manage-subsidiary/manage-subsidiary.component";

const routes: Routes = [
  {
    path: "employee",
    component: ManageEmployeeComponent,
  },
  {
    path: "employee/view/:id",
    component: ManageEmployeeViewComponent,
  },
  {
    path: "subsidiary",
    component: ManageSubsidiaryComponent,
  },
  {
    path: "subsidiary/view/:id",
    component: ManageSubsidiaryViewComponent,
  },
  {
    path: "salary",
    component: ManageSalaryComponent,
  },
  {
    path: "salary/view/:id",
    component: ManageSalaryViewComponent,
  },
  {
    path: "salary/create",
    component: ManageSalaryFormComponent,
  },
  {
    path: "salary/edit/:id",
    component: ManageSalaryFormComponent,
  },
  {
    path: "bank-details",
    component: ManageBankDetailsComponent,
  },
  {
    path: "bank-details/view/:id",
    component: ManageBankDetailsViewComponent,
  },
  {
    path: "bank-details/add",
    component: ManageBankDetailsFormComponent,
  },
  {
    path: "bank-details/edit/:id",
    component: ManageBankDetailsFormComponent,
  },
  {
    path: "classification",
    component: ManageClassificationComponent,
  },
  {
    path: "classification/view/:id",
    component: ManageClassificationViewComponent,
  },
  {
    path: "classification/create",
    component: ManageClassificationFormComponent,
  },
  {
    path: "classification/edit/:id",
    component: ManageClassificationFormComponent,
  },
  {
    path: "shift",
    component: ManageShiftComponent,
  },
  {
    path: "shift/view/:id",
    component: ManageShiftViewComponent,
  },
  {
    path: "shift/create",
    component: ManageShiftFormComponent,
  },
  {
    path: "shift/edit/:id",
    component: ManageShiftFormComponent,
  },
];

@NgModule({
  declarations: [
    ManageEmployeeComponent,
    ManageEmployeeViewComponent,
    ManageSalaryComponent,
    ManageSalaryViewComponent,
    ManageSubsidiaryComponent,
    ManageSubsidiaryViewComponent,

    ManageBankDetailsComponent,
    ManageBankDetailsViewComponent,
    ManageBankDetailsFormComponent,
    ManageSalaryFormComponent,
    ManageClassificationComponent,
    ManageClassificationFormComponent,
    ManageClassificationViewComponent,
    ManageShiftComponent,
    ManageShiftFormComponent,
    ManageShiftViewComponent,
  ],
  imports: [
    UiModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgbDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ManageEmployeeModule {}
