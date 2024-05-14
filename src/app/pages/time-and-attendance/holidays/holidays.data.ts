import { FormMeta, TableData,DetailsCardMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";
import { Validators } from "@angular/forms";

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


const tableMetaData :TableData={
    isActionColumn: true,
    columns: [
      {
        name: "name",

      },
      {
        name: "date",
      },
      {
        name: "workCalendar",
      }

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

const formSections: Sections = [

    {
        "tabName": "Holiday",
        "sectionName": "Holiday Information",
        "sectionDescription": "Enter Holiday Details"
    }

]

const formData: FormMeta =

{
    "tabName": "Holiday",
    "formName": "holidayForm",
    "labels": [
      {
        "sectionName": "Holiday Information",
        "labelName": {
          "defaultValue": "date",
          "alias": "date"
        },
        "placeholder": "Enter Date",
        "type": "date",
        "col":4,
      },
      {
        "sectionName": "Holiday Information",
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
        "sectionName": "Holiday Information",
        "labelName": {
            "defaultValue": "workCalendar",
            "alias": "appliesTo"
        },
        "type": "appliesTo",
        "col": 4,
    },



    ]
}



const holidayCardMetaData={
    name:"",
    logo:"",
    labels:[
        {
            labelName:{
                defaultValue:"name",
                alias:"name"
            }
        },

    ]
  }
  const detailsCardList: DetailsCardMeta[] = [
    {
        "name": "Holiday Information",
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
                    "defaultValue": "date",
                    "alias": "date"
                },
                "type": "date",
                "col": 2,
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
    }
  ]
export {classificationApplicabilityFormMeta, classificationApplicabilityFormSections,tableMetaData, formData, formSections, holidayCardMetaData,detailsCardList };
