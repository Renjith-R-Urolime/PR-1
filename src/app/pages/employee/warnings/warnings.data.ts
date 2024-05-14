import { DetailsCardMeta, FormMeta } from "src/app/shared/meta-interface";
import { FieldConfig, Sections } from "src/app/shared/ui/basic-form/basic-form";


import { WizardTabs } from "src/app/shared/ui/wizard-tabs/wizard-tabs";

// const payrollOnboardTableData: DataTable = {
//     "tableName": "payroll",
//     "headers": ["id", "title", "creationDate", "postedDate", "distributionType", "subType"],
//     "collectionSize": 5,
//     "data": [
//         {
//             "id": "703420114",
//             "title": "Company Policy",
//             "creationDate": "01/02/2023   ",
//             "postedDate": "01/02/2023   ",
//             "distributionType": "Class",
//             "subType": "97844829432",
//         },
//         {
//             "id": "703420114",
//             "title": "Benefits Enrollment",
//             "creationDate": "02/03/2023 ",
//             "postedDate": "02/03/2023",
//             "distributionType": "Subsidiary",
//             "subType": "42380489203",
//         },
//         {
//             "id": "703420114",
//             "title": "His(or Her) Excellency",
//             "creationDate": "03/04/2023",
//             "postedDate": "03/04/2023 ",
//             "distributionType": "Department",
//             "subType": "98743223431",
//         },
//         {
//             "id": "703420114",
//             "title": "N-Freight",
//             "creationDate": "24/12/2020 ",
//             "postedDate": "24/12/2020",
//             "distributionType": "Group - Subordinates",
//             "subType": "81831809138120",
//         },
//         {
//             "id": "703420114",
//             "title": "N-Freight",
//             "creationDate": "31/6/2022 ",
//             "postedDate": "01/02/2023   ",
//             "distributionType": "N- Freight - NASA",
//             "subType": "348734788764",
//         }
//     ]
// }

// const detailsCardList: DetailsCardMeta[] = [{
//     "name": "Announcement Details",
//     "isCollapse": true,
//     "isRowWise": true,
//     "detailsData": [
//         {
//             "labelName": "Title",
//             "value": "New Benefits for Employees from Q4-2023",
//             "type": "text",
//         },
//         {
//             "labelName": "Description",
//             "value": "Open enrollment for benefits begins on Monday, August 1st. This is your opportunity to review and make changes to your benefits package for the upcoming year. We have introduced exciting new options, including enhanced healthcare plans, additional retirement savings programs, and expanded wellness benefits.",
//             "type": "text"
//         }
//     ]
// }, {
//     "name": "Timeline",
//     "isCollapse": true,
//     "isRowWise": true,

//     "detailsData": [
//         {
//             "labelName": "Start Date",
//             "value": "16/05/2023",
//             "type": "text"
//         },
//         {
//             "labelName": "End Date",
//             "value": "23/05/2023",
//             "type": "text"
//         }
//     ]
// }
//     , {
//     "name": "Distribution Channels",
//     "isCollapse": true,
//     "isRowWise": true,

//     "detailsData": [
//         {
//             "labelName": "Announcement Type",
//             "value": "Departments",
//             "type": "text"
//         },
//         {
//             "labelName": "Departments",
//             "value": "Software, Auditing,Administration,HR",
//             "type": "text"
//         }
//     ]
// }
// ]

