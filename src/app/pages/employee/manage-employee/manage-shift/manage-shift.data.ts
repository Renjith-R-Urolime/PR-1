import { Validators } from "@angular/forms";
import { DetailsCardMeta, FormMeta, TableData, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';

const tableMetaData: TableData = {
    isActionColumn: true,
    columns: [

        {
            name: "employee",
            type: "employee"
        },
        {
            name: "effectiveDate",
        }
    ]
}

const formSections: Sections = [

    {
        "tabName": "Manage Shift",
        "sectionName": "Manage Shift Information",
        "sectionDescription": "Enter Manage Shift Information"
    }

]

const formData: FormMeta =
{
    "tabName": "Manage Shift",
    "formName": "manageShiftForm",
    "labels": [
        {
            "sectionName": "Manage Shift Information",
            "labelName": {
                "defaultValue": "employeeId",
                "alias": "employee"
            },
            "placeholder": "Enter Employee",
            "type": "employee",
            "col": 4,
            "apiLink": "core-hr/employee",
            
            "onCreateVisible": true,
            "onEditVisible": true,
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
            "sectionName": "Manage Shift Information",
            "labelName": {
                "defaultValue": "effectiveDate",
                "alias": "effectiveDate"
            },
            "placeholder": "Enter Effective Date",
            "type": "date",
            "col": 4,
            "onCreateVisible": true,
            "onEditVisible": true,


        },
        // {
        //     "sectionName": "Manage Shift Information",
        //     "labelName": {
        //         "defaultValue": "inactive",
        //         "alias": "inactive"
        //     },
        //     "placeholder": "",
        //     "type": "toggle",
        //     "col": 4,
        //     "default": false,
        //     "onCreateVisible": false,
        //     "onEditVisible": true
        // }

    ]
}
const shiftFormData =
{
    "labels": [
        {
            "labelName": {
                "defaultValue": "workCalendarId",
                "alias": "workCalendar",
                "additional":"workCalendar"
            },
            "placeholder": "Enter Work Calendar",
            "type": "dropdown",
            "apiLink": "time-attendance/work-calendar",
        },
        {
            "labelName": {
                "defaultValue": "shiftId",
                "alias": "shift",
                "additional":"shift"
            },
            "placeholder": "Enter Shift",
            "type": "dropdown",
            "apiLink": "time-attendance/shift",
        }
       
        

    ]
}

const tabsMeta: TrazepoidTabsMeta[] = [
    {
        label: "systemNotes", // table name in Database
        tabIndex: 1,
    },

]

const detailsCardMeta: DetailsCardMeta[] = [
    {
        "name": "Manage Shift Information",
        "isCollapse": true,
        "isRowWise": false,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "employee",
                    "alias": "employee"
                },
                "type": "employee"
            },
            {
                "labelName": {
                    "defaultValue": "effectiveDate",
                    "alias": "effectiveDate"
                },
                "type": "text"
            },

        ]
    },

];

const cardMetaData = {
    name: "",
    logo: "",
    labels: [
        {
            labelName: {
                defaultValue: "effectiveDate",
                alias: "effectiveDate"
            }
        }
    ]
}





export {
    cardMetaData, detailsCardMeta, formData, formSections, shiftFormData, tableMetaData, tabsMeta
};

