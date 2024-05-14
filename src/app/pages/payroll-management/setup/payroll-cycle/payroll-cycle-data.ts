import { Validators } from "@angular/forms";
import { DetailsCardMeta, FormMeta, TableData, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";
import { DataTable } from "src/app/shared/ui/data-table-list/data-table-list";
// import { DetailsCardMeta } from "src/app/shared/ui/details-card/details-card";
// import { TrazepoidTabsMeta } from "src/app/shared/ui/tab-data-table/trapezoid-tabs";
import { WizardTabs } from "src/app/shared/ui/wizard-tabs/wizard-tabs";

const tableMetaData :TableData= {
    isActionColumn: true,
    columns:[
      {
        name: "name",
      },
      {
        name: "description",
      },
      {
        name: "cycleType",
      },
      {
        name: "dayFrom",
      },
      {
        name: "lockPeriod",
      }
    ]
  }
const cycleTableData: DataTable = {
    "tableName": "contribution",
    "headers": ["Name", "Description", "Cycle Type", "Day From", "Lock Period"],
    "collectionSize": 5,
    "data": [
        {
            "Name": "Month Days",
            "Cycle Type": "Month Days",
            "Day From": 1,
            // "Day To": "12/10/2020",
            "Description": "Month Days",
            "Lock Period": 31
        },
        {
            "Name": "Standard 30 Days",
            "Cycle Type": "Month Days",
            "Day From": 1,
            // "Day To": "21/01/2022",
            "Description": "Standard 30 Days",
            "Lock Period": 28
        },
        {
            "Name": "Month Days",
            "Cycle Type": "Standard 30 Days",
            "Day From": 5,
            // "Day To": "10/04/2023",
            "Description": "Month Days",
            "Lock Period": 30
        },
        {
            "Name": "Standard 30 Days",
            "Cycle Type": "Fixed 30 Days",
            "Day From": 6,
            // "Day To": "10/08/2022",
            "Description": "Standard 30 Days",
            "Lock Period": 30
        },
        {
            "Name": "Standard 30 Days",
            "Cycle Type": "Fixed 30 Days",
            "Day From": 9,
            // "Day To": "20/09/2022",
            "Description": "Standard 30 Days",
            "Lock Period": 30
        },
    ]
}
const wizardTabs: WizardTabs = [
    {
        label: "Cycle",
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
        "tabName": "Cycle",

        "sectionName": "Cycle Details",
        "sectionDescription": "Enter Cycle Details"
    }

]
const cycleFormData : FormMeta = {
    "tabName": "Cycle",
    "formName": "cycleForm",
    "labels": [
        {
            "sectionName": "Cycle Details",
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
            "sectionName": "Cycle Details",
            "labelName": {
                "defaultValue": "description",
                "alias": "description"
            },
            "placeholder": "Enter Description",
            "type": "text",
            "col": 4

        },
        {
            "sectionName": "Cycle Details",
            "labelName": {
                "defaultValue": "cycleType",
                "alias": "cycleType"
            },
            "placeholder": "",
            "type": "cycleType",
            "jsonListName": 'cycleType',
            "col": 4
        },
        {
            "sectionName": "Cycle Details",
            "labelName": {
                "defaultValue": "dayFrom",
                "alias": "dayFrom"
            },
            "placeholder": "Enter Day From",
            "type": "number",
            "col": 4,
            "min": 0,
            "max": 28,
            "maxLength":2
        },
        {
            "sectionName": "Cycle Details",
            "labelName": {
                "defaultValue": "lockPeriod",
                "alias": "lockPeriod"
            },
            "placeholder": "Enter Lock Period",
            "type": "number",
            "col": 4,
            "min": 0,
            "max": 28,
            "maxLength":2

        },
        {
            "sectionName": "Cycle Details",
            "labelName": {
                "defaultValue": "inactive",
                "alias": "inactive"
            },
            "type": "toggle",
            "col": 4,
            "onCreateVisible": false,
            "onEditVisible": true,
        },

    ]
}
const detailsCardMeta: DetailsCardMeta[] = [
    {
        "name": "Payroll Cycle Information",
        "isCollapse": true,
        // "isRowWise": false,
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
                    "defaultValue": "description",
                    "alias": "description"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "cycleType",
                    "alias": "cycleType"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "dayFrom",
                    "alias": "dayFrom"
                },
                "type": "number"
            },
            {
                "labelName": {
                    "defaultValue": "lockPeriod",
                    "alias": "lockPeriod"
                },
                "type": "number"
            },
            // {
            //     "labelName": {
            //         "defaultValue": "inactive",
            //         "alias": "inactive"
            //     },
            //     "type": "checkbox"
            // }
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

const payrollCycleTypeList = [
    {
        "id": "1",
        "name": "Month Days"
    },
    {
        "id": "2",
        "name": "Standard 30 Days"
    },
    {
        "id": "3",
        "name": "Fixed 30 Days"
    }

]

const cardMetaData={
    name:"",
    logo:"",
    labels:[
        {
            labelName:{
                defaultValue:"dayFrom",
                alias:"dayFrom"
            }
        },
        {
            labelName:{
                defaultValue:"lockPeriod",
                alias:"lockPeriod"
            }
        },
    ]
}

export { cardMetaData, cycleFormData, cycleTableData, detailsCardMeta, formSections, payrollCycleTypeList, tableMetaData, tabsMeta, wizardTabs };

