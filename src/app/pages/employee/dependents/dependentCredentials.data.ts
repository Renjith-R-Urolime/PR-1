import { DetailsCardMeta, FormMeta, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { FieldConfig, Sections } from "src/app/shared/ui/basic-form/basic-form";
import { CreateTable } from "src/app/shared/ui/create-table-list/create-table-list";
import { DataTable } from "src/app/shared/ui/data-table-list/data-table-list";

import { WizardTabs } from "src/app/shared/ui/wizard-tabs/wizard-tabs";

const dependentTableData: DataTable = {
  tableName: "dependent",
  headers: ["S.No", "Dependent Name", "employee", "Total No of Dependents", "Date Of Brith", "Gender"],
  collectionSize: 3,
  empImageYesorNo: true, // Set to true to enable image display
  data: [
    {


      "S.No": "1.a",
      "Dependent Name": "Anu",
      "employee": "Jilson",
      "Total No of Dependents": "4",
      "Date Of Brith": "10/05/1976",
      "Gender": "Male"


    },
    {


      "S.No": "1.b",
      "Dependent Name": "Fathima",
      "employee": "Saleem",
      "Total No of Dependents": "4",
      "Date Of Brith": "08/04/1984",
      "Gender": "Male"


    },
    {


      "S.No": "2.a",
      "Dependent Name": "Ayesha",
      "employee": "Latheef",
      "Total No of Dependents": "4",
      "Date Of Brith": "08/04/1984",
      "Gender": "Male"


    },
    {


      "S.No": "3.a",
      "Dependent Name": "Archana",
      "employee": "Sahad",
      "Total No of Dependents": "3",
      "Date Of Brith": "08/04/1984",
      "Gender": "Female"


    },
    {


      "S.No": "4.a",
      "Dependent Name": "Fathima",
      "employee": "Farhan",
      "Total No of Dependents": "3",
      "Date Of Brith": "08/04/1984",
      "Gender": "Female"


    },


  ]
};

const tabs: TrazepoidTabsMeta []= [
  {
    "label": "dependent", // table name in Database
    "tabIndex": 0,
  },
  {
    "label": "dependentsCredential",
    "tabIndex": 1,
  }
]

const trapezoidTabTableData: DataTable[] = [
  {
    "tableName": "dependent",
    "headers": ["S.No", "employee", "Total No. Of  Dependents", "Relationship", "Dependent Name", "Date Of Birth"],
    "collectionSize": 6,
    "data": [
      {
        "S.No": "1.a",
        "employee": "Farhan",
        "Total No. Of  Dependents": "1",
        "Relationship": "Wife",
        "Dependent Name": "Jathima",
        "Date Of Birth": "10/10/2000"
      },

      {
        "S.No": "1.a",
        "employee": "Shad",
        "Total No. Of  Dependents": "1",
        "Relationship": "Wife",
        "Dependent Name": "Jathima",
        "Date Of Birth": "10/10/2000"
      },

      {
        "S.No": "1.a",
        "employee": "Jathima",
        "Total No. Of  Dependents": "2",
        "Relationship": "Wife",
        "Dependent Name": "Ayesha",
        "Date Of Birth": "10/10/2000"
      },

      {
        "S.No": "1.a",
        "employee": "Asha",
        "Total No. Of  Dependents": "3",
        "Relationship": "Wife",
        "Dependent Name": "Farhan",
        "Date Of Birth": "10/10/2000"
      },

      {
        "S.No": "1.a",
        "employee": "Mohammed",
        "Total No. Of  Dependents": "4",
        "Relationship": "Wife",
        "Dependent Name": "Bald",
        "Date Of Birth": "10/10/2000"
      },

      {
        "S.No": "1.a",
        "employee": "Subsidiary",
        "Total No. Of  Dependents": "Update",
        "Relationship": "Wife",
        "Dependent Name": "Ayesha",
        "Date Of Birth": "10/10/2000"
      }


    ]
  },
  {
    "tableName": "dependentsCredential",
    "headers": ["employee", "Dependendent", "Credential Type", "Effective Date", "Issue Date", "Expiry Date"],
    "collectionSize": 3,
    "data": [
      {
        "employee": "Farhan",
        "Dependendent": "Wife",
        "Credential Type": "Passport",
        "Effective Date": "20/05/2023",
        "Issue Date": "25/05/2023",
        "Expiry Date": "25/10/2023",

      },
      {
        "employee": "Farhan",
        "Dependendent": "Wife",
        "Credential Type": "Passport",
        "Effective Date": "20/05/2023",
        "Issue Date": "25/05/2023",
        "Expiry Date": "25/10/2023",

      },
      {
        "employee": "Jathima",
        "Dependendent": "Husband",
        "Credential Type": "Passport",
        "Effective Date": "20/05/2023",
        "Issue Date": "25/05/2023",
        "Expiry Date": "25/10/2023",

      },
      {
        "employee": "Asha",
        "Dependendent": "Son",
        "Credential Type": "Passport",
        "Effective Date": "20/05/2023",
        "Issue Date": "25/05/2023",
        "Expiry Date": "25/10/2023",

      },
      {
        "employee": "Mohammed",
        "Dependendent": "Daughter",
        "Credential Type": "Passport",
        "Effective Date": "20/05/2023",
        "Issue Date": "25/05/2023",
        "Expiry Date": "25/10/2023",

      },


    ]
  }

]

const dependentWizardTabs: WizardTabs = [
  {
    "label": "Dependent",
    "number": 1,
    "tabIndex": 0,
  },
  {
    "label": "Review",
    "number": 2,
    "tabIndex": 1,
  }
]

const dependentFormSections: Sections = [

  {
    "tabName": "Dependent",
    "sectionName": "Create Dependents",
    "sectionDescription": "Enter Handbook Details"
  },




]

const dependentFormData: FormMeta =
  {
    "tabName": "Dependent",
    "formName": "dependentForm",
    "labels": [
      {
        "sectionName": "Create Dependents",
        "labelName": {
          "defaultValue": "Employee",
          "alias": "Employee"
        },
        "type": "text"
      },
      {
        "sectionName": "Create Dependents",
        "labelName": {
          "defaultValue": "Total No.of Departments",
          "alias": "Total No.of Departments"
        },
        "type": "text"
      },


    ]
  }






const detailsCardList: DetailsCardMeta[] = [
  {
    "name": "Employee Details",
    "isCollapse": true,
    "isRowWise": false,
    "labels": [
      {
        "labelName": {
          "defaultValue": "Sahad Dennis 1",
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
      "Employee": "Sahad Dennis 1",
      "Grade": "G3",
      "Class": "White Collar Staff",
      "Subsidiary": "KPI  BA& C",
      "Jurisdiction": "Dubai Mainland",
      "Location": "Dubai",
      "Designation": "Archive Clerk",
      "Department": "Human Resources",
      "Supervisor": "Pritesh Kadhi",
      "Email": "sahad@gmail.com",
      "Phone": "9523687451 Kadhi"
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


const createTableData: CreateTable[] = [
  {
    tableName: "dependent",
    headers: [
      {
        "labelName": {
          "defaultValue": "S.No",
          "alias": "S.No"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "Dependent Name",
          "alias": "Dependent Name"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "Relationship",
          "alias": "Relationship"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "Date Of Birth",
          "alias": "Date Of Birth"
        },
        "type": "date"
      },
      {
        "labelName": {
          "defaultValue": "Gender",
          "alias": "Gender"
        },
        "type": "select"
      },
      {
        "labelName": {
          "defaultValue": "Other Information",
          "alias": "Other Information"
        },
        "type": "text"
      }
    ],
    data: []
  },
  {
    tableName: "dependentsCredential",
    headers: [
      {
        "labelName": {
          "defaultValue": "Dependent",
          "alias": "Dependent"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "Credential Type",
          "alias": "Credential Type"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "Credential Number",
          "alias": "Credential Number"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "Effective Date",
          "alias": "Effective Date"
        },
        "type": "date"
      },
      {
        "labelName": {
          "defaultValue": "Issue Date",
          "alias": "Issue Date"
        },
        "type": "date"
      },
      {
        "labelName": {
          "defaultValue": "Expiry Date",
          "alias": "Expiry Date"
        },
        "type": "date"
      },
      {
        "labelName": {
          "defaultValue": "Place Of Issue",
          "alias": "Place Of Issue"
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
          "defaultValue": "Other Information",
          "alias": "Other Information"
        },
        "type": "text"
      }
    ],
    data: []
  }
]
export { createTableData, dependentFormData, dependentFormSections, dependentTableData, dependentWizardTabs, detailsCardList, tabs, trapezoidTabTableData };

