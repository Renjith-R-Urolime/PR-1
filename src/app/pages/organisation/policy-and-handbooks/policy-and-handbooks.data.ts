import { Validators } from "@angular/forms";
import { DetailsCardMeta, FormMeta, TableData } from "src/app/shared/meta-interface";
import { FieldConfig, Sections } from "src/app/shared/ui/basic-form/basic-form";
import { DataTable } from "src/app/shared/ui/data-table-list/data-table-list";
// import { DetailsCardMeta } from "src/app/shared/ui/details-card/details-card";
import { WizardTabs } from "src/app/shared/ui/wizard-tabs/wizard-tabs";

// const policyHandbooksDataTable: DataTable = {
//   "tableName": "Policy and Handbooks",
//   "headers": ["Title", "Creation Date", "Posted Date", "Distribution Type", "Type"],
//   "collectionSize": 5,
//   "data": [
//     {
//       "Title": "Benefits Enrollment",
//       "Creation Date": "01/02/2023",
//       "Posted Date": "01/02/2023",
//       "Distribution Type": "Class",
//       "Type": "Policy",
//     },
//     {
//       "Title": "Company Policy",
//       "Creation Date": "02/03/2023",
//       "Posted Date": "02/03/2023",
//       "Distribution Type": "Subsidiary",
//       "Type": "Handbook",
//     },
//     {
//       "Title": "His(or Her) Excellency",
//       "Creation Date": "03/04/2023",
//       "Posted Date": "03/04/2023",
//       "Distribution Type": "Department",
//       "Type": "Policy",
//     },

//     {
//       "Title": "N-Freight",
//       "Creation Date": "24/12/2020",
//       "Posted Date": "24/12/2020",
//       "Distribution Type": "Group - Subordinates",
//       "Type": "Policy",
//     },
//     {
//       "Title": "N-Freight",
//       "Creation Date": "31/6/2022",
//       "Posted Date": "31/6/2022",
//       "Distribution Type": "N- Freight - NASA",
//       "Type": "Policy",
//     }
//   ]
// }




// const policyHandbookWizardTabs: WizardTabs = [
//   {
//     label: "Handbook",
//     number: 1,
//     tabIndex: 0,
//   },
//   {
//     label: "Channels",
//     number: 2,
//     tabIndex: 1,
//   },
//   {
//     label: "Review",
//     number: 3,
//     tabIndex: 2,
//   }
// ]
// const policyHandbookFormSections: Sections = [

//   {
//     "tabName": "Handbook",
//     "sectionName": "Handbook Details",
//     "sectionDescription": "Enter Handbook Details"
//   },
//   {
//     "tabName": "Handbook",
//     "sectionName": "Timeline",
//     "sectionDescription": "Enter Start Date and End Date"
//   },

//   {
//     "tabName": "Channels",
//     "sectionName": "Distribution",
//     "sectionDescription": "Select Distribution Channels"
//   },





  // {
  //   "sectionName": "Handbook Details",
  //   "sectionDescription": "Enter Policy And Handbook Details"
  // }


// ]
// const policyHandbookFormData: FieldConfig = [
//   {
//     "tabName": "Handbook",
//     "formName": "policyHandbookForm",
//     "labels": [
//       {
//         "sectionName": "Handbook Details",
//         "labelName": {
//           "defaultValue": "Title",
//           "alias": "Title"
//         },
//         "type": "text",
//         "col": 10
//       },
//       {
//         "sectionName": "Handbook Details",
//         "labelName": {
//           "defaultValue": "File Upload",
//           "alias": "File Upload"
//         },
//         "type": "file",
//         "col": 6
//       },
//       {
//         "sectionName": "Handbook Details",
//         "labelName": {
//           "defaultValue": "Description",
//           "alias": "Description"
//         },
//         "type": "texteditor",
//         "col": 10
//       },
//       {
//         "sectionName": "Timeline",
//         "labelName": {
//           "defaultValue": "Start Date",
//           "alias": "Start Date"
//         },
//         "type": "date"
//       },
//       {
//         "sectionName": "Timeline",
//         "labelName": {
//           "defaultValue": "End Date",
//           "alias": "End Date"
//         },
//         "type": "date"
//       }

//     ]
//   },

//   {
//     "tabName": "Channels",
//     "formName": "policyHandbookForm",
//     "labels": [
//       {
//         "sectionName": "Distribution",
//         "labelName": {
//           "defaultValue": "Distribution Type",
//           "alias": "Distribution Type"
//         },
//         "type": "select"
//       },
//       {
//         "sectionName": "Distribution",
//         "labelName": {
//           "defaultValue": "Select Department",
//           "alias": "Departments"
//         },
//         "type": "select"
//       },

//     ]
//   }

// ]


