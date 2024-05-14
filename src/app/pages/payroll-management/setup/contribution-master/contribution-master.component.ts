import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cardMetaData,tableMetaData } from './contribution-master.data';

@Component({
  selector: 'app-contribution-master',
  templateUrl: './contribution-master.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./contribution-master.component.scss']
})
export class ContributionMasterComponent implements OnInit {
  view: string = 'table';
  currentUrl: string = '';
  cardJsonData = cardMetaData;
  tableMetaData: any = tableMetaData;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params.view) {
        this.view = params.view;
      }
    });
  }
  changeView(event) {
    this.view = event;
  }

  onSizeChange(event) {

  }


}
