import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DetailsCardData, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { detailsCardList, tabsMeta } from '../employee-ot-matrix.data';

@Component({
  selector: 'app-employee-ot-matrix-view',
  templateUrl: './employee-ot-matrix-view.component.html',
  styleUrls: ['./employee-ot-matrix-view.component.scss']
})
export class EmployeeOtMatrixViewComponent {
  showEmployee:boolean=false
  id;
  detailsCardData: DetailsCardData={
    meta: detailsCardList,
            data: []
  };
  routeSub: Subscription | undefined;
  ComponentMappingTabsMeta: TrazepoidTabsMeta[] = tabsMeta;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
}
