
import { Component, OnInit } from '@angular/core';
import { detailsCardMeta, tabsMeta } from '../eos-request.data';
import { DetailsCardData } from 'src/app/shared/meta-interface';

@Component({
  selector: 'app-eos-request-view',
  templateUrl: './eos-request-view.component.html',
  styleUrls: ['./eos-request-view.component.scss']
})
export class EosRequestViewComponent implements OnInit  {
  detailsCardData: DetailsCardData={
    meta: detailsCardMeta,
          data: []
  };
  eosRequestTabsMeta = tabsMeta;


  ngOnInit() {
  }

}
