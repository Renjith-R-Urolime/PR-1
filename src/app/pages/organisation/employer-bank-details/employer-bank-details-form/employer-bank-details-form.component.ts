import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { S3UploadService } from 'src/app/shared/services/s3-upload.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { WizardService } from 'src/app/shared/services/wizard.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { empFormSections, employerFormData } from '../employer-bank-details.data';

@Component({
  selector: 'app-employer-bank-details-form',
  templateUrl: './employer-bank-details-form.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./employer-bank-details-form.component.scss']
})
export class EmployerBankDetailsFormComponent {
  employerBankDetailsForm: FormGroup;
  isProcessing: boolean = false;
  submit: boolean = false;
  isPhoneValid: boolean = true;
  theme: string = this.sharedService.getTheme();
  currencyCondition: string[] = []
  newCountryCode: string | number = 971;
  constructor(private renderer: Renderer2, private el: ElementRef, private sanitizer: DomSanitizer, private router: Router, private wizardService: WizardService, private modalService: NgbModal, private apiService: ApiService, private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private dynamicFormService: DynamicFormService, public sharedService: SharedService, private _location: Location, private s3service: S3UploadService) { }

  id;
  countries = [];
  accountType=[];
  routingNo=[];
  subsidiaryList = [];
  col = 6;
  isLoading: boolean = false;
  formData: any = employerFormData;
  private routeSub: Subscription | undefined;
  formSections: Sections = empFormSections;
  private modalRef: NgbModalRef;
  formName: any;
  imageUrl: any;
  imgURL:string;
  showImg:boolean=false;
  listLoading = false;
  detectedError:boolean;
  empBankDetailData:any;
  subsidiaryFilter: string[]=[];
  ngOnInit() {

    // this.sharedService.getDataList('bankAccountType').subscribe({
    //   next: (result) => {
    //     this.accountType = result
    //   },
    //   error: (e) => console.error(e)
    // });
    // this.sharedService.getDataList('country').subscribe({
    //   next: (result) => {
    //     this.countries = result
    //   },
    //   error: (e) => console.error(e)
    // });
    // this.getSubsidiaryList();


    this.employerBankDetailsForm = this.dynamicFormService.createControl(this.formData)

    this.routeSub = this.route.params.subscribe(params => {


      // Access route parameters here
      this.id = params['id'];


    });
    if (this.id) {
      this.isLoading = true;


        this.apiService.get(`core-hr/organisation/employer-bank-detail/${this.id}`).subscribe({
        next:(res:any)=>{
          if (res) {

            this.empBankDetailData = res.data;
            this.employerBankDetailsForm.patchValue(res.data)
            this.subsidiaryFilter = [`country=${res?.data?.country?.id}`]
            this.currencyCondition = [`id=${res?.data?.country?.id}`]


            this.isLoading = false;
            this.cdRef.detectChanges();
          }
        },error:(error:any)=>{
         this.isLoading = false;
          this.detectedError=true;
          this.cdRef.detectChanges();
          console.error(error);
        }
      });
    }



  }

  // getSubsidiaryList(searchValue?){
  //   this.listLoading = true;
  //   this.apiService.get(`core-hr/organisation/subsidiary?page=1&limit=5${ searchValue ? '&search='+searchValue: '' }`).subscribe((res: any) => {
  //     if (res) {
  //       this.subsidiaryList = res.data;
  //       this.listLoading = false;
  //       this.cdRef.detectChanges();
  //     }
  //   });
  // }

  onCountryChange(event) {
   /*  if (this.employerBankDetailsForm.value.country) {
      this.employerBankDetailsForm.get('currency').enable();
    }
    else {
      this.employerBankDetailsForm.get('currency').disable();
    } */
    this.subsidiaryFilter= [`country=${event.id}`]
    this.currencyCondition = [`id=${event.id}`]
    //Generate and sent phoneCode to int tel package
    let phoneNumberControl = this.formData.labels.find(label => label.labelName.defaultValue === 'phone');


    if (phoneNumberControl) {
      this.newCountryCode = event?.id;
    }
    this.employerBankDetailsForm.patchValue({
      currency: this.employerBankDetailsForm.value.country
    })
  }
  onCurrencyChange() {
    if (this.employerBankDetailsForm.value.country !== this.employerBankDetailsForm.value.currency) {
      alert("Currency not matching with country")
      this.employerBankDetailsForm.patchValue({
        currency: this.employerBankDetailsForm.value.country
      })
    }
  }
  onSubmit() {
    // --------success popup page--------


    this.isProcessing = true;
    this.submit = true;
    if (this.employerBankDetailsForm.invalid || !this.isPhoneValid) {

      this.isProcessing = false;
      return;
    }
    else {
      this.submit = false;
      let data = this.employerBankDetailsForm.value;
      data.createdBy = 1
      if (!this.id) {

        this.apiService.post(`core-hr/organisation/employer-bank-detail`, data).subscribe({
        next:(res:any)=>{
          if (res) {

            this.isProcessing = false;
            this.cdRef.detectChanges();
            this.sharedService.handleSuccessModel({ id: res._id });

          }
        },
        error:(error:any)=>{
          this.detectedError=true;
          this.isProcessing = false;

          console.error(error);

        }
        }
        );
      }
      else {

        data = this.dynamicFormService.getUpdatedData(this.employerBankDetailsForm)
        this.apiService.put(`core-hr/organisation/employer-bank-detail/${this.id}`, data).subscribe({
          next:(res:any)=>{
            if (res) {

            this.isProcessing = false;
            this.cdRef.detectChanges();
            this.sharedService.handleSuccessModel({ id: this.id });

          }

        },
        error:(error:any)=>{
          this.isProcessing = false;
          this.detectedError=true;
          console.error(error);

        }
        });
      }
    }

  }

  onCancel() {
    this._location.back();
  }
  onSearch(searchTerm: string) {

    if (searchTerm && searchTerm.length >= 3) { // Add a minimum character threshold
      // this.getSubsidiaryList(searchTerm)
    }
  }
  onPhoneUpdate(event){

    this.isPhoneValid = event;
  }
}
