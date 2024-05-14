import { Validators } from "@angular/forms"
import { DetailsCardMeta, FormMeta, ResponseFilterMeta, TableData, TrazepoidTabsMeta } from "src/app/shared/meta-interface"
import { Sections } from "src/app/shared/ui/basic-form/basic-form"
// import { DetailsCardMeta } from "src/app/shared/ui/details-card/details-card"
// import { TrazepoidTabsMeta } from "src/app/shared/ui/tab-data-table/trapezoid-tabs"


const formSections: Sections = [

    {
        "tabName": "Time-Off Adjustment",

        "sectionName": "Time-Off Adjustment Information",
        "sectionDescription": "Enter Time-Off Adjustment Information"
    }


]
const timeoffAdjustmentFormMeta: FormMeta =
{
    "tabName": "Time-Off Adjustment",
    "formName": "timeoffAdjustmentForm",
    "labels": [
        {
            "sectionName": "Time-Off Adjustment Information",
            "labelName": {
                "defaultValue": "employeeId",
                "alias": "employee"
            },
            "type": "employee",
            "apiLink": "core-hr/employee",
            "scope": "timeOffAdjustment",
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
            "sectionName": "Time-Off Adjustment Information",
            "labelName": {
                "defaultValue": "type",
                "alias": "type"
            },
            "placeholder": "Select type",
            "type": "type",
            "jsonListName": "timeoffAdjustmentType",
            "multiple": false,
        },
        {
            "sectionName": "Time-Off Adjustment Information",
            "labelName": {
                "defaultValue": "timeOffType",
                "alias": "timeOffType"
            },
            "placeholder": "Select timeOff Type",
            "type": "timeOffType",
            "jsonListName": "leavePayType",
            "multiple": false,
            "fetchCondition": ['id!=1', 'id!=6']
        },
        {
            "sectionName": "Time-Off Adjustment Information",
            "labelName": {
                "defaultValue": "startDate",
                "alias": "startDate"
            },
            "placeholder": "Select start date",
            "type": "date"
        },
        {
            "sectionName": "Time-Off Adjustment Information",
            "labelName": {
                "defaultValue": "endDate",
                "alias": "endDate"
            },
            "placeholder": "Select end date",
            "type": "date"
        },
        {
            "sectionName": "Time-Off Adjustment Information",
            "labelName": {
                "defaultValue": "days",
                "alias": "days"
            },
            "placeholder": "",
            "type": "number",
            "disable": false
        },
        {
            "sectionName": "Time-Off Adjustment Information",
            "labelName": {
                "defaultValue": "LOPDays",
                "alias": "LOP Days"
            },
            "placeholder": "",
            "type": "number",
            "disable": false,
            "labelTransformationCancelled": true,
        },
        {
            "sectionName": "Time-Off Adjustment Information",
            "labelName": {
                "defaultValue": "amount",
                "alias": "amount"
            },
            "placeholder": "",
            "type": "amount",
            "disable": false
        },
        {
            "sectionName": "Time-Off Adjustment Information",
            "labelName": {
                "defaultValue": "remarks",
                "alias": "remarks"
            },
            "placeholder": "Enter remarks",
            "type": "text"
        },
        {
            "sectionName": "Time-Off Adjustment Information",
            "labelName": {
                "defaultValue": "attachment",
                "alias": "attachment"
            },
            "type": "file"
        },
        {
            "sectionName": "Time-Off Adjustment Information",
            "labelName": {
                "defaultValue": "status",
                "alias": "transactionStatus"
            },
            "placeholder": "Select status",
            "type": "transactionStatus",
            "jsonListName": "transactionStatus",
            "multiple": false,
            "hide":false,
        },

    ]
}

const detailsCardMeta: DetailsCardMeta[] = [
    {
        "name": "Time-Off Adjustment Information",
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
                    "defaultValue": "type",
                    "alias": "type"
                },
                "type": "text",
            },
            {
                "labelName": {
                    "defaultValue": "timeOffType",
                    "alias": "timeOffType"
                },
                "type": "text",
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
                    "defaultValue": "days",
                    "alias": "days"
                },
                "type": "text",
            },
            {
                "labelName": {
                    "defaultValue": "LOPDays",
                    "alias": "LOP Days",
                    "labelTransformationCancelled": true,
                },
                "type": "text",
            },
            {
                "labelName": {
                    "defaultValue": "amount",
                    "alias": "amount"
                },
                "type": "amount",
            },
            {
                "labelName": {
                    "defaultValue": "status",
                    "alias": "transactionStatus"
                },
                "type": "text",
            },
            {
                "labelName": {
                    "defaultValue": "payrollReferenceID",
                    "alias": "payrollReferenceID"
                },
                "type": "text",
            },
            {
                "labelName": {
                    "defaultValue": "attendanceID",
                    "alias": "Attendance ID"
                },
                "type": "associatedEntity",
                "baseUrl": "/time-and-attendance/attendance",
            },
            {
                "labelName": {
                    "defaultValue": "leaveID",
                    "alias": "leave Application ID"
                },
                "type": "associatedEntity",
                "baseUrl": "/leave-management/leave-application",
            },
            {
                "labelName": {
                    "defaultValue": "payrollStatus",
                    "alias": "payrollStatus"
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

        ]
    }
]
const cardMetaData = {
    name: "",
    logo: "",
    labels: [
        {
            labelName: {
                defaultValue: "timeOffType",
                alias: "timeOffType"
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
const tableMetaData: TableData = {
    isActionColumn: true,
    isHeaderOption:false,
    imageColumn: 'employee',
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
            name: "timeOffType",
        },
        {
            name: "startDate",
        },
        {
            name: "endDate",
        },
        {
            name: "status"
        },
        {
            name: "payrollStatus",
            type: "payrollStatus"
        },
    ]
}
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
const employeeFilterMeta: ResponseFilterMeta =
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
export { cardMetaData, detailsCardMeta, formSections, tableMetaData, tabsMeta, timeoffAdjustmentFormMeta, employeeFilterMeta }

