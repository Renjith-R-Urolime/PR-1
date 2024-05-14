import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
// import { TrazepoidTabsMeta } from 'src/app/shared/ui/tab-data-table/trapezoid-tabs';
import { TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { detailsCardMeta, tabsMeta } from '../../class/class.data';

@Component({
  selector: 'app-class-view',
  templateUrl: './class-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./class-view.component.scss']
})
export class ClassViewComponent implements OnInit {
  classTabsMeta: TrazepoidTabsMeta[] = tabsMeta;
  detailsCardData: any = {
    meta: detailsCardMeta,
    data: []
  };
  id: number;
  private routeSub: Subscription | undefined;

  constructor(private sharedService: SharedService,
    private apiService: ApiService,
    private route: ActivatedRoute, private cdRef: ChangeDetectorRef

  ) { }

  ngOnInit() {

    this.routeSub = this.route.params.subscribe(params => {
      // Access route parameters here
      this.id = params['id'];


    });
  }
}

