import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

import { DetailsCardData, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { detailsCardList, tabsMeta } from '../leave-resumption.data';

@Component({
  selector: 'app-leave-resumption-detail',
  templateUrl: './leave-resumption-detail.component.html',
  styleUrls: ['./leave-resumption-detail.component.scss']
})
export class LeaveResumptionDetailComponent {
  theme: string = this.sharedService.getTheme();
  detailsCardData: DetailsCardData = {
    meta: detailsCardList,
    data: []
  };
 leaveResumptionTabsMeta: TrazepoidTabsMeta[]= tabsMeta;
  overtimeTansactionabsMeta: TrazepoidTabsMeta[]= tabsMeta;
  id:number;

  constructor(private sharedService: SharedService) { }

ngOnInit(): void {



}
}
