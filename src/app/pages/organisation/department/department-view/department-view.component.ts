import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
// import { DetailsCardData } from 'src/app/shared/ui/details-card/details-card';
// import { TrazepoidTabsMeta } from 'src/app/shared/ui/tab-data-table/trapezoid-tabs';
import { detailsCardList, tabsMeta } from '../department.data';
import { DetailsCardData, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';

// detailsCardList
@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./department-view.component.scss']
})
export class DepartmentViewComponent implements OnInit {
  id:number;
  private routeSub: Subscription | undefined;

detailsCardData: DetailsCardData={
  meta: detailsCardList,
  data: []
};

departmentTabsMeta: TrazepoidTabsMeta[]= tabsMeta;

constructor(private sharedService: SharedService,private apiService: ApiService,private route: ActivatedRoute,private cdRef: ChangeDetectorRef) {

}

ngOnInit() {
  this.routeSub = this.route.params.subscribe(params => {
    // Access route parameters here
    this.id = params['id'];
  });
}

}