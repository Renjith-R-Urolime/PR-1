import { DetailsCardMeta, TrazepoidTabsMeta } from "src/app/shared/meta-interface";

const detailsCardMeta: DetailsCardMeta[] = [
    {
      "name": "Payroll Intermediay Table",
      "isCollapse": true,
      "labels": [
        {
          "labelName": {
            "defaultValue": "employee",
            "alias": "employee"
          },
          "type": "employee",
        },
        {
          "labelName": {
            "defaultValue": "date",
            "alias": "date"
          },
          "type": "text"
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
            "defaultValue": "payrollType",
            "alias": "payrollType"
          },
          "type": "text",
        },
        {
          "labelName": {
            "defaultValue": "payrollTransactionType",
            "alias": "payrollTransactionType"
          },
          "type": "text",
        },
        {
          "labelName": {
            "defaultValue": "component",
            "alias": "component"
          },
          "type": "text",
        },
        {
          "labelName": {
            "defaultValue": "amount",
            "alias": "amount"
          },
          "type": "text",
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
            "defaultValue": "status",
            "alias": "status"
          },
          "type": "text",
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
            "defaultValue": "transactionReferenceID",
            "alias": "transactionReferenceID"
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
      ]
    }
  ];


  const tabsMeta: TrazepoidTabsMeta []= [
    {
      label: "systemNotes", // table name in Database
      tabIndex: 0,
    }
  ];

  const intermediaryTableCardMetaData={
    name:"",
    logo:"",
    rowHandle:"Description",
    labels:[
        {
            labelName:{
                defaultValue:"date",
                alias:"date"
            }
        },
        {
            labelName:{
                defaultValue:"type",
                alias:"type"
            }
        },
        {
            labelName:{
                defaultValue:"payrollType",
                alias:"payrollType"
            }
        },
    ]
  }


  const tableMetaData= {
    isActionColumn: true,
    imageColumn: 'employee',
    columns:[
      {
        name: "employee",
        type:"employee",
      },
      {
        name: "date",
      },
      {
        name: "type",
      },
      {
        name: "payrollTransactionType"
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
      }
    ]
    ,
    // data:[
    //   {
    //     employee:{id:1,firstName:"Varsha",lastName:"K"},
    //     date:"13/11/2023",
    //     type:"Advance Salary",
    //     payrollType:"Regular",
    //     payrollTransactionType:"Earnings"
    //   }
    // ]
  }
  export { detailsCardMeta, intermediaryTableCardMetaData, tableMetaData, tabsMeta };
