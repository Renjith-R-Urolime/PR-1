import { Validators } from "@angular/forms";
import { DetailsCardMeta, FormMeta, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { pillTabs } from "src/app/shared/ui/pill-tabs/pill-tabs";

const pillsData: pillTabs = [
    {
        "label": "Overview",
        "tabIndex": 0
    },
    {
        "label": "Employee",
        "tabIndex": 1
    },
    {
        "label": "Payroll",
        "tabIndex": 2
    },
    {
        "label": "Leave",
        "tabIndex": 3
    },
    {
        "label": "Documents & Credentials",
        "tabIndex": 4
    }
]







///////////////////////////////////Profile image//////////////////////////////////////////////////
const profileImageFormData = {
    "tabName": "uploadImage",
    "formName": "profileImageForm",
    "labels": [
        {
            "sectionName": "Attachment",
            "labelName": {
                "defaultValue": "browse",
                "alias": "browse"
            },
            "type": "file",
            "col": 8,
        },
    ]
}


//////////////////////////////////Overview pill tab /////////////////////////////////////////////////////////
const detailsCardEmployeeOverviewMeta: DetailsCardMeta[] = [
    {
        "name": "Personal Details",
        "isCollapse": true,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "salutation",
                    "alias": "salutation"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "governmentUniqueId",
                    "alias": "Unique ID"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "firstName",
                    "alias": "firstName",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "maritalStatus",
                    "alias": "maritalStatus"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "middleName",
                    "alias": "middleName",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "dateOfBirth",
                    "alias": "dateOfBirth"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "lastName",
                    "alias": "lastName",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "nationality",
                    "alias": "nationality",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "fullName",
                    "alias": "fullName",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "religion",
                    "alias": "religion",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "gender",
                    "alias": "gender",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "ethnicity",
                    "alias": "ethnicity",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "home",
                    "alias": "Home Phone",
                },
                "type": "phoneNumber"
            },
            {
                "labelName": {
                    "defaultValue": "bloodGroup",
                    "alias": "bloodGroup",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "mobile",
                    "alias": "Mobile Phone",
                },
                "type": "phoneNumber"
            },
            {
                "labelName": {
                    "defaultValue": "height",
                    "alias": "height",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "currentAddress",
                    "alias": "currentAddress",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "homeAddress",
                    "alias": "homeAddress",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "weight",
                    "alias": "weight",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "fax",
                    "alias": "fax",
                },
                "type": "phoneNumber"
            },
            {
                "labelName": {
                    "defaultValue": "indirectReportingId",
                    "alias": "indirectReportingSupervisor",
                },
                "type": "associatedEntity",
                "baseUrl": "/employee/master"
            },
            {
                "labelName": {
                    "defaultValue": "personalEmail",
                    "alias": "personalEmailAddress",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "arabicName",
                    "alias": "Full Name(عربي)",
                    "labelTransformationCancelled": true
                },
                "type": "text"
            },
        ]
    },


]
const overViewTabsMeta: TrazepoidTabsMeta[] = [
    {
        label: "emergencyContact", // table name in Database
        tabIndex: 0,
        tableData: {
            isActionColumn: true,
            columns: [
                {
                    name: "name",
                },
                {
                    name: "relationship",
                },
                {
                    name: "phoneNumber",
                    type: "phoneNumber",
                },
                {
                    name: "address",
                },
            ]
        }
    },
    {
        label: "roles", // table name in Database
        tabIndex: 1,
        tableData: {
            isActionColumn: true,
            redirectUrl: "/setup-and-configuaration/roles-and-permissions",
            columns: [
                {
                    name: "name",
                },
                {
                    name: "roleType",
                },
                {
                    name: "employeePermission",
                },
            ]
        }
    },
    {
        label: "dependent", // table name in Database
        tabIndex: 2,
        tableData: {
            isActionColumn: true,
            redirectUrl: "/employee/dependent",
            columns: [
                {
                    name: "fullName",
                },
                {
                    name: "dateOfBirth",
                },
                {
                    name: "relationship",
                }
            ]
        }
    },
    {
        label: "systemNotes",
        tabIndex: 0,
    }
]


