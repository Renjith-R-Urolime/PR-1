import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DetailsCardMeta, FormMeta, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { DataTable } from 'src/app/shared/ui/data-table-list/data-table-list';
import { createTableData, dependentFormData, dependentFormSections, dependentWizardTabs, detailsCardList, tabs, trapezoidTabTableData } from '../dependentCredentials.data';

import { SharedService } from 'src/app/shared/services/shared.service';
import { FieldConfig, Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { CreateTable } from 'src/app/shared/ui/create-table-list/create-table-list';
import { WizardTabs } from 'src/app/shared/ui/wizard-tabs/wizard-tabs';

@Component({
  selector: 'app-dependent-view',
  templateUrl: './dependent-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dependent-view.component.scss']
})
export class DependentViewComponent implements OnInit {
  id=1;
  createTableData:CreateTable[]=createTableData;
  detailsCardList: DetailsCardMeta[] = detailsCardList;
  trapezoidTabs: TrazepoidTabsMeta[]= tabs;
  trapezoidTabsTable: DataTable[] = trapezoidTabTableData;
  tableData: DataTable;

  wizardData:WizardTabs;
  formData: FormMeta ;
  formSection:Sections;



  constructor( private sharedService:SharedService) { }

  ngOnInit() {
  //  this.wizardData = departmentWizardTabs;
  //   this.formData = departmentFormData;
  //   this.formSection = departmentFormSections;
  //   this.sharedService.selectedTabLabel$.subscribe(response => {
  //     this.tableData = this.trapezoidTabsTable.find( item => item.tableName === response
  //   );
  // })

  this.wizardData = dependentWizardTabs;
  this.formData = dependentFormData;
  this.formSection = dependentFormSections;
  this.sharedService.selectedTabLabel$.subscribe(response => {
    this.tableData = this.trapezoidTabsTable.find( item => item.tableName === response
  );
})

}
}
