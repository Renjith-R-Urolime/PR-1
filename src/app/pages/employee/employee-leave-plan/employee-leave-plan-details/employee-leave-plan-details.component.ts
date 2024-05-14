import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';

import { DetailsCardData, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { detailsCardList } from '../employee-leave-plan-data';
@Component({
  selector: 'app-employee-leave-plan-details',
  templateUrl: './employee-leave-plan-details.component.html',
  styleUrls: ['./employee-leave-plan-details.component.scss']
})
export class EmployeeLeavePlanDetailsComponent {
  detailsCardData: DetailsCardData  = {
    meta: detailsCardList,
    data: []
  };
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
