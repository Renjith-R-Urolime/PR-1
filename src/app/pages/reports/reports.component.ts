import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  subMenuList = [];
  routerUrl = [];
  menuHeader = '';
  currentURL:string;
  theme = this.sharedService.getTheme();
  activeTab: string = 'All Reports';
  selectedreportIndex: number = 1;
  constructor(private router: Router, private sharedService: SharedService) { }
  ngOnInit() {
  this.initializeModules()
  this.selectTab("All Reports")
  }

  initializeModules() {
    this.modules = this.modules.map(module => ({
      ...module,
      showAll: false,
      visibleCount: 5
    }));
  }

  toggleShowAll(module) {
    module.showAll = !module.showAll;
    module.visibleCount = module.showAll ? module.subItems.length : 5;
  }

  data = [
    { name: 'My Reports' },
    { name: 'All Reports' },
    { name: 'Analytics' }
  ];

  modules = [
    {
      id: 'corporateHub',
      title: 'Corporate Hub',
      svgIcon:'assets/media/icons/briefcase-outline.svg',
      subItems: [
        { title: 'Corporate Summary' },
        { title: 'Employee Addition Trend' },
        { title: 'Distribution' },
        { title: 'Diversity and Inclusion' },
        { title: 'Compliance Report' },
        { title: 'Salary Report' },
        { title: 'Employee Turnover' },
        { title: 'Training Report' },
        { title: 'Attendance Report' },
        { title: 'Leave Balances Report' }
      ]
    },
    {
      id: 'employeeHub',
      title: 'Employee Hub',
      svgIcon:'assets/media/icons/people-outline.svg',
      subItems: [
        { title: 'Employee Hub Summary' },
        {
          id: 'headcount',
          title: 'Headcount',
          isExpandable: true,
          expanded: false,
          subItems: [
            {
              title: 'By Subsidiary',
              routerLink: '/reports/subsidiary-report'
            },
            {
              title: 'By Location',
              routerLink: '/reports/location-report'
            },
            {
              title: 'By Department',
              routerLink: '/reports/department-report'
            },
            {
              title: 'By Nationality ',
              routerLink: '/reports/nationality-report'
            },
            {
              title: 'By Grade ',
              routerLink: '/reports/grade-report'
            }
          ]
        },
        { title: 'Resource Availability' },
        { title: 'Employee Leave Balance' },
        { title: 'Leave Booked and Balance' },
        { title: 'Leave Type Wise Summary' }
      ]
    },
    {
      id: 'timeAttendance',
      title: 'Time & Attendance',
      svgIcon:'assets/media/icons/time-outline.svg',
      subItems: [
        { title: 'Time & Attendance Summary' },
        { title: 'check-in and check-out' },
        { title: 'Employee Present status' },
        { title: 'Presence hours break-up' },
        { title: 'Attendance data for payroll' }
      ]
    },
    {
      id: 'leaveManagement',
      title: 'Leave Management',
      svgIcon:'assets/media/icons/calendar-outline.svg',
      subItems: [
        { title: 'Leave Summary' },
        { title: 'Job status' },
        { title: 'Project status' },
        { title: 'Logged hours for clients' },
        { title: 'Logged hours for clients' }
      ]
    },
    {
      id: 'payrollManagement',
      title: 'Payroll Management',
      svgIcon:'assets/media/icons/wallet-outline.svg',
      subItems: [
        { title: 'Payroll Management Summary' },
        { title: 'Employee skill sets' },
        { title: 'Feedback on employee' }
      ]
    },
    {
      id: 'systemConfiguration',
      title: 'System Configuration',
      svgIcon:'assets/media/icons/settings-outline.svg',
      subItems: [
        { title: 'System Configuration Summary' },
        { title: 'Location wise courses' },
        { title: 'Course categories' }
      ]
     },
    {
      id: 'support',
      title: 'Support',
      svgIcon:'assets/media/icons/build-outline.svg',
      subItems: [
        { title: 'Support Summary' },
        { title: 'Overall status' },
        { title: 'Requested vs escalated' }
      ]
     }
  ];

  selectTab(tab: string): void {
    this.activeTab = tab;
  }

}
