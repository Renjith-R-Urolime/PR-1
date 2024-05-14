import { Validators } from "@angular/forms";
import { DetailsCardMeta, FormMeta, ResponseFilterMeta, TableData, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";
// import { DetailsCardMeta } from "src/app/shared/ui/details-card/details-card";
// import { TrazepoidTabsMeta } from "src/app/shared/ui/tab-data-table/trapezoid-tabs";

const formSections: Sections = [

    {
        "tabName": "Adjustment",
        "sectionName": "Adjustment Information"
    }

]
const adjustmentFormMeta =
{
    "tabName": "Adjustment",
    "formName": "adjustmentForm",
    "labels": [
        {
            "sectionName": "Adjustment Information",
            "labelName": {
                "defaultValue": "employeeId",
                "alias": "employee"
            },
            "type": "employee",
            "apiLink": "core-hr/employee",
            "scope":"transaction",
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
            "sectionName": "Adjustment Information",
            "labelName": {
                "defaultValue": "componentId",
                "alias": "component"
            },
            "placeholder": "Select Component",
            "type": "component",
            "apiLink": "payroll/setup/component",
            "fetchCondition": ["type=2", "subType=6", "payrollItem=1"],
            "multiple": false,
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Component Required"
                }
            ]
        },
        {
            "sectionName": "Adjustment Information",
            "labelName": {
                "defaultValue": "frequency",
                "alias": "frequency"
            },
            "placeholder": "Select frequency",
            "type": "frequency",
            "jsonListName": "payrollFrequency",
            "multiple": false,
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Frequency Required"
                }
            ]
        },
        {
            "sectionName": "Adjustment Information",
            "labelName": {
                "defaultValue": "payrollType",
                "alias": "payrollType"
            },
            "placeholder": "Select payroll type",
            "type": "payrollType",
            "jsonListName": "payrollType",
            "multiple": false,
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Payroll Type Required"
                }
            ]
        },
        {
            "sectionName": "Adjustment Information",
            "labelName": {
                "defaultValue": "date",
                "alias": "date"
            },
            "type": "date",
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Date Required"
                }
            ]
        },
        {
            "sectionName": "Adjustment Information",
            "labelName": {
                "defaultValue": "noOfMonth",
                "alias": "No of Month"
            },
            "type": "number",
            "hide": true,
            "minimum": 1,
            "max":2,
            "labelTransformationCancelled":true,
        },
        {
            "sectionName": "Adjustment Information",
            "labelName": {
                "defaultValue": "toDate",
                "alias": "toDate"
            },
            "type": "date",
            "hide": true
        },
        {
            "sectionName": "Adjustment Information",
            "labelName": {
                "defaultValue": "amount",
                "alias": "amount"
            },
            "type": "amount",
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Amount Required"
                }
            ]
        },
        {
            "sectionName": "Adjustment Information",
            "labelName": {
                "defaultValue": "remarks",
                "alias": "remarks"
            },
            "type": "text"
        },
        {
            "sectionName": "Adjustment Information",
            "labelName": {
                "defaultValue": "attachment",
                "alias": "attachment"
            },
            "type": "file"
        },
        {
            "sectionName": "Adjustment Information",
            "labelName": {
                "defaultValue": "status",
                "alias": "transactionStatus"
            },
            "placeholder": "Select status",
            "type": "transactionStatus",
            "jsonListName": "transactionStatus",
            "multiple": false,
            "hide":true
        },
        {
            "sectionName": "Adjustment Information",
            "labelName": {
              "defaultValue": "isGroupApproved",
              "alias": "approveGroup"
            },
            "placeholder": "",
            "type": "toggle",
            "col":4,
            "default":false
          }
    ]
}
const deductionFormSections: Sections = [

    {
        "tabName": "Deduction",
        "sectionName": "Deduction Information"
    }

]
const deductionFormMeta : FormMeta =
{
    "tabName": "Deduction",
    "formName": "deductionForm",
    "labels": [
        {
            "sectionName": "Deduction Information",
            "labelName": {
                "defaultValue": "employeeId",
                "alias": "employee"
            },
            "type": "employee",
            "apiLink": "core-hr/employee",
            "scope":"transaction",
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
            "sectionName": "Deduction Information",
            "labelName": {
                "defaultValue": "componentId",
                "alias": "component"
            },
            "placeholder": "Select Component",
            "type": "component",
            "apiLink": "payroll/setup/component",
            "fetchCondition": ["type=2", "subType=6", "payrollItem=2"],
            "multiple": false,
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Component Required"
                }
            ]
        },
        {
            "sectionName": "Deduction Information",
            "labelName": {
                "defaultValue": "frequency",
                "alias": "frequency"
            },
            "placeholder": "Select frequency",
            "type": "frequency",
            "jsonListName": "payrollFrequency",
            "multiple": false,
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Frequency Required"
                }
            ]
        },
        {
            "sectionName": "Deduction Information",
            "labelName": {
                "defaultValue": "payrollType",
                "alias": "payrollType"
            },
            "placeholder": "Select payroll type",
            "type": "payrollType",
            "jsonListName": "payrollType",
            "multiple": false,
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Payroll Type Required"
                }
            ]
        },
        {
            "sectionName": "Deduction Information",
            "labelName": {
                "defaultValue": "date",
                "alias": "date"
            },
            "type": "date",
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Date Required"
                }
            ]
        },
        {
            "sectionName": "Deduction Information",
            "labelName": {
                "defaultValue": "noOfMonth",
                "alias": "No of Month"
            },
            "type": "number",
            "hide": true,
            "max":2,
            "labelTransformationCancelled":true,
        },
        {
            "sectionName": "Deduction Information",
            "labelName": {
                "defaultValue": "toDate",
                "alias": "toDate"
            },
            "type": "date",
            "hide": true
        },
        {
            "sectionName": "Deduction Information",
            "labelName": {
                "defaultValue": "amount",
                "alias": "amount"
            },
            "type": "amount",
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Amount Required"
                }
            ]
        },
        {
            "sectionName": "Deduction Information",
            "labelName": {
                "defaultValue": "remarks",
                "alias": "remarks"
            },
            "type": "text"
        },
        {
            "sectionName": "Deduction Information",
            "labelName": {
                "defaultValue": "attachment",
                "alias": "attachment"
            },
            "type": "file"
        },
        {
            "sectionName": "Deduction Information",
            "labelName": {
                "defaultValue": "status",
                "alias": "transactionStatus"
            },
            "placeholder": "Select status",
            "type": "transactionStatus",
            "jsonListName": "transactionStatus",
            "multiple": false,
            "hide":true
        },
        {
            "sectionName": "Deduction Information",
            "labelName": {
              "defaultValue": "isGroupApproved",
              "alias": "approveGroup"
            },
            "placeholder": "",
            "type": "toggle",
            "col":4,
            "default":false
          }
    ]
}
const cardMetaData = {
    name: "",
    logo: "",
    labels: [
        {
            labelName: {
                defaultValue: "component",
                alias: "component"
            }
        },
        {
            labelName: {
                defaultValue: "frequency",
                alias: "frequency"
            }
        },
        {
            labelName: {
                defaultValue: "payrollType",
                alias: "payrollType"
            }
        },
        {
            labelName: {
                defaultValue: "status",
                alias: "status"
            }
        }
    ]
}
const detailsCardMeta: DetailsCardMeta[] = [
    {
        "name": "Adjustment Information",
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
                    "defaultValue": "component",
                    "alias": "component"
                },
                "type": "associatedEntity",
                "baseUrl": "/payroll-management/setup/payroll-component"
            },
             {
                "labelName": {
                    "defaultValue": "frequency",
                    "alias": "frequency"
                },
                "type": "text",
            },
            {
                "labelName": {
                    "defaultValue": "payrollType",
                    "alias": "payrollType"
                },
                "type": "text",
            },
            {
                "labelName": {
                    "defaultValue": "date",
                    "alias": "date"
                },
                "type": "text",
            },
            /*  {
                 "labelName": {
                     "defaultValue": "noOfMonth",
                     "alias": "noOfMonth"
                 },
                 "type": "text",
             },
             {
                 "labelName": {
                     "defaultValue": "toDate",
                     "alias": "toDate"
                 },
                 "type": "text",
             }, */
            {
                "labelName": {
                    "defaultValue": "amount",
                    "alias": "amount"
                },
                "type": "amount",
            },
            {
                "labelName": {
                    "defaultValue": "remarks",
                    "alias": "remarks"
                },
                "type": "text",
            },
            {
                "labelName": {
                    "defaultValue": "attachment",
                    "alias": "attachment"
                },
                "type": "file"
            },
            {
                "labelName": {
                    "defaultValue": "status",
                    "alias": "transactionStatus"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "payrollReferenceID",
                    "alias": "payrollReferenceId"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "payrollStatus",
                    "alias": "payrollStatus"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "inactive",
                    "alias": "status"
                },
                "type": "status",
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
const tableMetaData :TableData={
    isActionColumn: true,
    imageColumn: 'employee',
    pathId: "",
    columns: [
        {
            name: "employee",
            type: "employee"
        },
        {
            name: "component",
        },
        {
            name: "payrollType",
        },
        {
            name: "date",
        },
        {
            name: "amount"
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
export { adjustmentFormMeta, cardMetaData, deductionFormMeta, deductionFormSections, detailsCardMeta, formSections, tableMetaData, tabsMeta,employeeFilterMeta };

