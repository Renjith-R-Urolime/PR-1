import { Routes } from '@angular/router';
import { ModuleLoadingComponent } from './module-loading/module-loading.component';

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
    path: 'corporate-hub',
    loadChildren: () =>
      import('./corporate-hub/corporate-hub.module').then((m) => m.CorporateHubModule),
  },
  {
    path: 'employee-hub',
    loadChildren: () =>
      import('./employee-hub/employee-hub.module').then((m) => m.EmployeeHubModule),
  },
  {
    path: 'time-and-attendance',
    loadChildren: () =>
      import('./time-and-attendance/time-and-attendance.module').then((m) => m.TimeAndAttendanceModule),
  },
  {
    path: 'payroll',
    loadChildren: () =>
      import('./payroll-management/payroll-management.module').then((m) => m.PayrollManagementModule),
  },
  {
    path: 'leave-management',
    loadChildren: () =>
      import('./leave-management/leave-management.module').then((m) => m.LeaveManagementModule),
  },
  // {
  //   path: 'company',
  //   loadChildren: () =>
  //     import('./company-info/company-info.module').then((m) => m.ComapnyInfoModule),
  // },
  {
    path: 'system-configuration',
    loadChildren: () =>
      import('./setup-and-configuration/setup-and-configuration.module').then((m) => m.SetupAndConfigurationModule),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./reports/reports.module').then((m) => m.ReportsModule),
  },
  // {
  //   path: '**',
  //   redirectTo: 'error/404',
  // },

];

export { Routing };

