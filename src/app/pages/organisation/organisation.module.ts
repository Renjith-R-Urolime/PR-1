import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { InlineSVGModule } from "ng-inline-svg-2";
import { NgToggleModule } from 'ng-toggle-button';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { AnnouncementFormComponent } from './announcement/announcement-form/announcement-form.component';
import { AnnouncementViewComponent } from './announcement/announcement-view/announcement-view.component';
import { ClassFormComponent } from './class/class-form/class-form.component';
import { ClassViewComponent } from './class/class-view/class-view.component';
import { DepartmentFormComponent } from './department/department-form/department-form.component';
import { DepartmentViewComponent } from './department/department-view/department-view.component';
import { DocumentViewerComponent } from './document-viewer/document-viewer.component';
import { EmployerBankDetailsFormComponent } from './employer-bank-details/employer-bank-details-form/employer-bank-details-form.component';
import { EmployerBankDetailsViewComponent } from './employer-bank-details/employer-bank-details-view/employer-bank-details-view.component';
import { JurisdictionDetailComponent } from './jurisdiction/jurisdiction-detail/jurisdiction-detail.component';
import { JurisdictionFormComponent } from './jurisdiction/jurisdiction-form/jurisdiction-form.component';
import { LocationFormComponent } from './location/location-form/location-form.component';
import { LocationViewComponent } from './location/location-view/location-view.component';
import { OrganisationSettingsListComponent } from './organisation-settings/organisation-settings-list/organisation-settings-list.component';
import { OrganisationSettingsComponent } from './organisation-settings/organisation-settings.component';
import { OrganisationComponent } from './organisation.component';
import { PolicyHandbooksFormComponent } from './policy-and-handbooks/policy-handbooks-form/policy-handbooks-form.component';
import { PolicyHandbooksViewComponent } from './policy-and-handbooks/policy-handbooks-view/policy-handbooks-view.component';
import { PollsSurveysFormComponent } from './polls-surveys/polls-surveys-form/polls-surveys-form.component';
import { PollsSurveysViewComponent } from './polls-surveys/polls-surveys-view/polls-surveys-view.component';
import { SubsidiaryDetailComponent } from './subsidiary/subsidiary-detail/subsidiary-detail.component';
import { SubsidiaryFormComponent } from './subsidiary/subsidiary-form/subsidiary-form.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';


const routes: Routes = [
  {
    path: 'subsidiary/view/:id',
    component: SubsidiaryDetailComponent
  },
  {
    path: 'subsidiary/create',
    component: SubsidiaryFormComponent
  },
  {
    path: 'subsidiary/edit/:id',
    component: SubsidiaryFormComponent
  },
  {
    path: 'jurisdiction/view/:id',
    component: JurisdictionDetailComponent,
  },
  {
    path: 'jurisdiction/create',
    component: JurisdictionFormComponent
  },
  {
    path: 'jurisdiction/edit/:id',
    component: JurisdictionFormComponent
  },

  {
    path: 'location/view/:id',
    component: LocationViewComponent,
  },
  {
    path: 'location/create',
    component: LocationFormComponent
  },
  {
    path: 'location/edit/:id',
    component: LocationFormComponent
  },


  {
    path: 'class/view/:id',
    component: ClassViewComponent,
  },
  {
    path: 'class/create',
    component: ClassFormComponent
  },
  {
    path: 'class/edit/:id',
    component: ClassFormComponent
  },
  {
    path: 'department/view/:id',
    component: DepartmentViewComponent,
  },

  {
    path: 'department/create',
    component: DepartmentFormComponent
  },
  {
    path: 'department/edit/:id',
    component: DepartmentFormComponent
  },
  {
    path: 'polls-and-survey/view/:id',
    component: PollsSurveysViewComponent,
  },
  {
    path: 'polls-and-survey/new',
    component: PollsSurveysFormComponent
  },
  {
    path: 'polls-and-survey/edit/:id',
    component: PollsSurveysFormComponent
  },
  {
    path: 'employer-bank-details/view/:id',
    component: EmployerBankDetailsViewComponent
  },
  {
    path: 'employer-bank-details/create',
    component: EmployerBankDetailsFormComponent
  },
  {
    path: 'employer-bank-details/edit/:id',
    component: EmployerBankDetailsFormComponent
  },
  {
    path: 'policy-handbook/view/:id',
    component: PolicyHandbooksViewComponent
  },
  {
    path: 'policy-handbook/create',
    component: PolicyHandbooksFormComponent
  },
  {
    path: 'policy-handbook/edit/:id',
    component: PolicyHandbooksFormComponent
  },
  {
    path: 'announcement/create',
    component: AnnouncementFormComponent
  },
  {
    path: 'announcement/edit/:id',
    component: AnnouncementFormComponent
  },
  {
    path: 'announcement/view/:id',
    component: AnnouncementViewComponent
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
    NgApexchartsModule
  ],

  declarations: [SubsidiaryDetailComponent,ClassFormComponent, JurisdictionDetailComponent, DepartmentViewComponent, LocationViewComponent, OrganisationComponent, ClassViewComponent, EmployerBankDetailsViewComponent, PollsSurveysViewComponent, AnnouncementViewComponent, PolicyHandbooksViewComponent, DocumentViewerComponent, SubsidiaryFormComponent, EmployerBankDetailsFormComponent, AnnouncementFormComponent, PollsSurveysFormComponent, PolicyHandbooksFormComponent, JurisdictionFormComponent, LocationFormComponent, DepartmentFormComponent,OrganisationSettingsComponent, OrganisationSettingsListComponent]
})
export class OrganisationModule { }