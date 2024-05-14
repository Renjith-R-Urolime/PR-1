import { Component, ViewEncapsulation } from '@angular/core';

import { DetailsCardData } from 'src/app/shared/meta-interface';
import { detailsCardMeta, tabsMeta } from '../manage-salary.data';


@Component({
  selector: 'app-manage-salary-view',
  templateUrl: './manage-salary-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./manage-salary-view.component.scss']
})
export class ManageSalaryViewComponent {
  detailsCardData: DetailsCardData={
    meta: detailsCardMeta,
          data: []
  };
  salaryTabsMeta = tabsMeta;
  constructor() { }

  ngOnInit() {
  }

}
