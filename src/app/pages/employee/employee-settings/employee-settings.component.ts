import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tabs } from 'src/app/_metronic/layout/components/aside/tabs';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-employee-settings',
  templateUrl: './employee-settings.component.html',
  styleUrls: ['./employee-settings.component.scss']
})
export class EmployeeSettingsComponent {
  subMenuList = [];
  routerUrl = [];

  theme = this.sharedService.getTheme();

  constructor( private router: Router, private sharedService: SharedService) { }
  ngOnInit() {
    this.getCardData()
  }

  getCardData() {
    this.routerUrl = this.router.url.split('/');
    this.subMenuList = tabs
    .find((menu) => menu.mainMenuLink.includes(this.routerUrl[1]))
    ?.subMenu?.find((menu) => menu.subMenuLink.includes(this.routerUrl[2]))?.subMenu;
    // Use subMenuList as needed
  }
}
