import { DetailsCardMeta, FormMeta } from "src/app/shared/meta-interface";
import { FieldConfig, Sections } from "src/app/shared/ui/basic-form/basic-form";
import { DataTable } from "src/app/shared/ui/data-table-list/data-table-list";
import { WizardTabs } from "src/app/shared/ui/wizard-tabs/wizard-tabs";

const travelTableData: DataTable = {
  "tableName": "subsidiaries",
  "headers": ["employee", "travelType", "travelStartDate", "travelEndDate", "travelMode"],
  "collectionSize": 3,
  "imageColumn": 'employee', // Set to which column image to display
  "data": [
    {
      "employee": "Kiran",
      "travelType": "Business",
      "travelReason": "Business",
      "empImage": './assets/media/avatars/300-1.jpg',
      "travelStartDate": "01/01/2021",
      "travelEndDate": "10/01/2021",
      "travelMode": "Airline"
    },
    {
      "employee": "Karl",
      "travelType": "Business",
      "travelReason": "Business",
      "travelStartDate": "01/02/2021",
      "travelEndDate": "10/02/2021",
      "travelMode": "Airline"
    },
    {
      "employee": "Sreehari",
      "traveltype": "Business",
      "travelReason": "Business",
      "travelStartDate": "11/03/2021",
      "travelEndDate": "21/03/2021",
      "travelMode": "Airline"
    }
  ]
}

const travelInformationCard: DetailsCardMeta = {
  "name": "Travel Request Information",
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
        "defaultValue": "Travel Type",
        "alias": "Travel Type"
      },
      "type": "text"
    },
    {
      "labelName": {
        "defaultValue": "Travel Reason",
        "alias": "Travel Reason"
      },
      "type": "text"
    },
    {
      "labelName": {
        "defaultValue": "Travel Start Date",
        "alias": "Travel Start Date"
      },
      "type": "date"
    },
    {
      "labelName": {
        "defaultValue": "Travel End Date",
        "alias": "Travel End Date"
      },
      "type": "date"
    },
    {
      "labelName": {
        "defaultValue": "Travel Mode",
        "alias": "Travel Mode"
      },
      "type": "text"
    },
    {
      "labelName": {
        "defaultValue": "Expected Travel Budget",
        "alias": "Expected Travel Budget"
      },
      "type": "text"
    },
    {
      "labelName": {
        "defaultValue": "Actual Travel Budget",
        "alias": "Actual Travel Budget"
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
    {
      "labelName": {
        "defaultValue": "Reimbursement request",
        "alias": "Reimbursement request"
      },
      "type": "checkbox"
    }
  ],
  "data": [
    {
      "Employee": "Anjana",
      "Travel Type": "Business",
      "Travel Reason": "Business",
      "Travel Start Date": "01/01/2021",
      "Travel End Date": "15/01/2021",
      "Travel Mode": "Airline",
      "Expected Travel Budget": "AED 10000",
      "Actual Travel Budget": "AED 10000",
      "Status": "Approved",
      "Reimbursement request": ""
    }
  ]
};

const titleCard: DetailsCardMeta[] = [



  {
    "name": "Title",
    "isCollapse": true,
    "isRowWise": false,
    "labels": [
      {
        "labelName": {
          "defaultValue": "6/5/22 11:53 AM",

          "alias": "Creation Date",
        },
        "type": "text",

      },
      {
        "labelName": {
          "defaultValue": "13/6/22",

          "alias": "Last Modified",
        },
        "type": "text",

      },

      {
        "labelName": {
          "defaultValue": "4",

          "alias": "Internal ID",
        },
        "type": "text",

      },



    ],
    "data": [{
      "name": "Title"
    }]
  }
]

