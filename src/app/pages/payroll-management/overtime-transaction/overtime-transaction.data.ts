import { DetailsCardMeta, ResponseFilterMeta, TableData, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";
// import { DetailsCardMeta } from "src/app/shared/ui/details-card/details-card";
// import { TrazepoidTabsMeta } from "src/app/shared/ui/tab-data-table/trapezoid-tabs";

// interface FormLabelValidation {
//   name: string;
//   validator: any; // You can replace 'any' with a specific validator type if needed
//   message: string;
// }

// type FormConfig = {
//   sectionName: string;
//   labels: {
//     sectionName: string;
//     labelName: {
//       defaultValue: string;
//       alias: string;
//     };
//     check?: boolean;
//     placeholder?: string;
//     col?: number;
//     offset?: number;
//     min?: number;
//     type: string;
//     required?: boolean;
//     validations?: FormLabelValidation[];
//     apiLink?: string;
//     multiple?: boolean;
//     jsonListName?:string
//   }[]
// }

const formSections: Sections = [
  {
    "sectionName": "Overtime Information"
  }
]

const overtimeFormData = {
  "sectionName": "Overtime Information",
  "labels": [
    {
      "sectionName": "Overtime Information",
      "labelName": {
        "defaultValue": "employeeId",
        "alias": "employee"
      },
      "type": "employee",
      "col": 4,
      "apiLink": "core-hr/employee",
      "multiple": false
    },
    {
      "sectionName": "Overtime Information",
      "labelName": {
        "defaultValue": "date",
        "alias": "date"
      },
      "apiLink": '',
      "multiple": false,
      "type": "date",
      "col": 4,
      "placeholder": "YYYY/MM/DD",
    },
    {
      "sectionName": "Overtime Information",
      "labelName": {
        "defaultValue": "days",
        "alias": "days"
      },
      "type": "days",
      "col": 4,
      "jsonListName": "calendarDay",
      "multiple": false
    },
    {
      "sectionName": "Overtime Information",
      "labelName": {
        "defaultValue": "componentId",
        "alias": "componentId"
      },
      "type": "component",
      "col": 4,
      "placeholder": "Select Component",
      "fetchCondition": ['type=2', 'subType=6'],
      "apiLink": "payroll/setup/component",
      "multiple": false
    },
    {
      "sectionName": "Overtime Information",
      "labelName": {
        "defaultValue": "overtimeHour",
        "alias": "overtimeHour"
      },
      "type": "overtimeHour",
      "col": 4,
      "placeholder": "Enter Overtime Hour",
      "max":24
    },
    {
      "sectionName": "Overtime Information",
      "labelName": {
        "defaultValue": "overtimeRate",
        "alias": "overtimeRate"
      },
      "type": "decimal",
      "col": 4,
    },
    {
      "sectionName": "Overtime Information",
      "labelName": {
        "defaultValue": "overtimeAmount",
        "alias": "overtimeAmount"
      },
      "type": "amount",
      "col": 4,
    },
    {
      "sectionName": "Overtime Information",
      "labelName": {
        "defaultValue": "remarks",
        "alias": "remarks"
      },
      "type": "text",
      "col": 4,
    },
    {
      "sectionName": "Overtime Information",
      "labelName": {
        "defaultValue": "status",
        "alias": "transactionStatus"
      },
      "placeholder": "Select status",
      "type": "transactionStatus",
      "jsonListName": "transactionStatus",
      "multiple": false,
      "hide": true
    },
  ]
}

const tabsMeta: TrazepoidTabsMeta[] = [
  {
    label: "approvalDetails", // table name in Database
    tabIndex: 0,
  },
  {
    label: "systemNotes", // table name in Database
    tabIndex: 1,
  },
]

const tableMetaData: TableData = {
  isActionColumn: true,
  imageColumn: 'employee',
  pathId: "",
  queryParams: "",
  columns: [
    {
      name: "employee",
      type: "employee"
    },
    {
      name: "date",
    },
    {
      name: "days",
    },
    {
      name: "component",
    },
    {
      name: "status",
    },
    {
      name: "payrollStatus",
      type: "payrollStatus"
    }
  ]
}

const overtimeTransactionCardMetaData = {
  name: "",
  logo: "",
  labels: [
    // {
    //   labelName: {
    //     defaultValue: "employee",
    //     alias: "employee"
    //   },
    //   type:"employee"
    // },
    {
      labelName: {
        defaultValue: "date",
        alias: "date"
      }
    },
    {
      labelName: {
        defaultValue: "day",
        alias: "day"
      }
    },
    {
      labelName: {
        defaultValue: "component",
        alias: "component"
      }
    },
  ]
}

const detailsCardList: DetailsCardMeta[] = [
  {
    "name": "Overtime Information",
    "isCollapse": true,
    "isRowWise": false,
    "labels": [
      {
        "labelName": {
          "defaultValue": "employee",
          "alias": "",
        },
        "type": "employee",
      },
      {
        "labelName": {
          "defaultValue": "date",
          "alias": "date",
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "days",
          "alias": "days",
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "component",
          "alias": "component",
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "overtimeHour",
          "alias": "overtimeHour",
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "overtimeRate",
          "alias": "overtimeRate",
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "overtimeAmount",
          "alias": "overtimeAmount",
        },
        "type": "amount",
      },
      {
        "labelName": {
          "defaultValue": "status",
          "alias": "status",
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "payrollReferenceID",
          "alias": "payrollReferenceId",
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "attendance",
          "alias": "attendanceId",
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "form",
          "alias": "formId",
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "remarks",
          "alias": "remarks",
        },
        "type": "text",
      }
    ]
  },
]

const employeeFilterMeta: ResponseFilterMeta =
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

export { detailsCardList, formSections, overtimeFormData, overtimeTransactionCardMetaData, tableMetaData, tabsMeta, employeeFilterMeta };
