import { Component, ViewEncapsulation } from '@angular/core';
import { payrollOffBoardFormData, payrollOffBoardTableData, payrollOffBoardformSections, payrollOffBoardwizardTabs } from './payroll-offboard.data';

@Component({
  selector: 'app-payroll-offboard',
  templateUrl: './payroll-offboard.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./payroll-offboard.component.scss']
})
export class PayrollOffboardComponent {
  wizardData = payrollOffBoardwizardTabs;
  formData = payrollOffBoardFormData;
  formSection = payrollOffBoardformSections;
  moduleTableData = payrollOffBoardTableData


}
