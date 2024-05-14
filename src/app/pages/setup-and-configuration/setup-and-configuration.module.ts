import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { UiModule } from 'src/app/shared/ui/ui.module';

const routes: Routes = [

  {
    path: 'roles-and-permissions',
    loadChildren: () =>
      import('./roles-and-permissions/roles-and-permissions.module').then((m) => m.RolesAndPermissionsModule),
  },
  {
    path: 'charts-of-accounts',
    loadChildren: () =>
      import('./charts-of-accounts/charts-of-accounts.module').then((m) => m.ChartsOfAccountsModule),
  },
  {
    path: 'approval-workflows',
    loadChildren: () =>
      import('./approval-workflow/approval-workflow.module').then((m) => m.ApprovalWorkflowModule),
  },
]
@NgModule({
  imports: [
    CommonModule,
    UiModule,
    InlineSVGModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FormsModule
    ]
})
export class SetupAndConfigurationModule {}