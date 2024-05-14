import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { cardMetaData ,tableMetaData} from './overtime-setup.data';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-overtime-setup',
  templateUrl: './overtime-setup.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./overtime-setup.component.scss']
})
export class OvertimeSetupComponent implements OnInit{
  constructor( private route: ActivatedRoute) { }
  view:string='table';
  cardJsonData = cardMetaData;
  tableMetaData: any = tableMetaData;
  ngOnInit() {
   this.route.queryParams.subscribe((params) => {
      if (params.view) {
        this.view = params.view;
      }
    });
  }
  changeView(event){
    this.view=event;
  }
}
