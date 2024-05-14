import { ResponseFilterMeta } from "../../meta-interface";

const filterMeta :ResponseFilterMeta =
{
    "labels": [
        {
            "sectionName": "Employee filter",
            "labelName": {
                "defaultValue": "subsidiaryId",
                "alias": "Subsidiary    "
            },
            "apiLink": "core-hr/organisation/subsidiary",
            "multiple": true,
        },
        {
            "sectionName": "Employee filter",
            "labelName": {
                "defaultValue": "jurisdictionId",
                "alias": "Jurisdiction    "
            },
            "apiLink": "core-hr/organisation/jurisdiction",
            "multiple": true,
        }, {
            "sectionName": "Employee filter",
            "labelName": {
                "defaultValue": "locationId",
                "alias": "Location    "
            },
            "apiLink": "core-hr/organisation/location",
            "multiple": true,
        }, {
            "sectionName": "Employee filter",
            "labelName": {
                "defaultValue": "departmentId",
                "alias": "Department    "
            },
            "apiLink": "core-hr/organisation/department",
            "multiple": true,
        }, {
            "sectionName": "Employee filter",
            "labelName": {
                "defaultValue": "classId",
                "alias": "Class"
            },
            "apiLink": "core-hr/organisation/class",
            "multiple": true,
        },
    ]
}
export { filterMeta }