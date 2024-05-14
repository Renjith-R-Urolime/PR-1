import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { DataTable } from 'src/app/shared/ui/data-table-list/data-table-list';

import { DetailsCardMeta, FormMeta, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { WizardTabs } from 'src/app/shared/ui/wizard-tabs/wizard-tabs';
import { detailsCardList, manageEmployeeFormData, manageEmployeeFormSections, manageEmployeeWizardTabs, tabs, trapezoidTabTableData, } from '../manage-employee.data';


@Component({
  selector: 'app-manage-employee-view',
  templateUrl: './manage-employee-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./manage-employee-view.component.scss']
})
export class ManageEmployeeViewComponent implements OnInit{

  id = 1;

  detailsCardList: DetailsCardMeta[] = detailsCardList;
  tableData: DataTable;

  wizardData: WizardTabs = manageEmployeeWizardTabs;
  formData: FormMeta []= manageEmployeeFormData;
  formSection: Sections = manageEmployeeFormSections;
  moduleTableData = trapezoidTabTableData
  trapezoidTabs: TrazepoidTabsMeta[]= tabs;


  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    //  this.wizardData = departmentWizardTabs;
    //   this.formData = departmentFormData;
    //   this.formSection = departmentFormSections;
    //   this.sharedService.selectedTabLabel$.subscribe(response => {
    //     this.tableData = this.trapezoidTabsTable.find( item => item.tableName === response
    //   );
    // })

    // this.wizardData = dependentWizardTabs;
    // this.formData = dependentFormData;
    // this.formSection = dependentFormSections;
    this.sharedService.selectedTabLabel$.subscribe(response => {
      //   this.tableData = this.trapezoidTabsTable.find( item => item.tableName === response
      // );


    })

  }

}
