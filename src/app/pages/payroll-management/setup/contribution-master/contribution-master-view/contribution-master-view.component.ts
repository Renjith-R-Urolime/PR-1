import { Component, TemplateRef } from '@angular/core';
import { DetailsCardData, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { SharedService } from 'src/app/shared/services/shared.service';
import { detailsCardMeta, tabsMeta } from '../contribution-master.data';


@Component({
  selector: 'app-contribution-master-view.component.ts',
  templateUrl: './contribution-master-view.component.html',
  styleUrls: ['./contribution-master-view.component.scss']
})
export class ContributionMasterViewComponent{
  theme: string =this.sharedService.getTheme();
  employeeContributionDetails:any
  employerContributionDetails:any
  classificationApplicabilityData:any
  formTemplate:TemplateRef<any>
  headerText:string

  detailsCardData: DetailsCardData={
    meta: detailsCardMeta,
    data: [],
  };


  assignTemplate(headerText, formTemplate) {

    this.headerText = headerText;
    this.formTemplate = formTemplate;

  }

  constructor( public sharedService: SharedService){}
  contributionMasterTabsMeta: TrazepoidTabsMeta[] = tabsMeta;




}