const warningsWizardTabs: WizardTabs = [
    {
        label: "Warning",
        number: 1,
        tabIndex: 0,
    },
    {
        label: "Review",
        number: 2,
        tabIndex: 1,
    }

]
const warningsformSections: Sections = [

    {
        "tabName": "Warning",
        "sectionName": "Warning Information",
        "sectionDescription": "Enter Warning Information"
    }


]
const warningsFormData:  FormMeta =
    {
        "tabName": "Warning",
        "formName": "warningForm",
        "labels": [
            {
                "sectionName": "Warning Information",
                "labelName": {
                    "defaultValue": "From",
                    "alias": "From"
                },
                "type": "select"
            },
            {
                "sectionName": "Warning Information",
                "labelName": {
                    "defaultValue": "Title",
                    "alias": "Title"
                },
                "type": "text"
            },
            {
                "sectionName": "Warning Information",
                "labelName": {
                    "defaultValue": "Date",
                    "alias": "Date"
                },
                "type": "date"
            },
            {
                "sectionName": "Warning Information",
                "labelName": {
                    "defaultValue": "To",
                    "alias": "To"
                },
                "type": "select"
            },
            {
                "sectionName": "Warning Information",
                "labelName": {
                    "defaultValue": "Type",
                    "alias": "Type"
                },
                "type": "select"
            },
            {
                "sectionName": "Warning Information",
                "labelName": {
                    "defaultValue": "Description",
                    "alias": "Description"
                },
                "type": "textarea"
            }
        ]
    }
    // {
    //     "tabName": "Leave",
    //     "formName": "leaveForm",
    //     "labels": [
    //         {
    //             "sectionName": "Leave Details",
    //             "labelName": {
    //                 "defaultValue": "Leave From",
    //                 "alias": "Leave From"
    //             },
    //             "type": "date"
    //         },
    //         {
    //             "sectionName": "Leave Details",
    //             "labelName": {
    //                 "defaultValue": "Leave To",
    //                 "alias": "Leave To"
    //             },
    //             "type": "date"
    //         },
    //         {
    //             "sectionName": "Leave Details",
    //             "labelName": {
    //                 "defaultValue": "Leave Status",
    //                 "alias": "Leave Status"
    //             },
    //             "type": "select"
    //         },
    //         {
    //             "sectionName": "Leave Setup",
    //             "labelName": {
    //                 "defaultValue": "Leave Plan",
    //                 "alias": "Leave Plan"
    //             },
    //             "type": "text"
    //         },
    //         {
    //             "sectionName": "Provision1",
    //             "labelName": {
    //                 "defaultValue": "Leave Provision Amount",
    //                 "alias": "Leave Provision Amount"
    //             },
    //             "type": "text"
    //         }

    //     ]

    // }








export { warningsWizardTabs, warningsFormData, warningsformSections, detailsCardList };



export const warningDetails = [
    {
        from: 'Karina Clark',
        title: 'Lorem Ipsum',
        date: '01/08/2022',
        to: 'Alan Johnson',
        description: 'Lorem Ipsum',
        type: 'Mandatory Sign',

    },
    {
        from: 'Karina Clark',
        title: 'Lorem Ipsum',
        date: '01/08/2022',
        to: 'Alan Johnson',
        description: 'Lorem Ipsum',
        type: 'Mandatory Sign',

    },
    {
        from: 'Karina Clark',
        title: 'Lorem Ipsum',
        date: '01/08/2022',
        to: 'Alan Johnson',
        description: 'Lorem Ipsum',
        type: 'Mandatory Sign',

    },
    {
        from: 'Karina Clark',
        title: 'Lorem Ipsum',
        date: '01/08/2022',
        to: 'Alan Johnson',
        description: 'Lorem Ipsum',
        type: 'Mandatory Sign',

    },
    {
        from: 'Karina Clark',
        title: 'Lorem Ipsum',
        date: '01/08/2022',
        to: 'Alan Johnson',
        description: 'Lorem Ipsum',
        type: 'Mandatory Sign',

    },
    {
        from: 'Karina Clark',
        title: 'Lorem Ipsum',
        date: '01/08/2022',
        to: 'Alan Johnson',
        description: 'Lorem Ipsum',
        type: 'Mandatory Sign',

    }

]


const detailsCardList: DetailsCardMeta[] = [
    {
        "name": "Warning Information",
        "isCollapse": true,
        "isRowWise": false,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "Karina Clark",
                    "alias": "From"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "You failed to submit the project report by the agreed-upon deadline, causing delays in the overall project timeline.",
                    "alias": "Description"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Missed Deadlines",
                    "alias": "Title"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Missed Deadlines",
                    "alias": "Type"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "02/06/2023",
                    "alias": "Date"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Sean Bean",
                    "alias": "To"
                },
                "type": "text"
            }
        ],
        "data": [{
            "From": "Karina Clark",
            "Description": "You failed to submit the project report by the agreed-upon deadline, causing delays in the overall project timeline.",
            "Title": "Missed Deadlines",
            "Type": "Missed Deadlines",
            "Date": "02/06/2023",
            "To": "Sean Bean"
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





