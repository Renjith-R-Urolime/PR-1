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
import { classificationFormData, formData, formSections } from '../manage-classification.data';
// import { formSections, manageClasificationFormData } from '../subsidiary.data';

@Component({
  selector: 'app-manage-classification-form',
  templateUrl: './manage-classification-form.component.html',
  styleUrls: ['./manage-classification-form.component.scss']
})
export class ManageClassificationFormComponent {
  manageClasificationForm: FormGroup;
  classificationForm: FormGroup;
  classificationMeta: any = classificationFormData;
  classificationToggle: boolean[] = Array.from({ length: classificationFormData.labels.length }, (_, index) =>
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
    this.manageClasificationForm = this.dynamicFormService.createControl(this.formData)
    this.classificationForm = this.dynamicFormService.createControl(this.classificationMeta);
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    if (this.id) {
      this.isLoading = true;

      this.apiService.get(`core-hr/employee/manage-classification/${this.id}`).subscribe({
        next: (res: any) => {
          if (res) {
            this.manageClasificationForm.patchValue({
              "employeeId":res?.data?.employee?.id,
              "effectiveDate":format(new Date(res?.data?.effectiveDate), 'yyyy/MM/dd')
            })
            this.selectedEmployee = {
              "subsidiary": res?.data?.userSubsidiary,
              "sponserSubsidiary": res?.data?.sponsorSubsidiary,
              "expenseSubsidiary": res?.data?.expenseSubsidiary,
              "location": res?.data?.location,
              "department": res?.data?.department,
              "class": res?.data?.class,
              "employeeType": res?.data?.employeeType,
              "employeeCategory": res?.data?.employeeCategory,
              "grade": res?.data?.grade,
              "designation": res?.data?.designation,
              "firstName":res?.data?.employee?.firstName,
              "lastName":res?.data?.employee?.lastName
            }
            this.classificationForm.patchValue({
              "userSubsidiaryId": res?.data?.userSubsidiary?.id,
              "sponsorSubsidiaryId": res?.data?.sponsorSubsidiary?.id,
              "expenseSubsidiaryId": res?.data?.expenseSubsidiary?.id,
              "locationId": res?.data?.location?.id,
              "departmentId": res?.data?.department?.id,
              "classId": res?.data?.class?.id,
              "employeeTypeId": res?.data?.employeeType?.id,
              "employeeCategoryId": res?.data?.employeeCategory?.id,
              "gradeId": res?.data?.grade?.id,
              "designationId": res?.data?.designation?.id
            });
            this.classificationReview = {
              "userSubsidiaryId": res?.data?.userSubsidiary?.name,
              "sponsorSubsidiaryId": res?.data?.sponsorSubsidiary?.name,
              "expenseSubsidiaryId": res?.data?.expenseSubsidiary?.name,
              "locationId": res?.data?.location?.name,
              "departmentId": res?.data?.department?.name,
              "classId": res?.data?.class?.name,
              "employeeTypeId": res?.data?.employeeType?.name,
              "employeeCategoryId": res?.data?.employeeCategory?.name,
              "gradeId": res?.data?.grade?.name,
              "designationId": res?.data?.designation?.name
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
    this.classificationForm.reset();

    this.classificationForm.patchValue({
      "userSubsidiaryId": event?.subsidiary?.id,
      "sponsorSubsidiaryId": event?.sponserSubsidiary?.id,
      "expenseSubsidiaryId": event?.expenseSubsidiary?.id,
      "locationId": event?.location?.id,
      "departmentId": event?.department?.id,
      "classId": event?.class?.id,
      "employeeTypeId": event?.employeeType?.id,
      "employeeCategoryId": event?.employeeCategory?.id,
      "gradeId": event?.grade?.id,
      "designationId": event?.designation?.id,
    });
    this.classificationReview = {
      "userSubsidiaryId": event?.subsidiary?.name,
      "sponsorSubsidiaryId": event?.sponserSubsidiary?.name,
      "expenseSubsidiaryId": event?.expenseSubsidiary?.name,
      "locationId": event?.location?.name,
      "departmentId": event?.department?.name,
      "classId": event?.class?.name,
      "employeeTypeId": event?.employeeType?.name,
      "employeeCategoryId": event?.employeeCategory?.name,
      "gradeId": event?.grade?.name,
      "designationId": event?.designation?.name,
    }
  }

  onSubmit() {
    // --------success popup page--------

    this.isProcessing = true;
    this.submit = true;
    if (this.manageClasificationForm.invalid) {

      this.isProcessing = false;
      return;
    }
    else {
      this.submit = false;
      if (!this.id) {
        let data = { ...this.manageClasificationForm.value, ...this.classificationForm.value };
        this.apiService.post(`core-hr/employee/manage-classification`, data, 'Manage Classification').subscribe({
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
        const data = { ...this.dynamicFormService.getUpdatedData(this.manageClasificationForm), ...this.classificationForm.value,...this.manageClasificationForm.value }


        this.apiService.put(`core-hr/employee/manage-classification/${this.id}`, data, 'Manage Classification').subscribe({
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
      "effectiveDate": this.manageClasificationForm.value.effectiveDate ?? 'Not Available',

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
    this.classificationToggle[index] = event.target.checked;
    if(!event.target.checked){
      if(index === 0){
        this.classificationForm.patchValue({
          "userSubsidiaryId": this.selectedEmployee?.subsidiary?.id,
        });
        this.classificationReview['userSubsidiaryId'] = this.selectedEmployee?.subsidiary?.name;
      }
      else if(index === 1){
        this.classificationForm.patchValue({
          "sponsorSubsidiaryId": this.selectedEmployee?.sponserSubsidiary?.id,
        });
        this.classificationReview['sponsorSubsidiaryId'] = this.selectedEmployee?.sponserSubsidiary?.name;
      }
      else if(index === 2){
        this.classificationForm.patchValue({
          "expenseSubsidiaryId": this.selectedEmployee?.expenseSubsidiary?.id,
        });
        this.classificationReview['expenseSubsidiaryId'] = this.selectedEmployee?.expenseSubsidiary?.name;
      }
      else if(index === 3){
        this.classificationForm.patchValue({
          "locationId": this.selectedEmployee?.location?.id,
        });
        this.classificationReview['locationId'] = this.selectedEmployee?.location?.name;
      }
      else if(index === 4){
        this.classificationForm.patchValue({
          "departmentId": this.selectedEmployee?.department?.id,
        });
        this.classificationReview['departmentId'] = this.selectedEmployee?.department?.name
      }
      else if(index === 5){
        this.classificationForm.patchValue({
          "classId": this.selectedEmployee?.class?.id,
        });
        this.classificationReview['classId'] = this.selectedEmployee?.class?.name;
      }
      else if(index === 6){
        this.classificationForm.patchValue({
          "employeeTypeId": this.selectedEmployee?.employeeType?.id,
        });
        this.classificationReview['employeeTypeId'] = this.selectedEmployee?.employeeType?.name;
      }
      else if(index === 7){
        this.classificationForm.patchValue({
          "employeeCategoryId": this.selectedEmployee?.employeeCategory?.id,
        });
        this.classificationReview['employeeCategoryId'] = this.selectedEmployee?.employeeCategory?.name;
      }
      else if(index === 8){
        this.classificationForm.patchValue({
          "gradeId": this.selectedEmployee?.grade?.id,
        });
        this.classificationReview['gradeId'] = this.selectedEmployee?.grade?.name;
      }
      else if(index === 9){
        this.classificationForm.patchValue({
          "designationId": this.selectedEmployee?.designation?.id,
        });
        this.classificationReview['designationId'] =  this.selectedEmployee?.designation?.name;
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
