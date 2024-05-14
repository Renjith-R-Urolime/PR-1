import { Routes } from '@angular/router';
import { ModuleLoadingComponent } from './module-loading/module-loading.component';
import { environment } from 'src/environments/environment';

const Routing: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'module-loading',
    component: ModuleLoadingComponent
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),
  },
  {
    path: 'organisation',
    loadChildren: () =>
      import('./organisation/organisation.module').then((m) => m.OrganisationModule),
  },
  {
    path: 'time-and-attendance',
    loadChildren: () =>
      import('./time-and-attendance/time-and-attendance.module').then((m) => m.TimeAndAttendanceModule),
  },
  {
    path: 'payroll-management',
    loadChildren: () =>
      import('./payroll-management/payroll-management.module').then((m) => m.PayrollManagementModule),
  },
  {
    path: 'leave-management',
    loadChildren: () =>
      import('./leave-management/leave-management.module').then((m) => m.LeaveManagementModule),
  },
  {
    path: 'company',
    loadChildren: () =>
      import('./company-info/company-info.module').then((m) => m.ComapnyInfoModule),
  },
  {
    path: 'setup-and-configuration',
    loadChildren: () =>
      import('./setup-and-configuration/setup-and-configuration.module').then((m) => m.SetupAndConfigurationModule),
  },
  // {
  //   path: '**',
  //   redirectTo: 'error/404',
  // },

];

export { Routing };

