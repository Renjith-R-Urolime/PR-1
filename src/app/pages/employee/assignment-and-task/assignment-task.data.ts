import { DetailsCardMeta, FormMeta } from "src/app/shared/meta-interface";
import { FieldConfig, Sections } from "src/app/shared/ui/basic-form/basic-form";
import { DataTable } from "src/app/shared/ui/data-table-list/data-table-list";
import { WizardTabs } from "src/app/shared/ui/wizard-tabs/wizard-tabs";

const assignmentTaskTableData: DataTable = {
    "tableName": "assignmentTask",
    "headers": ["Task Name", "Employee", "Project", "Start Date", "End Date", "Description", "Priority"],
    "collectionSize": 5,
    "empImageYesorNo": true, // Set to true to enable image display
    "data": [
        {
            "Task Name": "Dependents",
            "Employee": "Karina Clark",
            "Project": "Infithra  ",
            "Start Date": "01/08/2022 ",
            "End Date": "28/08/2022",
            "Description": "Lorem Ipsum",
            "Priority": "Low",
        },
        {
            "Task Name": "Manage Employee",
            "Employee": "Sean Bean",
            "Project": "Infithra  ",
            "Start Date": "09/05/2023 ",
            "End Date": "31/05/2023",
            "Description": "Lorem Ipsum",
            "Priority": "High",
        },
        {
            "Task Name": "Travels",
            "Employee": "Alan Johnson",
            "Project": "Infithra  ",
            "Start Date": "01/08/2022 ",
            "End Date": "28/08/2022",
            "Description": "Lorem Ipsum",
            "Priority": "Medium",
        },
        {
            "Task Name": "Employee Offboard",
            "Employee": "Robert Doe",
            "Project": "Infithra  ",
            "Start Date": "01/08/2022 ",
            "End Date": "28/08/2022",
            "Description": "Lorem Ipsum",
            "Priority": "High",
        },
        {
            "Task Name": "Credentials",
            "Employee": "Olivia Wild",
            "Project": "Infithra  ",
            "Start Date": "01/08/2022 ",
            "End Date": "28/08/2022",
            "Description": "Lorem Ipsum",
            "Priority": "High",
        },
    ]
}


const detailsCardList: DetailsCardMeta[] = [
    {
        "name": "Location Details",
        "isCollapse": true,
        "isRowWise": false,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "UAE",
                    "alias": "Name"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Dubai",
                    "alias": "Parent Location"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Honeycomb",
                    "alias": "Subsidiary"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "inactive",
                    "alias": "status"
                },
                "type": "status",
            }
        ],
        "data": [{
            "Name": "UAE",
            "Parent Location": "Dubai",
            "Subsidiary": "Honeycomb"
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



const assignmentTaskwizardTabs: WizardTabs = [
    {
        label: "Task",
        number: 1,
        tabIndex: 0,
    },
    {
        label: "Review",
        number: 2,
        tabIndex: 1,
    }
]
const assignmentTaskformSections: Sections = [

    {
        "tabName": "Task",
        "sectionName": "Task Information",
        "sectionDescription": "Enter Assignment & task Information"
    }

]
const assignmentTaskFormData: FormMeta[] = [
    {
        "tabName": "Task",
        "formName": "taskForm",
        "labels": [
            {
                "sectionName": "Task Information",
                "labelName": {
                    "defaultValue": "Task Name",
                    "alias": "Task Name"
                },
                "type": "text"
            },
            {
                "sectionName": "Task Information",
                "labelName": {
                    "defaultValue": "Employee ",
                    "alias": "Employee "
                },
                "type": "select"
            },
            {
                "sectionName": "Task Information",
                "labelName": {
                    "defaultValue": "Project ",
                    "alias": "Project"
                },
                "type": "select"
            },
            {
                "sectionName": "Task Information",
                "labelName": {
                    "defaultValue": "Priority",
                    "alias": "Priority"
                },
                "type": "select"
            },
            {
                "sectionName": "Task Information",
                "labelName": {
                    "defaultValue": "Start Date",
                    "alias": "Start Date"
                },
                "type": "date"
            },
            {
                "sectionName": "Task Information",
                "labelName": {
                    "defaultValue": "Due Date",
                    "alias": "Due Date"
                },
                "type": "date"
            },
            {
                "sectionName": "Task Information",
                "labelName": {
                    "defaultValue": "Description",
                    "alias": "Description"
                },
                "type": "texteditor"
            }
        ]
    }

]






export { assignmentTaskwizardTabs, assignmentTaskformSections, assignmentTaskFormData, detailsCardList, assignmentTaskTableData };

