
import { DetailsCardMeta, FormMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";
// import { DetailsCardMeta } from "src/app/shared/ui/details-card/details-card";
import { WizardTabs } from "src/app/shared/ui/wizard-tabs/wizard-tabs";

const overviewCard: DetailsCardMeta[] = [
    {
        "name": "Primary Information",
        "isCollapse": true,
        "isRowWise": false,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "employeeId",
                    "alias": "Employee Id"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "firstName",
                    "alias": "firstName"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "lastName",
                    "alias": "lastName"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "lastName",
                    "alias": "lastName"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "designation",
                    "alias": "designation"
                },
                "type": "text"
            },
        ]
    },
    {
        "name": "Classification",
        "isCollapse": true,
        "isRowWise": false,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "Subsidiary",
                    "alias": "Subsidiary"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Department",
                    "alias": "Department"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Sponsor Subsidiary",
                    "alias": "Sponsor Subsidiary"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Location",
                    "alias": "Location"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Jurisdiction",
                    "alias": "Jurisdiction"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Class",
                    "alias": "Class"
                },
                "type": "text"
            },

        ],
        "data": [
            {
                "Subsidiary": "KPI  BA& C",
                "Department": "Human Resources",
                "Sponsor Subsidiary": "KPI BA&C",
                "Location": "Dubai",
                "Jurisdiction": "Dubai Mainland",
                "Class": "White Collar Staff",
                "Inactive": ""
            }
        ]
    },
    {
        "name": "Contact Information",
        "isCollapse": true,
        "isRowWise": false,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "Email",
                    "alias": "Email"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Address",
                    "alias": "Address"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Phone",
                    "alias": "Phone"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Fax",
                    "alias": "Fax"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Office Phone",
                    "alias": "Office Phone"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Home Phone",
                    "alias": "Home Phone"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Mobile Phone",
                    "alias": "Mobile Phone"
                },
                "type": "text"
            },

        ],
        "data": [
            {
                "Email": "Brad@gmail.com",
                "Address": "Dubai",
                "Phone": "9523687451",
                "Fax": "9523687451",
                "Office Phone": "9523687451",
                "Home Phone": "9523687451",
                "Mobile Phone": "9523687451"
            }
        ]
    }
];

