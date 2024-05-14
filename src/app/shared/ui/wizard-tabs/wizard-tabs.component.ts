import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from '../../services/shared.service';
import { WizardService } from '../../services/wizard.service';
import { WizardTabs } from './wizard-tabs';

@Component({
  selector: 'app-wizard-tabs',
  templateUrl: './wizard-tabs.component.html',
  styleUrls: ['./wizard-tabs.component.scss']
})
export class WizardTabsComponent implements OnInit, OnDestroy {
  theme: string = this.sharedService.getTheme();
  @Input() wizardData: WizardTabs;
  @Input() disableSwitch: any;
  @Input() isSwitchRequired: boolean = true;
  formsCount = 10;
  currentStep$ = new BehaviorSubject<number>(1);
  constructor(private elementRef: ElementRef, private sharedService: SharedService, private cdRef: ChangeDetectorRef, private wizardService: WizardService) { }
  isLoading: boolean;
  activeStep: number;
  @Output() switchTab = new EventEmitter<number>();

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.cdRef.detectChanges();
    }, 1000);
    this.wizardService.currentStep$.subscribe(currentStep => {
      this.currentStep$.next(currentStep);
      this.setActiveStep(currentStep);
    });
  }
  setActiveStep(step: number): void {
    this.activeStep = step;
    this.cdRef.detectChanges();
  }
  setCurrentStep(step: number, stepId: string): void {
    if (!this.disableSwitch ) {
      this.switchTab.emit(step);

      if(this.isSwitchRequired){
        this.wizardService.setCurrentStep(step);
      this.setActiveStep(step);
      const stepElement = this.elementRef.nativeElement.querySelector(`#${stepId}`);

      if (stepElement) {
        stepElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      }
    }
  }
  // getStepperItemWidth(): string {
  //   const itemCount = this.wizardData.length;
  //   if (itemCount === 2) {
  //     return '747px';
  //   } else if (itemCount === 3) {
  //     return '500px';
  //   } else {
  //     return 'default-width'; // Set a default width for other lengths if needed
  //   }
  // }

  ngOnDestroy() {
    this.wizardService.resetSettings();
  }
}

