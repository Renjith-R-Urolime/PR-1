import { Validators } from "@angular/forms";
import { FormMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";
import { WizardTabs } from "src/app/shared/ui/wizard-tabs/wizard-tabs";

const wizardTabs: WizardTabs = [
    {

        label: "Step 1",
        number: 1,
        tabIndex: 0,
    },
    {
        label: "Step 2",
        number: 2,
        tabIndex: 1,
    },

]
interface FormLabelValidation {
    name: string;
    validator: any; // You can replace 'any' with a specific validator type if needed
    message: string;
  }

type FormConfig = {
    tabName: string;
    formName: string;
    sectionName: string;
    labels: {
        sectionName: string;
        labelName: {
            defaultValue: string;
            alias: string;
        };
        check?:boolean;
        placeholder?: string;
        col?: number;
        min?:number;
        type: string;
        required?: boolean;
        validations?:FormLabelValidation[];
        apiLink?: string;
        multiple?:boolean;
    }[]
}[]

const formSections: Sections = [
    {
        "tabName": "step1",
        "sectionName": "Employee Information",
        "sectionDescription": ""
    },
    {
        "tabName": "step1",
        "sectionName": "Bank Information",
        "sectionDescription": ""
    },
    {
        "tabName": "step2",
        "sectionName": "Payroll Setup",
        "sectionDescription": ""
    },
    {
        "tabName": "step2",
        "sectionName": "Leave Setup",
        "sectionDescription": ""
    },
]

const formData: FormMeta []=[
    {
        "tabName": "step1",
        "formName": "employeeInformationForm",
        "sectionName": "Employee Information",
        "labels": [
            {
                "sectionName": "Employee Information",
                "labelName": {
                    "defaultValue": "employeeId",
                    "alias": "employee"
                },
                "type": "employee",
                "col": 4,
            },
            {
                "sectionName": "Employee Information",
                "labelName": {
                    "defaultValue": "sponserSubsidiaryId",
                    "alias": "sponserSubsidiary"
                },
                "required": true,
                "validations": [
                    {
                        name: "required",
                        validator: Validators.required,
                        message: "Sponser Subsidiary Required"
                    }
                ],
                "placeholder": "Select Sponser Subsidiary",
                "type": "subsidiary",
                "apiLink": "core-hr/organisation/subsidiary",
                "multiple":false,
                "col": 4,

            },

            {
                "sectionName": "Employee Information",
                "labelName": {
                    "defaultValue": "expenseSubsidiaryId",
                    "alias": "expenseSubsidiary"
                },
                "required": true,
                "validations": [
                    {
                        name: "required",
                        validator: Validators.required,
                        message: "Expense Subsidiary Required"
                    }
                ],
                "placeholder": "Select Expense Subsidiary",
                "type": "subsidiary",
                "apiLink": "core-hr/organisation/subsidiary",
                "multiple":false,
                "col": 4,
            },
            {
                "sectionName": "Employee Information",
                "labelName": {
                    "defaultValue": "jurisdictionId",
                    "alias": "jurisdiction"
                },
                "placeholder": "Select Jurisdiction",
                "type": "jurisdiction",
                "apiLink": "core-hr/organisation/jurisdiction",
                "col": 4,
                "required": true,
                "validations": [
                    {
                        name: "required",
                        validator: Validators.required,
                        message: "Jurisdiction Required"
                    }
                ]

            },
            {
                "sectionName": "Employee Information",
                "labelName": {
                    "defaultValue": "contractId",
                    "alias": "employeeContract"
                },
                "placeholder": "Enter Employee Contract",
                "type": "employeeContract",
                "multiple":false,
                "col": 4,
            },
            {
                "sectionName": "Employee Information",
                "labelName": {
                    "defaultValue": "probationPeriod",
                    "alias": "probationPeriod"
                },
                "placeholder": "Enter Probation Period (Days)",
                "type": "days",
                "col": 4,
                "maxLength":3

            },

            {
                "sectionName": "Employee Information",
                "labelName": {
                    "defaultValue": "dateOfConfirmation",
                    "alias": "Date of Confirmation"
                },
                "type": "date",
                "labelTransformationCancelled":true,
                "col": 4,
            },
            {
                "sectionName": "Employee Information",
                "labelName": {
                    "defaultValue": "payrollOnboardDate",
                    "alias": "payrollOnboardDate"
                },
                "required": true,
                "validations": [
                    {
                        name: "required",
                        validator: Validators.required,
                        message: "Onboard Date Required"
                    }
                ],
                "type": "date",
                "col": 4,
            },
            {
                "sectionName": "Employee Information",
                "labelName": {
                    "defaultValue": "noticePeriod",
                    "alias": "noticePeriod"
                },
                "placeholder": "Enter Notice Period (Days)",
                "type": "days",
                "col": 4,
                "maxLength":3
            },
            {
                "sectionName": "Employee Information",
                "labelName": {
                    "defaultValue": "workCalendarId",
                    "alias": "Work Calendar"
                },
                "placeholder": "Select Work Calendar",
                "type": "workCalendar",
                "col": 4,
                "apiLink": "time-attendance/work-calendar",
                "multiple":false,
                "required": true,
                "validations": [
                    {
                        name: "required",
                        validator: Validators.required,
                        message: "Work Calendar Required"
                    }
                ]
            },
            {
                "sectionName": "Employee Information",
                "labelName": {
                    "defaultValue": "shiftId",
                    "alias": "shift"
                },
                "placeholder": "Select Shift",
                "type": "shift",
                "col": 4,
                "apiLink": "time-attendance/shift",
                "multiple":false,
                "required": true,
                "validations": [
                    {
                        name: "required",
                        validator: Validators.required,
                        message: "Shift Required"
                    }
                ]
            }
        ]
    },
    {
        "tabName": "step1",
        "formName": "bankInformationForm",
        "sectionName": "Bank Information",
        "labels": [
            {
                "sectionName": "Bank Information",
                "labelName": {
                    "defaultValue": "accountTypeId",
                    "alias": "accountType"
                },
                "placeholder": "Select Account Type",
                "type": "accountType",
                "col": 4,
                "apiLink": "core-hr/employee/settings/bank-account-type",
                "multiple":false,
            },
            {
                "sectionName": "Bank Information",
                "labelName": {
                    "defaultValue": "name",
                    "alias": "bankName"
                },
                "placeholder": "Enter Bank Name",
                "type": "text",
                "col": 4,
            },
            {
                "sectionName": "Bank Information",
                "labelName": {
                    "defaultValue": "accountNo",
                    "alias": "accountNumber"
                },
                "placeholder": "Enter Account Number",
                "type": "number",
                "col": 4,

            },
            {
                "sectionName": "Bank Information",
                "labelName": {
                    "defaultValue": "ibanNo",
                    "alias": "IBAN"
                },
                "placeholder": "Enter IBAN Number",
                "type": "text",
                "col": 4,
                "labelTransformationCancelled":true,
            },
            {
                "sectionName": "Bank Information",
                "labelName": {
                    "defaultValue": "routingCode",
                    "alias": "bankRoutingCode"
                },
                "placeholder": "Enter Bank Routing Code",
                "type": "text",
                "col": 4,
            },
            {
                "sectionName": "Bank Information",
                "labelName": {
                    "defaultValue": "branch",
                    "alias": "branch"
                },
                "placeholder": "Enter Branch",
                "type": "text",
                "col": 4,
            },
            {
                "sectionName": "Bank Information",
                "labelName": {
                    "defaultValue": "paymentMethodId",
                    "alias": "paymentMethod"
                },
                "placeholder": "Enter Payment Method",
                "type": "paymentMethod",
                "col": 4,
                "apiLink": "core-hr/employee/settings/payment-method",
                "multiple":false
            },
            {
                "sectionName": "Bank Information",
                "labelName": {
                    "defaultValue": "paymentId",
                    "alias": "ID"
                },
                "labelTransformationCancelled":true,
                "placeholder": "Enter ID",
                "type": "text",
                "col": 4,
            },
        ]
    },
    {
        "tabName": "step2",
        "formName": "payrollSetupForm",
        "sectionName": "Payroll Setup",
        "labels": [
            {
                "sectionName": "Payroll Setup",
                "labelName": {
                    "defaultValue": "employeeId",
                    "alias": "employee"
                },
                "type": "employee",
                "col": 4,
            },
            {
                "sectionName": "Payroll Setup",
                "labelName": {
                    "defaultValue": "defineSalary",
                    "alias": "defineSalary"
                },
                "type": "formDrawer",
                "col": 4,
                // "required":true
            },
            {
                "sectionName": "Payroll Setup",
                "labelName": {
                    "defaultValue": "payrollCycleId",
                    "alias": "payrollCycle"
                },
                "required": true,
                "validations": [
                    {
                        name: "required",
                        validator: Validators.required,
                        message: "Payroll Cycle Required"
                    }
                ],
                "placeholder": "Enter Payroll Cycle",
                "type": "payrollCycle",
                "col": 4,
                "min": 0,
                "apiLink": "payroll/setup/cycle",
                "multiple":false
            },
            {
                "sectionName": "Payroll Setup",
                "labelName": {
                    "defaultValue": "contributionRules",
                    "alias": "contributionRules"
                },
                /* "required": true,
                "validations": [
                    {
                        name: "required",
                        validator: Validators.required,
                        message: "Contribution Rule Required"
                    }
                ], */
                "placeholder": "Select Contribution Rules",
                "type": "contributionRules",
                "col": 4,
                "min": 0,
                "apiLink": "payroll/setup/contribution",
                "multiple":true
            },
            {
                "sectionName": "Payroll Setup",
                "labelName": {
                    "defaultValue": "overtimeRules",
                    "alias": "overtimeRules"
                },
                "placeholder": "Enter Overtime Rules",
                "type": "overtimeRules",
                "col": 4,
                "min": 0,
                "multiple":true
            },
            {
                "sectionName": "Payroll Setup",
                "labelName": {
                    "defaultValue": "airTicketEligibilityId",
                    "alias": "airTicketEligibility"
                },
                "placeholder": "Select Air Ticket Eligibility",
                "type": "ticketEligibility",
                "col": 4,
                "min": 0,
                "apiLink": "core-hr/employee/settings/air-ticket-entitlement",
                "multiple":false
            }
        ]

    },
    {
        "tabName": "step2",
        "formName": "leaveSetupForm",
        "sectionName": "Leave Setup",
        "labels": [
            {
                "sectionName": "Leave Setup",
                "labelName": {
                    "defaultValue": "leavePlanId",
                    "alias": "leavePlan"
                },
                "type": "leavePlan",
                "col": 4,
                "apiLink": "leave/configuration",
                "multiple":false,
                "required": true,
                "validations": [
                    {
                        name: "required",
                        validator: Validators.required,
                        message: "Leave Plan Required"
                    }
                ],
            }
        ]
    },
    {
        "tabName": "step2",
        "formName": "defineSalary",
        "sectionName": "Define Salary",
        "labels": [
            {
                "sectionName": "Salary Information",
                "labelName": {
                    "defaultValue": "allocation",
                    "alias": "salaryAllocation"
                },
                "placeholder": "Enter Salary Allocation",
                "type": "salaryAllocation",
                "jsonListName":"salaryAllocation",
                "col": 6,
                "required": true,
                "validations": [
                    {
                        name: "required",
                        validator: Validators.required,
                        message: "Allocation Method Required"
                    }
                ],
            },
            {
                "sectionName": "Salary Information",
                "labelName": {
                    "defaultValue": "grossPay",
                    "alias": "grossPay"
                },
                "placeholder": "Enter Gross Pay",
                "type": "number",
                "col": 6,
            },
            {
                "sectionName": "Salary Information",
                "labelName": {
                    "defaultValue": "effectiveDate",
                    "alias": "effectiveDate"
                },
                "placeholder": "Enter Effective Date",
                "type": "date",
                "col": 6,
            },
            {
                "sectionName": "Salary Information",
                "labelName": {
                    "defaultValue": "expenseTypeId",
                    "alias": "expenseType"
                },
                "placeholder": "Enter Expense Type",
                "type": "expenseType",
                "apiLink":"payroll/settings/expense-type",
                "col": 6,
                "required": true,
                "validations": [
                    {
                        name: "required",
                        validator: Validators.required,
                        message: "Expense Type Required"
                    }
                ],
            },

        ]
    }
]

const componentFormData = {
    "tabName": "Component Information",
    "formName": "componentInformationForm",
    "labels": [
        {
            "sectionName": "Component Information",
            "labelName": {
                "defaultValue": "basicSalary",
                "alias": "basicSalary"
            },
            "placeholder": "Enter Basic Salary",
            "type": "text",
            "col": 6,
            "required": true,

        },
        {
            "sectionName": "Component Information",
            "labelName": {
                "defaultValue": "houseRentAllowance",
                "alias": "houseRentAllowance"
            },
            "placeholder": "Enter House Rent Allowance",
            "type": "text",
            "col": 6,
        },
        {
            "sectionName": "Component Information",
            "labelName": {
                "defaultValue": "transportAllowance",
                "alias": "transportAllowance"
            },
            "placeholder": "Enter Transport Allowance",
            "type": "text",
            "col": 6,
        },
        {
            "sectionName": "Component Information",
            "labelName": {
                "defaultValue": "specialAllowance",
                "alias": "specialAllowance"
            },
            "placeholder": "Enter Special Allowance",
            "type": "text",
            "col": 6,
        },
        {
            "sectionName": "Component Information",
            "labelName": {
                "defaultValue": "otherAllowance",
                "alias": "otherAllowance"
            },
            "placeholder": "Enter Other Allowance",
            "type": "text",
            "col": 6,
        },

    ]
    }


export { componentFormData, formData, formSections, wizardTabs };

