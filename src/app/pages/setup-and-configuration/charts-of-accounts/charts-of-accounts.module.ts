import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { ChartsOfAccountsFormComponent } from './charts-of-accounts-form/charts-of-accounts-form.component';
import { ChartsOfAccountsViewComponent } from './charts-of-accounts-view/charts-of-accounts-view.component';
import { ChartsOfAccountsComponent } from './charts-of-accounts.component';

const routes: Routes = [
  {
    path: '',
    component: ChartsOfAccountsComponent
  },
  {
    path: 'create',
    component: ChartsOfAccountsFormComponent
  },
  {
    path: 'edit/:id',
    component: ChartsOfAccountsFormComponent
  },
  {
    path: 'view/:id',
    component: ChartsOfAccountsViewComponent
  },


]
@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [
    ChartsOfAccountsComponent,
    ChartsOfAccountsFormComponent,
    ChartsOfAccountsViewComponent
  ]
})
export class ChartsOfAccountsModule { }
