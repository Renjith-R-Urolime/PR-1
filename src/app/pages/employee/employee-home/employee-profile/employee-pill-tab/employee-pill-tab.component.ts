import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { Subscription } from 'rxjs';
import { DetailsCardData, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { bankDetailsformData, detailsCardActiveBankDetailsMeta, detailsCardClassificationMeta, detailsCardEmployeeInformationMeta, detailsCardFullFinalStatusMeta, employeeInformationTabsFormData, employeeTabsMeta } from '../employee-profile-data';


@Component({
  selector: 'app-employee-pill-tab',
  templateUrl: './employee-pill-tab.component.html',
  styleUrls: ['./employee-pill-tab.component.scss']
})
export class EmployeePillTabComponent {
  constructor(private route: ActivatedRoute, private apiService: ApiService, private dynamicFormService: DynamicFormService, private sharedService: SharedService, private cdRef: ChangeDetectorRef) {

  }
  employeePillTabsMeta: TrazepoidTabsMeta[] = employeeTabsMeta;
  theme: string = this.sharedService.getTheme();
  employeeInformationData: any
  employeeProfileData: any
  employeeCurrencyData: any
  classificationData: any
  cardActiveBankDetailsData: any
  fullFinalStatusData: any
  employeeInformationTemplate: TemplateRef<any>;
  employeeBankInformationTemplate: TemplateRef<any>;
  isDrawerOpen: boolean = false
  isProcessing: boolean = false
  isEmployeeInformationFormSaveDisabled: boolean = true
  formData: any = employeeInformationTabsFormData;
  bankDetailsformData: any = bankDetailsformData
  employeeInformationForm: FormGroup
  bankDetailsForm: FormGroup
  designationList: any = [];
  subsidiaryCondition: string[] = [];
  subsidiaryCountryFilter: string[] = [];
  isOnboarded: any
  subsidiaryCountryCode: any;
  newCountryCode: any;
  jurisdictionList: any;
  workCalendarList:any
  shiftList:any
  filterCondition: string[] = [];
  workCalendarCondition: string[] = [];
  isEmployeeBankInformationFormSaveDisabled: boolean = true
  isBankDrawerOpened: boolean = false
  currencyData: any = {};
  submit: boolean = false;
  finalForm: any = {};
  detectedError: boolean;
  originalFormData: any

  id: string | number;
  @ViewChild('customTemplate') customTemplate: TemplateRef<any>;

  private routeSub: Subscription | undefined;


  employeeInformationMeta: DetailsCardData = {
    meta: detailsCardEmployeeInformationMeta,
    data: []
  };

  classificationMeta: DetailsCardData = {
    meta: detailsCardClassificationMeta,
    data: []
  };

  cardActiveBankDetailsMeta: DetailsCardData = {
    meta: detailsCardActiveBankDetailsMeta,
    data: []
  };

  fullFinalStatusMeta: DetailsCardData = {
    meta: detailsCardFullFinalStatusMeta,
    data: []
  };


  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.formData.labels.forEach(label => {
      if ('hide' in label) {
        label.hide = true;
      }
    });

    this.sharedService.employeeDetails$.subscribe((data: any) => {
      this.employeeProfileData = data?.employeeProfile
      this.isOnboarded = data?.employeeOverview?.personalDetails?.isOnboarded


      if (!this.isOnboarded) {
        this.formData.labels.forEach(label => {
          if ('hide' in label) {
            label.hide = true;
          }
        });
      } else {
        this.formData.labels.forEach(label => {
          if ('hide' in label) {
            label.hide = false;
          }
        });
      }




      const filteredFormData = { ...this.formData, labels: this.formData.labels.filter(label => !('hide' in label && label.hide)) };

console.log(filteredFormData,'formdata');


      this.employeeInformationForm = this.dynamicFormService.createControl(filteredFormData);

      this.employeeCurrencyData = data?.employeePayroll?.salaryInformation
      this.employeeInformationData = data?.employeeInformation?.employeeInformation || { data: null };


      this.classificationData = data?.employeeInformation?.classification || { data: null };
      this.cardActiveBankDetailsData = data?.employeeInformation?.activeBankDetails?.[0] || { data: null }
      this.fullFinalStatusData = data?.employeeInformation?.fullAndFinalStatus || { data: null }
      this.employeeInformationForm.patchValue(this.employeeInformationData)
      this.employeeInformationForm.patchValue({
        "currency": this.employeeCurrencyData?.currency?.id,
        "locationId": this.employeeProfileData?.location?.id,
        "subsidiaryId": this.classificationData?.userSubsidiary?.id,
        "departmentId": this.employeeProfileData?.department?.id,
        "classId": this.classificationData?.class?.id,
        "gradeId": this.employeeInformationData?.grade?.id,
        "designationId": this.employeeProfileData?.designation?.id,
        "categoryId": this.employeeInformationData?.employeeCategory?.id,
        "hireDate": this.employeeInformationData?.joiningDate,
      });






      if (this.isOnboarded) {

        this.workCalendarList=[this.employeeInformationData?.workCalendar]
        this.shiftList=[this.employeeInformationData?.shift]
        this.employeeInformationForm.patchValue({
          "expenseSubsidiaryId": this.classificationData?.expenseSubsidiary?.id,
          "sponserSubsidiaryId": this.classificationData?.sponsorSubsidiary?.id,
          "workCalendarId": this.employeeInformationData?.workCalendar?.id,
          "shiftId": this.employeeInformationData?.shift?.id,
          "jurisdictionId": this.classificationData?.jurisdiction?.id,
        })
      }
      if (this.isOnboarded) {
        this.bankDetailsForm = this.dynamicFormService.createControl(bankDetailsformData);
        this.bankDetailsForm.patchValue({
          "name": this.cardActiveBankDetailsData?.name,
          "accountNo": this.cardActiveBankDetailsData?.accountNo,
          "ibanNo": this.cardActiveBankDetailsData?.ibanNo,
          "accountTypeId": this.cardActiveBankDetailsData?.accountType?.id,
          "paymentMethodId": this.cardActiveBankDetailsData?.paymentMethod?.id,
        });

      }

      if (data?.employeeInformation?.employeeInformation.payrollOnboardDate && new Date(format(new Date(data?.employeeInformation?.employeeInformation.payrollOnboardDate), 'yyyy/MM/dd')).getTime() !== new Date(format(new Date(data?.employeeInformation?.employeeInformation.joiningDate), 'yyyy/MM/dd')).getTime()) {



        detailsCardEmployeeInformationMeta[0].labels.filter((value) => {
          if (value.labelName.defaultValue === 'payrollOnboardDate') {


            value.hide = false;
            this.cdRef.detectChanges();
          }
        });
      }
      else {

        detailsCardEmployeeInformationMeta[0].labels.filter((value) => {
          if (value.labelName.defaultValue === 'payrollOnboardDate') {
            value.hide = true;
            this.cdRef.detectChanges();
          }
        });
      }




      if (this.employeeInformationData.grade) {
        this.filterDesignation(this.employeeInformationData.grade)
      }

      if (this.employeeInformationData.workCalendar) {
        this.filterShift(this.employeeInformationData.workCalendar)
      }

      if (this.classificationData.userSubsidiary) {
        this.subsidiaryCondition = [`subsidiary=${this.classificationData.userSubsidiary?.id}`];
        this.subsidiaryCountryFilter = [`country=${this.classificationData.userSubsidiary?.country?.id}`]
        this.fetchJurisdictionList()
      }




      if (this.employeeCurrencyData) {
        this.currencyData = this.employeeCurrencyData?.currency
      }


    });
    this.setFilterCondition()
  }



  setFilterCondition() {
    this.filterCondition = this.classificationData?.userSubsidiary?.id ? [`subsidiary=${this.classificationData?.userSubsidiary?.id ? this.classificationData?.userSubsidiary?.id : ''}`] : this.filterCondition;
    this.filterCondition = this.classificationData?.class?.id ? [this.filterCondition[0] + `&class=${this.classificationData?.class?.id ? this.classificationData?.class?.id : ''}`] : this.filterCondition;
    this.filterCondition = this.employeeProfileData?.department?.id ? [this.filterCondition[0] + `&department=${this.employeeProfileData?.department?.id ? this.employeeProfileData?.department?.id : ''}`] : this.filterCondition;
    this.filterCondition = this.employeeProfileData?.location?.id ? [this.filterCondition[0] + `&location=${this.employeeProfileData?.location?.id}`] : this.filterCondition;
  }


  filterShift(event) {
    this.workCalendarCondition = [`workCalendar=${event.id}`]
  }








  filterDesignation(event) {
    this.designationList = event.designation;
  }

  getFormTemplate(template: TemplateRef<any>, headerText: string, name: string) {
    if (name == 'employeeInformation') {
      this.employeeInformationTemplate = template;
      this.isDrawerOpen = true
    }
    else if (name == 'bankInformation' && this.isOnboarded) {
      this.employeeBankInformationTemplate = template
      this.isBankDrawerOpened = true

    }
  }


  onDrawerSaveEmployeeInformationForm(event) {
    this.isEmployeeInformationFormSaveDisabled = false
    this.isDrawerOpen = false
    this.onSubmit()
  }
  cancelEmployeeInformationForm(event) {
    this.isDrawerOpen = false
  }

  onDrawerSaveEmployeeBankInformationForm(event) {
    this.isEmployeeBankInformationFormSaveDisabled = false
    this.isBankDrawerOpened = false
    this.onSubmit()
  }
  cancelEmployeeBankInformationForm(event) {
    this.isBankDrawerOpened = false
  }


  filterBasedOnSubsidiarySelected(event) {
    this.subsidiaryCountryCode = event?.country?.id;
    this.newCountryCode = this.subsidiaryCountryCode;
    if (event) {
      this.employeeInformationForm.patchValue({
        "currency": event?.currency?.id,
        "locationId": '',
        "departmentId": '',
        "classId": '',
      })
      this.cdRef.detectChanges();

      this.currencyData = event?.currency
      this.subsidiaryCountryFilter = [`country=${this.subsidiaryCountryCode}`]

      this.subsidiaryCondition = [`subsidiary=${event.id}`]
      this.fetchJurisdictionList()

    }


  }







  onSubmit() {

    this.isProcessing = true;
    this.submit = true;


    if (this.employeeInformationForm.invalid) {
      this.isProcessing = false;
      this.isEmployeeInformationFormSaveDisabled = true
      return;
    }
    else {
      //edit
      this.isEmployeeInformationFormSaveDisabled = false
      this.submit = false;
      let updatedEmployeeInformationForm = this.dynamicFormService.getUpdatedData(this.employeeInformationForm)
      let updatedBankDetailsForm= this.dynamicFormService.getUpdatedData(this.bankDetailsForm)
          let data = { ...updatedEmployeeInformationForm};
     // let data = { ...this.employeeInformationForm.value };
      data['bankDetails'] = Array({...updatedBankDetailsForm,id: this.cardActiveBankDetailsData?.id});




      this.apiService.put(`core-hr/employee/${this.id}`, data, 'employee').subscribe({
        next: (res: any) => {
          if (res) {
            this.isProcessing = false;
            this.isEmployeeInformationFormSaveDisabled = false
            this.cdRef.detectChanges();
            this.sharedService.handleSuccessModel({ id: this.id, btnTemplate: this.customTemplate });
            this.sharedService.updateEmployeeData()
          }
          else {
            this.isProcessing = false;
            this.cdRef.detectChanges();
            this.sharedService.updateEmployeeData()
          }
        },
        error: (error: any) => {
          this.detectedError = true;
          this.isProcessing = false;
          this.cdRef.detectChanges();
        }
      });

    }
  }



  onViewClicked() {
    this.sharedService.onModalClose();
    //  window.location.reload();
  }

  fetchJurisdictionList() {
    this.apiService.get(`core-hr/organisation/jurisdiction${'?' + this.subsidiaryCondition}`).subscribe({
      next: (res) => {
        this.jurisdictionList = res["data"];
      }
    });
  }








}

