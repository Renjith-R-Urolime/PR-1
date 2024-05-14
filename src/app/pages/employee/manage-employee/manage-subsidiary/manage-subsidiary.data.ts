import { DetailsCardMeta, FormMeta, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { FieldConfig, Sections } from "src/app/shared/ui/basic-form/basic-form";
import { DataTable } from "src/app/shared/ui/data-table-list/data-table-list";

import { WizardTabs } from "src/app/shared/ui/wizard-tabs/wizard-tabs";

const dataTableList: DataTable = {
    "tableName": "manageSalaryTable",
    "headers": ["Sl No", "Name", "Effective Date", "End Date", "Component",
        "Current Amount", "New Amount", "Status"],
    "collectionSize": 1,
    "data": [
        {
            "Sl No": "1 ",
            "Name": "Aman",
            "Effective Date": "01/02/2023",
            "End Date": "04/02/2023",
            "Component": "Lorem Ipsum",
            "Current Amount": "******",
            "New Amount": "******",
            "Status": "Approved",
        },
        {
            "Sl No": "2",
            "Name": "Najeeb",
            "Effective Date": "05/05/2022",
            "End Date": "08/05/2023",
            "Component": "Lorem Ipsum",
            "Current Amount": "******",
            "New Amount": "******",
            "Status": "Pending",
        },
        {
            "Sl No": "3",
            "Name": "Aneesh",
            "Effective Date": "09/04/2023",
            "End Date": "10/05/2021",
            "Component": "Lorem Ipsum",
            "Current Amount": "******",
            "New Amount": "******",
            "Status": "Approved",
        },
        {
            "Sl No": "4",
            "Name": "Aman",
            "Effective Date": "01/02/2023",
            "End Date": "04/02/2023",
            "Component": "Lorem Ipsum",
            "Current Amount": "******",
            "New Amount": "******",
            "Status": "Pending",
        },
        {
            "Sl No": "4",
            "Name": "Aneesh",
            "Effective Date": "08/08/2021",
            "End Date": "09/08/2023",
            "Component": "Lorem Ipsum",
            "Current Amount": "******",
            "New Amount": "******",
            "Status": "Approved ",
        },

    ]
};


const detailsCardList: DetailsCardMeta[] = [{
    "name": "Selected Filter Details",
    "isCollapse": true,
    "isRowWise": false,
    "labels": [
      {
        "labelName": {
          "defaultValue": "Effective Date",
          "alias": "Effective Date"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "User Subsidiary",
          "alias": "User Subsidiary"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "Payroll Subsidiary",
          "alias": "Payroll Subsidiary"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "Expense Subsidiary",
          "alias": "Expense Subsidiary"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "Sponser Subsidiary",
          "alias": "Sponser Subsidiary"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "End Data",
          "alias": "End Data"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "Status",
          "alias": "Status"
        },
        "type": "text"
      },

    ],
    "data": [
      {
        "Effective Date": "08/05/2023",
        "User Subsidiary": "NALG",
        "Payroll Subsidiary": "NALG",
        "Expense Subsidiary": "NALG",
        "Sponser Subsidiary": "NALG",
        "End Data": "08/05/2023",
        "Status": "Approved",

      }
    ]
  }]


const tabs: TrazepoidTabsMeta[] = [
    {
        label: "Subsidiary Details", // table name in Database
        tabIndex: 0,
    }
]

// const trapezoidTabTableData: DataTable = {
//     "tableName": "manageSalaryTable",
//     "headers": ["Employee", "Effective Date",  "Previous User Subsidiary" , "Previous Payroll Subsidiary" , "Previous Sponser Subsidiary"
//     ],
//     "collectionSize": 1,
//     "data": [
//         {

//             "Employee": "Farhan",
//             "Effective Date": "01/02/2023",
//             "Previous User Subsidiary": "HDFC",
//             "Previous Payroll Subsidiary": "3123123213",
//             "Previous Sponser Subsidiary": "3123123123",

//         },
//         {

//             "Employee": "Sean Bean",
//             "Effective Date": "01/02/2023",
//             "Previous User Subsidiary": "HDFC",
//             "Previous Payroll Subsidiary": "3123123213",
//             "Previous Sponser Subsidiary": "3123123123",

//         },
//         {

//             "Employee": "Karina Clark",
//             "Effective Date": "01/02/2023",
//             "Previous User Subsidiary": "HDFC",
//             "Previous Payroll Subsidiary": "3123123213",
//             "Previous Sponser Subsidiary": "3123123123",

//         },
//         {

//             "Employee": "Marzook",
//             "Effective Date": "01/02/2023",
//             "Previous User Subsidiary": "HDFC",
//             "Previous Payroll Subsidiary": "3123123213",
//             "Previous Sponser Subsidiary": "3123123123",

//         },
//         {

//             "Employee": "Karina Clark",
//             "Effective Date": "01/02/2023",
//             "Previous User Subsidiary": "HDFC",
//             "Previous Payroll Subsidiary": "3123123213",
//             "Previous Sponser Subsidiary": "3123123123",

//         },


//     ]
// };

const trapezoidTabTableData: DataTable[] = [
    {
      "tableName": "Subsidiary Details",
      "headers": ["Employee", "Effective Date",  "Previous User Subsidiary" , "Previous Payroll Subsidiary" , "Previous Sponser Subsidiary"
    ],

      "collectionSize": 3,
      "data": [
        {

            "Employee": "Farhan",
            "Effective Date": "01/02/2023",
            "Previous User Subsidiary": "HDFC",
            "Previous Payroll Subsidiary": "3123123213",
            "Previous Sponser Subsidiary": "3123123123",

        },
        {

            "Employee": "Sean Bean",
            "Effective Date": "01/02/2023",
            "Previous User Subsidiary": "HDFC",
            "Previous Payroll Subsidiary": "3123123213",
            "Previous Sponser Subsidiary": "3123123123",

        },
        {

            "Employee": "Karina Clark",
            "Effective Date": "01/02/2023",
            "Previous User Subsidiary": "HDFC",
            "Previous Payroll Subsidiary": "3123123213",
            "Previous Sponser Subsidiary": "3123123123",

        },
        {

            "Employee": "Marzook",
            "Effective Date": "01/02/2023",
            "Previous User Subsidiary": "HDFC",
            "Previous Payroll Subsidiary": "3123123213",
            "Previous Sponser Subsidiary": "3123123123",

        },
        {

            "Employee": "Karina Clark",
            "Effective Date": "01/02/2023",
            "Previous User Subsidiary": "HDFC",
            "Previous Payroll Subsidiary": "3123123213",
            "Previous Sponser Subsidiary": "3123123123",

        },


            ]
    }
  ]

// Model Data
const manageSubsidiaryWizardTabs: WizardTabs = [
    {
        label: "Select Employee",
        number: 1,
        tabIndex: 0,
    },
    {
        label: "Subsidiary",
        number: 2,
        tabIndex: 1,
    },
    {
        label: "Review",
        number: 3,
        tabIndex: 2,
    }
]

const manageSubsidiaryFormSections: Sections = [
    {
        "tabName": "Subsidiary",
        "sectionName": "Updating Details",
        "sectionDescription": ""
    }
    // {
    //     "tabName": "Subsidiary",
    //     "sectionName": "Updated Details",
    //     "sectionDescription": ""
    // }
]

const  manageSubsidiaryFormData: FormMeta []= [

    // {
    //     "tabName": "Subsidiary",
    //     "formName": "manageSubsidiaryForm",
    //     "labels": [
    //         {
    //             "sectionName": "Updated Details",

    //             "labelName": {
    //                 "defaultValue": "08/05/2023",
    //                 "alias": "Effective Date"
    //             },
    //             "type": "date"
    //         },

    //         {
    //             "sectionName": "Updated Details",
    //             "labelName": {
    //                 "defaultValue": "User Subsidiary",
    //                 "alias": "User Subsidiary"
    //             },
    //             "type": "select"
    //         },
    //         {
    //             "sectionName": "Updated Details",
    //             "labelName": {
    //                 "defaultValue": "Payroll Subsidiary",
    //                 "alias": "Payroll Subsidiary"
    //             },
    //             "type": "select"
    //         },
    //         {
    //             "sectionName": "Updated Details",
    //             "labelName": {
    //                 "defaultValue": "Expense Subsidiary",
    //                 "alias": "Expense Subsidiary"
    //             },
    //             "type": "select"
    //         },
    //         {
    //             "sectionName": "Updated Details",
    //             "labelName": {
    //                 "defaultValue": "Sponser Subsidiary",
    //                 "alias": "Sponser Subsidiary"
    //             },
    //             "type": "select"
    //         },

    //         {
    //             "sectionName": "Updated Details",

    //             "labelName": {
    //                 "defaultValue": "08/05/2023",
    //                 "alias": "End Date"
    //             },
    //             "type": "date"
    //         },

    //         {
    //             "sectionName": "Updated Details",
    //             "labelName": {
    //                 "defaultValue": "Status",
    //                 "alias": "Status"
    //             },
    //             "type": "select"
    //         },




    //     ]
    // }

    {
        "tabName": "Select Employee",
        "formName": "employeeForm",
        "labels": []
    },
    {
        "tabName": "Subsidiary",
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
                    "defaultValue": "User Subidiary",
                    "alias": "User Subidiary"
                },
                "type": "select"
            },
            {
                "sectionName": "Updating Details",
                "labelName": {
                    "defaultValue": "Payroll Subidiary",
                    "alias": "Payroll Subidiary"
                },
                "type": "select"
            },
            {
                "sectionName": "Updating Details",
                "labelName": {
                    "defaultValue": "Expense Subidiary",
                    "alias": "Expense Subidiary"
                },
                "type": "select"
            },
            {
                "sectionName": "Updating Details",
                "labelName": {
                    "defaultValue": "Sponser Subidiary",
                    "alias": "Sponser Subidiary"
                },
                "type": "select"
            },
            {
                "sectionName": "Updating Details",
                "labelName": {
                    "defaultValue": "End Date",
                    "alias": "End Date"
                },
                "type": "date"
            },

            {
                "sectionName": "Updating Details",
                "labelName": {
                    "defaultValue": "Sponser Subidiary",
                    "alias": "Sponser Subidiary"
                },
                "type": "select"
            },








        ]
    }
]










//Data List & Details Page
export { dataTableList, detailsCardList, tabs, trapezoidTabTableData };

//Model & Form Data
    export { manageSubsidiaryFormData, manageSubsidiaryFormSections, manageSubsidiaryWizardTabs };

