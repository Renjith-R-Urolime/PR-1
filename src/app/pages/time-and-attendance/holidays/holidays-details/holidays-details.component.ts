import { Component, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DetailsCardData } from 'src/app/shared/meta-interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { detailsCardList } from '../holidays.data';
// import { formSections } from '../shift.data';
@Component({
  selector: 'app-holidays-details',
  templateUrl: './holidays-details.component.html',
  styleUrls: ['./holidays-details.component.scss']
})
export class HolidaysDetailsComponent {
  theme: string = this.sharedService.getTheme();
  isLoading: boolean = true;
  classificationApplicabilityData;
  formTemplateRef: TemplateRef<any>;
  activeTemplateName: string;
  searchText: string;
  calendarData: any;
  selectAllChecked: boolean = false;
  selectedCalendar: any;
  holidayData:any;
  private routeSub: Subscription | undefined;
  id: any;

  detailsCardData: DetailsCardData = {
    meta: detailsCardList,
    data: []
  };
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
