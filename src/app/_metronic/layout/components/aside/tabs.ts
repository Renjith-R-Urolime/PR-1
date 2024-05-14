type AliasStrategy = {
  [data: string]: string
}
type Tab = {
  id: number;
  mainMenuText: string;
  mainMenuIcon: string;
  mainMenuLink: string;
  mainMenuTooltip: string;
  mainMenuIsSeparator?: boolean;
  mainMenuColor: string;
  subMenu: Subtab[]
};
type Subtab = {
  id: number;
  subMenuText: string;
  subMenuIcon: string;
  subMenuLink: string;
  apiLink?: string;
  scope? : string;
  isLink?: boolean;
  subMenuTooltip: string;
  subMenu: {
    id: number;
    subMenuText: string;
    subMenuIcon: string;
    subMenuLink: string;
    subMenuInfo?: string;
    subMenuTooltip: string;
    apiLink?: string;
  }[]
}

const RenamedTabs: AliasStrategy = {
  'Class': 'Class',
  'Subsidiary': 'Subsidiary'
}

const tabs: ReadonlyArray<Tab> = [
  {
    "mainMenuText": "Dashboard",
    "mainMenuIcon": "./assets/media/icons/layers-outline.svg",
    "mainMenuTooltip": "Dashboard",
    "mainMenuColor": "gradient",
    "mainMenuIsSeparator": true,
    "mainMenuLink": "/dashboard",
    "subMenu": [],
    "id": 1
  },
  {
    "mainMenuText": "Organisation",
    "mainMenuIcon": "./assets/media/icons/briefcase-outline.svg",
    "mainMenuTooltip": "Organisation",
    "mainMenuColor": "pink",
    "mainMenuLink": "/organisation",
    "subMenu": [
      {
        "subMenuText": "Subsidiary",
        "subMenuIcon": "./assets/media/icons/git-merge-outline.svg",
        "subMenuLink": "/subsidiary",
        "apiLink": "core-hr/organisation/subsidiary",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 3
      },
      {
        "subMenuText": "Jurisdiction",
        "subMenuIcon": "./assets/media/icons/hammer-outline.svg",
        "subMenuLink": "/jurisdiction",
        "apiLink": "core-hr/organisation/jurisdiction",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 4
      },
      {
        "subMenuText": "Location",
        "subMenuIcon": "./assets/media/icons/location-outline.svg",
        "subMenuLink": "/location",
        "apiLink": "core-hr/organisation/location",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 5
      },
      {
        "subMenuText": "Department",
        "subMenuIcon": "./assets/media/icons/business-outline.svg",
        "subMenuLink": "/department",
        "apiLink": "core-hr/organisation/department",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 6
      },
      {
        "subMenuText": "Class",
        "subMenuIcon": "./assets/media/icons/person-circle-outline.svg",
        "subMenuLink": "/class",
        "apiLink": "core-hr/organisation/class",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 7
      },
      {
        "subMenuText": "Employer Bank Details",
        "subMenuIcon": "./assets/media/icons/bank-outline.svg",
        "subMenuLink": "/employer-bank-details",
        "apiLink": "core-hr/organisation/employer-bank-detail",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 8
      },
      {
        "subMenuText": "Announcements",
        "subMenuIcon": "./assets/media/icons/megaphone-outline.svg",
        "subMenuLink": "/announcements",
        "subMenuTooltip": "",
        "apiLink": "core-hr/organisation/announcement",
        "isLink": true,
        "subMenu": [],
        "id": 9
      },
      {
        "subMenuText": "Poll & Survey",
        "subMenuIcon": "./assets/media/icons/polls-survey.svg",
        "subMenuLink": "/polls-and-survey",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 10
      },
      {
        "subMenuText": "Policy & Handbooks",
        "subMenuIcon": "./assets/media/icons/policy-handbook.svg",
        "subMenuLink": "/policy-handbook",
        "apiLink": "core-hr/organisation/policy-handbook",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 11
      },
      {
        "subMenuText": "Organisation Chart",
        "subMenuIcon": "./assets/media/icons/organisation-chart.svg",
        "subMenuLink": "/organisation-chart",
        "subMenuTooltip": "",
        "apiLink": "core-hr/organisation/chart",
        "isLink": true,
        "subMenu": [],
        "id": 12
      },
      {
        "subMenuText": "Organisation Settings",
        "subMenuIcon": "./assets/media/icons/settings-outline.svg",
        "subMenuLink": "/settings",
        "isLink": true,
        "apiLink": "core-hr/organisation/settings",
        "subMenuTooltip": "",
        "subMenu": [
          {
            "subMenuText": "Policy Type",
            "subMenuIcon": "./assets/media/icons/assignment-task.svg",
            "subMenuLink": "/policy-type",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "core-hr/organisation/settings",
            "id": 14
          }
        ],
        "id": 13
      }
    ],
    "id": 2
  },
  {
    "mainMenuText": "Employee",
    "mainMenuIcon": "./assets/media/icons/people-outline.svg",
    "mainMenuTooltip": "Employee",
    "mainMenuColor": "purple",
    "mainMenuLink": "/employee",
    "subMenu": [
      {
        "subMenuText": "Employee",
        "subMenuIcon": "./assets/media/icons/people-outline.svg",
        "subMenuLink": "/master",
        "subMenuTooltip": "",
        "isLink": true,
        "apiLink": "core-hr/employee",
        "subMenu": [
          {
            "subMenuText": "Contribution Register",
            "subMenuIcon": "",
            "subMenuLink": "/contribution-register",
            "subMenuTooltip": "",
            "apiLink": "core-hr/employee/contribution-register",
            "id": 17
          }
        ],
        "id": 16
      },
      {
        "subMenuText": "Payroll onboard",
        "subMenuIcon": "./assets/media/icons/cash-outline.svg",
        "subMenuLink": "/onboard",
        "subMenuTooltip": "",
        "apiLink": "core-hr/employee",
        "scope": "onboard",
        "isLink": true,
        "subMenu": [],
        "id": 18
      },
      {
        "subMenuText": "Manage Employee",
        "subMenuIcon": "./assets/media/icons/manage-emp.svg",
        "subMenuLink": "/manage",
        "subMenuTooltip": "",
        "isLink": false,
        "subMenu": [
          {
            "subMenuText": "Employee",
            "subMenuIcon": "",
            "subMenuLink": "/manage-employee",
            "subMenuTooltip": "",
            "id": 20
          },
          {
            "subMenuText": "Subsidiary",
            "subMenuIcon": "",
            "subMenuLink": "/manage-subsidiary",
            "subMenuTooltip": "",
            "id": 21
          },
          {
            "subMenuText": "Manage Salary",
            "subMenuIcon": "",
            "subMenuLink": "/manage-salary",
            "apiLink": "core-hr/employee/manage-salary",
            "subMenuTooltip": "",
            "id": 22
          },
          {
            "subMenuText": "Manage Classification",
            "subMenuIcon": "",
            "subMenuLink": "/manage-classification",
            "apiLink": "core-hr/employee/manage-classification",
            "subMenuTooltip": "",
            "id": 23
          },
          {
            "subMenuText": "Manage Shift",
            "subMenuIcon": "",
            "subMenuLink": "/manage-shift",
            "apiLink": "core-hr/employee/manage-shift-calendar",
            "subMenuTooltip": "",
            "id": 24
          },
          {
            "subMenuText": "Bank Details",
            "subMenuIcon": "",
            "subMenuLink": "/manage-bank-details",
            "subMenuTooltip": "",
            "id": 25
          }
        ],
        "id": 19
      },
      {
        "subMenuText": "Travels",
        "subMenuIcon": "./assets/media/icons/airplane-outline.svg",
        "subMenuLink": "/travels",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 26
      },
      {
        "subMenuText": "Dependents & Credentials",
        "subMenuIcon": "./assets/media/icons/key-outline.svg",
        "subMenuLink": "/dependentList",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 27
      },
      {
        "subMenuText": "Warnings",
        "subMenuIcon": "./assets/media/icons/warning-outline.svg",
        "subMenuLink": "/warnings",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 28
      },
      {
        "subMenuText": "Documents",
        "subMenuIcon": "./assets/media/icons/reader-outline.svg",
        "subMenuLink": "/documents",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 29
      },
      {
        "subMenuText": "Assignment & Task",
        "subMenuIcon": "./assets/media/icons/assignment-task.svg",
        "subMenuLink": "/assignment-task",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 30
      },
      {
        "subMenuText": "Grievance",
        "subMenuIcon": "./assets/media/icons/create-outline.svg",
        "subMenuLink": "/grievance",
        "isLink": true,
        "subMenuTooltip": "",
        "subMenu": [],
        "id": 31
      },
      {
        "subMenuText": "Employee Offboard",
        "subMenuIcon": "./assets/media/icons/person-remove-outline.svg",
        "subMenuLink": "/employee-offboard",
        "isLink": false,
        "subMenuTooltip": "",
        "subMenu": [
          {
            "subMenuText": "End of Service Request",
            "subMenuIcon": "",
            "subMenuLink": "/eos-request",
            "apiLink": "core-hr/employee/eos-request",
            "subMenuTooltip": "",
            "id": 33
          },
          {
            "subMenuText": "Employee Exit",
            "subMenuIcon": "",
            "subMenuLink": "/employee-exit",
            "apiLink": "core-hr/employee/eos-request",
            "subMenuTooltip": "",
            "id": 34
          }
        ],
        "id": 32
      },
      {
        "subMenuText": "Employee Settings",
        "subMenuIcon": "./assets/media/icons/settings-outline.svg",
        "subMenuLink": "/settings",
        "isLink": true,
        "apiLink": "core-hr/employee/settings",
        "subMenuTooltip": "",
        "subMenu": [
          {
            "subMenuText": "Employee Type",
            "subMenuIcon": "./assets/media/icons/people-outline.svg",
            "subMenuLink": "/types",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "core-hr/employee/settings",
            "id": 36
          },
          {
            "subMenuText": "Employee Status",
            "subMenuIcon": "./assets/media/icons/employee-status.svg",
            "subMenuLink": "/status",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "core-hr/employee/settings",
            "id": 37
          },
          {
            "subMenuText": "Employee Category",
            "subMenuIcon": "./assets/media/icons/grid-outline.svg",
            "subMenuLink": "/category",
            "subMenuTooltip": "",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "apiLink": "core-hr/employee/settings",
            "id": 38
          },
          {
            "subMenuText": "Document Type",
            "subMenuIcon": "./assets/media/icons/document-text-outline.svg",
            "subMenuLink": "/document-type",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "core-hr/employee/settings",
            "id": 39
          },
          {
            "subMenuText": "Bank Account Type",
            "subMenuIcon": "/assets/media/icons/bank-account.svg",
            "subMenuLink": "/bank-account-type",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "core-hr/employee/settings",
            "id": 40
          },
          {
            "subMenuText": "Grade",
            "subMenuIcon": "./assets/media/icons/grade.svg",
            "subMenuLink": "/grade",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "core-hr/employee/settings",
            "id": 41
          },
          {
            "subMenuText": "Designation",
            "subMenuIcon": "./assets/media/icons/briefcase-outline.svg",
            "subMenuLink": "/designation",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "core-hr/employee/settings",
            "id": 42
          },
          {
            "subMenuText": "Pay Structure",
            "subMenuIcon": "./assets/media/icons/card-outline.svg",
            "subMenuLink": "/pay-structure",
            "subMenuTooltip": "",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "apiLink": "core-hr/employee/settings/pay-structure",
            "id": 43
          },
          {
            "subMenuText": "Payment Method",
            "subMenuIcon": "./assets/media/icons/payment-method.svg",
            "subMenuLink": "/payment-method",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "core-hr/employee/settings",
            "id": 44
          },
          {
            "subMenuText": "Air Ticket Entitlement",
            "subMenuIcon": "./assets/media/icons/ticket-outline.svg",
            "subMenuLink": "/air-ticket-entitlement",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "core-hr/employee/settings",
            "id": 45
          },
          {
            "subMenuText": "Employee Leave Plan",
            "subMenuIcon": "./assets/media/icons/calendar-outline.svg",
            "subMenuLink": "/employee-leave-plan",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "core-hr/employee/settings/employee-leave-plan",
            "id": 46
          },
          {
            "subMenuText": "Warning Type",
            "subMenuIcon": "./assets/media/icons/warning-outline.svg",
            "subMenuLink": "/warning-type",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "core-hr/employee/settings",
            "id": 47
          }
        ],
        "id": 35
      }
    ],
    "id": 15
  },
  {
    "mainMenuText": "Time & Attendance",
    "mainMenuIcon": "./assets/media/icons/time-outline.svg",
    "mainMenuTooltip": "Time & Attendance",
    "mainMenuColor": "tangerine",
    "mainMenuLink": "/time-and-attendance",
    "subMenu": [
      {
        "subMenuText": "Attendance",
        "subMenuIcon": "./assets/media/icons/checkmark-circle-outline.svg",
        "subMenuLink": "/attendance",
        "apiLink": "time-attendance/attendance",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 49
      },
      {
        "subMenuText": "Work Calendar",
        "subMenuIcon": "./assets/media/icons/calendar-outline.svg",
        "subMenuLink": "/work-calendar",
        "apiLink": "time-attendance/work-calendar",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 50
      },
      {
        "subMenuText": "Holidays",
        "subMenuIcon": "./assets/media/icons/image-outline.svg",
        "subMenuLink": "/holidays",
        "apiLink": "time-attendance/holiday",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 51
      },
      {
        "subMenuText": "Waiver Hour",
        "subMenuIcon": "./assets/media/icons/waiver-hour.svg",
        "subMenuLink": "/waiver-hour",
        "subMenuTooltip": "",
        "apiLink": "time-attendance/waiver-hour",
        "isLink": true,
        "subMenu": [],
        "id": 52
      },
      {
        "subMenuText": "Shift",
        "subMenuIcon": "./assets/media/icons/shift-scheduler.svg",
        "subMenuLink": "/shift",
        "apiLink": "time-attendance/shift",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 53
      }
    ],
    "id": 48
  },
  {
    "mainMenuText": "Leave Management",
    "mainMenuIcon": "./assets/media/icons/calendar-outline.svg",
    "mainMenuTooltip": "Leave Management",
    "mainMenuColor": "crayola",
    "mainMenuLink": "/leave-management",
    "subMenu": [
      {
        "subMenuText": "Leave Configuration",
        "subMenuIcon": "./assets/media/icons/settings-outline.svg",
        "subMenuLink": "/configuration",
        "subMenuTooltip": "",
        "apiLink": "leave/configuration",
        "isLink": true,
        "subMenu": [],
        "id": 55
      },
      {
        "subMenuText": "Leave Application",
        "subMenuIcon": "./assets/media/icons/clipboard-outline.svg",
        "subMenuLink": "/leave-application",
        "subMenuTooltip": "",
        "isLink": true,
        "apiLink": "leave/application",
        "subMenu": [],
        "id": 56
      },
      {
        "subMenuText": "Leave Adjustment",
        "subMenuIcon": "./assets/media/icons/calendar-clear-outline.svg",
        "subMenuLink": "/adjustment",
        "subMenuTooltip": "",
        "isLink": true,
        "apiLink": "leave/adjustment",
        "subMenu": [],
        "id": 57
      },
      {
        "subMenuText": "Leave Resumption",
        "subMenuIcon": "./assets/media/icons/leave-resumption-outline.svg",
        "subMenuLink": "/resumption",
        "subMenuTooltip": "",
        "isLink": true,
        "apiLink": "leave/resumption",
        "subMenu": [],
        "id": 58
      },
      {
        "subMenuText": "Leave Settings",
        "subMenuIcon": "./assets/media/icons/settings-outline.svg",
        "subMenuLink": "/settings",
        "isLink": true,
        "apiLink": "leave/settings",
        "subMenuTooltip": "",
        "subMenu": [
          {
            "subMenuText": "Leave Reason",
            "subMenuIcon": "./assets/media/icons/people-outline.svg",
            "subMenuLink": "/leave-reason",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "leave/settings",
            "id": 60
          }
        ],
        "id": 59
      }
    ],
    "id": 54
  },
  {
    "mainMenuText": "Payroll Management",
    "mainMenuIcon": "./assets/media/icons/wallet-outline.svg",
    "mainMenuTooltip": "Payroll Management",
    "mainMenuColor": "mediumPurple",
    "mainMenuLink": "/payroll-management",
    "subMenu": [
      {
        "subMenuText": "Setup",
        "subMenuIcon": "./assets/media/icons/settings-outline.svg",
        "subMenuLink": "/setup",
        "isLink": false,
        "subMenuTooltip": "",
        "subMenu": [
          {
            "subMenuText": "Payroll Cycle",
            "subMenuIcon": "",
            "subMenuLink": "/payroll-cycle",
            "apiLink": "payroll/setup/cycle",
            "subMenuTooltip": "",
            "id": 63
          },
          {
            "subMenuText": "Payroll Component",
            "subMenuIcon": "",
            "subMenuLink": "/payroll-component",
            "apiLink": "payroll/setup/component",
            "subMenuTooltip": "",
            "id": 64
          },
          {
            "subMenuText": "Contracts",
            "subMenuIcon": "",
            "subMenuLink": "/contract",
            "apiLink": "payroll/setup/contract",
            "subMenuTooltip": "",
            "id": 65
          },
          {
            "subMenuText": "Contribution",
            "subMenuIcon": "",
            "subMenuLink": "/contribution",
            "apiLink": "payroll/setup/contribution",
            "subMenuTooltip": "",
            "id": 66
          },
          {
            "subMenuText": "Overtime Setup",
            "subMenuIcon": "",
            "subMenuLink": "/overtime-setup",
            "apiLink": "payroll/setup/overtime-setup",
            "subMenuTooltip": "",
            "id": 67
          },
          {
            "subMenuText": "Tax",
            "subMenuIcon": "",
            "subMenuLink": "/tax",
            "subMenuTooltip": "",
            "id": 68
          },
          {
            "subMenuText": "Benefit",
            "subMenuIcon": "",
            "subMenuLink": "/benefit",
            "subMenuTooltip": "",
            "id": 69
          },
          {
            "subMenuText": "Expense",
            "subMenuIcon": "",
            "subMenuLink": "/expense",
            "subMenuTooltip": "",
            "id": 70
          }
        ],
        "id": 62
      },
      {
        "subMenuText": "Advance Salary",
        "subMenuIcon": "./assets/media/icons/loan.svg",
        "subMenuLink": "/salary-advance",
        "subMenuTooltip": "",
        "isLink": true,
        "apiLink": "payroll/salary-advance",
        "subMenu": [],
        "id": 71
      },
      {
        "subMenuText": "Adjustment",
        "subMenuIcon": "./assets/media/icons/options-outline.svg",
        "subMenuLink": "/adjustment",
        "subMenuTooltip": "",
        "isLink": true,
        "apiLink": "payroll/adjustment",
        "subMenu": [],
        "id": 72
      },
      {
        "subMenuText": "Deduction",
        "subMenuIcon": "./assets/media/icons/trending-down-outline.svg",
        "subMenuLink": "/deduction",
        "subMenuTooltip": "",
        "isLink": true,
        "apiLink": "payroll/deduction",
        "subMenu": [],
        "id": 73
      },
      {
        "subMenuText": "Overtime",
        "subMenuIcon": "./assets/media/icons/time-outline.svg",
        "subMenuLink": "/overtime",
        "subMenuTooltip": "",
        "isLink": true,
        "apiLink": "payroll/overtime",
        "subMenu": [],
        "id": 74
      },
      {
        "subMenuText": "Time-Off Adjustment",
        "subMenuIcon": "./assets/media/icons/stopwatch-outline.svg",
        "subMenuLink": "/time-off-adjustment",
        "subMenuTooltip": "",
        "isLink": true,
        "apiLink": "payroll/time-off-adjustment",
        "subMenu": [],
        "id": 75
      },
      {
        "subMenuText": "Run payroll",
        "subMenuIcon": "./assets/media/icons/folder-outline.svg",
        "subMenuLink": "/run-payroll",
        "subMenuTooltip": "",
        "apiLink": "payroll/run/history",
        "isLink": true,
        "subMenu": [],
        "id": 76
      },
      {
        "subMenuText": "Run Intermedialry Table Summary",
        "subMenuIcon": "./assets/media/icons/folder-outline.svg",
        "subMenuLink": "/intermediary-table",
        "subMenuTooltip": "",
        "isLink": true,
        "apiLink": "payroll/intermediary-table",
        "subMenu": [],
        "id": 77
      },
      {
        "subMenuText": "Payroll Settings",
        "subMenuIcon": "./assets/media/icons/settings-outline.svg",
        "subMenuLink": "/settings",
        "isLink": true,
        "apiLink": "payroll/settings",
        "subMenuTooltip": "",
        "subMenu": [
          {
            "subMenuText": "Contribution Summary",
            "subMenuIcon": "./assets/media/icons/document-text-outline.svg",
            "subMenuLink": "/contribution-summary",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "payroll/settings/contribution-summary",
            "id": 79
          },
          {
            "subMenuText": "Component Mapping",
            "subMenuIcon": "./assets/media/icons/document-text-outline.svg",
            "subMenuLink": "/component-mapping",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "payroll/settings/transaction-component-mapping",
            "id": 80
          },
          {
            "subMenuText": "Employee OT Matrix",
            "subMenuIcon": "./assets/media/icons/apps-outline.svg",
            "subMenuLink": "/employee-ot-matrix",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "payroll/settings/employee-ot-matrix",
            "id": 81
          },
          {
            "subMenuText": "EOS Sub Type",
            "subMenuIcon": "./assets/media/icons/log-out-outline.svg",
            "subMenuLink": "/eos-sub-type",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "payroll/settings/eos-sub-type",
            "id": 82
          },
          {
            "subMenuText": "Expense Type",
            "subMenuIcon": "./assets/media/icons/log-out-outline.svg",
            "subMenuLink": "/expense-type",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "payroll/settings/expense-type",
            "id": 122
          }
        ],
        "id": 78
      }
    ],
    "id": 61
  },
  {
    "mainMenuText": "Setup & Configuration",
    "mainMenuIcon": "./assets/media/icons/settings-outline.svg",
    "mainMenuTooltip": "Setup & Configuration",
    "mainMenuColor": "softPink",
    "mainMenuLink": "/setup-and-configuration",
    "subMenu": [
      {
        "subMenuText": "Approval Workflows",
        "subMenuIcon": "./assets/media/icons/copy-outline.svg",
        "subMenuLink": "/approval-workflows",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 84
      },
      {
        "subMenuText": "Roles & Permissions",
        "subMenuIcon": "./assets/media/icons/lock-closed-outline.svg",
        "subMenuLink": "/roles-and-permissions",
        "apiLink": "setup/access/roles",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 85
      },
      {
        "subMenuText": "Charts Of Accounts",
        "subMenuIcon": "./assets/media/icons/accounts-document.svg",
        "subMenuLink": "/charts-of-accounts",
        "apiLink": "payroll/setup/chart-of-accounts",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 86
      },
      {
        "subMenuText": "Language Library",
        "subMenuIcon": "./assets/media/icons/globe-outline.svg",
        "subMenuLink": "/language-library",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 87
      },
      {
        "subMenuText": "Manage Labels",
        "subMenuIcon": "./assets/media/icons/pricetag-outline.svg",
        "subMenuLink": "/manage-labels",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 88
      },
      {
        "subMenuText": "Reports",
        "subMenuIcon": "./assets/media/icons/accounts-document.svg",
        "subMenuLink": "/reports",
        "subMenuTooltip": "Reports",
        "isLink": true,
        "subMenu": [
          {
            "subMenuText": "Headcount by Subsidiary",
            "subMenuIcon": "./assets/media/icons/people-outline.svg",
            "subMenuLink": "/subsidiary-report",
            "subMenuTooltip": "",
            "apiLink": "reports/subsidiary-report",
            "id": 90
          },
          {
            "subMenuText": "Headcount by Location",
            "subMenuIcon": "./assets/media/icons/people-outline.svg",
            "subMenuLink": "/location-report",
            "subMenuTooltip": "",
            "apiLink": "reports/location-report",
            "id": 91
          },
          {
            "subMenuText": "Headcount by Department",
            "subMenuIcon": "./assets/media/icons/people-outline.svg",
            "subMenuLink": "/department-report",
            "subMenuTooltip": "",
            "apiLink": "reports/department-report",
            "id": 92
          },
          {
            "subMenuText": "Headcount by Nationality",
            "subMenuIcon": "./assets/media/icons/people-outline.svg",
            "subMenuLink": "/nationality-report",
            "subMenuTooltip": "",
            "apiLink": "reports/nationality-report",
            "id": 93
          },
          {
            "subMenuText": "Headcount by Grade",
            "subMenuIcon": "./assets/media/icons/people-outline.svg",
            "subMenuLink": "/grade-report",
            "subMenuTooltip": "",
            "apiLink": "reports/grade-report",
            "id": 94
          }
        ],
        "id": 89
      }
    ],
    "id": 83
  },
  {
    "mainMenuText": "Recruitment",
    "mainMenuIcon": "./assets/media/icons/person-outline.svg",
    "mainMenuLink": "/recruitment",
    "mainMenuTooltip": "Recruitment",
    "mainMenuColor": "minsk",
    "subMenu": [
      {
        "subMenuText": "Job Requisition",
        "subMenuIcon": "./assets/media/icons/copy-outline.svg",
        "subMenuLink": "/job-requisition",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 96
      },
      {
        "subMenuText": "Job Post",
        "subMenuIcon": "./assets/media/icons/receipt-outline.svg",
        "subMenuLink": "/job-post",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 97
      },
      {
        "subMenuText": "Candidate Database",
        "subMenuIcon": "./assets/media/icons/document-text-outline.svg",
        "subMenuLink": "/candidate-database",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 98
      },
      {
        "subMenuText": "Schedule Interview",
        "subMenuIcon": "./assets/media/icons/calendar-outline.svg",
        "subMenuLink": "/schedule-interview",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 99
      },
      {
        "subMenuText": "Candidate Evaluation",
        "subMenuIcon": "./assets/media/icons/assignment-task.svg",
        "subMenuLink": "/candidate-evaluation",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 100
      },
      {
        "subMenuText": "Generate Offer Letter",
        "subMenuIcon": "./assets/media/icons/mail-open-outline.svg",
        "subMenuLink": "/generate-offer-letter",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 101
      },
      {
        "subMenuText": "Setup",
        "subMenuIcon": "./assets/media/icons/settings-outline.svg",
        "subMenuLink": "/setup",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 102
      }
    ],
    "id": 95
  },
  {
    "mainMenuText": "Performance",
    "mainMenuIcon": "./assets/media/icons/podium-outline.svg",
    "mainMenuLink": "/performance",
    "mainMenuTooltip": "Performance",
    "mainMenuColor": "tolopea",
    "subMenu": [
      {
        "subMenuText": "Goals",
        "subMenuIcon": "./assets/media/icons/golf-outline.svg",
        "subMenuLink": "/goals",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 104
      },
      {
        "subMenuText": "Objectives",
        "subMenuIcon": "./assets/media/icons/objectives.svg",
        "subMenuLink": "/objectives",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 105
      },
      {
        "subMenuText": "Key Performing Indicators",
        "subMenuIcon": "./assets/media/icons/bar-chart-outline.svg",
        "subMenuLink": "/key-performing-indicators",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 106
      },
      {
        "subMenuText": "Key Responsibility Area",
        "subMenuIcon": "./assets/media/icons/assignment-task.svg",
        "subMenuLink": "/key-responsibility-area",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 107
      },
      {
        "subMenuText": "Performance Evaluation",
        "subMenuIcon": "./assets/media/icons/performance-evaluation.svg",
        "subMenuLink": "/performance-evaluation",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 108
      },
      {
        "subMenuText": "Setup",
        "subMenuIcon": "./assets/media/icons/settings-outline.svg",
        "subMenuLink": "/setup",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 109
      }
    ],
    "id": 103
  }
];

export { AliasStrategy, RenamedTabs, Subtab, Tab, tabs };

