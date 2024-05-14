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
        "tabName": "Manage Classification",
        "sectionName": "Manage Classification Information",
        "sectionDescription": "Enter Manage Classification Information"
    }

]

const formData: FormMeta =
{
    "tabName": "Manage Classification",
    "formName": "manageClasificationForm",
    "labels": [
        {
            "sectionName": "Manage Classification Information",
            "labelName": {
                "defaultValue": "employeeId",
                "alias": "employee"
            },
            "placeholder": "Enter Employee",
            "type": "employee",
            "col": 4,
            "apiLink": "core-hr/employee",
            "scope": "manageClassification",
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
            "sectionName": "Manage Classification Information",
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
        //     "sectionName": "Manage Classification Information",
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
const classificationFormData =
{
    "labels": [
        {
            "labelName": {
                "defaultValue": "userSubsidiaryId",
                "alias": "userSubsidiary",
                "additional":"subsidiary"
            },
            "placeholder": "Enter User Subsidiary",
            "type": "dropdown",
            "apiLink": "core-hr/organisation/subsidiary",
        },
        {
            "labelName": {
                "defaultValue": "sponsorSubsidiaryId",
                "alias": "sponsorSubsidiary",
                "additional":"sponserSubsidiary"
            },
            "placeholder": "Enter sponsor Subsidiary",
            "type": "dropdown",
            "apiLink": "core-hr/organisation/subsidiary",
        },
        {
            "labelName": {
                "defaultValue": "expenseSubsidiaryId",
                "alias": "expenseSubsidiary",
                "additional":"expenseSubsidiary"
            },
            "placeholder": "Enter Expense Subsidiary",
            "type": "dropdown",
            "apiLink": "core-hr/organisation/subsidiary",
        },
        {
            "labelName": {
                "defaultValue": "locationId",
                "alias": "location",
                "additional":"location"
            },
            "placeholder": "Enter Location",
            "type": "dropdown",
            "apiLink": "core-hr/organisation/location",
        },
        {
            "labelName": {
                "defaultValue": "departmentId",
                "alias": "department",
                "additional":"department"
            },
            "placeholder": "Enter Department",
            "type": "dropdown",
            "apiLink": "core-hr/organisation/department",
        },
        {
            "labelName": {
                "defaultValue": "classId",
                "alias": "class",
                "additional":"class"
            },
            "placeholder": "Enter Class",
            "type": "dropdown",
            "apiLink": "core-hr/organisation/class",
        },
        {
            "labelName": {
                "defaultValue": "employeeTypeId",
                "alias": "employeeType",
                "additional":"employeeType"
            },
            "placeholder": "Enter Employee Type",
            "type": "dropdown",
            "apiLink": "core-hr/employee/settings/types",
        },
        {
            "labelName": {
                "defaultValue": "employeeCategoryId",
                "alias": "employeeCategory",
                "additional":"employeeCategory"
            },
            "placeholder": "Enter Employee Category",
            "type": "dropdown",
            "apiLink": "core-hr/employee/settings/category",
        },
        {
            "labelName": {
                "defaultValue": "gradeId",
                "alias": "grade",
                "additional":"grade"
            },
            "placeholder": "Enter Grade",
            "type": "dropdown",
            "apiLink": "core-hr/employee/settings/grade",
        },
        {
            "labelName": {
                "defaultValue": "designationId",
                "alias": "designation",
                "additional":"designation"
            },
            "placeholder": "Enter Designation",
            "type": "dropdown",
            "apiLink": "core-hr/employee/settings/designation",
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
        "name": "Manage Classification Information",
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
    cardMetaData, classificationFormData, detailsCardMeta,
    formData, formSections, tableMetaData, tabsMeta
};

