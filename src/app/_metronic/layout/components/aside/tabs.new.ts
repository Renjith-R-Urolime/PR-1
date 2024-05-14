type AliasStrategy = {
  [data: string]: string;
};
type Tab = {
  id: number;
  mainMenuText: string;
  mainMenuIcon: string;
  mainMenuLink: string;
  mainMenuTooltip: string;
  mainMenuIsSeparator?: boolean;
  mainMenuColor: string;
  subMenu: Subtab[];
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
    isLink?: boolean;
    subMenuIcon: string;
    subMenuLink: string;
    subMenuInfo?: string;
    subMenuTooltip: string;
    apiLink?: string;
    subMenu?: {
      id: number;
      subMenuText: string;
      isLink?: boolean;
      subMenuIcon: string;
      subMenuLink: string;
      subMenuInfo?: string;
      subMenuTooltip: string;
      apiLink?: string;
    }[]
  }[]
}

const RenamedTabs: AliasStrategy = {
  Class: "Class",
  Subsidiary: "Subsidiary",
};

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
    "mainMenuText": "Corporate Hub",
    "mainMenuIcon": "./assets/media/icons/briefcase-outline.svg",
    "mainMenuTooltip": "Corporate Hub",
    "mainMenuColor": "pink",
    "mainMenuLink": "/corporate-hub",
    "subMenu": [
      {
        "subMenuText": "Classifications",
        "subMenuIcon": "./assets/media/icons/git-merge-outline.svg",
        "subMenuLink": "/classification",
        "subMenuTooltip": "",
        "isLink": false,
        "subMenu": [
          {
            "subMenuText": "Subsidiary",
            "subMenuIcon": "./assets/media/icons/git-merge-outline.svg",
            "subMenuLink": "/subsidiary",
            "apiLink": "core-hr/organisation/subsidiary",
            "subMenuTooltip": "",
            "isLink": true,
            "id": 4
          },
          {
            "subMenuText": "Jurisdiction",
            "subMenuIcon": "./assets/media/icons/hammer-outline.svg",
            "subMenuLink": "/jurisdiction",
            "apiLink": "core-hr/organisation/jurisdiction",
            "subMenuTooltip": "",
            "isLink": true,
            "id": 5
          },
          {
            "subMenuText": "Location",
            "subMenuIcon": "./assets/media/icons/location-outline.svg",
            "subMenuLink": "/location",
            "apiLink": "core-hr/organisation/location",
            "subMenuTooltip": "",
            "isLink": true,
            "id": 6
          },
          {
            "subMenuText": "Department",
            "subMenuIcon": "./assets/media/icons/business-outline.svg",
            "subMenuLink": "/department",
            "apiLink": "core-hr/organisation/department",
            "subMenuTooltip": "",
            "isLink": true,

            "id": 7
          },
          {
            "subMenuText": "Business Verticals",
            "subMenuIcon": "./assets/media/icons/person-circle-outline.svg",
            "subMenuLink": "/business-verticals",
            "apiLink": "core-hr/organisation/class",
            "subMenuTooltip": "",
            "isLink": true,
            "id": 8
          }
        ],
        "id": 3
      },
      {
        "subMenuText": "Employee Engagement",
        "subMenuIcon": "./assets/media/icons/employee-engagement.svg",
        "subMenuLink": "/employee-engagement",
        "subMenuTooltip": "",
        "isLink": false,
        "subMenu": [
          {
            "subMenuText": "Announcements",
            "subMenuIcon": "./assets/media/icons/megaphone-outline.svg",
            "subMenuLink": "/announcements",
            "subMenuTooltip": "",
            "apiLink": "core-hr/organisation/announcement",
            "isLink": true,
            "id": 10
          },
          {
            "subMenuText": "Poll & Survey",
            "subMenuIcon": "./assets/media/icons/polls-survey.svg",
            "subMenuLink": "/polls-and-survey",
            "subMenuTooltip": "",
            "isLink": true,
            "id": 11
          }
        ],
        "id": 9
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
        "subMenuText": "Policy & Handbooks",
        "subMenuIcon": "./assets/media/icons/policy-handbook.svg",
        "subMenuLink": "/policy-and-handbook",
        "apiLink": "core-hr/organisation/policy-handbook",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 13
      },
      {
        "subMenuText": "Company Settings",
        "subMenuIcon": "./assets/media/icons/settings-outline.svg",
        "subMenuLink": "/company-setting",
        "subMenuTooltip": "",
        "isLink": false,
        "subMenu": [
          {
            "subMenuText": "Company Banking",
            "subMenuIcon": "./assets/media/icons/bank-outline.svg",
            "subMenuLink": "/employer-bank-details",
            "apiLink": "core-hr/organisation/employer-bank-detail",
            "subMenuTooltip": "",
            "isLink": true,
            "id": 15
          },
        ],
        "id": 14
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
            "id": 18
          }
        ],
        "id": 17
      }
    ],
    "id": 2
  },
  {
    "mainMenuText": "Employee Hub",
    "mainMenuIcon": "./assets/media/icons/people-outline.svg",
    "mainMenuTooltip": "Employee Hub",
    "mainMenuColor": "purple",
    "mainMenuLink": "/employee-hub",
    "subMenu": [
      {
        "subMenuText": "Employee Profiles",
        "subMenuIcon": "./assets/media/icons/people-outline.svg",
        "subMenuLink": "/profiles",
        "subMenuTooltip": "",
        "isLink": false,
        "subMenu": [
          {
            "subMenuText": "Employee",
            "subMenuIcon": "./assets/media/icons/people-outline.svg",
            "subMenuLink": "/employee",
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
            }],
            "id": 21
          },
          {
            "subMenuText": "Payroll Enrollment",
            "subMenuIcon": "./assets/media/icons/cash-outline.svg",
            "subMenuLink": "/payroll-enrollment",
            "subMenuTooltip": "",
            "apiLink": "core-hr/employee",
            "isLink": true,
            "subMenu": [],
            "id": 22
          },
          {
            "subMenuText": "Dependents",
            "subMenuIcon": "./assets/media/icons/key-outline.svg",
            "subMenuLink": "/dependents",
            "subMenuTooltip": "",
            "isLink": true,
            "subMenu": [],
            "id": 23
          }
        ],
        "id": 20
      },
      {
        "subMenuText": "Manage Employee",
        "subMenuIcon": "./assets/media/icons/manage-employee.svg",
        "subMenuLink": "/manage",
        "subMenuTooltip": "",
        "isLink": false,
        "subMenu": [
          {
            "subMenuText": "Employee",
            "subMenuIcon": "",
            "subMenuLink": "/employee",
            "subMenuTooltip": "",
            "id": 25
          },
          {
            "subMenuText": "Subsidiary",
            "subMenuIcon": "",
            "subMenuLink": "/subsidiary",
            "subMenuTooltip": "",
            "id": 26
          },
          {
            "subMenuText": "Manage Salary",
            "subMenuIcon": "",
            "subMenuLink": "/salary",
            "apiLink": "core-hr/employee/manage-salary",
            "subMenuTooltip": "",
            "id": 27
          },
          {
            "subMenuText": "Manage Classification",
            "subMenuIcon": "",
            "subMenuLink": "/classification",
            "apiLink": "core-hr/employee/manage-classification",
            "subMenuTooltip": "",
            "id": 28
          },
          {
            "subMenuText": "Manage Shift",
            "subMenuIcon": "",
            "subMenuLink": "/shift",
            "apiLink": "core-hr/employee/manage-shift-calendar",
            "subMenuTooltip": "",
            "id": 29
          },
          {
            "subMenuText": "Bank Details",
            "subMenuIcon": "",
            "subMenuLink": "/bank-details",
            "subMenuTooltip": "",
            "id": 30
          }
        ],
        "id": 24
      },
      {
        "subMenuText": "Employee Documents",
        "subMenuIcon": "./assets/media/icons/employee-document.svg",
        "subMenuLink": "",
        "subMenuTooltip": "",
        "isLink": false,
        "subMenu": [
          {
            "subMenuText": "Credentials",
            "subMenuIcon": "./assets/media/icons/key-outline.svg",
            "subMenuLink": "/credentials",
            "subMenuTooltip": "",
            "isLink": true,
            "subMenu": [],
            "id": 32
          },
          {
            "subMenuText": "Documents",
            "subMenuIcon": "./assets/media/icons/reader-outline.svg",
            "subMenuLink": "/documents",
            "subMenuTooltip": "",
            "isLink": true,
            "subMenu": [],
            "id": 33
          }
        ],
        "id": 31
      },
      {
        "subMenuText": "Employee Offboard",
        "subMenuIcon": "./assets/media/icons/person-remove-outline.svg",
        "subMenuLink": "/offboard",
        "isLink": false,
        "subMenuTooltip": "",
        "subMenu": [
          {
            "subMenuText": "End of Service Request",
            "subMenuIcon": "",
            "subMenuLink": "/eos-request",
            "apiLink": "core-hr/employee/eos-request",
            "subMenuTooltip": "",
            "id": 35
          },
          {
            "subMenuText": "Employee Exit",
            "subMenuIcon": "",
            "subMenuLink": "/employee-exit",
            "apiLink": "core-hr/employee/eos-request",
            "subMenuTooltip": "",
            "id": 36
          }
        ],
        "id": 34
      },
      {
        "subMenuText": "Work Travel",
        "subMenuIcon": "./assets/media/icons/airplane-outline.svg",
        "subMenuLink": "/travel",
        "subMenuTooltip": "",
        "isLink": false,
        "subMenu": [
          {
            "subMenuText": "Travel Requests",
            "subMenuIcon": "./assets/media/icons/key-outline.svg",
            "subMenuLink": "/requests",
            "subMenuTooltip": "",
            "isLink": true,
            "subMenu": [],
            "id": 38
          },
          {
            "subMenuText": "Travel Expenses",
            "subMenuIcon": "./assets/media/icons/reader-outline.svg",
            "subMenuLink": "/expenses",
            "subMenuTooltip": "",
            "isLink": true,
            "subMenu": [],
            "id": 39
          }
        ],
        "id": 37
      },
      {
        "subMenuText": "Concern Portal",
        "subMenuIcon": "./assets/media/icons/concern-portal.svg",
        "subMenuLink": "/concern-portal",
        "subMenuTooltip": "",
        "isLink": false,
        "subMenu": [
          {
            "subMenuText": "Warning Notices",
            "subMenuIcon": "./assets/media/icons/warning-outline.svg",
            "subMenuLink": "/warnings",
            "subMenuTooltip": "",
            "isLink": true,
            "subMenu": [],
            "id": 41
          },
          {
            "subMenuText": "Grievances",
            "subMenuIcon": "./assets/media/icons/create-outline.svg",
            "subMenuLink": "/grievance",
            "isLink": true,
            "subMenuTooltip": "",
            "subMenu": [],
            "id": 42
          }
        ],
        "id": 40
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
            "id": 44
          },
          {
            "subMenuText": "Employee Status",
            "subMenuIcon": "./assets/media/icons/employee-status.svg",
            "subMenuLink": "/status",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "core-hr/employee/settings",
            "id": 45
          },
          {
            "subMenuText": "Employee Category",
            "subMenuIcon": "./assets/media/icons/grid-outline.svg",
            "subMenuLink": "/category",
            "subMenuTooltip": "",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "apiLink": "core-hr/employee/settings",
            "id": 46
          },
          {
            "subMenuText": "Document Type",
            "subMenuIcon": "./assets/media/icons/document-text-outline.svg",
            "subMenuLink": "/document-type",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "core-hr/employee/settings",
            "id": 47
          },
          {
            "subMenuText": "Bank Account Type",
            "subMenuIcon": "/assets/media/icons/bank-account.svg",
            "subMenuLink": "/bank-account-type",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "core-hr/employee/settings",
            "id": 48
          },
          {
            "subMenuText": "Grade",
            "subMenuIcon": "./assets/media/icons/grade.svg",
            "subMenuLink": "/grade",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "core-hr/employee/settings",
            "id": 49
          },
          {
            "subMenuText": "Designation",
            "subMenuIcon": "./assets/media/icons/briefcase-outline.svg",
            "subMenuLink": "/designation",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "core-hr/employee/settings",
            "id": 50
          },
          {
            "subMenuText": "Pay Structure",
            "subMenuIcon": "./assets/media/icons/card-outline.svg",
            "subMenuLink": "/pay-structure",
            "subMenuTooltip": "",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "apiLink": "core-hr/employee/settings/pay-structure",
            "id": 51
          },
          {
            "subMenuText": "Payment Method",
            "subMenuIcon": "./assets/media/icons/payment-method.svg",
            "subMenuLink": "/payment-method",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "core-hr/employee/settings",
            "id": 52
          },
          {
            "subMenuText": "Air Ticket Entitlement",
            "subMenuIcon": "./assets/media/icons/ticket-outline.svg",
            "subMenuLink": "/air-ticket-entitlement",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "core-hr/employee/settings",
            "id": 53
          },
          {
            "subMenuText": "Employee Leave Plan",
            "subMenuIcon": "./assets/media/icons/calendar-outline.svg",
            "subMenuLink": "/employee-leave-plan",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "core-hr/employee/settings/employee-leave-plan",
            "id": 54
          },
          {
            "subMenuText": "Warning Type",
            "subMenuIcon": "./assets/media/icons/warning-outline.svg",
            "subMenuLink": "/warning-type",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "core-hr/employee/settings",
            "id": 55
          }
        ],
        "id": 43
      }
    ],
    "id": 19
  },
  {
    "mainMenuText": "Time & Attendance",
    "mainMenuIcon": "./assets/media/icons/time-outline.svg",
    "mainMenuTooltip": "Time & Attendance",
    "mainMenuColor": "tangerine",
    "mainMenuLink": "/time-and-attendance",
    "subMenu": [
      {
        "subMenuText": "Attendance Records",
        "subMenuIcon": "./assets/media/icons/checkmark-circle-outline.svg",
        "subMenuLink": "/attendance",
        "apiLink": "time-attendance/attendance",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 57
      },
      {
        "subMenuText": "Work Calendar",
        "subMenuIcon": "./assets/media/icons/calendar-outline.svg",
        "subMenuLink": "/calendar",
        "apiLink": "time-attendance/work-calendar",
        "subMenuTooltip": "",
        "isLink": false,
        "subMenu": [
          {
            "subMenuText": "Calendars",
            "subMenuIcon": "./assets/media/icons/waiver-hour.svg",
            "subMenuLink": "",
            "subMenuTooltip": "",
            "isLink": true,
            "subMenu": [],
            "id": 61
          },
          {
            "subMenuText": "Shifts",
            "subMenuIcon": "./assets/media/icons/shift-scheduler.svg",
            "subMenuLink": "/shift",
            "apiLink": "time-attendance/shift",
            "subMenuTooltip": "",
            "isLink": true,
            "subMenu": [],
            "id": 59
          },
          {
            "subMenuText": "Holidays",
            "subMenuIcon": "./assets/media/icons/image-outline.svg",
            "subMenuLink": "/holiday",
            "subMenuTooltip": "",
            "apiLink": "time-attendance/holiday",
            "isLink": true,
            "subMenu": [],
            "id": 60
          },
          {
            "subMenuText": "Waivers",
            "subMenuIcon": "./assets/media/icons/waiver-hour.svg",
            "subMenuLink": "/waiver",
            "apiLink": "time-attendance/waiver-hour",
            "subMenuTooltip": "",
            "isLink": true,
            "subMenu": [],
            "id": 62
          }
        ],
        "id": 58
      },
      {
        "subMenuText": "Roster Planner",
        "subMenuIcon": "./assets/media/icons/planner-outline.svg",
        "subMenuLink": "/roaster-planner",
        "apiLink": "",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 64
      },
      {
        "subMenuText": "Attendance Settings",
        "subMenuIcon": "./assets/media/icons/settings-outline.svg",
        "subMenuLink": "/settings",
        "apiLink": "",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 65
      }
    ],
    "id": 56
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
        "id": 67
      },
      {
        "subMenuText": "Leave Application",
        "subMenuIcon": "./assets/media/icons/clipboard-outline.svg",
        "subMenuLink": "/leave-application",
        "subMenuTooltip": "",
        "isLink": true,
        "apiLink": "leave/application",
        "subMenu": [],
        "id": 68
      },
      {
        "subMenuText": "Leave Adjustment",
        "subMenuIcon": "./assets/media/icons/calendar-clear-outline.svg",
        "subMenuLink": "/adjustment",
        "subMenuTooltip": "",
        "isLink": true,
        "apiLink": "leave/adjustment",
        "subMenu": [],
        "id": 69
      },
      {
        "subMenuText": "Leave Resumption",
        "subMenuIcon": "./assets/media/icons/leave-resumption-outline.svg",
        "subMenuLink": "/resumption",
        "subMenuTooltip": "",
        "isLink": true,
        "apiLink": "leave/resumption",
        "subMenu": [],
        "id": 70
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
            "id": 72
          }
        ],
        "id": 71
      }
    ],
    "id": 66
  },
  {
    "mainMenuText": "Payroll Management",
    "mainMenuIcon": "./assets/media/icons/wallet-outline.svg",
    "mainMenuTooltip": "Payroll Management",
    "mainMenuColor": "mediumPurple",
    "mainMenuLink": "/payroll",
    "subMenu": [
      {
        "subMenuText": "Payroll Configuration",
        "subMenuIcon": "./assets/media/icons/settings-outline.svg",
        "subMenuLink": "/configuration",
        "isLink": false,
        "subMenuTooltip": "",
        "subMenu": [
          {
            "subMenuText": "Payroll Cycle",
            "subMenuIcon": "",
            "subMenuLink": "/cycle",
            "apiLink": "payroll/setup/cycle",
            "subMenuTooltip": "",
            "id": 75
          },
          {
            "subMenuText": "Payroll Component",
            "subMenuIcon": "",
            "subMenuLink": "/component",
            "apiLink": "payroll/setup/component",
            "subMenuTooltip": "",
            "id": 76
          },
          {
            "subMenuText": "Contracts",
            "subMenuIcon": "",
            "subMenuLink": "/contract",
            "apiLink": "payroll/setup/contract",
            "subMenuTooltip": "",
            "id": 77
          },
          {
            "subMenuText": "Contribution",
            "subMenuIcon": "",
            "subMenuLink": "/contribution",
            "apiLink": "payroll/setup/contribution",
            "subMenuTooltip": "",
            "id": 78
          },
          {
            "subMenuText": "Overtime Setup",
            "subMenuIcon": "",
            "subMenuLink": "/overtime-setup",
            "apiLink": "payroll/setup/overtime-setup",
            "subMenuTooltip": "",
            "id": 79
          },
          {
            "subMenuText": "Tax",
            "subMenuIcon": "",
            "subMenuLink": "/tax",
            "subMenuTooltip": "",
            "id": 80
          },
          {
            "subMenuText": "Benefit",
            "subMenuIcon": "",
            "subMenuLink": "/benefit",
            "subMenuTooltip": "",
            "id": 81
          },
          {
            "subMenuText": "Expense",
            "subMenuIcon": "",
            "subMenuLink": "/expense",
            "subMenuTooltip": "",
            "id": 82
          }
        ],
        "id": 74
      },
      {
        "subMenuText": "Run payroll",
        "subMenuIcon": "./assets/media/icons/folder-outline.svg",
        "subMenuLink": "/run",
        "subMenuTooltip": "",
        "apiLink": "payroll/run/history",
        "isLink": true,
        "subMenu": [
          {
            "subMenuText": "Regular Payroll",
            "subMenuIcon": "",
            "subMenuLink": "/regular",
            "subMenuTooltip": "",
            "id": 120
          },
          {
            "subMenuText": "One Time Payroll",
            "subMenuIcon": "",
            "subMenuLink": "/one-time",
            "subMenuTooltip": "",
            "id": 120
          },
          {
            "subMenuText": "Full & Final Payroll",
            "subMenuIcon": "",
            "subMenuLink": "/full-and-final",
            "subMenuTooltip": "",
            "id": 120
          },

        ],
        "id": 88
      },
      {
        "subMenuText": "Loans & Advances",
        "subMenuIcon": "./assets/media/icons/loan.svg",
        "subMenuLink": "/loan-and-advance",
        "subMenuTooltip": "",
        "isLink": true,
        "apiLink": "payroll/salary-advance",
        "subMenu": [],
        "id": 83
      },
      {
        "subMenuText": "Adjustment Transactions",
        "subMenuIcon": "./assets/media/icons/options-outline.svg",
        "subMenuLink": "/adjustment",
        "subMenuTooltip": "",
        "isLink": true,
        "apiLink": "payroll/adjustment",
        "subMenu": [],
        "id": 84
      },
      {
        "subMenuText": "Deduction Transactions",
        "subMenuIcon": "./assets/media/icons/trending-down-outline.svg",
        "subMenuLink": "/deduction",
        "subMenuTooltip": "",
        "isLink": true,
        "apiLink": "payroll/deduction",
        "subMenu": [],
        "id": 85
      },
      {
        "subMenuText": "Overtime Transactions",
        "subMenuIcon": "./assets/media/icons/time-outline.svg",
        "subMenuLink": "/overtime",
        "subMenuTooltip": "",
        "isLink": true,
        "apiLink": "payroll/overtime",
        "subMenu": [],
        "id": 86
      },
      {
        "subMenuText": "Reimbursement Transactions",
        "subMenuIcon": "./assets/media/icons/reload-circle-outline.svg",
        "subMenuLink": "/overtime",
        "subMenuTooltip": "",
        "isLink": true,
        "apiLink": "payroll/overtime",
        "subMenu": [],
        "id": 86
      },
      {
        "subMenuText": "Time-Off Adjustment",
        "subMenuIcon": "./assets/media/icons/stopwatch-outline.svg",
        "subMenuLink": "/time-off-adjustment",
        "subMenuTooltip": "",
        "isLink": true,
        "apiLink": "payroll/time-off-adjustment",
        "subMenu": [],
        "id": 87
      },
      {
        "subMenuText": "Intermedialry Table Summary",
        "subMenuIcon": "./assets/media/icons/folder-outline.svg",
        "subMenuLink": "/intermediary-table",
        "subMenuTooltip": "",
        "isLink": true,
        "apiLink": "payroll/intermediary-table",
        "subMenu": [],
        "id": 89
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
            "id": 91
          },
          {
            "subMenuText": "Component Mapping",
            "subMenuIcon": "./assets/media/icons/document-text-outline.svg",
            "subMenuLink": "/component-mapping",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "payroll/settings/transaction-component-mapping",
            "id": 92
          },
          {
            "subMenuText": "Employee OT Matrix",
            "subMenuIcon": "./assets/media/icons/apps-outline.svg",
            "subMenuLink": "/employee-ot-matrix",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "payroll/settings/employee-ot-matrix",
            "id": 93
          },
          {
            "subMenuText": "EOS Sub Type",
            "subMenuIcon": "./assets/media/icons/log-out-outline.svg",
            "subMenuLink": "/eos-sub-type",
            "subMenuInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt",
            "subMenuTooltip": "",
            "apiLink": "payroll/settings/eos-sub-type",
            "id": 94
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
        "id": 90
      }
    ],
    "id": 73
  },
  {
    "mainMenuText": "System Configuration",
    "mainMenuIcon": "./assets/media/icons/settings-outline.svg",
    "mainMenuTooltip": "System Configuration",
    "mainMenuColor": "softPink",
    "mainMenuLink": "/system-configuration",
    "subMenu": [
      {
        "subMenuText": "Roles & Permissions",
        "subMenuIcon": "./assets/media/icons/lock-closed-outline.svg",
        "subMenuLink": "/roles-and-permissions",
        "apiLink": "setup/access/roles",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 97
      },
      {
        "subMenuText": "Approval Workflows",
        "subMenuIcon": "./assets/media/icons/copy-outline.svg",
        "subMenuLink": "/approval-workflows",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 96
      },
      {
        "subMenuText": "Charts Of Accounts",
        "subMenuIcon": "./assets/media/icons/accounts-document.svg",
        "subMenuLink": "/charts-of-accounts",
        "apiLink": "payroll/setup/chart-of-accounts",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 98
      },
      {
        "subMenuText": "Language Library",
        "subMenuIcon": "./assets/media/icons/globe-outline.svg",
        "subMenuLink": "/language-library",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 99
      },
      {
        "subMenuText": "Manage Labels",
        "subMenuIcon": "./assets/media/icons/pricetag-outline.svg",
        "subMenuLink": "/manage-labels",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 100
      }
    ],
    "id": 95
  },
  {
    "mainMenuText": "Reports",
    "mainMenuIcon": "./assets/media/icons/pie-chart-outline.svg",
    "mainMenuTooltip": "Reports",
    "mainMenuColor": "violet",
    "mainMenuLink": "/reports",
    "subMenu":[
      {
        "subMenuText": "All Reports",
        "subMenuIcon": "./assets/media/icons/accounts-document.svg",
        "subMenuLink": "/all",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 101
      },
    ],
    "id": 118
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
        "id": 104
      },
      {
        "subMenuText": "Job Post",
        "subMenuIcon": "./assets/media/icons/receipt-outline.svg",
        "subMenuLink": "/job-post",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 105
      },
      {
        "subMenuText": "Candidate Database",
        "subMenuIcon": "./assets/media/icons/document-text-outline.svg",
        "subMenuLink": "/candidate-database",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 106
      },
      {
        "subMenuText": "Schedule Interview",
        "subMenuIcon": "./assets/media/icons/calendar-outline.svg",
        "subMenuLink": "/schedule-interview",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 107
      },
      {
        "subMenuText": "Candidate Evaluation",
        "subMenuIcon": "./assets/media/icons/assignment-task.svg",
        "subMenuLink": "/candidate-evaluation",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 108
      },
      {
        "subMenuText": "Generate Offer Letter",
        "subMenuIcon": "./assets/media/icons/mail-open-outline.svg",
        "subMenuLink": "/generate-offer-letter",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 109
      },
      {
        "subMenuText": "Setup",
        "subMenuIcon": "./assets/media/icons/settings-outline.svg",
        "subMenuLink": "/setup",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 110
      }
    ],
    "id": 103
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
        "id": 112
      },
      {
        "subMenuText": "Objectives",
        "subMenuIcon": "./assets/media/icons/objectives.svg",
        "subMenuLink": "/objectives",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 113
      },
      {
        "subMenuText": "Key Performing Indicators",
        "subMenuIcon": "./assets/media/icons/bar-chart-outline.svg",
        "subMenuLink": "/key-performing-indicators",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 114
      },
      {
        "subMenuText": "Key Responsibility Area",
        "subMenuIcon": "./assets/media/icons/assignment-task.svg",
        "subMenuLink": "/key-responsibility-area",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 115
      },
      {
        "subMenuText": "Performance Evaluation",
        "subMenuIcon": "./assets/media/icons/performance-evaluation.svg",
        "subMenuLink": "/performance-evaluation",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 116
      },
      {
        "subMenuText": "Setup",
        "subMenuIcon": "./assets/media/icons/settings-outline.svg",
        "subMenuLink": "/setup",
        "subMenuTooltip": "",
        "isLink": true,
        "subMenu": [],
        "id": 117
      }
    ],
    "id": 111
  }
];

export { AliasStrategy, RenamedTabs, Subtab, Tab, tabs };
