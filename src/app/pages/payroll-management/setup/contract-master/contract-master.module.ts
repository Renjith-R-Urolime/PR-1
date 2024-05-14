import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { ContractMasterFormComponent } from './contract-master-form/contract-master-form.component';
import { ContractMasterViewComponent } from './contract-master-view/contract-master-view.component';
import { ContractMasterComponent } from './contract-master.component';

const routes: Routes = [
  {
    path: '',
    component: ContractMasterComponent,
  },
  {
    path: 'create',
    component: ContractMasterFormComponent
  },
  {
    path: 'edit/:id',
    component: ContractMasterFormComponent
  },
  {
    path: 'view/:id',
    component: ContractMasterViewComponent
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
  declarations: [ContractMasterComponent, ContractMasterFormComponent, ContractMasterViewComponent]
})
export class ContractMasterModule { }
