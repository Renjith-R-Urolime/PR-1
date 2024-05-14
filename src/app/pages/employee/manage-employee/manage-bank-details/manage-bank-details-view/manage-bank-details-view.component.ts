import { Component, ViewEncapsulation } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FieldConfig, Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { DataTable } from 'src/app/shared/ui/data-table-list/data-table-list';
// import { DetailsCardMeta } from 'src/app/shared/meta-interface';
// import { TrazepoidTabsMeta } from 'src/app/shared/ui/tab-data-table/trapezoid-tabs';
import { DetailsCardMeta, FormMeta, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { WizardTabs } from 'src/app/shared/ui/wizard-tabs/wizard-tabs';
// import { manageSalaryFormData, manageSalaryFormSections, manageSalaryWizardTabs } from '../../manage-salary/manage-salary.data';
import { detailsCardList, tabs, trapezoidTabTableData } from '../manage-bank-details.data';

@Component({
  selector: 'app-manage-bank-details-view',
  templateUrl: './manage-bank-details-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./manage-bank-details-view.component.scss']
})
export class ManageBankDetailsViewComponent {

  // wizardData: WizardTabs = manageSalaryWizardTabs;
  // formSection: Sections=manageSalaryFormSections;
  // formData: FormMeta =manageSalaryFormData;

  detailsCardList: DetailsCardMeta[] = detailsCardList;
  trapezoidTabs: TrazepoidTabsMeta[]= tabs;
  trapezoidTabsTable = trapezoidTabTableData;
  tableData: DataTable;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.selectedTabLabel$.subscribe(response => {
      this.tableData = this.trapezoidTabsTable.find(item => item.tableName === response
      );
    })
  }

}
