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
import { jurisdictionFormData, jurisdictionFormSections } from '../../jurisdiction/jurisdiction.data';


@Component({
  selector: 'app-jurisdiction-form',
  templateUrl: './jurisdiction-form.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./jurisdiction-form.component.scss']
})
export class JurisdictionFormComponent {
  jurisdictionForm: FormGroup;
  isProcessing: boolean = false;
  subListLoading:boolean = true;
  submit: boolean = false;
  theme: string = this.sharedService.getTheme();
  detectedError:boolean;
  jurisdictionData: any;
  currencyCondition: string[] = []
  subsidiaryFilter: string[]=[];



  constructor(
    private router:Router,
    private apiService: ApiService, private modalService: NgbModal,private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private dynamicFormService: DynamicFormService, public sharedService: SharedService, private _location: Location) { }

  id;
  col = 6;
  isLoading: boolean = false;
  formData: any = jurisdictionFormData;
  private routeSub: Subscription | undefined;
  formSections: Sections = jurisdictionFormSections;
  private modalRef: NgbModalRef;

  ngOnInit() {
    this.jurisdictionForm = this.dynamicFormService.createControl(this.formData)
    this.routeSub = this.route.params.subscribe(params => {
      // Access route parameters here
      this.id = params['id'];

    });
    if (this.id) {
      this.isLoading = true;
      this.apiService.get(`core-hr/organisation/jurisdiction/${this.id}`).subscribe((res: any) => {
        if (res) {

          this.jurisdictionData = res.data;
          this.jurisdictionForm.patchValue(res.data)
          this.isLoading = false;
          this.cdRef.detectChanges();
        }
      });
    }


    this.jurisdictionForm.controls.name.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(() => {
      if (!this.id) {
          this.jurisdictionForm.patchValue({
            "displayName": this.jurisdictionForm.value.name
          });
      }
    });


  }

  onCountryChange(event) {
    this.subsidiaryFilter= [`country=${event.id}`]
    /* if (this.jurisdictionForm.value.country) {
      this.jurisdictionForm.get('currency').enable();
    }
    else {
      this.jurisdictionForm.get('currency').disable();
    } */
    this.currencyCondition = [`id=${event.id}`]
    this.jurisdictionForm.patchValue({
      currency: this.jurisdictionForm.value.country
    })
  }
  onCurrencyChange() {
    if (this.jurisdictionForm.value.country !== this.jurisdictionForm.value.currency) {
      alert("Currency not matching with country")
      this.jurisdictionForm.patchValue({
        currency: this.jurisdictionForm.value.country
      })
    }
  }
  onSubmit() {

    this.isProcessing = true;
    this.submit = true;
    if (this.jurisdictionForm.invalid) {

      this.isProcessing = false;
      return;
    }
    else {
      this.submit = false;
      let data = this.jurisdictionForm.value;
      data.createdBy = 1
      if (!this.id) {
        this.apiService.post(`core-hr/organisation/jurisdiction`, data,'jurisdiction').subscribe({
          next:(res:any)=>{
            if (res) {

              this.isProcessing = false;
              this.cdRef.detectChanges();
              this.sharedService.handleSuccessModel({ id: res._id });
            }
          },
          error:(error:any)=>{
            this.isProcessing = false;
            this.detectedError=true;
            this.cdRef.detectChanges();
            console.error(error);

          }
        }
        );
      }
      else {
        data = this.dynamicFormService.getUpdatedData(this.jurisdictionForm)

        this.apiService.put(`core-hr/organisation/jurisdiction/${this.id}`, data,'jurisdiction').subscribe({
          next:(res:any)=>{
            if (res) {

            this.isProcessing = false;
            this.cdRef.detectChanges();
            this.sharedService.handleSuccessModel({ id: this.id });
          }},
        error:(error:any)=>{
          this.isProcessing = false;
          this.detectedError=true;
          this.cdRef.detectChanges();
          console.error(error);

        }
      }
      );
      }
    }
  }
  onCancel() {
    this._location.back();
  }
  // onChange() {
  //   const displayNameControl = this.jurisdictionForm.get('displayName');
  //   if (displayNameControl.value === "") {
  //     displayNameControl.setValue(this.jurisdictionForm.value.name);
  //
  //   }

  // }
}