const wizardTabs: WizardTabs = [
    {
        label: "Overview",
        number: 1,
        tabIndex: 0,
    },
    {
        label: "Employee Info",
        number: 2,
        tabIndex: 1,
    },
    {
        label: "Review",
        number: 3,
        tabIndex: 2,
    }
]
const formSections: Sections = [

    {
        "tabName": "Overview",
        "sectionName": "Primary Information",
        "sectionDescription": "Enter Employee’s Primary Information"
    },
    {
        "tabName": "Overview",
        "sectionName": "Classification",
        "sectionDescription": "Enter Employee’s Classification Records"
    },
    {
        "tabName": "Overview",
        "sectionName": "Contact Information",
        "sectionDescription": "Enter Contact Information"
    },
    {
        "tabName": "Employee Info",
        "sectionName": "Personal Details",
        "sectionDescription": "Enter Employee’s Personal Details"
    },
    {
        "tabName": "Employee Info",
        "sectionName": "Full & Final",
        "sectionDescription": "Enter Full & Final Details"
    },
    {
        "tabName": "Employee Info",
        "sectionName": "Employment Information",
        "sectionDescription": "Enter Employment Information Details"
    }

]
const employeeFormData: FormMeta[] =[
    {
        "tabName": "Overview",
        "formName": "OverviewForm",
        "labels": [
            {
                "sectionName": "Primary Information",
                "labelName": {
                    "defaultValue": "First Name",
                    "alias": "First Name"
                },
                "placeholder": "Enter First Name",
                "type": "text",
                "col": 4
            },
            {
                "sectionName": "Primary Information",
                "labelName": {
                    "defaultValue": "Middle Name",
                    "alias": "Middle Name"
                },
                "placeholder": "Enter Middle Name",
                "type": "text",
                "col": 4
            },
            {
                "sectionName": "Primary Information",
                "labelName": {
                    "defaultValue": "Last Name",
                    "alias": "Last Name"
                },
                "placeholder": "Enter Last Name",
                "type": "text",
                "col": 4
            },
            {
                "sectionName": "Primary Information",
                "labelName": {
                    "defaultValue": "Employee ID",
                    "alias": "Employee ID"
                },
                "placeholder": "Generating Employee ID...",
                "type": "text",
                "col": 4
            },
            {
                "sectionName": "Primary Information",
                "labelName": {
                    "defaultValue": "Gender",
                    "alias": "Gender"
                },
                "placeholder": "Select Gender",
                "type": "select",
                "options": [
                    {
                        "id": 1,
                        "value": "MALE",
                    },
                    {
                        "id": 2,
                        "value": "Female",
                    }
                ],
                "col": 4
            },
            {
                "sectionName": "Primary Information",
                "labelName": {
                    "defaultValue": "Job Title",
                    "alias": "Job Title"
                },
                "placeholder": "Enter Job Title",
                "type": "text",
                "col": 4
            },
            {
                "sectionName": "Primary Information",
                "labelName": {
                    "defaultValue": "Designation",
                    "alias": "Designation"
                },
                "placeholder": "Enter Designation",
                "type": "text",
                "col": 4
            },
            {
                "sectionName": "Primary Information",
                "labelName": {
                    "defaultValue": "Supervisor",
                    "alias": "Supervisor"
                },
                "placeholder": "Enter Supervisor",
                "type": "text",
                "col": 4
            },
            {
                "sectionName": "Primary Information",
                "labelName": {
                    "defaultValue": "Date",
                    "alias": "Date"
                },
                "type": "date",
                "col": 4
            },
            {
                "sectionName": "Classification",
                "labelName": {
                    "defaultValue": "Subsidiary",
                    "alias": "Subsidiary"
                },
                "placeholder": "Select Subsidiary",
                "type": "select",

            },
            {
                "sectionName": "Classification",
                "labelName": {
                    "defaultValue": "Department",
                    "alias": "Department"
                },
                "placeholder": "Enter Department",
                "type": "text",

            },
            {
                "sectionName": "Contact Information",
                "labelName": {
                    "defaultValue": "Mobile",
                    "alias": "Mobile"
                },
                "placeholder": "Enter Mobile Number",
                "type": "text",
                "col": 4
            },
            {
                "sectionName": "Contact Information",
                "labelName": {
                    "defaultValue": "Office",
                    "alias": "Office"
                },
                "placeholder": "Enter Office",
                "type": "text",
                "col": 4
            },
            {
                "sectionName": "Contact Information",
                "labelName": {
                    "defaultValue": "Fax",
                    "alias": "Fax"
                },
                "placeholder": "Enter Fax Number",
                "type": "phoneNumber",
                "col": 4
            },
            {
                "sectionName": "Contact Information",
                "labelName": {
                    "defaultValue": "Email - Work",
                    "alias": "Email - Work"
                },
                "placeholder": "Enter Work Email",
                "type": "text"
            },
            {
                "sectionName": "Contact Information",
                "labelName": {
                    "defaultValue": "Email - Personal",
                    "alias": "Email - Personal"
                },
                "placeholder": "Enter Personal Email",
                "type": "text"
            },
            {
                "sectionName": "Contact Information",
                "labelName": {
                    "defaultValue": "Address",
                    "alias": "Address"
                },
                "placeholder": "Enter Your Full Address",
                "type": "textarea",

            }
        ]
    },
    {
        "tabName": "Employee Info",
        "formName": "employeeForm",
        "labels": [
            {
                "sectionName": "Personal Details",
                "labelName": {
                    "defaultValue": "Blood Group",
                    "alias": "Blood Group"
                },
                "placeholder": "Enter Blood Group",
                "type": "text",
                "col": 4
            },
            {
                "sectionName": "Personal Details",
                "labelName": {
                    "defaultValue": "Date of Birth",
                    "alias": "Date of Birth"
                },
                "type": "date",
                "col": 4
            },
            {
                "sectionName": "Personal Details",
                "labelName": {
                    "defaultValue": "Nationality",
                    "alias": "Nationality"
                },
                "placeholder": "Enter Nationality",
                "type": "text",
                "col": 4

            },
            {
                "sectionName": "Full & Final",
                "labelName": {
                    "defaultValue": "Employee End Date",
                    "alias": "Employee End Date"
                },
                "type": "date",
                "col": 4

            },
            {
                "sectionName": "Full & Final",
                "labelName": {
                    "defaultValue": "EOS Status",
                    "alias": "EOS Status"
                },
                "placeholder": "Enter EOS Status",
                "type": "text",
                "col": 4

            },
            {
                "sectionName": "Full & Final",
                "labelName": {
                    "defaultValue": "EOS Ref#",
                    "alias": "EOS Ref#"
                },
                "placeholder": "Enter EOS Ref#",
                "type": "text",
                "col": 4
            },
            {
                "sectionName": "Employment Information",
                "labelName": {
                    "defaultValue": "Joining Date",
                    "alias": "Joining Date"
                },
                "type": "date",
                "col": 4
            },
            {
                "sectionName": "Employment Information",
                "labelName": {
                    "defaultValue": "Employee Contract",
                    "alias": "Employee Contract"
                },
                "placeholder": "Enter Employee Contract",
                "type": "text",
                "col": 4
            },
            {
                "sectionName": "Employment Information",
                "labelName": {
                    "defaultValue": "Work Calendar",
                    "alias": "Work Calendar"
                },
                "placeholder": "Enter Work Calendar",
                "type": "text",
                "col": 4
            }
        ]
    }
]

