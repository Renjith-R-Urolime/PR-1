import { FormMeta, TableData,DetailsCardMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";
import { Validators } from "@angular/forms";

const tableMetaData: TableData = {
    isActionColumn: true,
    columns: [
        // {
        //     name: "employee"
        // },
        {
            name: "fromDate",
        },
        {
            name: "toDate",
        },
        {
            name: "hour",
        }



    ]
}

    const classificationApplicabilityFormSections: Sections =[
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

    const formSections: Sections =[

        {
            "tabName": "Waiver Hour",
            "sectionName": "Waiver Hour Information",
            "sectionDescription": "Enter Waiver Hour Details"
        }

    ]

    const formData: FormMeta =

    {
        "tabName": "Waiver Hour",
        "formName": "waiverHourForm",
        "labels": [
            {
                "sectionName": "Waiver Hour Information",
                "labelName": {
                    "defaultValue": "fromDate",
                    "alias": "fromDate"
                },
                "placeholder": "Enter From Date",
                "type": "date",
                "col": 4,
            },
            {
                "sectionName": "Waiver Hour Information",
                "labelName": {
                    "defaultValue": "toDate",
                    "alias": "toDate"
                },
                "placeholder": "Enter To Date",
                "type": "date",
                "col": 4,
            },
            {
                "sectionName": "Waiver Hour Information",
                "labelName": {
                    "defaultValue": "hour",
                    "alias": "hour"
                },
                "placeholder": "Enter Hour",
                "type": "text",
                "col": 4,


            },
            {
                "sectionName": "Waiver Hour Information",
                "labelName": {
                    "defaultValue": "employee",
                    "alias": "appliesTo"
                },
                "type": "appliesTo",
                "col": 4,
            },



        ]
    }



    const waiverHourCardMetaData = {
        name: "",
        logo: "",
        labels: [
            {
                labelName: {
                    defaultValue: "name",
                    alias: "name"
                }
            },

        ]
    }

  const detailsCardList: DetailsCardMeta[] = [
    {
        "name": "Waiver Hour Information",
        "isCollapse": true,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "fromDate",
                    "alias": "fromDate"
                },
                "type": "date",
                "col": 4,
            },
            {
                "labelName": {
                    "defaultValue": "toDate",
                    "alias": "toDate"
                },
                "type": "date",
                "col": 4,
            },
            {
                "labelName": {
                    "defaultValue": "hour",
                    "alias": "hour"
                },
                "type": "text",
                "col": 4,
            },
            {
                "labelName": {
                    "defaultValue": "",
                    "alias": ""
                },
                "custom": true,
                "templateName":"appliesTo",
                "type": "button",
                "col": 12
            },
        ]
    }
  ]
export { classificationApplicabilityFormMeta, classificationApplicabilityFormSections, tableMetaData, formData, formSections, waiverHourCardMetaData ,detailsCardList};

