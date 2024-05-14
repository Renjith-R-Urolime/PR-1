import { DetailsCardMeta, FormMeta, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { FieldConfig, Sections } from "src/app/shared/ui/basic-form/basic-form";
import { DataTable } from "src/app/shared/ui/data-table-list/data-table-list";

import { WizardTabs } from "src/app/shared/ui/wizard-tabs/wizard-tabs";

const dataTableList: DataTable = {
    "tableName": "assignmentTask",
    "headers": ["Sl No", "Name", "Modified  Date", "Request Approved Date", "Type"],
    "collectionSize": 1,
    "data": [
        {
            "Sl No": "1 ",
            "Name": "Suman",
            "Modified  Date": "01/02/2023",
            "Request Approved Date": "04/02/2023",
            "Type": "Location",
        }
    ]
};
const trapezoidTabTableData: DataTable = {
    "tableName": "Employee Details",
    "headers": ["Employee", "Effective Date", "Previous Grade", "Previous Designation", "Previous Class", "Previous Department"],
    "collectionSize": 2,
    "data": [
        {
            "Employee": "Farhan",
            "Effective Date": "25/10/2023",
            "Previous Grade": "G2",
            "Previous Designation": "HR",
            "Previous Class": "Class",
            "Previous Department": "Human Resource"
        },
        {
            "Employee": "Sean Bean",
            "Effective Date": "25/10/2023",
            "Previous Grade": "G2",
            "Previous Designation": "HR",
            "Previous Class": "Class",
            "Previous Department": "Human Resource"
        },
    ]
}

const detailsCardList: DetailsCardMeta[] = [
    {
        "name": "Manage Employee Details",
        "isCollapse": true,
        "isRowWise": false,

        "labels": [
            {
                "labelName": {
                    "defaultValue": "Sahad Dennis",
                    "alias": "Employee"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "G3",
                    "alias": "Grade"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "White Collar Staff",
                    "alias": "Class"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "KPI  BA& C",
                    "alias": "Subsidiary"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Dubai Mainland",
                    "alias": "Jurisdiction"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Dubai",
                    "alias": "Location"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Archive Clerk",
                    "alias": "Designation"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Human Resources",
                    "alias": "Department"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Pritesh Kadhi",
                    "alias": "Supervisor"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "sahad@gmail.com",
                    "alias": "Email"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "9523687451 Kadhi",
                    "alias": "Phone"
                },
                "type": "text"
            }


        ],


        "data": [{
            "name": "Manage Employee Details"
        }]
    },
    {
        "name": "Department Changes",
        "isCollapse": true,
        "isRowWise": false,

        "labels":

            [
                {
                    "labelName": {
                        "defaultValue": "Sahad Dennis",
                        "alias": "Name"
                    },
                    "type": "text"
                },
                {
                    "labelName": {
                        "defaultValue": "05/05/2022",
                        "alias": "Modified Date"
                    },
                    "type": "text"
                },
                {
                    "labelName": {
                        "defaultValue": "HR",
                        "alias": "Previous Department"
                    },
                    "type": "text"
                },
                {
                    "labelName": {
                        "defaultValue": "Pending",
                        "alias": "Status"
                    },
                    "type": "text"
                },
                {
                    "labelName": {
                        "defaultValue": "08/05/2023",
                        "alias": "Effective Date"
                    },
                    "type": "text"
                },
                {
                    "labelName": {
                        "defaultValue": "Department",
                        "alias": "Type"
                    },
                    "type": "text"
                },
                {
                    "labelName": {
                        "defaultValue": "Developer",
                        "alias": "Current Department"
                    },
                    "type": "text"
                }
            ],

        "data": [{
            "name": "Department Changes"
        }]
    },
    {
        "name": "Salary Changes",
        "isCollapse": true,
        "isRowWise": false,

        "labels":

            [
                {
                    "labelName": {
                        "defaultValue": "Najeeb",
                        "alias": "Name"
                    },
                    "type": "text"
                },
                {
                    "labelName": {
                        "defaultValue": "05/05/2022",
                        "alias": "Modified Date"
                    },
                    "type": "text"
                },
                {
                    "labelName": {
                        "defaultValue": "20000",
                        "alias": "Previous Salary"
                    },
                    "type": "text"
                },
                {
                    "labelName": {
                        "defaultValue": "Approved",
                        "alias": "Status"
                    },
                    "type": "text"
                },
                {
                    "labelName": {
                        "defaultValue": "08/05/2023",
                        "alias": "Effective Date"
                    },
                    "type": "text"
                },
                {
                    "labelName": {
                        "defaultValue": "Salary",
                        "alias": "Type"
                    },
                    "type": "text"
                },
                {
                    "labelName": {
                        "defaultValue": "24000",
                        "alias": "Current Salary"
                    },
                    "type": "text"
                }
            ],


        "data": [{
            "name": "Salary Changes"
        }]
    },
    {
        "name": "Bank Details Changes",
        "isCollapse": true,
        "isRowWise": false,

        "labels":
            [
                {
                    "labelName": {
                        "defaultValue": "Najeeb",
                        "alias": "Name"
                    },
                    "type": "text"
                },
                {
                    "labelName": {
                        "defaultValue": "05/05/2022",
                        "alias": "Modified Date"
                    },
                    "type": "text"
                },
                {
                    "labelName": {
                        "defaultValue": "Canara",
                        "alias": "Previous Bank"
                    },
                    "type": "text"
                },
                {
                    "labelName": {
                        "defaultValue": "Approved",
                        "alias": "Status"
                    },
                    "type": "text"
                },
                {
                    "labelName": {
                        "defaultValue": "08/05/2023",
                        "alias": "Effective Date"
                    },
                    "type": "text"
                },
                {
                    "labelName": {
                        "defaultValue": "Bank Details",
                        "alias": "Type"
                    },
                    "type": "text"
                },
                {
                    "labelName": {
                        "defaultValue": "HDFC",
                        "alias": "Current Bank"
                    },
                    "type": "text"
                }
            ],
        "data": [{
            "name": "Bank Details Changes"
        }]
    }





]


const manageEmployeeWizardTabs: WizardTabs = [
    {
        label: "Select Employee",
        number: 1,
        tabIndex: 0,
    },
    {
        label: "Employee Info",
        number: 2,
        tabIndex: 1,
    },
    {
        label: "Review",
        number: 3,
        tabIndex: 2,
    }
]

const manageEmployeeFormSections: Sections = [

    {
        "tabName": "Employee Info",
        "sectionName": "Updating Details",
        "sectionDescription": ""
    }

]
const manageEmployeeFormData: FormMeta[] =[
    {
        "tabName": "Select Employee",
        "formName": "employeeForm",
        "labels": []
    },
    {
        "tabName": "Employee Info",
        "formName": "payrollForm",
        "labels": [
            {
                "sectionName": "Updating Details",
                "labelName": {
                    "defaultValue": "Effective Date",
                    "alias": "Effective Date"
                },
                "type": "date"
            },
            {
                "sectionName": "Updating Details",
                "labelName": {
                    "defaultValue": "Department",
                    "alias": "Department"
                },
                "type": "select"
            },
            {
                "sectionName": "Updating Details",
                "labelName": {
                    "defaultValue": "Designation",
                    "alias": "Designation"
                },
                "type": "select"
            },
            {
                "sectionName": "Updating Details",
                "labelName": {
                    "defaultValue": "subsidiary",
                    "alias": "subsidiary"
                },
                "type": "select"
            },
            {
                "sectionName": "Updating Details",
                "labelName": {
                    "defaultValue": "Status",
                    "alias": "Status"
                },
                "type": "select"
            },
            {
                "sectionName": "Updating Details",
                "labelName": {
                    "defaultValue": "Work Calendar  ",
                    "alias": "Work Calendar  "
                },
                "type": "select"
            }
        ]
    }


]
const tabs: TrazepoidTabsMeta []= [
    {
        label: "Employee Details", // table name in Database
        tabIndex: 0,
    }
]

// const trapezoidTabTableData: DataTable[] = [
//     {
//         "tableName": "Employee Details",
//         "headers": ["Employee", "Effective Date", "Previous Grade", "Previous Designation", "Previous Class", "Previous Department"],
//         "collectionSize": 2,
//         "data": [
//             {
//                 "Employee": "Farhan",
//                 "Effective Date": "25/10/2023",
//                 "Previous Grade": "G2",
//                 "Previous Designation": "HR",
//                 "Previous Class": "Class",
//                 "Previous Department": "Human Resource"
//             },
//             {
//                 "Employee": "Sean Bean",
//                 "Effective Date": "25/10/2023",
//                 "Previous Grade": "G2",
//                 "Previous Designation": "HR",
//                 "Previous Class": "Class",
//                 "Previous Department": "Human Resource"
//             },
//         ]
//     }
// ]


export { dataTableList, detailsCardList, manageEmployeeFormData, manageEmployeeFormSections, manageEmployeeWizardTabs, tabs, trapezoidTabTableData };

