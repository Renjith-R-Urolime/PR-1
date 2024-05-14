import { Component } from '@angular/core';
import { cardMetaData, contractTableMetaData } from './contract-master.data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contract-master',
  templateUrl: './contract-master.component.html',
  styleUrls: ['./contract-master.component.scss']
})
export class ContractMasterComponent {
  view: string = 'table';
  cardJsonData = cardMetaData;
  tableMetaData: any = contractTableMetaData
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


}
