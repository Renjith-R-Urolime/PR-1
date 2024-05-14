import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ModuleSettingsComponent } from 'src/app/shared/ui/module-settings/module-settings.component';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { LeaveAdjustmentDetailComponent } from './leave-adjustment/leave-adjustment-detail/leave-adjustment-detail.component';
import { LeaveAdjustmentFormComponent } from './leave-adjustment/leave-adjustment-form/leave-adjustment-form.component';
import { LeaveAdjustmentComponent } from './leave-adjustment/leave-adjustment.component';
import { LeaveApplicationFormComponent } from './leave-application/leave-application-form/leave-application-form.component';
import { LeaveApplicationViewComponent } from './leave-application/leave-application-view/leave-application-view.component';
import { LeaveApplicationComponent } from './leave-application/leave-application.component';
import { LeaveResumptionDetailComponent } from './leave-resumption/leave-resumption-detail/leave-resumption-detail.component';
import { LeaveResumptionFormComponent } from './leave-resumption/leave-resumption-form/leave-resumption-form.component';
import { LeaveResumptionComponent } from './leave-resumption/leave-resumption.component';
import { LeaveSettingsComponent } from './leave-settings/leave-settings.component';
import { LeaveSetupFormComponent } from './leave-setup/leave-setup-form/leave-setup-form.component';
import { LeaveSetupViewComponent } from './leave-setup/leave-setup-view/leave-setup-view.component';
import { LeaveSetupComponent } from './leave-setup/leave-setup.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

const routes: Routes = [
  {
    path: 'configuration',
    component: LeaveSetupComponent
  },
  {
    path: 'configuration/create',
    component: LeaveSetupFormComponent
  },
  {
    path: 'configuration/add-leave-type/:id',
    component: LeaveSetupFormComponent
  },
  {
    path: 'configuration/edit/:id',
    component: LeaveSetupFormComponent
  },
  {
    path: 'configuration/view/:id',
    component: LeaveSetupViewComponent
  },
  {
    path: 'adjustment',
    component: LeaveAdjustmentComponent
  },
  {
    path: 'adjustment/create',
    component: LeaveAdjustmentFormComponent
  },
  {
    path: 'adjustment/edit/:id',
    component: LeaveAdjustmentFormComponent
  },
  {
    path: 'adjustment/view/:id',
    component: LeaveAdjustmentDetailComponent
  },
  {
    path: 'resumption',
    component: LeaveResumptionComponent
  },
  {
    path: 'resumption/create',
    component: LeaveResumptionFormComponent
  },
  {
    path: 'resumption/view/:id',
    component: LeaveResumptionDetailComponent
  },
  {
    path: 'resumption/edit/:id',
    component: LeaveResumptionFormComponent
  },
  {
    path: 'leave-application',
    component: LeaveApplicationComponent
  },
  {
    path: 'leave-application/create',
    component: LeaveApplicationFormComponent
  },
  {
    path: 'leave-application/edit/:id',
    component: LeaveApplicationFormComponent
  },
  {
    path: 'leave-application/view/:id',
    component: LeaveApplicationViewComponent
  },
  {
    path: 'settings',
    component: ModuleSettingsComponent
  },
  {
    path: 'settings/:sub',
    component: LeaveSettingsComponent,
  }
]
@NgModule({
  imports: [
    NgApexchartsModule,
    CommonModule,
    UiModule,
    FormsModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
    InlineSVGModule,
    RouterModule.forChild(routes),
    NgxSkeletonLoaderModule
  ],
  declarations: [LeaveSetupFormComponent, LeaveSetupComponent, LeaveSetupViewComponent,LeaveAdjustmentComponent, LeaveAdjustmentDetailComponent, LeaveAdjustmentFormComponent,LeaveResumptionComponent, LeaveResumptionDetailComponent, LeaveResumptionFormComponent,LeaveSettingsComponent,LeaveApplicationComponent,LeaveApplicationFormComponent,LeaveApplicationViewComponent]

})
export class LeaveManagementModule { }
