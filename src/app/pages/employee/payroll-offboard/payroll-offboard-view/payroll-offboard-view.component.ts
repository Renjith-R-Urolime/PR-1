import { Component, ViewEncapsulation } from '@angular/core';
import { DetailsCardMeta, FormMeta } from 'src/app/shared/meta-interface';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FieldConfig, Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { DataTable } from 'src/app/shared/ui/data-table-list/data-table-list';
import { WizardTabs } from 'src/app/shared/ui/wizard-tabs/wizard-tabs';
import { detailsCardList, payrollOffBoardFormData, payrollOffBoardformSections, payrollOffBoardwizardTabs } from '../payroll-offboard.data';

@Component({
  selector: 'app-payroll-offboard-view',
  templateUrl: './payroll-offboard-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./payroll-offboard-view.component.scss']
})
export class PayrollOffboardViewComponent {
  id=1;

  detailsCardList: DetailsCardMeta[] = detailsCardList;
  // trapezoidTabs: TrazepoidTabsMeta= tabs;
  // trapezoidTabsTable: DataTable[] = trapezoidTabTableData;
  tableData: DataTable;
  constructor(private sharedService: SharedService) {

  }
  wizardData: WizardTabs = payrollOffBoardwizardTabs;
  formData : FormMeta  = payrollOffBoardFormData;
  formSection: Sections = payrollOffBoardformSections;
}
