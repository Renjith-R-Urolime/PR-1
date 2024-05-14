import { Validators } from "@angular/forms";
import { DetailsCardMeta, FormMeta, TableData, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";
import { DataTable } from "src/app/shared/ui/data-table-list/data-table-list";

import { WizardTabs } from "src/app/shared/ui/wizard-tabs/wizard-tabs";
const jurisdictionTableData: DataTable = {
  tableName: "jurisdiction",
  headers: ["name", "country", "currency", "subsidiary"],
  collectionSize: 3,
  data: [
    {
      name: "Jurisdiction 1",
      country: "Country A",
      currency: "Currency A",
      subsidiary: "Subsidiary A"
    },
    {
      name: "Jurisdiction 2",
      country: "Country B",
      currency: "Currency B",
      subsidiary: "Subsidiary B"
    },
    {
      name: "Jurisdiction 3",
      country: "Country C",
      currency: "Currency C",
      subsidiary: "Subsidiary C"
    }
  ]
};
const juriTableMetaData :TableData= {
  isActionColumn: true,
  columns:[

    {
      name: "name"
    },
    {
      name: "country"
    },
    {
      name: "currency"
    },
    {
      name: "subsidiary",
      type: "associatedEntity",
      baseUrl: "/organisation/subsidiary",
    }
  ]
}
const tabsMeta: TrazepoidTabsMeta[] = [
  {
    label: "systemNotes", // table name in Database
    tabIndex: 0,
  },
  // {
  //   label: "activityLogs",
  //   tabIndex: 1,
  // }
]
const trapezoidTabTableData: DataTable[] = [
  {
    "tableName": "systemNotes",
    "headers": ["setBy", "context", "type", "field", "oldValue", "newValue"],
    "collectionSize": 3,
    "data": [
      {
        "setBy": "John Doe",
        "context": "Subsidiary",
        "type": "Update",
        "field": "name",
        "oldValue": "ABC Corporation",
        "newValue": "XYZ Corporation"
      },
      {
        "setBy": "Jane Smith",
        "context": "Subsidiary",
        "type": "Create",
        "field": "country",
        "oldValue": null,
        "newValue": "United Kingdom"
      },
      {
        "setBy": "Michael Johnson",
        "context": "Subsidiary",
        "type": "Delete",
        "field": "phone",
        "oldValue": "+1 123-456-7890",
        "newValue": null
      }
    ]
  },
  // {
  //   "tableName": "activityLogs",
  //   "headers": ["timestamp", "user", "activity", "details"],
  //   "collectionSize": 3,
  //   "data": [
  //     {
  //       "timestamp": "2023-05-25T14:30:00Z",
  //       "user": "John Doe",
  //       "activity": "Login",
  //       "details": "Logged in to the system"
  //     },
  //     {
  //       "timestamp": "2023-05-25T15:45:12Z",
  //       "user": "Jane Smith",
  //       "activity": "Create",
  //       "details": "Created a new subsidiary"
  //     },
  //     {
  //       "timestamp": "2023-05-26T09:20:05Z",
  //       "user": "Michael Johnson",
  //       "activity": "Update",
  //       "details": "Updated the legal name of a subsidiary"
  //     }
  //   ]
  // }
]
const jurisdictionWizardTabs: WizardTabs = [
  {
    label: "Jurisdiction",
    number: 1,
    tabIndex: 0,
  },
  {
    label: "Review",
    number: 2,
    tabIndex: 1,
  }
]
const jurisdictionFormSections: Sections = [
  {
    "tabName": "Jurisdiction",
    "sectionName": "Jurisdiction Details",
    "sectionDescription": "Enter Jurisdiction Details"
  }
]
const jurisdictionFormData : FormMeta =
  {
    "tabName": "Jurisdiction",
    "formName": "jurisdictionForm",
    "labels": [
      {
        "sectionName": "Jurisdiction Details",
        "labelName": {
          "defaultValue": "name",
          "alias": "name"
        },
        "placeholder": "Enter Name",
        "type": "text",
        "col":4,
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Name Required"
          }
        ]
      },
      {
        "sectionName": "Jurisdiction Details",
        "labelName": {
          "defaultValue": "displayName",
          "alias": "displayName"
        },
        "placeholder": "Enter Display Name",
        "type": "text",
        "col":4,
      },
      {
        "sectionName": "Jurisdiction Details",
        "labelName": {
          "defaultValue": "country",
          "alias": "country"
        },
        "placeholder": "Select Country",
        "col":4,
        "multiple": false,
        "jsonListName": 'country',
        "type": "country"
      },
      {
        "sectionName": "Jurisdiction Details",
        "labelName": {
          "defaultValue": "currency",
          "alias": "currency"
        },
        "placeholder": "Select Currency",
        "col":4,
        "jsonListName": 'currency',
        "type": "currency",
        "multiple": false,
        "disable":false,
        "fieldDisable":true
      },
      {
        "sectionName": "Jurisdiction Details",
        "labelName": {
          "defaultValue": "subsidiary",
          "alias": "subsidiary"
        },
        "placeholder": "Select Subsidiary",
        "col":4,
        "type": "subsidiary",
        "apiLink": "core-hr/organisation/subsidiary",
        "required":true,
        "multiple": true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Subsidiary Required"
          }
        ]
      },
      {
        "sectionName": "Jurisdiction Details",
        "labelName": {
          "defaultValue": "inactive",
          "alias": "inactive"
        },
        "placeholder": "",
        "col":4,
        "type": "toggle",
        "default":false,
        "onCreateVisible": false,
        "onEditVisible": true,
      }
    ]
  }
const detailsCardList: DetailsCardMeta[] = [
  {
    "name": "Jurisdiction Details",
    "isCollapse": true,
    "isRowWise": false,
    "labels": [
      {
        "labelName": {
          "defaultValue": "name",
          "alias": "name",
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "displayName",
          "alias": "displayName",
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "country",
          "alias": "country",
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "currency",
          "alias": "currency",
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "subsidiary",
          "alias": "subsidiary",
        },
        "type": "associatedEntity",
        "baseUrl": "/organisation/subsidiary"
      },

      {
        "labelName": {
          "defaultValue": "inactive",
          "alias": "status"
        },
        "type": "status",
      }
    ],
    "data": [{
      "name": "Jurisdiction 1",
      "country": "Country A",
      "currency": "Currency A",
      "subsidiary": "Subsidiary A"
    }]
  },
]
const jurisdictionCardMetaData={
  name:"",
  logo:"",
  labels:[
      {
          labelName:{
              defaultValue:"currency",
              alias:"currency"
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
export { detailsCardList, juriTableMetaData, jurisdictionCardMetaData, jurisdictionFormData, jurisdictionFormSections, jurisdictionTableData, jurisdictionWizardTabs, tabsMeta, trapezoidTabTableData };

