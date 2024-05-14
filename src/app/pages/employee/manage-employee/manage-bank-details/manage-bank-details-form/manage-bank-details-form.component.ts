import { Component, ViewEncapsulation } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { WizardService } from 'src/app/shared/services/wizard.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { DataTable } from 'src/app/shared/ui/data-table-list/data-table-list';

import { DetailsCardMeta, FormMeta, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { WizardTabs } from 'src/app/shared/ui/wizard-tabs/wizard-tabs';
import { detailsCardList, manageBankDetailsFormData, manageBankDetailsFormSections, manageBankDetailsWizardTabs, tabs, trapezoidTabTableData } from '../manage-bank-details.data';

@Component({
  selector: 'app-manage-bank-details-form',
  templateUrl: './manage-bank-details-form.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./manage-bank-details-form.component.scss']
})
export class ManageBankDetailsFormComponent {

  // @Input() trapezoidTabs: any;
  // @Input() trapezoidTabsTable: any;
  // @Input() formSection: Sections;

  constructor( private wizardService: WizardService, private sharedService:SharedService) { }
  currentStep: any;
  bankDetailsFormData: FormMeta = manageBankDetailsFormData;
  wizardData: WizardTabs = manageBankDetailsWizardTabs;
  // trapezoidTabs:TrazepoidTabsMeta =batchTabs;
  // createTableData:CreateTable[]=createTableData;
  formSections:Sections=manageBankDetailsFormSections;

  detailsCardList: DetailsCardMeta[] = detailsCardList;
  trapezoidTabs: TrazepoidTabsMeta[]= tabs;
  trapezoidTabsTable: DataTable[] = trapezoidTabTableData;
  tableData: DataTable;




  ngOnInit() {
    this.wizardService.currentStep$.subscribe(currentStep => {
      // Use the currentStep value as needed
      this.currentStep = currentStep

      // Perform your logic or update the component based on the currentStep value
    });


    //this.wizardData = dependentWizardTabs;
    //this.formData = dependentFormData;
    //this.formSection = dependentFormSections;
    this.sharedService.selectedTabLabel$.subscribe(response => {
      this.tableData = this.trapezoidTabsTable.find( item => item.tableName === response
    );
  })



  }

}
