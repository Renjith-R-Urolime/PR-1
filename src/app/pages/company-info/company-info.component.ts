import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { WizardService } from 'src/app/shared/services/wizard.service';
import { FieldConfig, Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { WizardTabs } from 'src/app/shared/ui/wizard-tabs/wizard-tabs';
import { companyFormData, formSections, wizardTabs } from './company-info.data';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent {
  constructor( private wizardService: WizardService,
    private sharedService: SharedService,  private router: Router,) { }
  theme: string = this.sharedService.getTheme();
  @Input() isProceesing: boolean = false;

  companyInfoForm : FormGroup;



  currentStep: any;
 title= "Company Information";
  companyInfo = true;
  formData: FieldConfig = companyFormData;
  wizardData: WizardTabs = wizardTabs;
  formSections:Sections=formSections;

  @Output() submitEvent: EventEmitter<void> = new EventEmitter<void>();

  onSubmit() {
    this.isProceesing = true;
    this.submitEvent.emit();
    setTimeout(() => {
      this.isProceesing = false;
        this.router.navigate(['/dashboard']);

    }, 3000);
  }
  cancel(){
    this.router.navigate(['/dashboard']);

  }

}
