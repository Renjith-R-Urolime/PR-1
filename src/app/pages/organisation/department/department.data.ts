import { Validators } from "@angular/forms";
import { DetailsCardMeta, FormMeta, TableData, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";
import { DataTable } from "src/app/shared/ui/data-table-list/data-table-list";

import { WizardTabs } from "src/app/shared/ui/wizard-tabs/wizard-tabs";

const departmentTableMetaData: TableData = {
    isActionColumn: true,
    columns: [

        {
            name: "name"
        },
        {
            name: "parentDepartment",
            type: "associatedEntity",
            baseUrl: "/organisation/department",
        },
        {
            name: "subsidiary",
            type: "associatedEntity",
            baseUrl: "/organisation/subsidiary",
        }
    ]
}



const detailsCardList: DetailsCardMeta[] = [
    {
        "name": "Department Information",
        "isCollapse": true,
        "isRowWise": false,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "name",
                    "alias": "name"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "displayName",
                    "alias": "displayName"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "parentDepartment",
                    "alias": "parentDepartment"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "country",
                    "alias": "country"
                },
                "type": "text",
            },
            {
                "labelName": {
                    "defaultValue": "subsidiary",
                    "alias": "subsidiary"
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
            // {
            //     "labelName": {
            //         "defaultValue": "country",

            //         "alias": "country",
            //     },
            //     "type": "text",

            // },
            // {
            //     "labelName": {
            //         "defaultValue": "currency",

            //         "alias": "currency",
            //     },
            //     "type": "text",

            // },
        ],
        "data": [
            {
                "name": "Administration",
                "displayName": "Administration",
                "parentDepartment": "Admin",
                "subsidiary": "Honeycomb"
            }
        ]
    },
    // {
    //     "name": "Title",
    //     "isCollapse": true,
    //     "isRowWise": false,
    //     "labels": [
    //         {
    //             "labelName": {
    //                 "defaultValue": "6/5/22 11:53 AM",
    //                 "alias": "Creation Date"
    //             },
    //             "type": "text"
    //         },
    //         {
    //             "labelName": {
    //                 "defaultValue": "13/6/22 12:58 PM",
    //                 "alias": "Last Modified"
    //             },
    //             "type": "text"
    //         },
    //         {
    //             "labelName": {
    //                 "defaultValue": "",
    //                 "alias": "Inactive"
    //             },
    //             "type": "text"
    //         },
    //         {
    //             "labelName": {
    //                 "defaultValue": "4",
    //                 "alias": "Internal ID"
    //             },
    //             "type": "text"
    //         }
    //     ],
    //     "data": [
    //         {
    //             "Creation Date": "6/5/22 11:53 AM",
    //             "Last Modified": "13/6/22 12:58 PM",
    //             "Inactive": "",
    //             "Internal ID": "4"
    //         }
    //     ]
    // }
];

const departmentWizardTabs: WizardTabs = [
    {
        label: "Department",
        number: 1,
        tabIndex: 0,
    },
    {
        label: "Review",
        number: 2,
        tabIndex: 1,
    }
]
const departmentFormSections: Sections = [

    {
        "tabName": "Department",
        "sectionName": "Department Information",
        "sectionDescription": "Enter Department Information"
    }

]
const departmentFormData: FormMeta =
{
    "tabName": "Department",
    "formName": "departmentForm",
    "labels": [
        {
            "sectionName": "Department Information",
            "labelName": {
                "defaultValue": "name",
                "alias": "name"
            },
            "placeholder": "Enter Name",
            "type": "text",
            "col": 4,
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
            "sectionName": "Department Information",
            "labelName": {
                "defaultValue": "displayName",
                "alias": "displayName"
            },
            "placeholder": "Enter Display Name",
            "type": "text",
            "col": 4,
        },

        {
            "sectionName": "Department Information",
            "labelName": {
                "defaultValue": "parentDepartmentId",
                "alias": "parentDepartmentId"
            },
            "placeholder": "Select Parent Department",
            "type": "department",
            "apiLink": "core-hr/organisation/department",

            "col": 4,

        },
        {
            "sectionName": "Department Information",
            "labelName": {
                "defaultValue": "country",
                "alias": "country"
            },
            "placeholder": "Select Country",
            "type": "country",
            "col": 4,
            "apiLink": "core-hr/organisation/subsidiary/countries",
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Country Required"
                }
            ]
        },

        {
            "sectionName": "Department Information",
            "labelName": {
                "defaultValue": "subsidiary",
                "alias": "subsidiary"
            },
            "placeholder": "Select Subsidiary",
            "type": "subsidiary",
            "apiLink": "core-hr/organisation/subsidiary",
            "col": 4,
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Subsidiary Required"
                }
            ],
            // "options": [
            //     {
            //         "id": 1,
            //         "value": "Honeycomb"
            //     },
            //     {
            //         "id": 2,
            //         "value": "Honey"
            //     },
            //     {
            //         "id": 3,
            //         "value": "Honeycomb"
            //     },

            // ]
        },
        {
            "sectionName": "Department Information",
            "labelName": {
                "defaultValue": "inactive",
                "alias": "inactive"
            },
            "type": "toggle",
            "default": false,
            "onCreateVisible": false,
            "onEditVisible": true,
        },

    ]
}


