import { Validators } from "@angular/forms";
import { DetailsCardMeta, FormMeta, TableData, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { FieldConfig, Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { DataTable } from 'src/app/shared/ui/data-table-list/data-table-list';
// import { DetailsCardMeta } from 'src/app/shared/meta-interface';
// import { TrazepoidTabsMeta } from 'src/app/shared/ui/tab-data-table/trapezoid-tabs';
import { WizardTabs } from 'src/app/shared/ui/wizard-tabs/wizard-tabs';

const classTableMetaData: TableData = {
  isActionColumn: true,
  columns: [

    {
      name: "name"
    },
    {
      name: "parentClass",
      type: "associatedEntity",
      baseUrl: "/organisation/class",
    },
    {
      name: "subsidiary",
      type: "associatedEntity",
      baseUrl: "/organisation/subsidiary",
    }
  ]
}
const classWizardTabs: WizardTabs = [
  {
    label: "Class",
    number: 1,
    tabIndex: 0,
  },
  {
    label: "Review",
    number: 2,
    tabIndex: 1,
  }
]
const classFormSections: Sections = [

  {
    "tabName": "Class",
    "sectionName": "Class Information",
    "sectionDescription": "Enter Class Information"
  }

]
const classFormData: FormMeta =
{
  "tabName": "Class",
  "formName": "classForm",
  "labels": [
    {
      "sectionName": "Class Information",
      "labelName": {
        "defaultValue": "name",
        "alias": "name"
      },
      "placeholder": "Enter Name",
      "type": "text",
      "col": 4,
      "onCreateVisible": true,
      "onEditVisible": true,
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
      "sectionName": "Class Information",
      "labelName": {
        "defaultValue": "displayName",
        "alias": "displayName"
      },
      "placeholder": "Enter Display Name",
      "type": "text",
      "col": 4,
      "onCreateVisible": true,
      "onEditVisible": true,
      "required": false,
      "validations": [
        {
          name: "",
          validator: Validators.required,
          message: "Name Required"
        }
      ]

    },
    {
      "sectionName": "Class Information",
      "labelName": {
        "defaultValue": "parentClassId",
        "alias": "parentClassId"
      },
      "placeholder": "Select Parent Class",
      "apiLink": "core-hr/organisation/class",
      "type": "class",
      "col": 4,
      "onCreateVisible": true,
      "onEditVisible": true
    },
    {
      "sectionName": "Class Information",
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
      "sectionName": "Class Information",
      "labelName": {
        "defaultValue": "subsidiary",
        "alias": "subsidiary"
      },
      "placeholder": "Select Subsidiary",
      "type": "subsidiary",
      "apiLink": "core-hr/organisation/subsidiary",
      "col": 4,
      "onCreateVisible": true,
      "onEditVisible": true,
      "required": true,
      "validations": [
        {
          name: "required",
          validator: Validators.required,
          message: "Subsidiary Required"
        }
      ],
    },
    {
      "sectionName": "Class Information",
      "labelName": {
        "defaultValue": "inactive",
        "alias": "inactive"
      },
      "placeholder": "",
      "type": "toggle",
      "col": 4,
      "default": false,
      "onCreateVisible": false,
      "onEditVisible": true
    }

  ]
}

// "required":true,
// "validations": [
//   {
//   name: "required",
//   validator: Validators.required,
//   message: "Name Required"
//   }
// ]

const tabsMeta: TrazepoidTabsMeta[] = [
  {
    label: "systemNotes", // table name in Database
    tabIndex: 0,
  },
  // {
  //   label: "activityLogs",
  //   tabIndex: 1,
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
  //   "tableName": "activityLogs",
  //   "headers": ["timestamp", "user", "activity", "details"],
  //   "collectionSize": 3,
  //   "data": [
  //     {
  //       "timestamp": "2023-05-25T14:30:00Z",
  //       "user": "John Bhaskar",
  //       "activity": "Login",
  //       "details": "Logged in to the system"
  //     },
  //     {
  //       "timestamp": "2023-05-25T15:45:12Z",
  //       "user": "Dwayne Smith",
  //       "activity": "Create",
  //       "details": "Created a new department"
  //     },
  //     {
  //       "timestamp": "2023-05-26T09:20:05Z",
  //       "user": "John Cena",
  //       "activity": "Update",
  //       "details": "Updated the legal name of a department"
  //     }
  //   ]
  // }
]
const detailsCardMeta: DetailsCardMeta[] = [
  {
    "name": "Class Information",
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
          "defaultValue": "parentClass",
          "alias": "parentClass"
        },
        "type": "associatedEntity",
        "baseUrl": "/organisation/class"
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
        "type": "associatedEntity",
        "baseUrl": "/organisation/subsidiary"
      },
      ,
      {
        "labelName": {
          "defaultValue": "inactive",
          "alias": "status"
        },
        "type": "status",
      }
    ],
    "data": [
      {
        "name": "Accessories",
        "parentClass": "Accessories",
        "subsidiary": "HoneyComb"
      }
    ]
  },
  // {
  //   "name": "Title",
  //   "isCollapse": true,
  //   "isRowWise": false,
  //   "labels": [
  //     {
  //       "labelName": {
  //         "defaultValue": "6/5/22 11:53 AM",
  //         "alias": "Creation Date"
  //       },
  //       "type": "text"
  //     },
  //     {
  //       "labelName": {
  //         "defaultValue": "13/6/22 12:58 PM",
  //         "alias": "Last Modified"
  //       },
  //       "type": "text"
  //     },
  //     {
  //       "labelName": {
  //         "defaultValue": "",
  //         "alias": "Inactive"
  //       },
  //       "type": "text"
  //     },
  //     {
  //       "labelName": {
  //         "defaultValue": "4",
  //         "alias": "Internal ID"
  //       },
  //       "type": "text"
  //     }
  //   ],
  //   "data": [
  //     {
  //       "Creation Date": "6/5/22 11:53 AM",
  //       "Last Modified": "13/6/22 12:58 PM",
  //       "Inactive": "",
  //       "Internal ID": "4"
  //     }
  //   ]
  // }
];