const employeeInfo: DetailsCardMeta[] = [
    {
        "name": "Overtime Information",
        "isCollapse": true,
        "isRowWise": false,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "Employee",
                    "alias": "Employee"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Overtime Amount",
                    "alias": "Overtime Amount"
                },
                "type": "number"
            },
            {
                "labelName": {
                    "defaultValue": "Date",
                    "alias": "Date"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Status",
                    "alias": "Status"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Days",
                    "alias": "Days"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Attendance",
                    "alias": "Attendance"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Component",
                    "alias": "Component"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Approval",
                    "alias": "Approval"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Overtime Hour",
                    "alias": "Overtime Hour"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Batch",
                    "alias": "Batch"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Overtime Rate",
                    "alias": "Overtime Rate"
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
        ],
        "data": [
            {
                "Employee": "Karina Clark",
                "Overtime Amount": "AED 2500",
                "Date": "10/04/2023",
                "Status": "Approved",
                "Days": "Holiday",
                "Attendance": "Present",
                "Component": "Annual Bonus",
                "Approval": "Approved",
                "Overtime Hour": "2",
                "Batch": "23232",
                "Overtime Rate": "500"
            }
        ]
    },
    {
        "name": "System Information",
        "isCollapse": true,
        "isRowWise": false,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "Creation Date",
                    "alias": "Creation Date"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Last Modified",
                    "alias": "Last Modified"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Inactive",
                    "alias": "Inactive"
                },
                "type": "text"
            }
        ],
        "data": [
            {
                "Creation Date": "6/5/22 11:53 AM",
                "Last Modified": "13/6/22 12:58 PM",
                "Inactive": ""
            }
        ]
    }
];

