import { Validators } from "@angular/forms";
import { DetailsCardMeta, FormMeta, TableData, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";
import { CreateTable } from "src/app/shared/ui/create-table-list/create-table-list";
import { DataTable } from "src/app/shared/ui/data-table-list/data-table-list";
// import { DetailsCardMeta } from "src/app/shared/ui/details-card/details-card";
// import { TrazepoidTabsMeta } from "src/app/shared/ui/tab-data-table/trapezoid-tabs";
import { WizardTabs } from "src/app/shared/ui/wizard-tabs/wizard-tabs";

const workCalendarTableData: DataTable = {
    tableName: "workCalendar",
    headers: ["Name"],
    collectionSize: 5,
    data: [
        {
            "Name": "Calendar 1 - 7:30AM to 4:30PM"

        },
        {
            "Name": "Calendar 2 - 8:00AM to 5:00PM"

        },
        {
            "Name": "Calendar 3 - 8:30AM to 5:30PM"

        },
        {
            "Name": "Calendar 4 - 9:00AM to 6:00PM"

        },
        {
            "Name": "Calendar 5 - 9:30AM to 3:00PM"

        },
    ]
};

const tabsMetaData: TrazepoidTabsMeta []= [
    {
        label: "shift",
        tabIndex: 0,
        isCustomView: true
    },
    {
            label: "holiday",
            // showLabel:"holidays"
            tabIndex: 1,
            tableData: {
                isActionColumn: true,
                redirectUrl: '/time-and-attendance/holidays',
                columns: [
                  {
                    name: "date",
                  },
                  {
                    name: "name",
                  },
                 /*  {
                    name: "appliesTo",
                  } */
                ]
              }
        },
        {
            label: "waiverHour",
            tabIndex: 2,
            tableData: {
                isActionColumn: true,
                redirectUrl: '/time-and-attendance/waiver-hour',
                columns: [
                  {
                    name: "fromDate",
                  },
                  {
                    name: "toDate",
                  },
                  {
                    name: "hour",
                  }
                ]
              }
        },
        {
            label: "systemNotes",
             // showLabel:"systemNotes
            tabIndex: 3,
        }

    // {
    //     label: "shiftWorkCalendarMapping",
    //      // showLabel:"Shifts
    //     tabIndex: 0,
    // },
    // {
    //     label: "holidayWorkCalendarMapping",
    //     // showLabel:"holidays"
    //     tabIndex: 1,
    // },
    // {
    //     label: "waiverHours",
    //     tabIndex: 2,
    // },
    // {
    //     label: "systemNotes",
    //      // showLabel:"systemNotes
    //     tabIndex: 3,
    // }
]

const tableMetaData: TableData = {
    isActionColumn: true,
    columns: [
        {
            name: "name",
        }
        // {
        //     name: "subsidiary",
        // },
        // {
        //     name: "jurisdiction",
        // },
        // {
        //     name: "location",
        // },
        // {
        //     name: "class",
        // },
        // {
        //     name: "department",
        // },
    ]
}

const detailsCardLists: DetailsCardMeta[] = [
    {
        "name": "Work Calendar Information",
        "isCollapse": true,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "name",
                    "alias": "name"
                },
                "type": "text",
                "row": 6
            },
            {
                "labelName": {
                  "defaultValue": "",
                  "alias": ""
                },
                "custom": true,
                "templateName": "classificationApplicability"

              }
        ],
        "data": []
    },
];


const workCalendarwizardTabs: WizardTabs = [
    {
        label: "Calendar",
        number: 1,
        tabIndex: 0,
    },
    {
        label: "Review",
        number: 2,
        tabIndex: 1,
    }
]
const formSectionsList: Sections = [

    {
        "tabName": "Calendar",
        "sectionName": "Work Calendar Information",
        "sectionDescription": "Enter Work Calendar Details"
    }

]
const workCalendarFormData: FormMeta =

{
    "tabName": "Calendar",
    "formName": "workCalendarForm",
    "labels": [
      {
        "sectionName": "Work Calendar Information",
        "labelName": {
          "defaultValue": "name",
          "alias": "name"
        },
        "placeholder": "Enter Name",
        "type": "text",
        "col":4,
        "required":true,
        "validations": [
          {
          name: "required",
          validator: Validators.required,
          message: "Name Required"
          }
        ]
      },
      {
        "sectionName": "Work Calendar Information",
        "labelName": {
            "defaultValue": "classificationApplicability",
            "alias": "classificationApplicability"
        },
        "type": "classificationApplicability",
        "col": 4,
    },



    ]
}


const classificationApplicabilityFormSections: Sections = [
    {
        "tabName": "Classification Applicability",
        "sectionName": "Classification Applicability",
        "sectionDescription": ""
    },
]

