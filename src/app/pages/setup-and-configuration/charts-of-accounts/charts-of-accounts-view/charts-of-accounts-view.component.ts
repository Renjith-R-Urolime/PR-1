import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
// import { DetailsCardData } from 'src/app/shared/ui/details-card/details-card';
// import { TrazepoidTabsMeta } from 'src/app/shared/ui/tab-data-table/trapezoid-tabs';
import { detailsCardMeta, tabsMeta } from '../charts-of-accounts.data';
import { DetailsCardData, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';

@Component({
  selector: 'app-charts-of-accounts-view',
  templateUrl: './charts-of-accounts-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./charts-of-accounts-view.component.scss']
})
export class ChartsOfAccountsViewComponent {
  detailsCardData: DetailsCardData={
    meta: detailsCardMeta,
          data: []
  };
  chartOfAccountTabsMeta: TrazepoidTabsMeta[] = tabsMeta;
  id: number;
  private routeSub: Subscription | undefined;
  constructor(private sharedService: SharedService, private apiService: ApiService, private route: ActivatedRoute, private cdRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      // Access route parameters here
      this.id = params['id'];
    });
  }
}
