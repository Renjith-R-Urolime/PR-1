import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WizardService {
  private currentStepSubject = new BehaviorSubject<number>(1);
  currentStep$ = this.currentStepSubject.asObservable();
  private currentComponentSubject = new BehaviorSubject<string>('overview');
  private formValueSubject = new BehaviorSubject<string>('');
  formValueSource$ = this.formValueSubject.asObservable();
  currentComponent$ = this.currentComponentSubject.asObservable();
  private formArrayValueSubject = new BehaviorSubject<string>('');
  formArrayValueSource$ = this.formArrayValueSubject.asObservable();
  setCurrentStep(step: number) {
    this.currentStepSubject.next(step);
  }

  setCurrentComponent(component: string) {
    this.currentComponentSubject.next(component);
  }

   //to update form values and enable continue button
   updateData = (data: any) => {
   // const currentData: any = this.formValueSource$.value;
    const updatedData = {  ...data };
    this.formValueSubject.next(updatedData);
  };
  updateFormArrayData = (data: any) => {
    // const currentData: any = this.formValueSource$.value;
     const updatedData = {  ...data };
     this.formArrayValueSubject.next(updatedData);
   };

   resetSettings(){
    this.setCurrentStep(1);
    this.updateData('');
    this.updateFormArrayData('');
   }
}

