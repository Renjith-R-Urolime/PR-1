import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { formData, formSections, shiftFormData } from '../manage-shift.data';

@Component({
  selector: 'app-manage-shift-form',
  templateUrl: './manage-shift-form.component.html',
  styleUrls: ['./manage-shift-form.component.scss']
})
export class ManageShiftFormComponent {
  manageShiftForm: FormGroup;
  shiftForm: FormGroup;
  shiftMeta: any = shiftFormData;
  shiftToggle: boolean[] = Array.from({ length: shiftFormData.labels.length }, (_, index) =>
    false
  );
  isProcessing: boolean = false;
  submit: boolean = false;
  theme: string = this.sharedService.getTheme();
  manageFormReview: any;
  classificationReview: any;
  selectedEmployee: any;
  constructor(private apiService: ApiService, private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private dynamicFormService: DynamicFormService, public sharedService: SharedService, private _location: Location) {
  }
  @ViewChild('customTemplate') customTemplate: TemplateRef<any>;
  id: any;
  col = 6;
  isLoading: boolean = false;
  formData: any = formData;
  private routeSub: Subscription | undefined;
  formSections: Sections = formSections;
  detectedError: boolean;
  formTemplateRef: TemplateRef<any>;
  activeTemplateName: string;
  formTemplate: null;


  ngOnInit() {
    this.manageShiftForm = this.dynamicFormService.createControl(this.formData)
    this.shiftForm = this.dynamicFormService.createControl(this.shiftMeta);
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    if (this.id) {
      this.isLoading = true;

      this.apiService.get(`core-hr/employee/manage-shift-calendar/${this.id}`).subscribe({
        next: (res: any) => {
          if (res) {


            this.manageShiftForm.patchValue({
              "employeeId":res?.data?.employee?.id,
              "effectiveDate":format(new Date(res?.data?.effectiveDate), 'yyyy/MM/dd')
            })
            this.selectedEmployee = {
              "workCalendar": res?.data?.workCalendar,
              "shift": res?.data?.shift,

            }
            this.shiftForm.patchValue({
              "workCalendarId": res?.data?.workCalendar?.id,
              "shiftId": res?.data?.shift?.id,

            });
            this.classificationReview = {
              "workCalendarId": res?.data?.workCalendar?.name,
              "shiftId": res?.data?.shift?.name,

            }
            this.isLoading = false;
            this.cdRef.detectChanges();
          }
        }, error: (error: any) => {
          this.detectedError = true;
          this.isLoading = false;
          this.cdRef.detectChanges();

          console.error(error);

        }


      });
    }
  }

  fetchEmployeeDetails(event) {

    this.selectedEmployee = event;
    this.shiftForm.reset();

    this.shiftForm.patchValue({
      "workCalendarId": event?.workCalendar?.id,
      "shiftId": event?.shift?.id,

    });
    this.classificationReview = {
      "workCalendarId": event?.workCalendar?.name,
      "shiftId": event?.shift?.name,

    }
  }

  onSubmit() {
    // --------success popup page--------

    this.isProcessing = true;
    this.submit = true;
    if (this.manageShiftForm.invalid) {

      this.isProcessing = false;
      return;
    }
    else {
      this.submit = false;
      if (!this.id) {
        let data = { ...this.manageShiftForm.value, ...this.shiftForm.value };
        this.apiService.post(`core-hr/employee/manage-shift-calendar`, data, 'Manage Shift').subscribe({
          next: (res: any) => {
            if (res) {

              this.isProcessing = false;
              this.cdRef.detectChanges();
              this.sharedService.handleSuccessModel({ id: res._id });
            }
          },
          error: (error: any) => {
            this.detectedError = true;
            this.cdRef.detectChanges();
            console.error(error);
          }
        }
        );
      }
      else {
        const data = { ...this.dynamicFormService.getUpdatedData(this.manageShiftForm), ...this.shiftForm.value,...this.manageShiftForm.value }
        this.apiService.put(`core-hr/employee/manage-shift-calendar/${this.id}`, data, 'Manage Shift').subscribe({
          next: (res: any) => {
            if (res) {
              this.isProcessing = false;
              this.cdRef.detectChanges();
              this.sharedService.handleSuccessModel({ id: this.id });
            }
            else {
              this.isProcessing = false;
              this.cdRef.detectChanges();
            }
          },
          error: (error: any) => {
            this.detectedError = true;
            this.isProcessing = false;
            this.cdRef.detectChanges();
            console.error(error);
          }
        });
      }
    }

  }

  getFormTemplate(template: TemplateRef<any>, name: string) {
    this.manageFormReview = {
      "employeeId": this.selectedEmployee?.firstName + " " + this.selectedEmployee?.lastName ?? 'Not Available',
      "effectiveDate": this.manageShiftForm.value.effectiveDate ?? 'Not Available',

    }
    this.formTemplateRef = template
    this.activeTemplateName = name
  }
  onDrawerSave(event) {



    this.onSubmit();
  }

  onDrawerCancel(event) {

    this.formTemplate = null;

  }
  toggleCheckbox(event, index,name) {
    this.shiftToggle[index] = event.target.checked;
    if(!event.target.checked){
      if(index === 0){
        this.shiftForm.patchValue({
          "workCalendarId": this.selectedEmployee?.workCalendar?.id,
        });
        this.classificationReview['workCalendarId'] = this.selectedEmployee?.workCalendar?.name;
      }
      else if(index === 1){
        this.shiftForm.patchValue({
          "shiftId": this.selectedEmployee?.shift?.id,
        });
        this.classificationReview['shiftId'] = this.selectedEmployee?.shift?.name;
      }

    }
  }
  onDropdownChange(name, event) {

    this.classificationReview[name] = event?.name;
  }

  goBack() {
    this._location.back();
  }
  onDateSelected(selectedDate: Date) {


  }
}

