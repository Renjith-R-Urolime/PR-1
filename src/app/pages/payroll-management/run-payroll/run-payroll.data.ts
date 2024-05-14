import { ResponseFilterMeta, TableData } from "src/app/shared/meta-interface";
import { WizardTabs } from "src/app/shared/ui/wizard-tabs/wizard-tabs";
// import { payrollInfoData } from "../../../../app/pages/payroll-management/run-payroll";
// type payrollInfoData={
//     payrollTitle: string,
//     payrollInfo: string
// }

const wizardTabs: WizardTabs = [
    {

        label: "Employee Select",
        number: 1,
        tabIndex: 0,
    },
    {
        label: "Preview Components",
        number: 2,
        tabIndex: 1,
    },
    // {
    //     label: "Review & Submit",
    //     number: 3,
    //     tabIndex: 2,
    // }
]
type EmployeePayrollInfoData = {
    step?: number;
    tabName?: string;
    data: {
        payrollTitle: string;
        payrollInfo: string;
    }[];

};

type PayrollTableData = {
    step?: number;
    headers: string[];
    data: {
        id: number;
        name: string;
        employeeId: string;
        grossSalary?: string;
        type?: string;
        img?: string;
        designation: string;
        from?: string;
        to?: string;

        lastPayrollDetails: string;
        components?: string[];
        otherComponents?: string[];
        salaryDist?: string[];
        salaryDetails?: {}
    }[];
};

const payrollTableData: PayrollTableData[] = [
    {
        step: 1,
        headers: [
            "Employee",
            "Days To Pay",
            "User Subsidiary",
            "Sponser Subsidiary",
            "Payment Method",
            "From",
            "To",
            "Gross Salary",
        ],
        data: []
    },
    {
        step: 2,
        headers: [
            "Employee",
            "Days To Pay",
            "User Subsidiary",
            "Sponser Subsidiary",
            "Payment Method",
            "Components",
            "Gross Salary",
        ],
        data: []
    },
];
const oneTimeTableData: PayrollTableData[] = [
    {
        step: 1,
        headers: [
            "Employee",
            "User Subsidiary",
            "Sponser Subsidiary",
            "Payment Method",
        ],
        data: []
    },
    {
        step: 2,
        headers: [
            "Employee",
            "User Subsidiary",
            "Sponser Subsidiary",
            "Payment Method",
            "Components",
            "Total Amount",
        ],
        data: []
    },
];
const allReportsData: any = [
    {
        id: 1,
        checkbox: true,
        icon: './assets/media/svg/payroll/payroll-report-icon.svg',
        text: 'Payroll Report',
        button1Text: 'Preview Report',
        button2Text: 'Download',
    },
    {
        id: 2,
        checkbox: true,
        icon: './assets/media/svg/payroll/comparison-report.svg',
        text: 'Payroll Comparision Report',
        button1Text: 'Preview Report',
        button2Text: 'Download',
    },

    {
        id: 3,
        checkbox: true,
        icon: './assets/media/svg/payroll/wps_report.svg',
        text: 'WPS Report',
        button1Text: 'Preview Report',
        button2Text: 'Download',
    },
    {
        id: 4,
        checkbox: true,
        icon: './assets/media/svg/payroll/non-wps-report-icon.svg',
        text: 'Non WPS Report',
        button1Text: 'Preview Report',
        button2Text: 'Download',
    }
    // Add data for other columns...
];

const tableMetaData: TableData = {
    isActionColumn: true,
    columns: [
        {
            name: "payRun",

        },

        {
            name: "approvedDate",

        },
        {
            name: "employeeCount"
        },
        {
            name: "status",
            type: "payrollStatus"
        },
        {
            name: "type",

        },
    ]
}

const tableMetaData2: TableData = {
    isActionColumn: false,
    // customAction:true,
    redirectUrl: "/payroll-management/generate/payslip",
    columns: [
        // {
        //     name: "SNo.",
        //     custom: true
        // },
        {
            name: "employee",
            type: "employee"
        },
        {
            name: "paidDays",
        },
        {
            name: "userSubsidiary"
        },
        {
            name: "sponserSubsidiary"
        },
        {
            name: "paymentMethod"
        },
        {
            name: "Print",
            custom: true
        }
    ]
}
const employeeFilterMeta: ResponseFilterMeta =

