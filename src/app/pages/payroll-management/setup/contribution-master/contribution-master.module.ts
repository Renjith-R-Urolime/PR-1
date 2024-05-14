import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { ContributionMasterFormComponent } from './contribution-master-form/contribution-master-form.component';
import { ContributionMasterViewComponent } from './contribution-master-view/contribution-master-view.component';
import { ContributionMasterComponent } from './contribution-master.component';

const routes: Routes = [
  {
    path: '',
    component: ContributionMasterComponent,
  },
  {
    path: 'create',
    component: ContributionMasterFormComponent
  },
  {
    path: 'edit/:id',
    component: ContributionMasterFormComponent
  },
  {
    path: 'view/:id',
    component: ContributionMasterViewComponent
  },

]

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    InlineSVGModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ContributionMasterComponent, ContributionMasterFormComponent, ContributionMasterViewComponent]
})
export class ContributionMasterModule { }
