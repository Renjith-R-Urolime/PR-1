import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';

import { detailsCardMeta, tabsMeta } from '../subsidiary.data';
import { DetailsCardData, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';

@Component({
  selector: 'app-subsidiary-detail',
  templateUrl: './subsidiary-detail.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./subsidiary-detail.component.scss']
})
export class SubsidiaryDetailComponent implements OnInit {
  detailsCardData: DetailsCardData  = {
    meta: detailsCardMeta,
    data: []
  };
  subsidiaryTabsMeta: TrazepoidTabsMeta[] = tabsMeta;
  id: number;
  private routeSub: Subscription | undefined;

  constructor(private sharedService: SharedService, private apiService: ApiService,private _location: Location, private route: ActivatedRoute, private cdRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      // Access route parameters here
      this.id = params['id'];
    });
  }

}