const Payroll: DetailsCardMeta[] = [
    {
        "name": "Payroll Setup",
        "isCollapse": true,
        "isRowWise": false,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "Contribution",
                    "alias": "Contribution"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Overtime Eligiblity",
                    "alias": "Overtime Eligiblity"
                },
                "type": "date"
            },
            {
                "labelName": {
                    "defaultValue": "Payroll Cycle",
                    "alias": "Payroll Cycle"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Air Ticket Eligiblity",
                    "alias": "Air Ticket Eligiblity"
                },
                "type": "text"
            },

        ],
        "data": [
            {
                "Contribution": "12%",
                "Overtime Eligiblity": "Yes",
                "Payroll Cycle": "Fixed 30 Days",
                "Air Ticket Eligiblity": "Yes",
            }
        ]
    },
    {
        "name": "Expense Management",
        "isCollapse": true,
        "isRowWise": false,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "Expense Limit",
                    "alias": "Expense Limit"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Expense Approval Limit",
                    "alias": "Expense Approval Limit"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Expense Approver",
                    "alias": "Expense Approver"
                },
                "type": "text"
            },
        ],
        "data": [
            {
                "Expense Limit": "AED",
                "Expense Approval Limit": "60",
                "Expense Approver": "Aman",
            }
        ]
    },
    {
        "name": "Provision",
        "isCollapse": true,
        "isRowWise": false,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "Next Gratuity Provision Date",
                    "alias": "Next Gratuity Provision Date"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Air Ticket Provision Amount",
                    "alias": "Air Ticket Provision Amount"
                },
                "type": "number"
            },
            {
                "labelName": {
                    "defaultValue": "Last Gratuity Provision Id",
                    "alias": "Last Gratuity Provision Id"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Last Gratuity Amount",
                    "alias": "Last Gratuity Amount"
                },
                "type": "number"
            },
            {
                "labelName": {
                    "defaultValue": "Last Gratuity Provision Date",
                    "alias": "Last Gratuity Provision Date"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Last Gratuity Status",
                    "alias": "Last Gratuity Status"
                },
                "type": "text"
            },


        ],
        "data": [
            {
                "Next Gratuity Provision Date": "01/2/2022",
                "Air Ticket Provision Amount": "500",
                "Last Gratuity Provision Id": "60",
                "Last Gratuity Amount": "500",
                "Last Gratuity Provision Date": "30/10/2022",
                "Last Gratuity Status": "Credited",
            }
        ]
    }
];


const Leave: DetailsCardMeta[] = [
    {
        "name": "Leave Details",
        "isCollapse": true,
        "isRowWise": false,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "Leave From",
                    "alias": "Leave From"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Leave Status",
                    "alias": "Leave Status"
                },
                "type": "date"
            },
            {
                "labelName": {
                    "defaultValue": "Leave To",
                    "alias": "Leave To"
                },
                "type": "text"
            },


        ],
        "data": [
            {
                "Leave From ": "4/4/2022",
                "Leave Status": "Approved",
                "Leave To": "1/5/2022",
            }
        ]
    },
    {
        "name": "Leave Setup",
        "isCollapse": true,
        "isRowWise": false,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "Leave Plan",
                    "alias": "Leave Plan"
                },
                "type": "text"
            },

        ],
        "data": [
            {
                "Leave Plan": "Annual Leave",
            }
        ]
    },
    {
        "name": "Provision",
        "isCollapse": true,
        "isRowWise": false,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "Leave Provision Amount",
                    "alias": "Leave Provision Amount"
                },
                "type": "number"
            },


        ],
        "data": [
            {
                "Leave Provision Amount": "200",
            }
        ]
    }
];

const Credentials: DetailsCardMeta[] = [
    {
        "name": "Credentials",
        "isCollapse": true,
        "isRowWise": false,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "Residence Unique ID",
                    "alias": "Residence Unique ID"
                },
                "type": "text"
            },



        ],
        "data": [
            {
                "Residence Unique ID ": "1235",
            }
        ]
    },

];

const employeeCardMetaData={
    name:"",
    logo:"",
    labels:[
        {
            labelName:{
                defaultValue:"employeeId",
                alias:"employeeId"
            }
        },
        {
            labelName:{
                defaultValue:"designation",
                alias:"designation"
            }
        },
        {
            labelName:{
                defaultValue:"department",
                alias:"department"
            }
        },

    ]
  }



export { Credentials, Leave, Payroll, employeeCardMetaData, employeeFormData, employeeInfo, formSections, overviewCard, wizardTabs };