const overViewTabsFormData = {
    "formName": "personalDetailsForm",
    "labels": [
        {
            "sectionName": "Primary Details",
            "labelName": {
                "defaultValue": "salutation",
                "alias": "salutation"
            },
            "placeholder": "Select Salutation",
            "type": "salutation",
            "col": 4,
            "multiple": false,
            "jsonListName": 'salutation',
        },
        {
            "sectionName": "Primary Details",
            "labelName": {
                "defaultValue": "firstName",
                "alias": "firstName"
            },
            "placeholder": "Enter First Name",
            "type": "text",
            "col": 4,
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "First Name Required"
                }
            ]
        },
        {
            "sectionName": "Primary Details",
            "labelName": {
                "defaultValue": "middleName",
                "alias": "middleName"
            },
            "placeholder": "Enter Middle Name",
            "type": "text",
            "col": 4,
        },
        {
            "sectionName": "Primary Details",
            "labelName": {
                "defaultValue": "lastName",
                "alias": "lastName"
            },
            "placeholder": "Enter Last Name",
            "type": "text",
            "col": 4,
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Last Name Required"
                }
            ]
        },
        {
            "sectionName": "Primary Details",
            "labelName": {
                "defaultValue": "gender",
                "alias": "gender"
            },
            "placeholder": "Select Gender",
            "type": "gender",
            "col": 4,
            "multiple": false,
            "jsonListName": 'gender',
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Gender Required"
                }
            ]
        },
        {
            "sectionName": "Primary Details",
            "labelName": {
                "defaultValue": "home",
                "alias": "Home Phone"
            },
            "placeholder": "Enter Home Number",
            "type": "phoneNumber",
            "col": 4,
            "min": 0,
            "max": 10
        },
        {
            "sectionName": "Primary Details",
            "labelName": {
                "defaultValue": "mobile",
                "alias": "Mobile Phone"
            },
            "placeholder": "Enter Mobile Number",
            "type": "phoneNumber",
            "col": 4,
            "min": 0,
            "max": 10
        },
        {
            "sectionName": "Primary Details",
            "labelName": {
                "defaultValue": "office",
                "alias": "office"
            },
            "placeholder": "Enter Office Number",
            "type": "phoneNumber",
            "col": 4,
            "min": 0,
            "max": 10
        },
        {
            "sectionName": "Primary Details",
            "labelName": {
                "defaultValue": "fax",
                "alias": "fax"
            },
            "placeholder": "Enter Fax",
            "type": "phoneNumber",
            "col": 4,
            "min": 0,
            "max": 10
        },
        {
            "sectionName": "Primary Details",
            "labelName": {
                "defaultValue": "currentAddress",
                "alias": "currentAddress"
            },
            "type": "currentAddress",
            "col": 4
        },
        {
            "sectionName": "Primary Details",
            "labelName": {
                "defaultValue": "homeAddress",
                "alias": "homeAddress"
            },
            "type": "homeAddress",
            "col": 4
        },
        {
            "sectionName": "Primary Details",
            "labelName": {
                "defaultValue": "workEmail",
                "alias": "workEmailAddress"
            },
            "placeholder": "Enter Work Email",
            "type": "email",
            "col": 4,
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Work Email Required"
                },
                {
                    name: "email",
                    validator: Validators.email,
                    message: "Invalid Email"
                }
            ]
        },
        {
            "sectionName": "Primary Details",
            "labelName": {
                "defaultValue": "personalEmail",
                "alias": "personalEmailAddress"
            },
            "placeholder": "Enter Personal Email",
            "type": "email",
            "col": 4,
            "min": 0,
            "validations": [
                {
                    name: "email",
                    validator: Validators.email,
                    message: "Invalid Email"
                }
            ]
        },
        {
            "sectionName": "Primary Details",
            "labelName": {
                "defaultValue": "governmentUniqueId",
                "alias": "governmentUniqueId"
            },
            "placeholder": "Enter Government Unique Id",
            "type": "text",
            "col": 4,
        },
        {
            "sectionName": "Primary Details",
            "labelName": {
                "defaultValue": "maritalStatus",
                "alias": "maritalStatus"
            },
            "placeholder": "Select Marital Status",
            "type": "maritalStatus",
            "col": 4,
            "multiple": false,
            "jsonListName": 'maritalStatus',
        },
        {
            "sectionName": "Primary Details",
            "labelName": {
                "defaultValue": "dateOfBirth",
                "alias": "dateOfBirth"
            },
            "type": "date",
            "col": 4,
        },
        {
            "sectionName": "Primary Details",
            "labelName": {
                "defaultValue": "nationality",
                "alias": "nationality"
            },
            "placeholder": "Select Nationality",
            "type": "nationality",
            "col": 4,
            "multiple": false,
            "jsonListName": 'nationality',
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Nationality Required"
                }
            ]
        },
        {
            "sectionName": "Primary Details",
            "labelName": {
                "defaultValue": "religion",
                "alias": "religion"
            },
            "placeholder": "Select Religion",
            "type": "religion",
            "col": 4,
            "multiple": false,
            "jsonListName": 'religion',
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Religion Required"
                }
            ]
        },
        {
            "sectionName": "Primary Details",
            "labelName": {
                "defaultValue": "ethnicity",
                "alias": "ethnicity"
            },
            "placeholder": "Select Ethnicity",
            "type": "ethnicity",
            "col": 4,
            "multiple": false,
            "jsonListName": 'ethnicity',
        },
        {
            "sectionName": "Primary Details",
            "labelName": {
                "defaultValue": "supervisorId",
                "alias": "Reporting to"
            },
            "placeholder": "Select Supervisor",
            "type": "employee",
            "col": 4,
            "scope": 'supervisors',
            "apiLink": "core-hr/employee",
            "multiple": false,
        },
        {
            "sectionName": "Primary Information",
            "labelName": {
                "defaultValue": "indirectReportingId",
                "alias": "indirectReportingSupervisor"
            },
            "placeholder": "Select Indirect Reporting Supervisor",
            "type": "employee",
            "col": 4,
            "scope": 'supervisors',
            "apiLink": "core-hr/employee",
            "multiple": false,
        },
        {
            "sectionName": "Primary Details",
            "labelName": {
                "defaultValue": "bloodGroup",
                "alias": "bloodGroup"
            },
            "placeholder": "Select Blood Group",
            "type": "bloodGroup",
            "col": 4,
            "multiple": false,
            "jsonListName": 'bloodGroup',
        },
        {
            "sectionName": "Primary Details",
            "labelName": {
                "defaultValue": "height",
                "alias": "height"
            },
            "placeholder": "Enter Height",
            "type": "height",
            "col": 4,
            "maxLength": 3

        },
        {
            "sectionName": "Primary Details",
            "labelName": {
                "defaultValue": "weight",
                "alias": "weight"
            },
            "placeholder": "Enter Weight",
            "type": "weight",
            "col": 4
        },

        {
            "sectionName": "Primary Information",
            "labelName": {
                "defaultValue": "arabicName",
                "alias": "Full Name (In Arabic)"
            },
            "placeholder": "Enter Arabic Name",
            "labelTransformationCancelled": true,
            "type": "text",
            "col": 4,
        },
    ]
}

