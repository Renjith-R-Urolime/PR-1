import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { OnBoardWidgetComponent } from '../onboard-widget/onboard-widget.component';
import { PollsWidgetComponent } from '../polls-widget/polls-widget.component';
import { DonutChartWidgetComponent } from './donut-chart-widget/donut-chart-widget.component';
import { EmployeeFinderWidgetComponent } from './employee-finder-widget/employee-finder-widget.component';
import { MetricInfoWidgetComponent } from './metric-info-widget/metric-info-widget.component';
import { PayrollProgressWidgetComponent } from './payroll-progress-widget/payroll-progress-widget.component';
import { PeopleListWidgetComponent } from './people-list-widget/people-list-widget.component';
import { RequestsWidgetComponent } from './requests-widget/requests-widget.component';
import { ShortcutsWidgetComponent } from './shortcuts-widget/shortcuts-widget.component';
@NgModule({
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule
  ],
  declarations: [
    DonutChartWidgetComponent,
    MetricInfoWidgetComponent,
    PeopleListWidgetComponent,
    RequestsWidgetComponent,
    ShortcutsWidgetComponent,
    PayrollProgressWidgetComponent,
    OnBoardWidgetComponent,
    PollsWidgetComponent,
    EmployeeFinderWidgetComponent,
  ],
  exports: [
    DonutChartWidgetComponent,
    MetricInfoWidgetComponent,
    OnBoardWidgetComponent,
    PollsWidgetComponent,
    PeopleListWidgetComponent,
    RequestsWidgetComponent,
    ShortcutsWidgetComponent,
    PayrollProgressWidgetComponent,
    EmployeeFinderWidgetComponent,
  ]
})
export class WidgetsModule { }
