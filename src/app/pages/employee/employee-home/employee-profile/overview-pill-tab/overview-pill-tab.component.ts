import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth';
import { DetailsCardData, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TabService } from 'src/app/shared/services/tab.service';
import { currentAddressFormData, detailsCardEmployeeOverviewMeta, emergencyContactFormData, homeAddressFormData, overViewTabsFormData, overViewTabsMeta, rolesFormData } from '../employee-profile-data';

const _ = require('lodash');


@Component({
  selector: 'app-overview-pill-tab',
  templateUrl: './overview-pill-tab.component.html',
  styleUrls: ['./overview-pill-tab.component.scss']
})
export class OverviewPillTabComponent {


  constructor(private apiService: ApiService, private route: ActivatedRoute, private dynamicFormService: DynamicFormService, private tabService: TabService, private cdRef: ChangeDetectorRef, private sharedService: SharedService, private authService: AuthService, private clipboardApi: ClipboardService) {

  }
  theme: string = this.sharedService.getTheme();
  employeeOverviewPillTabData: any
  employeeSubordinates: any
  overViewForm: FormGroup;
  currentAddressFormData: any = currentAddressFormData;
  homeAddressFormData: any = homeAddressFormData
  emergencyContactFormData: any = emergencyContactFormData;
  tabHeaderText:string
  currentAddressForm: FormGroup;
  isOverViewFormSaveDisabled: boolean = true
  homeAddressForm: FormGroup
  isProcessing: boolean = false;
  sameAsCurrentAddress: boolean = false;
  submit: boolean = false;
  finalForm: any = {};
  detectedError: boolean;
  isOnboarded: any
  currentWorkEmail: any
  emergencyContactForm: FormGroup;
  currentTab:string
  isTabsFormSaveDisabled:boolean=true
  employeeIndirectSubordinates: any
  currentAddressFormSaved: boolean = false
  tabLoading:boolean=false
  isDrawerOpen: boolean = false
  homeAddressFormSaved: boolean = false
  openedFormDrawerId: string;
  employeeOverviewMeta: DetailsCardData = {
    meta: detailsCardEmployeeOverviewMeta,
    data: []
  };
  private routeSub: Subscription | undefined;
  rolesList: any = [];
  rolesForm: FormGroup;
  rolesFormData: any = rolesFormData;
viewMode:boolean=false
roleIds:any
currentRoleId:any
  formTemplate: TemplateRef<any>;
  formTemplateCurrentAddress: TemplateRef<any>;
  formTemplateHomeAddress: TemplateRef<any>;
  formTemplateTabs:TemplateRef<any>;
  overViewTabsMeta: TrazepoidTabsMeta[] = overViewTabsMeta;
  openOverViewTab: boolean = false
  formData: any = overViewTabsFormData;
  id: string | number;
  emailLoader: boolean = false
  emailExist: boolean = false

  @ViewChild('customTemplate') customTemplate: TemplateRef<any>;

  @ViewChild('emergencyContactTemplate') emergencyContactTemplate: TemplateRef<any>;
  @ViewChild('rolesTemplate') rolesTemplate: TemplateRef<any>;


  ngOnInit(): void {

    this.sharedService.employeeDetails$.subscribe((data: any) => {
      this.employeeOverviewPillTabData = data?.employeeOverview?.personalDetails
        ;
      this.employeeSubordinates = data?.employeeOverview?.subordinates
      this.isOnboarded = data?.employeeOverview?.personalDetails?.isOnboarded



      this.employeeIndirectSubordinates = data?.employeeOverview?.inDirectSubordinates
      this.currentWorkEmail= data?.employeeOverview?.personalDetails?.workEmail
    });


    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.apiService.get('setup/access/roles').subscribe({
      next: (result) => {
        this.rolesList = result['data'];
      }
    });


    this.overViewForm = this.dynamicFormService.createControl(this.formData);
    this.currentAddressForm = this.dynamicFormService.createControl(this.currentAddressFormData);
    this.homeAddressForm = this.dynamicFormService.createControl(this.homeAddressFormData);
    this.emergencyContactForm= this.dynamicFormService.createControl(this.emergencyContactFormData);
    this.rolesForm= this.dynamicFormService.createControl(this.rolesFormData);


    // if (res.data.grade) {
    //   this.filterDesignation(res.data.grade)
    // }
    this.patchData()
    this.overViewForm.get('workEmail').valueChanges.subscribe(value => {
      this.emailLoader = false;
      if (this.overViewForm.get('workEmail').value?.length >= 3 && this.overViewForm.get('workEmail').value!=this.currentWorkEmail!) {
        this.emailExist = false;
        this.emailLoader = true
        this.apiService.get(`core-hr/employee/check?email=${this.overViewForm.get('workEmail').value}`).subscribe({
          next: (res: any) => {
            if (res) {
              if (res.availabilityStatus) {
                this.emailExist = false;
              }
              else {
                this.emailExist = true;
              }
              this.emailLoader = false;
              this.cdRef.detectChanges();
            }
          },
          error: (error: any) => {
            this.detectedError = true;
            this.emailLoader = false;


          }
        });
      }
      else{
        this.emailExist = false;
      }

    });


    if (this.employeeOverviewPillTabData?.sameAsCurrentAddress) {
      this.sameAsCurrentAddress = true
    }
  }