const currentAddressFormData: FormMeta = {
    "tabName": "Current Address",
    "formName": "addressForm",
    "labels": [
        {
            "sectionName": "Current Address",
            "labelName": {
                "defaultValue": "currentAddressLine1",
                "alias": "addressLine1"
            },
            "placeholder": "Enter Address Line1",
            "type": "text",
            "col": 8,
        },
        {
            "sectionName": "Current Address",
            "labelName": {
                "defaultValue": "currentAddressLine2",
                "alias": "addressLine2"
            },
            "placeholder": "Enter Address Line2",
            "optional": true,
            "type": "text",
            "col": 8,
        },
        {
            "sectionName": "Current Address",
            "labelName": {
                "defaultValue": "currentCity",
                "alias": "city"
            },
            "placeholder": "Enter City",
            "type": "text",
            "col": 8,
        },
        {
            "sectionName": "Current Address",
            "labelName": {
                "defaultValue": "currentState",
                "alias": "state"
            },
            "placeholder": "Enter state",
            "type": "text",
            "col": 8,
        },
        {
            "sectionName": "Current Address",
            "labelName": {
                "defaultValue": "currentPostalCode",
                "alias": "postalCode"
            },
            "placeholder": "Enter Postal Code",
            "type": "number",
            "optional": true,
            "col": 8,
            "maxLength": 6,
            "validations": [
                {
                    validator: Validators.maxLength(6),
                }
            ]
        },
        {
            "sectionName": "Current Address",
            "labelName": {
                "defaultValue": "currentCountry",
                "alias": "country"
            },
            "placeholder": "Enter Country",
            "type": "country",
            "col": 8,
            "multiple": false,
            "jsonListName": 'country',
        },

    ]
}

const homeAddressFormData = {
    "tabName": "Home Address",
    "formName": "Home Address",
    "labels": [
        {
            "sectionName": "Home Address",
            "labelName": {
                "defaultValue": "sameAsCurrentAddress",
                "alias": "sameAsCurrentAddress"
            },
            "type": "checkbox",
            "col": 8,
        },
        {
            "sectionName": "Home Address",
            "labelName": {
                "defaultValue": "homeAddressLine1",
                "alias": "addressLine1"
            },
            "placeholder": "Enter Address Line1",
            "type": "text",
            "col": 8,
        },
        {
            "sectionName": "Home Address",
            "labelName": {
                "defaultValue": "homeAddressLine2",
                "alias": "addressLine2"
            },
            "placeholder": "Enter Address Line2",
            "type": "text",
            "optional": true,
            "col": 8,
        },
        {
            "sectionName": "Home Address",
            "labelName": {
                "defaultValue": "homeCity",
                "alias": "city"
            },
            "placeholder": "Enter City",
            "type": "text",
            "col": 8,
        },
        {
            "sectionName": "Home Address",
            "labelName": {
                "defaultValue": "homeState",
                "alias": "state"
            },
            "placeholder": "Enter State",
            "type": "text",
            "col": 8,
        },
        {
            "sectionName": "Home Address",
            "labelName": {
                "defaultValue": "homePostalCode",
                "alias": "postalCode"
            },
            "placeholder": "Enter Postal Code",
            "optional": true,
            "type": "number",
            "col": 8,
            "maxLength": 6,
            "validations": [
                {
                    validator: Validators.maxLength(6),
                }
            ]
        },
        {
            "sectionName": "Home Address",
            "labelName": {
                "defaultValue": "homeCountry",
                "alias": "country"
            },
            "placeholder": "Enter Country",
            "type": "country",
            "col": 8,
            "multiple": false,
            "jsonListName": 'country',

        },

    ]
}


