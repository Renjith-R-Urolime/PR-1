import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { holidayCardMetaData, tableMetaData } from './holidays.data';
@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent {
  theme: string = this.sharedService.getTheme();
  view:string='table';
  cardJsonData=holidayCardMetaData;
  tableMetaData: any = tableMetaData;
  currentURL: string;

  constructor(private sharedService:SharedService,private router: Router,private route: ActivatedRoute){  }

  ngOnInit() {
    this.currentURL = this.router.url
    this.route.queryParams.subscribe((params) => {
      if (params.view) {
        this.view = params.view;
      }
    });
  }
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
