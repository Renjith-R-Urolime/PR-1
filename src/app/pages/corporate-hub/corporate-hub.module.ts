import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { InlineSVGModule } from "ng-inline-svg-2";
import { NgToggleModule } from 'ng-toggle-button';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { UiModule } from 'src/app/shared/ui/ui.module';

import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { OrganisationSettingsListComponent } from '../organisation/organisation-settings/organisation-settings-list/organisation-settings-list.component';
import { OrganisationSettingsComponent } from '../organisation/organisation-settings/organisation-settings.component';
import { OrganisationComponent } from '../organisation/organisation.component';
import { PolicyHandbooksFormComponent } from '../organisation/policy-and-handbooks/policy-handbooks-form/policy-handbooks-form.component';
import { PolicyHandbooksViewComponent } from '../organisation/policy-and-handbooks/policy-handbooks-view/policy-handbooks-view.component';



const routes: Routes = [
  {
    path: 'policy-and-handbook/view/:id',
    component: PolicyHandbooksViewComponent
  },
  {
    path: 'policy-and-handbook/create',
    component: PolicyHandbooksFormComponent
  },
  {
    path: 'policy-and-handbook/edit/:id',
    component: PolicyHandbooksFormComponent
  },
  {
    path: 'settings',
    component: OrganisationSettingsComponent
  },
  {
    path: 'settings/:sub',
    component: OrganisationSettingsListComponent
  },
  {
    path: ':sub-menu',
    component: OrganisationComponent,
  },
  {
    path: 'classification',
    loadChildren: () =>
      import('./classifications.module').then((m) => m.ClassificationsModule),

  },
  {
    path: 'company-setting',
    loadChildren: () =>
      import('./company-setting.module').then((m) => m.CompanySettingModule),

  },
  {
    path: 'employee-engagement',
    loadChildren: () =>
      import('./employee-engagement.module').then((m) => m.EmployeeEngagementModule),

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
  declarations: [OrganisationSettingsComponent,OrganisationSettingsListComponent,PolicyHandbooksFormComponent, OrganisationComponent]
})
export class CorporateHubModule { }