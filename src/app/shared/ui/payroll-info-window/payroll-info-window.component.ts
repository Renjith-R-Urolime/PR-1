import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { WizardService } from '../../services/wizard.service';

@Component({
  selector: 'app-payroll-info-window',
  templateUrl: './payroll-info-window.component.html',
  styleUrls: ['./payroll-info-window.component.scss']
})
export class PayrollInfoWindowComponent  implements OnInit{
  theme: string = this.sharedService.getTheme();
  @Input() EmployeePayrollInfoData
  currentStep: any;
  constructor(private sharedService: SharedService, private wizardService: WizardService) { }

  ngOnInit(): void {



    this.wizardService.currentStep$.subscribe(currentStep => {
      // Use the currentStep value as needed
      this.currentStep = currentStep
      // Perform your logic or update the component based on the currentStep value
    });

  }
}
