import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from "ng-inline-svg-2";
import { NgToggleModule } from 'ng-toggle-button';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { AnnouncementFormComponent } from '../organisation/announcement/announcement-form/announcement-form.component';
import { AnnouncementViewComponent } from '../organisation/announcement/announcement-view/announcement-view.component';
import { OrganisationComponent } from '../organisation/organisation.component';
import { PollsSurveysFormComponent } from '../organisation/polls-surveys/polls-surveys-form/polls-surveys-form.component';
import { PollsSurveysViewComponent } from '../organisation/polls-surveys/polls-surveys-view/polls-surveys-view.component';




const routes: Routes = [
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
    path: 'announcements/create',
    component: AnnouncementFormComponent
  },
  {
    path: 'announcements/view/:id',
    component: AnnouncementViewComponent
  },
  {
    path: 'announcements/edit/:id',
    component: AnnouncementFormComponent
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

  declarations: [PollsSurveysViewComponent,PollsSurveysFormComponent, AnnouncementFormComponent,AnnouncementViewComponent]
})
export class EmployeeEngagementModule { }