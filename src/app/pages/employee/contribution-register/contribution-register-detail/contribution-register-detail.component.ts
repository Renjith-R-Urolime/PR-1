import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

import { detailsCardList,tabsMeta } from '../contribution-register.data';
//import { detailsCardMeta, formSections, tabs, trapezoidTabTableData, wizardTabs } from '../subsidiary.data';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DetailsCardData, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';

@Component({
  selector: 'app-contribution-register-detail',
  templateUrl: './contribution-register-detail.component.html',
  styleUrls: ['./contribution-register-detail.component.scss']
})
export class ContributionRegisterDetailComponent {
  detailsCardData: DetailsCardData = {
    meta: detailsCardList,
    data: []
  };
  
  contributionRegisterTabsMeta: TrazepoidTabsMeta[]= tabsMeta;
  id:number;
}
