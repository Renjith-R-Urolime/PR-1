import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { shiftCardMetaData, tableMetaData } from './shift.data';

@Component({
  selector: 'app-shift-scheduler',
  templateUrl: './shift-scheduler.component.html',
  styleUrls: ['./shift-scheduler.component.scss']
})
export class ShiftSchedulerComponent {
  theme: string = this.sharedService.getTheme();
  view:string='table';
  cardJsonData=shiftCardMetaData;
  tableMetaData: any = tableMetaData;

  constructor(private sharedService:SharedService,private route: ActivatedRoute){}

  ngOnInit(){
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
