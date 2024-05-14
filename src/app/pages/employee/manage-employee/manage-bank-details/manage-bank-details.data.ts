import { DetailsCardMeta, FormMeta, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { FieldConfig, Sections } from "src/app/shared/ui/basic-form/basic-form";
import { DataTable } from "src/app/shared/ui/data-table-list/data-table-list";

import { WizardTabs } from "src/app/shared/ui/wizard-tabs/wizard-tabs";

const dataTableList: DataTable = {
    "tableName": "assignmentTask",
    "headers": ["Sl No", "Name", "Effective Date", "Previous Bank Account No",
        "New Bank Account No", "New Bank Name"],
    "collectionSize": 1,
    "data": [
        {
            "Sl No": "1 ",
            "Name": "Najeeb",
            "Effective Date": "01/02/2023",
            "Previous Bank Account No": "2010202020",
            "New Bank Account No": "2010202020",
            "New Bank Name": "HDFC",
        },
        {
            "Sl No": "2",
            "Name": "Aneesh",
            "Effective Date": "01/02/2023",
            "Previous Bank Account No": "2010202020",
            "New Bank Account No": "2010202020",
            "New Bank Name": "HDFC",
        },
        {
            "Sl No": "3",
            "Name": "Aman",
            "Effective Date": "08/02/2021",
            "Previous Bank Account No": "2010202020",
            "New Bank Account No": "2010202020",
            "New Bank Name": "HDFC",
        },
        {
            "Sl No": "4",
            "Name": "Aneesh",
            "Effective Date": "08/08/2021",
            "Previous Bank Account No": "2010202020",
            "New Bank Account No": "2010202020",
            "New Bank Name": "HDFC",
        },
        {
            "Sl No": "5",
            "Name": "Marzook",
            "Effective Date": "08/08/2021",
            "Previous Bank Account No": "2010202020",
            "New Bank Account No": "2010202020",
            "New Bank Name": "HDFC",
        },

    ]
};



const detailsCardList: DetailsCardMeta[] = [



    {



      "name": "Selected Filter Details",



      "isCollapse": true,



      "isRowWise": false,



      "labels": [



        {



          "labelName": {



            "defaultValue": "Subsidiary",





            "alias": "Subsidiary",



          },



          "type": "text",





        },



        {



          "labelName": {



            "defaultValue": "Status",





            "alias": "Status",



          },



          "type": "text",





        },



        {



          "labelName": {



            "defaultValue": "Jurisdiction",





            "alias": "Jurisdiction",



          },



          "type": "text",





        },



        {



          "labelName": {



            "defaultValue": "Grade",





            "alias": "Grade",



          },



          "type": "text",





        },



  {



          "labelName": {



            "defaultValue": "Location",





            "alias": "Location",



          },



          "type": "text",





        },



  {



          "labelName": {



            "defaultValue": "Employee",





            "alias": "Employee",



          },



          "type": "text",





        },



  {



          "labelName": {



            "defaultValue": "Department",





            "alias": "Department",



          },



          "type": "text",





        },



  {



          "labelName": {



            "defaultValue": "Designation",





            "alias": "Designation",



          },



          "type": "text",





        },









      ],



      "data": [{



        "Subsidiary": "Honey Comb",



        "Status": "Approved",



        "Jurisdiction": "UAE Mainland",



        "Grade": "G1",



        "Location": "Dubai",



        "Employee": "9 Employee Selected",



        "Department": "Human Resources",



        "Designation": "HR Manager"



      }]



    },
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

// const manageEmployeeFormSections: Sections = [

//     {
//         "tabName": "Employee Info",
//         "sectionName": "Updating Details",
//         "sectionDescription": ""
//     }

// ]
// const manageEmployeeFormData: FieldConfig = [
//     {
//         "tabName": "Select Employee",
//         "formName": "employeeForm",
//         "labels": []
//     },
//     {
//         "tabName": "Employee Info",
//         "formName": "payrollForm",
//         "labels": [
//             {
//                 "sectionName": "Updating Details",
//                 "labelName": {
//                     "defaultValue": "Effective Date",
//                     "alias": "Effective Date"
//                 },
//                 "type": "date"
//             },
//             {
//                 "sectionName": "Updating Details",
//                 "labelName": {
//                     "defaultValue": "Department",
//                     "alias": "Department"
//                 },
//                 "type": "select"
//             },
//             {
//                 "sectionName": "Updating Details",
//                 "labelName": {
//                     "defaultValue": "Designation",
//                     "alias": "Designation"
//                 },
//                 "type": "select"
//             },
//             {
//                 "sectionName": "Updating Details",
//                 "labelName": {
//                     "defaultValue": "subsidiary",
//                     "alias": "subsidiary"
//                 },
//                 "type": "select"
//             },
//             {
//                 "sectionName": "Updating Details",
//                 "labelName": {
//                     "defaultValue": "Status",
//                     "alias": "Status"
//                 },
//                 "type": "select"
//             },
//             {
//                 "sectionName": "Updating Details",
//                 "labelName": {
//                     "defaultValue": "Work Calendar  ",
//                     "alias": "Work Calendar  "
//                 },
//                 "type": "select"
//             }
//         ]
//     }


// ]
const tabs: TrazepoidTabsMeta[] = [
    {
        label: "Manage Bank Details", // table name in Database
        tabIndex: 0,
    }
]

const trapezoidTabTableData: DataTable[] = [
    {
    "tableName": "Manage Bank Details",
    "headers": ["Sl No", "Employee", "Effective Date", "Previous Bank Name",  "New Bank Name", "Previous Bank Account No"],
    "collectionSize": 2,
    "data": [
        {
            "Sl No": "1 ",
            "Employee": "Najeeb",
            "Effective Date": "01/02/2023",
            "Previous Bank Name": "HDFC",
            "New Bank Name": "Canara",
            "Previous Bank Account No": "2010202020",
        },
        {
            "Sl No": "2",
            "Employee": "Aneesh",
            "Effective Date": "01/02/2023",
            "Previous Bank Name": "HDFC",
            "New Bank Name": "Canara",
            "Previous Bank Account No": "2010202020",
        },
        {
            "Sl No": "3",
            "Employee": "Aman",
            "Effective Date": "08/02/2021",
            "Previous Bank Name": "HDFC",
            "New Bank Name": "Canara",
            "Previous Bank Account No": "2010202020",
        },
        {
            "Sl No": "4",
            "Employee": "Aneesh",
            "Effective Date": "08/08/2021",
            "Previous Bank Name": "HDFC",
            "New Bank Name": "Canara",
            "Previous Bank Account No": "2010202020",
        },
        {
            "Sl No": "5",
            "Employee": "Marzook",
            "Effective Date": "08/08/2021",
            "Previous Bank Name": "HDFC",
            "New Bank Name": "Canara",
            "Previous Bank Account No": "2010202020",
        },
    ]
}, ]



// MANAGE BANK DETAILS FORM


const manageBankDetailsWizardTabs: WizardTabs = [
    // {
    //     label: "Bank Details",
    //     number: 1,
    //     tabIndex: 0,
    // },

    {
        label: "Salary",
        number: 1,
        tabIndex: 0,
      },

    {
        label: "Review",
        number: 2,
        tabIndex: 2,
    }

]
const manageBankDetailsFormSections: Sections = [

    {
        "tabName": "Salary",
        "sectionName": "Select Filter",
        "sectionDescription": "Change Employee’s Salary Information based on filter"
    }

    // {
    //     "tabName": "Bank Details",
    //     "sectionName": "Select Filter",
    //     "sectionDescription": "Change Employee’s Salary Information based on filter"
    // }

]
const manageBankDetailsFormData: FormMeta =
    // {
    //     "tabName": "Bank Details",
    //     "formName": "subsidiaryForm",
    //     "labels": [
    //         {
    //             "sectionName": "Select Filter",

    //             "labelName": {
    //                 "defaultValue": "Subsidiary",
    //                 "alias": "Subsidiary"
    //             },
    //             "type": "select"
    //         },

    //         {
    //             "sectionName": "Select Filter",
    //             "labelName": {
    //                 "defaultValue": "Designation",
    //                 "alias": "Designation"
    //             },
    //             "type": "select"
    //         },

    //         {
    //             "sectionName": "Select Filter",
    //             "labelName": {
    //                 "defaultValue": "Jurisdiction",
    //                 "alias": "Jurisdiction"
    //             },
    //             "type": "select"
    //         },

    //         {
    //             "sectionName": "Select Filter",
    //             "labelName": {
    //                 "defaultValue": "Status",
    //                 "alias": "Status"
    //             },
    //             "type": "select"
    //         },

    //         {
    //             "sectionName": "Select Filter",
    //             "labelName": {
    //                 "defaultValue": "Location",
    //                 "alias": "Location"
    //             },
    //             "type": "select"
    //         },

    //         {
    //             "sectionName": "Select Filter",
    //             "labelName": {
    //                 "defaultValue": "Grade",
    //                 "alias": "Grade"
    //             },
    //             "type": "select"
    //         },

    //         {
    //             "sectionName": "Select Filter",
    //             "labelName": {
    //                 "defaultValue": "Department",
    //                 "alias": "Department"
    //             },
    //             "type": "select"
    //         },

    //         {
    //             "sectionName": "Select Filter",
    //             "labelName": {
    //                 "defaultValue": "EMployee",
    //                 "alias": "Employee"
    //             },
    //             "type": "select"
    //         },


    //     ]
    // }


    {
        "tabName": "Salary",
        "formName": "subsidiaryForm",
        "labels": [
            {
                "sectionName": "Select Filter",

                "labelName": {
                    "defaultValue": "Subsidiary",
                    "alias": "Subsidiary"
                },
                "placeholder": "Select Subsidiary",
                "type": "select"
            },

            {
                "sectionName": "Select Filter",
                "labelName": {
                    "defaultValue": "Grade",
                    "alias": "Grade"
                },
                "placeholder": "Select Grade",
                "type": "select"
            },

            {
                "sectionName": "Select Filter",
                "labelName": {
                    "defaultValue": "Department",
                    "alias": "Department"
                },
                "placeholder": "Select Department",
                "type": "select"
            },

            {
                "sectionName": "Select Filter",
                "labelName": {
                    "defaultValue": "Jurisdiction",
                    "alias": "Jurisdiction"
                },
                "placeholder": "Select Department",
                "type": "select"
            },

            {
                "sectionName": "Select Filter",
                "labelName": {
                    "defaultValue": "Employee",
                    "alias": "Employee"
                },
                "placeholder": "Select Employee",
                "type": "select"
            },

            {
                "sectionName": "Select Filter",
                "labelName": {
                    "defaultValue": "Status",
                    "alias": "Status"
                },
                "placeholder": "Select Status",
                "type": "select"
            },








        ]
    }



export { dataTableList, detailsCardList, manageEmployeeWizardTabs, tabs, trapezoidTabTableData };





    export { manageBankDetailsFormData, manageBankDetailsFormSections, manageBankDetailsWizardTabs };
