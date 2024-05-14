import { Validators } from "@angular/forms";
import { format } from "date-fns";
import { DetailsCardMeta, FormMeta, ResponseFilterMeta, TableData, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";


const formSections: Sections = [

    {
        "tabName": "Leave Application",
        "sectionName": "Leave Application Information"
    },
    {
        "tabName": "",
        "sectionName": ""
    }

]
const formMeta : FormMeta =
{
    "tabName": "Leave Application",
    "formName": "leaveApplicationForm",
    "labels": [
        {
            "sectionName": "Leave Application Information",
            "labelName": {
                "defaultValue": "employeeId",
                "alias": "employee"
            },
            "type": "employee",
            "apiLink": "core-hr/employee/leavePlanIdAttr=true",
            "scope":"leaveApplication",
            "required": true,
            "col":6,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Employee Required"
                }
            ]
        },
        {
            "sectionName": "Leave Application Information",
            "labelName": {
                "defaultValue": "leaveTypeId",
                "alias": "leaveType"
            },
            "type": "leaveType",
            "col":6,

        },
        {
            "sectionName": "Leave Application Information",
            "labelName": {
                "defaultValue": "leaveDuration",
                "alias": "duration"
            },
            "type": "duration",
            "jsonListName": "duration",
            "fetchCondition": ["type=1", "subType=1"],
            "multiple": false,
            "col":6,

        },
        {
            "sectionName": "Leave Application Information",
            "labelName": {
                "defaultValue": "hour",
                "alias": "hour"
            },
            "type": "hour",
            "hide":true,
            "col":6,

        },
        {
            "sectionName": "Leave Application Information",
            "labelName": {
                "defaultValue": "startDate",
                "alias": "startDate"
            },
            "type": "date",
            "col":6,
            "defaultValue": format(new Date(), "yyyy/MM/dd"),
        },
        {
            "sectionName": "Leave Application Information",
            "labelName": {
                "defaultValue": "endDate",
                "alias": "endDate"
            },
            "type": "date",
            "col":6,
            "defaultValue": format(new Date(), "yyyy/MM/dd"),
        },
        {
            "sectionName": "Leave Application Information",
            "labelName": {
                "defaultValue": "rejoiningDate",
                "alias": "rejoiningDate"
            },
            "type": "date",
            "col":6,

        },
        {
            "sectionName": "Leave Application Information",
            "labelName": {
                "defaultValue": "reasonId",
                "alias": "reason"
            },
            "type": "leaveReason",
            "apiLink": "leave/settings/leave-reason",
            "multiple":false,
            "col":6,

        },
        {
            "sectionName": "Leave Application Information",
            "labelName": {
                "defaultValue": "otherReason",
                "alias": "other"
            },
            "type": "text",
            "hide":true,
            "col":6,

        },
        {
            "sectionName": "Leave Application Information",
            "labelName": {
                "defaultValue": "status",
                "alias": "transactionStatus"
            },
            "placeholder": "Select status",
            "type": "transactionStatus",
            "jsonListName": "transactionStatus",
            "multiple": false,
            "hide":true,
            "col":6,

        },
        {
            "sectionName": "Leave Application Information",
            "labelName": {
                "defaultValue": "attachment",
                "alias": "attachment"
            },
            "type": "file",
            "col":6,

        },
        {
            "sectionName": "Leave Application Information",
            "labelName": {
                "defaultValue": "advanceSalaryRequest",
                "alias": "advanceVacationSalaryRequest"
            },
            "type": "toggle",
            "col":6,

        },
        {
            "sectionName": "Leave Application Information",
            "labelName": {
                "defaultValue": "airTicketReimbursementRequest",
                "alias": "airTicketReimbursementRequest"
            },
            "type": "toggle",
            "col":6,

        },
        {
            "sectionName": "Leave Application Information",
            "labelName": {
                "defaultValue": "dateOfDeparture",
                "alias": "Date of Departure"
            },
            "type": "date",
            "col":6,
            "labelTransformationCancelled":true

        },
        {
            "sectionName": "Leave Application Information",
            "labelName": {
                "defaultValue": "dateOfReturn",
                "alias": "Date of Return"
            },
            "type": "date",
            "col":6,
            "labelTransformationCancelled":true

        }
    ]
}
// const leaveApplicationFormMeta : FormMeta[] =[
//     {
//         "tabName": "Leave Application",
//         "formName": "leaveApplicationForm",
//         "labels": [
//             {
//                 "sectionName": "Leave Application Information",
//                 "labelName": {
//                     "defaultValue": "employeeId",
//                     "alias": "employee"
//                 },
//                 "type": "employee",
//                 "apiLink": "core-hr/employee/leavePlanIdAttr=true",
//                 "scope":"leaveApplication",
//                 "required": true,
//             "col":6,

