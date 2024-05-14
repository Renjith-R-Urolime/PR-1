import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { cardMetaData,tableMetaData } from './eos-request.data';


@Component({
  selector: 'app-eos-request',
  templateUrl: './eos-request.component.html',
  styleUrls: ['./eos-request.component.scss']
})
export class EosRequestComponent implements OnInit{
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
