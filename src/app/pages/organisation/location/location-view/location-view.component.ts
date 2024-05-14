import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { detailsCardList, tabsMeta } from '../location.data';
import { DetailsCardData, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { SharedService } from 'src/app/shared/services/shared.service';
// import { tabsMeta } from '../../subsidiary/subsidiary.data';

@Component({
  selector: 'app-location-view',
  templateUrl: './location-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./location-view.component.scss']
})
export class LocationViewComponent implements OnInit {
  detailsCardData: DetailsCardData={
    meta: detailsCardList,
    data: []
  };
  locationTabsMeta: TrazepoidTabsMeta[]= tabsMeta;
  id:number;

  private routeSub: Subscription | undefined;
  constructor(private sharedService: SharedService,private apiService: ApiService,private route: ActivatedRoute,private cdRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      // Access route parameters here
      this.id = params['id'];
    });
}
}



