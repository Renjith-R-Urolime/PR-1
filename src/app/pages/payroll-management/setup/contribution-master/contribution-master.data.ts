

import { Validators } from "@angular/forms";
import { DetailsCardMeta, TrazepoidTabsMeta, TableData } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";


const formSections: Sections = [

  {
    "tabName": "Contribution Information",
    "sectionName": "Contribution Information",
    "sectionDescription": "Enter Contribution Information"
  }
]


const contributionMasterFormData = {
  tabName: "Contribution Information",
  formName: "contributionMasterForm",
  labels: [
    {
      sectionName: "Contribution Information",
      labelName: {
        defaultValue: "name",
        alias: "name",
      },
      placeholder: "Enter Name",
      type: "text",
      required: true,
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Name Required",
        },
      ],
    },
    {
      sectionName: "Contribution Information",
      labelName: {
        defaultValue: "baseComponent",
        alias: "baseComponent",
      },
      type: "baseComponent",
      apiLink: "payroll/setup/component",
      fetchCondition: ["type=1", "subType=1"],
      placeholder: "Select Base Component",
      col: 4,
      multiple: true,
    },
    {
      sectionName: "Contribution Information",
      labelName: {
        defaultValue: "payrollComponentId",
        alias: "payrollComponent",
      },
      type: "payrollComponent",
      placeholder: "Select Pay Roll Component",
      apiLink: "payroll/setup/component",
      fetchCondition: ["type=1", "subType=2"],


      col: 4,
      multiple: false,
    },
    {
      sectionName: "Contribution Information",
      labelName: {
        defaultValue: "debitAccountId",
        alias: "debitAccount",
      },
      type: "dropdown",
      placeholder: "Select Employer Debit Account",
      apiLink: "payroll/setup/chart-of-accounts",

      col: 4,
      multiple: false,
    },
    {
      sectionName: "Contribution Information",
      labelName: {
        defaultValue: "creditAccountId",
        alias: "creditAccount",
      },
      type: "dropdown",
      placeholder: "Select Employer Credit Account",
      apiLink: "payroll/setup/chart-of-accounts",

      col: 4,
      multiple: false,
    },
    {
      sectionName: "Contribution Information",
      labelName: {
        defaultValue: "classificationApplicability",
        alias: "classificationApplicability",
      },
      "type": "formDrawer",
      "col": 4,
    },
    {
      sectionName: "Contribution Information",
      labelName: {
        defaultValue: "salaryThreshold",
        alias: "salaryThreshold",
      },
      placeholder: "Enter Salary threshold",
      "col": 4,
      type: "decimal",
    },
    {
      sectionName: "Contribution Information",
      labelName: {
        defaultValue: "ageThreshold",
        alias: "ageThreshold",
      },
      placeholder: "Enter Age threshold",
      type: "decimal",
      "col": 4,
    },
    {
      "sectionName": "Contract Master Information",
      "labelName": {
        "defaultValue": "defineRange",
        "alias": "defineRange"
      },
      "type": "toggle",
      "col": 4,
    },
    {
      "sectionName": "Contribution Information",
      "labelName": {
        "defaultValue": "inactive",
        "alias": "inactive"
      },
      "col": 4,
      "type": "toggle",
      "onCreateVisible": false,
      "onEditVisible": true,
    },
  ],
};

const cardMetaData = {
  name: "",
  logo: "",
  labels: [
    {
      labelName: {
        defaultValue: "payrollComponent",
        alias: "payrollComponent"
      }
    },
    {
      labelName: {
        defaultValue: "debitAccount",
        alias: "debitAccount"
      }
    },
    {
      labelName: {
        defaultValue: "creditAccount",
        alias: "creditAccount"
      }
    },
  ]
}


const classificationApplicabilityFormData = {
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
      "type": "subsidiary",
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
////////////////////////////////////////////////////////////////////////////////////////////////////

const detailsCardMeta: DetailsCardMeta[] = [
  {
    "name": "Contribution Information",
    "isCollapse": true,
    "labels": [
      {
        "labelName": {
          "defaultValue": "name",
          "alias": "name"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "baseComponent",
          "alias": "baseComponent",
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "payrollComponent",
          "alias": "payrollComponent"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "debitAccount",
          "alias": "debitAccount"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "creditAccount",
          "alias": "creditAccount"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "creditAccount",
          "alias": " "
        },
        "custom": true,
      }
    ]
  },


]


const tableMetaData: TableData = {
  isActionColumn: true,
  pathId: "",
  columns: [
    {
      name: "name",
    },
    {
      name: "baseComponent",
    },
    {
      name: "payrollComponent",
    },
    {
      name: "debitAccount",
    },
    {
      name: "creditAccount",
    }
  ]
}














const tabsMeta: TrazepoidTabsMeta[] = [
  {
    label: "contributionSetupDetails", // table name in Database
    tabIndex: 0,
    tableData: {
      isActionColumn: false,
      imageColumn: 'abc',
      columns: [
        {
          name: "nationality",
        },
        {
          name: "employerContribution",
          custom: true,
          template: 'employerDetails_temp'
        },
        {
          name: "employeeContribution",
          custom: true,
          template: 'employeeDetails_temp'
        }
      ]
    }
  },
  {
    label: "systemNotes",
    tabIndex: 1,
  }
]
/////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////
const tableFormData = {
  "tabName": "Contribution Information",
  "formName": "contributionMasterForm",
  "labels": [
    {
      "sectionName": "Contribution Information",
      "labelName": {
        "defaultValue": "nationality",
        "alias": "nationality"
      },
      "placeholder": "Select nationality",
      "type": "dropdown",
    },
    {
      "sectionName": "Contribution Information",
      "labelName": {
        "defaultValue": "employerContribution%",
        "alias": "employerContribution"
      },
      "placeholder": "Enter number",
      "type": "decimal",
      "multiple": false
    },
    {
      "sectionName": "Contribution Information",
      "labelName": {
        "defaultValue": "employeeContribution%",
        "alias": "employeeContribution"
      },
      "placeholder": "Enter number",
      "type": "decimal",
      "multiple": false
    },
  ]
}


export { tableMetaData, cardMetaData, classificationApplicabilityFormData, contributionMasterFormData, detailsCardMeta, formSections, tableFormData, tabsMeta };