const tabs: TrazepoidTabsMeta[] = [
    {
        label: "systemNotes", // table name in Database
        tabIndex: 0,
    },
    // {
    //     label: "activityLogs",
    //     tabIndex: 1,
    // }
]

const trapezoidTabTableData: DataTable[] = [
    {
        "tableName": "systemNotes",
        "headers": ["setBy", "context", "type", "field", "oldValue", "newValue"],
        "collectionSize": 5,
        "data": [
            {
                "setBy": "PPS7286 Anthony",
                "context": "UI",
                "type": "Change",
                "field": "Document Status",
                "oldValue": "Pending Receipt",
                "newValue": "Pending Bill"
            },
            {
                "setBy": "PPS76567 Rebello",
                "context": "UI",
                "type": "Change",
                "field": "Document Status",
                "oldValue": "Pending Receipt",
                "newValue": "Pending Bill"
            },
            {
                "setBy": "PPS7286 Anthony",
                "context": "UI",
                "type": "Change",
                "field": "Document Status",
                "oldValue": "Pending Receipt",
                "newValue": "Pending Bill"
            },
            {
                "setBy": "PPS76567 Rebello",
                "context": "UI",
                "type": "Change",
                "field": "Document Status",
                "oldValue": "Pending Receipt",
                "newValue": "Pending Bill"
            },
            {
                "setBy": "PPS76567 Rebello",
                "context": "UI",
                "type": "Change",
                "field": "Document Status",
                "oldValue": "Pending Receipt",
                "newValue": "Pending Bill"
            }
        ]
    },
    // {
    //     "tableName": "activityLogs",
    //     "headers": ["timestamp", "user", "activity", "details"],
    //     "collectionSize": 3,
    //     "data": [
    //         {
    //             "timestamp": "2023-05-25T14:30:00Z",
    //             "user": "John Bhaskar",
    //             "activity": "Login",
    //             "details": "Logged in to the system"
    //         },
    //         {
    //             "timestamp": "2023-05-25T15:45:12Z",
    //             "user": "Dwayne Smith",
    //             "activity": "Create",
    //             "details": "Created a new department"
    //         },
    //         {
    //             "timestamp": "2023-05-26T09:20:05Z",
    //             "user": "John Cena",
    //             "activity": "Update",
    //             "details": "Updated the legal name of a department"
    //         }
    //     ]
    // }
]


const tabsMeta: TrazepoidTabsMeta[] = [
    {
        label: "systemNotes", // table name in Database
        tabIndex: 0,
    }/* ,
    {
      label: "activityLogs",
      tabIndex: 1,
    } */
]

const departmentCardMetaData = {
    name: "",
    logo: "",
    labels: [
        {
            labelName: {
                defaultValue: "parentDepartment",
                alias: "parentDepartment"
            }
        },
        {
            labelName: {
                defaultValue: "subsidiary",
                alias: "subsidiary"
            }
        },
    ]
}

export { departmentCardMetaData, departmentFormData, departmentFormSections, departmentTableMetaData, departmentWizardTabs, detailsCardList, tabs, tabsMeta, trapezoidTabTableData };