const emergencyContactFormData = {
    "tabName": "emergencyContact",
    "formName": "emergencyContact",
    "labels": [
        {
            "sectionName": "Contact Information",
            "labelName": {
                "defaultValue": "name",
                "alias": "name"
            },
            "placeholder": "Enter Name",
            "type": "text",
            "col": 6,
            "required": true,
            "validations": [
            {
                    name: "required",
                    validator: Validators.required,
                    message: "Enter Name"
                }
            ]
        },
        {
            "labelName": {
                "defaultValue": "id",
                "alias": "id"
            },
        },
        {
            "sectionName": "Contact Information",
            "labelName": {
                "defaultValue": "relationship",
                "alias": "relationship"
            },
            "placeholder": "Select Relationship",
            "type": "text",
            "col": 6,
            "multiple": false,
            "jsonListName": 'relationship',
        },
        {
            "sectionName": "Contact Information",
            "labelName": {
                "defaultValue": "address",
                "alias": "address"
            },
            "placeholder": "Enter Address",
            "type": "textarea",
            "col": 6,
        },
        {
            "sectionName": "Contact Information",
            "labelName": {
                "defaultValue": "phoneNumber",
                "alias": "phoneNumber"
            },
            "placeholder": "Enter Phone Number",
            "type": "phoneNumber",
            "col": 6,
            "min": 0,
            "max":10,
            "required": true,
            "validations": [
            {
                    name: "required",
                    validator: Validators.required,
                    message: "Enter Phone Number"
                }
            ]
        },

    ]
}

const rolesFormData = {
    "tabName": "roles",
    "formName": "rolesForm",
    "labels": [
        {
            "sectionName": "Roles",
            "labelName": {
                "defaultValue": "roles",
                "alias": "roles"
            },
            "placeholder": "Select Role",
            "type": "roles",
            "col": 7,
            "apiLink": 'setup/access/roles',
            "multiple": false,

        },
    ]
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////Employee pill tab /////////////////////////////////////////////////////////
const detailsCardEmployeeInformationMeta: DetailsCardMeta[] = [
    {
        "name": "Employee Information",
        "isCollapse": true,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "grade",
                    "alias": "Grade",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "workCalendar",
                    "alias": "Work Calendar",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "shift",
                    "alias": "shift",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "employeeContract",
                    "alias": "Employee Contract",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "employeeCategory",
                    "alias": "Employee Category",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "joiningDate",
                    "alias": "Joining Date"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "payrollOnboardDate",
                    "alias": "Payroll Onboard Date"
                },
                "type": "text",
                "hide": false
            },
        ]
    },


]
const detailsCardClassificationMeta: DetailsCardMeta[] = [
    {
        "name": "Classification",
        "isCollapse": true,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "userSubsidiary",
                    "alias": "User Subsidiary"
                },
                "type": "associatedEntity",
                "baseUrl": "/organisation/subsidiary"
            },
            {
                "labelName": {
                    "defaultValue": "sponsorSubsidiary",
                    "alias": "Sponsor Subsidiary",
                },
                "type": "associatedEntity",
                "baseUrl": "/organisation/subsidiary"
            },
            {
                "labelName": {
                    "defaultValue": "expenseSubsidiary",
                    "alias": "Expense Subsidiary",
                },
                "type": "associatedEntity",
                "baseUrl": "/organisation/subsidiary"
            },
            {
                "labelName": {
                    "defaultValue": "jurisdiction",
                    "alias": "Jurisdiction",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "class",
                    "alias": "Class",
                },
                "type": "text"
            }
        ]
    },


]
const detailsCardActiveBankDetailsMeta: DetailsCardMeta[] = [
    {
        "name": "Active Bank Details",
        "isCollapse": true,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "accountType",
                    "alias": "Account Type"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "name",
                    "alias": "Bank Name",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "accountNo",
                    "alias": "Account Number",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "ibanNo",
                    "alias": "IBAN",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "paymentMethod",
                    "alias": "Payment Method",
                },
                "type": "text"
            }
        ]
    },


]
const detailsCardFullFinalStatusMeta: DetailsCardMeta[] = [
    {
        "name": "Full & Final Status",
        "isCollapse": true,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "employmentEndDate",
                    "alias": "Employment End Date"
                },
                "type": "date"
            },
            {
                "labelName": {
                    "defaultValue": "full&finalStatus",
                    "alias": "Full & Final Status",
                },
                "type": "text"
            },
        ]
    },


]
const employeeTabsMeta: TrazepoidTabsMeta[] = [
    {
        label: "systemNotes",
        tabIndex: 0,
    }
]


