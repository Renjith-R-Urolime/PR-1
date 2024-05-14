import { Validators } from "@angular/forms";
import {
  DetailsCardMeta,
  FormMeta,
  TableData,
  TrazepoidTabsMeta,
} from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";
import { format } from "date-fns";

const formSections: Sections = [
  {
    sectionName: "Leave Adjustment Information",
  },
];

const leaveAdjustmentCardMetaData = {
  name: "",
  logo: "",
  labels: [
    {
      labelName: {
        defaultValue: "leaveType",
        alias: "leaveType",
      },
    },
    {
      labelName: {
        defaultValue: "transactionDate",
        alias: "transactionDate",
      },
    },
    {
      labelName: {
        defaultValue: "transactionType",
        alias: "transactionType",
      },
    },
  ],
};

const tableMetaData: TableData = {
  isActionColumn: true,
  imageColumn: "employee",
  columns: [
    {
      name: "employee",
      type: "employee",
    },
    {
      name: "leaveType",
    },
    {
      name: "transactionDate",
    },
    {
      name: "transactionType",
    },
    {
      name: "transactionUnit",
    },
    {
      name: "status"
    }
  ],
};

const detailsCardList: DetailsCardMeta[] = [
  {
    name: "Leave Adjustment Information",
    isCollapse: true,
    isRowWise: false,
    labels: [
      {
        labelName: {
          defaultValue: "employee",
          alias: "",
        },
        type: "employee",
      },
      {
        labelName: {
          defaultValue: "leaveType",
          alias: "leaveType",
        },
        type: "text",
      },
      {
        labelName: {
          defaultValue: "transactionDate",
          alias: "transactionDate",
        },
        type: "date",
      },
      {
        labelName: {
          defaultValue: "transactionType",
          alias: "transactionType",
        },
        type: "text",
      },
      {
        labelName: {
          defaultValue: "transactionUnit",
          alias: "transactionUnit",
        },
        type: "text",
        hide:true
      },
      {
        labelName: {
          defaultValue: "hour",
          alias: "hour",
        },
        type: "text",
        hide:true
      },
      {
        labelName: {
          defaultValue: "startDate",
          alias: "startDate",
        },
        type: "date",
        hide:true
      },
      {
        labelName: {
          defaultValue: "endDate",
          alias: "endDate",
        },
        type: "date",
        hide:true
      },
      {
        labelName: {
          defaultValue: "days",
          alias: "days",
        },
        type: "text"
      },
      {
        labelName: {
          defaultValue: "remarks",
          alias: "remarks",
        },
        type: "text",
        hide:true
      },
      {
        labelName: {
          defaultValue: "attachment",
          alias: "attachment",
        },
        type: "file",
        hide:true
      },
      {
        labelName: {
          defaultValue: "status",
          alias: "transactionStatus",
        },
        type: "text",
      },
      {
        labelName: {
          defaultValue: "payrollStatus",
          alias: "payrollStatus",
        },
        type: "text",
      },
      {
        labelName: {
          defaultValue: "leaveID",
          alias: "leave ID",
        },
        type: "text",
      },

      {
        labelName: {
          defaultValue: "attendanceID",
          alias: "attendance ID",
        },
        type: "text",
      },
      {
        labelName: {
          defaultValue: "inactive",
          alias: "status",
        },
        type: "status",
      },
    ],
  },
];

const tabsMeta: TrazepoidTabsMeta[] = [
  {
    label: "approvalDetails", // table name in Database
    tabIndex: 0,
  },
  {
    label: "systemNotes", // table name in Database
    tabIndex: 1,
  },
];

