import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FieldConfig, Sections } from 'src/app/shared/ui/basic-form/basic-form';

import { Observable } from 'rxjs';
import { TableData } from 'src/app/shared/meta-interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { WizardTabs } from 'src/app/shared/ui/wizard-tabs/wizard-tabs';
import { announcementCardMeta, announcementTableMetaData } from './announcement/announcement.data';
import { classCardMetaData, classTableMetaData } from './class/class.data';
import { departmentCardMetaData, departmentTableMetaData } from './department/department.data';
import { empBankTableMetaData, employerBankDetailsCardMetaData } from './employer-bank-details/employer-bank-details.data';
import { juriTableMetaData, jurisdictionCardMetaData } from './jurisdiction/jurisdiction.data';
import { locationCardMetaData, locationTableMetaData } from './location/location.data';
import { ploicyCardMetaData, policyTableMetaData } from './policy-and-handbooks/policy-and-handbooks.data';
import { pollDetailsFormData, pollsFormSections, pollsWizardTabs } from './polls-surveys/polls-surveys.data';
import { subsidiariesCardMetaData, tableMetaData } from './subsidiary/subsidiary.data';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./organisation.component.scss']
})
export class OrganisationComponent implements OnInit {
  moduleTableData$: Observable<any> | undefined;
  moduleTableData: any;
  orgChart: boolean = false
  model: boolean = false;
  pageView: boolean = true;
  wizardData: WizardTabs;
  formData: FieldConfig;
  formSection: Sections;
  isDataTableLoading: boolean = false;
  currentUrl: string = '';
  page: number = 1;
  pageSize: number;
  view: string = 'card';
  imageColumn: string = '';
  theme: string = this.sharedService.getTheme();
  tableMetaData: TableData;

  cardJsonData ;
  currentURL: string;
  // cardMetaData: any;

  constructor(private sharedService: SharedService, private router: Router, private apiService: ApiService, private cdRef: ChangeDetectorRef, private route: ActivatedRoute) {

    this.currentURL = this.router.url
  }

  changeView(event) {
    this.view = event;
  }
  ngOnInit() {

    const baseApi = this.sharedService.getCurrentApi();
    const routeName = baseApi?.url?.split('/')[2];


    switch (routeName) {
      case 'subsidiary':
        this.currentUrl = 'subsidiary';
        this.tableMetaData = tableMetaData;
        this.cardJsonData = subsidiariesCardMetaData;

        break;
      case 'jurisdiction':
        this.currentUrl = 'jurisdiction';
        this.tableMetaData = juriTableMetaData;
        this.cardJsonData = jurisdictionCardMetaData;
        break;
      case 'class':
        this.currentUrl = 'class';
        this.tableMetaData = classTableMetaData;
        this.cardJsonData = classCardMetaData;
        break;
      case 'department':
        this.currentUrl = "department";
        this.tableMetaData = departmentTableMetaData;
        this.cardJsonData = departmentCardMetaData;

        break;
      case 'location':
        this.currentUrl = "location";
        this.tableMetaData = locationTableMetaData;
        this.cardJsonData = locationCardMetaData;

        break;
      case 'employer-bank-detail':
        this.tableMetaData = empBankTableMetaData;
        this.currentUrl = "employer-bank-details";
        this.cardJsonData = employerBankDetailsCardMetaData;

        break;
      case 'policy-handbook':
        this.tableMetaData = policyTableMetaData;
        this.currentUrl = "policy-handbook";
        this.cardJsonData = ploicyCardMetaData;

        break;

      case 'announcement':

        this.tableMetaData = announcementTableMetaData;
        this.currentUrl = "announcement";
        this.cardJsonData = announcementCardMeta;
        break;
      case 'polls-and-survey':
        this.currentUrl = "polls-and-survey";
        this.wizardData = pollsWizardTabs;
        this.formData = pollDetailsFormData;
        this.formSection = pollsFormSections;
        break;
      case 'chart':
        this.currentUrl = "organisation-chart";
        this.orgChart = true; // Set orgChart to true when on 'organisation-chart' page
        break;
    }


    // Check for 'info' parameter in the URL and set 'view' accordingly
    this.route.queryParams.subscribe((params) => {
      if (params.view) {
        this.view = params.view;
      }
    });
    //this.getTableData()
  }

  open(type, id) {
    this.sharedService.closeSideBar();
    this.currentURL = this.currentURL.split('?')[0];

    if (type === 'edit') {
      this.router.navigate([this.currentURL, 'edit', id]);
    }
  }
}