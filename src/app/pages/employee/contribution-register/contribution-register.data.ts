import { Validators } from "@angular/forms";
import { DetailsCardMeta, FormMeta, TableData, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";


const formSections: Sections = [
    {
        "sectionName": "Contribution Register Information"
    }
]

const contributionRegisterFormData : FormMeta = {
    "sectionName": "Contribution Register Information",
    "labels": [
        {
            "sectionName": "Contribution Register Information",
            "labelName": {
                "defaultValue": "employeeId",
                "alias": "employee"
            },
            "type": "employee",
            "col": 4,

        },
        {
            "sectionName": "Contribution Register Information",
            "labelName": {
                "defaultValue": "contributionTypeId",
                "alias": "contributionType"
            },
            // "apiLink": 'payroll/setup/contribution',
            "multiple":false,
            "type": "contributionType",
            "col": 4,
            "placeholder": "Select Contribution Type",
            "required": true,
            "validations": [
              {
                name: "required",
                validator: Validators.required,
                message: "Contribution Type Required"
              }
            ]
        },
        {
            "sectionName": "Contribution Register Information",
            "labelName": {
                "defaultValue": "isRegistered",
                "alias": "registered"
            },
            "type": "checkbox",
            "col": 2
        },
        {
            "sectionName": "Contribution Register Information",
            "labelName": {
                "defaultValue": "subscriptionReference",
                "alias": "Subscription ID"
            },
            "type": "text",
            "labelTransformationCancelled":true,
            "col": 4,
            "placeholder": "Enter Subscription Reference ID",
            "required": true,
            "hide":true,
            "validations": [
              {
                name: "required",
                validator: Validators.required,
                message: "Subscription Reference Id Required"
              }
            ]
        },
        {
            "sectionName": "Contribution Register Information",
            "labelName": {
                "defaultValue": "subscriptionSalary",
                "alias": "subscriptionSalary"
            },
            "type": "text",
            "col": 4,
            "hide":true,
            "placeholder": "Subscription Salary",

        },
        {
            "sectionName": "Contribution Register Information",
            "labelName": {
                "defaultValue": "effectiveDate",
                "alias": "registerEffectiveDate"
            },
            "type": "date",
            "col": 4,
            "hide":true,
            "required": true,
            "validations": [
              {
                name: "required",
                validator: Validators.required,
                message: "Effective Date Required"
              }
            ]
        },
        {
          "sectionName": "Contribution Register Information",
          "labelName": {
              "defaultValue": "inactiveDate",
              "alias": "registerInactiveDate"
          },
          "type": "date",
          "col": 4,
          hide:true
      },
    ]
}

const contributionregisterCardMetaData={
    name:"",
    logo:"",
    pathId:"",
    rowHandle:"Description",
    queryParams:"employeeId",
    labels:[
        {
            labelName:{
                defaultValue:"contributionType",
                alias:"contributionType"
            }
        },
        {
            labelName:{
                defaultValue:"subscriptionSalary",
                alias:"subscriptionSalary"
            }
        },
        {
            labelName:{
                defaultValue:"effectiveDate",
                alias:"registerEffectiveDate"
            }
        },
    ]
  }

  const detailsCardList: DetailsCardMeta[] = [
    {
      "name": "Contribution Register Details",
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
            "defaultValue": "contributionType",
            "alias": "contributionType",
          },
          "type": "text",
        },
        {
          "labelName": {
            "defaultValue": "isRegistered",
            "alias": "registered",
          },
          "type": "checkbox",
        },
        {
          "labelName": {
            "defaultValue": "subscriptionReference",
            "alias": "subscriptionId",
          },
          "type": "text",
        },
        {
          "labelName": {
            "defaultValue": "employerContribution",
            "alias": "employerContribution",
          },
          "type": "text",
          "custom":true
        },
        {
          "labelName": {
            "defaultValue": "employeeContribution",
            "alias": "employeeContribution",
          },
          "type": "text",
          "custom":true
        },
        {
          "labelName": {
            "defaultValue": "subscriptionSalary",
            "alias": "subscriptionSalary",
          },
          "type": "text",
        },
        {
          "labelName": {
            "defaultValue": "effectiveDate",
            "alias": "registerEffectiveDate",
          },
          "type": "text",
        }
      ]
    },
  ]

  const tabsMeta: TrazepoidTabsMeta []= [
    {
      label: "systemNotes", // table name in Database
      tabIndex: 0,
    },
  ]

  const tableMetaData:TableData= {
    isActionColumn: true,
    imageColumn: 'employee',
    pathId:"",
    queryParams:"employeeId",
    columns:[
      {
        name: "employee",
        type:"employee",
      },
      {
        name: "contributionType",
      },
      {
        name: "subscriptionReference",
      },
      {
        name: "subscriptionSalary",
      },
      {
        name: "effectiveDate"
      }
    ]
  }

export { contributionRegisterFormData, contributionregisterCardMetaData, detailsCardList, formSections, tableMetaData, tabsMeta };