const classificationApplicabilityFormMeta = {
    "tabName": "Classification Applicability",
    "formName": "classificationApplicability",
    "labels": [
        {
            "sectionName": "Classification Applicability",
            "labelName": {
                "defaultValue": "country",
                "alias": "country"
            },
            "placeholder": "Select Country",
            "apiLink": "core-hr/organisation/subsidiary/countries",
            "col": 8,
            "multiple": false,
            "type": "country"
        },
        {
            "sectionName": "Classification Applicability",
            "labelName": {
                "defaultValue": "subsidiary",
                "alias": "subsidiary    "
            },
            "placeholder": "Select Subsidiary",
            "apiLink": "core-hr/organisation/subsidiary",
            "type": "subsidiary",
            "multiple": true,
            "col": 8,
        },
        {
            "sectionName": "Classification Applicability",
            "labelName": {
                "defaultValue": "jurisdiction",
                "alias": "jurisdiction    "
            },
            "placeholder": "Select Jurisdiction",
            "apiLink": "core-hr/organisation/jurisdiction",
            "type": "dropdown",
            "multiple": true,
            "col": 8,
        }, {
            "sectionName": "Classification Applicability",
            "labelName": {
                "defaultValue": "location",
                "alias": "location    "
            },
            "placeholder": "Select Location",
            "type": "dropdown",
            "apiLink": "core-hr/organisation/location",
            "multiple": true,
            "col": 8,
        }, {
            "sectionName": "Classification Applicability",
            "labelName": {
                "defaultValue": "department",
                "alias": "department    "
            },
            "placeholder": "Select Department",
            "type": "dropdown",
            "apiLink": "core-hr/organisation/department",
            "multiple": true,
            "col": 8,
        }, {
            "sectionName": "Classification Applicability",
            "labelName": {
                "defaultValue": "class",
                "alias": "class    "
            },
            "placeholder": "Select Class",
            "type": "dropdown",
            "apiLink": "core-hr/organisation/class",
            "multiple": true,
            "col": 8,
        }
    ]
}

const tabs: TrazepoidTabsMeta[] = [
    {
        label: "Shift", // table name in Database
        tabIndex: 0,
    },
    {
        label: "Holiday",
        tabIndex: 1,
    },
    {
        label: "Waiver Hour",
        tabIndex: 2,
    }
]
const trapezoidTabTableData: DataTable[] = [
    {
        "tableName": "Shift",
        "headers": [],
        "collectionSize": 0,
        "data": [
        ]
    },
    {
        "tableName": "Holiday",
        "headers": ["date", "description"],
        "collectionSize": 5,
        "data": [
            {
                "date": "01/12/2022",
                "description": "National Day Holiday",
            },
            {
                "date": "05/05/2021",
                "description": "Holi",
            },
            {
                "date": "08/05/2022",
                "description": "Ugadi",
            },
            {
                "date": "01/05/2022",
                "description": "Labour Day",
            },
            {
                "date": "26/10/2022",
                "description": "Diwali",
            }
        ]
    },
    {
        "tableName": "Waiver Hour",
        "headers": ["date", "hour", "description"],
        "collectionSize": 5,
        "data": [
            {
                "date": "01/07/2022",
                "hour": "2",
                "description": "Medical Appointment",
            },
            {
                "date": "20/03/2021",
                "hour": "4",
                "description": "Family Emergency",
            },
            {
                "date": "08/05/2022",
                "hour": "3",
                "description": "Child care",
            },
            {
                "date": "22/03/2022",
                "hour": "1",
                "description": "Personal",
            },
            {
                "date": "26/10/2022",
                "hour": "4",
                "description": "Doctors visit",
            }
        ]
    }
]
const trapezoidTabTableData1: DataTable[] = [
    {
        "tableName": "systemNotes",
        "headers": ["setBy", "context", "type", "field", "oldValue", "newValue"],
        "collectionSize": 3,
        "data": [
            {
                "setBy": "John Doe",
                "context": "Subsidiary",
                "type": "Update",
                "field": "name",
                "oldValue": "ABC Corporation",
                "newValue": "XYZ Corporation"
            },
            {
                "setBy": "Jane Smith",
                "context": "Subsidiary",
                "type": "Create",
                "field": "country",
                "oldValue": null,
                "newValue": "United Kingdom"
            },
            {
                "setBy": "Michael Johnson",
                "context": "Subsidiary",
                "type": "Delete",
                "field": "phone",
                "oldValue": "+1 123-456-7890",
                "newValue": null
            }
        ]
    },
    {
        "tableName": "activityLogs",
        "headers": ["timestamp", "user", "activity", "details"],
        "collectionSize": 3,
        "data": [
            {
                "timestamp": "2023-05-25T14:30:00Z",
                "user": "John Doe",
                "activity": "Login",
                "details": "Logged in to the system"
            },
            {
                "timestamp": "2023-05-25T15:45:12Z",
                "user": "Jane Smith",
                "activity": "Create",
                "details": "Created a new subsidiary"
            },
            {
                "timestamp": "2023-05-26T09:20:05Z",
                "user": "Michael Johnson",
                "activity": "Update",
                "details": "Updated the legal name of a subsidiary"
            }
        ]
    }
]

