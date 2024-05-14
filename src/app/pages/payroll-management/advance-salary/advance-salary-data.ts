import { Validators } from "@angular/forms";
import { format } from "date-fns";
import { DetailsCardMeta, FormMeta, TableData, TrazepoidTabsMeta,ResponseFilterMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";
// import { DetailsCardMeta } from "src/app/shared/ui/details-card/details-card";
// import { TrazepoidTabsMeta } from "src/app/shared/ui/tab-data-table/trapezoid-tabs";
const formSections: Sections = [

    {
        "tabName": "Advance Salary",
        "sectionName": "Salary Advance Information"
    }

]
const advanceSalaryFormMeta : FormMeta =
{
    "tabName": "Advance Salary",
    "formName": "advanceSalaryForm",
    "labels": [
        {
            "sectionName": "Salary Advance Information",
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
            "sectionName": "Salary Advance Information",
            "labelName": {
                "defaultValue": "requestType",
                "alias": "requestType"
            },
            "placeholder": "Select request type",
            "type": "requestType",
            "jsonListName": "requestType",
            "multiple": false,
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Request Type Required"
                }
            ]
        },
        {
            "sectionName": "Salary Advance Information",
            "labelName": {
                "defaultValue": "requestDate",
                "alias": "requestDate"
            },
            "placeholder": "Select request date",
            "type": "date",
            "defaultValue":format(new Date(), 'yyyy/MM/dd')
        },
        {
            "sectionName": "Salary Advance Information",
            "labelName": {
                "defaultValue": "reason",
                "alias": "reason"
            },
            "placeholder": "Enter reason",
            "type": "text",
        },
        {
            "sectionName": "Salary Advance Information",
            "labelName": {
                "defaultValue": "amount",
                "alias": "requestedAmount"
            },
            "placeholder": "Enter requested amount",
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
            "sectionName": "Salary Advance Information",
            "labelName": {
                "defaultValue": "attachment",
                "alias": "attachment"
            },
            "type": "file",
        },
        {
            "sectionName": "Salary Advance Information",
            "labelName": {
                "defaultValue": "noOfInstallment",
                "alias": "No of Installment"
            },
            "placeholder": "Enter No of installment",
            "labelTransformationCancelled":true,
            "type": "number",
            "max":2,
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "No of Installment Required"
                }
            ]
        },
        {
            "sectionName": "Salary Advance Information",
            "labelName": {
                "defaultValue": "installmentRecoveryType",
                "alias": "installmentRecoveryType"
            },
            "placeholder": "Select recovery Type",
            "type": "installmentRecoveryType",
            "jsonListName": "installmentRecoveryType",
            "multiple": false,
            "defaultValue": "1",
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Installment Recover Type Required"
                }
            ]
        },
        {
            "sectionName": "Salary Advance Information",
            "labelName": {
                "defaultValue": "installmentStartDate",
                "alias": "installmentStartDate"
            },
            "type": "date",
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Installment Start Date Required"
                }
            ]
        },
        {
            "sectionName": "Salary Advance Information",
            "labelName": {
                "defaultValue": "paymentMethod",
                "alias": "paymentMethod"
            },
            "placeholder": "Select payment method",
            "type": "paymentMethod",
            "jsonListName": "paymentMethod",
            "multiple": false,
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Payment Method Required"
                }
            ]
        },
        {
            "sectionName": "Salary Advance Information",
            "labelName": {
                "defaultValue": "payrollType",
                "alias": "payrollType"
            },
            "placeholder": "Select payroll type",
            "type": "payrollType",
            "jsonListName": "payrollType",
            "fetchCondition": ['id!=4'],
            "multiple": false,
            "hide":true
        },
        {
            "sectionName": "Salary Advance Information",
            "labelName": {
                "defaultValue": "status",
                "alias": "transactionStatus"
            },
            "placeholder": "Select status",
            "type": "transactionStatus",
            "jsonListName": "transactionStatus",
            "multiple": false,
            "hide":false
        }
    ]
}
const cardMetaData = {
    name: "",
    logo: "",
    labels: [
        {
            labelName: {
                defaultValue: "requestType",
                alias: "requestType"
            }
        },
        {
            labelName: {
                defaultValue: "requestDate",
                alias: "requestDate"
            }
        },
        {
            labelName: {
                defaultValue: "reason",
                alias: "reason"
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
        "name": "Salary Advance Information",
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
                    "defaultValue": "requestType",
                    "alias": "requestType"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "requestDate",
                    "alias": "requestDate"
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
                    "defaultValue": "amount",
                    "alias": "requestedAmount"
                },
                "type": "amount",
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
                    "defaultValue": "noOfInstallment",
                    "alias": "No of Installment",
                    "labelTransformationCancelled":true
                },
                "type": "text",
            },
            {
                "labelName": {
                    "defaultValue": "installmentRecoveryType",
                    "alias": "installmentRecoveryType"
                },
                "type": "text",
            },
            {
                "labelName": {
                    "defaultValue": "installmentStartDate",
                    "alias": "installmentStartDate"
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
const tabsMeta: TrazepoidTabsMeta []= [
    {
        label: "salaryAdvanceDetails", // table name in Database
        tabIndex: 0,
    },
    {
        label: "approvalDetails", // table name in Database
        tabIndex: 1,
    },
    {
        label: "systemNotes",
        tabIndex: 2,
    }
]
const tableMetaData :TableData={
    isActionColumn: true,
    pathId: "",
    columns: [
        {
            name: "employee",
            type: "employee"
        },
        {
            name: "requestType",
        },
        {
            name: "requestDate",
        },
        {
            name: "reason",
        },
        {
            name: "amount",
        },
        {
            name: "status"
        }
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

export { advanceSalaryFormMeta, cardMetaData, detailsCardMeta, formSections, tableMetaData, tabsMeta ,employeeFilterMeta};