const employeeInformationTabsFormData = {
    "formName": "employeeInformationForm",
    "labels": [
        {
            "sectionName": "Employee Information",
            "labelName": {
                "defaultValue": "gradeId",
                "alias": "gradeId"
            },
            "placeholder": "Select Grade",
            "type": "grade",
            "col": 6,
            "apiLink": "core-hr/employee/settings/grade",
            "multiple": false,
        },
        {
            "sectionName": "Employee Information",
            "labelName": {
                "defaultValue": "designationId",
                "alias": "designationId"
            },
            "placeholder": "Select Designation",
            "type": "designation",
            "col": 6,
            // "apiLink": "core-hr/employee/settings/designation",
            "multiple": false,
        },
        {
            "sectionName": "Employee Information",
            "labelName": {
                "defaultValue": "categoryId",
                "alias": "categoryId"
            },
            "placeholder": "Select Employee Category",
            "type": "employeeCategory",
            "col": 6,
            "apiLink": "core-hr/employee/settings/category",
            "multiple": false,
        },
        {
            "sectionName": "Primary Information",
            "labelName": {
                "defaultValue": "hireDate",
                "alias": "hireDate"
            },
            "type": "date",
            "col": 6,
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Hire Date Required"
                }
            ]
        },
        {
            "sectionName": "Employee Information",
            "labelName": {
                "defaultValue": "subsidiaryId",
                "alias": "userSubsidiary"
            },
            "placeholder": "Select User Subsidiary",
            "type": "subsidiary",
            "col": 6,
            "apiLink": "core-hr/organisation/subsidiary",
            "multiple": false,
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Subsidiary Required"
                }
            ]
        },
        {
            "sectionName": "Employee Information",
            "labelName": {
                "defaultValue": "locationId",
                "alias": "location"
            },
            "placeholder": "Select Location",
            "type": "location",
            "col": 6,
            "apiLink": "core-hr/organisation/location",
            "multiple": false,
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Location Required"
                }
            ]
        },
        {
            "sectionName": "Employee Information",
            "labelName": {
                "defaultValue": "departmentId",
                "alias": "department"
            },
            "placeholder": "Select Department",
            "type": "department",
            "col": 6,
            "apiLink": "core-hr/organisation/department",
            "multiple": false,
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Department Required"
                }
            ]
        },
        {
            "sectionName": "Employee Information",
            "labelName": {
                "defaultValue": "classId",
                "alias": "class"
            },
            "placeholder": "Select Class",
            "type": "class",
            "col": 6,
            "apiLink": "core-hr/organisation/class",
            "multiple": false,
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Class Required"
                }
            ]
        },
        {
            "sectionName": "Employee Information",
            "labelName": {
                "defaultValue": "currency",
                "alias": "currency"
            },
            "placeholder": "Select Currency",
            "type": "currency",
            "col": 6,
            "jsonListName": "currency"
        },
        {
            "sectionName": "Employee Information",
            "labelName": {
                "defaultValue": "sponserSubsidiaryId",
                "alias": "sponserSubsidiary"
            },
            "required": true,
            "hide": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Sponser Subsidiary Required"
                }
            ],
            "placeholder": "Select Sponser Subsidiary",
            "type": "sponserSubsidiary",
            "apiLink": "core-hr/organisation/subsidiary",
            "multiple": false,
            "col": 6,

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
            "type": "expenseSubsidiary",
            "apiLink": "core-hr/organisation/subsidiary",
            "multiple": false,
            "hide": true,
            "col": 6,
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
            "col": 6,
            "hide": true,

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
                "defaultValue": "workCalendarId",
                "alias": "Work Calendar"
            },
            "placeholder": "Select Work Calendar",
            "type": "workCalendar",
            "col": 6,
            "hide": true,

            "apiLink": "time-attendance/work-calendar",
            "multiple": false,
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
            "col": 6,
            "hide": true,

            "apiLink": "time-attendance/shift",
            "multiple": false,
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
}