const empWizardTabs: WizardTabs = [
  {
    label: "Class",
    number: 1,
    tabIndex: 0,
  },
  {
    label: "Review",
    number: 2,
    tabIndex: 1,
  }
]
const empFormSections: Sections = [

  {
    "tabName": "Class",
    "sectionName": "Class Information",
    "sectionDescription": "Enter Class Information"
  }

]
const empFormData: FieldConfig = [
  {
    "tabName": "Class",
    "formName": "classForm",
    "labels": [
      {
        "sectionName": "Class Information",
        "labelName": {
          "defaultValue": "Name",
          "alias": "Name"
        },
        "type": "text"
      },
      {
        "sectionName": "Class Information",
        "labelName": {
          "defaultValue": "Parent Class",
          "alias": "Parent Class"
        },
        "type": "select"
      },
      {
        "sectionName": "Class Information",
        "labelName": {
          "defaultValue": "Subsidiaries",
          "alias": "Subsidiaries"
        },
        "type": "select"
      },
      {
        "sectionName": "Class Information",
        "labelName": {
          "defaultValue": "Class is Inactive",
          "alias": "Class is Inactive"
        },
        "type": "checkbox"
      }
    ]
  },

]

const classCardMetaData = {
  name: "",
  logo: "",
  labels: [
    {
      labelName: {
        defaultValue: "parentClass",
        alias: "parentClass"
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





export {
  classCardMetaData,
  classFormData, classFormSections, classTableMetaData, classWizardTabs, detailsCardMeta,
  empFormData, empFormSections, empWizardTabs, tabsMeta, trapezoidTabTableData
};

