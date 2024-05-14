import { Component, ViewEncapsulation } from '@angular/core';
import { dataTableList, manageEmployeeFormData, manageEmployeeFormSections, manageEmployeeWizardTabs, tabs, trapezoidTabTableData } from '../manage-employee/manage-employee.data';
import { TrazepoidTabsMeta } from 'src/app/shared/meta-interface';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./manage-employee.component.scss']
})
export class ManageEmployeeComponent {
  wizardData = manageEmployeeWizardTabs;
  formData = manageEmployeeFormData;
  formSection = manageEmployeeFormSections;
  trapezoidTableData = trapezoidTabTableData
  moduleTableData = dataTableList;
  trapezoidTabs: TrazepoidTabsMeta[]= tabs;

}
