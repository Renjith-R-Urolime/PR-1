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
    {
        label: "Step 3",
        number: 3,
        tabIndex: 2,
    }
]
const currentAddressFormSections: Sections = [
    {
        "tabName": "Current Address",
        "sectionName": "Current Address",
        "sectionDescription": ""
    },
]

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
            "maxLength":6,
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
const homeAddressFormSections: Sections = [
    {
        "tabName": "Home Address",
        "sectionName": "Home Address",
        "sectionDescription": ""
    },
]
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
            "maxLength":6,
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
const step1FormSections: Sections = [
    {
        "tabName": "step1",
        "sectionName": "Primary Information",
        "sectionDescription": ""
    },
    {
        "tabName": "step1",
        "sectionName": "Classification",
        "sectionDescription": ""
    }
]

const uploadFileFormSections: Sections = [
    {
        "tabName": "uploadDocument",
        "sectionName": "Documents",
        "sectionDescription": ""
    },
    {
        "tabName": "uploadDocument",
        "sectionName": "Classification",
        "sectionDescription": ""
    }
]

const step2FormSections: Sections = [
    {
        "tabName": "step2",
        "sectionName": "Contact Information",
        "sectionDescription": ""
    },
    {
        "tabName": "step2",
        "sectionName": "Personal Information",
        "sectionDescription": ""
    },
    {
        "tabName": "step2",
        "sectionName": "Access Information",
        "sectionDescription": ""
    }
]

const step3FormSections: Sections = [
    {
        "tabName": "step3",
        "sectionName": "Documents",
        "sectionDescription": ""
    },
]

const step1FormData = {
    "tabName": "step1",
    "formName": "step1Form",
    "labels": [
        {
            "sectionName": "Primary Information",
            "labelName": {
                "defaultValue": "employeeId",
                "alias": "employeeId"
            },
            "placeholder": "Generating Employee ID...",
            "type": "text",
            "disabled": true,
            "col": 4,
        },
        {
            "sectionName": "Primary Information",
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
            "sectionName": "Primary Information",
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
            "sectionName": "Primary Information",
            "labelName": {
                "defaultValue": "middleName",
                "alias": "middleName"
            },
            "placeholder": "Enter Middle Name",
            "type": "text",
            "col": 4,
        },
        {
            "sectionName": "Primary Information",
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
            "sectionName": "Primary Information",
            "labelName": {
                "defaultValue": "image",
                "alias": "image"
            },
            "type": "file",
            "col": 4,
        },
        {
            "sectionName": "Primary Information",
            "labelName": {
                "defaultValue": "hireDate",
                "alias": "hireDate"
            },
            "type": "date",
            "col": 4,
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
            "sectionName": "Primary Information",
            "labelName": {
                "defaultValue": "gradeId",
                "alias": "gradeId"
            },
            "placeholder": "Select Grade",
            "type": "grade",
            "col": 4,
            "apiLink": "core-hr/employee/settings/grade",
            "multiple": false,
        },
        {
            "sectionName": "Primary Information",
            "labelName": {
                "defaultValue": "designationId",
                "alias": "designationId"
            },
            "placeholder": "Select Designation",
            "type": "designation",
            "col": 4,
            // "apiLink": "core-hr/employee/settings/designation",
            "multiple": false,
        },
        {
            "sectionName": "Primary Information",
            "labelName": {
                "defaultValue": "supervisorId",
                "alias": "supervisor"
            },
            "placeholder": "Select Supervisor",
            "type": "supervisor",
            "col": 4,
            "scope":'supervisors',
            "apiLink": "core-hr/employee",
            "multiple": false,
        },
        {
            "sectionName": "Primary Information",
            "labelName": {
                "defaultValue": "indirectReportingId",
                "alias": "indirectReporting"
            },
            "placeholder": "Select Indirect Reporting Supervisor",
            "type": "indirectReporting",
            "col": 4,
            "scope":'supervisors',
            "apiLink": "core-hr/employee",
            "multiple": false,
        },
        {
            "sectionName": "Primary Information",
            "labelName": {
                "defaultValue": "employeeTypeId",
                "alias": "employeeTypeId"
            },
            "placeholder": "Select Employee Type",
            "type": "employeeType",
            "col": 4,
            "apiLink": "core-hr/employee/settings/types",
            "multiple": false,
        },
        {
            "sectionName": "Primary Information",
            "labelName": {
                "defaultValue": "categoryId",
                "alias": "categoryId"
            },
            "placeholder": "Select Employee Category",
            "type": "employeeCategory",
            "col": 4,
            "apiLink": "core-hr/employee/settings/category",
            "multiple": false,
        },
        {
            "sectionName": "Primary Information",
            "labelName": {
                "defaultValue": "statusId",
                "alias": "statusId"
            },
            "placeholder": "Select Employee Status",
            "type": "employeeStatus",
            "col": 4,
            "apiLink": "core-hr/employee/settings/status",
            "multiple": false,
        },
        {
            "sectionName": "Primary Information",
            "labelName": {
                "defaultValue": "arabicName",
                "alias": "Full Name (In Arabic)"
            },
            "placeholder": "Enter Arabic Name",
            "labelTransformationCancelled":true,
            "type": "text",
            "col": 4,
        },
        {
            "sectionName": "Classification",
            "labelName": {
                "defaultValue": "subsidiaryId",
                "alias": "userSubsidiary"
            },
            "placeholder": "Select User Subsidiary",
            "type": "subsidiary",
            "col": 4,
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
            "sectionName": "Classification",
            "labelName": {
                "defaultValue": "locationId",
                "alias": "location"
            },
            "placeholder": "Select Location",
            "type": "location",
            "col": 4,
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
            "sectionName": "Classification",
            "labelName": {
                "defaultValue": "departmentId",
                "alias": "department"
            },
            "placeholder": "Select Department",
            "type": "department",
            "col": 4,
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
            "sectionName": "Classification",
            "labelName": {
                "defaultValue": "classId",
                "alias": "class"
            },
            "placeholder": "Select Class",
            "type": "class",
            "col": 4,
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
            "sectionName": "Classification",
            "labelName": {
                "defaultValue": "currency",
                "alias": "currency"
            },
            "placeholder": "Select Currency",
            "type": "currency",
            "col": 4,
            "jsonListName": "currency"
        },
    ]
}