const bankDetailsformData = {
    "formName": "bankInformationForm",
    "labels": [
        {
            "sectionName": "Bank Information",
            "labelName": {
                "defaultValue": "accountTypeId",
                "alias": "accountType"
            },
            "placeholder": "Select Account Type",
            "type": "accountType",
            "col": 8,
            "apiLink": "core-hr/employee/settings/bank-account-type",
            "multiple": false,
        },
        {
            "sectionName": "Bank Information",
            "labelName": {
                "defaultValue": "name",
                "alias": "bankName"
            },
            "placeholder": "Enter Bank Name",
            "type": "text",
            "col": 8,
        },
        {
            "sectionName": "Bank Information",
            "labelName": {
                "defaultValue": "accountNo",
                "alias": "accountNumber"
            },
            "placeholder": "Enter Account Number",
            "type": "number",
            "col": 8,

        },
        {
            "sectionName": "Bank Information",
            "labelName": {
                "defaultValue": "ibanNo",
                "alias": "IBAN"
            },
            "placeholder": "Enter IBAN Number",
            "type": "text",
            "col": 8,
            "labelTransformationCancelled": true,
        },
        {
            "sectionName": "Bank Information",
            "labelName": {
                "defaultValue": "paymentMethodId",
                "alias": "paymentMethod"
            },
            "placeholder": "Enter Payment Method",
            "type": "paymentMethod",
            "col": 8,
            "apiLink": "core-hr/employee/settings/payment-method",
            "multiple": false
        },
    ]
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////Payroll pill tab /////////////////////////////////////////////////////////

const payrollTabsMeta: TrazepoidTabsMeta[] = [
    {
        label: "payslips", // table name in Database
        tabIndex: 0,
        tableData: {
            isActionColumn: true,
            customAction: true,
            redirectUrl: "/payroll-management/generate/payslip",
            columns: [
                {
                    name: "batch",
                },
                {
                    name: "month",
                },
                {
                    name: "paidDays",
                },
                {
                    name: "year",
                },
                {
                    name: "type",
                },
                {
                    name: "netAmount",
                },
                {
                    name: "earningAmount",
                },
                {
                    name: "deductionAmount",
                },
                {
                    name: "startDate",
                },
                {
                    name: "endDate",
                },
                {
                    name: "leaveDays",
                },
                {
                    name: "lossOfPayDays",
                },
                {
                    name: "netInPayWords",
                },
                {
                    name: "processedDate",
                },
                {
                    name: "status",
                },

            ]
        }
    },
    {
        label: "contributionRules",
        tabIndex: 1,
        showLabel: "Contribution",
        tableData: {
            isActionColumn: true,
            redirectUrl: "/payroll-management/setup/contribution",
            columns: [
                {
                    name: "name",
                }
            ]
        }
    },
    {
        label: "overtimeRules",
        showLabel: "Overtime Rule",
        tabIndex: 2,
        tableData: {
            isActionColumn: true,
            redirectUrl: "/payroll-management/setup/overtime-setup",
            columns: [
                {
                    name: "name",
                },
                {
                    name: "payableCycle",
                },
                {
                    name: "type",
                },
                {
                    name: "endTime",
                },
                {
                    name: "overtimeCalculationType",
                },
                {
                    name: "payableCycleDay",
                },
                {
                    name: "rate",
                },
            ]
        }
    },
    {
        label: "salaryAdvance", // table name in Database
        tabIndex: 3,
        tableData: {
            isActionColumn: true,
            redirectUrl: "/payroll-management/salary-advance",
            columns: [
                {
                    name: "amount",
                },
                {
                    name: "payrollType",
                },
                {
                    name: "requestDate",
                },
                {
                    name: "reason",
                },
                {
                    name: "paymentMethod",
                },
                {
                    name: "installmentStartDate",
                },
                {
                    name: "noOfInstallment",
                },
                {
                    name: "installmentRecoveryType",
                },
            ]
        }
    },
    {
        label: "systemNotes",
        tabIndex: 4,
    },
]

const detailsCardSalaryInformationMeta: DetailsCardMeta[] = [
    {
        "name": "Salary Information",
        "isCollapse": true,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "allocation",
                    "alias": "salaryAllocationMethod"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "currency",
                    "alias": "Currency",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "effectiveDate",
                    "alias": "Effective Date",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "grossPay",
                    "alias": "Gross Pay",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "expenseType",
                    "alias": "expenseType"
                },
                "type": "text"
            },
        ]
    },


]
const detailsCardExpenseManagementMeta: DetailsCardMeta[] = [
    {
        "name": "Expense Management",
        "isCollapse": true,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "expenseLimit",
                    "alias": "Expense Limit"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "expenseApprover",
                    "alias": "Expense Approver",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "expenseApproverLimit",
                    "alias": "Expense Approver Limit",
                },
                "type": "text"
            }
        ]
    },


]
const detailsCardProvisionMeta: DetailsCardMeta[] = [
    {
        "name": "Provision",
        "isCollapse": true,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "gratuityProvision",
                    "alias": "Gratuity Provision"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "leaveProvision",
                    "alias": "Leave Provision",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "airTicketProvision",
                    "alias": "Air Ticket Provison   ",
                },
                "type": "text"
            }
        ]
    },


]
const detailsCardSetupMeta: DetailsCardMeta[] = [
    {
        "name": "Setup",
        "isCollapse": true,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "payrollCycle",
                    "alias": "Payroll Cycle"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "contributionRules",
                    "alias": "Contribution Rules",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "overtimeRules",
                    "alias": "Overtime Rules",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "airTicketEligibilty",
                    "alias": "Air Ticket Eligibility",
                },
                "type": "text"
            }
        ]
    },


]
const detailsCardPayPeriodInformationMeta: DetailsCardMeta[] = [
    {
        "name": "Pay Period Information",
        "isCollapse": true,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "month",
                    "alias": "Month"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "startDate",
                    "alias": "Start Date",
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "endDate",
                    "alias": "End Date",
                },
                "type": "text"
            }
        ]
    },


]

const setUpFormData = {
    "formName": "setUpForm",
    "labels": [
        // {
        //     "sectionName": "Payroll Setup",
        //     "labelName": {
        //         "defaultValue": "payrollCycleId",
        //         "alias": "payrollCycle"
        //     },
        //     "required": true,
        //     "validations": [
        //         {
        //             name: "required",
        //             validator: Validators.required,
        //             message: "Payroll Cycle Required"
        //         }
        //     ],
        //     "placeholder": "Enter Payroll Cycle",
        //     "type": "payrollCycle",
        //     "col": 8,
        //     "min": 0,
        //     "apiLink": "payroll/setup/cycle",
        //     "multiple": false
        // },
        // {
        //     "sectionName": "Payroll Setup",
        //     "labelName": {
        //         "defaultValue": "contributionRules",
        //         "alias": "contributionRules"
        //     },
        //     "placeholder": "Select Contribution Rules",
        //     "type": "contributionRules",
        //     "col": 8,
        //     "min": 0,
        //     "apiLink": "payroll/setup/contribution",
        //     "multiple": true
        // },
        // {
        //     "sectionName": "Payroll Setup",
        //     "labelName": {
        //         "defaultValue": "overtimeRules",
        //         "alias": "overtimeRules"
        //     },
        //     "placeholder": "Enter Overtime Rules",
        //     "type": "overtimeRules",
        //     "col": 8,
        //     "min": 0,
        //     "multiple": true
        // },
        {
            "sectionName": "Payroll Setup",
            "labelName": {
                "defaultValue": "airTicketEligibilityId",
                "alias": "airTicketEligibility"
            },
            "placeholder": "Select Air Ticket Eligibility",
            "type": "ticketEligibility",
            "col": 8,
            "min": 0,
            "apiLink": "core-hr/employee/settings/air-ticket-entitlement",
            "multiple": false
        }
    ]
}

