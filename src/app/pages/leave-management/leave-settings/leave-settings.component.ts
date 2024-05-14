import { Component, OnInit } from '@angular/core';
import { CardMetaData, leaveSettingFormData } from './leave-settings-data';

@Component({
  selector: 'app-leave-settings',
  templateUrl: './leave-settings.component.html',
  styleUrls: ['./leave-settings.component.scss']
})
export class LeaveSettingsComponent implements OnInit {

  constructor() { }
  settingFormData = leaveSettingFormData;
  settingCardMeta = CardMetaData;
  ngOnInit() {
  }

}
