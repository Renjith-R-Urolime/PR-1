import { Validators } from "@angular/forms";
import { DetailsCardMeta, FormMeta, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";
import { DataTable } from "src/app/shared/ui/data-table-list/data-table-list";
// import { DetailsCardMeta } from "src/app/shared/ui/details-card/details-card";



const formSections: Sections = [
  {
    "tabName": "Leave Plan",
    "sectionName": "Leave Plan Information",
  },
  {
    "tabName": "Leave Type",
    "sectionName": "Leave Type Information",
  },
  {
    "tabName": "Leave Rule 1",
    "sectionName": "Leave Rule 1 Information",
  },
  {
    "tabName": "Leave Rule 2",
    "sectionName": "Leave Rule 2 Information",
  },
]

// Create- Edit Form
const formMetadata:FormMeta[] =
  [
    {
    "tabName": "Leave Plan",
    "sectionName": "Leave Plan Information",
    "formName": "leavePlanForm",
    "index":0,
    "labels": [
      {
        "sectionName": "Leave Plan Information",
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
        "sectionName": "Leave Plan Information",
        "labelName": {
          "defaultValue": "jurisdictionId",
          "alias": "jurisdiction"
        },
        "type": "jurisdiction",
        "placeholder": "Select Jurisdiction",
        "col":4,
        "apiLink": "core-hr/organisation/jurisdiction",
        "fetchCondition": ['subsidiary=true'],
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Jurisdiction Required"
          }
        ]
      },
      {
        "sectionName": "Leave Plan Information",
        "labelName": {
          "defaultValue": "subsidiary",
          "alias": "subsidiary"
        },
        "type": "subsidiary",
        "placeholder": "Select subsidiary",
        "col":4,
        "fieldDisable":false

      },
      {
        "sectionName": "Leave Plan Information",
        "labelName": {
          "defaultValue": "location",
          "alias": "location"
        },
        "type": "location",
        "apiLink": "core-hr/organisation/location",
        "placeholder": "Select location",
        "col":4,
      },
      {
        "sectionName": "Leave Plan Information",
        "labelName": {
          "defaultValue": "department",
          "alias": "department"
        },
        "apiLink": "core-hr/organisation/department",
        "type": "department",
        "placeholder": "Select department",
        "col":4,
      },
      {
        "sectionName": "Leave Plan Information",
        "labelName": {
          "defaultValue": "class",
          "alias": "class"
        },
        "apiLink": "core-hr/organisation/class",
        "type": "class",
        "placeholder": "Select Class",
        "col":4
      }
    ]
  },
  {
    "tabName": "Leave Type",
    "sectionName": "Leave Type Information",
    "formName": "leaveTypeForm",
    "index":1,
    "labels": [
      {
        "sectionName": "Leave Type Information",
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
        "sectionName": "Leave Type Information",
        "labelName": {
          "defaultValue": "leaveItemType",
          "alias": "itemType"
        },
        "placeholder": "Select Item Type",
        "type": "leaveItemType",
        "jsonListName": "payrollItem",
        "multiple": false,
        "col":4,
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Item Type Required"
          }
        ]
      },
      {
        "sectionName": "Leave Type Information",
        "labelName": {
          "defaultValue": "leavePayType",
          "alias": "leavePayType"
        },
        "placeholder": "Select leave pay type",
        "type": "leavePayType",
        "jsonListName":"leavePayType",
        "multiple": false,
        "col":4,
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Leave Pay Type Required"
          }
        ]
      },
      {
        "sectionName": "Leave Type Information",
        "labelName": {
          "defaultValue": "value",
          "alias": "value"
        },
        "placeholder": "Enter Value",
        "minimum": 0.1,
        "maximum": 0.99,
        "step": 0.01,
        "type": "number",
        "col":4,
        "disable":false,
        "required": true
      },
      {
        "sectionName": "Leave Type Information",
        "labelName": {
          "defaultValue": "entitlementUnit",
          "alias": "entitlementUnit"
        },
        "placeholder": "Select Entitlement unit",
        "type": "entitlementUnit",
        "jsonListName": "entitlementUnit",
        "multiple": false,
        "col":4,
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Entitlement Unit Required"
          }
        ]
      },
      {
        "sectionName": "Leave Type Information",
        "labelName": {
          "defaultValue": "componentId",
          "alias": "component"
        },
        "placeholder": "Select Component",
        "type": "component",
        "apiLink": "payroll/setup/component",
        "fetchCondition": ["type=2", "subType=5"],
        "multiple": false,
        "col":4,
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Component Required"
          }
        ]
      },
      {
        "sectionName": "Leave Type Information",
        "labelName": {
          "defaultValue": "encashmentComponent",
          "alias": "encashComponent"
        },
        "placeholder": "Select Encash Component",
        "type": "encashmentComponent",
        "apiLink": "payroll/setup/component",
        "fetchCondition": ["type=1", "subType=1"],
        "multiple": true,
        "col":4,
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Encash Component Required"
          }
        ]
      }
    ]
  },
  {
    "tabName": "Leave Rule 1",
    "sectionName": "Leave Rule 1 Information",
    "formName": "leaveRule1Form",
    "index":2,
    "labels": [
       {
        "sectionName": "Leave Rule 1 Information",
        "labelName": {
          "defaultValue": "includeWeeklyHoliday",
          "alias": "includeWeekends"
        },
        "type": "checkbox",
        "col":4
      },
      {
        "sectionName": "Leave Rule 1 Information",
        "labelName": {
          "defaultValue": "includeNonWorkingDay",
          "alias": "includeHolidays"
        },
        "type": "checkbox",
        "col":4
      },
      {
        "sectionName": "Leave Rule 1 Information",
        "labelName": {
          "defaultValue": "allowHourly",
          "alias": "allowHourlyLeaves"
        },
        "type": "checkbox",
        "col":4
      },
      {
        "sectionName": "Leave Rule 1 Information",
        "labelName": {
          "defaultValue": "documentMandatory",
          "alias": "documentMandatory"
        },
        "type": "checkbox",
        "col":4,
        "default": false
      },
      {
        "sectionName": "Leave Rule 1 Information",
        "labelName": {
          "defaultValue": "thresholdDays",
          "alias": "thresholdDays"
        },
        "placeholder": "Enter threshold days",
        "type": "number",
        "col":4,
        "disable":false,
        "minimum": 1,
        "maximum": 365,
      },
      /* {
        "sectionName": "Leave Rule 1 Information",
        "labelName": {
          "defaultValue": "documentRule",
          "alias": "documentRule"
        },
        "type": "text",
        "col":4,
        disable:true
      }, */
      {
        "sectionName": "Leave Rule 1 Information",
        "labelName": {
          "defaultValue": "leaveReason",
          "alias": "defaultLeaveReasons"
        },
        "placeholder": "Select Deafult Leave Reason",
        "type": "leaveReason",
        "col":4,
        "apiLink": "leave/settings/leave-reason",
        "multiple": true
      },
      {
        "sectionName": "Leave Rule 1 Information",
        "labelName": {
          "defaultValue": "allowNegativeLeaves",
          "alias": "allowNegativeLeaves"
        },
        "type": "checkbox",
        "col":4,
        "default":false
      },
      {
        "sectionName": "Leave Rule 1 Information",
        "labelName": {
          "defaultValue": "negativeLeaveLimit",
          "alias": "negativeLeaveLimit"
        },
        "type": "number",
        "col":4,
        "disable":false,
        "minimum": 1,
        "maximum": 365,
      },
      {
        "sectionName": "Leave Rule 1 Information",
        "labelName": {
          "defaultValue": "maxLeaveDaysAllowed",
          "alias": "maximumLeaveAllowed"
        },
        "type": "number",
        "col":4,
        "minimum": 0,
        "maximum": 365,
      },
      {
        "sectionName": "Leave Rule 1 Information",
        "labelName": {
          "defaultValue": "genderApplicability",
          "alias": "genderApplicability"
        },
        "multiple": true,
        "type": "genderRestrictions",
        "col":4,
        "jsonListName": "gender",
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Gender Applicability Required"
          }
        ]
      },
      {
        "sectionName": "Leave Rule 1 Information",
        "labelName": {
          "defaultValue": "nationalityApplicability",
          "alias": "nationalityApplicability"
        },
        "multiple": true,
        "type": "nationalityRestrictions",
        "col":4,
        "jsonListName": "nationality",
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Nationality Applicability Required"
          }
        ]
      },
      {
        "sectionName": "Leave Rule 1 Information",
        "labelName": {
          "defaultValue": "religionApplicability",
          "alias": "religionApplicability"
        },
        "multiple": true,
        "type": "religionRestrictions",
        "jsonListName": "religion",
        "col":4,
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Religion Applicability Required"
          }
        ]
      },
      {
        "sectionName": "Leave Rule 1 Information",
        "labelName": {
          "defaultValue": "message",
          "alias": "instructionMessage"
        },
        "type": "textarea",
        "col":4
      }
    ],

  },
  {
    "tabName": "Leave Rule 2",
    "sectionName": "Leave Rule 2 Information",
    "formName": "leaveRule2Form",
    "index":3,
    "labels": [
      {
        "sectionName": "Leave Rule 2 Information",
        "labelName": {
          "defaultValue": "accrualFrequency",
          "alias": "accrualFrequency"
        },
        "placeholder": "Select Accrual Frequency",
        "type": "accrualFrequency",
        "jsonListName": "accrualFrequency",
        "col":4,
        "fetchCondition": ['id!=6'],
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Accrual frequency Required"
          }
        ]
      },
      {
        "sectionName": "Leave Rule 2 Information",
        "labelName": {
          "defaultValue": "accrualType",
          "alias": "accrualType"
        },
        "placeholder": "Select Accrual Type",
        "type": "accrualType",
        "jsonListName": "accrualType",
        "col":4,
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Accrual Type Required"
          }
        ]
      },
      {
        "sectionName": "Leave Rule 2 Information",
        "labelName": {
          "defaultValue": "accrualDay",
          "alias": "day"
        },
        "type": "accrualDays",
        "col":4,
        "disable":false,
        "required":false
      },
      {
        "sectionName": "Leave Rule 2 Information",
        "labelName": {
          "defaultValue": "quotaResetFrequency",
          "alias": "quotaResetFrequency"
        },
        "jsonListName": "accrualFrequency",
        "placeholder": "Select Quota Reset Frequency",
        "type": "quotaResetFrequency",
        "fetchCondition": ['id!=1'],
        "col":4
      },
      {
        "sectionName": "Leave Rule 2 Information",
        "labelName": {
          "defaultValue": "quotaResetType",
          "alias": "quotaResetType"
        },
        "placeholder": "Select Quota Reset Type",
        "jsonListName": "accrualType",
        "type": "quotaResetType",
        "col":4
      },
      {
        "sectionName": "Leave Rule 2 Information",
        "labelName": {
          "defaultValue": "quotaResetDay",
          "alias": "Day"
        },
        "type": "quotaDays",
        "col":4,
        "disable":true
      },
      {
        "sectionName": "Leave Rule 2 Information",
        "labelName": {
          "defaultValue": "entitlementPerPeriod",
          "alias": "entitlementPerPeriod"
        },
        "placeholder": "Enter Entitlement Per Period",
        "type": "entitlementPerPeriod",
        "col":4,
        "required":true
      },
      {
        "sectionName": "Leave Rule 2 Information",
        "labelName": {
          "defaultValue": "allowCarryOver",
          "alias": "allowCarryOver"
        },
        "type": "checkbox",
        "col":4
      },
      {
        "sectionName": "Leave Rule 2 Information",
        "labelName": {
          "defaultValue": "maxCarryOver",
          "alias": "maxCarryOver"
        },
        "placeholder": "Enter Max Carry Over",
        "type": "number",
        "col":4,
        "disable":true,
        "minimum": 1,
        "maximum": 365,
      },
      {
        "sectionName": "Leave Rule 2 Information",
        "labelName": {
          "defaultValue": "allowCarryOverToBeUsedWithin",
          "alias": "carryOverToBeUsedWithin(Days)"
        },
        "type": "number",
        "col":4,
        "disable":true,
        "minimum": 1,
        "maximum": 365,
      },
      {
        "sectionName": "Leave Rule 2 Information",
        "labelName": {
          "defaultValue": "allowNegativeCarryOver",
          "alias": "allowNegativeCarryOver"
        },
        "type": "checkbox",
        "col":4
      },
      {
        "sectionName": "Leave Rule 2 Information",
        "labelName": {
          "defaultValue": "applicableForResumption",
          "alias": "applicableForResumption"
        },
        "type": "checkbox",
        "col":4,
        "default":false
      },
      {
        "sectionName": "Leave Rule 2 Information",
        "labelName": {
          "defaultValue": "resumptionThresholdDays",
          "alias": "thresholdDays"
        },
        "placeholder": "Enter Threshold Days",
        "type": "number",
        "col":4,
        "disable":false,
        "minimum": 1,
        "maximum": 365,
      },
      {
        "sectionName": "Leave Rule 2 Information",
        "labelName": {
          "defaultValue": "applicableForEncashment",
          "alias": "applicableForEncashment"
        },
        "type": "applicableForEncashment",
        "col":4
      },
      {
        "sectionName": "Leave Rule 2 Information",
        "labelName": {
          "defaultValue": "applicableForFullFinal",
          "alias": "applicableForFullFinal"
        },
        "type": "applicableForFullFinal",
        "col":4
      }
    ]
  }
]