const defineSalaryFormData={
    "formName": "defineSalaryForm",
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

    ]
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////leave pill tab /////////////////////////////////////////////////////////
const leaveTabsMeta: TrazepoidTabsMeta[] = [
    {
        label: "employeeLeavePlan", // table name in Database
        showLabel: "Leave Plan", // table name in Database
        tabIndex: 2,
        tableData: {
            isActionColumn: true,
            redirectUrl: "/employee/settings/employee-leave-plan",
            columns: [
                {
                    name: "leaveType",
                },
                {
                    name: "accruedUpto",
                },
                {
                    name: "accrualStartDate",
                },
                {
                    name: "accrualEndDate",
                },
                {
                    name: "accrualNextDate",
                },
                {
                    name: "accrualCount",
                },
                {
                    name: "status",
                },
            ]
        }
    },
    {
        label: "leaveApplication", // table name in Database
        tabIndex: 0,
        tableData: {
            isActionColumn: true,
            redirectUrl: "/leave-management/leave-application",
            columns: [
                {
                    name: "dateOfRequest",
                },
                {
                    name: "leaveType",
                },
                {
                    name: "reason",
                },
                {
                    name: "leaveDuration",
                },
                {
                    name: "hour",
                },
                {
                    name: "startDate",
                },
                {
                    name: "endDate",
                },
                {
                    name: "leaveDays",
                },
            ]
        }
    },
    {
        label: "leaveAdjustment", // table name in Database
        showLabel: "Leave Transaction", // table name in Database
        tabIndex: 1,
        tableData: {
            isActionColumn: true,
            redirectUrl: "/leave-management/adjustment",
            columns: [
                {
                    name: "transactionType",
                },
                {
                    name: "transactionDate",
                },
                {
                    name: "status",
                },
                {
                    name: "startDate",
                },
                {
                    name: "endDate",
                },
                {
                    name: "hour",
                },
                {
                    name: "days",
                },
                {
                    name: "remarks",
                },
            ]
        }
    },
    {
        label: "attendance", // table name in Database
        tabIndex: 3,
        tableData: {
            isActionColumn: true,
            redirectUrl: "/leave-and-attendance/attendance",
            columns: [
                {
                    name: "shift",
                },
                {
                    name: "date",
                },
                {
                    name: "days",
                },
                {
                    name: "firstTimeIn",
                },
                {
                    name: "lastTimeOut",
                },
                {
                    name: "workCalender",
                },
                {
                    name: "lessHourWorked",
                },
                {
                    name: "attendanceStatus",
                },
                {
                    name: "leaveAdjustmentReferenceId",
                },
                {
                    name: "timeOffAdjustmentReferenceId",
                }
            ]
        }
    },
    {
        label: "systemNotes",
        tabIndex: 0,
    },
]
const detailsCardLeaveSetupMeta: DetailsCardMeta[] = [
    {
        "name": "Setup",
        "isCollapse": true,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "leavePlan",
                    "alias": "Leave Plan"
                },
                "type": "text"
            }
        ]
    },


]

const leaveChartMeta = [
    {
        label: 'Annual Leave',
        icon: './assets/media/icons/airplane-icon-styled.svg',
        chartHeight: '130px',
        baseColor: '#FF982E',
        lightColor: '#EDEDF9',
        total: 50,
        used: 20
    },
    {
        label: 'Sick Leave',
        icon: './assets/media/icons/fitness-icon-styled.svg',
        chartHeight: '130px',
        baseColor: '#AEAEF9',
        lightColor: '#EDEDF9',
        total: 30,
        used: 10
    },
    {
        label: 'Compassionate Leave',
        icon: './assets/media/icons/document-icon-styled.svg',
        chartHeight: '130px',
        baseColor: '#FFDCB8',
        lightColor: '#EDEDF9',
        total: 20,
        used: 15
    },
    {
        label: 'Hajj Leave',
        icon: './assets/media/icons/noun-moon-icon-styled.svg',
        chartHeight: '130px',
        baseColor: '#CCC1DD',
        lightColor: '#EDEDF9',
        total: 10,
        used: 5
    },
    {
        label: 'Maternity Leave',
        icon: './assets/media/icons/medikit-icon-styled.svg',
        chartHeight: '130px',
        baseColor: '#5E9CFF',
        lightColor: '#EDEDF9',
        total: 12,
        used: 10
    },
    {
        label: 'Annual Leave',
        icon: './assets/media/icons/airplane-icon-styled.svg',
        chartHeight: '130px',
        baseColor: '#FF982E',
        lightColor: '#EDEDF9',
        total: 50,
        used: 20
    },
    {
        label: 'Sick Leave',
        icon: './assets/media/icons/fitness-icon-styled.svg',
        chartHeight: '130px',
        baseColor: '#AEAEF9',
        lightColor: '#EDEDF9',
        total: 30,
        used: 10
    },
    {
        label: 'Compassionate Leave',
        icon: './assets/media/icons/document-icon-styled.svg',
        chartHeight: '130px',
        baseColor: '#FFDCB8',
        lightColor: '#EDEDF9',
        total: 20,
        used: 15
    },
    {
        label: 'Hajj Leave',
        icon: './assets/media/icons/noun-moon-icon-styled.svg',
        chartHeight: '130px',
        baseColor: '#CCC1DD',
        lightColor: '#EDEDF9',
        total: 10,
        used: 5
    },
    {
        label: 'Maternity Leave',
        icon: './assets/media/icons/medikit-icon-styled.svg',
        chartHeight: '130px',
        baseColor: '#5E9CFF',
        lightColor: '#EDEDF9',
        total: 12,
        used: 10
    },

]

