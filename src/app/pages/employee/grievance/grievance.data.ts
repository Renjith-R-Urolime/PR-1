import { DetailsCardMeta, FormMeta } from "src/app/shared/meta-interface";
import { FieldConfig, Sections } from "src/app/shared/ui/basic-form/basic-form";
import { WizardTabs } from "src/app/shared/ui/wizard-tabs/wizard-tabs";


const grievancewizardTabs: WizardTabs = [
    {
        label: "Grievance",
        number: 1,
        tabIndex: 0,
    },

    {
        label: "Review",
        number: 2,
        tabIndex: 1,
    }
]

const grievanceformSections: Sections = [

    {
        "tabName": "Grievance",
        "sectionName": "Grievance Information",
        "sectionDescription": "Enter Grievance Information"
    }

]
const grievanceFormData : FormMeta =
    {
        "tabName": "Grievance",
        "formName": "GrievanceForm",
        "labels": [
            {
                "sectionName": "Grievance Information",
                "labelName": {
                    "defaultValue": "From",
                    "alias": "From"
                },
                "type": "select"
            },
            {
                "sectionName": "Grievance Information",
                "labelName": {
                    "defaultValue": "Title",
                    "alias": "Title"
                },
                "type": "text"
            },
            {
                "sectionName": "Grievance Information",
                "labelName": {
                    "defaultValue": "Exit Type",
                    "alias": "Exit Type"
                },
                "type": "text"
            },
            {
                "sectionName": "Grievance Information",
                "labelName": {
                    "defaultValue": "Date",
                    "alias": "Date"
                },
                "type": "date"
            },
            {
                "sectionName": "Grievance Information",
                "labelName": {
                    "defaultValue": "Against ",
                    "alias": "Against "
                },
                "type": "select"
            },
            {
                "sectionName": "Grievance Information",
                "labelName": {
                    "defaultValue": "Anonymous ",
                    "alias": "Anonymous "
                },
                "type": "select"
            },
            {
                "sectionName": "Grievance Information",
                "labelName": {
                    "defaultValue": "Description ",
                    "alias": "Description "
                },
                "type": "text"
            }
        ]
    }

const detailsCardList: DetailsCardMeta[] = [
    {
        "name": "Grievance Information",
        "isCollapse": true,
        "isRowWise": false,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "Karina Clark",
                    "alias": "From"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Complaint Regarding the working condition",
                    "alias": "Title"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Over the past few weeks, the temperature in our office has consistently risen above comfortable levels due to the air conditioning system.",
                    "alias": "Description"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Sean Bean",
                    "alias": "Against"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "02/06/2023",
                    "alias": "Date"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "",
                    "alias": "Anonymous?"
                },
                "type": "checkbox"
            }
        ],
        "data": [{
            "From": "Karina Clark",
            "Title": "Complaint Regarding the working condition",
            "Description": "Over the past few weeks, the temperature in our office has consistently risen above comfortable levels due to the air conditioning system.",
            "Against": "Sean Bean",
            "Date": "02/06/2023",
            "Anonymous?": ""
        }]
    },
    {
        "name": "Title",
        "isCollapse": true,
        "isRowWise": false,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "6/5/22 11:53 AM",
                    "alias": "Creation Date"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "13/6/22 12:58 PM",
                    "alias": "Last Modified"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "",
                    "alias": "Inactive"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "4",
                    "alias": "Internal ID"
                },
                "type": "text"
            }
        ],
        "data": [{
            "Creation Date": "6/5/22 11:53 AM",
            "Last Modified": "13/6/22 12:58 PM",
            "Inactive": "",
            "Internal ID": "4"
        }]
    }
];


export { detailsCardList, grievanceFormData, grievanceformSections, grievancewizardTabs };

