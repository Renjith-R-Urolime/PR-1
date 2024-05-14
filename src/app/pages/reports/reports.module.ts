import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { HeadcountDepartmentReportComponent } from './headcount-department-report/headcount-department-report.component';
import { HeadcountGradeReportComponent } from './headcount-grade-report/headcount-grade-report.component';
import { HeadcountLocationReportComponent } from './headcount-location-report/headcount-location-report.component';
import { HeadcountNationalityReportComponent } from './headcount-nationality-report/headcount-nationality-report.component';
import { HeadcountSubsidiaryReportComponent } from './headcount-subsidiary-report/headcount-subsidiary-report.component';
import { ReportViewComponent } from './report-view/report-view.component';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  {
    path: 'all',
    component: ReportsComponent
  },
  {
    path: 'subsidiary-report',
    component: HeadcountSubsidiaryReportComponent
  },
  {
    path: 'location-report',
    component: HeadcountLocationReportComponent
  },
  {
    path: 'department-report',
    component: HeadcountDepartmentReportComponent
  },
  {
    path: 'nationality-report',
    component: HeadcountNationalityReportComponent
  },
  {
    path: 'grade-report',
    component: HeadcountGradeReportComponent
  },
]

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    NgxSkeletonLoaderModule,
    InlineSVGModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    AngularSlickgridModule.forRoot()
  ],
  declarations: [ReportsComponent, ReportViewComponent, HeadcountLocationReportComponent, HeadcountSubsidiaryReportComponent, HeadcountDepartmentReportComponent, HeadcountNationalityReportComponent, HeadcountGradeReportComponent]
})
export class ReportsModule { }
