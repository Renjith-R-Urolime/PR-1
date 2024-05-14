import { Validators } from "@angular/forms";
import { DetailsCardMeta, FormMeta, ResponseFilterMeta, TableData, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";

const formSections: Sections = [

    {
        "tabName": "End of Service Request",
        "sectionName": "End of Service Request Information"
    }

]

const eosRequestFormMeta : FormMeta =
{
    "tabName": "End of Service Request",
    "formName": "eosRequestForm",
    "labels": [
        {
            "sectionName": "End of Service Request Information",
            "labelName": {
                "defaultValue": "employeeId",
                "alias": "employee"
            },
            "type": "employee",
            "apiLink": "core-hr/employee",
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Employee Required"
                }
            ]
        },
        {
            "sectionName": "End of Service Request Information",
            "labelName": {
                "defaultValue": "supervisor",
                "alias": "supervisor"
            },
            "placeholder": "Select",
            "type": "supervisor",
        },
        {
            "sectionName": "End of Service Request Information",
            "labelName": {
                "defaultValue": "type",
                "alias": "EOS Type"
            },
            "placeholder": "Select EOS Type",
            "type": "type",
            "jsonListName": "eosType",
            "multiple": false,
            "labelTransformationCancelled":true
        },
        {
            "sectionName": "End of Service Request Information",
            "labelName": {
                "defaultValue": "subTypeId",
                "alias": "EOS Sub Type"
            },
            "type": "subTypeId",
            "apiLink": "payroll/settings/eos-sub-type",
            "labelTransformationCancelled":true,
            "multiple": false,
        },
        {
            "sectionName": "End of Service Request Information",
            "labelName": {
                "defaultValue": "dateOfNotice",
                "alias": "Date of Notice"
            },
            "placeholder": "Select date of notice",
            "type": "date",
        },
        {
            "sectionName": "End of Service Request Information",
            "labelName": {
                "defaultValue": "lastWorkingDay",
                "alias": "Last Working Day"
            },
            "placeholder": "Select last working day",
            "type": "date",
        },
        {
            "sectionName": "End of Service Request Information",
            "labelName": {
                "defaultValue": "reason",
                "alias": "reason"
            },
            "placeholder": "Enter reason",
            "type": "text",
        },
        {
            "sectionName": "End of Service Request Information",
            "labelName": {
                "defaultValue": "attachment",
                "alias": "attachment"
            },
            "type": "file",
        },
        {
            "sectionName": "End of Service Request Information",
            "labelName": {
              "defaultValue": "status",
              "alias": "status"
            },
            "placeholder": "Select Status",
            "type": "status",
            "jsonListName": "finalTransactionList",
          "multiple": false,
        }
    ]
}

const detailsCardMeta: DetailsCardMeta[] = [
    {
        "name": "End of Service Request Information",
        "isCollapse": true,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "employee",
                    "alias": ""
                },
                "type": "employee",
            },
            {
                "labelName": {
                  "defaultValue": "supervisor",
                  "alias": "supervisor"
                },
                "custom": true,
                "templateName": "supervisor",
              },
            {
                "labelName": {
                    "defaultValue": "type",
                    "alias": "EOS Type"
                },
                "type": "text",
            },
            {
                "labelName": {
                    "defaultValue": "subType",
                    "alias": "EOS Sub Type"
                },
                "type": "text",
            }
            ,
            {
                "labelName": {
                    "defaultValue": "dateOfNotice",
                    "alias": "dateOfNotice"
                },
                "type": "text",
            },
            {
                "labelName": {
                    "defaultValue": "lastWorkingDay",
                    "alias": "lastWorkingDay"
                },
                "type": "text",
            },
            {
                "labelName": {
                    "defaultValue": "reason",
                    "alias": "reason"
                },
                "type": "text",
            },
            {
                "labelName": {
                    "defaultValue": "attachment",
                    "alias": "attachment"
                },
                "type": "file",
            },
            {
                "labelName": {
                  "defaultValue": "status",
                  "alias": "status"
                },
                "type": "text"
            }
        ]
    }
];
const tabsMeta: TrazepoidTabsMeta []= [
    {
        label: "systemNotes",
        tabIndex: 0,
    }
]


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


const supervisorFilterMeta :ResponseFilterMeta =
{
    "labels": [
     {
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

const cardMetaData = {
    name: "",
    logo: "",
    labels: [
        {
            labelName: {
                defaultValue: "type",
                alias: "EOS Type"
            }
        },
        {
            labelName: {
                defaultValue: "subType",
                alias: "EOS Sub Type"
            }
        },
        {
            labelName: {
                defaultValue: "dateOfNotice",
                alias: "dateOfNotice"
            }
        },
    ]
}

const tableMetaData :TableData={
    isActionColumn: true,
    pathId: "",
    columns: [
        {
            name: "employee",
            type: "employee"
        },
        {
            name: "type",
        },
        {
            name: "subType",
        },
        {
            name: "dateOfNotice",
        },
        {
            name: "lastWorkingDay",
        }
    ]
}





export { cardMetaData, detailsCardMeta, employeeFilterMeta, eosRequestFormMeta, formSections, supervisorFilterMeta, tableMetaData, tabsMeta };

