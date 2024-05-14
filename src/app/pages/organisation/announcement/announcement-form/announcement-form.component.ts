import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { format } from 'date-fns';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { S3UploadService } from 'src/app/shared/services/s3-upload.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { announcementFormData, announcementformSections, classificationApplicabilityFormMeta } from '../announcement.data';
@Component({
  selector: 'app-announcement-form',
  templateUrl: './announcement-form.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./announcement-form.component.scss']
})
export class AnnouncementFormComponent implements OnInit {
  classificationApplicabilityForm: FormGroup;
  classificationApplicabilityFormData: any = classificationApplicabilityFormMeta
  radioValue: boolean = false;
  announcementForm: FormGroup;
  isProcessing: boolean = false;
  submit: boolean = false;
  isPhoneValid: boolean = true;
  theme: string = this.sharedService.getTheme();
  cancelForms: any;
  isSaveDisabled: boolean;
  formTemplate: TemplateRef<any>;
  headerText: any;
  saveForms = [];
  radioButtonState: boolean = false;
  classificationApplicabilityToolTipValues: any;
  uploadSaved: boolean = false;
  constructor(private router: Router, private modalService: NgbModal, private apiService: ApiService, private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private dynamicFormService: DynamicFormService, public sharedService: SharedService, private _location: Location, private s3service: S3UploadService) { }
  @ViewChild('customTemplate') customTemplate: TemplateRef<any>;
  id: any;
  col = 6;
  isLoading: boolean = false;
  formData: any = announcementFormData;
  private routeSub: Subscription | undefined;
  formSections: Sections = announcementformSections;
  private modalRef: NgbModalRef;
  formName: any;
  imageUrl: any;
  imgURL: string;
  showImg: boolean = false;
  listLoading = false;
  detectedError: boolean;
  announcementData: any;
  isToggled = false;
  formTemplateRef: TemplateRef<any>;
  activeTemplateName: string;
  attachment: any;
  classificationApplicabilityFormSaved: boolean = false
  onDrawerSaveData: any
  collapsed = true;
  finalForm: any = {};
  defaultLabelValue: boolean = false;
  labelValue: boolean = this.defaultLabelValue;
  isRepeat: boolean = false;
  subsidiaryFilter: string[] = [];
  countryFetchCondition:any;
  ngOnInit() {
    this.announcementForm = this.dynamicFormService.createControl(this.formData)
    this.classificationApplicabilityForm = this.dynamicFormService.createControl(this.classificationApplicabilityFormData)
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    if (this.id) {
      this.isLoading = true;
      this.apiService.get(`core-hr/organisation/announcement/${this.id}`).subscribe({
        next: (res: any) => {
          if (res) {
            this.announcementForm.patchValue(res.data)
            this.announcementForm.patchValue({
              "occurrence": res.data.occurrence,
              "announcementStartDate": format(new Date(res.data.announcementStartDate), 'yyyy-MM-dd'),
              "announcementEndDate": format(new Date(res.data.announcementEndDate), 'yyyy-MM-dd'),
            })
            this.announcementData = res.data
            this.attachment = [res.data.attachment]
            // this.announcementForm.get('country').disable();
            // this.timezoneCondition = [`countryId=${ this.announcementForm?.value.country.id }`]
            // this.currencyCondition = [`id=${ this.announcementForm?.value.country.id }`]
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
  onCountryChange(event) {
    this.countryFetchCondition = [`country=${event.id}`]
    this.cdRef.detectChanges();
  }
  createClassificationApplicabilityFilterObject(): any {
    if (this.subsidiaryFilter.length > 0) {
      const filterString = this.subsidiaryFilter.join('&');
            return {
        jurisdiction: filterString,
        location: filterString,
        department: filterString,
        class: filterString,
      };
    }else if(this.classificationApplicabilityForm?.value?.subsidiary?.length>0 && this.classificationApplicabilityForm?.value?.subsidiary!='ALL' ){
      let subsidaryData=this.classificationApplicabilityForm?.value?.subsidiary
            return {
        jurisdiction: `subsidiary=${subsidaryData.map(item => item.id).join(',')}`,
        location: `subsidiary=${subsidaryData.map(item => item.id).join(',')}`,
        department: `subsidiary=${subsidaryData.map(item => item.id).join(',')}`,
        class: `subsidiary=${subsidaryData.map(item => item.id).join(',')}`,
      };
    }
    else if(this.classificationApplicabilityForm?.value?.country?.length>0) {
      let countryData=[this.classificationApplicabilityForm?.value?.country]
      return {
        jurisdiction: `country=${countryData.map(item => item).join(',')}`,
        location: `country=${countryData.map(item => item).join(',')}`,
        department: `country=${countryData.map(item => item).join(',')}`,
        class: `country=${countryData.map(item => item).join(',')}`,
      };
    }
    else{
      return null;
    }
  }
  mapClassificationApplicabilityValues(obj: { [key: string]: any }): { [key: string]: any } {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => {
        if (key !== 'country' && (value === undefined || value === null || (Array.isArray(value) && value.length === 0))) {
          return [key, 'ALL'];
        }
        else if(key== 'country' && (value === undefined || value === null || (Array.isArray(value) && value.length === 0))) {
          return [key, null];
        }
        else {
          return [key, value];
        }
      })
    );
  }
  onSubmit() {
    // --------success popup page--------
    this.isProcessing = true;
    this.submit = true;
    let classificationData
    let classificationfilter
    if(this.classificationApplicabilityForm.dirty){
      classificationData = this.mapClassificationApplicabilityValues(this.classificationApplicabilityForm.value)
     classificationfilter = { filters: this.createClassificationApplicabilityFilterObject() }
   }
   else{
     classificationData={},
     classificationfilter={}
   }
    if (this.announcementForm.invalid || !this.isPhoneValid) {
      this.isProcessing = false;
      return;
    }
    else {
      Object.assign(this.finalForm, this.classificationApplicabilityForm.value)
      Object.assign(this.finalForm, this.announcementForm.value)
      this.submit = false;
      let data = this.finalForm;
      data.createdBy = 1
      if (!this.id) {
        this.apiService.post(`core-hr/organisation/announcement`, data, 'announcement').subscribe({
          next: (res: any) => {
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
        data = this.dynamicFormService.getUpdatedData(this.announcementForm)
        this.apiService.put(`core-hr/organisation/announcement/${this.id}`, data, 'announcement').subscribe({
          next: (res: any) => {
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
  onRadioChange(event, name) {
    if(name === 'repeat'){
      this.isRepeat=true;
    }
    else{
      this.isRepeat=false;
    }
    this.announcementForm.patchValue({
      "occurrence": name,
    })
  }
  onCheckboxChange(checked: boolean) {
    this.labelValue = !this.labelValue;
  }
  getFormTemplate(template: TemplateRef<any>, name: string) {
    this.formTemplateRef = template
    this.activeTemplateName = name
  }
  onDrawerSave(event) {
    this.onDrawerSaveData = this.classificationApplicabilityForm.value;
    this.classificationApplicabilityFormSaved = true
  }
  onDrawerCancel(event) {
    this.classificationApplicabilityForm.reset(this.onDrawerSaveData)
    this.formTemplate = null;
  }
  toggle() {
    this.collapsed = !this.collapsed;
  }
  addAnother() {
    this.sharedService.onModalClose();
    this.router.navigate(['/corporate-hub/employee-engagement/announcements/create']);
  }
  BackToList() {
    this.router.navigate(['/corporate-hub/employee-engagement/announcements']);
    this.sharedService.onModalClose();
  }
  editorValue: string;
  // Define a method to handle the emitted event
  onEditorValueChange(value: string): void {
    this.editorValue = value;
  }
}
