
import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, debounceTime } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { departmentFormData, departmentFormSections } from '../../department/department.data';
@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent {

  departmentForm: FormGroup;
  isProcessing: boolean = false;
  submit: boolean = false;
  theme: string = this.sharedService.getTheme();
  detectedError: boolean;
  private modalRef: NgbModalRef;

  subsidiaryFilter: string[] = [];

  constructor(
    private router: Router,
    private apiService: ApiService, private modalService: NgbModal, private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private dynamicFormService: DynamicFormService, public sharedService: SharedService, private _location: Location) { }
  id;
  subListLoading: boolean = true;
  parentListLoading: boolean = true;
  countries = [];
  jurisdictionList = [];
  col = 6;
  isLoading: boolean = false;
  formData: any = departmentFormData;
  departmentData: any;
  private routeSub: Subscription | undefined;
  // trapezoidTabs:TrazepoidTabsMeta =batchTabs;
  // createTableData:CreateTable[]=createTableData;
  formSections: Sections = departmentFormSections;

  //const jurisdictionList = [];
  subsidiaryLabels: any;



  formName: any;
  subsidiaryList = [];
  departmentList = [];

  ngOnInit() {

    if (this.router.url.split('/')[3].toLocaleLowerCase() == 'create') {
      this.formName = ['Create'];
    }
    if (this.router.url.split('/')[3].toLocaleLowerCase() == 'edit') {
      this.formName = ['Modify'];
    }

    this.subsidiaryLabels = departmentFormData.labels.filter(label => label.labelName.alias === "Subsidiary");

    if (this.subsidiaryLabels.length > 0) {
      const options = this.subsidiaryLabels[0].options;
      for (const option of options) {
        this.jurisdictionList.push(option.value);
      }
    }

    this.departmentForm = this.dynamicFormService.createControl(this.formData)
    this.routeSub = this.route.params.subscribe(params => {
      // Access route parameters here
      this.id = params['id'];



    });
    if (this.id) {
      this.isLoading = true;

      this.apiService.get(`core-hr/organisation/department/${this.id}`).subscribe((res: any) => {
        if (res) {
          this.departmentData = res.data;

          this.departmentForm.patchValue(res.data)
          this.isLoading = false;
          this.cdRef.detectChanges();
        }

      });
    }

    this.departmentForm.controls.name.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      if (!this.id) {
        this.departmentForm.patchValue({
          "displayName": this.departmentForm.value.name,
        })
      }
    })

  }
  onCountryChange(event) {
    this.subsidiaryFilter = [`country=${event.id}`]
    // if(this.departmentForm.value.country){
    //   this.departmentForm.get('currency').enable();
    // }
    // else {
    //   this.departmentForm.get('currency').disable();
    // }
    this.departmentForm.patchValue({
      currency: this.departmentForm.value.country
    })
  }
  onCurrencyChange() {
    if (this.departmentForm.value.country !== this.departmentForm.value.currency) {
      alert("Currency not matching with country")
      this.departmentForm.patchValue({
        currency: this.departmentForm.value.country
      })
    }
  }
  onSubmit() {

    this.isProcessing = true;
    this.submit = true;
    if (this.departmentForm.invalid) {

      this.isProcessing = false;
      return;
    }
    else {
      this.submit = false;
      let data = this.departmentForm.value;
      data.createdBy = 1
      if (!this.id) {
        this.apiService.post(`core-hr/organisation/department`, data).subscribe({
          next: (res: any) => {
            if (res) {

              this.isProcessing = false;
              this.cdRef.detectChanges();
              this.sharedService.handleSuccessModel({ id: res._id });
            }
          },
          error: (error: any) => {
            this.detectedError = true;
            this.isProcessing = false;
            this.cdRef.detectChanges();
            console.error(error);

          }
        }
        );
      }
      else {
        data = this.dynamicFormService.getUpdatedData(this.departmentForm)
        this.apiService.put(`core-hr/organisation/department/${this.id}`, data).subscribe({
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
  onCancel() {
    this._location.back();
  }
  // onChange() {
  //   const displayNameControl = this.departmentForm.get('displayName');
  //   if (displayNameControl.value === "") {
  //     displayNameControl.setValue(this.departmentForm.value.name);
  //
  //   }

  // }
}
