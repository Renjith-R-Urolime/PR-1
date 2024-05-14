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
import { classFormData, classFormSections } from '../class.data';
@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./class-form.component.scss']
})
export class ClassFormComponent {
  classForm: FormGroup;
  typeSelect: any = 'normal'
  isProcessing: boolean = false;
  subListLoading: boolean = true;
  parentListLoading = true;
  submit: boolean = false;
  theme: string = this.sharedService.getTheme();
  currentStep: any;
  constructor(private router: Router, private modalService: NgbModal, private apiService: ApiService, private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private dynamicFormService: DynamicFormService, public sharedService: SharedService, private _location: Location) { }
  id: any;
  countries = [];
  classList = [];
  classParentList = [];
  subsidiaryList = [];
  col = 6;
  isLoading: boolean;
  formData: any = classFormData;
  classData: any;
  options = [];
  formName: any;
  private modalRef: NgbModalRef;
  detectedError: boolean;
  saveAsDraftForm: any = {};
  subsidiaryFilter: string[] = [];
  private routeSub: Subscription | undefined;
  formSections: Sections = classFormSections;

  ngOnInit() {

    this.classForm = this.dynamicFormService.createControl(this.formData)

    this.routeSub = this.route.params.subscribe(params => {
      // Access route parameters here
      this.id = params['id'];


    });
    if (this.id) {
      this.isLoading = true;
      this.apiService.get(`core-hr/organisation/class/${this.id}`).subscribe((res: any) => {
        if (res) {

          this.classData = res.data;
          this.classForm.patchValue(res.data)
          // this.classForm.patchValue({
          //   "parentClassId":res.data.parentClassId.toString(),
          //   "subsidiary":res.data.subsidiary.map(item => item.id.toString())
          // })
          this.isLoading = false;

          this.cdRef.detectChanges();
        }

      });
    }
    this.classForm.controls.name.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      if (!this.id) {
          this.classForm.patchValue({
            "displayName": this.classForm.value.name
          })
      }
    })
  }

  onCountryChange(event){

    this.subsidiaryFilter = [`country=${event.id}`]

    // if(this.classForm.value.country){
    //   this.classForm.get('currency').enable();
    // }
    // else {
    //   this.classForm.get('currency').disable();
    // }
    this.classForm.patchValue({
      currency:this.classForm.value.country
    })
  }

  onCurrencyChange() {
    if (this.classForm.value.country !== this.classForm.value.currency) {
      alert("Currency not matching with country")
      this.classForm.patchValue({
        currency: this.classForm.value.country
      })
    }
  }
  onSubmit() {

    this.isProcessing = true;
    this.submit = true;
    if (this.classForm.invalid) {

      this.isProcessing = false;
      return;
    }
    else {
      this.submit = false;
      let data = this.classForm.value;
      data.createdBy = 1
      if (!this.id) {
        this.apiService.post(`core-hr/organisation/class`, data, 'class').subscribe({
          next: (res: any) => {
            if (res) {

              this.isProcessing = false;
              this.cdRef.detectChanges();
              this.sharedService.handleSuccessModel({ id: res._id });

            }
          },
          error: (error: any) => {
            this.isProcessing = false;
            this.detectedError = true;
            this.cdRef.detectChanges();
            console.error(error);

          }
        }
        );
      }
      else {
        data = this.dynamicFormService.getUpdatedData(this.classForm)
        this.apiService.put(`core-hr/organisation/class/${this.id}`, data, 'class').subscribe({
          next: (res: any) => {
            if (res) {

              this.isProcessing = false;
              this.cdRef.detectChanges();
              this.sharedService.handleSuccessModel({ id: this.id });

            }
            else {
              this.isProcessing = false;
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
  // onSaveAsDraft() {
  //   let data: any;
  //   if (!this.classForm.invalid) {
  //     this.saveAsDraftForm = { ...this.classForm.value };
  //     this.saveAsDraftForm['isDraft'] = true;
  //   }
  //   else {
  //
  //   }
  //   if (!this.classForm.invalid) {
  //     data = this.saveAsDraftForm;
  //
  //     data.createdBy = 1
  //     if (!this.id) {
  //       this.apiService.post(`core-hr/organisation/class`, data).subscribe({
  //         next: (res: any) => {
  //           if (res) {
  //             this.isProcessing = false;
  //             this.cdRef.detectChanges();
  //             //   this._location.back();

  //             this.sharedService.handleSuccessModel({ id: res._id });
  //           }
  //         },
  //         error: (error: any) => {
  //           this.detectedError = true;
  //           this.isProcessing = false;
  //           this.cdRef.detectChanges();

  //
  //         }
  //       }
  //       );
  //     }
  //   }
  // }

  onCancel() {
    this._location.back();
  }
  // onChange() {
  //   const displayNameControl = this.classForm.get('displayName');
  //   if (displayNameControl.value === "") {
  //     displayNameControl.setValue(this.classForm.value.name);
  //
  //   }

  // }
}