const detailsCardList: DetailsCardMeta[] = [
  {
    "name": "Travel Request Information",
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
          "defaultValue": "Travel Type",
          "alias": "Travel Type"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "Travel Reason",
          "alias": "Travel Reason"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "Travel Start Date",
          "alias": "Travel Start Date"
        },
        "type": "date"
      },
      {
        "labelName": {
          "defaultValue": "Travel End Date",
          "alias": "Travel End Date"
        },
        "type": "date"
      },
      {
        "labelName": {
          "defaultValue": "Travel Mode",
          "alias": "Travel Mode"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "Expected Travel Budget",
          "alias": "Expected Travel Budget"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "Actual Travel Budget",
          "alias": "Actual Travel Budget"
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
      {
        "labelName": {
          "defaultValue": "Reimbursement request",
          "alias": "Reimbursement request"
        },
        "type": "checkbox"
      }
    ],
    "data": [
      {
        "Employee": "Mohan",
        "Travel Type": "Business",
        "Travel Reason": "Business",
        "Travel Start Date": "01/01/2021",
        "Travel End Date": "15/01/2021",
        "Travel Mode": "Airline",
        "Expected Travel Budget": "AED 10000",
        "Actual Travel Budget": "AED 10000",
        "Status": "Approved",
        "Reimbursement request": ""
      }
    ]
  },
  {
    "name": "Title",
    "isCollapse": true,
    "isRowWise": false,
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
          "defaultValue": "Internal Id",
          "alias": "Internal Id"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "Inactive",
          "alias": "Inactive"
        },
        "type": "checkbox"
      }
    ],
    "data": [
      {
        "Creation Date": "01/12/2020",
        "Last Modified": "13/12/2020",
        "Internal Id": "4",
        "Inactive": ""
      }
    ]
  }
];
const wizardTabs: WizardTabs = [
  {
    label: "Travel",
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
    "tabName": "Travel",

    "sectionName": "Travel Request Detail",
    "sectionDescription": "Enter Travel Request detail"
  }

]
const travelFormData:  FormMeta =
  {
    "tabName": "Travel",
    "formName": "subsidiaryForm",
    "labels": [
      {
        "sectionName": "Travel Request Detail",
        "labelName": {
          "defaultValue": "Employee",
          "alias": "Employee"
        },
        "type": "text"
      },
      {
        "sectionName": "Travel Request Detail",
        "labelName": {
          "defaultValue": "Travel Type",
          "alias": "Travel Type"
        },
        "type": "select"
      },
      {
        "sectionName": "Travel Request Detail",
        "labelName": {
          "defaultValue": "Travel Reason",
          "alias": "Travel Reason"
        },
        "type": "text",
        "col": 4
      },
      {
        "sectionName": "Travel Request Detail",
        "labelName": {
          "defaultValue": "Travel Start Date",
          "alias": "Travel Start Date"
        },
        "type": "date",
        "col": 4
      },
      {
        "sectionName": "Travel Request Detail",
        "labelName": {
          "defaultValue": "Travel End Date",
          "alias": "Travel End Date"
        },
        "type": "date",
        "col": 4
      },
      {
        "sectionName": "Travel Request Detail",
        "labelName": {
          "defaultValue": "Travel Mode",
          "alias": "Travel Mode"
        },
        "type": "text"
      },
      {
        "sectionName": "Travel Request Detail",
        "labelName": {
          "defaultValue": "Travels Documents",
          "alias": "Travels Documents"
        },
        "type": "file"
      },
      {
        "sectionName": "Travel Request Detail",
        "labelName": {
          "defaultValue": "Expected Travel Budget",
          "alias": "Expected Travel Budget"
        },
        "type": "text"
      },
      {
        "sectionName": "Travel Request Detail",
        "labelName": {
          "defaultValue": "Actual Travel Budget",
          "alias": "Actual Travel Budget"
        },
        "type": "text"
      },
      {
        "sectionName": "Travel Request Detail",
        "labelName": {
          "defaultValue": "Status",
          "alias": "Status"
        },
        "type": "select"
      },
      {
        "sectionName": "Travel Request Detail",
        "labelName": {
          "defaultValue": "Reimbursement request",
          "alias": "Reimbursement request"
        },
        "type": "checkbox"
      }
    ]
  }
// const tabs: TrazepoidTabsMeta = [
//   {
//     label: "systemNotes", // table name in Database
//     tabIndex: 0,
//   },
//   {
//     label: "activityLogs",
//     tabIndex: 1,
//   }
// ]

// const trapezoidTabTableData: DataTable[] = [
//   {
//     "tableName": "systemNotes",
//     "headers": ["setBy", "context", "type", "field", "oldValue", "newValue"],
//     "collectionSize": 3,
//     "data": [
//       {
//         "setBy": "John Doe",
//         "context": "Subsidiary",
//         "type": "Update",
//         "field": "name",
//         "oldValue": "ABC Corporation",
//         "newValue": "XYZ Corporation"
//       },
//       {
//         "setBy": "Jane Smith",
//         "context": "Subsidiary",
//         "type": "Create",
//         "field": "country",
//         "oldValue": null,
//         "newValue": "United Kingdom"
//       },
//       {
//         "setBy": "Michael Johnson",
//         "context": "Subsidiary",
//         "type": "Delete",
//         "field": "phone",
//         "oldValue": "+1 123-456-7890",
//         "newValue": null
//       }
//     ]
//   },
//   {
//     "tableName": "activityLogs",
//     "headers": ["timestamp", "user", "activity", "details"],
//     "collectionSize": 3,
//     "data": [
//       {
//         "timestamp": "2023-05-25T14:30:00Z",
//         "user": "John Doe",
//         "activity": "Login",
//         "details": "Logged in to the system"
//       },
//       {
//         "timestamp": "2023-05-25T15:45:12Z",
//         "user": "Jane Smith",
//         "activity": "Create",
//         "details": "Created a new subsidiary"
//       },
//       {
//         "timestamp": "2023-05-26T09:20:05Z",
//         "user": "Michael Johnson",
//         "activity": "Update",
//         "details": "Updated the legal name of a subsidiary"
//       }
//     ]
//   }
// ]

export { detailsCardList, formSections, titleCard, travelFormData, travelInformationCard, travelTableData, wizardTabs };

