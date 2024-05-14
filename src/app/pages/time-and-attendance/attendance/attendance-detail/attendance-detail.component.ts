import { Component } from '@angular/core';
import { detailsCardList, tabsMeta } from '../attendance.data';

import { DetailsCardData, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-attendance-detail',
  templateUrl: './attendance-detail.component.html',
  styleUrls: ['./attendance-detail.component.scss']
})
export class AttendanceDetailComponent {
  theme: string = this.sharedService.getTheme();
  detailsCardData: DetailsCardData = {
    meta: detailsCardList,
    data: []
  };
  attendanceTabsMeta: TrazepoidTabsMeta[] = tabsMeta;
  id: number;
  Latitude = 28.185812;
  Longitude = 55.280259;
  mapDetails = [
    {
      "name": "Latitude",
      "value":  'Not Available'
    },
    {
      "name": "Longitude",
      "value": 'Not Available'
    },
    {
      "name": "Location",
      "value": 'Not Available'
    },
    {
      "name": "Platform",
      "value": 'Not Available'
    },
    {
      "name": "Platform ID",
      "value": 'Not Available'
    }
  ]

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {



  }
}
