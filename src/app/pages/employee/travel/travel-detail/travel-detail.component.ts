import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DetailsCardMeta, FormMeta } from 'src/app/shared/meta-interface';
import { FieldConfig, Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { DataTable } from 'src/app/shared/ui/data-table-list/data-table-list';
import { WizardTabs } from 'src/app/shared/ui/wizard-tabs/wizard-tabs';
import { detailsCardList, formSections, travelFormData, wizardTabs } from '../travel.data';

@Component({
  selector: 'app-travel-detail',
  templateUrl: './travel-detail.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./travel-detail.component.scss']
})
export class TravelDetailComponent implements OnInit {
  wizardData:WizardTabs;
  formData: FormMeta ;
  formSection:Sections;
  breadcrumb: string[] = ['Subsidiary', 'View Subsidiary']
  detailsCardList: DetailsCardMeta[] = detailsCardList;
  tableData: DataTable;

  constructor() { }

  ngOnInit() {
    this.wizardData = wizardTabs;
    this.formData = travelFormData;
    this.formSection = formSections;
 }
}
