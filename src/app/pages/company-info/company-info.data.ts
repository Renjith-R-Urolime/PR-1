import { FieldConfig, Sections } from "src/app/shared/ui/basic-form/basic-form";
import { WizardTabs } from "src/app/shared/ui/wizard-tabs/wizard-tabs";

const wizardTabs: WizardTabs = [
    {
        label: "Company Information",
        number: 1,
        tabIndex: 0,
    },



]
const formSections: Sections = [

    {
        "tabName": "Company Information",
        "sectionName": "Company Information",
        "sectionDescription": ""
    },


]
const companyFormData: FieldConfig = [
    {
        "tabName": "Company Information",
        "formName": "companyInfoForm",
        "labels": [
            {
                "sectionName": "Company Information",
                "labelName": {
                    "defaultValue": "Name",
                    "alias": "Name",
                },
                "type": "text",
                "col": 4
            },
            {
                "sectionName": "Company Information",
                "labelName": {
                    "defaultValue": "Legal Name",
                    "alias": "Legal Name"
                },
                "type": "text",
                "col": 4
            },
            {
                "sectionName": "Company Information",
                "labelName": {
                    "defaultValue": "logo ",
                    "alias": "logo"
                },
                "type": "file",
                "col": 4
            },
            {
                "sectionName": "Company Information",
                "labelName": {
                    "defaultValue": "Website",
                    "alias": "Website"
                },
                "type": "text",
                "col": 4
            },
            {
                "sectionName": "Company Information",
                "labelName": {
                    "defaultValue": "Country",
                    "alias": "Country"
                },
                "type": "country",

                "col": 4
            },
            {
                "sectionName": "Company Information",
                "labelName": {
                    "defaultValue": "Email",
                    "alias": "Email"
                },
                "type": "text",
                "col": 4
            },
            {
                "sectionName": "Company Information",
                "labelName": {
                    "defaultValue": "Phone",
                    "alias": "Phone"
                },
                "type": "text",
                "col": 4
            },
            {
                "sectionName": "Company Information",
                "labelName": {
                    "defaultValue": "Fax",
                    "alias": "Fax"
                },
                "type": "text",
                "col": 4
            },
            {
                "sectionName": "Company Information",
                "labelName": {
                    "defaultValue": "Language",
                    "alias": "Language"
                },
                "type": "select",
                "options": [
                    {
                        "id": 1,
                        "value": "en"
                    },
                    {
                        "id": 2,
                        "value": "ar"
                    }
                ],
                "col": 4
            },
            {
                "sectionName": "Company Information",
                "labelName": {
                    "defaultValue": "Currency",
                    "alias": "Currency"
                },
                "type": "select",
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
                "col": 4

            },
            {
                "sectionName": "Company Information",
                "labelName": {
                    "defaultValue": "Vat Registration Number",
                    "alias": "Vat Registration Number"
                },
                "type": "text",
                "col": 4

            },
            {
                "sectionName": "Company Information",
                "labelName": {
                    "defaultValue": "Time Zone",
                    "alias": "Time Zone"
                },
                "type": "timezone",
                "col": 4
            },
            {
                "sectionName": "Company Information",
                "labelName": {
                    "defaultValue": "Account ID",
                    "alias": "Account ID"
                },
                "type": "text",
                "col": 4
            },
            {
                "sectionName": "Company Information",
                "labelName": {
                    "defaultValue": "Data Centre",
                    "alias": "Data Centre"
                },
                "type": "text",
                "col": 4
            },
            {
                "sectionName": "Company Information",
                "labelName": {
                    "defaultValue": "Infithra UI & URL k",
                    "alias": "Infithra UI & URL "
                },
                "type": "text",
                "col": 4
            },
            {
                "sectionName": "Company Information",
                "labelName": {
                    "defaultValue": "Date Format",
                    "alias": "Date Format"
                },
                "type": "select",
                "options": [
                    {
                        "id": 1,
                        "value": "DD/MM/YYYY",
                    },
                    {
                        "id": 2,
                        "value": "MM/DD/YYYY",
                    },
                    {
                        "id": 3,
                        "value": "YYYY/MM/DD",
                    }
                ],
                "col": 4
            },
            {
                "sectionName": "Company Information",
                "labelName": {
                    "defaultValue": "Time Format",
                    "alias": "Time Format"
                },
                "type": "select",
                "options": [
                    {
                        "id": 1,
                        "value": "HH/MM/SS",
                    },
                    {
                        "id": 2,
                        "value": "HH/MM",
                    }
                ],
                "col": 4

            }, {
                "sectionName": "Company Information",
                "labelName": {
                    "defaultValue": "Billing Address",
                    "alias": "Billing Address"
                },
                "type": "textarea",
                "col": 6

            },
            {
                "sectionName": "Company Information",
                "labelName": {
                    "defaultValue": "Shipping Address",
                    "alias": "Shipping Address"
                },
                "type": "textarea",
                "col": 6

            }

        ],
    },

]
export { wizardTabs, formSections, companyFormData };
