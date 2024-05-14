import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tabs } from 'src/app/_metronic/layout/components/aside/tabs';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-payroll-settings',
  templateUrl: './payroll-settings.component.html',
  styleUrls: ['./payroll-settings.component.scss']
})
export class PayrollSettingsComponent {
  theme = this.sharedService.getTheme();
  subMenuList = [];
  routerUrl = [];

  constructor( private router: Router, private sharedService: SharedService){}

  ngOnInit() {
    this.getCardData();
    this.subMenuList.forEach(subMenu=>{


    })
  }

  getCardData() {
    this.routerUrl = this.router.url.split('/');
    this.subMenuList = tabs
    .find((menu) => menu.mainMenuLink.includes(this.routerUrl[1]))
    ?.subMenu?.find((menu) => menu.subMenuLink.includes(this.routerUrl[2]))?.subMenu;
    // Use subMenuList as needed
  }
}