//                 "validations": [
//                     {
//                         name: "required",
//                         validator: Validators.required,
//                         message: "Employee Required"
//                     }
//                 ]
//             },
//             {
//                 "sectionName": "Leave Application Information",
//                 "labelName": {
//                     "defaultValue": "leaveTypeId",
//                     "alias": "leaveType"
//                 },
//                 "type": "leaveType",
//             "col":6,

//             },
//             {
//                 "sectionName": "Leave Application Information",
//                 "labelName": {
//                     "defaultValue": "leaveDuration",
//                     "alias": "duration"
//                 },
//                 "type": "duration",
//                 "jsonListName": "duration",
//                 "fetchCondition": ["type=1", "subType=1"],
//                 "multiple": false,
//             "col":6,

//             },
//             {
//                 "sectionName": "Leave Application Information",
//                 "labelName": {
//                     "defaultValue": "hour",
//                     "alias": "hour"
//                 },
//                 "type": "hour",
//                 "hide":true,
//             "col":6,

//             },
//             {
//                 "sectionName": "Leave Application Information",
//                 "labelName": {
//                     "defaultValue": "startDate",
//                     "alias": "startDate"
//                 },
//                 "type": "date",
//             "col":6,

//                 "defaultValue": format(new Date(), "yyyy/MM/dd"),
//             },
//             {
//                 "sectionName": "Leave Application Information",
//                 "labelName": {
//                     "defaultValue": "endDate",
//                     "alias": "endDate"
//                 },
//                 "type": "date",
//             "col":6,

//                 "defaultValue": format(new Date(), "yyyy/MM/dd"),
//             },
//             {
//                 "sectionName": "Leave Application Information",
//                 "labelName": {
//                     "defaultValue": "rejoiningDate",
//                     "alias": "rejoiningDate"
//                 },
//                 "type": "date",
//             "col":6,

//             },
//             {
//                 "sectionName": "Leave Application Information",
//                 "labelName": {
//                     "defaultValue": "reasonId",
//                     "alias": "reason"
//                 },
//                 "type": "leaveReason",
//                 "apiLink": "leave/settings/leave-reason",
//             "col":6,

//                 "multiple":false
//             },
//             {
//                 "sectionName": "Leave Application Information",
//                 "labelName": {
//                     "defaultValue": "otherReason",
//                     "alias": "other"
//                 },
//                 "type": "text",
//             "col":6,

//                 "hide":true
//             },
//             {
//                 "sectionName": "Leave Application Information",
//                 "labelName": {
//                     "defaultValue": "status",
//                     "alias": "transactionStatus"
//                 },
//                 "placeholder": "Select status",
//                 "type": "transactionStatus",
//                 "jsonListName": "transactionStatus",
//                 "multiple": false,
//             "col":6,

//                 "hide":true
//             },
//         // ]
//     // },
//     // {
//     //     "tabName": "",
//     //     "formName": "leaveApplicationForm",
//     //     "labels": [
//             {
//                 "sectionName": "Leave Application Information",
//                 "labelName": {
//                     "defaultValue": "attachment",
//                     "alias": "attachment"
//                 },
//                 "type": "file",
//             "col":6,

//             },
//             {
//                 "sectionName": "Leave Application Information",
//                 "labelName": {
//                     "defaultValue": "advanceSalaryRequest",
//                     "alias": "advanceVacationSalaryRequest"
//                 },
//                 "type": "toggle",
//             "col":6,