{
    "labels": [
        {
            "sectionName": "Employee filter",
            "labelName": {
                "defaultValue": "country",
                "alias": "Country",
                "customQueryParamsName":"currency"

            },
            "apiLink": "core-hr/organisation/subsidiary/countries?currency=true",
            "multiple": false,
            "required": true
        },
        {
            "sectionName": "Employee filter",
            "labelName": {
                "defaultValue": "payrollCycleId",
                "alias": "Payroll Cycle",
            },
            "apiLink": "payroll/setup/cycle",
            "multiple": true,
        },
        {
            "sectionName": "Employee filter",
            "labelName": {
                "defaultValue": "subsidiaryId",
                "alias": "Subsidiary"
            },
            "apiLink": "core-hr/organisation/subsidiary",
            "multiple": true,
        },
        {
            "sectionName": "Employee filter",
            "labelName": {
                "defaultValue": "jurisdictionId",
                "alias": "Jurisdiction"
            },
            "apiLink": "core-hr/organisation/jurisdiction",
            "multiple": true,
        },
        {
            "sectionName": "Employee filter",
            "labelName": {
                "defaultValue": "locationId",
                "alias": "Location"
            },
            "apiLink": "core-hr/organisation/location",
            "multiple": true,
        },
        {
            "sectionName": "Employee filter",
            "labelName": {
                "defaultValue": "departmentId",
                "alias": "Department"
            },
            "apiLink": "core-hr/organisation/department",
            "multiple": true,
        },
        {
            "sectionName": "Employee filter",
            "labelName": {
                "defaultValue": "classId",
                "alias": "Class"
            },
            "apiLink": "core-hr/organisation/class",
            "multiple": true,
        },
        {
            "sectionName": "Employee filter",
            "labelName": {
                "defaultValue": "paymentMethodId",
                "alias": "Payment Method"
            },
            "apiLink": "core-hr/employee/settings/payment-method",
            "multiple": true,
        },
        {
            "sectionName": "Employee filter",
            "labelName": {
                "defaultValue": "month",
                "alias": "Month"
            },
            "jsonListName": "month",
            "multiple": false,
            "required": true
        },
        {
            "sectionName": "Employee filter",
            "labelName": {
                "defaultValue": "year",
                "alias": "Year"
            },
            "jsonListName": "year",
            "multiple": false,
            "required": true
        }
    ]
}

type PayrollCardData = {
    title: string;
    description: string;
    iconSrc: string;
    type:string;
  };

  const payrollCardData: PayrollCardData[] = [
    // {
    //   title: 'Regular Payroll',
    //   description: 'Runing Payroll normallly',
    //   iconSrc: './assets/media/icons/gift-outline.svg',
    // },
    {
      title: 'One Time Payroll',
      description: 'Run a Payroll Outside of your regular pay schedule.',
      iconSrc: './assets/media/icons/cash-outline.svg',
      type:'one-time'
    },
    {
      title: 'Advance Vacation Payroll',
      description: 'Employees receive payment for accrued vacation time.',
      iconSrc: './assets/media/icons/sync-outline.svg',
      type:'advance-vacation'
    },
    {
      title: 'Full & Final Settlement',
      description: 'This payroll will appear after an employee has Resigned or got Terminated.',
      iconSrc: './assets/media/icons/log-out-outline.svg',
      type:'full-and-final'
    },
    // {
    //   title: 'Handle entire time cycle',
    //   description: 'Handles all aspects of time-related processes.',
    //   iconSrc: './assets/media/icons/timer-outline.svg',
    // },
    // {
    //   title: 'Benefit Adjustments',
    //   description: 'Adjust or correct benefits for previous payrolls.',
    //   iconSrc: './assets/media/icons/build-outline.svg',
    // },
  ];



export { allReportsData, employeeFilterMeta, oneTimeTableData, payrollCardData, payrollTableData, tableMetaData, tableMetaData2, wizardTabs };

