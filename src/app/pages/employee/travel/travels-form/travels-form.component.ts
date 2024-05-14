import { Component, ViewEncapsulation } from '@angular/core';
import { FormMeta } from 'src/app/shared/meta-interface';
import { WizardService } from 'src/app/shared/services/wizard.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { WizardTabs } from 'src/app/shared/ui/wizard-tabs/wizard-tabs';
import { formSections, travelFormData, wizardTabs } from '../travel.data';

@Component({
  selector: 'app-travels-form',
  templateUrl: './travels-form.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./travels-form.component.scss']
})
export class TravelsFormComponent {
  currentStep: any;
  formData:  FormMeta  = travelFormData
  wizardData: WizardTabs = wizardTabs;
 // createTableData:CreateTable[]=createTableData;
  formSections:Sections=formSections;

  constructor(private wizardService: WizardService) { }

  ngOnInit() {
    this.wizardService.currentStep$.subscribe(currentStep => {
      // Use the currentStep value as needed
      this.currentStep = currentStep

      // Perform your logic or update the component based on the currentStep value
    });


  }
}
