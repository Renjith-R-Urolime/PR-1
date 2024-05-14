import { Sections } from "src/app/shared/ui/basic-form/basic-form";
import { Validators } from "@angular/forms";
import { DetailsCardMeta, FormMeta, TableData, TrazepoidTabsMeta } from "src/app/shared/meta-interface";

interface FormLabelValidation {
    name: string;
    validator: any; // You can replace 'any' with a specific validator type if needed
    message: string;
}

type FormConfig = {
    sectionName: string;
    labels: {
        sectionName: string;
        labelName: {
            defaultValue: string;
            alias: string;
        };
        check?: boolean;
        placeholder?: string;
        col?: number;
        min?: number;
        type: string;
        required?: boolean;
        validations?: FormLabelValidation[];
        apiLink?: string;
        multiple?: boolean;
    }[]
}


const tableMetaData: TableData = {
    isActionColumn: true,
    columns: [
        {
            name: "name",

        },
        {
            name: "regularFrom",
        },
        {
            name: "regularTo",
        },
        {
            name: "breakFrom",
        },
        {
            name: "breakTo",
        }

    ]
}

const formSections: Sections = [
    {
        "sectionName": "Shift Information"
    },
    {
        "sectionName": "Define Breaks"
    },
    {
        "sectionName": "Define Weekends"
    },
]

const toleranceMarginFormData: FormMeta = {
    "sectionName": "Tolerance Information",
    "labels": [
        {
            "sectionName": "Tolerance Information",
            "labelName": {
                "defaultValue": "toleranceMarginStartTime",
                "alias": "Start Time"
            },
            "type": "time",
            "col": 6,
            "placeholder": "HH:MM",
        },
        {
            "sectionName": "Tolerance Information",
            "labelName": {
                "defaultValue": "toleranceMarginEndTime",
                "alias": "End Time"
            },
            "type": "time",
            "col": 6,
            "placeholder": "HH:MM",
        }
    ]
}

const classificationFormData: FormMeta = {
    "sectionName": "Classification Information",
    "labels": [
        {
            "sectionName": "Classification Information",
            "labelName": {
                "defaultValue": "subsidiary",
                "alias": "subsidiary"
            },
            "type": "subsidiary",
            "col": 8,
            "placeholder": "Select Subsidiary",
            "apiLink": "core-hr/organisation/subsidiary",
            "multiple": true,
        },
        {
            "sectionName": "Classification Information",
            "labelName": {
                "defaultValue": "jurisdiction",
                "alias": "jurisdiction"
            },
            "type": "jurisdiction",
            "col": 8,
            "placeholder": "Select Jurisdiction",
            "apiLink": "core-hr/organisation/jurisdiction",
            "multiple": true,
        },
        {
            "sectionName": "Classification Information",
            "labelName": {
                "defaultValue": "location",
                "alias": "location"
            },
            "type": "location",
            "col": 8,
            "placeholder": "Select Location",
            "apiLink": "core-hr/organisation/location",
            "multiple": true,
        },
        {
            "sectionName": "Classification Information",
            "labelName": {
                "defaultValue": "department",
                "alias": "department"
            },
            "type": "department",
            "col": 8,
            "placeholder": "Select Department",
            "apiLink": "core-hr/organisation/department",
            "multiple": true,
        },
        {
            "sectionName": "Classification Information",
            "labelName": {
                "defaultValue": "class",
                "alias": "class"
            },
            "type": "class",
            "col": 8,
            "placeholder": "Select Class",
            "apiLink": "core-hr/organisation/class",
            "multiple": true,
        }
    ]
}

const formData: FormMeta =
{
    "sectionName": "Shift Information",
    "labels": [
        {
            "sectionName": "Shift Information",
            "labelName": {
                "defaultValue": "name",
                "alias": "name"
            },
            "type": "text",
            "placeholder": "Enter Shift Name",
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Name Required"
                }
            ],
            "col":5
        },
        {
            "sectionName": "Shift Information",
            "labelName": {
                "defaultValue": "regularFrom",
                "alias": "regularFrom"
            },
            "type": "time",
            "placeholder": "HH:MM",
            "col": 2,
        },
        {
            "sectionName": "Shift Information",
            "labelName": {
                "defaultValue": "regularTo",
                "alias": "regularTo"
            },
            "placeholder": "HH:MM",
            "type": "time",
            "col": 2,
        },
        {
            "sectionName": "Shift Information",
            "labelName": {
                "defaultValue": "totalHours",
                "alias": ""
            },
            "type": "hours",
            "col": 1,
        },
        {
            "sectionName": "Shift Information",
            "labelName": {
                "defaultValue": "modifyTiming",
                "alias": "modifyTiming"
            },
            "type": "button",
            "col":5
        },
        {
            "sectionName": "Shift Information",
            "labelName": {
                "defaultValue": "toleranceMargin",
                "alias": "toleranceMargin"
            },
            "type": "button",
            "col": 5
        },
        {
            "sectionName": "Shift Information",
            "labelName": {
                "defaultValue": "workCalendar",
                "alias": "appliesTo"
            },
            "type": "button",
            "col": 10
        },
        {
            "sectionName": "Define Breaks",
            "labelName": {
                "defaultValue": "breakFrom",
                "alias": "from"
            },
            "type": "time",
            "col": 2,
            "placeholder": "HH:MM"
        },
        {
            "sectionName": "Define Breaks",
            "labelName": {
                "defaultValue": "breakTo",
                "alias": "to"
            },
            "type": "time",
            "col": 2,
            "placeholder": "HH:MM",
        },
        {
            "sectionName": "Define Breaks",
            "labelName": {
                "defaultValue": "totalBreakTime",
                "alias": ""
            },
            "type": "hours",
            "col": 1,
            "placeholder": "HH:MM",
        },
        {
            "sectionName": "Define Breaks",
            "labelName": {
                "defaultValue": "excludeBreak",
                "alias": "excludedFromStandardHour"
            },
            "type": "toggleBtn",
        },
        {
            "sectionName": "Define Breaks",
            "labelName": {
                "defaultValue": "isAdditionalBreak",
                "alias": "enableAdditionalBreak"
            },
            "type": "toggleBtn",
            "col": 15,
        },
        {
            "sectionName": "Define Breaks",
            "labelName": {
                "defaultValue": "additionalBreakFrom",
                "alias": "breakFrom"
            },
            "type": "time",
            "col": 2,
        },
        {
            "sectionName": "Define Breaks",
            "labelName": {
                "defaultValue": "additionalBreakTo",
                "alias": "breakTo"
            },
            "type": "time",
            "col": 2,
        },
        {
            "sectionName": "Define Breaks",
            "labelName": {
                "defaultValue": "totalAdditionalBreakTime",
                "alias": ""
            },
            "type": "hours",
            "col": 1,
            "placeholder": "HH:MM"
        },
        {
            "sectionName": "Define Breaks",
            "labelName": {
                "defaultValue": "excludeAdditionalBreak",
                "alias": "excludedFromStandardHour"
            },
            "type": "toggleBtn",
        },
        {
            "sectionName": "Define Weekends",
            "labelName": {
              "defaultValue": "selectedHalf",
              "alias": "selectedHalf"
            },
            "placeholder": "Select Shift Type",
            "type": "shift",
            "col":4,
            "jsonListName": "shiftsList",
            "required":true,
          },
    ]
}

