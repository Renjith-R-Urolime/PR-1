import { Validators } from "@angular/forms";
import { DetailsCardMeta, FormMeta, TableData, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";
import { DataTable } from "src/app/shared/ui/data-table-list/data-table-list";
// import { DetailsCardMeta } from "src/app/shared/ui/details-card/details-card";
// import { TrazepoidTabsMeta } from "src/app/shared/ui/tab-data-table/trapezoid-tabs";
import { WizardTabs } from "src/app/shared/ui/wizard-tabs/wizard-tabs";
const subsidiaryTableData: DataTable = {
  "tableName": "subsidiaries",
  "headers": ["name", "parentSubsidiary", "website", "country", "legalName", "phone"],
  "empImageYesorNo": true, // Set to true to enable image display
  "collectionSize": 5,
}
// View Details Card
const detailsCardMeta: DetailsCardMeta[] = [
  {
    "name": "Subsidiary Information",
    "isCollapse": true,
    "labels": [
      {
        "labelName": {
          "defaultValue": "logo",
          "alias": "logo"
        },
        "type": "logo",
        "row": 2
      },
      {
        "labelName": {
          "defaultValue": "name",
          "alias": "name"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "displayName",
          "alias": "displayName"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "legalName",
          "alias": "legalName"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "parentSubsidiary",
          "alias": "parentSubsidiary"
        },
        "type": "associatedEntity",
        "baseUrl": "/organisation/subsidiary"
      },
      {
        "labelName": {
          "defaultValue": "website",
          "alias": "website"
        },
        "type": "url",
      },
      {
        "labelName": {
          "defaultValue": "country",
          "alias": "country"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "currency",
          "alias": "currency"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "vatRegistrationNo",
          "alias": "VAT Registration No",
          "labelTransformationCancelled":true
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "inactive",
          "alias": "status"
        },
        "type": "status",
      }
    ]
  },
  {
    "name": "Address Information",
    "isCollapse": true,
    labels:[
      {
        "labelName": {
          "defaultValue": "addressLine1",
          "alias": "addressLine1"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "addressLine2",
          "alias": "addressLine2"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "city",
          "alias": "city"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "state",
          "alias": "state"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "zip",
          "alias": "zip"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "phone",
          "alias": "phone"
        },
        "type": "phoneNumber",
      },
      {
        "labelName": {
          "defaultValue": "fax",
          "alias": "fax"
        },
        "type": "phoneNumber",
      },
      {
        "labelName": {
          "defaultValue": "timezone",
          "alias": "timezone"
        },
        "type": "text",
      },

    ]
  }
];
const wizardTabs: WizardTabs = [
  {
    label: "Subsidiary",
    number: 1,
    tabIndex: 0,
  },
  {
    label: "Review",
    number: 2,
    tabIndex: 1,
  }
]
const formSections: Sections = [
  {
    "tabName": "Subsidiary",
    "sectionName": "Subsidiary Information",
    "sectionDescription": "Enter Subsidiary Information"
  },
  {
    "tabName": "Subsidiary",
    "sectionName": "Address Information",
    "sectionDescription": ""
  },
  {
    "tabName": "Subsidiary",
    "sectionName": "Formatting",
    "sectionDescription": ""
  }
]
// Create- Edit Form
const subsidiaryFormData : FormMeta =
  {
    "tabName": "Subsidiary",
    "formName": "subsidiaryForm",
    "labels": [
      {
        "sectionName": "Subsidiary Information",
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
        "sectionName": "Subsidiary Information",
        "labelName": {
          "defaultValue": "displayName",
          "alias": "displayName"
        },
        "type": "text",
        "placeholder": "Enter Display Name",
        "col":4,
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Display Name Required"
          }
        ]
      },
      {
        "sectionName": "Subsidiary Information",
        "labelName": {
          "defaultValue": "legalName",
          "alias": "legalName"
        },
        "placeholder": "Enter Legal Name",
        "type": "text",
        "col":4
      },
      {
        "sectionName": "Subsidiary Information",
        "labelName": {
          "defaultValue": "parentSubsidiaryId",
          "alias": "parentSubsidiaryId"
        },
        "placeholder": "Select Parent Subsidiary",
        "type": "subsidiary",
        "apiLink": "core-hr/organisation/subsidiary",
        "col":4
      },
      {
        "sectionName": "Subsidiary Information",
        "labelName": {
          "defaultValue": "logo",
          "alias": "logo"
        },
        "type": "file",
        "col":4
      },
      {
        "sectionName": "Subsidiary Information",
        "labelName": {
          "defaultValue": "website",
          "alias": "website"
        },
        "placeholder": "Enter Website",
        "type": "url",
        "col":4
      },
      {
        "sectionName": "Subsidiary Information",
        "labelName": {
          "defaultValue": "country",
          "alias": "country"
        },
        "placeholder": "Select Country",
        "type": "country",
        "col":4,
        "jsonListName": "country",
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Country Required"
          }
        ]
      },
      {
        "sectionName": "Subsidiary Information",
        "labelName": {
          "defaultValue": "currency",
          "alias": "currency"
        },
        "placeholder": "Select Currency",
        "type": "currency",
        "jsonListName":"currency",
        "options": [
          {
            "id": 1,
            "value": "AED",
          },
          {
            "id": 2,
            "value": "INR",
          }
        ],
        "col":4,
        "disable":false,
        "fieldDisable":true
      },
      {
        "sectionName": "Subsidiary Information",
        "labelName": {
          "defaultValue": "timezone",
          "alias": "timezone"
        },
        "placeholder": "Select Timezone",
        "type": "timezone",
        "jsonListName": "timezone",
        "col":4,
        "disable":false,
        "fieldDisable":true
      },
      {
        "sectionName": "Subsidiary Information",
        "labelName": {
          "defaultValue": "vatRegistrationNo",
          "alias": "VAT Registration No"
        },
        "placeholder": "Enter VAT Reg. Number",
        "type": "text",
        "labelTransformationCancelled":true,
        "col":4
      },
      {
        "sectionName": "Address Information",
        "labelName": {
          "defaultValue": "addressLine1",
          "alias": "addressLine1"
        },
        "placeholder": "Enter Address line 1",
        "type": "text",
        "col":4
      },
      {
        "sectionName": "Address Information",
        "labelName": {
          "defaultValue": "addressLine2",
          "alias": "addressLine2"
        },
        "placeholder": "Enter Address line 2",
        "type": "text",
        "col":4
      },
      {
        "sectionName": "Address Information",
        "labelName": {
          "defaultValue": "city",
          "alias": "city"
        },
        "placeholder": "Enter City",
        "type": "text",
        "col":4
      },
      {
        "sectionName": "Address Information",
        "labelName": {
          "defaultValue": "state",
          "alias": "state"
        },
        "placeholder": "Enter State",
        "type": "text",
        "col":4
      },
      {
        "sectionName": "Address Information",
        "labelName": {
          "defaultValue": "zip",
          "alias": "zip"
        },
        "placeholder": "Enter Zip Code",
        "type": "text",
        "col":4
      },
      {
        "sectionName": "Address Information",
        "labelName": {
          "defaultValue": "phone",
          "alias": "phone"
        },
        "placeholder": "Enter Phone Number",
        "type": "phoneNumber",
        "col":4,
        "min":0
      },
      {
        "sectionName": "Address Information",
        "labelName": {
          "defaultValue": "fax",
          "alias": "fax"
        },
        "placeholder": "Enter Fax Number",
        "type": "phoneNumber",
        "col":4,
        "min":0
      },
      {
        "sectionName": "Subsidiary Information",
        "labelName": {
          "defaultValue": "inactive",
          "alias": "inactive"
        },
        "placeholder": "",
        "type": "toggle",
        "col":4,
        "default":false,
        "onCreateVisible": false,
        "onEditVisible": true,
      },
      {
        "sectionName": "Formatting",
        "labelName": {
          "defaultValue": "timeFormat",
          "alias": "timeFormat"
        },
        "placeholder": "Select Time Format",
        "type": "timeFormat",
        "col":4,
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Time Format Required"
          }
        ]
      },
      {
        "sectionName": "Formatting",
        "labelName": {
          "defaultValue": "dateFormat",
          "alias": "dateFormat"
        },
        "placeholder": "Select Date Format",
        "type": "dateFormat",
        "col":4,
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Date Format Required"
          }
        ]
      },
      {
        "sectionName": "Formatting",
        "labelName": {
          "defaultValue": "decimalPlace",
          "alias": "decimalPlace"
        },
        "placeholder": "Select Date Format",
        "type": "decimalPlace",
        "col":4,
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Decimal Preference Required"
          }
        ]
      },
      // {
      //   "sectionName": "Subsidiary Information",
      //   "labelName": {
      //     "defaultValue": "Subsidiary is Inactive",
      //     "alias": "Subsidiary is Inactive"
      //   },
      //   "type": "checkbox",
      //   "col":4
      // }
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
        "details": "Created a new subsidiary"
      },
      {
        "timestamp": "2023-05-26T09:20:05Z",
        "user": "Michael Johnson",
        "activity": "Update",
        "details": "Updated the legal name of a subsidiary"
      }
    ]
  }
]
const systemInformation = [
  {
    "setBy":"072 Mustafa",
    "context":"UI",
    "type":"Change",
    "changes":[
      {
        "oldValue":"Subsidiary 70",
        "newValue":"My Subsidiary"
      },
      {
        "oldValue":"Subsidiary 10",
        "newValue":"Sub 20"
      }
    ]
  }
]
const cardMetaData={
  name:"",
  logo:"",
  labels:[
      {
          labelName:{
              defaultValue:"dayFrom",
              alias:"dayFrom"
          }
      },
      {
          labelName:{
              defaultValue:"lockPeriod",
              alias:"lockPeriod"
          }
      },
  ]
}
const subsidiariesCardMetaData={
  name:"",
  logo:"",
  labels:[
      {
          labelName:{
              defaultValue:"country",
              alias:"country"
          },
          type:'text'
      },
      {
          labelName:{
              defaultValue:"currency",
              alias:"currency"
          },
          type:'text'
      },
      {
          labelName:{
              defaultValue:"website",
              alias:"website"
          },
          type:'url'
      },
  ]
}

const tableMetaData: TableData={
    isActionColumn: true,
    columns:[
      {
        name: "name",
        type: "withImage",
        imageKey: "logo"
      },
      {
        name: "parentSubsidiary",
        type: "associatedEntity",
        baseUrl: "/organisation/subsidiary",
      },
      {
        name: "website",
        type: "url",
      },
      {
        name: "country"
      },
      {
        name: "legalName"
      },
      {
        name: "phone",
        type: "phoneNumber",
      },
      {
        name: "fax",
        type: "phoneNumber"
      },
      {
        name: "city"
      },
      {
        name: "state"
      }
    ]
}


export { cardMetaData, detailsCardMeta, formSections, subsidiariesCardMetaData, subsidiaryFormData, subsidiaryTableData, systemInformation, tableMetaData, tabsMeta, trapezoidTabTableData, wizardTabs };