const step2FormData = {
    "tabName": "step2",
    "formName": "step2Form",
    "labels": [
        {
            "sectionName": "Contact Information",
            "labelName": {
                "defaultValue": "mobile",
                "alias": "mobile"
            },
            "placeholder": "Enter Mobile Number",
            "type": "phoneNumber",
            "col": 4,
            "min": 0,
            "max":10
        },
        {
            "sectionName": "Contact Information",
            "labelName": {
                "defaultValue": "office",
                "alias": "office"
            },
            "placeholder": "Enter Office Number",
            "type": "phoneNumber",
            "col": 4,
            "min": 0,
            "max":10
        },
        {
            "sectionName": "Contact Information",
            "labelName": {
                "defaultValue": "home",
                "alias": "home"
            },
            "placeholder": "Enter Home Number",
            "type": "phoneNumber",
            "col": 4,
            "min": 0,
            "max":10
        },
        {
            "sectionName": "Contact Information",
            "labelName": {
                "defaultValue": "fax",
                "alias": "fax"
            },
            "placeholder": "Enter Fax",
            "type": "phoneNumber",
            "col": 4,
            "min": 0,
            "max":10
        },
        {
            "sectionName": "Contact Information",
            "labelName": {
                "defaultValue": "workEmail",
                "alias": "workEmail"
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
            "sectionName": "Contact Information",
            "labelName": {
                "defaultValue": "personalEmail",
                "alias": "personalEmail"
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
            "sectionName": "Contact Information",
            "labelName": {
                "defaultValue": "currentAddress",
                "alias": "currentAddress"
            },
            "type": "formDrawer",
            "col": 4
        },
        {
            "sectionName": "Contact Information",
            "labelName": {
                "defaultValue": "homeAddress",
                "alias": "homeAddress"
            },
            "type": "formDrawer",
            "col": 4,
        },
        {
            "sectionName": "Personal Information",
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
            "sectionName": "Personal Information",
            "labelName": {
                "defaultValue": "height",
                "alias": "height"
            },
            "placeholder": "Enter Height",
            "type": "height",
            "col": 4,
            "maxLength":3

        },
        {
            "sectionName": "Personal Information",
            "labelName": {
                "defaultValue": "weight",
                "alias": "weight"
            },
            "placeholder": "Enter Weight",
            "type": "weight",
            "col": 4
        },
        {
            "sectionName": "Personal Information",
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
            "sectionName": "Personal Information",
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
            "sectionName": "Personal Information",
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
            "sectionName": "Personal Information",
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
            "sectionName": "Personal Information",
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
            "sectionName": "Personal Information",
            "labelName": {
                "defaultValue": "dateOfBirth",
                "alias": "dateOfBirth"
            },
            "type": "date",
            "col": 4,
        },
        {
            "sectionName": "Personal Information",
            "labelName": {
                "defaultValue": "governmentUniqueId",
                "alias": "governmentUniqueId"
            },
            "placeholder": "Enter Government Unique Id",
            "type": "text",
            "col": 4,
        },
        {
            "sectionName": "Personal Information",
            "labelName": {
                "defaultValue": "emergencyContact",
                "alias": "emergencyContact"
            },
            "type": "formDrawer",
            "col": 4,
        },
        {
            "sectionName": "Access Information",
            "labelName": {
                "defaultValue": "isEmployeeSelfService",
                "alias": "employeeSelfService"
            },
            "type": "checkbox",
            "col": 4,
        },
        {
            "sectionName": "Access Information",
            "labelName": {
                "defaultValue": "isWebLogin",
                "alias": "webLogin"
            },
            "type": "checkbox",
            "col": 4,
        },
        // {
        //     "sectionName": "Access Information",
        //     "labelName": {
        //         "defaultValue": "resetPassword",
        //         "alias": "resetPassword"
        //     },
        //     "type": "checkbox",
        //     "col": 4,
        // },
        // {
        //     "sectionName": "Access Information",
        //     "labelName": {
        //         "defaultValue": "newPassword",
        //         "alias": "newPassword"
        //     },
        //     "placeholder": "Enter New Password",
        //     "type": "password",
        //     "col": 4,
        // },
        {
            "sectionName": "Access Information",
            "labelName": {
                "defaultValue": "roles",
                "alias": "roles"
            },
            "type": "formDrawer",
            "col": 4,
        },
    ]
}

const step3FormData = {
    "tabName": "step3",
    "formName": "step3Form",
    "labels": [
        {
            "sectionName": "Documents",
            "labelName": {
                "defaultValue": "uploadFile",
                "alias": "uploadFile"
            },
            "type": "button",
            "col": 2
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


const uploadDocumentFormData = {
    "tabName": "uploadDocument",
    "formName": "uploadDocumentForm",
    "labels": [
        {
            "sectionName": "Documents",
            "labelName": {
                "defaultValue": "documentTypeId",
                "alias": "documentType"
            },
            "placeholder": "Select Document Type",
            "type": "documentType",
            "col": 8,
            "apiLink": "core-hr/employee/settings/document-type",
            "multiple": false,

        },
        {
            "sectionName": "Documents",
            "labelName": {
                "defaultValue": "documentName",
                "alias": "documentName"
            },
            "placeholder": "Enter Document Name",
            "type": "text",
            "col": 8,
        },
        {
            "sectionName": "Documents",
            "labelName": {
                "defaultValue": "browse",
                "alias": "browse"
            },
            "type": "file",
            "col": 8,
            "required": true,
            "validations": [
            {
                    name: "required",
                    validator: Validators.required,
                    message: "Upload a Document Please"
                }
            ]
        },
        {
            "sectionName": "Documents",
            "labelName": {
                "defaultValue": "trackingApplication",
                "alias": "trackingApplication"
            },
            "type": "checkbox",
            "col": 8,
        },
        {
            "sectionName": "Documents",
            "labelName": {
                "defaultValue": "credentialNumber",
                "alias": "credentialNumber"
            },
            "placeholder": "Enter Credential Number",
            "type": "text",
            "col": 8,
        },
        {
            "sectionName": "Documents",
            "labelName": {
                "defaultValue": "issueDate",
                "alias": "issueDate"
            },
            "type": "date",
            "col": 8,
        },
        {
            "sectionName": "Documents",
            "labelName": {
                "defaultValue": "expiryDate",
                "alias": "expiryDate"
            },
            "type": "date",
            "required": true,
            "col": 8,
        },
        {
            "sectionName": "Documents",
            "labelName": {
                "defaultValue": "placeOfIssue",
                "alias": "placeOfIssue"
            },
            "placeholder": "Enter Place of Issue",
            "type": "text",
            "col": 8,
        },
        {
            "sectionName": "Documents",
            "labelName": {
                "defaultValue": "issueAuthority",
                "alias": "issueAuthority"
            },
            "placeholder": "Enter Issue Authority",
            "type": "text",
            "col": 8,
        },
        {
            "sectionName": "Documents",
            "labelName": {
                "defaultValue": "country",
                "alias": "country"
            },
            "placeholder": "Enter Country",
            "type": "country",
            "col": 8,
            "multiple": false,
            "jsonListName": 'country',
        },
        {
            "sectionName": "Documents",
            "labelName": {
                "defaultValue": "documentPath",
                "alias": "documentPath"
            },
            "placeholder": "Enter Issue Authority",
            "type": "pathArray",
            "col": 8,
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



export { currentAddressFormData, currentAddressFormSections, emergencyContactFormData, homeAddressFormData, homeAddressFormSections, rolesFormData, step1FormData, step1FormSections, step2FormData, step2FormSections, step3FormData, step3FormSections, uploadDocumentFormData, wizardTabs };