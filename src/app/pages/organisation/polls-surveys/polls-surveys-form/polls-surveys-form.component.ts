import { Component, ViewEncapsulation } from '@angular/core';
import { WizardService } from 'src/app/shared/services/wizard.service';
import { FieldConfig, Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { WizardTabs } from 'src/app/shared/ui/wizard-tabs/wizard-tabs';
import { pollDetailsFormData, pollsFormSections, pollsWizardTabs } from '../polls-surveys.data';

@Component({
  selector: 'app-polls-surveys-form',
  templateUrl: './polls-surveys-form.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./polls-surveys-form.component.scss']
})
export class PollsSurveysFormComponent {
  constructor( private wizardService: WizardService) { }
  currentStep: any;
  formData: FieldConfig = pollDetailsFormData
  wizardData: WizardTabs = pollsWizardTabs;
  // trapezoidTabs:TrazepoidTabsMeta =batchTabs;
  // createTableData:CreateTable[]=createTableData;
  formSections:Sections=pollsFormSections;

  ngOnInit() {
    this.wizardService.currentStep$.subscribe(currentStep => {
      // Use the currentStep value as needed
      this.currentStep = currentStep

      // Perform your logic or update the component based on the currentStep value
    });
  }
}