const leaveAdjustmentFormData: FormMeta = {
  tabName: "leave Adjustment",
  formName: "leaveAdjustmentForm",
  labels: [
    {
      sectionName: "Leave Adjustment Information",
      labelName: {
        defaultValue: "employeeId",
        alias: "employee",
      },
      type: "employee",
      col: 4,
      // "apiLink":"core-hr/employee",
      apiLink: "core-hr/employee",
      scope: "leaveAdjustment",
      multiple: false,
      required: true,
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Employee Required",
        },
      ],
    },
    {
      sectionName: "Leave Adjustment Information",
      labelName: {
        defaultValue: "leaveTypeId",
        alias: "leaveType",
      },
      multiple: false,
      type: "leaveType",
      col: 4,
      placeholder: "Select Leave Type",
      required: true,
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Leave Type Required",
        },
      ],
    },
    {
      sectionName: "Leave Adjustment Information",
      labelName: {
        defaultValue: "transactionType",
        alias: "transactionType",
      },
      type: "transactionType",
      col: 4,
      placeholder: "Select Transaction Type",
      jsonListName: "leaveTransactionType",
      multiple: false,
      required: true,
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Transaction Type Required",
        },
      ],
    },
    {
      sectionName: "Leave Adjustment Information",
      labelName: {
        defaultValue: "transactionDate",
        alias: "transactionDate",
      },
      type: "date",
      col: 4,
      required: true,
      defaultValue: format(new Date(), "yyyy/MM/dd"),
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Transaction Date Required",
        },
      ],
    },
    {
      sectionName: "Leave Adjustment Information",
      labelName: {
        defaultValue: "transactionUnit",
        alias: "transactionUnit",
      },
      type: "transactionUnit",
      col: 4,
      placeholder: "Select Transaction Unit",
      jsonListName: "duration",
      required: false,
      hide: true,
      // validations: [
      //   {
      //     name: "required",
      //     validator: Validators.required,
      //     message: "Transaction Unit Required",
      //   },
      // ],
    },
    {
      sectionName: "Leave Adjustment Information",
      labelName: {
        defaultValue: "hour",
        alias: "hour",
      },
      type: "hour",
      placeholder: "HH:MM",
      col: 4,
      maxLength: 2,
      hide: true,
      required: false,
      // validations: [
      //   {
      //     name: "required",
      //     validator: Validators.required,
      //     message: "Hour Required",
      //   },
      // ],
    },
    {
      sectionName: "Leave Adjustment Information",
      labelName: {
        defaultValue: "startDate",
        alias: "startDate",
      },
      type: "date",
      hide: true,
      col: 4,
    },
    {
      sectionName: "Leave Adjustment Information",
      labelName: {
        defaultValue: "endDate",
        alias: "endDate",
      },
      type: "date",
      col: 4,
      hide: true,
      required: false,
      //   "validations": [
      //     {
      //       name: "required",
      //       validator: Validators.required,
      //       message: "End Date Required"
      //     }
      //   ]
    },
    {
      sectionName: "Leave Adjustment Information",
      labelName: {
        defaultValue: "days",
        alias: "days",
      },
      type: "number",
      col: 4,
      min: 0,
      max: 365,
      hide: false,
      required: true,
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Days Required",
        },
      ],
    },
    {
      sectionName: "Leave Adjustment Information",
      labelName: {
        defaultValue: "remarks",
        alias: "remarks",
      },
      type: "text",
      hide: true,
      maxLength: Infinity,
      col: 4,
      required: false,
      // "validations": [
      //   {
      //     name: "required",
      //     validator: Validators.required,
      //     message: "Remarks Required"
      //   }
      // ]
    },
    {
      sectionName: "Leave Adjustment Information",
      labelName: {
        defaultValue: "attachment",
        alias: "attachment",
      },
      type: "file",
      col: 4,
      hide: true,
      required: false,
      // "validations": [
      //   {
      //     name: "required",
      //     validator: Validators.required,
      //     message: "Attachment Required"
      //   }
      // ]
    },
  ],
};

export {
  detailsCardList,
  formSections,
  leaveAdjustmentCardMetaData,
  leaveAdjustmentFormData,
  tableMetaData,
  tabsMeta,
};
