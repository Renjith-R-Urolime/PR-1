import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Tab, tabs } from '../tabs';

@Component({
  selector: 'app-tabs-aside',
  templateUrl: './tabs-aside.component.html',
  styles:[`
  .ttp .tooltip-inner{
    background-color:yellow !important;
  }
  `]
})
export class TabsAsideComponent implements OnInit {
  @Input() activeTab: Tab = tabs[0];
  @Input() setActiveTab: (
    activeTabLink:string
  ) => void;
  allTabs: ReadonlyArray<Tab> = [];
  constructor( private router: Router, private sharedService: SharedService) {}

  ngOnInit(): void {
    console.log('fdfrf')
    this.allTabs = tabs;
    const urlActiveTab = tabs.filter( tab => tab.mainMenuLink.split('/')[1] === this.router.url.split('/')[1] )

    if(urlActiveTab.length > 0) {
      this.setActiveTab(urlActiveTab[0].mainMenuLink)
    }
  }
}
