import { Location } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DetailsCardData, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { detailsCardMeta, tabsMeta } from '../payroll-intermediary-table.data';


@Component({
  selector: 'app-payroll-intermediary-table-detail',
  templateUrl: './payroll-intermediary-table-detail.component.html',
  styleUrls: ['./payroll-intermediary-table-detail.component.scss']
})
export class PayrollIntermediaryTableDetailComponent {
  detailsCardData: DetailsCardData  = {
    meta: detailsCardMeta,
    data: []
  };
  intermediaryTabsMeta: TrazepoidTabsMeta[] = tabsMeta;
  id: number;
  private routeSub: Subscription | undefined;

  constructor(private sharedService: SharedService, private apiService: ApiService,private _location: Location, private route: ActivatedRoute, private cdRef: ChangeDetectorRef) {

  }

}
