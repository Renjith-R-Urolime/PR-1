import { Validators } from "@angular/forms";
import { DetailsCardMeta, FormMeta, TableData, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";
import { DataTable } from "src/app/shared/ui/data-table-list/data-table-list";
// import { DetailsCardMeta } from "src/app/shared/ui/details-card/details-card";
// import { TrazepoidTabsMeta } from "src/app/shared/ui/tab-data-table/trapezoid-tabs";
const manageSalaryTableData: DataTable = {
  "tableName": "subsidiaries",
  "headers": ["name", "parentmanageSalary", "website", "country", "legalName", "phone"],
  "empImageYesorNo": true, // Set to true to enable image display
  "collectionSize": 5,
}
// View Details Card
const detailsCardMeta: DetailsCardMeta[] = [
  {
    "name": "Manage Salary Information",
    "isCollapse": true,
    "labels": [
      {
        "labelName": {
          "defaultValue": "employee",
          "alias": "employee"
        },
        "type": "employee"
      },
      {
        "labelName": {
          "defaultValue": "effectiveDate",
          "alias": "effectiveDate"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "allocation",
          "alias": "salaryAllocation"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "grossPay",
          "alias": "grossPay"
        },
        "type": "text"
      },

    ]
  },
];

const formSections: Sections = [
  {
    "tabName": "ManageSalary",
    "sectionName": "Manage Salary Information",
    "sectionDescription": "Enter Manage Salary Information"
  }
]
// Create- Edit Form
const manageSalaryFormData: FormMeta =
{
  "tabName": "ManageSalary",
  "formName": "manageSalaryForm",
  "labels": [
    {
      "sectionName": "Manage Salary Information",
      "labelName": {
        "defaultValue": "employeeId",
        "alias": "employee"
      },
      "placeholder": "Enter Employee",
      "type": "employee",
      "apiLink": "core-hr/employee",
      "scope": "timeOffAdjustment",
      "col": 4,
      "required": true,
      "validations": [
        {
          name: "required",
          validator: Validators.required,
          message: "Name Required"
        }
      ]
    },
    {
      "sectionName": "Manage Salary Information",
      "labelName": {
        "defaultValue": "effectiveDate",
        "alias": "effectiveDate"
      },
      "type": "date",
      "placeholder": "Enter Effective Date",
      "col": 4,

    },
    {
      "sectionName": "Manage Salary Information",
      "labelName": {
        "defaultValue": "allocation",
        "alias": "salaryAllocation"
      },
      "placeholder": "Select Salary Allocation",
      "type": "dropDown",
      "jsonListName": "salaryAllocation",

      "col": 4
    },
    /*  {
       "sectionName": "Manage Salary Information",
       "labelName": {
         "defaultValue": "paymentMethod",
         "alias": "paymentMethod"
       },
       "placeholder": "Select Payment Method",
       "type": "paymentMethod",
       // "jsonListName":"salaryAllocationList",
       "apiLink": "core-hr/employee/settings/payment-method",
       "col":4
     }, */
    {
      "sectionName": "Manage Salary Information",
      "labelName": {
        "defaultValue": "grossPay",
        "alias": "grossPay"
      },
      "type": "text",
      "placeholder": "Enter Gross Pay",
      "col": 4

    },

  ]
}
const tabsMeta: TrazepoidTabsMeta[] = [
  {
    label: "employeeSalaryComponentMapping", // table name in Database
    showLabel: "Manage Salary Details",
    tabIndex: 0,
    tableData: {
      isActionColumn: false,
      columns: [
        {
          name: "component",
        },
        {
          name: "oldRate",
        },
        {
          name: "rate",
        }
      ]
    }
  },
  {
    label: "systemNotes", // table name in Database
    tabIndex: 1,
  }
]
const trapezoidTabTableData: DataTable[] = [
  {
    "tableName": "systemNotes",
    "headers": ["setBy", "context", "type", "field", "oldValue", "newValue"],
    "collectionSize": 3,
    "data": [
      {
        "setBy": "John Doe",
        "context": "manageSalary",
        "type": "Update",
        "field": "name",
        "oldValue": "ABC Corporation",
        "newValue": "XYZ Corporation"
      },
      {
        "setBy": "Jane Smith",
        "context": "manageSalary",
        "type": "Create",
        "field": "country",
        "oldValue": null,
        "newValue": "United Kingdom"
      },
      {
        "setBy": "Michael Johnson",
        "context": "manageSalary",
        "type": "Delete",
        "field": "phone",
        "oldValue": "+1 123-456-7890",
        "newValue": null
      }
    ]
  },
  {
    "tableName": "activityLogs",
    "headers": ["timestamp", "user", "activity", "details"],
    "collectionSize": 3,
    "data": [
      {
        "timestamp": "2023-05-25T14:30:00Z",
        "user": "John Doe",
        "activity": "Login",
        "details": "Logged in to the system"
      },
      {
        "timestamp": "2023-05-25T15:45:12Z",
        "user": "Jane Smith",
        "activity": "Create",
        "details": "Created a new manageSalary"
      },
      {
        "timestamp": "2023-05-26T09:20:05Z",
        "user": "Michael Johnson",
        "activity": "Update",
        "details": "Updated the legal name of a manageSalary"
      }
    ]
  }
]
const systemInformation = [
  {
    "setBy": "072 Mustafa",
    "context": "UI",
    "type": "Change",
    "changes": [
      {
        "oldValue": "manageSalary 70",
        "newValue": "My manageSalary"
      },
      {
        "oldValue": "manageSalary 10",
        "newValue": "Sub 20"
      }
    ]
  }
]

const tableMetaData: TableData = {
  isActionColumn: true,
  imageColumn: 'employee',
  pathId: "",
  columns: [
    {
      name: "employee",
      type: "employee"
    },
    {
      name: "effectiveDate",
    },
    {
      name: "allocation",
    }
  ]
}

const cardMetaData = {
  name: "",
  logo: "",
  labels: [
    {
      labelName: {
        defaultValue: "effectiveDate",
        alias: "effectiveDate"
      }
    },
    {
      labelName: {
        defaultValue: "allocation",
        alias: "salaryAllocation"
      }
    }
  ]
}
export { cardMetaData, detailsCardMeta, formSections, manageSalaryFormData, manageSalaryTableData, systemInformation, tableMetaData, tabsMeta, trapezoidTabTableData };