const detailsCardList: DetailsCardMeta[] = [
    {
        "name": "Shift Information",
        "isCollapse": true,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "name",
                    "alias": "name"
                },
                "type": "text",
                "row": 15
            },
            {
                "labelName": {
                    "defaultValue": "regularFrom",
                    "alias": "regularFrom"
                },
                "type": "text",
                "col": 2,
            },
            {
                "labelName": {
                    "defaultValue": "regularTo",
                    "alias": "regularTo"
                },
                "type": "text",
                "col": 2,
            },
            {
                "labelName": {
                    "defaultValue": "totalHours",
                    "alias": " "
                },
                "custom": true,
                "templateName":"customElement",
                "type": "time",
                "col": 1
            },
            {
                "labelName": {
                    "defaultValue": "",
                    "alias": ""
                },
                "custom": true,
                "templateName":"modifyTiming",
                "type": "button",
                "col":2          
            },
            {
                "labelName": {
                    "defaultValue": "toleranceMargin",
                    "alias": "toleranceMargin"
                },            
                "type": "text",
                "row": 6
            },
            {
                "labelName": {
                    "defaultValue": "",
                    "alias": ""
                },
                "custom": true,
                "templateName":"appliesTo",
                "type": "button",
                "col": 6
            },
        ]
    },
    {
        "name": "Define Break",
        "isCollapse": true,
        labels: [
            {
                "labelName": {
                    "defaultValue": "breakFrom",
                    "alias": "from"
                },
                "type": "text",
                "col": 2,
            },
            {
                "labelName": {
                    "defaultValue": "breakTo",
                    "alias": "to"
                },
                "type": "text",
                "col": 2,
            },
            {
                "labelName": {
                    "defaultValue": "",
                    "alias": ""
                },
                "custom": true,
                "templateName":"totalBreakTime",
                "type": "hours",
                "col": 1
            },
            {
                "labelName": {
                    "defaultValue": "",
                    "alias": ""
                },
                "custom": true,
                "templateName":"excludedFromStandardHours",
                "type": "checkbox",
            },
            {
                "labelName": {
                    "defaultValue": "",
                    "alias": ""
                },
                "custom": true,
                "templateName":"enableAdditionalBreak",
                "type": "checkbox",
                "col": 12
            },
            {
                "labelName": {
                    "defaultValue": "additionalBreakFrom",
                    "alias": "breakFrom"
                },
                "type": "number",
                "col": 2,
            },
            {
                "labelName": {
                    "defaultValue": "additionalBreakTo",
                    "alias": "breakTo"
                },
                "type": "number",
                "col": 2,
            },
            {
                "labelName": {
                    "defaultValue": "",
                    "alias": ""
                },
                "custom": true,
                "templateName":"totalAdditionalBreakTime",
                "type": "hours",
                "col": 1
            },
            {
                "labelName": {
                    "defaultValue": "",
                    "alias": ""
                },
                "custom": true,
                "templateName":"excludeAdditionalBreakFromStandardHours",
                "type": "checkbox",
            },
        ]
    },
    {
        "name": "Define Weekends",
        "isCollapse": true,
        labels:[
            {
                "labelName": {
                    "defaultValue": "",
                    "alias": ""
                },
                "custom": true,
                "templateName":"additional-view-temp",
                "type": "hours",
                "col": 12
            },
        ]
    },
]

const tabsMeta: TrazepoidTabsMeta []= [
    {
      label: "systemNotes", 
      tabIndex: 0,
    }
  ]

const shiftCardMetaData = {
    name: "",
    logo: "",
    labels: [
        {
            labelName: {
                defaultValue: "regularFrom",
                alias: "regularFrom"
            }
        },
        {
            labelName: {
                defaultValue: "regularTo",
                alias: "regularTo"
            }
        },
        {
            labelName: {
                defaultValue: "totalHours",
                alias: "Standard Hours"
            }
        },
    ]
}

export { detailsCardList,tabsMeta,classificationFormData, tableMetaData, formData, formSections, shiftCardMetaData, toleranceMarginFormData };
