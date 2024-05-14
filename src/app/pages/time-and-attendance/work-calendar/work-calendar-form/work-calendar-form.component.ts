import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { ApiService } from "src/app/shared/services/api.service";
import { DynamicFormService } from "src/app/shared/services/dynamic-form.service";
import { SharedService } from "src/app/shared/services/shared.service";
import { Sections } from "src/app/shared/ui/basic-form/basic-form";
import {
  classificationApplicabilityFormMeta,
  formSectionsList,
  workCalendarFormData,
} from "../work-calendar.data";

@Component({
  selector: "app-work-calendar-form",
  templateUrl: "./work-calendar-form.component.html",
  styleUrls: ["./work-calendar-form.component.scss"],
})
export class WorkCalendarFormComponent {
  isLoading: boolean = false;

  theme: string = this.sharedService.getTheme();
  id: any;
  formSections: Sections = formSectionsList;
  formData: any = workCalendarFormData;
  classificationApplicabilityFormData: any =
    classificationApplicabilityFormMeta;
  workCalendarForm: FormGroup;
  classificationApplicabilityForm: FormGroup;
  col: any = 4;
  offset: any = 0;
  headerText: any;
  countryFilter: string[] = [];
  formTemplate: any;
  toleranceSaved: boolean = false;
  classificationSaved: boolean = false;
  formTemplateRef: TemplateRef<any>;
  activeTemplateName: string;
  onDrawerSaveData: any;

  isProcessing: boolean;
  finalForm: any = {};
  submit: boolean = false;
  isPhoneValid: boolean = true;
  coutryFetchCondition: any

  classificationApplicabilityFormSaved: boolean = false;
  private routeSub: Subscription | undefined;
  detectedError: boolean;
  workCalendarData:any={}
  @ViewChild("customTemplate") customTemplate: TemplateRef<any>;
  subsidiaryFilter: string[] = [];

  constructor(
    public sharedService: SharedService,
    private dynamicFormService: DynamicFormService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.workCalendarForm = this.dynamicFormService.createControl(
      this.formData
    );
    this.classificationApplicabilityForm =
      this.dynamicFormService.createControl(
        this.classificationApplicabilityFormData
      );
    this.cdRef.detectChanges();


    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params["id"];
    });
    if (this.id) {
      this.classificationApplicabilityFormSaved = true;

      this.isLoading = true;
      this.apiService
        .get(`time-attendance/work-calendar/${this.id}`)
        .subscribe({
          next: (res: any) => {
            if (res) {

              this.workCalendarData=res.data
              this.workCalendarForm.patchValue(res.data);
              if (res.data?.country) {
                this.onCountryChange(res.data?.country)
              }
              this.classificationApplicabilityForm.patchValue(res.data);
              // this.workCalendarForm = res.dat
              // this.policyForm.get('country').disable();
              // this.timezoneCondition = [`countryId=${ this.policyForm?.value.country.id }`]
              // this.currencyCondition = [`id=${ this.policyForm?.value.country.id }`]
              this.isLoading = false;
              this.cdRef.detectChanges();
            }
          },
          error: (error: any) => {
            this.detectedError = true;
            this.isLoading = false;
            this.cdRef.detectChanges();

            console.error(error);

          },
        });
    }
  }
  onSubmit() {
    this.isProcessing = true;
    this.submit = true;
    if (this.workCalendarForm.invalid || !this.isPhoneValid) {

      this.isProcessing = false;
      return;
    }
    this.submit = false;
    let data =this.workCalendarForm.value;

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
    if (!this.id) {

      this.apiService
        .post(`time-attendance/work-calendar`, {...data,...classificationData,...classificationfilter}, "work-calendar")
        .subscribe({
          next: (res: any) => {
            if (res) {

              this.isProcessing = false;
              this.cdRef.detectChanges();
              this.sharedService.handleSuccessModel({
                id: res._id,
                btnTemplate: this.customTemplate,
              });

              //   this._location.back();
            }
          },
          error: (error: any) => {
            this.detectedError = true;
            this.isProcessing = false;
            this.cdRef.detectChanges();
            console.error(error);

          },
        });
    } else {

      this.apiService
        .put(`time-attendance/work-calendar/${this.id}`, {...data,...classificationData,...classificationfilter}, "work-calendar")
        .subscribe({
          next: (res: any) => {
            if (res) {
              this.isProcessing = false;
              // this.sharedService.clearStoreList('subsidiary');
              this.cdRef.detectChanges();
              this.sharedService.handleSuccessModel({
                id: res._id,
                btnTemplate: this.customTemplate,
              });
            } else {
              this.isProcessing = false;
              this.cdRef.detectChanges();
            }
          },
          error: (error: any) => {
            this.detectedError = true;
            this.isProcessing = false;
            this.cdRef.detectChanges();
            console.error(error);

          },
        });
    }
  }

  /////////////////////////////////////////////////////////////////////////
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

  //////////////////////////////////////////////////////////////////////////
  // --------success popup page--------

  getFormTemplate(template: TemplateRef<any>, name: string) {
    this.formTemplateRef = template;
    this.activeTemplateName = name;
  }
  onDrawerSave(event) {
    this.onDrawerSaveData = this.workCalendarForm.value;
    this.classificationApplicabilityFormSaved = true;


  }

  onDrawerCancel(event) { }
  collapsed = true;

  toggle() {
    this.collapsed = !this.collapsed;
  }

  sample(event) {


  }

  onSubsidiaryChange(event) {

    if (this.classificationApplicabilityForm.value?.subsidiary !== 'ALL' && event.length > 0) {


      this.subsidiaryFilter = [`subsidiary=${event.map(item => item.id).join(',')}`];
    } else {
      this.subsidiaryFilter = []
    }
  }

  onCountryChange(event) {
    this.coutryFetchCondition = [`country=${event.id}`]
    this.cdRef.detectChanges();

  }


}
