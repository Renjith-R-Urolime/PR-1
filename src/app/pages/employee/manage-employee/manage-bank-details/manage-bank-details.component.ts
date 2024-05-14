import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FieldConfig, Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { DataTable } from 'src/app/shared/ui/data-table-list/data-table-list';

import { WizardTabs } from 'src/app/shared/ui/wizard-tabs/wizard-tabs';
// import { manageSalaryFormData, manageSalaryFormSections, manageSalaryWizardTabs } from './manage-bank-details.data';
import { dataTableList, detailsCardList, tabs, trapezoidTabTableData } from './manage-bank-details.data';
import { DetailsCardMeta, FormMeta, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';

@Component({
  selector: 'app-manage-bank-details',
  templateUrl: './manage-bank-details.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./manage-bank-details.component.scss']
})
export class ManageBankDetailsComponent implements OnInit {


  // wizardData: WizardTabs = manageSalaryWizardTabs;
  // bankDetailsFormData: FormMeta = manageSalaryFormData;
  // formSection: Sections = manageSalaryFormSections;
  moduleTableData: DataTable = dataTableList;

  detailsCardList: DetailsCardMeta[] = detailsCardList;
  trapezoidTabs: TrazepoidTabsMeta[]= tabs;
  trapezoidTabsTable: DataTable[] = trapezoidTabTableData;
  tableData: DataTable;



  constructor() { }

  ngOnInit() {
    //
  }
}