  patchData() {
    this.overViewForm.patchValue(this.employeeOverviewPillTabData)
    this.currentAddressForm.patchValue(this.employeeOverviewPillTabData)
    this.homeAddressForm.patchValue(this.employeeOverviewPillTabData)
    this.cdRef.detectChanges();

    if (this.currentAddressForm.value.currentAddressLine1) {
      this.currentAddressFormSaved = true
    }
    else {
      this.currentAddressFormSaved = false
    }

    if (this.homeAddressForm.value.homeAddressLine1) {
      this.homeAddressFormSaved = true
    }
    else {
      this.homeAddressFormSaved = false
    }

  }

  handleEditEvent() {


  }
  onViewClicked() {
    this.sharedService.onModalClose();
    //  window.location.reload();
  }

  getFormTemplate(template: TemplateRef<any>, headerText: string, name: string) {
    if (name == 'currentAddress') {
      this.formTemplateCurrentAddress = template;
      this.isDrawerOpen = true
      this.openedFormDrawerId = 'kt_drawer_form_currentAddress';
    }
    else if (name == 'homeAddress') {
      this.formTemplateHomeAddress = template;
      this.openedFormDrawerId = 'kt_drawer_form_homeAddress'
    }
    else {
      this.patchData()
      this.formTemplate = template;
      this.openOverViewTab = true
      this.openedFormDrawerId = 'kt_drawer_form_overview_employee'
      this.cdRef.detectChanges();

    }

  }


  onDrawerSaveOverViewEmployeeForm(event) {
    this.openOverViewTab = false
    this.onSubmit()
  }
  cancelOverViewEmployeeForm(event) {
    this.openOverViewTab = false
  }
  onDrawerSaveCurrentAddress(event) {
    if (this.currentAddressForm.value.currentAddressLine1) {
      this.currentAddressFormSaved = true
    }
    else {
      this.currentAddressFormSaved = false
    }
    setTimeout(() => {
      this.openedFormDrawerId = 'kt_drawer_form_overview_employee'
    }, 250);
  }
  cancelCurrentAddressForm(event) {
    setTimeout(() => {
      this.openedFormDrawerId = 'kt_drawer_form_overview_employee'
    }, 250);
  }
  onDrawerSaveHomeAddress(event) {
    if (this.homeAddressForm.value.homeAddressLine1) {
      this.homeAddressFormSaved = true
    }
    else {
      this.homeAddressFormSaved = false
    }
    setTimeout(() => {
      this.openedFormDrawerId = 'kt_drawer_form_overview_employee'
    }, 250);
  }

  cancelHomeAddressForm(event) {
    setTimeout(() => {
      this.openedFormDrawerId = 'kt_drawer_form_overview_employee'
    }, 250);
  }

