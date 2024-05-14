import { Component, OnInit } from '@angular/core';
import { DetailsCardData } from 'src/app/shared/meta-interface';
import { SharedService } from 'src/app/shared/services/shared.service';
import { detailsCardMeta, tabsMeta } from '../leave-application-data';

@Component({
  selector: 'app-leave-application-view',
  templateUrl: './leave-application-view.component.html',
  styleUrls: ['./leave-application-view.component.scss']
})
export class LeaveApplicationViewComponent implements OnInit {
  theme: string = this.sharedService.getTheme();

  detailsCardData: DetailsCardData = {
    meta: detailsCardMeta,
          data: []
  };
  showMessage: boolean = false;
  applicationTabsMeta = tabsMeta;
  constructor(private sharedService:SharedService) { }

  ngOnInit() {
    this.detailsCardData.meta[0].labels[3].hide = true;
    this.detailsCardData.meta[0].labels[6].hide = false;
    this.detailsCardData.meta[0].labels[8].hide = true;
  }
  handleDetailsCardDataChange(apltnData: any) {

    if(apltnData?.data?.leaveDuration?.id === 3){
      apltnData.meta[0].labels[3].hide = false;
      apltnData.meta[0].labels[6].hide = true;
    }
    if(apltnData?.data?.reason?.id === 0){
      apltnData.meta[0].labels[8].hide = false;
    }
  }
}
