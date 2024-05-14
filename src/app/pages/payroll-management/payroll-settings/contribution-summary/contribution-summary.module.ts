import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { ContributionSummaryDetailComponent } from './contribution-summary-detail/contribution-summary-detail.component';
import { ContributionSummaryComponent } from './contribution-summary.component';

const routes: Routes = [
  {
    path: '',
    component: ContributionSummaryComponent,
  },
  {
    path: 'view/:id',
    component: ContributionSummaryDetailComponent
  },

]

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    InlineSVGModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ContributionSummaryComponent, ContributionSummaryDetailComponent]
})
export class ContributionSummaryModule { }
