import { Validators } from "@angular/forms";
import { DetailsCardMeta, FormMeta, ResponseFilterMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";

const formSections: Sections = [
  {
    "sectionName": "Attendance Information"
  }
]

const attendanceFormData: FormMeta =
{
  "sectionName": "Attendance Information",
  "labels": [
    {
      "sectionName": "Attendance Information",
      "labelName": {
        "defaultValue": "employeeId",
        "alias": "employee"
      },
      "type": "employee",
      "placeholder": "Select Employee",
    },
    {
      "sectionName": "Attendance Information",
      "labelName": {
        "defaultValue": "date",
        "alias": "date"
      },
      "type": "date",
      "placeholder": "YYYY-MM-DD",
    },
    {
      "sectionName": "Attendance Information",
      "labelName": {
        "defaultValue": "calendarDay",
        "alias": "day"
      },
      "type": "calendarDay",
      "placeholder": "Choose Employee To Populate Value",
      "jsonListName": 'calendarDay',
      "required": true,
      "validations": [
        {
          name: "required",
          validator: Validators.required,
          message: "Days Required"
        }
      ]
    },
    {
      "sectionName": "Attendance Information",
      "labelName": {
        "defaultValue": "firstTimeIn",
        "alias": "firstTimeIn"
      },
      "type": "hour",
      "col": 2,
      "placeholder": "HH:MM",
    },
    {
      "sectionName": "Attendance Information",
      "labelName": {
        "defaultValue": "lastTimeOut",
        "alias": "lastTimeOut"
      },
      "type": "hour",
      "col": 2,
      "placeholder": "HH:MM",
    },
    {
      "sectionName": "Attendance Information",
      "labelName": {
        "defaultValue": "actualHour",
        "alias": "actualHours"
      },
      "type": "time",
      "col": 1,
      "placeholder": "HH:MM",
    },
    {
      "sectionName": "Attendance Information",
      "labelName": {
        "defaultValue": "workCalendarId",
        "alias": "workCalendar"
      },
      "type": "workCalendar",
      "apiLink": "time-attendance/work-calendar",
      "offset": 3,
      "placeholder": "Choose Employee To Populate Value",
      "required": true,
      "validations": [
        {
          name: "required",
          validator: Validators.required,
          message: "Days Required"
        }
      ]
    },
    {
      "sectionName": "Attendance Information",
      "labelName": {
        "defaultValue": "shiftId",
        "alias": "shift"
      },
      "type": "shift",
      "apiLink": "time-attendance/shift",
      "placeholder": "Choose Employee To Populate Value",
      "multiple": false,
      "required": true,
      "validations": [
        {
          name: "required",
          validator: Validators.required,
          message: "Days Required"
        }
      ]
    },
    {
      "sectionName": "Attendance Information",
      "labelName": {
        "defaultValue": "standardHour",
        "alias": "standardHours"
      },
      "type": "time",
      "placeholder": "HH:MM",
    },
    {
      "sectionName": "Attendance Information",
      "labelName": {
        "defaultValue": "breakHour",
        "alias": "breakHours"
      },
      "type": "time",
      "placeholder": "HH:MM",
    },
    {
      "sectionName": "Attendance Information",
      "labelName": {
        "defaultValue": "waiverHour",
        "alias": "waiverHours"
      },
      "type": "time",
      "placeholder": "HH:MM",
    },
    {
      "sectionName": "Attendance Information",
      "labelName": {
        "defaultValue": "totalHour",
        "alias": "totalHours"
      },
      "type": "time",
      "placeholder": "HH:MM",
    },
    {
      "sectionName": "Attendance Information",
      "labelName": {
        "defaultValue": "overtimeHour",
        "alias": "overtimeHours"
      },
      "type": "time",
      "placeholder": "HH:MM",
    },
    {
      "sectionName": "Attendance Information",
      "labelName": {
        "defaultValue": "lessHourWorked",
        "alias": "lessHourWorked"
      },
      "type": "time",
      "placeholder": "HH:MM",
    },
    {
      "sectionName": "Attendance Information",
      "labelName": {
        "defaultValue": "attendanceStatus",
        "alias": "attendanceStatus"
      },
      "type": "attendanceStatus",
      "required": true,
      "validations": [
        {
          name: "required",
          validator: Validators.required,
          message: "Status Required"
        }
      ],
      "placeholder": "Select Attendance Status",
      "jsonListName": 'attendanceStatus',
      "multiple": false,
    },
    {
      "sectionName": "Attendance Information",
      "labelName": {
        "defaultValue": "attachment",
        "alias": "attachment"
      },
      "type": "file",
    },
    {
      "sectionName": "Attendance Information",
      "labelName": {
        "defaultValue": "reason",
        "alias": "reason"
      },
      "type": "text",
      "placeholder": "Enter Reason",
    },
    {
      "sectionName": "Attendance Information",
      "labelName": {
        "defaultValue": "status",
        "alias": "transactionStatus"
      },
      "placeholder": "Select status",
      "type": "transactionStatus",
      "jsonListName": "transactionStatus",
      "multiple": false,
      "hide": false
    },
  ]
}

const employeeFilterMeta :ResponseFilterMeta =
{
    "labels": [
        {
            "sectionName": "Employee filter",
            "labelName": {
                "defaultValue": "subsidiaryId",
                "alias": "Subsidiary    "
            },
            "apiLink": "core-hr/organisation/subsidiary",
            "multiple": true,
        },
        {
            "sectionName": "Employee filter",
            "labelName": {
                "defaultValue": "jurisdictionId",
                "alias": "Jurisdiction    "
            },
            "apiLink": "core-hr/organisation/jurisdiction",
            "multiple": true,
        }, {
            "sectionName": "Employee filter",
            "labelName": {
                "defaultValue": "locationId",
                "alias": "Location    "
            },
            "apiLink": "core-hr/organisation/location",
            "multiple": true,
        }, {
            "sectionName": "Employee filter",
            "labelName": {
                "defaultValue": "departmentId",
                "alias": "Department    "
            },
            "apiLink": "core-hr/organisation/department",
            "multiple": true,
        }, {
            "sectionName": "Employee filter",
            "labelName": {
                "defaultValue": "classId",
                "alias": "Class"
            },
            "apiLink": "core-hr/organisation/class",
            "multiple": true,
        }
    ]
}



const tableMetaData = {
  isActionColumn: true,
  imageColumn: 'employee',
  columns: [
    {
      name: "employee",
      type: "employee",
    },
    {
      name: "date",
    },
    {
      name: "firstTimeIn",
    },
    {
      name: "lastTimeOut",
    },
    {
      name: "workCalendar"
    },
    {
      name: "shift"
    },
    {
      name: "status"
    }
  ]
}

const attendanceCardMetaData = {
  name: "",
  logo: "",
  labels: [
    {
      labelName: {
        defaultValue: "date",
        alias: "date"
      }
    },
    {
      labelName: {
        defaultValue: "firstTimeIn",
        alias: "firstTimeIn"
      }
    },
    {
      labelName: {
        defaultValue: "lastTimeOut",
        alias: "lastTimeOut"
      }
    },
  ]
}

const detailsCardList: DetailsCardMeta[] = [
  {
    "name": "Attendance Information",
    "isCollapse": true,
    "isRowWise": false,
    "labels": [
      {
        "labelName": {
          "defaultValue": "employee",
          "alias": "",
        },
        "type": "employee",
        "col": 6,
        "custom": false
      },
      {
        "labelName": {
          "defaultValue": "date",
          "alias": "date",
        },
        "type": "date",
        "col": 6,
        "custom": false
      },
      {
        "labelName": {
          "defaultValue": "calendarDay",
          "alias": "days",
        },
        "type": "text",
        "col": 6,
        "custom": false
      },
      {
        "labelName": {
          "defaultValue": "firstTimeIn",
          "alias": "firstTimeIn",
        },
        "type": "text",
        "custom": true,
        "templateName": "customElement",
        "col": 2
      },
      {
        "labelName": {
          "defaultValue": "lastTimeOut",
          "alias": "lastTimeOut",
        },
        "type": "text",
        "custom": true,
        "templateName": "customElement",
        "col": 2
      },
      {
        "labelName": {
          "defaultValue": "actualHour",
          "alias": "actualHour",
        },
        "type": "time",
        "custom": true,
        "templateName": "customElement",
        "col": 1
      },
      {
        "labelName": {
          "defaultValue": "workCalendar",
          "alias": "workCalendar",
        },
        "type": "text",
        "col": 6,
        "custom": false
      },
      {
        "labelName": {
          "defaultValue": "shift",
          "alias": "shift",
        },
        "type": "text",
        "col": 6,
        "custom": false
      },
      {
        "labelName": {
          "defaultValue": "overtimeHour",
          "alias": "overtimeHour",
        },
        "type": "time",
        "col": 6,
        "custom": false
      },
      {
        "labelName": {
          "defaultValue": "lessHourWorked",
          "alias": "lessHourWorked",
        },
        "type": "time",
        "col": 6,
        "custom": false
      },
      {
        "labelName": {
          "defaultValue": "attendanceStatus",
          "alias": "attendanceStatus",
        },
        "type": "text",
        "col": 6,
        "custom": false
      },
      {
        "labelName": {
          "defaultValue": "reason",
          "alias": "reason",
        },
        "type": "text",
        "col": 6,
        "custom": false
      },
      {
        "labelName": {
          "defaultValue": "attachment",
          "alias": "attachment",
        },
        "col": 6,
        "type": "file",
      },
      {
        "labelName": {
          "defaultValue": "overtimeReference",
          "alias": "overtimeReference",
        },
        "type": "associatedEntity",
        "col": 6,
        "custom": false
      },
      {
        "labelName": {
          "defaultValue": "leaveAdjustmentRefernce",
          "alias": "leaveAdjustmentReferenceId",
        },
        "type": "associatedEntity",
        "col": 6,
        "custom": false
      },
      {
        "labelName": {
          "defaultValue": "timeOffAdjustmentRefernce",
          "alias": "timeOffAdjustmentReference",
        },
        "type": "associatedEntity",
        "col": 6,
        "custom": false
      },
      {
        "labelName": {
          "defaultValue": "status",
          "alias": "status",
        },
        "type": "text",
        "col": 6,
        "custom": false
      },
    ]
  },
]

const tabsMeta = [
  {
    label: "approvalDetails", // table name in Database
    tabIndex: 0,
  },
  {
    label: "systemNotes", // table name in Database
    tabIndex: 1,
  },
]

export { attendanceCardMetaData, attendanceFormData, detailsCardList, formSections, employeeFilterMeta,tableMetaData, tabsMeta };

