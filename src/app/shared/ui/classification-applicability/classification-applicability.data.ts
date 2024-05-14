











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


export {classificationApplicabilityFormMeta}