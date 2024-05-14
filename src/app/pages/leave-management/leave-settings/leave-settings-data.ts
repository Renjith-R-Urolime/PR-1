import { Validators } from "@angular/forms";

// Create- Edit Form
const leaveSettingFormData =
  {
    "apiUrl":"leave/settings",
    "labels": [
      {
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
 
  const CardMetaData={
    name:"",
    logo:"",
    labels:[
        {
            labelName:{
                defaultValue:"status",
                alias:"Status"
            }
        },
        {
            labelName:{
                defaultValue:"createdAt",
                alias:"Created Date"
            }
        }
    ]
  }


  export { CardMetaData, leaveSettingFormData };

