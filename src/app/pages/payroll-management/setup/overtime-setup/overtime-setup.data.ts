import { Validators } from "@angular/forms"
import { Sections } from "src/app/shared/ui/basic-form/basic-form"
import { DetailsCardMeta, TrazepoidTabsMeta, TableData } from "src/app/shared/meta-interface";





const formSections: Sections = [
  {
    "tabName": "Overtime Setup",
    "sectionName": "Overtime Information"
  }
]

const tableMetaData: TableData = {
  isActionColumn: true,
  columns: [
    {
      name: "name",
    },
    {
      name: "type",
    },
    {
      name: "payrollComponent",
    }
  ]
}







const overtimeSetupFormMeta =
{
  "tabName": "Overtime Setup",
  "formName": "overtimeSetupForm",
  "labels": [
    {
      "sectionName": "Overtime Information",
      "labelName": {
        "defaultValue": "name",
        "alias": "name"
      },
      "type": "text",
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
      sectionName: "Overtime Information",
      labelName: {
        defaultValue: "payrollComponentId",
        alias: "payrollComponent",
      },
      type: "payrollComponent",
      apiLink: "payroll/setup/component",
      fetchCondition: ["type=2", "subType=6"],
      placeholder: "Select Payroll Component",
      col: 4,
      multiple: false,
    },
    {
      sectionName: "Overtime Information",
      labelName: {
        defaultValue: "classificationApplicability",
        alias: "classificationApplicability",
      },
      "type": "classificationApplicability",
      "col": 4,
    },
    {
      sectionName: "Overtime Information",
      labelName: {
        defaultValue: "type",
        alias: "Overtime Type",
      },
      type: "otType",

      placeholder: "Select Overtime type",
      col: 4,
      multiple: false,
    },
    {
      sectionName: "Overtime Information",
      labelName: {
        defaultValue: "calendarDay",
        alias: "calendarDay",
      },
      type: "calendarDay",

      placeholder: "Select",
      col: 4,
      multiple: true,
    },
    {
      sectionName: "Overtime Information",
      labelName: {
        defaultValue: "defineRange",
        alias: "defineRange",
      },
      "type": "defineRange",
      "col": 4,
      hide: true
    },
    {
      sectionName: "Overtime Information",
      labelName: {
        defaultValue: "rate",
        alias: "Overtime Rate"
      },
      type: "decimal",
      maxLength:3,
      hide: true
    },
    {
      sectionName: "Overtime Information",
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
      hide: true

    },

    {
      sectionName: "Overtime Information",
      labelName: {
        defaultValue: "days",
        alias: "days"
      },
      type: "number",
      hide: true,
      max: 366

    },
    {
      sectionName: "Overtime Information",
      labelName: {
        defaultValue: "hour",
        alias: "hour"
      },
      type: "number",
      hide: true,
      max: 24

    },
    {
      sectionName: "Overtime Information",
      labelName: {
        defaultValue: "month",
        alias: "month"
      },
      type: "number",
      hide: true,
      max: 12

    },
    {
      sectionName: "Overtime Information",
      labelName: {
        defaultValue: "maxOt",
        alias: "Maximum Overtime (Hour)"
      },
      "labelTransformationCancelled":true,
      max: 24,
      type: "maxOt",
      hide: true,


    },
    {
      sectionName: "Overtime Information",
      labelName: {
          defaultValue: "overtimeFormulaType",
          alias: "overtimeCalculation"
      },
      type: "overtimeCalculation",
      hide:false

    },
    {
      sectionName: "Overtime Information",
      labelName: {
          defaultValue: "infithraFormula",
          alias: "infithraFormula"
      },
      type: "infithraFormula",
      hide:true
    },

    {
      sectionName: "Overtime Information",
      labelName: {
        defaultValue: "overtimeCalculationCustomFormula",
        alias: "customFormula"
      },
      type: "overtimeCalculationCustomFormula",
      hide:true
    },
    {
      sectionName: "Overtime Information",
      labelName: {
        defaultValue: "payableCycle",
        alias: "payableCycle",
      },
      type: "payableCycle",
      placeholder: "Select Payroll Cycle",
      col: 4,
      multiple: false,

    },
    {
      sectionName: "Overtime Information",
      labelName: {
        defaultValue: "payableCycleDay",
        alias: "day"
      },
      type: "number",
      hide: true,
      max: Infinity

    },
    {
      sectionName: "Overtime Information",
      labelName: {
        defaultValue: "employeeOtMatrix",
        alias: "Employee Overtime Matrix",
      },
      "type": "employeeOtMatrix",
      "col": 4,
      hide: false
    },
    {
      sectionName: "Overtime Information",
      labelName: {
        defaultValue: "isNight",
        alias: "isNight"
      },
      type: "checkbox",
      hide: false

    },
    {
      sectionName: "Overtime Information",
      labelName: {
        defaultValue: "startTime",
        alias: "startTime"
      },
      type: "hour",
      hide: true

    },
    {
      sectionName: "Overtime Information",
      labelName: {
        defaultValue: "endTime",
        alias: "endTime"
      },
      type: "hour",
      hide: true

    },
    {
      sectionName: "Overtime Information",
      labelName: {
        defaultValue: "nightRate",
        alias: "Night Overtime Rate"
      },
      type: "decimal",
      maxLength:3,
      hide: true,

    },

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
const cardMetaData = {
  name: "",
  logo: "",
  labels: [
    {
      labelName: {
        defaultValue: "type",
        alias: "Overtime Type"
      }
    },
    {
      labelName: {
        defaultValue: "payrollComponent",
        alias: "payrollComponent"
      }
    }

  ]
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

const detailsCardMeta: DetailsCardMeta[] = [
  {
    "name": "Overtime Information",
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
          "defaultValue": "payrollComponent",
          "alias": "payrollComponent"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "",
          "alias": ""
        },
        "custom": true,
        "templateName": "classificationApplicability"

      },

      {
        "labelName": {
          "defaultValue": "type",
          "alias": "Overtime Type"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "calendarDay",
          "alias": "calendarDay"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "",
          "alias": ""
        },
        "custom": true,
        "templateName": "defineRange",
      },

      {
        "labelName": {
          "defaultValue": "rate",
          "alias": "Overtime Rate"
        },
        "type": "text",
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
          "defaultValue": "days",
          "alias": "days"
        },
        "type": "number",
      },
      {
        "labelName": {
          "defaultValue": "hour",
          "alias": "hour"
        },
        "type": "number",
      },
      {
        "labelName": {
          "defaultValue": "month",
          "alias": "month"
        },
        "type": "number",
      },
      {
        "labelName": {
          "defaultValue": "maxOt",
          "alias": "MAX Overtime"
        },
        "type": "number",
      },
      // {
      //   "labelName": {
      //     "defaultValue": "overtimeFormula",
      //     "alias": "overTimeCalculation"
      //   },
      //   "type": "text",
      // },
      {
        "labelName": {
          "defaultValue": "",
          "alias": ""
        },
        "custom": true,
        "templateName": "overTimeCalculation",
      },
      {
        "labelName": {
          "defaultValue": "payableCycle",
          "alias": "payableCycle"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "payableCycleDay",
          "alias": "Day"
        },
        "type": "number",
      },
      {
        "labelName": {
          "defaultValue": "isNight",
          "alias": "isNight"
        },
        "type": "checkbox",
      },
      {
        "labelName": {
          "defaultValue": "",
          "alias": ""
        },
        "custom": true,
        "templateName": "employeeOtMatrix",
      },
      {
        "labelName": {
          "defaultValue": "startTime",
          "alias": "startTime"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "endTime",
          "alias": "endTime"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "nightRate",
          "alias": "nightRate"
        },
        "type": "number",
      },

    ]
  }
];


const tabsMeta: TrazepoidTabsMeta[] = [
  {
    label: "systemNotes",
    tabIndex: 1,
  }
]




export { tableMetaData, overtimeSetupFormMeta, formSections, classificationApplicabilityFormMeta, cardMetaData, detailsCardMeta, tabsMeta }

