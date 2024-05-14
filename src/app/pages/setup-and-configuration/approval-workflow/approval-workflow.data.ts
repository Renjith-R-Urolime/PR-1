

import { Validators } from "@angular/forms";
import { DetailsCardMeta, TrazepoidTabsMeta, TableData } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";


const formSections: Sections = [

    {
        "tabName": "Approval Information",
        "sectionName": "Approval Information",
        "sectionDescription": "Enter Approval Information"
    }
]


const approvalWorkflowFormData = {
    tabName: "Approval Information",
    formName: "approvalForm",
    labels: [
        {
            sectionName: "Approval Information",
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
            sectionName: "Approval Information",
            labelName: {
                defaultValue: "recordType",
                alias: "recordType",
            },
            type: "recordType",
            placeholder: "Select record type",
            col: 4,
            multiple: true,
        },
        {
            sectionName: "Approval Information",
            labelName: {
                defaultValue: "classificationApplicability",
                alias: "classificationApplicability",
            },
            "type": "formDrawer",
            "col": 4,
        },
        {
            sectionName: "Approval Information",
            labelName: {
                defaultValue: "approvalLevels",
                alias: "approvalLevels",
            },
            type: "approvalLevels",
            placeholder: "Select approval level",
            col: 4,
            multiple: false,
        },
    ],
};


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




export {formSections, approvalWorkflowFormData,classificationApplicabilityFormMeta };
