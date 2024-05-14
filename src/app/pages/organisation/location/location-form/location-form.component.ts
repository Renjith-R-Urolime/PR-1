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
import { locationFormData, locationFormSections } from '../../location/location.data';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent {
  locationForm: FormGroup;
  parentlistLoading: boolean = true;
  locationData: any;
  subListLoading: boolean = true;
  isProcessing: boolean = false;
  submit: boolean = false;
  isPhoneValid: boolean = true;
  theme: string = this.sharedService.getTheme();
  private modalRef: NgbModalRef;
  currencyCondition: string[] = []
  subsidiaryFilter: string[] = [];
  constructor(
    private router: Router,
    private apiService: ApiService, private modalService: NgbModal, private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private dynamicFormService: DynamicFormService, public sharedService: SharedService, private _location: Location) { }
  id;
  col = 6;
  isLoading: boolean = false;
  formData: any = locationFormData;
  private routeSub: Subscription | undefined;
  // trapezoidTabs:TrazepoidTabsMeta =batchTabs;
  // createTableData:CreateTable[]=createTableData;
  formSections: Sections = locationFormSections;
  //const locationList = [];
  subsidiaryLabels: any;
  formName: any;
  detectedError: boolean;
  newCountryCode: string | number = 971;

  ngOnInit() {





    // this.apiService.get(`core-hr/organisation/subsidiary`,'dropdown').subscribe((res:any) => {
    //   if(res){
    //     this.subsidiaryList = res.data;
    //     this.subListLoading = false;
    //     this.cdRef.detectChanges();
    //   }
    // });



    if (this.router.url.split('/')[3].toLocaleLowerCase() == 'create') {
      this.formName = ['Create'];
    }
    if (this.router.url.split('/')[3].toLocaleLowerCase() == 'edit') {
      this.formName = ['Modify'];
    }

    this.locationForm = this.dynamicFormService.createControl(this.formData)

    this.routeSub = this.route.params.subscribe(params => {
      // Access route parameters here
      this.id = params['id'];


    });
    if (this.id) {
      this.isLoading = true;

      this.apiService.get(`core-hr/organisation/location/${this.id}`).subscribe((res: any) => {
        if (res) {

          this.locationData = res.data;
          this.locationForm.patchValue(res.data)
          this.isLoading = false;
          this.cdRef.detectChanges();
        }

      });
    }

    this.locationForm.controls.name.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      if (!this.id) {
        this.locationForm.patchValue({
          "displayName": this.locationForm.value.name
        })
        // if(this.jurisdictionForm.value.legalName === '' || this.jurisdictionForm.value.legalName === null) {
        //   this.jurisdictionForm.patchValue({
        //     "legalName": this.jurisdictionForm.value.name
        //   })
        // }

      }
    })

  }

  onCountryChange(event) {

    this.subsidiaryFilter = [`country=${event.id}`]

    // if (this.locationForm.value.country) {
    //   this.locationForm.get('currency').enable();
    // }
    // else {
    //   this.locationForm.get('currency').disable();
    // }
    this.currencyCondition = [`id=${event.id}`]

    this.locationForm.patchValue({
      currency: this.locationForm.value.country
    });
    this.newCountryCode= event?.id;
  }
  onCurrencyChange() {
    if (this.locationForm.value.country !== this.locationForm.value.currency) {
      alert("Currency not matching with country")
      this.locationForm.patchValue({
        currency: this.locationForm.value.country
      })
    }
  }
  onSubmit() {

    this.isProcessing = true;
    this.submit = true;
    if (this.locationForm.invalid || !this.isPhoneValid) {

      this.isProcessing = false;
      return;
    }
    else {
      this.submit = false;
      let data = this.locationForm.value;
      data.createdBy = 1
      if (!this.id) {
        this.apiService.post(`core-hr/organisation/location`, data).subscribe({
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
        data = this.dynamicFormService.getUpdatedData(this.locationForm)
        this.apiService.put(`core-hr/organisation/location/${this.id}`, data).subscribe({
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
  onPhoneUpdate(event) {

    this.isPhoneValid = event;
  }
  // onChange() {
  //   const displayNameControl = this.locationForm.get('displayName');
  //   if (displayNameControl.value === "") {
  //     displayNameControl.setValue(this.locationForm.value.name);
  //
  //   }

  // }
}