const detailsCardList: DetailsCardMeta[] = [
  {
    "name": "Location Details",
    "isCollapse": true,
    "isRowWise": false,
    "labels": [
      {
        "labelName": {
          "defaultValue": "UAE",

          "alias": "Name",
        },
        "type": "text",

      },
      {
        "labelName": {
          "defaultValue": "Dubai",

          "alias": "Parent Location",
        },
        "type": "text",

      },
      {
        "labelName": {
          "defaultValue": "Honeycomb",

          "alias": "Subsidiary",
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
      "name": "Location Details"
    }]
  },

]



const ploicyCardMetaData={
  name:"",
  logo:"",
  labels:[
      {
          labelName:{
              defaultValue:"policyType",
              alias:"policyType"
          }
      },
      {
          labelName:{
              defaultValue:"description",
              alias:"description"
          }
      }
  ]
}

const policyTableMetaData: TableData={
  isActionColumn: true,
  columns:[
    {
      name: "name",
    },
    {
      name: "policyType",
    },
    {
      name: "Description",

    },

  ]
}
const formSections: Sections = [
  {
    "tabName": "Policy & Handbook",
    "sectionName": "Policy & Handbook Information",
    "sectionDescription": "Enter Policy & Handbook Information"
  }
]
// Create- Edit Form
const policyFormData : FormMeta =
  {
    "tabName": "Policy & Handbook",
    "formName": "policyForm",
    "labels": [
      {
        "sectionName": "Policy & Handbook Information",
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
        "sectionName": "Policy & Handbook Information",
        "labelName": {
          "defaultValue": "policyTypeId",
          "alias": "policyTypeId"
        },
        "type": "policyType",
        "placeholder": "Enter Policy Type",
        "apiLink": "core-hr/organisation/settings/policy-type",
        "col":4,
        "required":false,
      },
      {
        "sectionName": "Policy & Handbook Information",
        "labelName": {
          "defaultValue": "attachment",
          "alias": "attachment"
        },
        "type": "file",
        "col":4
      },
      {
        "sectionName": "Policy & Handbook Information",
        "labelName": {
            "defaultValue": "classificationApplicability",
            "alias": "classificationApplicability"
        },
        "type": "classificationApplicability",
        "col": 4,
    },

  {
    "sectionName": "Policy & Handbook Information",
    "labelName": {
        "defaultValue": "notifyUsersViaEmail",
        "alias": "notifyUsersViaEmail"
    },
    "type": "toggle",
    "col": 4,
},
{
  "sectionName": "Policy & Handbook Information",
  "labelName": {
      "defaultValue": "description",
      "alias": "description"
  },
  "type": "editor",
  "col": 6,
},
{
  "sectionName": "Policy & Handbook Information",
  "labelName": {
      "defaultValue": "scheduleFollowUpEmail",
      "alias": "scheduleFollowUpEmail"
  },
  "type": "toggle",
  "col": 12,
},
{
  "sectionName": "Policy & Handbook Information",
  "labelName": {
      "defaultValue": "occurance",
      "alias": " oneTime"
  },
  "type": "radio",
  "col": 2,
},
{
  "sectionName": "Policy & Handbook Information",
  "labelName": {
      "defaultValue": "occurance",
      "alias": " repeat"
  },
  "type": "radio",
  "col": 2,
},
{
  "sectionName": "Policy & Handbook Information",
  "labelName": {
      "defaultValue": "dayFrequency",
      "alias": " every"
  },
  "type": "number",
  "col": 2,
},
{
  "sectionName": "Policy & Handbook Information",
  "labelName": {
      "defaultValue": "time",
      "alias": " dayat"
  },
  "type": "time",
  "col": 3,
},
{
  "sectionName": "Policy & Handbook Information",
  "labelName": {
      "defaultValue": "isAcknowledgement",
      "alias": "acknowledgementRequire"
  },
  "type": "toggle",
  "col": 4,
},
{
  "sectionName": "Policy & Handbook Information",
  "labelName": {
      "defaultValue": "isSignature",
      "alias": "signatureRequire"
  },
  "type": "toggle",
  "col": 4,
},
// {
//   "sectionName": "Policy & Handbook Information",
//   "labelName": {
//     "defaultValue": "inactive",
//     "alias": "inactive"
//   },
//   "placeholder": "",
//   "type": "toggle",
//   "col":4,
//   "default":false,
//   "onCreateVisible": false,
//   "onEditVisible": true,
// }


    ]
    }

    const classificationApplicabilityFormSections: Sections = [
      {
          "tabName": "Classification Applicability",
          "sectionName": "Classification Applicability",
          "sectionDescription": ""
      },
  ]

  const classificationApplicabilityFormMeta = {
      "tabName": "Classification Applicability",
      "formName": "classificationApplicability",
      "labels": [
          {
              "sectionName": "Classification Applicability",
              "labelName": {
                  "defaultValue": "subsidiary",
                  "alias": "subsidiary    "
              },
              "placeholder": "Select Subsidiary",
              "apiLink": "core-hr/organisation/subsidiary",
              "type": "dropdown",
              "multiple": true,
              "col": 8,
          },
          {
              "sectionName": "Classification Applicability",
              "labelName": {
                  "defaultValue": "jurisdiction",
                  "alias": "jurisdiction    "
              },
              "placeholder": "Select Jurisdiction",
              "apiLink": "core-hr/organisation/jurisdiction",
              "type": "dropdown",
              "multiple": true,
              "col": 8,
          }, {
              "sectionName": "Classification Applicability",
              "labelName": {
                  "defaultValue": "location",
                  "alias": "location    "
              },
              "placeholder": "Select Location",
              "type": "dropdown",
              "apiLink": "core-hr/organisation/location",
              "multiple": true,
              "col": 8,
          }, {
              "sectionName": "Classification Applicability",
              "labelName": {
                  "defaultValue": "department",
                  "alias": "department    "
              },
              "placeholder": "Select Department",
              "type": "dropdown",
              "apiLink": "core-hr/organisation/department",
              "multiple": true,
              "col": 8,
          }, {
              "sectionName": "Classification Applicability",
              "labelName": {
                  "defaultValue": "class",
                  "alias": "class    "
              },
              "placeholder": "Select Class",
              "type": "dropdown",
              "apiLink": "core-hr/organisation/class",
              "multiple": true,
              "col": 8,
          }
      ]
  }


export { policyTableMetaData,ploicyCardMetaData, detailsCardList,policyFormData,formSections,classificationApplicabilityFormSections,classificationApplicabilityFormMeta };

