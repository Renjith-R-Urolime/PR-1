import { Component, ViewEncapsulation } from '@angular/core';
import { dataTableList, manageSubsidiaryFormData, manageSubsidiaryFormSections, manageSubsidiaryWizardTabs, tabs, trapezoidTabTableData } from './manage-subsidiary.data';
import { TrazepoidTabsMeta } from 'src/app/shared/meta-interface';


@Component({
  selector: 'app-manage-subsidiary',
  templateUrl: './manage-subsidiary.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./manage-subsidiary.component.scss']
})
export class ManageSubsidiaryComponent {


  wizardData = manageSubsidiaryWizardTabs;
  formSection = manageSubsidiaryFormSections;
  formData = manageSubsidiaryFormData;

  trapezoidTableData = trapezoidTabTableData
  moduleTableData = dataTableList;
  trapezoidTabs: TrazepoidTabsMeta[]= tabs;


}
