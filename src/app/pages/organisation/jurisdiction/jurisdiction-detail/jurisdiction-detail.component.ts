import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
// import { DetailsCardData } from 'src/app/shared/ui/details-card/details-card';
// import { TrazepoidTabsMeta } from 'src/app/shared/ui/tab-data-table/trapezoid-tabs';
import { detailsCardList, tabsMeta } from '../jurisdiction.data';
//import { detailsCardMeta, formSections, tabs, trapezoidTabTableData, wizardTabs } from '../subsidiary.data';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DetailsCardData, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';





@Component({
  selector: 'app-jurisdiction-detail',
  templateUrl: './jurisdiction-detail.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./jurisdiction-detail.component.scss']
})
export class JurisdictionDetailComponent implements OnInit {

  private routeSub: Subscription | undefined;
  detailsCardData: DetailsCardData = {
    meta: detailsCardList,
    data: []
  };
  jurisdictionTabsMeta: TrazepoidTabsMeta[]= tabsMeta;
  id:number;


  constructor(private sharedService: SharedService,private apiService: ApiService,private route: ActivatedRoute,private cdRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      // Access route parameters here
      this.id = params['id'];
    });

}

}





