import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { S3UploadService } from 'src/app/shared/services/s3-upload.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { classificationApplicabilityFormMeta, formSections, policyFormData } from '../policy-and-handbooks.data';

@Component({
  selector: 'app-policy-handbooks-form',
  templateUrl: './policy-handbooks-form.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./policy-handbooks-form.component.scss']
})
export class PolicyHandbooksFormComponent {
  classificationApplicabilityForm: FormGroup;
  classificationApplicabilityFormData: any = classificationApplicabilityFormMeta
  radioValue: boolean  = false;
  policyForm: FormGroup;
  isProcessing: boolean = false;
  submit: boolean = false;
  isPhoneValid: boolean = true;
  theme: string = this.sharedService.getTheme();
  currentAddressForm: any;
  currentAddressFormSaved: boolean;
  cancelForms: any;
  isSaveDisabled: boolean;
  formTemplate: TemplateRef<any>;
  headerText: any;
  saveForms = [];
  radioButtonState: boolean = false;
  classificationApplicabilityToolTipValues: any;
  uploadSaved: boolean=false;
  constructor(private router: Router, private modalService: NgbModal, private apiService: ApiService, private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private dynamicFormService: DynamicFormService, public sharedService: SharedService, private _location: Location, private s3service: S3UploadService,private sanitizer: DomSanitizer) { }
  @ViewChild('customTemplate') customTemplate: TemplateRef<any>;
  id:any;
  col = 6;
  isLoading: boolean = false;
  formData: any = policyFormData;
  private routeSub: Subscription | undefined;
  formSections: Sections = formSections;
  private modalRef: NgbModalRef;
  formName: any;
  imageUrl: any;
  imgURL: string;
  showImg: boolean = false;
  listLoading = false;
  detectedError: boolean;
  policyData: any;
  isToggled = false;
  formTemplateRef: TemplateRef<any>;
  activeTemplateName: string;
  attachment:any;
  classificationApplicabilityFormSaved: boolean = false
  onDrawerSaveData: any
  finalForm: any = {};
  defaultLabelValue: boolean = false;
  labelValue: boolean = this.defaultLabelValue;
  editorValue: string;


  ngOnInit() {
    this.policyForm = this.dynamicFormService.createControl(this.formData)
    this.classificationApplicabilityForm = this.dynamicFormService.createControl(this.classificationApplicabilityFormData)

    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    if (this.id) {
      this.isLoading = true;

        this.apiService.get(`core-hr/organisation/policy-handbook/${this.id}`).subscribe({
        next:(res:any)=>{
          if (res) {

            this.policyForm.patchValue(res.data)
            this.policyForm.patchValue({
              "repeat": res.data.repeat,
              "oneTime": res.data.oneTime,

            })
            this.policyData = res.data
            this.attachment = [res.data.attachment]
            // this.policyForm.get('country').disable();
            // this.timezoneCondition = [`countryId=${ this.policyForm?.value.country.id }`]
            // this.currencyCondition = [`id=${ this.policyForm?.value.country.id }`]
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
  // modifyFormValue() {
  //   // Assuming 'fieldName' is the name of the field you want to modify
  //   this.policyForm.get('description').setValue('empty');
  // }
  onSubmit() {
  //  this.modifyFormValue()
    const updatedFormData = this.policyForm.value;


    // --------success popup page--------
    this.isProcessing = true;
    this.submit = true;
    if (this.policyForm.invalid || !this.isPhoneValid) {

      this.isProcessing = false;
      return;
    }
    else {

      Object.assign(this.finalForm, this.classificationApplicabilityForm.value)
      Object.assign(this.finalForm, this.policyForm.value)




      this.submit = false;
      let data = this.finalForm;


      data.createdBy = 1
      if (!this.id) {

        this.apiService.post(`core-hr/organisation/policy-handbook`, data,'policy-handbook').subscribe({
          next:(res:any)=>{
            if (res) {

              this.isProcessing = false;
              this.cdRef.detectChanges();
              this.sharedService.handleSuccessModel({ id: res._id, btnTemplate: this.customTemplate });

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

        data = this.dynamicFormService.getUpdatedData(this.policyForm)

        this.apiService.put(`core-hr/organisation/policy-handbook/${this.id}`, data,'policy-handbook').subscribe({
          next:(res:any)=>{
            if (res) {
              this.isProcessing = false;
              // this.sharedService.clearStoreList('subsidiary');
              this.cdRef.detectChanges();
              this.sharedService.handleSuccessModel({ id: res._id, btnTemplate: this.customTemplate });
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


  onRadioChange(event,name) {



      this.policyForm.patchValue({
        "occurance": name,


      })






  }

  onCheckboxChange(checked: boolean) {

    this.labelValue = !this.labelValue;
console.log(this.labelValue);


  }


  getFormTemplate(template: TemplateRef<any>, name: string) {
    this.formTemplateRef = template
    this.activeTemplateName = name
  }
  onDrawerSave(event) {
    this.onDrawerSaveData = this.classificationApplicabilityForm.value
    this.classificationApplicabilityFormSaved=true





  }

  onDrawerCancel(event) {
    this.classificationApplicabilityForm.reset(this.onDrawerSaveData)
    this.formTemplate = null;

  }
  collapsed = true;

  toggle() {
    this.collapsed = !this.collapsed;
  }


  sample(event){


  }
  addAnother(){
    this.sharedService.onModalClose();

    this.router.navigate(['/organisation/policy-handbook/create']);

  }
  BackToList(){

    this.router.navigate(['/organisation/policy-handbook']);
          this.sharedService.onModalClose();
  }


  // Define a method to handle the emitted event
  onEditorValueChange(value: string): void {
    this.editorValue = value;

  }




}
