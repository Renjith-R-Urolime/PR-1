import { Validators } from "@angular/forms";
import { DetailsCardMeta, FormMeta, TableData } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";
// import { DetailsCardMeta } from "src/app/shared/ui/details-card/details-card";
const tableMetaData:TableData={
  isActionColumn: true,
  customAction: true,
  columns:[
    {
      name: "name",
    },
    {
      name: "roleType",
    },
    {
      name: "employeePermission",
    }
  ]
}

const formSections: Sections = [
  {
    "tabName": "Role & Permissions",
    "sectionName": "Role & Permissions Information",
  },
]

// Create- Edit Form
const rapFormMeta: FormMeta=
  {
    "tabName": "Role & Permissions",
    "sectionName": "Role & Permissions Information",
    "index": 1,
    "formName": "roleAndPermissionsForm",
    "labels": [
      {
        "sectionName": "Role & Permissions Information",
    "labelName": {
          "defaultValue": "name",
          "alias": "name"
        },
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
        "sectionName": "Role & Permissions Information",
        "labelName": {
          "defaultValue": "employeePermission",
          "alias": "employeePermission"
        },
        "type": "employeePermission",
        "multiple": false,
        "col":4,
        "required":false
      },
      {
        "sectionName": "Role & Permissions Information",
        "labelName": {
          "defaultValue": "subsidiary",
          "alias": "subsidiaryRestrictions"
        },
        "type": "subsidary",
        "multiple": true,
        "apiLink": "core-hr/organisation/subsidiary",
        "col":4,
        "required":false
      },
      {
        "sectionName": "Role & Permissions Information",
        "labelName": {
          "defaultValue": "jurisdiction",
          "alias": "jurisdictionRestrictions"
        },
        "type": "dropdown",
        "multiple": true,
        "apiLink": "core-hr/organisation/jurisdiction",
        "col":4,
        "required":false
      },
      {
        "sectionName": "Role & Permissions Information",
        "labelName": {
          "defaultValue": "department",
          "alias": "departmentRestrictions"
        },
        "type": "dropdown",
        "multiple": true,
        "apiLink": "core-hr/organisation/department",
        "col":4,
        "required":false
      },
      {
        "sectionName": "Role & Permissions Information",
        "labelName": {
          "defaultValue": "location",
          "alias": "locationRestrictions"
        },
        "type": "dropdown",
        "multiple": true,
        "apiLink": "core-hr/organisation/location",
        "col":4,
        "required":false
      },
      {
        "sectionName": "Role & Permissions Information",
        "labelName": {
          "defaultValue": "class",
          "alias": "classRestrictions"
        },
        "type": "dropdown",
        "multiple": true,
        "apiLink": "core-hr/organisation/class",
        "col":4,
        "required":false
      },
      {
        "sectionName": "Role & Permissions Information",
        "labelName": {
          "defaultValue": "roleType",
          "alias": "roleType"
        },
        "type": "text",
        "multiple": false,
        "disable": true,
        "col":4,
        "required":false
      },
      {
        "sectionName": "Role & Permissions Information",
        "labelName": {
          "defaultValue": "parentRoleId",
          "alias": "parentRole"
        },
        "type": "parentRole",
        "disable": true,
        "multiple": false,
        "col":4,
        "required":false,
        "apiLink": "setup/access/roles",
      },
    ]
  }


const roleType = [
  {
    "id":"1",
    "name":"Standard Role"
  },
  {
    "id":"2",
    "name":"Custom Role"
  }
]
// View Details Card
const detailsCardMeta: DetailsCardMeta[] = [
  {
    "name": "Roles & Permission Information",
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
          "defaultValue": "employeePermission",
          "alias": "employeePermission"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "subsidiary",
          "alias": "subsidiaryRestriction"
        },
        "type": "associatedEntity",
        "baseUrl": "/organisation/subsidiary"
      },
      {
        "labelName": {
          "defaultValue": "jurisdiction",
          "alias": "jurisdictionRestriction"
        },
        "type": "associatedEntity",
        "baseUrl": "/organisation/jurisdiction"
      },
      {
        "labelName": {
          "defaultValue": "department",
          "alias": "departmentRestriction"
        },
        "type": "associatedEntity",
        "baseUrl": "/organisation/department"
      },
      {
        "labelName": {
          "defaultValue": "location",
          "alias": "locationRestriction"
        },
        "type": "associatedEntity",
        "baseUrl": "/organisation/location"
      },
      {
        "labelName": {
          "defaultValue": "class",
          "alias": "classRestriction"
        },
        "type": "associatedEntity",
        "baseUrl": "/organisation/class"
      },
      {
        "labelName": {
          "defaultValue": "roleType",
          "alias": "roleType"
        },
        "type": "text",
      },
      {
        "labelName": {
          "defaultValue": "parentRole",
          "alias": "parentRole"
        },
        "type": "associatedEntity",
        "baseUrl": "/setup-and-configuaration/roles-and-permissions"
      }
    ]
  }
];
export { detailsCardMeta, formSections, rapFormMeta, roleType, tableMetaData };