const EncashmentFormMeta = [
  {
    "seactionName": "Entitlement Per Period",
    "formName": "entitlementPerPeriodForm",
    "index":1,
    "labels": [
      {
        "labelName": {
          "defaultValue": "applicableAfterEmploymentDays",
          "alias": "applicableAfterEmploymentDays"
        },
        "type": "number",
        "col":12,
        "required":false,
        "minimum": 0,
        "maximum": 365,
      },
      {
        "labelName": {
          "defaultValue": "minimumYear",
          "alias": "minimumYear"
        },
        "placeholder": "Enter Minimum Year",
        "type": "number",
        "col":12,
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Minimum year Required"
          }
        ],
        "minimum": 0,
        "maximum": 365,
      },
      {
        "labelName": {
          "defaultValue": "maximumYear",
          "alias": "maximumYear"
        },
        "placeholder": "Enter Maximum Year",
        "type": "number",
        "col":12,
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Maximum year Required"
          }
        ],
        "minimum": 0,
        "maximum": 365,
      },
      {
        "labelName": {
          "defaultValue": "entitlement",
          "alias": "entitlement"
        },
        "placeholder": "Enter Entitlemnet",
        "type": "number",
        "col":12,
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Entitlement Required"
          }
        ],
        "minimum": 0,
        "maximum": 365,
      }
    ]
  },
  {
    "seactionName": "Applicable For Full & Final",
    "formName": "fullAndFinal",
    "index":2,
    "labels": [
      {
        "labelName": {
          "defaultValue": "isApplicable",
          "alias": "isApplicable"
        },
        "type": "checkbox",
        "col":12,
        "required":false
      },
      {
        "labelName": {
          "defaultValue": "componentId",
          "alias": "component"
        },
        "placeholder": "Select Component",
        "type": "component",
        "apiLink": "payroll/setup/component",
        "fetchCondition": ["type=2", "subType=10"],
        "multiple": false,
        "col":12,
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Component Required"
          }
        ]
        /* "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Name Required"
          }
        ] */
      },
      {
        "labelName": {
          "defaultValue": "encashComponent",
          "alias": "encashmentComponent"
        },
        "placeholder": "Select Components",
        "type": "encashmentComponent",
        "apiLink": "payroll/setup/component",
        "multiple": true,
        "fetchCondition": ["type=1", "subType=1"],
        "col":12,
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Encashment component Required"
          }
        ]
        /* "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Name Required"
          }
        ] */
      },
      {
        "labelName": {
          "defaultValue": "payCalculation",
          "alias": "payCalculation"
        },
        "placeholder": "Select Pay Calculation",
        "type": "payCalculation",
        "col":12,
        "jsonListName":"payCalculation",
        "multiple":false,
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Pay calculation Required"
          }
        ]
        /* "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Name Required"
          }
        ] */
      },
      {
        "labelName": {
          "defaultValue": "maxEncashmentDays",
          "alias": "maxEncashmentDays"
        },
        "placeholder": "Enter Days",
        "type": "number",
        "col":12,
        "required":false,
        "minimum": 0,
        "maximum": 365,
      },
      {
        "labelName": {
          "defaultValue": "afterEmployementDays",
          "alias": "applicableAfterEmploymentDays"
        },
        "placeholder": "Enter Days",
        "type": "number",
        "col":12,
        "required":false,
        "minimum": 0,
        "maximum": 365,
      }
    ]
  },
  {
    "seactionName": "Applicable For Encashment",
    "formName": "encashment",
    "index":3,
    "labels": [
      {
        "labelName": {
          "defaultValue": "isApplicable",
          "alias": "isApplicable"
        },
        "type": "checkbox",
        "col":12,
        "required":false
      },
      {
        "labelName": {
          "defaultValue": "componentId",
          "alias": "component"
        },
        "placeholder": "Select Component",
        "type": "component",
        "apiLink": "payroll/setup/component",
        "multiple": false,
        "col":12,
        "fetchCondition": ["type=2", "subType=5", "payrollItem=1"],
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Component Required"
          }
        ]
        /* "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Name Required"
          }
        ] */
      },
      {
        "labelName": {
          "defaultValue": "encashComponent",
          "alias": "encashmentComponent"
        },
        "placeholder": "Select Components",
        "type": "encashmentComponent",
        "apiLink": "payroll/setup/component",
        "fetchCondition": ["type=1", "subType=1"],
        "multiple": true,
        "col":12,
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Encashment component Required"
          }
        ]
        /* "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Name Required"
          }
        ] */
      },
      {
        "labelName": {
          "defaultValue": "payCalculation",
          "alias": "payCalculation"
        },
        "placeholder": "Select Pay Calculation",
        "type": "payCalculation",
        "col":12,
        "jsonListName":"payCalculation",
        "multiple":false,
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Pay calculation Required"
          }
        ]
        /* "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Name Required"
          }
        ] */
      },
      {
        "labelName": {
          "defaultValue": "maxEncashmentDays",
          "alias": "maxEncashmentDays"
        },
        "placeholder": "Enter Days",
        "type": "number",
        "col":12,
        "required":false,
        "minimum": 0,
        "maximum": 365,
      },
      {
        "labelName": {
          "defaultValue": "afterEmployementDays",
          "alias": "applicableAfterEmploymentDays"
        },
        "placeholder": "Enter Days",
        "type": "number",
        "col":12,
        "required":false,
        "minimum": 0,
        "maximum": 365,
      }
    ]
  }
]
const detailsCardMeta: DetailsCardMeta[] = [
  {
    "name": "Leave Plan Information",
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
          "defaultValue": "jurisdiction",
          "alias": "jurisdiction"
        },
        "type": "associatedEntity",
        "baseUrl": "/core-hr/organisation/jurisdiction",
        "showMore":false
      },
      {
        "labelName": {
          "defaultValue": "subsidiary",
          "alias": "subsidiary"
        },
        "custom": true,
        "templateName": "subsidiary",
        "baseUrl": "/core-hr/organisation/subsidiary",
        "showMore":false
      },
      {
        "labelName": {
          "defaultValue": "location",
          "alias": "location"
        },
        "type": "associatedEntity",
        "baseUrl": "/core-hr/organisation/location",
        "showMore":false

      },
      {
        "labelName": {
          "defaultValue": "class",
          "alias": "class"
        },
        "type": "associatedEntity",
        "baseUrl": "/core-hr/organisation/class",
        "showMore":false

      },
      {
        "labelName": {
          "defaultValue": "department",
          "alias": "department"
        },
        "type": "associatedEntity",
        "baseUrl": "/core-hr/organisation/department",
        "showMore":false

      }
    ]
  }
];
const leaveTypeMeta = [
  {
    "name": "Leave Type Information",
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
          "defaultValue": "leaveItemType",
          "alias": "itemType"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "leavePayType",
          "alias": "leavePayType"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "value",
          "alias": "value"
        },
        "type": "deductionValue",
      },
      {
        "labelName": {
          "defaultValue": "entitlementUnit",
          "alias": "entitlementUnit"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "component",
          "alias": "component"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "encashmentComponent",
          "alias": "encashComponent"
        },
        "type": "text",
      }
    ]
  },
  {
    "name": "Leave Rule 1 Information",
    "isCollapse": true,
    "labels": [
      {
        "labelName": {
          "defaultValue": "includeWeeklyHoliday",
          "alias": "includeWeekends"
        },
        "type": "checkbox"
      },
      {
        "labelName": {
          "defaultValue": "includeNonWorkingDay",
          "alias": "includeHolidays"
        },
        "type": "checkbox",
      },
      {
        "labelName": {
          "defaultValue": "allowHourly",
          "alias": "allowHourlyLeaves"
        },
        "type": "checkbox",
      },
      {
        "labelName": {
          "defaultValue": "documentMandatory",
          "alias": "documentMandatory"
        },
        "type": "checkbox",
      },
      {
        "labelName": {
          "defaultValue": "thresholdDays",
          "alias": "thresholdDays"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "leaveReason",
          "alias": "defaultLeaveReasons"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "allowNegativeLeaves",
          "alias": "allowNegativeLeaves"
        },
        "type": "checkbox",
      },
      {
        "labelName": {
          "defaultValue": "negativeLeaveLimit",
          "alias": "negativeLeaveLimit"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "maxLeaveDaysAllowed",
          "alias": "maximumLeaveAllowed"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "genderApplicability",
          "alias": "genderApplicability"
        },
        "type": "list",
      },
      {
        "labelName": {
          "defaultValue": "nationalityApplicability",
          "alias": "nationalityApplicability"
        },
        "type": "list",
      },
      {
        "labelName": {
          "defaultValue": "religionApplicability",
          "alias": "religionApplicability"
        },
        "type": "list",
      },
      {
        "labelName": {
          "defaultValue": "message",
          "alias": "instructionMessage"
        },
        "type": "text",
      }
    ]
  },
  {
    "name": "Leave Rule 2 Information",
    "isCollapse": true,
    "labels": [
      {
        "labelName": {
          "defaultValue": "accrualFrequency",
          "alias": "accrualFrequency"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "accrualType",
          "alias": "accrualType"
        },
        "type": "accrualType"
      },
      {
        "labelName": {
          "defaultValue": "accrualDay",
          "alias": "day"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "quotaResetFrequency",
          "alias": "quotaResetFrequency"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "quotaResetType",
          "alias": "quotaResetType"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "quotaResetDay",
          "alias": "day"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "entitlementPerPeriod",
          "alias": "entitlementPerPeriod"
        },
        "type": "entitlementPerPeriod",
      },
      {
        "labelName": {
          "defaultValue": "allowCarryOver",
          "alias": "allowCarryOver"
        },
        "type": "checkbox",
      },
      {
        "labelName": {
          "defaultValue": "maxCarryOver",
          "alias": "maxCarryOver"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "allowCarryOverToBeUsedWithin",
          "alias": "carryOverToBeUsedWithin"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "allowNegativeCarryOver",
          "alias": "allowNegativeCarryOver"
        },
        "type": "checkbox",
      },
      {
        "labelName": {
          "defaultValue": "applicableForResumption",
          "alias": "applicableForResumption"
        },
        "type": "checkbox",
      },
      {
        "labelName": {
          "defaultValue": "resumptionThresholdDays",
          "alias": "thresholdDays"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "applicableForEncashment",
          "alias": "applicableForEncashment"
        },
        "type": "applicableForEncashment",
      },
      {
        "labelName": {
          "defaultValue": "applicableForFullFinal",
          "alias": "applicableForFullFinal"
        },
        "type": "applicableForFullFinal",
      }
    ]
  }
]
const tabsMeta: TrazepoidTabsMeta []=[
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
const leavePayCalculationList = [
  {
    "id":"1",
    "name":"As per payroll cycle"
  },
  {
    "id":"2",
    "name":"Fixed 30 days"
  }
]
const cardMetaData={
  name:"",
  logo:""
}

export { EncashmentFormMeta, cardMetaData, detailsCardMeta, formMetadata, formSections, leavePayCalculationList, leaveTypeMeta, tabsMeta, trapezoidTabTableData };

