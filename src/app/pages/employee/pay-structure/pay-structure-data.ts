import { Validators } from "@angular/forms"
import { DetailsCardMeta, FormMeta, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form"


const formSections: Sections = [

    {
        "tabName": "Pay Structure",
        "sectionName": "Pay Structure Information",
        "sectionDescription": "Enter Pay Structure Information"
    }

]
const payStructureFormData : FormMeta = {
  tabName: "Pay Structure",
  formName: "payStructureForm",
  labels: [
    {
      sectionName: "Pay Structure Information",
      labelName: {
        defaultValue: "name",
        alias: "name",
      },
      placeholder: "Enter Name",
      type: "text",
      required: true,
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Name Required",
        },
      ],
    },
    {
      sectionName: "Pay Structure Information",
      labelName: {
        defaultValue: "subsidiary",
        alias: "subsidiary",
      },
      type: "dropdown",
      placeholder: "Select subsidiary",
      col: 4,
      apiLink: "core-hr/organisation/subsidiary",
      multiple: true,
    },
    {
      sectionName: "Pay Structure Information",
      labelName: {
        defaultValue: "jurisdiction",
        alias: "jurisdiction",
      },
      type: "dropdown",
      placeholder: "Select Jurisdiction",
      col: 4,
      apiLink: "core-hr/organisation/jurisdiction",
      multiple: true,
    },
    {
      sectionName: "Pay Structure Information",
      labelName: {
        defaultValue: "location",
        alias: "location",
      },
      type: "dropdown",
      apiLink: "core-hr/organisation/location",
      placeholder: "Select location",
      col: 4,
      multiple: true,
    },
    {
      sectionName: "Pay Structure Information",
      labelName: {
        defaultValue: "department",
        alias: "department",
      },
      apiLink: "core-hr/organisation/department",
      type: "dropdown",
      placeholder: "Select department",
      col: 4,
      multiple: true,
    },
    {
      sectionName: "Pay Structure Information",
      labelName: {
        defaultValue: "class",
        alias: "class",
      },
      apiLink: "core-hr/organisation/class",
      type: "dropdown",
      placeholder: "Select class",
      col: 4,
      multiple: true,
    },
  ],
};
const tableFormData = {
    "tabName": "Pay Structure",
    "formName": "payStructureForm",
    "labels": [
        {
            "sectionName": "Pay Structure Information",
            "labelName": {
                "defaultValue": "gradeId",
                "alias": "grade"
            },
            "placeholder": "Select grade",
            "type": "grade",
            "apiLink":"core-hr/employee/settings/grade",
            "multiple":false
        },
        {
          "sectionName": "Pay Structure Information",
          "labelName": {
              "defaultValue": "designationId",
              "alias": "designation"
          },
          "placeholder": "Select designation",
          "type": "designation",
          "apiLink":"core-hr/employee/settings/designation",
          "multiple":false
      },
      {
        "sectionName": "Pay Structure Information",
        "labelName": {
            "defaultValue": "minimum",
            "alias": "minimum"
        },
        "placeholder": "Enter minimum",
        "type": "text"
    },
    {
      "sectionName": "Pay Structure Information",
      "labelName": {
          "defaultValue": "maximum",
          "alias": "maximum"
      },
      "placeholder": "Enter maximum",
      "type": "text"
  },
  {
    "sectionName": "Pay Structure Information",
    "labelName": {
        "defaultValue": "salaryAllocation",
        "alias": "salaryAllocation"
    },
    "placeholder": "Select Salary Allocation",
    "type": "salaryAllocation",
    "multiple":false,
    "jsonListName": 'salaryAllocation',
}
      ]
}
const detailsCardMeta: DetailsCardMeta[] = [
  {
    "name": "Pay Structure Information",
    "isCollapse": true,
    "labels": [
      {
        "labelName": {
          "defaultValue": "name",
          "alias": "name"
        },
        "type": "text"
      },
      {
        "labelName": {
          "defaultValue": "subsidiary",
          "alias": "subsidiary"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "jurisdiction",
          "alias": "jurisdiction"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "location",
          "alias": "location"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "department",
          "alias": "department"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "class",
          "alias": "class"
        },
        "type": "text",
      }
    ]
  }
];
const tabsMeta: TrazepoidTabsMeta []= [
  {
    label: "payStructureDetails", // table name in Database
    tabIndex: 0,
    tableData:{
      isActionColumn: true,
      imageColumn: 'abc',
      columns:[
        {
          name: "grade",
        },
        {
          name: "designation",
        },
        {
          name: "minimum",
        },
        {
          name: "maximum",
        },
        {
          name: "salaryAllocation"
        },
        {
          name: "componentDetails",
          custom: true,
          template: 'componentDetails_temp'
        }
      ]
    }
  } ,
  {
    label: "systemNotes",
    tabIndex: 1,
  }
]
const cardMetaData={
  name:"",
  logo:"",
  labels:[
      {
          labelName:{
              defaultValue:"location",
              alias:"location"
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
export { cardMetaData, detailsCardMeta, formSections, payStructureFormData, tableFormData, tabsMeta };

