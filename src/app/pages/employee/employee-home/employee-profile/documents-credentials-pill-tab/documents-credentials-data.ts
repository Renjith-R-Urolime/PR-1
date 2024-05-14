

const uploadDocumentFormData = {
    "tabName": "uploadDocument",
    "formName": "uploadDocumentForm",
    "labels": [
        {
            "sectionName": "Documents",
            "labelName": {
                "defaultValue": "documentTypeId",
                "alias": "documentType"
            },
            "placeholder": "Select Document Type",
            "type": "documentType",
            "col": 8,
            "apiLink": "core-hr/employee/settings/document-type",
            "multiple": false,

        },
        {
            "sectionName": "Documents",
            "labelName": {
                "defaultValue": "documentName",
                "alias": "documentName"
            },
            "placeholder": "Enter Document Name",
            "type": "text",
            "col": 8,
        },
        {
            "sectionName": "Documents",
            "labelName": {
                "defaultValue": "browse",
                "alias": "browse"
            },
            "type": "file",
            "col": 8,
        },

        {
            sectionName: "Documents",
            labelName: {
              defaultValue: "trackingApplication",
              alias: "Tracking Application"
            },
            type: "checkbox",
          },
        {
            "sectionName": "Documents",
            "labelName": {
                "defaultValue": "credentialNumber",
                "alias": "credentialNumber"
            },
            "placeholder": "Enter Credential Number",
            "type": "text",
            "col": 8,
        },
        {
            "sectionName": "Documents",
            "labelName": {
                "defaultValue": "issueDate",
                "alias": "issueDate"
            },
            "type": "date",
            "col": 8,
        },
        {
            "sectionName": "Documents",
            "labelName": {
                "defaultValue": "expiryDate",
                "alias": "expiryDate"
            },
            "type": "date",
            "col": 8,
        },
        {
            "sectionName": "Documents",
            "labelName": {
                "defaultValue": "placeOfIssue",
                "alias": "placeOfIssue"
            },
            "placeholder": "Enter Place of Issue",
            "type": "text",
            "col": 8,
        },
        {
            "sectionName": "Documents",
            "labelName": {
                "defaultValue": "issueAuthority",
                "alias": "issueAuthority"
            },
            "placeholder": "Enter Issue Authority",
            "type": "text",
            "col": 8,
        },
        {
            "sectionName": "Documents",
            "labelName": {
                "defaultValue": "country",
                "alias": "country"
            },
            "placeholder": "Enter country",
            "type": "country",
            "col": 8,
            "multiple": false,
            "jsonListName": 'country',
        },
        {
            "sectionName": "Documents",
            "labelName": {
                "defaultValue": "documentPath",
                "alias": "documentPath"
            },
            "placeholder": "Enter Issue Authority",
            "type": "pathArray",
            "col": 8,
        },
    ]
}



const documentChartColorMeta=[
    {
        baseColor:'#FF0000',
        lightColor:'#EDEDF9',
        borderColor:'#FFCCCC solid 0.5px',
        iconBackground:'#FFCCCC'
    },
    {
        baseColor:'#FF9900',
        lightColor:'#EDEDF9',
        borderColor:'#FFEBCC solid 0.5px',
        iconBackground:'#FFEBCC'
    },
    {
        baseColor:'#FCDA8D',
        lightColor:'#EDEDF9',
        borderColor:'#FCEDCA solid 0.5px',
        iconBackground:'#FCEDCA'

    },
    {
        baseColor:'#99CC01',
        lightColor:'#EDEDF9',
        borderColor:'#ECFFB2 solid 0.5px',
        iconBackground:'#ECFFB2'

    },
]


export {
    uploadDocumentFormData,documentChartColorMeta
}