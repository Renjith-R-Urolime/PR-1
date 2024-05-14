import { Validators } from "@angular/forms";
import { DetailsCardMeta, FormMeta, TableData, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";
import { WizardTabs } from "src/app/shared/ui/wizard-tabs/wizard-tabs";

// finalized
const announcementTableMetaData: TableData = {
  isActionColumn: true,
  columns: [
    {
      name: "name"
    },
    {
      name: "announcementStartDate"
    },
    {
      name: "announcementEndDate"
    },
    {
      name: "description"
    }
  ]
}


const announcementCardMeta = {
  name: "",
  logo: "",
  labels: [
    {
      labelName: {
        defaultValue: "announcementStartDate",
        alias: "startDate"
      }
    },
    {
      labelName: {
        defaultValue: "announcementEndDate",
        alias: "endDate"
      }
    }
  ]
}

const announcementwizardTabs: WizardTabs = [
  {
    label: "Announcement",
    number: 1,
    tabIndex: 0,
  },
  {
    label: "Channels",
    number: 2,
    tabIndex: 1,
  },
  {
    label: "Review",
    number: 3,
    tabIndex: 2,
  }
]


const announcementformSections: Sections = [

  {
    "tabName": "Announcement",
    "sectionName": "Announcement Information",
  }
]
const announcementFormData: FormMeta =
{
  "tabName": "Announcement",
  "formName": "announcementForm",
  "labels": [
    {
      "sectionName": "Announcement Information",
      "labelName": {
        "defaultValue": "name",
        "alias": "name"
      },
      "placeholder": "Enter Announcement Name",
      "type": "text",
      "col": 4,
      "required": true,
      "validations": [
        {
          name: "required",
          validator: Validators.required,
          message: "Announcement Name Required"
        }
      ]
    },
    {
      "sectionName": "Announcement Information",
      "labelName": {
        "defaultValue": "announcementStartDate",
        "alias": "announcementStartDate"
      },
      "placeholder": "dd/MM/yyyy",
      "type": "date",
      "col": 4
    },
    {
      "sectionName": "Announcement Information",
      "labelName": {
        "defaultValue": "announcementEndDate",
        "alias": "announcementEndDate"
      },
      "placeholder": "dd/MM/yyyy",
      "type": "date",
      "col": 4
    },
    {
      "sectionName": "Announcement Information",
      "labelName": {
        "defaultValue": "attachment",
        "alias": "attachment"
      },
      "type": "file",
      "col": 4
    },
    {
      "sectionName": "Announcement Information",
      "labelName": {
        "defaultValue": "classificationApplicability",
        "alias": "classificationApplicability"
      },
      "type": "classificationApplicability",
      "col": 4
    },
    {
      "sectionName": "Announcement Information",
      "labelName": {
        "defaultValue": "notifyEmail",
        "alias": "notifyUsersViaEmail"
      },
      "type": "toggle",
      "col": 4
    },
    {
      "sectionName": "Announcement Information",
      "labelName": {
        "defaultValue": "description",
        "alias": "description"
      },
      "type": "editor",
      "col": 12
    },
    {
      "sectionName": "Announcement Information",
      "labelName": {
        "defaultValue": "scheduleEmail",
        "alias": "scheduleFollowUpEmail"
      },
      "type": "toggle",
      "col": 12
    },
    {
      "sectionName": "Announcement Information",
      "labelName": {
        "defaultValue": "occurrence",
        "alias": "oneTime"
      },
      "type": "radio",
      "col": 2
    },
    {
      "sectionName": "Announcement Information",
      "labelName": {
        "defaultValue": "occurrence",
        "alias": "repeat"
      },
      "type": "radio",
      "col": 2
    },
    {
      "sectionName": "Announcement Information",
      "labelName": {
        "defaultValue": "dayFrequency",
        "alias": "every"
      },
      "type": "number",
      "col": 2,
      "hide": true
    },
    {
      "sectionName": "Announcement Information",
      "labelName": {
        "defaultValue": "time",
        "alias": "day@"
      },
      "type": "time",
      "col": 3,
      "hide": true
    },
    {
      "sectionName": "Announcement Information",
      "labelName": {
        "defaultValue": "isAcknowledgement",
        "alias": "acknowledgmentRequire"
      },
      "type": "toggle",
      "col": 4
    }
  ]
}

const classificationApplicabilityFormSections: Sections = [
  {
      "tabName": "Classification Applicability",
      "sectionName": "Classification Applicability",
      "sectionDescription": ""
  },
]

const classificationApplicabilityFormMeta = {
  "tabName": "Classification Applicability",
  "formName": "classificationApplicability",
  "labels": [
      {
          "sectionName": "Classification Applicability",
          "labelName": {
              "defaultValue": "country",
              "alias": "country"
          },
          "placeholder": "Select Country",
          "apiLink": "core-hr/organisation/subsidiary/countries",
          "col": 8,
          "multiple": false,
          "type": "country"
      },
      {
          "sectionName": "Classification Applicability",
          "labelName": {
              "defaultValue": "subsidiary",
              "alias": "subsidiary    "
          },
          "placeholder": "Select Subsidiary",
          "apiLink": "core-hr/organisation/subsidiary",
          "type": "subsidiary",
          "multiple": true,
          "col": 8,
      },
      {
          "sectionName": "Classification Applicability",
          "labelName": {
              "defaultValue": "jurisdiction",
              "alias": "jurisdiction    "
          },
          "placeholder": "Select Jurisdiction",
          "apiLink": "core-hr/organisation/jurisdiction",
          "type": "dropdown",
          "multiple": true,
          "col": 8,
      }, {
          "sectionName": "Classification Applicability",
          "labelName": {
              "defaultValue": "location",
              "alias": "location    "
          },
          "placeholder": "Select Location",
          "type": "dropdown",
          "apiLink": "core-hr/organisation/location",
          "multiple": true,
          "col": 8,
      }, {
          "sectionName": "Classification Applicability",
          "labelName": {
              "defaultValue": "department",
              "alias": "department    "
          },
          "placeholder": "Select Department",
          "type": "dropdown",
          "apiLink": "core-hr/organisation/department",
          "multiple": true,
          "col": 8,
      }, {
          "sectionName": "Classification Applicability",
          "labelName": {
              "defaultValue": "class",
              "alias": "class    "
          },
          "placeholder": "Select Class",
          "type": "dropdown",
          "apiLink": "core-hr/organisation/class",
          "multiple": true,
          "col": 8,
      }
  ]
}

const detailsCardList: DetailsCardMeta[] = [
  {
    "name": "Announcement Information",
    "isCollapse": true,
    "isRowWise": false,
    "labels": [
      {
        "labelName": {
          "defaultValue": "name",
          "alias": "name",
        },
        "type": "text",
        "col": 6,
        // "custom": false
      },
      {
        "labelName": {
          "defaultValue": "announcementStartDate",
          "alias": "announcementStartDate",
        },
        "type": "text",
        "col": 6,
        // "custom": false
      },
      {
        "labelName": {
          "defaultValue": "announcementEndDate",
          "alias": "announcementEndDate",
        },
        "type": "text",
        "col": 6,
        // "custom": false
      },
      {
        "labelName": {
          "defaultValue": "attachment",
          "alias": "attachment",
        },
        "col": 6,
        "type": "file",
      },
      {
        "labelName": {
          "defaultValue": "classificationApplicability",
          "alias": "classificationApplicability",
        },
        "type": "text",
        "col": 6,
        // "custom": false
      },
      {
        "labelName": {
          "defaultValue": "notifyEmail",
          "alias": "notifyUserViaEmail",
        },
        "type": "checkbox",
        "col": 6,
        "custom": false
      },
      {
        "labelName": {
          "defaultValue": "description",
          "alias": "description",
        },
        "type": "text",
        "col": 12,
        // "custom": false
      },
      {
        "labelName": {
          "defaultValue": "scheduleEmail",
          "alias": "scheduleFollowUpEmail",
        },
        "type": "checkbox",
        "col": 6,
        // "custom": false
      },
      {
        "labelName": {
          "defaultValue": "isAcknowledgement",
          "alias": "acknowledgementRequired",
        },
        "type": "checkbox",
        "col": 6,
        // "custom": false
      },
    ]
  },
]

const responseCardData: DetailsCardMeta[] = [
  {
    "name": "Summary Of Response",
    "isCollapse": true,
    "isRowWise": false,
    "labels": [
      {
        "labelName": {
          "defaultValue": "response",
          "alias": "",
        },
        "type": "text",
        "col": 12,
        "custom": true,
        "templateName": "customElement",
      },
      {
        "labelName": {
          "defaultValue": "createdOn",
          "alias": "createdOn",
        },
        "type": "text",
        "col": 6,
        // "custom": false
      },
      {
        "labelName": {
          "defaultValue": "acknowledged",
          "alias": "acknowledged  ",
        },
        "type": "text",
        "col": 6,
        // "custom": false
      },
          ]
  },
]

const tabsMeta: TrazepoidTabsMeta[] = [
  {
    label: "systemNotes", // table name in Database
    tabIndex: 1,
  },
]

export { announcementCardMeta, announcementFormData, announcementTableMetaData, announcementformSections, announcementwizardTabs, classificationApplicabilityFormMeta, classificationApplicabilityFormSections, detailsCardList, responseCardData, tabsMeta };

