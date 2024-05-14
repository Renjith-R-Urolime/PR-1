import { Component } from '@angular/core';
import { DetailsCardData } from 'src/app/shared/meta-interface';
import { classificationFormData, detailsCardMeta, tabsMeta } from '../manage-classification.data';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-manage-classification-view',
  templateUrl: './manage-classification-view.component.html',
  styleUrls: ['./manage-classification-view.component.scss']
})
export class ManageClassificationViewComponent {
  detailsCardData: DetailsCardData={
    meta: detailsCardMeta,
          data: []
  };
  theme: string = this.sharedService.getTheme();

  classificationMeta: any = classificationFormData;
  classificationTabsMeta = tabsMeta;
  constructor(public sharedService: SharedService) { }

  ngOnInit() {
  }
}
