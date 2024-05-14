import { Component, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DetailsCardData } from 'src/app/shared/meta-interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { detailsCardList } from '../waiver-hour.data';
@Component({
  selector: 'app-waiver-hour-details',
  templateUrl: './waiver-hour-details.component.html',
  styleUrls: ['./waiver-hour-details.component.scss']
})
export class WaiverHourDetailsComponent {
  theme: string = this.sharedService.getTheme();
  classificationApplicabilityData;
  formTemplateRef: TemplateRef<any>;
  activeTemplateName: string;
  searchText: string;
empData: any;
  selectAllChecked: boolean = false;
  selectedCalendar: any;
  holidayData:any;
  private routeSub: Subscription | undefined;
  id: any;

  detailsCardData: DetailsCardData = {
    meta: detailsCardList,
    data: []
  };
  employeeCount: any;
  employeeData: any;
  waiverHourData: any;
  constructor(private apiService: ApiService, private route: ActivatedRoute,public sharedService: SharedService,) { }
  getFormTemplate(template: TemplateRef<any>, name: string) {


    this.formTemplateRef = template
    this.activeTemplateName = name


  }
  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });


  }

}
