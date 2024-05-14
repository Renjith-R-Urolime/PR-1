import { Validators } from "@angular/forms";
import { DetailsCardMeta, FormMeta, TableData, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";
import { DataTable } from "src/app/shared/ui/data-table-list/data-table-list";

const tableMetaData:TableData={
  isActionColumn: true,
  columns:[
    {
      name: "code",
    },
    {
      name: "name",
    },
    {
      name: "description",
    },
    {
      name: "accountType",
    },
    {
      name: "subsidiary",
      type: "associatedEntity",
      baseUrl: "/organisation/subsidiary",
    }
  ]
}
const cardMetaData={
  name:"",
  logo:"",
  labels:[
      {
          labelName:{
              defaultValue:"accountType",
              alias:"accountType"
          }
      },
      {
          labelName:{
              defaultValue:"subsidiary",
              alias:"subsidiary"
          }
      },
  ]
}
// View Details Card
const detailsCardMeta: DetailsCardMeta[] = [
  {
    "name": "Charts Of Accounts Information",
    "isCollapse": true,
    "labels": [
      {
        "labelName": {
          "defaultValue": "code",
          "alias": "code"
        },
        "type": "number"
      },
      {
        "labelName": {
          "defaultValue": "name",
          "alias": "name"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "description",
          "alias": "description"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "subAccountOf",
          "alias": "subAccountOf"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "accountType",
          "alias": "accountType"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "subsidiary",
          "alias": "subsidiary"
        },
        "type": "associatedEntity",
      },
    ]
  }
];
const formSections: Sections = [
  {
    "tabName": "Charts of Accounts",
    "sectionName": "Charts of Accounts Information",
    "sectionDescription": "Enter Charts of Accounts Information"
  },
]
// Create- Edit Form
const chartsOfAccountsFormData : FormMeta =
  {
    "tabName": "Charts of Accounts",
    "formName": "chartsOfAccountsForm",
    "labels": [
      {
        "sectionName": "Charts of Accounts Information",
        "labelName": {
          "defaultValue": "code",
          "alias": "code"
        },
        "placeholder": "Enter Code",
        "type": "text",
        "col":4,
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Code Required"
          }
        ]
      },
      {
        "sectionName": "Charts of Accounts Information",
        "labelName": {
          "defaultValue": "name",
          "alias": "name"
        },
        "type": "text",
        "placeholder": "Enter Name",
        "col":4,
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: " Name Required"
          }
        ]
      },
      {
        "sectionName": "Charts of Accounts Information",
        "labelName": {
          "defaultValue": "description",
          "alias": "description"
        },
        "placeholder": "Enter Description",
        "type": "text",
        "col":4
      },
      {
        "sectionName": "Charts of Accounts Information",
        "labelName": {
          "defaultValue": "subAccountId",
          "alias": "subAccountOf"
        },
        "placeholder": "Select Sub Sccount",
        "type": "subAccountOf",
        "col":4,
        "apiLink":"payroll/setup/chart-of-accounts",
        "multiple":true
      },
      {
        "sectionName": "Charts of Accounts Information",
        "labelName": {
          "defaultValue": "accountType",
          "alias": "accountType"
        },
        "placeholder": "Select Account Type",
        "type": "accountType",
        "col":4,
        "jsonListName":'accountType',
        "multiple":false
      },
      {
        "sectionName": "Charts of Accounts Information",
        "labelName": {
          "defaultValue": "subsidiary",
          "alias": "subsidiary"
        },
        "placeholder": "Select Subsidiary",
        "type": "subsidiary",
        "col":4,
        "apiLink":"core-hr/organisation/subsidiary",
        "multiple":true
      },
    ]
  }
const tabsMeta: TrazepoidTabsMeta []= [
  {
    label: "systemNotes", // table name in Database
    tabIndex: 0,
  }/* ,
  {
    label: "activityLogs",
    tabIndex: 1,
  } */
]
const trapezoidTabTableData: DataTable[] = [
  {
    "tableName": "systemNotes",
    "headers": ["setBy", "context", "type", "field", "oldValue", "newValue"],
    "collectionSize": 3,
    "data": [
      {
        "setBy": "PPS7286 Anthony",
        "context": "UI",
        "type": "Change",
        "field": "name",
        "oldValue": "ABC Corporation",
        "newValue": "XYZ Corporation"
      },
      {
        "setBy": "PPS76567 Rebello",
        "context": "UI",
        "type": "Change",
        "field": "country",
        "oldValue": null,
        "newValue": "United Kingdom"
      },
      {
        "setBy": "PPS7286 Anthony",
        "context": "UI",
        "type": "Set",
        "field": "phone",
        "oldValue": "+1 123-456-7890",
        "newValue": null
      },
      {
        "setBy": "Michael Johnson",
        "context": "UI",
        "type": "Set",
        "field": "phone",
        "oldValue": "+1 123-456-7890",
        "newValue": null
      },
      {
        "setBy": "Michael Johnson",
        "context": "UI",
        "type": "Change",
        "field": "phone",
        "oldValue": "+1 123-456-7890",
        "newValue": null
      }
    ]
  },
]

const chartsAccountTypeList = [
  { "id": 1, "name": "Expense" },
  { "id": 2, "name": "Bank" },
  { "id": 3, "name": "Accounts Payable" },
  { "id": 4, "name": "Other Current Liability" },
  { "id": 5, "name": "Current Asset" },
  { "id": 6, "name": "Loans and Advances" },
  { "id": 7, "name": "Accounts Receivables" },
  { "id": 8, "name": "Provisions" }
]

const coaCardMetaData={
  name:"",
  logo:"",
  labels:[
      {
          labelName:{
              defaultValue:"[accountType]",
              alias:"accountType"
          }
      },
      {
          labelName:{
              defaultValue:"subsidiary",
              alias:"subsidiary"
          }
      },
  ]
}


export { cardMetaData, chartsAccountTypeList, chartsOfAccountsFormData, coaCardMetaData, detailsCardMeta, formSections, tableMetaData, tabsMeta, trapezoidTabTableData };