//             },
//             {
//                 "sectionName": "Leave Application Information",
//                 "labelName": {
//                     "defaultValue": "airTicketReimbursementRequest",
//                     "alias": "airTicketReimbursementRequest"
//                 },
//                 "type": "toggle",
//             "col":6,

//             },
//             {
//                 "sectionName": "Leave Application Information",
//                 "labelName": {
//                     "defaultValue": "dateOfDeparture",
//                     "alias": "dateOfDeparture"
//                 },
//                 "type": "date",
//             "col":6,

//             },
//             {
//                 "sectionName": "Leave Application Information",
//                 "labelName": {
//                     "defaultValue": "dateOfReturn",
//                     "alias": "dateOfReturn"
//                 },
//                 "type": "date",
//             "col":6,

//             }
//         ]
//     }
//     ]


const detailsCardMeta: DetailsCardMeta[] = [
    {
        "name": "Leave Application Information",
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
                    "defaultValue": "leaveType",
                    "alias": "leaveType"
                },
                "type": "text",
                "custom": true,
                "templateName":"leaveType"
            },
            {
                "labelName": {
                    "defaultValue": "leaveDuration",
                    "alias": "duration"
                },
                "type": "text",
            },
            {
                "labelName": {
                    "defaultValue": "hour",
                    "alias": "hour"
                },
                "type": "text",
                "hide":true
            },
            {
                "labelName": {
                    "defaultValue": "startDate",
                    "alias": "startDate"
                },
                "type": "text",
            },
            {
                "labelName": {
                    "defaultValue": "endDate",
                    "alias": "endDate"
                },
                "type": "text",
            },
            {
                "labelName": {
                    "defaultValue": "rejoiningDate",
                    "alias": "rejoiningDate"
                },
                "type": "text",
            },
            {
                "labelName": {
                    "defaultValue": "reason",
                    "alias": "reason"
                },
                "type": "text",
                "hide":true
            },
            {
                "labelName": {
                    "defaultValue": "otherReason",
                    "alias": "other"
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
                    "defaultValue": "advanceSalaryRequest",
                    "alias": "advanceVacationSalaryRequest"
                },
                "type": "toggle",
            },
            {
                "labelName": {
                    "defaultValue": "airTicketReimbursementRequest",
                    "alias": "airTicketReimbursementRequest"
                },
                "type": "toggle",
            },
            {
                "labelName": {
                    "defaultValue": "dateOfDeparture",
                    "alias": "Date of Departure",
                    "labelTransformationCancelled":true
                },
                "type": "text",
            },
            {
                "labelName": {
                    "defaultValue": "dateOfReturn",
                    "alias": "Date of Return",
                    "labelTransformationCancelled":true
                },
                "type": "text",
            },
            {
                "labelName": {
                    "defaultValue": "status",
                    "alias": "transactionStatus"
                },
                "type": "text"
            }
        ]
    }
];
const tabsMeta: TrazepoidTabsMeta[] = [
    {
        label: "approvalDetails", // table name in Database
        tabIndex: 0,
    },
    {
        label: "systemNotes",
        tabIndex: 1,
    }
]
const tableMetaData :TableData= {
    isActionColumn: true,
    columns: [
        {
            name: "employee",
            type: "employee"
            // template: "employee-template"
        },
        {
            name: "leaveType",
        },
        {
            name: "leaveDuration",
        },
        {
            name: "startDate"
        },
        {
            name: "endDate"
        },
        {
            name: "status"
        }
    ]
}
const cardMetaData = {
    name: "",
    logo: "",
    labels: [
        {
            labelName: {
                defaultValue: "leaveType",
                alias: "leaveType"
            }
        },
        {
            labelName: {
                defaultValue: "leaveDuration",
                alias: "duration"
            }
        },
        {
            labelName: {
                defaultValue: "startDate",
                alias: "startDate"
            }
        },
        {
            labelName: {
                defaultValue: "endDate",
                alias: "endDate"
            }
        }
    ]
}
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

export { detailsCardMeta, formSections, tableMetaData, tabsMeta, employeeFilterMeta, cardMetaData,formMeta };

