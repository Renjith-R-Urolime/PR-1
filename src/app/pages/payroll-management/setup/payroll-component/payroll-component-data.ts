import { Validators } from "@angular/forms"
import { DetailsCardMeta, FormMeta, TableData, TrazepoidTabsMeta } from "src/app/shared/meta-interface"
import { Sections } from "src/app/shared/ui/basic-form/basic-form"
import { DataTable } from "src/app/shared/ui/data-table-list/data-table-list"
// import { DetailsCardMeta } from "src/app/shared/ui/details-card/details-card"
// import { TrazepoidTabsMeta } from "src/app/shared/ui/tab-data-table/trapezoid-tabs"
import { WizardTabs } from "src/app/shared/ui/wizard-tabs/wizard-tabs"

// const componentTableData: DataTable = {
//     "tableName": "contribution",
//     "headers": ["Sequence No", "Name", "Description", "Payroll Item", "Type", "Sub Type", "Debit Account", "Credit Account"],
//     "collectionSize": 5,
//     "data": [
//         {
//             "Name": "Basic Salary",
//             "Description": "Basic Salary",
//             "Item": "Earning",
//             "GL Debit Account": "2000 Account Payable",
//             "GL Credit Account": "6500 Payroll Expense",
//         },
//         {
//             "Name": "House Rent Allowance",
//             "Description": "House Rent Allowance",
//             "Item": "Earning",
//             "GL Debit Account": "2000 Account Payable",
//             "GL Credit Account": "6500 Payroll Expense",
//         },
//         {
//             "Name": "Transport Allowance",
//             "Description": "Transport Allowance",
//             "Item": "Earning",
//             "GL Debit Account": "2000 Account Payable",
//             "GL Credit Account": "6500 Payroll Expense",
//         },
//         {
//             "Name": "Other Allowance",
//             "Description": "Other Allowance",
//             "Item": "Earning",
//             "GL Debit Account": "2000 Account Payable",
//             "GL Credit Account": "6500 Payroll Expense",
//         },
//         {
//             "Name": "Special Allowance",
//             "Description": "Special Allowance",
//             "Item": "Earning",
//             "GL Debit Account": "2000 Account Payable",
//             "GL Credit Account": "6500 Payroll Expense",
//         }
//     ]
// }
const tableMetaData: TableData = {
    isActionColumn: true,
    columns: [
        {
            name: "sequenceNo",
        },
        {
            name: "name",
        },
        {
            name: "description",
        },
        {
            name: "payrollItem",
        },
        {
            name: "type",
        },
        {
            name: "subType",
        }
    ]
}
const tabsMeta: TrazepoidTabsMeta[] = [
    {
        label: "systemNotes", // table name in Database
        tabIndex: 0,
    }
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

const wizardTabs: WizardTabs = [
    {
        label: "Component",
        number: 1,
        tabIndex: 0,
    },
    {
        label: "Review",
        number: 2,
        tabIndex: 1,
    }
]
const formSections: Sections = [

    {
        "tabName": "Component",

        "sectionName": "Payroll Component Information",
        "sectionDescription": "Enter Component Details"
    }

]
const componentFormData: FormMeta[] = [
    {
        "tabName": "Component",
        "formName": "componentForm",
        "labels": [
            /*  {
                 "sectionName": "Payroll Component Information",
                 "labelName": {
                     "defaultValue": "sequenceNo",
                     "alias": "sequenceNo"
                 },
                 "placeholder": "Enter Sequence Number",
                 "type": "text",
                 "required": true,
                 "validations": [
                     {
                         name: "required",
                         validator: Validators.required,
                         message: "Sequence No Required"
                     }
                 ]
             }, */
            {
                "sectionName": "Payroll Component Information",
                "labelName": {
                    "defaultValue": "name",
                    "alias": "name"
                },
                "placeholder": "Enter Name",
                "type": "text",
                "required": true,
                "validations": [
                    {
                        name: "required",
                        validator: Validators.required,
                        message: "Name Required"
                    }
                ],

            },
            {
                "sectionName": "Payroll Component Information",
                "labelName": {
                    "defaultValue": "description",
                    "alias": "description"
                },
                "placeholder": "Enter Description",
                "type": "text",
                "required": true,
                "validations": [
                    {
                        name: "required",
                        validator: Validators.required,
                        message: "Description Required"
                    }
                ]
            },
            {
                "sectionName": "Payroll Component Information",
                "labelName": {
                    "defaultValue": "payrollItem",
                    "alias": "payrollItem"
                },
                "placeholder": "select payroll item",
                "type": "item",
                "jsonListName": "payrollItem",
                "required": true,
                "validations": [
                    {
                        name: "required",
                        validator: Validators.required,
                        message: "Payroll Item Required"
                    }
                ]
            },
            {
                "sectionName": "Payroll Component Information",
                "labelName": {
                    "defaultValue": "type",
                    "alias": "type"
                },
                "placeholder": "select type",
                "type": "payrollType",
                "required": true,
                "jsonListName": "type",
                "validations": [
                    {
                        name: "required",
                        validator: Validators.required,
                        message: "Type Required"
                    }
                ]
            },
            {
                "sectionName": "Payroll Component Information",
                "labelName": {
                    "defaultValue": "subType",
                    "alias": "subType"
                },
                "placeholder": "select sub type",
                "type": "subType",
                "jsonListName": "subType",
                "required": true,
                "validations": [
                    {
                        name: "required",
                        validator: Validators.required,
                        message: "Sub Type Required"
                    }
                ]
            },
            {
                "sectionName": "Payroll Component Information",
                "labelName": {
                    "defaultValue": "tagGLAccount",
                    "alias": "Tag GL Account"
                },
                "labelTransformationCancelled": true,
                "placeholder": "select credit account",
                "type": "tagGLAccount",
            },
            {
                "sectionName": "Payroll Component Information",
                "labelName": {
                    "defaultValue": "inactive",
                    "alias": "inactive"
                },
                "col": 4,
                "type": "toggle",
                "onCreateVisible": false,
                "onEditVisible": true,
            }
        ]
    }
]

const tagGLAccountFormData = {
    "tabName": "Component",
    "formName": "componentForm",
    "labels": [
        {
            "sectionName": "Payroll Component Information",
            "labelName": {
                "defaultValue": "expenseTypeId",
                "alias": "expenseType"
            },
            "placeholder": "select",
            "type": "expenseType",
            "apiLink": "payroll/settings/expense-type",
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Debit Account Required"
                }
            ]
        },
        {
            "sectionName": "Payroll Component Information",
            "labelName": {
                "defaultValue": "debitAccountId",
                "alias": "debitAccount"
            },
            "placeholder": "select",
            "type": "debitAccount",
            "apiLink": "payroll/setup/chart-of-accounts",
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Debit Account Required"
                }
            ]
        },
        {
            "sectionName": "Payroll Component Information",
            "labelName": {
                "defaultValue": "creditAccountId",
                "alias": "creditAccount"
            },
            "placeholder": "select",
            "type": "creditAccount",
            "apiLink": "payroll/setup/chart-of-accounts",
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Credit Account Required"
                }
            ]
        },
    ]
}

