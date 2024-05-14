import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
// import { DetailsCardData } from 'src/app/shared/ui/details-card/details-card';
// import { TrazepoidTabsMeta } from 'src/app/shared/ui/tab-data-table/trapezoid-tabs';
import { detailsCardList, tabsMeta } from '../payroll-component-data';
import { DetailsCardData, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { SharedService } from './../../../../../shared/services/shared.service';


@Component({
  selector: 'app-payroll-component-view',
  templateUrl: './payroll-component-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./payroll-component-view.component.scss']
})
export class PayrollComponentViewComponent implements OnInit {
  theme: string = this.sharedService.getTheme();
  formTemplate:TemplateRef<any>
  headerText:string;
  tagGLAccountData:any;
  id;
  detailsCardData: DetailsCardData={
    meta: detailsCardList,
            data: []
  };
  routeSub: Subscription | undefined;
  payrollComponentTabsMeta: TrazepoidTabsMeta[] = tabsMeta;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private cdRef: ChangeDetectorRef,private sharedService: SharedService) { }

  assignTemplate(headerText, formTemplate) {
    console.log("tagGLAccountData",this.tagGLAccountData);
    
    this.headerText = headerText;
    this.formTemplate = formTemplate;
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

}
