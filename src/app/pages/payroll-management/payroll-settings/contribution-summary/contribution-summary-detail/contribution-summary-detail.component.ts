import { Component } from '@angular/core';
import { DetailsCardData, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { detailsCardList, tabsMeta } from '../contribution-summary.data';
// import { DetailsCardData } from 'src/app/shared/ui/details-card/details-card';
// import { TrazepoidTabsMeta } from 'src/app/shared/ui/tab-data-table/trapezoid-tabs';

@Component({
  selector: 'app-contribution-summary-detail',
  templateUrl: './contribution-summary-detail.component.html',
  styleUrls: ['./contribution-summary-detail.component.scss']
})
export class ContributionSummaryDetailComponent {
  detailsCardData: DetailsCardData = {
    meta: detailsCardList,
    data: []
  };

  contributionRegisterTabsMeta: TrazepoidTabsMeta[]= tabsMeta;
  id:number;
}
