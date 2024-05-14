import { DetailsCardMeta } from "src/app/shared/meta-interface";
import { FieldConfig, Sections } from "src/app/shared/ui/basic-form/basic-form";
import { DataTable } from "src/app/shared/ui/data-table-list/data-table-list";
import { WizardTabs } from "src/app/shared/ui/wizard-tabs/wizard-tabs";

const pollsSurveysTableData: DataTable = {
    "tableName": "Poll & Survey",
    "headers": ["ID", "Title", "Creation Date", "Posted Date", "Distribution Type", "Subtype"],
    "collectionSize": 5,
    "data": [
        {
            "ID": "703420114",
            "Title": "Benefits Enrollment",
            "Creation Date": "01/02/2023",
            "Posted Date": "01/02/2023",
            "Distribution Type": "Class",
            "Subtype": "97844829432",
        },
        {
            "ID": "703420114",
            "Title": "Company Policy",
            "Creation Date": "02/03/2023",
            "Posted Date": "02/03/2023",
            "Distribution Type": "Subsidiary",
            "Subtype": "42380489203",
        },
        {
            "ID": "703420114",
            "Title": "His(or Her) Excellency",
            "Creation Date": "03/04/2023",
            "Posted Date": "03/04/2023",
            "Distribution Type": "Department",
            "Subtype": "98743223431",
        },
        {
            "ID": "703420114",
            "Title": "N-Freight",
            "Creation Date": "24/12/2020",
            "Posted Date": "24/12/2020",
            "Distribution Type": "Group - Subordinates",
            "Subtype": "81831809138120",
        },
        {
            "ID": "703420114",
            "Title": "N-Freight",
            "Creation Date": "31/6/2022",
            "Posted Date": "31/6/2022",
            "Distribution Type": "N- Freight - NASA",
            "Subtype": "348734788764",
        }
    ]
}

const detailsCardList: DetailsCardMeta[] = [
    {
        "name": "Poll Details",
        "isCollapse": true,
        "isRowWise": false,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "AdminAlex’s Birthday Treat Locationistration",
                    "alias": "Title"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Hey infithrians! Alex’s birthday is next week. We’re planning to host a party at these locations in the options listed below. Let us know which location you like the best. Thanks!",
                    "alias": "Description"
                },
                "type": "text"
            }
        ],
        "data": [
            {
                "Title": "AdminAlex’s Birthday Treat Locationistration",
                "Description": "Hey infithrians! Alex’s birthday is next week. We’re planning to host a party at these locations in the options listed below. Let us know which location you like the best. Thanks!"
            }
        ]
    },
    {
        "name": "Timeline",
        "isCollapse": true,
        "isRowWise": false,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "16/05/2023",
                    "alias": "Start Date"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "16/05/2023",
                    "alias": "End Date"
                },
                "type": "text"
            }
        ],
        "data": [
            {
                "Start Date": "16/05/2023",
                "End Date": "16/05/2023"
            }
        ]
    },
    {
        "name": "Distribution Channels",
        "isCollapse": true,
        "isRowWise": false,
        "labels": [
            {
                "labelName": {
                    "defaultValue": "Departments",
                    "alias": "Distribution Type"
                },
                "type": "text"
            },
            {
                "labelName": {
                    "defaultValue": "Software, Auditing, Administration, HR",
                    "alias": "Departments"
                },
                "type": "text"
            }
        ],
        "data": [
            {
                "Distribution Type": "Departments",
                "Departments": "Software, Auditing, Administration, HR"
            }
        ]
    }
];

const pollsFormSections: Sections = [

    {
        "tabName": "Poll Details",

        "sectionName": "Timeline",
        "sectionDescription": "Enter Start Date and End Date"
    },

    {
        "tabName": "Poll Details",

        "sectionName": "Poll  Details",
        "sectionDescription": "Enter Poll Details"
    },
    {
        "tabName": "Channels",

        "sectionName": "Distribution",
        "sectionDescription": "Enter Poll Details"
    }


]
const pollDetailsFormData: FieldConfig = [
    {
        "tabName": "Poll Details",
        "formName": "timelineForm",
        "labels": [
            {
                "sectionName": "Timeline",
                "labelName": {
                    "defaultValue": "Start Date",
                    "alias": "Start Date"
                },
                "type": "date"
            },

            {
                "sectionName": "Timeline",
                "labelName": {
                    "defaultValue": "End Date ",
                    "alias": "End Date"
                },
                "type": "date"
            },
            {
                "sectionName": "Timeline",
                "labelName": {
                    "defaultValue": "One-Day Poll",
                    "alias": "One-Day Poll"
                },
                "type": "checkbox"
            },

            {
                "sectionName": "Poll  Details",
                "labelName": {
                    "defaultValue": " Title ",
                    "alias": " Title "
                },
                "type": "text"
            },
            {
                "sectionName": "Poll  Details",
                "labelName": {
                    "defaultValue": "Description",
                    "alias": "Description "
                },
                "type": "text"
            },
            {
                "sectionName": "Poll  Details",
                "labelName": {
                    "defaultValue": "Keep voters hidden",
                    "alias": "Keep voters hidden"
                },
                "type": "checkbox"
            },
            {
                "sectionName": "Poll  Details",
                "labelName": {
                    "defaultValue": "Option 1",
                    "alias": "Option 1"
                },
                "type": "text"
            },
            {
                "sectionName": "Poll  Details",
                "labelName": {
                    "defaultValue": "Option 2",
                    "alias": "Option 2"
                },
                "type": "text"
            },
            {
                "sectionName": "Poll  Details",
                "labelName": {
                    "defaultValue": "Option 3",
                    "alias": "Option 3"
                },
                "type": "text"
            },
            {
                "sectionName": "Poll  Details",
                "labelName": {
                    "defaultValue": "Option 4 ",
                    "alias": "Option 4"
                },
                "type": "text"
            },

        ]
    },
    {
        "tabName": "Channels",
        "formName": "announcementForm",
        "labels": [
            {
                "sectionName": "Distribution",
                "labelName": {
                    "defaultValue": "Distribution Type",
                    "alias": "Distribution Type"
                },
                "type": "select"
            },
            {
                "sectionName": "Distribution",
                "labelName": {
                    "defaultValue": "Departments",
                    "alias": "Departments"
                },
                "type": "select"
            }

        ]

    }

]

const pollsWizardTabs: WizardTabs = [
    {
        label: "Poll Details",
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
export { pollsWizardTabs, pollDetailsFormData, pollsFormSections, detailsCardList, pollsSurveysTableData, };

