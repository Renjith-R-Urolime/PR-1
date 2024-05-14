import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { InlineSVGModule } from "ng-inline-svg-2";
import { NgToggleModule } from "ng-toggle-button";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { UiModule } from "src/app/shared/ui/ui.module";
import { EmployerBankDetailsFormComponent } from "../organisation/employer-bank-details/employer-bank-details-form/employer-bank-details-form.component";
import { EmployerBankDetailsViewComponent } from "../organisation/employer-bank-details/employer-bank-details-view/employer-bank-details-view.component";
import { OrganisationComponent } from "../organisation/organisation.component";

const routes: Routes = [
  {
    path: "employer-bank-details/view/:id",
    component: EmployerBankDetailsViewComponent,
  },
  {
    path: "employer-bank-details/create",
    component: EmployerBankDetailsFormComponent,
  },
  {
    path: "employer-bank-details/edit/:id",
    component: EmployerBankDetailsFormComponent,
  },
  {
    path: ":sub-menu",
    component: OrganisationComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxSkeletonLoaderModule,
    InlineSVGModule,
    NgToggleModule,
    NgbDatepickerModule,
  ],

  declarations: [
    EmployerBankDetailsViewComponent,
    EmployerBankDetailsFormComponent,
  ],
})
export class CompanySettingModule {}
