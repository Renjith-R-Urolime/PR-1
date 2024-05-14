import { Validators } from "@angular/forms";
import { DetailsCardMeta, TrazepoidTabsMeta } from "src/app/shared/meta-interface";




  const eosSubTypeCardMetaData={
    name:"",
    logo:"",
    labels:[
      {
          labelName:{
              defaultValue:"inactive",
              alias:"Status"
          },
          type:"status"
      },
      {
          labelName:{
              defaultValue:"createdAt",
              alias:"Created Date"
          },
          type:"createdAt"
      }
  ]
  }


  const tableMetaData= {
    isActionColumn: true,
    // imageColumn: 'employee',
    columns:[
      {
        name: "name",
      },
      // {
      //   name: "status",
      // },
      {
        name: "createdAt",
        type:"createdAt"
      },
    ]
    ,

  }
  const employeeSettingFormData =
  {
    //"tabName": "Subsidiary",
    "apiUrl":"core-hr/employee/settings",
    "formName": "empSettingForm",
    "labels": [
      {
       // "sectionName": "Subsidiary Information",
       "labelName": {
        "defaultValue": "name",
        "alias": "name"
      },
      "placeholder": "Enter Name",
      "type": "text",
      "col":4,
      "required":true,
      "validations": [
        {
        name: "required",
        validator: Validators.required,
        message: "Name Required"
        }
      ]
      },
      {
        "labelName": {
         "defaultValue": "inactive",
         "alias": "inactive"
       },
       "placeholder": "",
       "type": "checkbox",
       "col":4
       }
    ]
  }
  export { eosSubTypeCardMetaData, tableMetaData ,employeeSettingFormData};
