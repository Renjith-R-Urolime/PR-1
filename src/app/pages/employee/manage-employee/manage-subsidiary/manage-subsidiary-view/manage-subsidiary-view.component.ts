import { Component, ViewEncapsulation } from '@angular/core';

import { SharedService } from 'src/app/shared/services/shared.service';
import { FieldConfig, Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { DataTable } from 'src/app/shared/ui/data-table-list/data-table-list';
import { WizardTabs } from 'src/app/shared/ui/wizard-tabs/wizard-tabs';


import { detailsCardList, manageSubsidiaryFormData, manageSubsidiaryFormSections, manageSubsidiaryWizardTabs, tabs, trapezoidTabTableData } from '../manage-subsidiary.data';
import { DetailsCardMeta, FormMeta, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';

@Component({
  selector: 'app-manage-subsidiary-view',
  templateUrl: './manage-subsidiary-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./manage-subsidiary-view.component.scss']
})
export class ManageSubsidiaryViewComponent {

  detailsCardList: DetailsCardMeta[] = detailsCardList;
  trapezoidTabs: TrazepoidTabsMeta[]= tabs;
  //trapezoidTabsTable: DataTable[] = trapezoidTabTableData;

  trapezoidTabsTable = trapezoidTabTableData;
  tableData: DataTable;
  wizardData: WizardTabs = manageSubsidiaryWizardTabs;
  formData: FormMeta[] = manageSubsidiaryFormData;
  formSection: Sections = manageSubsidiaryFormSections;
  constructor( private sharedService:SharedService) { }


  // wizardData = manageSubsidiaryWizardTabs;
  // formSection = manageSubsidiaryFormSections;
  // formData = manageSubsidiaryFormData;


  ngOnInit() {
    this.sharedService.selectedTabLabel$.subscribe(response => {
      this.tableData = this.trapezoidTabsTable.find( item => item.tableName === response
    );
  })
}

}
