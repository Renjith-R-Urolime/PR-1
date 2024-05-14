import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
// import { DetailsCardData } from 'src/app/shared/ui/details-card/details-card';
// import { TrazepoidTabsMeta } from 'src/app/shared/ui/tab-data-table/trapezoid-tabs';
import { detailsCardMeta, tabsMeta } from '../payroll-cycle-data';
import { DetailsCardData, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';


@Component({
  selector: 'app-payroll-cycle-view',
  templateUrl: './payroll-cycle-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./payroll-cycle-view.component.scss']
})
export class PayrollCycleViewComponent implements OnInit {
  id: number;
  private routeSub: Subscription | undefined;
  detailsCardData: DetailsCardData={
    meta: detailsCardMeta,
    data: []
  };
  cycleTabsMeta: TrazepoidTabsMeta[] = tabsMeta;

  constructor(private sharedService: SharedService,private apiService: ApiService, private route: ActivatedRoute, private cdRef: ChangeDetectorRef) { }

  // detailsCardList: DetailsCardMeta[] = detailsCardList;
  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      // Access route parameters here
      this.id = params['id'];
    });
  }

}
