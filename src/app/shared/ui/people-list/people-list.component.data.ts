import { TrazepoidTabsMeta } from "../../meta-interface";
import { FieldConfig, Sections } from "../basic-form/basic-form";
import { DataTable } from "../data-table-list/data-table-list";
// import { TrazepoidTabsMeta } from "../tab-data-table/trapezoid-tabs";
import { WizardTabs } from "../wizard-tabs/wizard-tabs";


const manageEmployeeWizardTabs: WizardTabs = [
  {
    label: "Payroll",
    number: 1,
    tabIndex: 0,
  },
  {
    label: "Leave",
    number: 2,
    tabIndex: 1,
  },
  {
    label: "Review",
    number: 3,
    tabIndex: 2,
  }
]

const manageEmployeeFormSections: Sections = [

  {


    "tabName": "Details",
    "sectionName": "Updated Details",
    "sectionDescription": ""
  }




]

const manageEmployeeFormData: FieldConfig = [
  {
    "tabName": "Details",
    "formName": "detailsForm",
    "labels": [
      {
        "sectionName": "Updated Details",
        "labelName": {
          "defaultValue": "Effective Date",
          "alias": "Effective Date"
        },
        "type": "text"
      },


      {
        "sectionName": "Updated Details",
        "labelName": {
          "defaultValue": "Location",
          "alias": "Location"
        },
        "type": "text"
      },
      {
        "sectionName": "Updated Details",
        "labelName": {
          "defaultValue": "Department",
          "alias": "Department"
        },
        "type": "text"
      },
      {
        "sectionName": "Updated Details",
        "labelName": {
          "defaultValue": "Subsidiary",
          "alias": "Subsidiary"
        },
        "type": "text"
      },
      {
        "sectionName": "Updated Details",
        "labelName": {
          "defaultValue": "Status",
          "alias": "Status"
        },
        "type": "text"
      }




    ]
  }
]

const tabs: TrazepoidTabsMeta[] = [
  {
    label: "employeeDetails", // table name in Database
    tabIndex: 0,
  }

]

const trapezoidTabTableData: DataTable[] = [
  {
    "tableName": "employeeDetails",
    "headers": ["Employee", "Effective Date", "Previous Grade", "Previous Designation", "Previous Class", "Previous Department"],
    "collectionSize": 5,
    "data": [
      {
        "Employee": "Farhan",
        "Effective Date": "25/10/2023",
        "Previous Grade": "G2",
        "Previous Designation": "HR",
        "Previous Class": "Class",
        "Previous Department": "Human Resource"
      },
      {
        "Employee": "Sean Bean",
        "Effective Date": "25/10/2023",
        "Previous Grade": "G2",
        "Previous Designation": "HR",
        "Previous Class": "Class",
        "Previous Department": "Human Resource"
      },

    ]
  }]




export { manageEmployeeFormData, manageEmployeeFormSections, manageEmployeeWizardTabs, tabs, trapezoidTabTableData };

