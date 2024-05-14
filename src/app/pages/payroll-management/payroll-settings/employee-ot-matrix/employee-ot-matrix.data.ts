import { Validators } from "@angular/forms";
import { DetailsCardMeta, TableData, TrazepoidTabsMeta,ResponseFilterMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";

const formSections: Sections = [
    {
        "tabName": "Employee OT Matrix",
        "sectionName": "Employee OT Matrix Information"
    }
]


const employeeOTMatrixFormMeta =
{
    "tabName": "Employee OT Matrix",
    "formName": "employeeOtMatrixForm",
    "labels": [
        {
            "sectionName": "Employee OT Matrix Information",
            "labelName": {
                "defaultValue": "employeeId",
                "alias": "Employee"
            },
            "placeholder": "Select Employee",
            "type": "employee",
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
            "sectionName": "Employee OT Matrix Information",
            "labelName": {
                "defaultValue": "workDayRate",
                "alias": "Workday Rate / Hour"
            },
            "placeholder": "Enter Amount",
            "col": 4,
            "multiple": false,
            "type": "amount",
            "labelTransformationCancelled":true
        },
        {
            "sectionName": "Employee OT Matrix Information",
            "labelName": {
                "defaultValue": "workNightRate",
                "alias": "Worknight Rate / Hour"
            },
            "placeholder": "Enter Amount",
            "col": 4,
            "multiple": false,
            "type": "amount",
            "labelTransformationCancelled":true

        },
        {
            "sectionName": "Employee OT Matrix Information",
            "labelName": {
                "defaultValue": "nonWorkDayRate",
                "alias": "Nonwork Rate / Hour"
            },
            "placeholder": "Enter Amount",
            "col": 4,
            "multiple": false,
            "type": "amount",
            "labelTransformationCancelled":true

        },
        {
            "sectionName": "Employee OT Matrix Information",
            "labelName": {
                "defaultValue": "holidayRate",
                "alias": "Holiday Rate / Hour"
            },
            "placeholder": "Enter Amount",
            "col": 4,
            "multiple": false,
            "type": "amount",
            "labelTransformationCancelled":true
        },
    ]
}




const cardMetaData = {
    name: "",
    logo: "",
    labels: [
      {
        labelName: {
          defaultValue: "workDayRate",
          alias: "workDayRate"
        }
      },
      {
        labelName: {
          defaultValue: "workNightRate",
          alias: "workNightRate"
        }
      },
      {
        labelName: {
          defaultValue: "nonWorkDayRate",
          alias: "nonWorkDayRate"
        }
      },
    ]
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const employeeFilterMeta :ResponseFilterMeta =
{
    "labels": [
        {
            "sectionName": "Employee filter",
            "labelName": {
                "defaultValue": "subsidiaryId",
                "alias": "Subsidiary    "
            },
            "apiLink": "core-hr/organisation/subsidiary",
            "multiple": true,
        },
        {
            "sectionName": "Employee filter",
            "labelName": {
                "defaultValue": "jurisdictionId",
                "alias": "Jurisdiction    "
            },
            "apiLink": "core-hr/organisation/jurisdiction",
            "multiple": true,
        }, {
            "sectionName": "Employee filter",
            "labelName": {
                "defaultValue": "locationId",
                "alias": "Location    "
            },
            "apiLink": "core-hr/organisation/location",
            "multiple": true,
        }, {
            "sectionName": "Employee filter",
            "labelName": {
                "defaultValue": "departmentId",
                "alias": "Department    "
            },
            "apiLink": "core-hr/organisation/department",
            "multiple": true,
        }, {
            "sectionName": "Employee filter",
            "labelName": {
                "defaultValue": "classId",
                "alias": "Class"
            },
            "apiLink": "core-hr/organisation/class",
            "multiple": true,
        }
    ]
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const tableMetaData :TableData={
    isActionColumn: true,
    pathId: "",
    columns: [
        {
            name: "employee",
            type: "employee"
        },
        {
            name: "workDayRate",
        },
        {
            name: "workNightRate",
        },
        {
            name: "nonWorkDayRate",
        },
        {
            name: "holidayRate",
        }
    ]
}

const detailsCardList: DetailsCardMeta[] = [{
    "name": "Employee OT Matrix Information",
    "isCollapse": true,
    "isRowWise": false,


    "labels": [
        {
            "labelName": {
                "defaultValue": "employee",
                "alias": "Employee"
            },
            "type": "employee"
        },
        {
            "labelName": {
                "defaultValue": "workDayRate",
                "alias": "Workday Rate / Hour"
            },
            "type": "amount"
        },
        // {
        //     "labelName": {
        //         "defaultValue": "deductionComponent",
        //         "alias": "deductionComponent"
        //     },
        //     "type": "text"
        // },
        {
            "labelName": {
                "defaultValue": "workNightRate",
                "alias": "Worknight Rate / Hour"
            },
            "type": "amount",

        },
        {
            "labelName": {
                "defaultValue": "nonWorkDayRate",
                "alias": "Nonwork Rate / Hour"
            },
            "type": "amount",

        },
        {
            "labelName": {
                "defaultValue": "holidayRate",
                "alias": "Holiday Rate / Hour"
            },
            "col": 4,
            "type": "amount",
        },

    ],
    "data": []
}



]
const tabsMeta: TrazepoidTabsMeta[] = [
    {
        label: "systemNotes", // table name in Database
        tabIndex: 0,
    }
]







export {cardMetaData,formSections,employeeOTMatrixFormMeta ,employeeFilterMeta ,tableMetaData,detailsCardList,tabsMeta};
