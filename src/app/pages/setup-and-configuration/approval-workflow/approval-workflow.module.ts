import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { ApprovalWorkflowFormComponent } from './approval-workflow-form/approval-workflow-form.component';
import { ApprovalWorkflowComponent } from './approval-workflow.component'


const routes: Routes = [
  {
    path: '',
    component: ApprovalWorkflowComponent
  },
  {
    path: 'create',
    component: ApprovalWorkflowFormComponent
  },
]

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    InlineSVGModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    FormsModule
  ],
  declarations: [ApprovalWorkflowFormComponent, ApprovalWorkflowComponent]
})
export class ApprovalWorkflowModule { }
