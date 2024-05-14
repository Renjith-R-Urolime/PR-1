import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import {
  NgbDatepickerModule,
  NgbToastModule,
} from "@ng-bootstrap/ng-bootstrap";
import { NgApexchartsModule } from "ng-apexcharts";
import { InlineSVGModule } from "ng-inline-svg-2";
import { ModalsModule } from "src/app/_metronic/partials";
import { UiModule } from "src/app/shared/ui/ui.module";
import { GrievanceViewComponent } from "../employee/grievance/grievance-view/grievance-view.component";
import { GrievanceComponent } from "../employee/grievance/grievance.component";
import { WarningsViewComponent } from "../employee/warnings/warnings-view/warnings-view.component";
import { WarningsComponent } from "../employee/warnings/warnings.component";

const routes: Routes = [
  {
    path: "warnings",
    component: WarningsComponent,
  },
  {
    path: "warnings/view/:id",
    component: WarningsViewComponent,
  },
  {
    path: "grievance",
    component: GrievanceComponent,
  },
  {
    path: "grievance/view/:id",
    component: GrievanceViewComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    NgApexchartsModule,
    InlineSVGModule,
    RouterModule.forChild(routes),
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    NgbToastModule,
    ReactiveFormsModule,
    ModalsModule,
    NgbDatepickerModule,
  ],
  declarations: [
    WarningsComponent,
    WarningsViewComponent,
    GrievanceComponent,
    GrievanceViewComponent,
  ],
})
export class ConcernPortalModule {}
