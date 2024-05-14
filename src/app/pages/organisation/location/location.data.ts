import { Validators } from "@angular/forms";
import { DetailsCardMeta, FormMeta, TableData, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";
import { DataTable } from "src/app/shared/ui/data-table-list/data-table-list";
// import { DetailsCardMeta } from "src/app/shared/ui/details-card/details-card";
// import { TrazepoidTabsMeta } from "src/app/shared/ui/tab-data-table/trapezoid-tabs";
import { WizardTabs } from "src/app/shared/ui/wizard-tabs/wizard-tabs";

const locationTableMetaData: TableData = {
  isActionColumn: true,
  columns: [

    {
      name: "name"
    },
    {
      name: "parentLocation",
      type: "associatedEntity",
      baseUrl: "/organisation/location",
    },
    {
      name: "subsidiary",
      type: "associatedEntity",
      baseUrl: "/organisation/subsidiary",
    },
    {
      name: "addressLine1"
    },
    {
      name: "state"
    },
    {
      name: "phone"
    }
  ]
}

const detailsCardList: DetailsCardMeta[] = [
  {
    "name": "Location Information",
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
          "defaultValue": "parentLocation",
          "alias": "parentLocation",
        },
        "type": "text",

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
          "defaultValue": "subsidiary",

          "alias": "subsidiary",
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


    ],
    "data": [{
      "name": "UAE",
      "displayName": "Dubai",
      "parentLocation": "Dubai",
      "subsidiary": "Honeycomb"
    }]
  },

  {
    "name": "Address Information",
    "isCollapse": true,
    "isRowWise": false,
    "labels": [
      {
        "labelName": {
          "defaultValue": "addressLine1",

          "alias": "addressLine1",
        },
        "type": "text",


      },

      {
        "labelName": {
          "defaultValue": "addressLine2",

          "alias": "addressLine2",
        },
        "type": "text",

      },
      {
        "labelName": {
          "defaultValue": "city",

          "alias": "city",
        },
        "type": "text",

      },
      {
        "labelName": {
          "defaultValue": "state",

          "alias": "state",
        },
        "type": "text",

      },
      {
        "labelName": {
          "defaultValue": "zip",

          "alias": "zip",
        },
        "type": "text",

      },
      {
        "labelName": {
          "defaultValue": "phone",

          "alias": "phone",
        },
        "type": "phoneNumber",

      },
      {
        "labelName": {
          "defaultValue": "fax",

          "alias": "fax",
        },
        "type": "phoneNumber",

      },


    ],
    "data": [{
      "address line 1": "UAE",
      "address line 2": "UAE",
      "city": "UAE",
      "state": "U",
      "zip": "434433434",
      "phone": "4343434",
      "fax": "132323 ",

    }]
  }

]
const locationWizardTabs: WizardTabs = [
  {
    label: "Location",
    number: 1,
    tabIndex: 0,
  },
  {
    label: "Review",
    number: 2,
    tabIndex: 1,
  }
]
const locationFormSections: Sections = [

  {
    "tabName": "Location",

    "sectionName": "Location Information",
    "sectionDescription": "Enter Location Information"
  },

  {
    "tabName": "Location",

    "sectionName": "Address Information",
    "sectionDescription": "Enter Address Information"
  }

]

