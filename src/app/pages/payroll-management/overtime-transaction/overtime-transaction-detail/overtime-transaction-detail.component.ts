import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
// import { DetailsCardData } from 'src/app/shared/ui/details-card/details-card';
// import { TrazepoidTabsMeta } from 'src/app/shared/ui/tab-data-table/trapezoid-tabs';
import { DetailsCardData, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { detailsCardList, tabsMeta } from '../overtime-transaction.data';
@Component({
  selector: 'app-overtime-transaction-detail',
  templateUrl: './overtime-transaction-detail.component.html',
  styleUrls: ['./overtime-transaction-detail.component.scss']
})
export class OvertimeTransactionDetailComponent implements OnInit{
  theme: string = this.sharedService.getTheme();
  detailsCardData: DetailsCardData = {
    meta: detailsCardList,
    data: []
  };
  overtimeTansactionabsMeta: TrazepoidTabsMeta[]= tabsMeta;
  id:number;

  constructor(private sharedService: SharedService) { }

ngOnInit(): void {

}
}
