import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, debounceTime } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { JsonListService } from 'src/app/shared/services/json-list/json-list.service';
import { S3UploadService } from 'src/app/shared/services/s3-upload.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { formSections, subsidiaryFormData } from '../subsidiary.data';

@Component({
  selector: 'app-subsidiary-form',
  templateUrl: './subsidiary-form.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./subsidiary-form.component.scss']
})
export class SubsidiaryFormComponent {
  @Input() inputValue: boolean;

  subsidiaryForm: FormGroup;
  submit: boolean = false;
  isPhoneValid: boolean = true;
  theme: string = this.sharedService.getTheme();
  newCountryCode: string | number = 971;
  phoneCondition: string[];
  constructor(private router: Router, private modalService: NgbModal, private apiService: ApiService, private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private dynamicFormService: DynamicFormService, public sharedService: SharedService, private _location: Location, private s3service: S3UploadService, private fb: FormBuilder, private jsonListService:JsonListService) { }
  @ViewChild('customTemplate') customTemplate: TemplateRef<any>;
  id: any;
  col = 6;
  isLoading: boolean = false;
  formData: any = subsidiaryFormData;
  private routeSub: Subscription | undefined;
  formSections: Sections = formSections;
  private modalRef: NgbModalRef;
  formName: any;
  imageUrl: any;
  imgURL: string;
  showImg: boolean = false;
  listLoading = false;
  detectedError: boolean;
  subsidiaryData: any;
  timezoneCondition: string[] = []
  currencyCondition: string[] = []
  fileList: any;
  timeFormatList:any[]=[];
  dateFormatList:any[]=[];
  decimalPreferenceList:any[]= [];


  ngOnInit() {
    this.subsidiaryForm = this.dynamicFormService.createControl(this.formData)

    this.jsonListService.getDataList('dateFormat').subscribe({
      next:(res:any)=>{

        this.dateFormatList=res;
      }
    });
    this.jsonListService.getDataList('timeFormat').subscribe({
      next:(res:any)=>{

        this.timeFormatList=res;
      }
    })
    this.jsonListService.getDataList('decimalPlace').subscribe({
      next:(res:any)=>{

        this.decimalPreferenceList=res;
      }
    })

    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    if (this.id) {
      this.isLoading = true;

      this.apiService.get(`core-hr/organisation/subsidiary/${this.id}`).subscribe({
        next: (res: any) => {
          if (res) {

            this.subsidiaryForm.patchValue(res.data)
            this.subsidiaryData = res.data
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
    this.subsidiaryForm.controls.name.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      if (!this.id) {
        this.subsidiaryForm.patchValue({
          "displayName": this.subsidiaryForm.value.name,
        })
        this.subsidiaryForm.patchValue({
          "legalName": this.subsidiaryForm.value.name
        })
      }
    })
  }



  onCountryChange(event) {


    if (!this.id) {
      // const data = this.countries.filter(i => i.id === this.subsidiaryForm.value.country)
      this.timezoneCondition = [`countryId=${event.id}`]
      this.currencyCondition = [`id=${event.id}`]

      // Set Timezone enable for Multiple Values
      const timezoneLabel = this.formData.labels.find(label => label.labelName.defaultValue === 'timezone');


      if (timezoneLabel) {
        timezoneLabel.fieldDisable = event?.timezones.length === 1;
      }

      //Generate and sent phoneCode to int tel package
      let phoneNumberControl = this.formData.labels.find(label => label.labelName.defaultValue === 'phone');


      if (phoneNumberControl) {
        this.newCountryCode = event?.id;
      }

      this.subsidiaryForm.patchValue({
        currency: this.subsidiaryForm.value.country,
        timezone: event?.timezones.length > 0 ? event?.timezones[0]?.id : null,
      })

      this.cdRef.detectChanges();
    }
  }
  onCurrencyChange(event) {
    if (this.subsidiaryForm.value.country !== this.subsidiaryForm.value.currency) {
      alert("Currency not matching with country")
    }
  }
  onSubmit() {
    // --------success popup page--------



    this.submit = true;
    if (this.subsidiaryForm.invalid || !this.isPhoneValid) {


      return;
    }
    else {
      this.submit = false;
      let data = this.subsidiaryForm.value;

      data['dateFormat']=this.dateFormatList.filter(date=>parseInt(date.id)===parseInt(data['dateFormat']))[0].name;
      data['timeFormat']=this.timeFormatList.filter(date=>parseInt(date.id)===parseInt(data['timeFormat']))[0].name;
      data['decimalPlace']=this.decimalPreferenceList.filter(date=>parseInt(date.id)===parseInt(data['decimalPlace']))[0].name;

      data.createdBy = 1
      if (!this.id) {

        this.apiService.post(`core-hr/organisation/subsidiary`, data, 'subsidiary').subscribe({
          next: (res: any) => {
            if (res) {


              this.cdRef.detectChanges();
              this.sharedService.handleSuccessModel({ id: res._id });

              //   this._location.back();
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


        data = this.dynamicFormService.getUpdatedData(this.subsidiaryForm)
        this.apiService.put(`core-hr/organisation/subsidiary/${this.id}`, data, 'subsidiary').subscribe({
          next: (res: any) => {
            if (res) {

              // this.sharedService.clearStoreList('subsidiary');
              this.cdRef.detectChanges();
              this.sharedService.handleSuccessModel({ id: this.id });
            }
            else {

              this.cdRef.detectChanges();
            }
          },
          error: (error: any) => {
            this.detectedError = true;

            this.cdRef.detectChanges();
            console.error(error);

          }
        });
      }
    }

  }

  onPhoneUpdate(event) {


    this.isPhoneValid = event;
  }
  // onChange() {
  //   const displayNameControl = this.subsidiaryForm.get('displayName');
  //   const legalNameControl = this.subsidiaryForm.get('legalName');
  //   if (displayNameControl.value === "") {
  //     displayNameControl.setValue(this.subsidiaryForm.value.name);
  //
  //   }
  //   if (legalNameControl.value === "") {
  //     legalNameControl.setValue(this.subsidiaryForm.value.name);
  //
  //   }
  // }
}
