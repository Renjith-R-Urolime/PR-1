import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-organisation-settings-list',
  templateUrl: './organisation-settings-list.component.html',
  styleUrls: ['./organisation-settings-list.component.scss']
})
export class OrganisationSettingsListComponent implements OnInit {
  orgSettingFormData =  {
    "apiUrl":"core-hr/organisation/settings",
    "labels": [
      {
       "labelName": {
        "defaultValue": "name",
        "alias": "name"
      },
      "placeholder": "Enter Name",
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
        "labelName": {
         "defaultValue": "inactive",
         "alias": "inactive"
       },
       "placeholder": "",
       "type": "checkbox",
       "col":4
       }
    ]
  }
  cardJsonData = {
    name:"",
    logo:"",
    labels:[
        {
            labelName:{
                defaultValue:"status",
                alias:"Status"
            }
        },
        {
            labelName:{
                defaultValue:"createdAt",
                alias:"Created Date"
            }
        }
    ]
  }
  constructor() { }

  ngOnInit() {
  }

}
