import { Component, ViewEncapsulation } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
// import { FieldConfig, Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { DataTable } from 'src/app/shared/ui/data-table-list/data-table-list';

// import { WizardTabs } from 'src/app/shared/ui/wizard-tabs/wizard-tabs';
// import {  payrollOffBoardFormData, payrollOffBoardformSections, payrollOffBoardwizardTabs } from '../../payroll-offboard/payroll-offboard.data';
import { detailsCardList, warningsFormData, warningsWizardTabs, warningsformSections } from '../warnings.data';
import { DetailsCardMeta } from 'src/app/shared/meta-interface';


@Component({
  selector: 'app-warnings-view',
  templateUrl: './warnings-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./warnings-view.component.scss']
})
export class WarningsViewComponent {



  detailsCardList: DetailsCardMeta[] = detailsCardList;
  // trapezoidTabs: TrazepoidTabsMeta= tabs;
  // trapezoidTabsTable: DataTable[] = trapezoidTabTableData;
  tableData: DataTable;
  constructor(private sharedService: SharedService) {

  }


  wizardData = warningsWizardTabs;
  formData = warningsFormData;
  formSection = warningsformSections;


}