const locationFormData: FormMeta =
{
  "tabName": "Location",
  "formName": "locationForm",
  "labels": [
    {
      "sectionName": "Location Information",
      "labelName": {
        "defaultValue": "name",
        "alias": "name"
      },
      "placeholder": "Enter Name",
      "type": "text",
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
      "sectionName": "Location Information",
      "labelName": {
        "defaultValue": "displayName",
        "alias": "displayName"
      },
      "placeholder": "Enter Display Name",
      "type": "text",
      "col": 4,

    },

    {
      "sectionName": "Location Information",
      "labelName": {
        "defaultValue": "parentLocationId",
        "alias": "parentLocationId"
      },
      "placeholder": "Select Parent Location",
      "type": "parentLocation",
      "apiLink": "core-hr/organisation/location",
      "col": 4,
      "options": [
        {
          "id": 1,
          "value": "UAE",
        },
        {
          "id": 2,
          "value": "India",
        }
      ]
    },
    {
      "sectionName": "Location Information",
      "labelName": {
        "defaultValue": "country",
        "alias": "country"
      },
      "placeholder": "Select Country",
      "type": "country",
      "col": 4,
      "apiLink": "core-hr/organisation/subsidiary/countries",
      "required": true,
      "validations": [
        {
          name: "required",
          validator: Validators.required,
          message: "Country Required"
        }
      ]
    },

    {
      "sectionName": "Location Information",
      "labelName": {
        "defaultValue": "subsidiary",
        "alias": "subsidiary"
      },
      "placeholder": "Select Subsidiary",
      "col": 4,
      "type": "subsidiary",
      "apiLink": "core-hr/organisation/subsidiary",
      "required": true,
      "validations": [
        {
          name: "required",
          validator: Validators.required,
          message: "Subsidiary Required"
        }
      ],
      "options": [
        {
          "id": 1,
          "value": "Honeycomb"
        },
        {
          "id": 2,
          "value": "Honey"
        },
        {
          "id": 3,
          "value": "Honeycomb"
        },

      ]
    },

    // {
    //   "sectionName": "Location Information",
    //   "labelName": {
    //     "defaultValue": "location is inactive",
    //     "alias": "location is inactive"
    //   },
    //   "type": "checkbox",
    //   "col":4,
    // },

    {
      "sectionName": "Address Information",
      "labelName": {
        "defaultValue": "addressLine1",
        "alias": "addressLine1"
      },
      "placeholder": "Enter Address Line 1",
      "type": "text",
      "col": 4,

    },

    {
      "sectionName": "Address Information",
      "labelName": {
        "defaultValue": "addressLine2",
        "alias": "addressLine2"
      },
      "placeholder": "Eneter Address Line 2",
      "type": "text",
      "col": 4,

    },

    {
      "sectionName": "Address Information",
      "labelName": {
        "defaultValue": "city",
        "alias": "city"
      },
      "placeholder": "Enter City",
      "type": "text",
      "col": 4,

    },

    {
      "sectionName": "Address Information",
      "labelName": {
        "defaultValue": "state",
        "alias": "state"
      },
      "placeholder": "Enter State",
      "type": "text",
      "col": 4,

    },

    {
      "sectionName": "Address Information",
      "labelName": {
        "defaultValue": "zip",
        "alias": "zip"
      },
      "placeholder": "Enter Zip",
      "type": "text",
      "col": 4,

    },

    {
      "sectionName": "Address Information",
      "labelName": {
        "defaultValue": "phone",
        "alias": "phone"
      },
      "placeholder": "Enter Phone Number",
      "type": "phoneNumber",
      "col": 4,

    },

    {
      "sectionName": "Address Information",
      "labelName": {
        "defaultValue": "fax",
        "alias": "fax"
      },
      "placeholder": "Enter Fax Number",
      "type": "phoneNumber",
      "col": 4,

    },
    {
      "sectionName": "Location Information",
      "labelName": {
        "defaultValue": "inactive",
        "alias": "inactive"
      },
      "placeholder": "",
      "type": "toggle",
      "col": 4,
      "default": false,
      "onCreateVisible": false,
      "onEditVisible": true,
    }
  ]
}



const tabsMeta: TrazepoidTabsMeta[] = [
  {
    label: "systemNotes", // table name in Database
    tabIndex: 0,
  },

]

const trapezoidTabTableData: DataTable[] = [
  {
    "tableName": "systemNotes",
    "headers": ["SetBy", "Context", "Type", "Field", "Old Value", "New Value"],
    "collectionSize": 3,
    "data": [
      {
        "SetBy": "PPS7286 Anthony",
        "Context": "UI",
        "Type": "Change",
        "Field": "Document Status",
        "Old Value": "Pending Receipt",
        "New Value": "Pending Bill"
      },
      {
        "SetBy": "PPS76567 Rebello",
        "Context": "UI",
        "Type": "Change",
        "Field": "Document Status",
        "Old Value": "Pending Approval",
        "New Value": "Pending Receipt"
      },
      {
        "SetBy": "PPS7286 Anthony",
        "Context": "UI",
        "Type": "Set",
        "Field": "Approved",
        "Old Value": "Pending Receipt",
        "New Value": "Purchase Orders"
      },
      {
        "SetBy": "PPS76567 Rebello",
        "Context": "UI",
        "Type": "Set",
        "Field": "Vendor",
        "Old Value": "Pending Receipt",
        "New Value": "Pending Receipt"
      },
      {
        "SetBy": "PPS76567 Rebello",
        "Context": "UI",
        "Type": "Change",
        "Field": "Send For Approval",
        "Old Value": "Pending Receipt",
        "New Value": "Pending Receipt"
      }
    ]
  },

]

const locationCardMetaData = {
  name: "",
  logo: "",
  labels: [
    {
      labelName: {
        defaultValue: "city",
        alias: "city"
      }
    },
    {
      labelName:{
          defaultValue:"country",
          alias:"country"
      },
      type:'text'
  },
    {
      labelName: {
        defaultValue: "subsidiary",
        alias: "subsidiary"
      }
    },
    {
      labelName: {
        defaultValue: "state",
        alias: "state"
      }
    },
  ]
}


export { detailsCardList, locationCardMetaData, locationFormData, locationFormSections, locationTableMetaData, locationWizardTabs, tabsMeta, trapezoidTabTableData };

