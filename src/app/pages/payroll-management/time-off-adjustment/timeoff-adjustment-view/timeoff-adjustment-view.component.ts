import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { detailsCardMeta, tabsMeta } from '../timeoff-adjustment-data';
import { DetailsCardData } from 'src/app/shared/meta-interface';

@Component({
  selector: 'app-timeoff-adjustment-view',
  templateUrl: './timeoff-adjustment-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./timeoff-adjustment-view.component.scss']
})
export class TimeoffAdjustmentViewComponent implements OnInit {
  detailsCardData: DetailsCardData={
    meta: detailsCardMeta,
          data: []
  };
  timeoffTabsMeta = tabsMeta;
  constructor() { }

  ngOnInit() {
  }


}
