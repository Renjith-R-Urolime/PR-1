import { DetailsCardMeta, FormMeta } from "src/app/shared/meta-interface";
import { FieldConfig, Sections } from "src/app/shared/ui/basic-form/basic-form";
import { DataTable } from "src/app/shared/ui/data-table-list/data-table-list";
import { WizardTabs } from "src/app/shared/ui/wizard-tabs/wizard-tabs";

const payrollOffBoardTableData: DataTable = {
    "tableName": "assignmentTask",
    "headers": ["Employee", "Type", "Exit Type", "Exit Reason", "Clearance Checklist"],
    "collectionSize": 5,
    "data": [
        {
            "Employee": "Karina Clark ",
            "Type": "Resign",
            "Exit Type": "Immediate",
            "Exit Reason": "Joining New Company",
            "Clearance Checklist": "Done",
        },
        {
            "Employee": "Sean Bean ",
            "Type": "Terminate",
            "Exit Type": "Notice Period",
            "Exit Reason": "Not well ",
            "Clearance Checklist": "Done",
        },
        {
            "Employee": "Alan Johnson ",
            "Type": "Resign",
            "Exit Type": "Immediate ",
            "Exit Reason": "Joining New Company",
            "Clearance Checklist": "Done",

        },
        {
            "Employee": "Robert Doe",
            "Type": "Resign",
            "Exit Type": "Immediate",
            "Exit Reason": "Not well ",
            "Clearance Checklist": "Done",

        },
        {
            "Employee": "Olivia Wild",
            "Type": "Terminate",
            "Exit Type": "Immediate ",
            "Exit Reason": "Not well",
            "Clearance Checklist": "Done",

        },
    ]
}

const detailsCardList: DetailsCardMeta[] = [
    {
        "name": "Employee Offboard Information",
        "isCollapse": true,
        "isRowWise": false,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "Employee",
                    "alias": "Employee"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Checklist Type",
                    "alias": "Checklist Type"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Type",
                    "alias": "Type"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Exit Interview",
                    "alias": "Exit Interview"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Exit Type",
                    "alias": "Exit Type"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Employee Inactive",
                    "alias": "Employee Inactive"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Exit Reason",
                    "alias": "Exit Reason"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Exit Interview Comments",
                    "alias": "Exit Interview Comments"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Clearance Checklist",
                    "alias": "Clearance Checklist"
                },
                "type": "text"
            }
        ],
        "data": [
            {
                "Employee": "Karina Clark",
                "Checklist Type": "Lorem Ipsum",
                "Type": "Resign",
                "Exit Interview": "",
                "Exit Type": "Immediate",
                "Employee Inactive": "",
                "Exit Reason": "Joining New Company",
                "Exit Interview Comments": "Lorem Ipsum",
                "Clearance Checklist": "Done"
            }
        ]
    },
    {
        "name": "Title",
        "isCollapse": true,
        "isRowWise": true,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "Creation Date",
                    "alias": "Creation Date"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Last Modified",
                    "alias": "Last Modified"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Inactive",
                    "alias": "Inactive"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Internal ID",
                    "alias": "Internal ID"
                },
                "type": "text"
            }
        ],
        "data": [
            {
                "Creation Date": "6/5/22 11:53 AM",
                "Last Modified": "13/6/22 12:58 PM",
                "Inactive": "",
                "Internal ID": "4"
            }
        ]
    }
];

const payrollOffBoardwizardTabs: WizardTabs = [
    {
        label: "Employee offboard",
        number: 1,
        tabIndex: 0,
    },

    {
        label: "Review",
        number: 2,
        tabIndex: 1,
    }
]
const payrollOffBoardformSections: Sections = [

    {
        "tabName": "Employee offboard",
        "sectionName": "Employee Offboard",
        "sectionDescription": "Enter Employee Offboard Information"
    }

]
const payrollOffBoardFormData: FormMeta =
    {
        "tabName": "Employee offboard",
        "formName": "payrollForm",
        "labels": [
            {
                "sectionName": "Employee Offboard",
                "labelName": {
                    "defaultValue": "Employee",
                    "alias": "Employee"
                },
                "type": "select"
            },
            {
                "sectionName": "Employee Offboard",
                "labelName": {
                    "defaultValue": "Type",
                    "alias": "Type"
                },
                "type": "select"
            },
            {
                "sectionName": "Employee Offboard",
                "labelName": {
                    "defaultValue": "Exit Type",
                    "alias": "Exit Type"
                },
                "type": "text",
                "col": 4
            },
            {
                "sectionName": "Employee Offboard",
                "labelName": {
                    "defaultValue": "Exit Reason",
                    "alias": "Exit Reason"
                },
                "type": "text",
                "col": 4
            },
            {
                "sectionName": "Employee Offboard",
                "labelName": {
                    "defaultValue": "Exit Interview Comments",
                    "alias": "Exit Interview Comments"
                },
                "type": "text",
                "col": 4
            },
            {
                "sectionName": "Employee Offboard",
                "labelName": {
                    "defaultValue": "Clearance Checklist ",
                    "alias": "Clearance Checklist "
                },
                "type": "select"
            },
            {
                "sectionName": "Employee Offboard",
                "labelName": {
                    "defaultValue": "Checklist Type",
                    "alias": "Checklist Type"
                },
                "type": "select"
            },
            {
                "sectionName": "Employee Offboard",
                "labelName": {
                    "defaultValue": "Exit Interview",
                    "alias": "Exit Interview"
                },
                "type": "checkbox"
            },
            {
                "sectionName": "Employee Offboard",
                "labelName": {
                    "defaultValue": "Employee Inactive",
                    "alias": "Employee Inactive"
                },
                "type": "checkbox"
            }
        ]
    }









export { payrollOffBoardwizardTabs, payrollOffBoardformSections, payrollOffBoardFormData, detailsCardList, payrollOffBoardTableData };

