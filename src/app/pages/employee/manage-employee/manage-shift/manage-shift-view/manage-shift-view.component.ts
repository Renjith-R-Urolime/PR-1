import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DetailsCardData } from 'src/app/shared/meta-interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { detailsCardMeta, shiftFormData, tabsMeta } from '../manage-shift.data';

@Component({
  selector: 'app-manage-shift-view',
  templateUrl: './manage-shift-view.component.html',
  styleUrls: ['./manage-shift-view.component.scss']
})
export class ManageShiftViewComponent {
  detailsCardData: DetailsCardData = {
    meta: detailsCardMeta,
    data: []
  };
  shiftMeta: any = shiftFormData;
  theme: string = this.sharedService.getTheme();

  private routeSub: Subscription | undefined;

  classificationTabsMeta = tabsMeta;
  id: any;
  constructor(private route: ActivatedRoute, private apiService: ApiService,public sharedService: SharedService,) { }

  ngOnInit() {
  }

}

