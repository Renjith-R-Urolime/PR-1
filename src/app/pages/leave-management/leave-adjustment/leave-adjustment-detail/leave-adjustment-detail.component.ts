import { Component, OnInit } from '@angular/core';

import { DetailsCardData, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { detailsCardList, tabsMeta } from '../leave-adjustment.data';

@Component({
  selector: 'app-leave-adjustment-detail',
  templateUrl: './leave-adjustment-detail.component.html',
  styleUrls: ['./leave-adjustment-detail.component.scss']
})
export class LeaveAdjustmentDetailComponent implements OnInit{
  detailsCardData: DetailsCardData = {
    meta: detailsCardList,
    data: []
  };

  leaveAdjustmentTabsMeta: TrazepoidTabsMeta[]= tabsMeta;
  id:number;

  ngOnInit(): void {
    this.detailsCardData.meta[0].labels[4].hide = true;
    this.detailsCardData.meta[0].labels[5].hide = true;
    this.detailsCardData.meta[0].labels[6].hide = true;
    this.detailsCardData.meta[0].labels[7].hide = true;
    this.detailsCardData.meta[0].labels[9].hide = true;
    this.detailsCardData.meta[0].labels[10].hide = true;


  }
  handleDetailsCardDataChange(adjData: any) {

    if( adjData?.data?.transactionType?.id === '5' || adjData?.data?.transactionType?.id === '3' || adjData?.data?.transactionType?.id === '2'){
      adjData.meta[0].labels[4].hide = false;
      adjData.meta[0].labels[6].hide = false;
      adjData.meta[0].labels[7].hide = false;
      adjData.meta[0].labels[9].hide = false;
      adjData.meta[0].labels[10].hide = false;
    }

    if(adjData?.data?.transactionUnit?.id === 3){
      adjData.meta[0].labels[5].hide = false;
    }
  }
}
