import { Validators } from "@angular/forms";
import { DetailsCardMeta, FormMeta, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";


const formSections: Sections = [
  {
    "sectionName": "Resumption Information"
  },
  {
    "sectionName": "Leave Details"
  },
  {
    "sectionName": "Resumption Details"
  }
]

const leaveResuptionFormData : FormMeta ={
  "sectionName": "Resumption Information",
  "labels": [
    {
      "sectionName": "Resumption Information",
      "labelName": {
        "defaultValue": "employeeId",
        "alias": "employee"
      },
      "type": "custom",
      "col": 4,
      "apiLink": "core-hr/employee?leavePlanIdAttr=true",
      "multiple": false,
      "scope":'leaveResumption',
      "required": true,
      "validations": [
        {
          name: "required",
          validator: Validators.required,
          message: "Employee Required"
        }
      ]
    },
    {
      "sectionName": "Leave Details",
      "labelName": {
        "defaultValue": "leaveTypeId",
        "alias": "leaveType"
      },
      "placeholder": "Select Transaction Type",
      "multiple": false,
      "type": "leaveType",
      "col": 4,
      "required": true,
      "validations": [
        {
          name: "required",
          validator: Validators.required,
          message: "Leave Transaction Type Required"
        }
      ]
    },
    {
      "sectionName": "Leave Details",
      "labelName": {
        "defaultValue": "leaveStartDate",
        "alias": "leaveStartDate"
      },
      "type": "text",
      "col": 4,
      "required": true,
      "validations": [
        {
          name: "required",
          validator: Validators.required,
          message: "Leave Start Date Required"
        }
      ]
    },
    {
      "sectionName": "Leave Details",
      "labelName": {
        "defaultValue": "leaveEndDate",
        "alias": "leaveEndDate"
      },
      "type": "text",
      "required": true,
      "col": 4,
      "validations": [
        {
          name: "required",
          validator: Validators.required,
          message: "Leave End Date Required"
        }
      ]
    },
    {
      "sectionName": "Leave Details",
      "labelName": {
        "defaultValue": "leaveDays",
        "alias": "leaveDays"
      },
      "type": "number",
      "col": 4,
      "placeholder": "Enter Leave Days",
      "required": true,
      "validations": [
        {
          name: "required",
          validator: Validators.required,
          message: "Leave Days Required"
        }
      ]
    },
    {
      "sectionName": "Resumption Details",
      "labelName": {
        "defaultValue": "resumeDay",
        "alias": "resumeDay"
      },
      "type": "date",
      "col": 4,
      "required": true,
      "validations": [
        {
          name: "required",
          validator: Validators.required,
          message: "Resume Day Required"
        }
      ]
    },
    {
      "sectionName": "Resumption Details",
      "labelName": {
        "defaultValue": "resumeTypeId",
        "alias": "resumeType"
      },
      "type": "resumeType",
      "col": 4,
      "required": true,
      "validations": [
        {
          name: "required",
          validator: Validators.required,
          message: "Resume Type Required"
        }
      ]
    },
    {
      "sectionName": "Resumption Details",
      "labelName": {
        "defaultValue": "remarks",
        "alias": "remarks"
      },
      "type": "text",
      "col": 4,
      // "required": true,
      // "validations": [
      //   {
      //     name: "required",
      //     validator: Validators.required,
      //     message: "Remarks Required"
      //   }
      // ]
    },
    {
      "sectionName": "Resumption Details",
      "labelName": {
        "defaultValue": "attachment",
        "alias": "attachment"
      },
      "type": "button",
      "col": 4,
    },
    {
      "sectionName": "Resumption Details",
      "labelName": {
        "defaultValue": "status",
        "alias": "transactionStatus"
      },
      "placeholder": "Select status",
      "type": "transactionStatus",
      "jsonListName": "transactionStatus",
      "multiple": false,
      "hide":false,
      "col": 4,
    }
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
const uploadDocumentFormData : FormMeta = {
  "tabName": "uploadDocument",
  "formName": "uploadDocumentForm",
  "labels": [
      {
          "sectionName": "Documents",
          "labelName": {
              "defaultValue": "type",
              "alias": "documentType"
          },
          "placeholder": "Select Document Type",
          "type": "documentType",
          "col": 8,
          "apiLink": "core-hr/employee/settings/document-type",
          "multiple": false,

      },
      {
          "sectionName": "Documents",
          "labelName": {
              "defaultValue": "name",
              "alias": "documentName"
          },
          "placeholder": "Enter Document Name",
          "type": "text",
          "col": 8,
      },
      {
          "sectionName": "Documents",
          "labelName": {
              "defaultValue": "files",
              "alias": "browse"
          },
          "type": "file",
          "col": 8,
      },
  ]
}
const tableMetaData = {
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
      name: "leaveTypeId",
    },
    {
      name: "leaveStartDate",
    },
    {
      name: "leaveEndDate",
    },
    {
      name: "resumeDay",
    },
    {
      name: "status",
    }
  ]
}

const leaveAdjustmentCardMetaData = {
  name: "",
  logo: "",
  labels: [
    // {
    //   labelName: {
    //     defaultValue: "employee",
    //     alias: "employee"
    //   }
    // },
    {
      labelName: {
        defaultValue: "leaveTypeId",
        alias: "leaveType"
      },
      type:"leaveType"
    },
    {
      labelName: {
        defaultValue: "leaveStartDate",
        alias: "leaveStartDate"
      }
    },
    {
      labelName: {
        defaultValue: "leaveEndDate",
        alias: "leaveEndDate"
      }
    },
  ]
}

const detailsCardList: DetailsCardMeta[] = [
  {
    "name": "Leave Resumption Information",
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
          "defaultValue": "leaveType",
          "alias": "leaveType",
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "leaveStartDate",
          "alias": "leaveStartDate",
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "leaveEndDate",
          "alias": "leaveEndDate",
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "leaveDays",
          "alias": "leaveDays",
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "resumeDay",
          "alias": "resumeDay",
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "resumeType",
          "alias": "resumeType",
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "remarks",
          "alias": "remarks",
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "attachment",
          "alias": "attachment",
        },
        "type": "file",
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
          "defaultValue": "leaveAdjustmentId",
          "alias": "leaveAdjustmentId",
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "timeOfAdjustmentId",
          "alias": "timeOfAdjustmentId",
        },
        "type": "text",
      },
    
    ]
  },
]



export { detailsCardList, formSections, leaveAdjustmentCardMetaData, leaveResuptionFormData, tableMetaData, tabsMeta, uploadDocumentFormData };
