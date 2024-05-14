import { Component, OnInit } from '@angular/core';
import { detailsCardMeta, tabsMeta } from '../advance-salary-data';
import { DetailsCardData } from 'src/app/shared/meta-interface';

@Component({
  selector: 'app-advance-salary-view',
  templateUrl: './advance-salary-view.component.html',
  styleUrls: ['./advance-salary-view.component.scss']
})
export class AdvanceSalaryViewComponent implements OnInit {
  detailsCardData: DetailsCardData={
    meta: detailsCardMeta,
          data: []
  };
  advanceSalaryTabsMeta = tabsMeta;
  constructor() { }

  ngOnInit() {
  }

}
