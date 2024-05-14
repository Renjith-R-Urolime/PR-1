import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { RolesAndPermissionsFormComponent } from './roles-and-permissions-form/roles-and-permissions-form.component';
import { RolesAndPermissionsViewComponent } from './roles-and-permissions-view/roles-and-permissions-view.component';
import { RolesAndPermissionsComponent } from './roles-and-permissions.component';


const routes: Routes = [
  {
    path: '',
    component: RolesAndPermissionsComponent
  },
  {
    path: 'customise/:id',
    component: RolesAndPermissionsFormComponent
  },
  {
    path: 'view/:id',
    component: RolesAndPermissionsViewComponent
  },
  {
    path: 'edit/:id',
    component: RolesAndPermissionsFormComponent
  }
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
  declarations: [RolesAndPermissionsComponent, RolesAndPermissionsFormComponent,RolesAndPermissionsViewComponent]
})
export class RolesAndPermissionsModule { }
