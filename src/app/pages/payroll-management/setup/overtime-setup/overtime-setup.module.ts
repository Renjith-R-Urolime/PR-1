import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { OvertimeSetupFormComponent } from './overtime-setup-form/overtime-setup-form.component';
import { OvertimeSetupViewComponent } from './overtime-setup-view/overtime-setup-view.component';
import { OvertimeSetupComponent } from './overtime-setup.component';

const routes: Routes = [
  {
    path: '',
    component: OvertimeSetupComponent,
  },
  {
    path: 'create',
    component: OvertimeSetupFormComponent
  },
  {
    path: 'edit/:id',
    component: OvertimeSetupFormComponent
  },
  {
    path: 'view/:id',
    component: OvertimeSetupViewComponent
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
  declarations: [OvertimeSetupComponent, OvertimeSetupFormComponent, OvertimeSetupViewComponent]
})
export class OvertimeSetupModule { }
