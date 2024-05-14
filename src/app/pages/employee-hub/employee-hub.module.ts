import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'manage',
    loadChildren: () => import('./manage.module').then((m) => m.ManageEmployeeModule),

  },
  {
    path: 'offboard',
    loadChildren: () => import('./offboard.module').then((m) => m.EmployeeOffboardModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings.module').then((m) => m.EmployeeSettingsModule),
  },
  {
    path: 'profiles',
    loadChildren: () =>
      import('./profiles.module').then((m) => m.EmployeeProfileModule),
  },
  {
    path: 'concern-portal',
    loadChildren: () =>
      import('./concern-portal.module').then((m) => m.ConcernPortalModule),
  },
  {
    path: 'travel',
    loadChildren: () =>
      import('./travel.module').then((m) => m.TravelModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./document-credentials.module').then((m) => m.DocumentsCredentailsModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class EmployeeHubModule { }