const detailsCardList: DetailsCardMeta[] = [{
    "name": "Payroll Component Information",
    "isCollapse": true,
    "isRowWise": false,


    "labels": [
        {
            "labelName": {
                "defaultValue": "sequenceNo",
                "alias": "sequenceNo"
            },
            "type": "number"
        },
        {
            "labelName": {
                "defaultValue": "name",
                "alias": "name"
            },
            "type": "text"
        },
        {
            "labelName": {
                "defaultValue": "description",
                "alias": "description"
            },
            "type": "text"
        },
        {
            "labelName": {
                "defaultValue": "payrollItem",
                "alias": "payrollItem"
            },
            "type": "text"
        },
        {
            "labelName": {
                "defaultValue": "type",
                "alias": "type"
            },
            "type": "text"
        },
        {
            "labelName": {
                "defaultValue": "subType",
                "alias": "subType"
            },
            "type": "text"
        },

        {
            "labelName": {
                "defaultValue": "debitAccount",
                "alias": "debitAccount"
            },
            "type": "daccount",
            "custom": true
        },

        {
            "labelName": {
                "defaultValue": "creditAccount",
                "alias": "creditAccount"
            },
            "type": "caccount",
             "custom": true
        },
        {
            "labelName": {
                "defaultValue": "",
                "alias": ""
            },
            "custom": true,
            "templateName": "tagGLAccount"
        },

    ]


    ,
    "data": [{
        "Name": "Basic Salary",
        "Sequence No": "3232",
        "Description": "Basic Salary",
        "Type": "Salary",
        "Item": "Earning",
        "Sub Type": "Salary",
        "GL Debit Account": "200 Account Payable",
        "GL Credit Account": "6500 Payroll Expense",

    }]
},



]
const payrollTypeList = [
    {
        "id": "1",
        "name": "Fixed Pay",
        "subType": [
            {
                "id": "1",
                "name": "Salary"
            },
            {
                "id": "2",
                "name": "Contribution"
            },
            {
                "id": "3",
                "name": "Tax"
            }]
    },
    {
        "id": "2",
        "name": "Variable Pay",
        "subType": [
            {
                "id": "1",
                "name": "Loan"
            },
            {
                "id": "2",
                "name": "Leave"
            },
            {
                "id": "3",
                "name": "One Time"
            },
            {
                "id": "4",
                "name": "Expense"
            },
            {
                "id": "5",
                "name": "Reimbursement"
            },
            {
                "id": "6",
                "name": "Provision"
            },
            {
                "id": "7",
                "name": "Full & Final"
            }
        ]
    }
]
const payrollItemList = [
    {
        "id": "1",
        "name": "Earning"
    },
    {
        "id": "2",
        "name": "Deduction"
    }
]

const cardMetaData = {
    name: "",
    logo: "",
    labels: [
        {
            labelName: {
                defaultValue: "payrollItem",
                alias: "payrollItem"
            }
        },
        {
            labelName: {
                defaultValue: "type",
                alias: "type"
            }
        },
    ]
}

export { cardMetaData, componentFormData, detailsCardList, formSections, payrollItemList, payrollTypeList, tableMetaData, tabsMeta, trapezoidTabTableData, wizardTabs,tagGLAccountFormData }