const createTableData: CreateTable[] = [
    {
        tableName: "Shift",
        headers: [
            {
                "labelName": {
                    "defaultValue": "S.No",
                    "alias": "S.No"
                },
                "type": "text"
            }
        ],
        data: []
    },
    {
        tableName: "Holiday",
        headers: [
            {
                "labelName": {
                    "defaultValue": "Date",
                    "alias": "Date"
                },
                "type": "date"
            },
            {
                "labelName": {
                    "defaultValue": "Description",
                    "alias": "Description"
                },
                "type": "text"
            }
        ],
        data: []
    },
    {
        tableName: "Waiver Hour",
        headers: [
            {
                "labelName": {
                    "defaultValue": "Date",
                    "alias": "Date"
                },
                "type": "date"
            },
            {
                "labelName": {
                    "defaultValue": "Hour",
                    "alias": "Hour"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Description",
                    "alias": "Description"
                },
                "type": "text"
            }
        ],
        data: []
    }
]

const calendarCardMetaData={
    name:"",
    logo:"",
    labels:[

        {
            labelName:{
                defaultValue:"subsidiary",
                alias:"subsidiary"
            }
        },

        {
            labelName:{
                defaultValue:"location",
                alias:"location"
            }
        },



    ]
  }

  const detailsCardList: DetailsCardMeta[] = [
    {
        "name": "Shift Information",
        "isCollapse": true,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "",
                    "alias": ""
                },
                "type": "text",
                "row": 15
            },
            {
                "labelName": {
                    "defaultValue": "",
                    "alias": ""
                },
                "type": "text",
                "col": 2,
            },
            {
                "labelName": {
                    "defaultValue": "",
                    "alias": ""
                },
                "type": "text",
                "col": 2,
            },
            {
                "labelName": {
                    "defaultValue": "",
                    "alias": ""
                },
                "custom": true,
                "templateName":"modifyTiming",
                "type": "button",
                "col":2
            },
            {
                "labelName": {
                    "defaultValue": "",
                    "alias": ""
                },
                "custom": true,
                "templateName":"toleranceMargin",
                "type": "button",
                "row": 6
            },
            {
                "labelName": {
                    "defaultValue": "",
                    "alias": ""
                },
                "custom": true,
                "templateName":"appliesTo",
                "type": "button",
                "col": 6
            },
        ]
    },
    {
        "name": "Define Break",
        "isCollapse": true,
        labels: [
            {
                "labelName": {
                    "defaultValue": "breakFrom",
                    "alias": "from"
                },
                "type": "text",
                "col": 4,
            },
            {
                "labelName": {
                    "defaultValue": "breakTo",
                    "alias": "to"
                },
                "type": "text",
                "col": 2,
            },
            {
                "labelName": {
                    "defaultValue": "totalBreakTime",
                    "alias": ""
                },
                "type": "hours",
                "col": 2,
            },
            {
                "labelName": {
                    "defaultValue": "excludeBreak",
                    "alias": "excludedFromStandardHours"
                },
                "type": "checkbox",
                // "disable":true,
            },
            {
                "labelName": {
                    "defaultValue": "isAdditionalBreak",
                    "alias": "enableAdditionalBreak"
                },
                "type": "checkbox",
                "col": 12,
            },
            {
                "labelName": {
                    "defaultValue": "additionalBreakFrom",
                    "alias": "breakFrom"
                },
                "type": "number",
                "col": 2,
            },
            {
                "labelName": {
                    "defaultValue": "additionalBreakTo",
                    "alias": "breakTo"
                },
                "type": "number",
                "col": 2,
            },
            {
                "labelName": {
                    "defaultValue": "totalAdditionalBreakTime",
                    "alias": ""
                },
                "type": "hours",
                "col": 1,
            },
            {
                "labelName": {
                    "defaultValue": "excludeAdditionalBreak",
                    "alias": "excludeFromStandardHour"
                },
                "type": "checkbox",
            }
        ]
    },
    {
        "name": "Define Weekends",
        "isCollapse": true,
        labels:[]
    },
]


export { calendarCardMetaData, classificationApplicabilityFormMeta, classificationApplicabilityFormSections, createTableData, detailsCardList, detailsCardLists, formSectionsList, tableMetaData, tabs, tabsMetaData, trapezoidTabTableData, trapezoidTabTableData1, workCalendarFormData, workCalendarTableData, workCalendarwizardTabs };