const leaveSetupFormData = {
    "formName": "setUpForm",
    "labels": [
        {
            "sectionName": "Leave Setup",
            "labelName": {
                "defaultValue": "leavePlanId",
                "alias": "leavePlan"
            },
            "placeholder": "Select leave configuration",
            "type": "leavePlan",
            "col": 8,
            "apiLink": "leave/configuration",
            "multiple": false
        }
    ]
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////Document and credentials  pill tab /////////////////////////////////////////////////////////



const documentTabsMeta: TrazepoidTabsMeta[] = [
    {
        label: "documents", // table name in Database
        tabIndex: 0,
        tableData: {
            isActionColumn: true,
            columns: [
                {
                    name: "documentName",
                },
                {
                    name: "documentType",
                },
                {
                    name: "credentialNumber",
                },
                {
                    name: "issueDate",
                },
                {
                    name: "issueAuthority",
                },
                {
                    name: "placeOfIssue",
                },
                {
                    name: "expiryDate",
                },
                {
                    name: "country",
                },
                {
                    name: "trackingApplication",
                },

            ]
        }
    },
    {
        label: "systemNotes",
        tabIndex: 0,
    },
]



const documentChartMeta = [
    {
        defaultName: "visaDetails",
        label: 'Visa Expired',
        icon: './assets/media/icons/card-icon-styled.svg',
        chartHeight: '130px',
        baseColor: '#FF0000',
        lightColor: '#EDEDF9',
        borderColor: '#FF0000 solid 0.5px',
        issueDate: 'Oct 20',
        expiryDate: 'Nov 20',
        totalDays: null,
        remainingDays: null,
        consumedDays: null,
        documentType: null,
        documentName: null,
        browse: null,
        credentialNumber: null,
        placeOfIssue: null,
        issueAuthority: null,
        trackingApplication: true,
        documentId: null
    },
    {
        defaultName: "passportDetails",
        label: 'Passport Credentials Expiry',
        icon: './assets/media/icons/noun-passport-icon-styled.svg',
        chartHeight: '130px',
        baseColor: '#FF9900',
        lightColor: '#EDEDF9',
        borderColor: '#FF9900 solid 0.5px',
        issueDate: 'Oct 20',
        expiryDate: 'Nov 20',
        totalDays: null,
        remainingDays: null,
        consumedDays: null,
        documentType: null,
        documentName: null,
        browse: null,
        credentialNumber: null,
        placeOfIssue: null,
        issueAuthority: null,
        trackingApplication: true,
        documentId: null
    },
    {
        defaultName: "drivingLiscenseDetails",
        label: 'Driving License Expiry',
        icon: './assets/media/icons/id-card-icon-styled.svg',
        chartHeight: '130px',
        baseColor: '#FCDA8D',
        lightColor: '#EDEDF9',
        borderColor: '#FCDA8D solid 0.5px',
        issueDate: 'Oct 20',
        expiryDate: 'Nov 20',
        totalDays: null,
        remainingDays: null,
        consumedDays: null,
        documentType: null,
        documentName: null,
        browse: null,
        credentialNumber: null,
        placeOfIssue: null,
        issueAuthority: null,
        trackingApplication: true,
        documentId: null
    },
    {
        defaultName: "emiratesIdDetails",
        label: 'Emirates ID Expiry',
        icon: './assets/media/icons/noun-id-icon-styled.svg',
        chartHeight: '130px',
        baseColor: '#99CC01',
        lightColor: '#EDEDF9',
        borderColor: '#99CC01 solid 0.5px',
        issueDate: 'Oct 20',
        expiryDate: 'Nov 20',
        totalDays: null,
        remainingDays: null,
        consumedDays: null,
        documentType: null,
        documentName: null,
        browse: null,
        credentialNumber: null,
        placeOfIssue: null,
        issueAuthority: null,
        trackingApplication: true,
        documentId: null
    },
]
////////////////////////////////////////////////////////////////////////////////////////////////////////////

export {
    bankDetailsformData, currentAddressFormData, defineSalaryFormData, detailsCardActiveBankDetailsMeta, detailsCardClassificationMeta, detailsCardEmployeeInformationMeta,
    detailsCardEmployeeOverviewMeta, detailsCardExpenseManagementMeta, detailsCardFullFinalStatusMeta,
    detailsCardLeaveSetupMeta, detailsCardPayPeriodInformationMeta, detailsCardProvisionMeta, detailsCardSalaryInformationMeta, detailsCardSetupMeta,
    documentChartMeta, documentTabsMeta, emergencyContactFormData, employeeInformationTabsFormData, employeeTabsMeta, homeAddressFormData, leaveChartMeta, leaveSetupFormData, leaveTabsMeta, overViewTabsFormData, overViewTabsMeta, payrollTabsMeta,
    pillsData, rolesFormData, setUpFormData,profileImageFormData
};

