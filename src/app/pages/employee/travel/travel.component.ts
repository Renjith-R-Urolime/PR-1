import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormMeta } from 'src/app/shared/meta-interface';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { DataTable } from 'src/app/shared/ui/data-table-list/data-table-list';
import { WizardTabs } from 'src/app/shared/ui/wizard-tabs/wizard-tabs';
import { formSections, travelFormData, travelTableData, wizardTabs } from './travel.data';



@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./travel.component.scss']
})
export class TravelComponent {
  moduleTableData: DataTable=travelTableData;
  wizardData: WizardTabs=wizardTabs;
  formData : FormMeta =travelFormData;
  formSection: Sections=formSections;

  constructor(private SharedService: SharedService, private router: Router) {
  }


  ngOnInit() {

  alert("frg")
  }
}
