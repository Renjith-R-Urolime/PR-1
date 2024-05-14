import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { tableMetaData, waiverHourCardMetaData } from './waiver-hour.data';

@Component({
  selector: 'app-waiver-hour',
  templateUrl: './waiver-hour.component.html',
  styleUrls: ['./waiver-hour.component.scss']
})
export class WaiverHourComponent {
  theme: string = this.sharedService.getTheme();
  view:string='table';
  cardJsonData=waiverHourCardMetaData;
  tableMetaData: any = tableMetaData;
  currentURL: string;

  constructor(private sharedService:SharedService,private router: Router){ this.currentURL = this.router.url }

  changeView(event){
    this.view=event;
  }
  open(type, id) {
    this.sharedService.closeSideBar();
    this.currentURL = this.currentURL.split('?')[0];

    if (type === 'edit') {
      this.router.navigate([this.currentURL, 'edit', id]);
    }
  }


}
