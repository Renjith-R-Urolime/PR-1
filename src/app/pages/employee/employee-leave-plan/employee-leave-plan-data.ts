import { Validators } from "@angular/forms";
import { DetailsCardMeta, FormMeta, TableData, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";
import { DataTable } from "src/app/shared/ui/data-table-list/data-table-list";

const formSections: Sections = [
  {
    "tabName": "employeeLeavePlan",
    "sectionName": "Employee Leave Plan Information",
    "sectionDescription": "Enter Employee Leave Plan Information"
  }
]
const detailsCardList: DetailsCardMeta[] = [
  {
      "name": "Employee Leave Plan Information",
      "isCollapse": true,
      "labels": [
          {
              "labelName": {
                  "defaultValue": "employee",
                  "alias": "employee"
              },
              "type": "employee",
              "col": 4
          },
          {
              "labelName": {
                  "defaultValue": "leavePlan",
                  "alias": "leavePlan"
              },
              "custom": true,
              "col": 4,
        "templateName": "leavePlan",

          },
          {
            "labelName": {
                "defaultValue": "leaveType",
                "alias": "leaveType"
            },
            "custom": true,
            "col": 4,
      "templateName": "leaveType",

        },
          {
            "labelName": {
                "defaultValue": "accruedUpto",
                "alias": "accruedUpto"
            },
            "type": "date",
            "col": 4
        },
        {
          "labelName": {
              "defaultValue": "accrualStartDate",
              "alias": "accrualStartDate"
          },
          "type": "date",
          "col": 4
      },
      {
        "labelName": {
            "defaultValue": "accrualEndDate",
            "alias": "aaccrualEndDate"
        },
        "type": "date",
        "col": 4
    },
    {
      "labelName": {
          "defaultValue": "accrualNextDate",
          "alias": "accrualNextDate"
      },
      "type": "date",
      "col": 4
  },
  {
    "labelName": {
        "defaultValue": "accrualCount",
        "alias": "accrualCount"
    },
    "type": "number",
    "col": 4
},
{
  "labelName": {
      "defaultValue": "status",
      "alias": "status"
  },
  "type": "text",
  "col": 4
},
      ]
  }
]
// Create- Edit Form
const leavePlanFormData: FormMeta =
{
  "tabName": "employeeLeavePlan",
  "formName": "employeeLeavePlanForm",
  "labels": [
    {
      "sectionName": "Employee Leave Plan Information",
      "labelName": {
        "defaultValue": "employeeId",
        "alias": "employee"
      },
      "placeholder": "Enter Employee",
      "type": "employee",
      "apiLink": "core-hr/employee",
      "scope": "leaveApplication",
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
        "sectionName": "Employee Leave Plan Information",
        "labelName": {
          "defaultValue": "leavePlan",
          "alias": "leavePlan",
        },
        "placeholder": "Enter Leave Plan",
        "type": "text",
        "col": 4,
      },
      {
        "sectionName": "Employee Leave Plan Information",
        "labelName": {
          "defaultValue": "leaveTypeId",
          "alias": "leaveType"
        },
        "placeholder": "Enter Leave Type",
        "type": "leaveType",
        "col": 4
      },
      {
        "sectionName": "Employee Leave Plan Information",
        "labelName": {
            "defaultValue": "accruedUpto",
            "alias": "accruedUpto"
        },
        "type": "date",
        "col": 4
    },
      {
        "sectionName": "Employee Leave Plan Information",
        "labelName": {
            "defaultValue": "accrualStartDate",
            "alias": "accrualStartDate"
        },
        "type": "date",
        "col": 4
    },
    {
        "sectionName": "Employee Leave Plan Information",
        "labelName": {
            "defaultValue": "aaccrualEndDate",
            "alias": "accrualEndDate"
        },
        "type": "date",
        "col": 4
    },
    {
        "sectionName": "Employee Leave Plan Information",
        "labelName": {
            "defaultValue": "accrualNextDate",
            "alias": "nextAccrualDate"
        },
        "type": "date",
        "col": 4
    },
    {
        "sectionName": "Employee Leave Plan Information",
        "labelName": {
            "defaultValue": "accrualCount",
            "alias": "accrualCount"
        },
        "type": "number",
        "col": 4
    },
    {
        "sectionName": "Employee Leave Plan Information",
        "labelName": {
            "defaultValue": "status",
            "alias": "status"
        },
        "type": "employeeLeavePlanStatus",
        "jsonListName":"employeeLeavePlanStatus",
        "col": 4
    }

  ]
}

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
      name: "leavePlan",
      custom: true,
      template: 'leavePlan_temp'
    },
    {
      name: "leaveType",
    },
    {
        name: "status",
    }
  ]
}

const cardMetaData = {
  name: "",
  logo: "",
  labels: [
    {
      labelName: {
        defaultValue: "leavePlan",
        alias: "leavePlan"
      },
      custom: true,
      template: 'leavePlan_temp'
    },
    {
      labelName: {
        defaultValue: "leaveType",
        alias: "leaveType"
      }
    },
    {
        labelName: {
          defaultValue: "status",
          alias: "status"
        }
    }
  ]
}
export { cardMetaData, formSections, tableMetaData,leavePlanFormData ,detailsCardList};

