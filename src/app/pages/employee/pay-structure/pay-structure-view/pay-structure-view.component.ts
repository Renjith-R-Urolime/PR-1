import { Component, OnInit } from '@angular/core';
import { DetailsCardData } from 'src/app/shared/meta-interface';
import { SharedService } from 'src/app/shared/services/shared.service';
import { detailsCardMeta, tabsMeta } from '../pay-structure-data';

@Component({
  selector: 'app-pay-structure-view',
  templateUrl: './pay-structure-view.component.html',
  styleUrls: ['./pay-structure-view.component.scss']
})
export class PayStructureViewComponent implements OnInit {
  theme: string = this.sharedService.getTheme();
  detailsCardData: DetailsCardData={
    meta: detailsCardMeta,
          data: []
  };
  componentDetails: any;
  paystructureTabsMeta = tabsMeta;
  formulaList = [
    {
      "id": "1",
      "name": "Of Gross Pay"
    },
    {
      "id": "2",
      "name": "Of Basic Pay"
    }
  ]
  shades: string[] = ['','light', 'bright']
  constructor(private sharedService:SharedService) { }

  ngOnInit() {
  }
  getFormulaName(id){

    const data = this.formulaList.filter(i =>i.id === id?.toString());

    if(data){
      return data[0]?.name;
    }
  }
}
