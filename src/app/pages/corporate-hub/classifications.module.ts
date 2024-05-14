import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from "ng-inline-svg-2";
import { NgToggleModule } from 'ng-toggle-button';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { ClassFormComponent } from '../organisation/class/class-form/class-form.component';
import { ClassViewComponent } from '../organisation/class/class-view/class-view.component';
import { DepartmentFormComponent } from '../organisation/department/department-form/department-form.component';
import { DepartmentViewComponent } from '../organisation/department/department-view/department-view.component';
import { JurisdictionDetailComponent } from '../organisation/jurisdiction/jurisdiction-detail/jurisdiction-detail.component';
import { JurisdictionFormComponent } from '../organisation/jurisdiction/jurisdiction-form/jurisdiction-form.component';
import { LocationFormComponent } from '../organisation/location/location-form/location-form.component';
import { LocationViewComponent } from '../organisation/location/location-view/location-view.component';
import { OrganisationComponent } from '../organisation/organisation.component';
import { SubsidiaryDetailComponent } from '../organisation/subsidiary/subsidiary-detail/subsidiary-detail.component';
import { SubsidiaryFormComponent } from '../organisation/subsidiary/subsidiary-form/subsidiary-form.component';



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
    path: 'business-verticals/create',
    component: ClassFormComponent
  },
  {
    path: 'business-verticals/view/:id',
    component: ClassViewComponent,
  },

  {
    path: 'business-verticals/edit/:id',
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
  ],

  declarations: [SubsidiaryDetailComponent,ClassFormComponent, JurisdictionDetailComponent, LocationViewComponent, ClassViewComponent, SubsidiaryFormComponent, JurisdictionFormComponent, LocationFormComponent, DepartmentViewComponent,DepartmentFormComponent]
})
export class ClassificationsModule { }