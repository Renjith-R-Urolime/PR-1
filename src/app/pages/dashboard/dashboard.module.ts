import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { KtdGridModule } from '@katoid/angular-grid-layout';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { WidgetsModule } from 'src/app/shared/ui/widgets/widgets.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    UiModule,
    WidgetsModule,
    KtdGridModule,
    InlineSVGModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
    FormsModule,
    NgxSkeletonLoaderModule
  ],
})
export class DashboardModule { }
