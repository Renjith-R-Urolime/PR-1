import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { cardMetaData, tableMetaData } from './advance-salary-data';

@Component({
  selector: 'app-advance-salary',
  templateUrl: './advance-salary.component.html',
  styleUrls: ['./advance-salary.component.scss']
})
export class AdvanceSalaryComponent implements OnInit {
  view:string='table';
  cardJsonData = cardMetaData;
  tableMetaData: any = tableMetaData;
  theme: string = this.sharedService.getTheme();
  constructor(private route: ActivatedRoute, private sharedService:SharedService) { }

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
