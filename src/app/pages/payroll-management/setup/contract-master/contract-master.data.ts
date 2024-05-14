import { Validators } from "@angular/forms";
import { DetailsCardMeta, TableData, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";





const formSections: Sections = [
    {
        "tabName": "Contracts",
        "sectionName": "Contract Master Information"
    }
]

//////////////////////////////////////////////////////////////////////////////////////////

const contractMasterFormMeta =
{
    "tabName": "Contracts",
    "formName": "contractForm",
    "labels": [
        {
            "sectionName": "Contract Master Information",
            "labelName": {
                "defaultValue": "name",
                "alias": "name"
            },
            "placeholder": "Enter Name",
            "type": "text",
            "col": 4,
            "required": false,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Name Required"
                }
            ]

        },
        {
            "sectionName": "Contract Master Information",
            "labelName": {
                "defaultValue": "classificationApplicability",
                "alias": "classificationApplicability"
            },
            "type": "classificationApplicability",
            "col": 4,
        },
        {
            "sectionName": "Contract Master Information",
            "labelName": {
                "defaultValue": "nationalityRestriction",
                "alias": "Nationality Exempted"
            },
            "placeholder": "Select Nationality",
            "col": 4,
            "labelTransformationCancelled": true,
            "multiple": true,
            "type": "nationality"
        },
        {
            "sectionName": "Contract Master Information",
            "labelName": {
                "defaultValue": "eosType",
                "alias": "EOS Type"
            },
            "placeholder": "Select EOS Type",
            "col": 4,
            "multiple": true,
            "type": "eosType",
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Name Required"
                }
            ]
        },
        {
            "sectionName": "Contract Master Information",
            "labelName": {
                "defaultValue": "baseComponent",
                "alias": "baseComponent"
            },
            "placeholder": "Select Base Component",
            "fetchCondition": ["type=1", "subType=1"],
            "col": 4,
            "multiple": true,
            "apiLink": "payroll/setup/component",
            "type": "baseComponent"
        },
        {
            "sectionName": "Contract Master Information",
            "labelName": {
                "defaultValue": "payrollComponentId",
                "alias": "payrollComponent"
            },
            "placeholder": "Select Payroll Component",
            "fetchCondition": ["type=2", "subType=10"],
            "col": 4,
            "multiple": false,
            "apiLink": "payroll/setup/component",
            "type": "payrollComponent"
        },
        {
            "sectionName": "Contract Master Information",
            "labelName": {
                "defaultValue": "isLossOfPay",
                "alias": "includeLossOfPay"
            },
            "type": "toggle",
            "col": 4,
        },
        {
            "sectionName": "Contract Master Information",
            "labelName": {
                "defaultValue": "standardDays",
                "alias": "Standard Days"
            },
            "placeholder": "Enter Days",
            "type": "days",
            "max":366,
            "col": 4,
        },
        {
            "sectionName": "Contract Master Information",
            "labelName": {
                "defaultValue": "entitlement",
                "alias": "entitlement"
            },
            "type": "entitlement",
            "col": 4,
        },
        {
            "sectionName": "Contract Master Information",
            "labelName": {
                "defaultValue": "maximumCap",
                "alias": "maximumCap"
            },
            "placeholder": "Max Gratuity Payable Component*Number",
            "type": "maximumCap",
            "col": 4,
        },
        {
            "sectionName": "Contract Master Information",
            "labelName": {
                "defaultValue": "gratuityComponent",
                "alias": "maximumGratuityPayableComponent"
            },
            "placeholder": "Select Maximum Gratuity",
            "col": 4,
            "fetchCondition": ["type=1", "subType=1"],
            "multiple": true,
            "apiLink": "payroll/setup/component",
            "type": "gratuityComponent",
            "hide":true

        },
        {
            "sectionName": "Contract Master Information",
            "labelName": {
                "defaultValue": "number",
                "alias": "Number of months"
            },
            "placeholder": "Enter Number",
            "type": "number",
            "maxLength":4,
            "col": 4,
            "required": false,
            "hide":true
        },
        
    ]
}


const cardMetaData = {
    name: "",
    logo: "",
    labels: [
        {
            labelName: {
                defaultValue: "country",
                alias: "country"
            }
        },
        {
            labelName: {
                defaultValue: "standardDays",
                alias: "standardDays"
            }
        },
    ]
}


const contractTableMetaData: TableData = {
    isActionColumn: true,
    columns: [
        {
            name: "name",
        },
        {
            name: "country",
        },
        {
            name: "standardDays",
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
                "defaultValue": "country",
                "alias": "country"
            },
            "placeholder": "Select Country",
            "apiLink": "core-hr/organisation/subsidiary/countries",
            "col": 8,
            "multiple": false,
            "type": "country"
        },
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

const detailsCardMeta: DetailsCardMeta[] = [
    {
        "name": "Contract Master Information",
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
                    "defaultValue": "country",
                    "alias": "country"
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
                    "defaultValue": "nationalityRestriction",
                    "alias": "nationalityRestriction"
                },
                "type": "list",
                // "custom": true,
                // "templateName": "nationality"
            },
            {
                "labelName": {
                    "defaultValue": "eosType",
                    "alias": "eosType"
                },
                "type": "text",
            },
            {
                "labelName": {
                    "defaultValue": "baseComponent",
                    "alias": "baseComponent",
                },
                "type": "associatedEntity",
                "baseUrl": "/payroll/setup/component"
            },
            {
                "labelName": {
                    "defaultValue": "payrollComponent",
                    "alias": "payrollComponent",
                },
                "type": "associatedEntity",
                "baseUrl": "/payroll/setup/component"
            },

            {
                "labelName": {
                    "defaultValue": "standardDays",
                    "alias": "standardDays"
                },
                "type": "number",
            },
            {
                "labelName": {
                    "defaultValue": "gratuityComponent",
                    "alias": "maximumPayableGratuityComponent"
                },
                "type": "text",
            },
            {
                "labelName": {
                    "defaultValue": "number",
                    "alias": "number"
                },
                "type": "number",
            },
            {
                "labelName": {
                    "defaultValue": "maximumCap",
                    "alias": "maximumCap"
                },
                "type": "number",
            },
            {
                "labelName": {
                    "defaultValue": "isLossOfPay",
                    "alias": "Is loss of pay"
                },
                "type": "toggle",
            },
        ]
    }
];


const tabsMeta: TrazepoidTabsMeta[] = [
    {
        label: "resignation", // table name in Database
        tabIndex: 0,
        tableData: {
            isActionColumn: false,
            imageColumn: 'abc',
            columns: [
                {
                    name: "minimumYear",
                },
                {
                    name: "maximumYear",
                },
                {
                    name: "gratuityDays",
                },
                {
                    name: "standardDays",
                },
                {
                    name: "gratuityDaysRatio",
                },
                {
                    name: "provisionRatio",
                },
            ]
        }
    },
    {
        label: "termination", // table name in Database
        tabIndex: 1,
        tableData: {
            isActionColumn: false,
            imageColumn: 'abc',
            columns: [
                {
                    name: "minimumYear",
                },
                {
                    name: "maximumYear",
                },
                {
                    name: "gratuityDays",
                },
                {
                    name: "standardDays",
                },
                {
                    name: "gratuityDaysRatio",
                },
                {
                    name: "provisionRatio",
                },
            ]
        }
    },
    {
        label: "systemNotes",
        tabIndex: 2,
    }
]










export { cardMetaData, classificationApplicabilityFormMeta, classificationApplicabilityFormSections, contractMasterFormMeta, contractTableMetaData, detailsCardMeta, formSections, tabsMeta };
