import { Component } from '@angular/core';
import { cardMetaData, tableMetaData } from './manage-shift.data';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-manage-shift',
  templateUrl: './manage-shift.component.html',
  styleUrls: ['./manage-shift.component.scss']
})
export class ManageShiftComponent {
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
