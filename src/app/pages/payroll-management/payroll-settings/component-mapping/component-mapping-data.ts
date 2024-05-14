import { Validators } from "@angular/forms";
import { DetailsCardMeta, FormMeta, TrazepoidTabsMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";

const componentMappingFormData: FormMeta =
{
    "tabName": "Component Mapping",
    "formName": "componentMappingForm",
    "labels": [
        {
            "sectionName": "Component Mapping Information",
            "labelName": {
                "defaultValue": "transactionType",
                "alias": "transactionType"
            },
            "placeholder": "Select Transaction Type",
            "jsonListName": "transactionType",
            "fetchCondition": ["id=1,2,7,8"],
            "type": "transactionType",
            "col": 4,
            "required": true,
            "validations": [
                {
                    name: "required",
                    validator: Validators.required,
                    message: "Name Required"
                }
            ]
        },
        {
            "sectionName": "Component Mapping Information",
            "labelName": {
                "defaultValue": "earningComponentId",
                "alias": "earningComponent"
            },
            "placeholder": "Select Earning Component",
            "type": "component",
            "apiLink": "payroll/setup/component",
            "fetchCondition": ["type=2", "subType=4", "payrollItem=1"],
            "multiple": false,
            "hide":false
        },
        {
            "sectionName": "Component Mapping Information",
            "labelName": {
                "defaultValue": "deductionComponentId",
                "alias": "deductionComponent"
            },
            "placeholder": "Select Deduction Component",
            "type": "component",
            "apiLink": "payroll/setup/component",
            "fetchCondition": ["type=2", "subType=4", "payrollItem=2"],
            "multiple": false,
        }
    ]
}
const formSections: Sections = [

    {
        "tabName": "Component Mapping",

        "sectionName": "Component Mapping Information",
        "sectionDescription": "Enter Component Mapping Details"
    }

]
const cardMetaData = {
    name: "",
    logo: "",
    labels: [
      {
        labelName: {
          defaultValue: "transactionType",
          alias: "transactionType"
        }
      },
      {
        labelName: {
          defaultValue: "earningComponent",
          alias: "earningComponent"
        }
      },
      {
        labelName: {
          defaultValue: "deductionComponent",
          alias: "deductionComponent"
        }
      },
    ]
  }
const detailsCardList: DetailsCardMeta[] = [{
    "name": "Component Mapping Information",
    "isCollapse": true,
    "isRowWise": false,


    "labels": [
        {
            "labelName": {
                "defaultValue": "transactionType",
                "alias": "transactionType"
            },
            "type": "text"
        },
        {
            "labelName": {
                "defaultValue": "earningComponent",
                "alias": "earningComponent"
            },
            "type": "text"
        },
        {
            "labelName": {
                "defaultValue": "deductionComponent",
                "alias": "deductionComponent"
            },
            "type": "text"
        },

    ],
    "data": []
}



]
const tabsMeta: TrazepoidTabsMeta[] = [
    {
        label: "systemNotes", // table name in Database
        tabIndex: 0,
    }
]
export { componentMappingFormData, detailsCardList, formSections, tabsMeta,cardMetaData };

