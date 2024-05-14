import { DetailsCardMeta, FormMeta, TableData, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";
import { DataTable } from "src/app/shared/ui/data-table-list/data-table-list";
// import { DetailsCardMeta } from "src/app/shared/ui/details-card/details-card";
// import { TrazepoidTabsMeta } from "src/app/shared/ui/tab-data-table/trapezoid-tabs";
import { WizardTabs } from "src/app/shared/ui/wizard-tabs/wizard-tabs";

const empBankTableMetaData: TableData = {
  isActionColumn: true,
  columns: [
    {
      name: "name"
    },
    // {
    //   name: "serialNo"
    // },
    {
      name: "bankAccountType"
    },

    {
      name: "bankAccountNo"
    },
    {
      name: "ibanNo"
    },
    {
      name: "subsidiary",
      type: "associatedEntity",
      baseUrl: "/organisation/subsidiary",
    }
  ]
}
const cardMetaData = {
  name: "",
  logo: "",
  labels: [
    {
      labelName: {
        defaultValue: "name:",
        alias: "name"
      }
    },
    {
      labelName: {
        defaultValue: "subsidiary",
        alias: "subsidiary"
      }
    },
  ]
}
// View Details Card
const detailsCardMeta: DetailsCardMeta[] = [
  {
    "name": "General Information",
    "isCollapse": true,
    "labels": [
      // {
      //   "labelName": {
      //     "defaultValue": "serialNo",
      //     "alias": "serialNo"
      //   },
      //   "type": "text"
      // },
      {
        "labelName": {
          "defaultValue": "name",
          "alias": "name"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "bankAccountType",
          "alias": "bankAccountType"
        },
        "type": "text",
      },

      {
        "labelName": {
          "defaultValue": "bankAccountNo",
          "alias": "bankAccountNo"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "ibanNo",
          "alias": "ibanNo"
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
          "alias": "subsidiary"
        },
        "type": "associatedEntity",
        "baseUrl": "/organisation/subsidiary"
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
    "labels": [
      {
        "labelName": {
          "defaultValue": "addressLine1",
          "alias": "addressLine1"
        },
        "type": "text"
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
        "type": "text",
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
          "defaultValue": "vatRegistrationNo",
          "alias": "vatRegistrationNo"
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
    ]
  },
  {
    "name": "WPS Information",
    "isCollapse": true,
    "labels": [
      {
        "labelName": {
          "defaultValue": "establishmentNo",
          "alias": "establishmentNo"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "bankRoutingNo",
          "alias": "bankRoutingNo"
        },
        "type": "text",
      }
    ]
  },
]
const employerWizardTabs: WizardTabs = [
  {
    label: "Employer Bank Details",
    number: 1,
    tabIndex: 0,
  },
  {
    label: "Review",
    number: 2,
    tabIndex: 1,
  }
]
const empFormSections: Sections = [
  {
    "tabName": "Employer Bank Details",
    "sectionName": "General Information",
    "sectionDescription": "Enter General Information"
  },
  {
    "tabName": "Employer Bank Details",
    "sectionName": "Address Information",
    "sectionDescription": "Enter Address Information"
  },
  {
    "tabName": "Employer Bank Details",
    "sectionName": "WPS Information",
    "sectionDescription": "Enter WPS Information"
  }
]
const employerFormData: FormMeta =
{
  "tabName": "Employer Bank Details",
  "formName": "employerBankDetailsForm",
  "labels": [
    {
      "sectionName": "General Information",
      "labelName": {
        "defaultValue": "name",
        "alias": "name"
      },
      "placeholder": "Enter Bank Name",
      "type": "text",
      "col": 4,
    },
    // {
    //   "sectionName": "General Information",
    //   "labelName": {
    //     "defaultValue": "serialNo",
    //     "alias": "serialNo"
    //   },
    //   "placeholder": "Enter SNo",
    //   "type": "text",
    //   "col":4
    // },
    {
      "sectionName": "General Information",
      "labelName": {
        "defaultValue": "bankAccountTypeId",
        "alias": "bankAccountType"
      },
      "placeholder": "Select Bank Account Type",
      "type": "accountType",
      "apiLink": 'core-hr/employee/settings/bank-account-type',
      "col": 4,
    },

    {
      "sectionName": "General Information",
      "labelName": {
        "defaultValue": "bankAccountNo",
        "alias": "bankAccountNo"
      },
      "placeholder": "Enter Bank Account Number",
      "type": "text",
      "col": 4
    },
    {
      "sectionName": "General Information",
      "labelName": {
        "defaultValue": "ibanNo",
        "alias": "IBAN_No"
      },
      "placeholder": "Enter IBAN Number",
      "type": "text",
      "col": 4,
      "capitalize": true

    },
    {
      "sectionName": "General Information",
      "labelName": {
        "defaultValue": "country",
        "alias": "country"
      },
      "placeholder": "Select Country",
      "col": 4,
      "multiple": false,
      "apiLink": "core-hr/organisation/subsidiary/countries",
      "type": "country"
    },
    {
      "sectionName": "General Information",
      "labelName": {
        "defaultValue": "subsidiary",
        "alias": "subsidiary"
      },
      "placeholder": "Select Subsidiary",
      "type": "subsidiary",
      "onCreateVisible": true,
      "onEditVisible": true,
      "required": true,
      "multiple": true,
      "apiLink": "core-hr/organisation/subsidiary",
      "col": 4,
    },
    {
      "sectionName": "General Information",
      "labelName": {
        "defaultValue": "currency",
        "alias": "currency"
      },
      "placeholder": "Select Currency",
      "col": 4,
      "jsonListName": 'currency',
      "type": "currency",
      "multiple": false,
      "disable": false,
      "fieldDisable": true
    },
    {
      "sectionName": "Address Information",
      "labelName": {
        "defaultValue": "addressLine1",
        "alias": "addressLine1"
      },
      "placeholder": "Enter Address Line 1",
      "type": "text",
      "col": 4
    },
    {
      "sectionName": "Address Information",
      "labelName": {
        "defaultValue": "addressLine2",
        "alias": "addressLine2"
      },
      "placeholder": "Enter Address Line 2",
      "type": "text",
      "col": 4
    },
    {
      "sectionName": "Address Information",
      "labelName": {
        "defaultValue": "city",
        "alias": "city"
      },
      "placeholder": "Enter City",
      "type": "text",
      "col": 4
    },
    {
      "sectionName": "Address Information",
      "labelName": {
        "defaultValue": "state",
        "alias": "state"
      },
      "placeholder": "Enter State",
      "type": "text",
      "col": 4
    },
    {
      "sectionName": "Address Information",
      "labelName": {
        "defaultValue": "zip",
        "alias": "zip"
      },
      "placeholder": "Enter Zip Code",
      "type": "text",
      "col": 4
    },
    {
      "sectionName": "Address Information",
      "labelName": {
        "defaultValue": "vatRegistrationNo",
        "alias": "vatRegistrationNo"
      },
      "type": "text",
      "col": 4,
      "capitalize": true,
      "exclude": true
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
      "min": 0
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
      "min": 0
    },
    {
      "sectionName": "WPS Information",
      "labelName": {
        "defaultValue": "establishmentNo",
        "alias": "establishmentNo"
      },
      "placeholder": "Enter Establishment Number",
      "type": "text",
      "col": 4
    },
    {
      "sectionName": "WPS Information",
      "labelName": {
        "defaultValue": "bankRoutingNo",
        "alias": "bankRoutingNo"
      },
      "placeholder": "Enter Bank Routing Number",
      "type": "text",
      "col": 4
    },
    {
      "sectionName": "WPS Information",
      "labelName": {
        "defaultValue": "inactive",
        "alias": "inactive"
      },
      "type": "toggle",
      "col": 4,
      "default": false,
      "onCreateVisible": false,
      "onEditVisible": true,
    },
  ]
}
const tabsMeta: TrazepoidTabsMeta[] = [
  {
    label: "systemNotes", // table name in Database
    tabIndex: 0,
  }
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
        "field": "Document Status",
        "oldValue": "Pending Receipt",
        "newValue": "Pending Bill"
      },
      {
        "setBy": "PPS76567 Rebello",
        "context": "UI",
        "type": "Change",
        "field": "Document Status",
        "oldValue": "Pending Approval",
        "newValue": "Pending Receipt"
      },
      {
        "setBy": "PPS7286 Anthony",
        "context": "UI",
        "type": "Set",
        "field": "Approved",
        "oldValue": "Pending Receipt",
        "newValue": "Purchase Orders"
      },
      {
        "setBy": "PPS76567 Rebello",
        "context": "UI",
        "type": "Set",
        "field": "Vendor",
        "oldValue": "Pending Receipt",
        "newValue": "Pending Receipt"
      },
      {
        "setBy": "PPS76567 Rebello",
        "context": "UI",
        "type": "Change",
        "field": "Send For Approval",
        "oldValue": "Pending Receipt",
        "newValue": "Pending Receipt"
      }
    ]
  }
]
const bankAccountTypeList = [
  { "id": 1, "name": "Savings" },
  { "id": 2, "name": "Checkings" },
  { "id": 3, "name": "Current" },
]
const employerBankDetailsCardMetaData = {
  name: "",
  logo: "",
  labels: [
    {
      labelName: {
        defaultValue: "name",
        alias: "name"
      }
    },
    {
      labelName: {
        defaultValue: "subsidiary",
        alias: "subsidiary"
      }
    },
  ]
}
export { bankAccountTypeList, cardMetaData, detailsCardMeta, empBankTableMetaData, empFormSections, employerBankDetailsCardMetaData, employerFormData, employerWizardTabs, tabsMeta, trapezoidTabTableData };

