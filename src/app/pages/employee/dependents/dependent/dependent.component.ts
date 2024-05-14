import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { SharedService } from 'src/app/shared/services/shared.service';
import { CreateTable } from 'src/app/shared/ui/create-table-list/create-table-list';
import { createTableData, dependentFormData, dependentFormSections, dependentTableData, dependentWizardTabs, tabs } from '../dependentCredentials.data';

@Component({
  selector: 'app-dependent',
  templateUrl: './dependent.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dependent.component.scss']
})

export class DependentComponent implements OnInit {

  createTableData:CreateTable[]=createTableData;
  tableData:CreateTable = createTableData[0];
  wizardData = dependentWizardTabs;
  formData = dependentFormData;
  formSection = dependentFormSections;
  moduleTableData = dependentTableData

  trapezoidTabs:TrazepoidTabsMeta[] =tabs;

  constructor(private sharedService:SharedService){}
  ngOnInit() {

    /* this.sharedService.selectedTabLabel$.subscribe(response => {
      if(response){
        this.tableData = this.createTableData.find( item => item.tableName === response
          );
      }

  }) */
}

}
