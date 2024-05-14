import { Validators } from "@angular/forms";

// Create- Edit Form
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
  const gradeFormData =
  {
    "apiUrl":"core-hr/employee/settings",
    "formName": "gradeForm",
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
         "defaultValue": "designation",
         "alias": "designation"
       },
       "placeholder": "Select Designation",
       "type": "designation",
       "col":4,
       "required":true,
       "multiple":true,
       "apiLink": "core-hr/employee/settings/designation",
       "validations": [
         {
         name: "required",
         validator: Validators.required,
         message: "Designation Required"
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
                defaultValue:"inactive",
                alias:"Status"
            },
            type:"status"
        },
        {
            labelName:{
                defaultValue:"createdAt",
                alias:"Created Date"
            }
        }
    ]
  }

  const gradeCardMetaData={
    name:"",
    logo:"",
    labels:[
        {
            labelName:{
                defaultValue:"inactive",
                alias:"status"
            },
            type:"status"
        },
        {
            labelName:{
                defaultValue:"createdAt",
                alias:"Created Date"
            }
        },
        {
          labelName:{
              defaultValue:"designation",
              alias:"Designation"
          }
      }
    ]
  }

  export { CardMetaData, employeeSettingFormData, gradeCardMetaData, gradeFormData };

