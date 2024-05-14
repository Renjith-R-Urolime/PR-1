import { Validators } from "@angular/forms";
import { format } from "date-fns";
import { DetailsCardMeta, FormMeta, TableData, TrazepoidTabsMeta, ReportFilterMeta } from "src/app/shared/meta-interface";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";

const reportFilterMeta: ReportFilterMeta =
{
    "labels": [
        {
            "sectionName": "Report filter",
            "labelName": {
                "defaultValue": "subsidiaryId",
                "alias": "Subsidiary    "
            },
            "apiLink": "core-hr/organisation/subsidiary",
            "multiple": true,
        },
        {
            "sectionName": "Report filter",
            "labelName": {
                "defaultValue": "jurisdictionId",
                "alias": "Jurisdiction    "
            },
            "apiLink": "core-hr/organisation/jurisdiction",
            "multiple": true,
        }, {
            "sectionName": "Report filter",
            "labelName": {
                "defaultValue": "locationId",
                "alias": "Location    "
            },
            "apiLink": "core-hr/organisation/location",
            "multiple": true,
        }, {
            "sectionName": "Report filter",
            "labelName": {
                "defaultValue": "departmentId",
                "alias": "Department    "
            },
            "apiLink": "core-hr/organisation/department",
            "multiple": true,
        },
        {
            "sectionName": "Report filter",
            "labelName": {
                "defaultValue": "classId",
                "alias": "Class"
            },
            "apiLink": "core-hr/organisation/class",
            "multiple": true,
        },
        {
            "sectionName": "Report filter",
            "labelName": {
                "defaultValue": "fromDate",
                "alias": "From Date"
            },
            "jsonListName": "date",
            "type": "date",
            "defaultValue": "fromDate"
        },
        {
            "sectionName": "Report filter",
            "labelName": {
                "defaultValue": "toDate",
                "alias": "To Date"
            },
            "jsonListName": "date",
            "type": "date",
            "defaultValue": "toDate"
        },
        {
            "sectionName": "Report filter",
            "labelName": {
                "defaultValue": "month",
                "alias": "Month"
            },
            "placeholder": "Select month",
            "type": "month",
            "jsonListName": "month",
            "multiple": true
        },
        {
            "sectionName": "Report filter",
            "labelName": {
                "defaultValue": "year",
                "alias": "Year"
            },
            "placeholder": "Select year",
            "type": "year",
            "jsonListName": "year",
            "multiple": true
        },
    ]
}

export { reportFilterMeta };
