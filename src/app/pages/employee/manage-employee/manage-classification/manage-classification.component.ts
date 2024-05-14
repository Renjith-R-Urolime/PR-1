import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { cardMetaData, tableMetaData } from './manage-classification.data';

@Component({
  selector: 'app-manage-classification',
  templateUrl: './manage-classification.component.html',
  styleUrls: ['./manage-classification.component.scss']
})
export class ManageClassificationComponent {
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
