import { Component, ViewEncapsulation } from '@angular/core';
import { DetailsCardMeta, FormMeta } from 'src/app/shared/meta-interface';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FieldConfig, Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { DataTable } from 'src/app/shared/ui/data-table-list/data-table-list';
import { WizardTabs } from 'src/app/shared/ui/wizard-tabs/wizard-tabs';
import { detailsCardList, grievanceFormData, grievanceformSections, grievancewizardTabs } from '../grievance.data';

@Component({
  selector: 'app-grievance-view',
  templateUrl: './grievance-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./grievance-view.component.scss']
})
export class GrievanceViewComponent {

  detailsCardList: DetailsCardMeta[] = detailsCardList;
  // trapezoidTabs: TrazepoidTabsMeta= tabs;
  // trapezoidTabsTable: DataTable[] = trapezoidTabTableData;
  tableData: DataTable;
  constructor(private sharedService: SharedService) {

  }
  wizardData: WizardTabs = grievancewizardTabs;
  formData: FormMeta = grievanceFormData;
  formSection: Sections = grievanceformSections;
}
