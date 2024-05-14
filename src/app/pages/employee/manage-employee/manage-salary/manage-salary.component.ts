import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { cardMetaData, tableMetaData } from './manage-salary.data';

@Component({
  selector: 'app-manage-salary',
  templateUrl: './manage-salary.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./manage-salary.component.scss']
})
export class ManageSalaryComponent {

  view: string = 'table';
  cardJsonData=cardMetaData;
  tableMetaData: any = tableMetaData;
  theme: string = this.sharedService.getTheme();
  constructor( private route: ActivatedRoute,private sharedService:SharedService) { }

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
