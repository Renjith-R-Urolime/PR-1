import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetailsCardData } from 'src/app/shared/meta-interface';
import { detailsCardMeta, tabsMeta } from '../adjustment-deduction-data';

@Component({
  selector: 'app-adjustment-deduction-view',
  templateUrl: './adjustment-deduction-view.component.html',
  styleUrls: ['./adjustment-deduction-view.component.scss']
})
export class AdjustmentDeductionViewComponent implements OnInit {

  detailsCardData: DetailsCardData;
  adjustmentTabsMeta = tabsMeta;
  constructor(private router: Router) { }

  ngOnInit() {
    const urlSegments = this.router.url.split('/').map(segment => segment.toLowerCase());

    if (urlSegments.includes('adjustment')) {
      detailsCardMeta[0].name = "Adjustment Information";
    }
    else{
      detailsCardMeta[0].name = "Deduction Information"
    }
    this.detailsCardData = {
      meta: detailsCardMeta,
            data: []
    };
  }

}
