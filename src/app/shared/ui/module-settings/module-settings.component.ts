import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tabs } from 'src/app/_metronic/layout/components/aside/tabs';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-module-settings',
  templateUrl: './module-settings.component.html',
  styleUrls: ['./module-settings.component.scss']
})
export class ModuleSettingsComponent implements OnInit {

  subMenuList = [];
  routerUrl = [];
  menuHeader = '';
  theme = this.sharedService.getTheme();

  constructor( private router: Router, private sharedService: SharedService) { }
  ngOnInit() {
    this.getCardData()
  }

  getCardData() {
    this.routerUrl = this.router.url.split('/');


    this.menuHeader = tabs.find((menu) => menu.mainMenuLink.includes(this.routerUrl[1]))
      ?.subMenu?.find((menu) => menu.subMenuLink.includes(this.routerUrl[2]))?.subMenuText;
    this.subMenuList = tabs
    .find((menu) => menu.mainMenuLink.includes(this.routerUrl[1]))
    ?.subMenu?.find((menu) => menu.subMenuLink.includes(this.routerUrl[2]))?.subMenu;
    // Use subMenuList as needed


  }
}