  onSubmit() {

    this.isProcessing = true;
    this.submit = true;

    if (this.overViewForm.invalid || this.emailExist || this.emailLoader) {
      this.isProcessing = false;
      this.isOverViewFormSaveDisabled = true
      return;
    }
    else {
      //edit
      this.isOverViewFormSaveDisabled = false
      this.submit = false;
      let updatedOverViewForm = this.dynamicFormService.getUpdatedData(this.overViewForm)
      let updatedHomeAddressForm = this.dynamicFormService.getUpdatedData(this.homeAddressForm)
      let updatedCurrentAddressForm = this.dynamicFormService.getUpdatedData(this.currentAddressForm)



      let data = { ...updatedOverViewForm, ...updatedHomeAddressForm, ...updatedCurrentAddressForm };


     this.submitingData(data)
    }
  }



submitingData(data){
  this.apiService.put(`core-hr/employee/${this.id}`, data, 'employee').subscribe({
    next: (res: any) => {
      if (res) {
        this.isProcessing = false;
        this.isOverViewFormSaveDisabled = false
        this.cdRef.detectChanges();
        this.sharedService.handleSuccessModel({ id: this.id, btnTemplate: this.customTemplate });
        this.sharedService.updateEmployeeData()
        this.tabLoading=false
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



  onCopyCurrentToHomeClick(event) {
    if (!event.target.checked) {
      this.sameAsCurrentAddress = false;
      // this.homeAddressForm.reset();
      this.cdRef.detectChanges();
    }
    else {
      if (this.currentAddressForm.value) {
        this.sameAsCurrentAddress = true;
        let currentAddressValues = this.currentAddressForm.value;
        // Patch the values to the homeAddressForm
        this.homeAddressForm.patchValue({
          "homeAddressLine1": currentAddressValues.currentAddressLine1,
          "homeAddressLine2": currentAddressValues.currentAddressLine2,
          "homeCity": currentAddressValues.currentCity,
          "homeState": currentAddressValues.currentState,
          "homePostalCode": currentAddressValues.currentPostalCode,
          "homeCountry": currentAddressValues.currentCountry,
        });
      }
    }
  }



  open(type,id,data,tab,meta){
    if(tab=='emergencyContact'){

      if(type=='view'){
        this.viewMode=true
      }
      else{
        this.viewMode=false
      }


      this.currentTab=tab
      this.emergencyContactForm.patchValue({
        "relationship":data?.relationship?.id,
        "address":data?.address,
        "name":data?.name,
        "phoneNumber":data?.phoneNumber,
        "id":data?.id
      })
      this.tabHeaderText='Emergency Contact'
     this.formTemplateTabs = this.emergencyContactTemplate;
    }

    if(tab=='roles'){
      if(type=='view'){
        this.viewMode=true
      }
      else{
        this.viewMode=false
      }

      this.roleIds = meta?.data?.map(role => role.id);
     this.currentRoleId = data?.id

      this.currentTab=tab
      this.formTemplateTabs = this.rolesTemplate;
      this.tabHeaderText='Roles'
      this.rolesForm.patchValue({
        "roles":data?.id,
        "id":data?.id
      })

    }

  }


  onDrawerSavetabsForm(event){

    if(this.currentTab=='emergencyContact' && !this.emergencyContactForm.invalid){
      this.isTabsFormSaveDisabled=false
      this.submitEmergencyContactDetails()
    }

    if(this.currentTab=='roles' && !this.rolesForm.invalid){
      this.isTabsFormSaveDisabled=false
      this.submitRoleDetails()

    }


  }
  cancelTabsForm(event){
    this.tabLoading=true
    setTimeout(() => {
      this.tabLoading = false;
    }, 10);
    this.isTabsFormSaveDisabled=true
    this.viewMode=false
}



submitEmergencyContactDetails(){
  this.tabLoading=true
  this.submitingData({emergencyContact:[this.emergencyContactForm.value]})
}

submitRoleDetails(){
  this.tabLoading=true
  let finalRoleIds: string[];

  if (this.rolesForm.value.roles === this.currentRoleId) {
      finalRoleIds = this.roleIds;
  } else {
      finalRoleIds = this.roleIds.filter(roleId => roleId !== this.currentRoleId);

      if (!finalRoleIds.includes(this.rolesForm.value.roles)) {
          finalRoleIds.push(this.rolesForm.value.roles);
      }
  }

  this.submitingData({roles:finalRoleIds})
}

//////////////////////////////////////////////Roles///////////////////////////////////////////////////////////
onRoleChange(event) {
  let temp = [];
  temp = _.cloneDeep(this.rolesList);
  temp.forEach(role => {

    if (this.rolesForm.value['roles'].some(r => parseInt(r.roles) === parseInt(role.id))) {

      role['disabled'] = true;
    }
    else {
      delete role.disabled;

    }
  })
  this.rolesList = [];
  this.rolesList = _.cloneDeep(temp);
}





}
