import { DetailsCardMeta, TableData, TrazepoidTabsMeta } from "src/app/shared/meta-interface";

const cardMetaData={
    name:"",
    logo:"",
    labels:[
        {
            labelName:{
                defaultValue:"payrollStartDate",
                alias:"payslipStartDate"
            }
        },
        {
            labelName:{
                defaultValue:"payrollEndDate",
                alias:"payslipEndDate"
            }
        },
        {
            labelName:{
                defaultValue:"payrollReference",
                alias:"payrollReferenceId"
            }
        },
    ]
  }

  const tabsMeta: TrazepoidTabsMeta []= [
    {
      label: "systemNotes", // table name in Database
      tabIndex: 0,
    },
  ]

  const tableMetaData:TableData={
    isActionColumn: true,
    imageColumn: 'employee',
    columns:[
      {
        name: "employee",
        type:"employee",
      },
      {
          name: "employeePercentage",
      },
      {
          name: "employeeAmount",
      },
      {
          name: "employerPercentage",
      },
      {
          name: "employerAmount",
      },
      // {
      //   name: "contributionType",
      // },
      // {
      //   name: "payslipStartDate",
      // },
      // {
      //   name: "payslipEndDate",
      // },
      // {
      //   name: "payrollReferenceId"
      // },
      {
        name: "payrollStatus",
        type: "payrollStatus"
      }
    ]
  }

  const detailsCardList: DetailsCardMeta[] = [
    {
      "name": "Contribution Summary Details",
      "isCollapse": true,
      "isRowWise": false,
      "labels": [
        {
          "labelName": {
            "defaultValue": "employee",
            "alias": "",
          },
          "type": "employee",
        },
        {
          "labelName": {
            "defaultValue": "contributionType",
            "alias": "contributionType",
          },
          "type": "text",
        },
        {
          "labelName": {
            "defaultValue": "payrollReferenceID",
            "alias": "payrollReferenceId",
          },
          "type": "text",
        },
        {
          "labelName": {
            "defaultValue": "payrollStatus",
            "alias": "status",
          },
          "type": "text",
        },
        {
          "labelName": {
            "defaultValue": "employeePercentage",
            "alias": "contributionPercentage",
          },
          "type": "text",
        },
        {
          "labelName": {
            "defaultValue": "employerPercentage",
            "alias": "contributionPercentage",
          },
          "type": "text",
        }
      ]
    },
  ]
  export { cardMetaData, detailsCardList, tableMetaData, tabsMeta };
