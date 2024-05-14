import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { format, parseISO } from 'date-fns';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { JsonListService } from 'src/app/shared/services/json-list/json-list.service';
import { S3UploadService } from 'src/app/shared/services/s3-upload.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { WizardService } from 'src/app/shared/services/wizard.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { WizardTabs } from 'src/app/shared/ui/wizard-tabs/wizard-tabs';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { currentAddressFormData, currentAddressFormSections, emergencyContactFormData, homeAddressFormData, homeAddressFormSections, rolesFormData, step1FormData, step1FormSections, step2FormData, step2FormSections, step3FormData, step3FormSections, uploadDocumentFormData, wizardTabs } from './employee-form.data';
// import { classFormData, classFormSections } from '../../organisation/class/class.data';
const _ = require('lodash');
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent {
  isPhoneValid: boolean = true;
  classForm: FormGroup;
  typeSelect: any = 'normal'
  isProcessing: boolean = false;
  subListLoading: boolean = true;
  emailLoader: boolean = false;
  parentListLoading = true;
  submit: boolean = false;
  next: boolean = false;
  emailExist: boolean = false;
  theme: string = this.sharedService.getTheme();
  id: string | number;
  col: number = 6;
  isLoading: boolean = false;
  isEditDocument: boolean = false;
  onEditDocumentIndex: number;;
  empId: string;
  classLabels;
  subsidiaryCondition: string[] = [];
  options: any = [];
  formName: any;
  private modalRef: NgbModalRef;
  detectedError: boolean;
  private routeSub: Subscription | undefined;
  wizardData: WizardTabs = wizardTabs;
  currencyState: boolean = true;
  // step1FormSections: Sections;
  // step2FormSections: Sections;
  // step3FormSections: Sections;
  currentAddressFormSections: Sections = currentAddressFormSections;
  homeAddressFormSections: Sections = homeAddressFormSections;
  step1FormData: any = step1FormData;
  step2FormData: any = step2FormData;
  step3FormData: any = step3FormData;
  uploadDocumentFormData: any;
  currentAddressFormData: any = currentAddressFormData;
  homeAddressFormData: any = homeAddressFormData;
  emergencyContactFormData: any = emergencyContactFormData;
  rolesFormData: any = rolesFormData;
  browseReset: boolean = false;
  step1Form: FormGroup;
  step2Form: FormGroup;
  step3Form: FormGroup;
  uploadDocumentForm: FormGroup;
  homeAddressForm: FormGroup;
  currentAddressForm: FormGroup;
  emergencyContactForm: FormGroup;
  rolesForm: FormGroup;
  private subs = new SubSink();
  finalForm: any = {};
  saveAsDraftForm: any = {};
  popupSave: boolean = false;
  savedFormsObject = {};
  currentAddressFormSaved: boolean = false;
  homeAddressFormSaved: boolean = false;
  emergencyContactFormSaved: boolean = false;
  rolesFormSaved: boolean = false;
  uploadFormSaved: boolean = false;
  rolesList: any = [];
  countryList: any;
  fileList: any = [];
  documentTypeList: any;
  currentStep: any;
  formSections: any;
  step: any;
  listLoading = false;
  formTemplate: TemplateRef<any>;
  headerText: string;
  showUploadForm: boolean = false;
  enableTrackApplication: boolean = false;
  private subscriptions: Subscription[] = [];
  enableRole: boolean = false;
  cancelForms = [];
  saveForms = [];
  valuesForTooltip: any;
  currentAddressToolTipValues: any = {
    "currentAddressLine1": "",
    "currentAddressLine2": "",
    "currentCity": "",
    "currentState": "",
    "currentPostalCode": "",
    "currentCountry": "",
  };
  homeAddressToolTipValues: any = {
    "homeAddressLine1": "",
    "homeAddressLine2": "",
    "homeCity": "",
    "homeState": "",
    "homePostalCode": "",
    "homeCountry": ""
  }
  currentAddressTooltipString: string = ''
  homeAddressTooltipString: string = '';
  emergencyContactToolTipValues: string = '';
  rolesToolTipValues: string = '';;
  uploadedDocuments: any = [1];
  uploadFormArray: any = [];
  documentFiles: any = [];
  selectedCurrency: any;
  // empOnboardId: any
  empData: any;
  currentURL: string;
  pathId: any;
  @ViewChild('customTemplate') customTemplate: TemplateRef<any>;
  designationList: any = [];
  locationList: any = [];
  departmentList: any = [];
  classList: any = [];
  patchData: any;
  currencyData: any = {};
  editResponse: any;
  isSaveDisabled: any = true;
  sameAsCurrentAddress: boolean = false;
  newCountryCode: any;
  subsidiaryCountryCode: any;
  rolesPatchValue: any;

  constructor(
    private router: Router, private dynamicFormService: DynamicFormService, private fb: FormBuilder, private modalService: NgbModal, private apiService: ApiService, private wizardService: WizardService, private route: ActivatedRoute, public sharedService: SharedService, private cdRef: ChangeDetectorRef, private _location: Location, private s3service: S3UploadService, private sanitizer: DomSanitizer, private jsonListService: JsonListService) {
    this.getFormDetails();
  }

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

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    const wizradSub = this.wizardService.currentStep$.subscribe(currentStep => {
      this.currentStep = currentStep;
      this.getFormDetails();

    });
    this.apiService.get('setup/access/roles?limit=max','dropdown').subscribe({
      next: (result) => {
        this.rolesList = result['data'];
      }
    });

    this.cancelForms = [];
    this.saveForms = [];
    this.listLoading = true;

    this.step1Form.patchValue({
      "statusId": 1
    });
    this.subscriptions.push(wizradSub)
    this.subscriptions.push(this.routeSub)
  }

  ngAfterViewInit() {

    if (this.id) {
      this.isLoading = true;
      this.apiService.get(`core-hr/employee/${this.id}`, 'edit').subscribe({
        next: (res: any) => {
          if (res) {
            this.editResponse = res.data;
            this.subsidiaryCondition = [`subsidiary=${this.editResponse?.subsidiary?.id}`];
            this.currencyData = this.editResponse?.currency ? this.editResponse?.currency : undefined;
            this.step1Form.patchValue(res.data);
            this.step2Form.patchValue(res.data);
            this.patchForm(res.data);
            this.currentAddressToolTipValues["currentCountry"] = res?.data?.currentCountry?.name;
            this.homeAddressToolTipValues["homeCountry"] = res?.data?.homeCountry?.name;
            if (res.data.grade) {
              this.filterDesignation(res.data.grade)
            }
            this.isLoading = false;
          }
        }, error: (error: any) => {
          this.detectedError = true;
          this.isLoading = false;
        }
      });
    }
    this.cdRef.detectChanges();
  }
  toggleTrackApplication(event) {
    this.enableTrackApplication = !this.enableTrackApplication;
    this.cdRef.detectChanges();
  }

  filterBasedOnSubsidiarySelected(event) {
    if (event) {
      this.subsidiaryCountryCode = event?.country?.id;
      this.newCountryCode = this.subsidiaryCountryCode;
      this.step1Form.patchValue({
        "currency": event?.currency?.id,
        "locationId":null,
        "departmentId":null,
        "classId":null
      })
      this.currencyData = event?.currency

      this.subsidiaryCondition = [`subsidiary=${event.id}`]
    }
    else{
      this.subsidiaryCondition = [];
      this.step1Form.patchValue({
        "currency": "",
        "locationId":null,
        "departmentId":null,
        "classId":null
      })
      this.subsidiaryCountryCode = "";
      this.newCountryCode = "";
    }
    this.cdRef.detectChanges();
  }

  filterDesignation(event) {
    if(event){
      this.designationList = event.designation;
      this.step1Form.patchValue({
        "designationId":null
      })
    }
    else{
      this.designationList = [];
      this.step1Form.patchValue({
        "designationId":null
      })
    }
  }


  onCancel() {
    this._location.back();
  }

  viewdetails() {
    this.router.navigate(['/employee-hub/profiles/employee/view', this.id]);
  }
  goToOnboard() {
    this.router.navigate(['/employee-hub/profiles/payroll-enrollment', this.id]);
  }

  onSaveAsDraft() {
    let data;
    switch (this.currentStep) {
      case 1:
        if (!this.step1Form.invalid) {
          this.saveAsDraftForm = { ...this.step1Form.value };
          this.saveAsDraftForm['isDraft'] = true;
          data = this.saveAsDraftForm;
          data.createdBy = 1
          if (!this.id) {
            this.apiService.post(`core-hr/employee`, data, 'employee').subscribe({
              next: (res: any) => {
                if (res) {
                  this.isProcessing = false;
                  this.cdRef.detectChanges();
                  this.id = res._id;
                  this.sharedService.handleSuccessModel({ id: res._id, btnTemplate: this.customTemplate });
                }
              },
              error: (error: any) => {
                this.detectedError = true;
                this.isProcessing = false;
                this.cdRef.detectChanges();

                //
              }
            }
            );
          }
        }
        break;
      case 2:
        if (!this.step1Form.invalid && !this.step2Form.invalid) {
          // this.savedFormsObject["emergencyContactForm"] = this.emergencyContactForm.value["contacts"];
          this.saveAsDraftForm = { ...this.step1Form.value, ...this.step2Form.value };
          this.saveAsDraftForm['isDraft'] = true;
          data = this.saveAsDraftForm;
          data.createdBy = 1
          if (!this.id) {
            this.apiService.post(`core-hr/employee`, data,'employee').subscribe({
              next: (res: any) => {
                if (res) {
                  this.isProcessing = false;
                  this.cdRef.detectChanges();
                  this.id = res?._id;
                  this.sharedService.handleSuccessModel({ id: res._id, btnTemplate: this.customTemplate });
                }
              },
              error: (error: any) => {
                this.detectedError = true;
                this.isProcessing = false;
                this.cdRef.detectChanges();

                //
              }
            }
            );
          }
        }
        break;
      case 3:
        if (!this.step1Form.invalid && !this.step2Form.invalid && !this.step3Form.invalid) {
          this.saveAsDraftForm = { ...this.step1Form.value, ...this.step2Form.value, ...this.step3Form.value };
          this.saveAsDraftForm['isDraft'] = true;
          data = this.saveAsDraftForm;
          data.createdBy = 1
          if (!this.id) {
            this.apiService.post(`core-hr/employee`, data,'employee').subscribe({
              next: (res: any) => {
                if (res) {
                  this.isProcessing = false;
                  this.cdRef.detectChanges();
                  this.id = res?._id;
                  this.sharedService.handleSuccessModel({ id: res._id, btnTemplate: this.customTemplate });
                }
              },
              error: (error: any) => {
                this.detectedError = true;
                this.isProcessing = false;
                this.cdRef.detectChanges();

                //
              }
            }
            );
          }
        }
        break;
    }
  }


  onSubmit() {

    this.isProcessing = true;
    this.submit = true;

    if (this.step1Form.invalid || this.step2Form.invalid) {
      this.isProcessing = false;
      return;
    }
    else {
      //edit
      if (this.id) {
        if (this.step1Form.dirty) {
          Object.assign(this.finalForm, this.step1Form.value)
        }

        if (this.step2Form.dirty) {
          Object.assign(this.finalForm, this.step2Form.value)
        }
        if (this.currentAddressForm.dirty) {
          Object.assign(this.finalForm, this.currentAddressForm.value)
        }
        if (this.homeAddressForm.dirty) {
          Object.assign(this.finalForm, this.homeAddressForm.value)
        }
        if (this.emergencyContactForm.dirty || (this.editResponse ? this.editResponse.emergencyContact.length !== this.emergencyContactForm.value['contacts'].length : true)) {
          this.finalForm['emergencyContact'] = this.emergencyContactForm.value.contacts
        }
        if (this.enableRole && this.rolesForm.value?.roles) {
          let rolesArray = [];
          this.rolesForm.value?.roles.forEach(element => {

            if (element.roles !== null) {
              rolesArray.push(Number(typeof element.roles === 'object' ? element.roles.id : element.roles))
            }
          });



          if (this.rolesForm.dirty || (this.editResponse ? this.editResponse.roles.length !== rolesArray.length : true)) {
            this.finalForm['roles'] = rolesArray.length === 0 ? null : rolesArray;
          }
        }
      }
      //create
      else {
        Object.assign(this.finalForm, this.step1Form.value);
        Object.assign(this.finalForm, this.step2Form.value);
        Object.assign(this.finalForm, this.currentAddressForm.value);
        Object.assign(this.finalForm, this.homeAddressForm.value);

        if (this.emergencyContactForm && this.emergencyContactForm.value['contacts'][0].phoneNumber !== null) {
          this.finalForm['emergencyContact'] = this.emergencyContactForm.value.contacts
          this.finalForm['emergencyContact'].map(contact => {
            delete contact.id
          })
        }


        if (this.enableRole && this.rolesForm.value?.roles) {
          let rolesArray = [];

          this.rolesForm.value?.roles.forEach(element => {

            if (element.roles !== null) {
              rolesArray.push(Number(typeof element.roles === 'object' ? element.roles.id : element.roles))
            }
          });



          if (this.rolesForm.dirty || (this.editResponse ? this.editResponse.roles.length !== rolesArray.length : true)) {
            this.finalForm['roles'] = rolesArray.length === 0 ? null : rolesArray;
          }
        }
      }

      if (this.uploadFormSaved) {
        this.finalForm['documents'] = this.uploadFormArray;
      }



      if (Object.keys(this.finalForm).length > 0) {
        this.finalForm['isDraft'] = false;
        this.finalForm.createdBy = 1
      }
      this.submit = false;
      let data = this.finalForm;



      if (!this.id) {
        //
        this.apiService.post(`core-hr/employee`, data,'employee').subscribe({
          next: (res: any) => {
            if (res) {
              this.isProcessing = false;
              this.cdRef.detectChanges();
              this.id = res?._id
              // this.empOnboardId = res._id;
              //
              localStorage.clear();
              this.sharedService.handleSuccessModel({ id: res._id, btnTemplate: this.customTemplate });
            }
          },
          error: (error: any) => {
            this.detectedError = true;
            this.cdRef.detectChanges();
            this.isProcessing = false;

          }
        }
        );
      }
      else {


        this.apiService.put(`core-hr/employee/${this.id}`, data, 'employee').subscribe({
          next: (res: any) => {
            if (res) {
              this.isProcessing = false;
              this.cdRef.detectChanges();
              if (this.editResponse.isOnboarded) {
                this.sharedService.handleSuccessModel({ id: this.id });
              }
              else {
                this.sharedService.handleSuccessModel({ id: this.id, btnTemplate: this.customTemplate });
              }

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

            //
          }
        });
      }
    }
  }
  cancelPopupForm(event, formName?) {
    let formdata = formName.split(' ').join('').toLocaleLowerCase();
    if (!this.cancelForms.includes(formdata)) {
      this.cancelForms.push(formdata);
    }
    switch (formName) {
      case 'currentAddress':
        this.currentAddressFormSaved = false;
        this.currentAddressForm.reset();
        break;
      case 'homeAddress':
        this.homeAddressFormSaved = false;
        this.sameAsCurrentAddress = false;
        this.homeAddressForm.reset();
        break;
      case 'emergencyContact':
        this.emergencyContactFormSaved = false;
        this.emergencyContactForm.reset();
        break;
      case 'roles':
        this.rolesFormSaved = false;
        this.rolesForm.reset();
        break;
      case 'uploadFile':
        this.isEditDocument = false;
        this.onEditDocumentIndex = undefined;
        this.uploadFormSaved = false;
        this.resetFilePond()
        this.enableTrackApplication = false;
        this.uploadDocumentForm.reset();
        break;
    }
    this.setTooltipValues();
  }

  setTooltipValues() {
    //setting currentAddressTooltip

    if (this.currentAddressForm) {
      this.currentAddressToolTipValues["currentAddressLine1"] = this.currentAddressForm?.value?.currentAddressLine1;
      this.currentAddressToolTipValues["currentAddressLine2"] = this.currentAddressForm?.value?.currentAddressLine2;
      this.currentAddressToolTipValues["currentCity"] = this.currentAddressForm?.value?.currentCity;
      this.currentAddressToolTipValues["currentState"] = this.currentAddressForm?.value?.currentState;
      this.currentAddressToolTipValues["currentPostalCode"] = this.currentAddressForm?.value?.currentPostalCode;

      this.currentAddressForm.patchValue({
        'currentCountry': this.currentAddressForm?.value?.currentCountry
      })
      const filteredCurrentAddressValues = Object.values(this.currentAddressToolTipValues).filter(value => value !== undefined && value !== '' && value !== null);

      this.currentAddressTooltipString = filteredCurrentAddressValues.length > 0 ? filteredCurrentAddressValues.join(', ') : '';

    }


    //setting homeAddressTooltip
    if (this.homeAddressForm) {
      if (this.sameAsCurrentAddress) {
        let currentAddressValues = this.currentAddressForm.value;
        this.sameAsCurrentAddress = true;
        // Patch the values to the homeAddressForm
        this.homeAddressForm.patchValue({
          "homeAddressLine1": currentAddressValues.currentAddressLine1,
          "homeAddressLine2": currentAddressValues.currentAddressLine2,
          "homeCity": currentAddressValues.currentCity,
          "homeState": currentAddressValues.currentState,
          "homePostalCode": currentAddressValues.currentPostalCode,
          "homeCountry": currentAddressValues.currentCountry,
        });



        this.homeAddressTooltipString = this.currentAddressTooltipString;

      } else {
        this.homeAddressToolTipValues["homeAddressLine1"] = this.homeAddressForm?.value?.homeAddressLine1;
        this.homeAddressToolTipValues["homeAddressLine2"] = this.homeAddressForm?.value?.homeAddressLine2;
        this.homeAddressToolTipValues["homeCity"] = this.homeAddressForm?.value?.homeCity;
        this.homeAddressToolTipValues["homeState"] = this.homeAddressForm?.value?.homeState;
        this.homeAddressToolTipValues["homePostalCode"] = this.homeAddressForm?.value?.homePostalCode;

        this.homeAddressForm.patchValue({
          'homeCountry': this.homeAddressForm?.value?.homeCountry
        })

        const filteredHomeAddressValues = Object.values(this.homeAddressToolTipValues).filter(value => value !== undefined && value !== '' && value !== null);

        this.homeAddressTooltipString = filteredHomeAddressValues.length > 0 ? filteredHomeAddressValues.join(', ') : '';
      }
      this.cdRef.detectChanges();
    }

    //setting emergency contact tooltip
    if (this.emergencyContactForm) {
      let emergencyContactCount = this.emergencyContactForm.value.contacts.filter(contact => contact.name !== null && contact.name !== undefined && contact.name !== '')?.length

      this.emergencyContactToolTipValues = emergencyContactCount > 0 ? `${emergencyContactCount} Contacts Added` : '';
    }

    if (this.rolesForm) {
      let rolesCount = this.rolesForm.value.roles.filter(role => role.roles !== null && role.roles !== undefined && role.roles !== '')?.length

      this.rolesToolTipValues = rolesCount > 0 ? `${rolesCount} Roles Added` : '';
    }
  }

  onCountryChange(event, formName) {
    if (formName === 'currentAddress') {
      this.currentAddressToolTipValues["currentCountry"] = event.name;
    }
    if (formName === 'homeAddress') {
      this.homeAddressToolTipValues["homeCountry"] = event.name;
    }




  }

  savePopupForm(event, formName?) {
    let formdata = formName.split(' ').join('').toLocaleLowerCase();
    if (!this.saveForms.includes(formdata)) {
      this.saveForms.push(formdata);
    }
    switch (formName) {
      case 'currentAddress':


        if (this.currentAddressForm.value.currentAddressLine1 && this.currentAddressForm.value.currentCity && this.currentAddressForm.value.currentCountry && this.currentAddressForm.value.currentState) {
          this.isSaveDisabled = false;
          this.currentAddressFormSaved = true;
        }
        else {
          this.isSaveDisabled = true;
        }
        break;
      case 'homeAddress':
        if (this.homeAddressForm.value.homeAddressLine1 && this.homeAddressForm.value.homeCity && this.homeAddressForm.value.homeCountry && this.homeAddressForm.value.homeState) {
          this.isSaveDisabled = false;
          this.homeAddressFormSaved = true;
        }
        else {
          this.isSaveDisabled = true;
        }
        break;
      case 'emergencyContact':

        const formArrayControls = this.contacts.controls;

        const values = formArrayControls.map(control => control.value);

        const isAllPhoneValid = values.every(value => value.isValid === true);

        if (this.emergencyContactForm.get('contacts').invalid || !isAllPhoneValid) {
          this.isSaveDisabled = true;
          this.popupSave = true;
        }
        else {
          this.popupSave = false;

          this.emergencyContactFormSaved = true;
          this.isSaveDisabled = false;
        }
        break;
      case 'roles':
        this.rolesFormSaved = true;
        break;
      case 'uploadFile':


        if ((!this.isEditDocument && (this.uploadDocumentForm.value["browse"] === undefined || this.uploadDocumentForm.value["browse"] === null)) || this.uploadDocumentForm.value['documentTypeId'] === null || this.uploadDocumentForm.value['documentName'] === null || (this.enableTrackApplication && this.uploadDocumentForm.value["expiryDate"] === null)) {
          this.isSaveDisabled = true;

          this.cdRef.detectChanges();
        }
        else {
          this.uploadFormSaved = true;
          this.isSaveDisabled = false;




          if (!this.enableTrackApplication) {
            this.uploadDocumentForm.patchValue({
              "placeOfIssue": undefined,
              "issueDate": undefined,
              "issueAuthority": undefined,
              "expiryDate": undefined,
              "country": undefined,
              "credentialNumber": undefined
            });
          }

          if (!this.isEditDocument) {
            this.uploadDocumentForm.patchValue({
              "documentPath": this.uploadDocumentForm.value["browse"]
            });
            this.uploadFormArray.push(this.uploadDocumentForm.value);
          } else {
            if (this.uploadDocumentForm.value?.browse === null && this.uploadFormArray[this.onEditDocumentIndex]['browse'].length > 0) {
              this.uploadDocumentForm.patchValue({
                "documentPath": this.uploadFormArray[this.onEditDocumentIndex]['browse'],
                "browse": this.uploadFormArray[this.onEditDocumentIndex]['browse']
              });
            } else if (this.uploadDocumentForm.value?.browse !== null) {
              this.uploadDocumentForm.patchValue({
                "documentPath": this.uploadDocumentForm.value["browse"]
              });
            }
            if (this.id && this.uploadFormArray[this.onEditDocumentIndex].id) {

            }

            const existingData = this.uploadFormArray[this.onEditDocumentIndex];

            Object.keys(existingData).forEach(key => {
              if (key in this.uploadDocumentForm.value) {
                existingData[key] = this.uploadDocumentForm.value[key];
              }
            });

            this.isEditDocument = false;
            this.onEditDocumentIndex = null;
          }

          this.uploadDocumentForm.reset();

          this.resetFilePond()
          this.enableTrackApplication = false;
          this.cdRef.detectChanges();

          // if (this.uploadDocumentForm.value["trackApplication"]) {
          //   this.uploadDocumentForm.value["browse"].forEach(doc => {
          //     let name = doc.split('.')[0].split('/')[1].toUpperCase();
          //     let type = doc.split('.')[1].toLowerCase();
          //     this.fileList.push({ "name": name, "type": type, "docPath": doc });
          //   })
          // }

          // this.uploadedDocuments.forEach((doc, index) => {
          //   if (index !== 0) {
          //     this.s3service.uploadFile(doc.file).then((docKey: string) => {
          //       this.documentFiles.push(docKey);
          //       let path = docKey.split('/');
          //       this.fileList.push({ "name": path[path.length - 1], "type": doc.type, "docPath": docKey });
          //       this.cdRef.detectChanges();
          //     })
          //       .catch((error: any) => {
          //         console.error('Error patching image key:', error);
          //       });
          //   }
          // });

          // this.uploadDocumentForm.reset();
          // this.uploadedDocuments = [1];
          // this.documentFiles = [];
          // this.enableTrackApplication = false;

        }
        break;
    }
    this.setTooltipValues();
    this.cdRef.detectChanges();
  }



  patchForm2OnEdit() {
    // patching step2Form
    if (this.editResponse.isWebLogin) {

      this.enableRole = true;
    }
    else {
      this.enableRole = false;
    }
    this.step2Form.patchValue(this.editResponse);
    this.step2Form.patchValue({
      "bloodGroup": this.editResponse?.bloodGroup ? this.editResponse?.bloodGroup : '',
      "maritalStatus": this.editResponse?.maritalStatus ? this.editResponse?.maritalStatus : '',
      "gender": this.editResponse?.gender ? this.editResponse?.gender : '',
      "nationality": this.editResponse?.nationality ? this.editResponse?.nationality : '',
      "religion": this.editResponse?.religion ? this.editResponse?.religion : '',
      "ethnicity": this.editResponse?.ethnicity ? this.editResponse?.ethnicity : '',
      "dateOfBirth": this.editResponse?.dateOfBirth ? format(parseISO(this.editResponse?.dateOfBirth), 'yyyy/MM/dd') : ''
    });

    this.currentAddressForm.patchValue(this.editResponse);
    this.currentAddressForm.patchValue({
      "currentCountry": this.editResponse?.currentCountry?.id
    })
    this.homeAddressForm.patchValue(this.editResponse);
    this.homeAddressForm.patchValue({
      "homeCountry": this.editResponse?.homeCountry?.id
    })



    //patching Emergency contacts



    if (this.editResponse.emergencyContact && this.editResponse.emergencyContact.length > 0) {
      this.contacts.clear();

      for (let i = 0; i < this.editResponse.emergencyContact.length; i++) {
        this.editResponse.emergencyContact[i]['relationship'] = this.editResponse.emergencyContact[i]['relationship']?.id
        this.addNewEmergencyContact();

      }
      this.contacts.patchValue(this.editResponse.emergencyContact);
    }



    //patching Roles


    let rolesArray = this.editResponse.roles.map(role => {
      return { roles: role };
    });



    if (this.editResponse.roles && this.editResponse.roles.length > 0) {
      this.roles.clear();
      for (let i = 0; i < this.editResponse.roles.length; i++) {
        this.addNewRole();

        this.roles.patchValue(rolesArray);
      }



      this.rolesToolTipValues = this.rolesForm.value.roles.length + " Roles Added";
    }
    else {
      if (this.id) {
        this.rolesToolTipValues = this.editResponse.roles.length + " Roles Added";
      }
    }





    this.setTooltipValues();
  }

  toggleEnableRole() {
    this.enableRole = !this.enableRole
  }
  switchTab(event) {
    let CurrentFormName = "step" + event + 'Form';
    let currentForm: any;
    if (event === 1) {

      currentForm = this.step1Form;
    }
    else if (event === 2) {
      currentForm = this.step2Form;
    }
    else if (event === 3) {
      currentForm = this.step3Form
    }
    switch (this.currentStep) {
      case 1:
        this.savedFormsObject["step1Form"] = this.step1Form.value;
        this.currentStep = event;
        currentForm.patchValue(this.savedFormsObject[CurrentFormName]);
        this.step1Form.patchValue(this.savedFormsObject["step1Form"]);
        this.cdRef.detectChanges();
        break;
      case 2:
        this.savedFormsObject["step2Form"] = this.step2Form.value;
        this.currentStep = event;
        currentForm.patchValue(this.savedFormsObject[CurrentFormName]);
        this.step2Form.patchValue(this.savedFormsObject["step2Form"]);
        this.cdRef.detectChanges();
        break;
      case 3:
        this.savedFormsObject["uploadDocumentForm"] = this.uploadDocumentForm.value;
        this.currentStep = event;
        currentForm.patchValue(this.savedFormsObject[CurrentFormName]);
        this.step3Form.patchValue(this.savedFormsObject["uploadDocumentForm"]);
        this.cdRef.detectChanges();
        break;
    }
  }

  onBack() {
    this.saveFormData();

    this.currentStep = Math.max(1, this.currentStep - 1);
    this.wizardService.setCurrentStep(this.currentStep);

    this.restoreFormData();
  }

  onNext() {
    this.next = true;
    switch (this.currentStep) {
      case 1:
        if (this.validateStep1Form()) {
          this.saveFormData();
          this.next = false;
          this.loadStep2FormData();
        }
        break;
      case 2:
        if (this.validateStep2Form()) {
          this.saveFormData();
          this.next = false;
          this.loadStep3FormData();
        }
        break;
    }

    this.cdRef.detectChanges();
  }

  saveFormData() {
    switch (this.currentStep) {
      case 1:
        this.savedFormsObject["step1Form"] = this.step1Form.value;
        break;
      case 2:
        this.savedFormsObject["step2Form"] = this.step2Form.value;
        this.savedFormsObject["currentAddressForm"] = this.currentAddressForm.value;
        this.savedFormsObject["homeAddressForm"] = this.homeAddressForm.value;
        this.savedFormsObject["emergencyContactForm"] = this.emergencyContactForm.value;
        if (this.enableRole) {
          this.savedFormsObject["rolesForm"] = this.rolesForm.value;
        }
        break;
    }
  }

  restoreFormData() {
    switch (this.currentStep) {
      case 1:
        this.step1Form.patchValue(this.savedFormsObject["step1Form"]);
        break;
      case 2:
        this.step2Form.patchValue(this.savedFormsObject["step2Form"]);
        this.currentAddressForm.patchValue(this.savedFormsObject["currentAddressForm"]);
        this.homeAddressForm.patchValue(this.savedFormsObject["homeAddressForm"]);
        for (let i = 0; i < this.savedFormsObject["emergencyContactForm"].contacts.length - 1; i++) {
          this.addNewEmergencyContact()
        }
        this.contacts.patchValue(this.emergencyContactForm.value.contacts);
        this.emergencyContactForm.patchValue(this.savedFormsObject["emergencyContactForm"]);

        if (this.enableRole) {
          for (let i = 0; i < this.savedFormsObject["rolesForm"].roles.length - 1; i++) {
            this.addNewRole()
          }
          this.roles.patchValue(this.rolesForm.value.roles);
          this.rolesForm.patchValue(this.savedFormsObject["rolesForm"]);
        }
        break;
    }
  }

  validateStep1Form(): boolean {
    if (this.step1Form.invalid) {
      // Handle invalid form
      return false;
    }
    this.savedFormsObject["step1Form"] = this.step1Form.value;
    return true;
  }

  validateStep2Form(): boolean {
    if (this.step2Form.invalid || this.emailExist || this.emailLoader) {
      // Handle invalid form
      return false;
    }
    this.savedFormsObject["step2Form"] = this.step2Form.value;
    this.savedFormsObject["currentAddressForm"] = this.currentAddressForm.value;
    this.savedFormsObject["homeAddressForm"] = this.homeAddressForm.value;
    this.savedFormsObject["emergencyContactForm"] = this.emergencyContactForm.value;
    if (this.enableRole) {
      this.savedFormsObject["rolesForm"] = this.rolesForm.value;
    }
    return true;
  }

  loadStep2FormData() {
    this.currentStep++;
    this.wizardService.setCurrentStep(this.currentStep);
    this.newCountryCode = this.subsidiaryCountryCode;
    this.cdRef.detectChanges();
    if (!("step2Form" in this.savedFormsObject)) {
      this.getFormDetails();
      if (this.id) {
        this.patchForm2OnEdit();
      }
    } else {
      this.restoreFormData();
      if (this.id) {
        this.patchForm2OnEdit();
      }
    }
  }

  loadStep3FormData() {
    this.currentStep++;
    this.wizardService.setCurrentStep(this.currentStep);

    if (this.editResponse?.documents !== undefined && this.editResponse?.documents !== null) {
      this.uploadFormArray = this.editResponse?.documents.map(document => {
        const modifiedDocument = {};
        Object.keys(document).forEach(key => {
          if (key === "country") {
            modifiedDocument[key] = document[key] ? document[key]?.id : null;
          } else if (key === "documentType") {
            modifiedDocument['documentTypeId'] = document[key]?.id;
          } else {
            modifiedDocument[key] = document[key];
          }
        });
        return modifiedDocument;
      });
    }
  }

  get contacts(): FormArray {
    return this.emergencyContactForm.get('contacts') as FormArray;
  }

  get roles(): FormArray {
    return this.rolesForm.get('roles') as FormArray;
  }

  addNewEmergencyContact() {
    let contactForm = this.createContactForm(this.emergencyContactFormData)
    this.contacts.push(contactForm);
    this.newCountryCode = this.subsidiaryCountryCode;
    this.cdRef.detectChanges();
  }

  addNewRole() {
    let roleForm = this.createRoleForm(this.rolesFormData)
    this.roles.push(roleForm);
  }

  createContactForm(form) {
    // const formGroup = {};
    let group = {};
    emergencyContactFormData.labels.forEach((label) => {
      const control = new FormControl(undefined, label.required ? Validators.required : []);
      group[label.labelName.defaultValue] = control;
    })
    group['isValid'] = new FormControl(true);
    return this.fb.group(group);
  }
  createRoleForm(form) {
    // const formGroup = {};
    let group = {};
    rolesFormData.labels.forEach((label) => {
      const control = new FormControl(undefined);
      group[label.labelName.defaultValue] = control;
    })
    return this.fb.group(group);
  }
  getFormDetails() {
    //
    if (this.id) {
      if (this.currentStep <= 1) {
        this.step1Form = this.dynamicFormService.createControl(this.step1FormData);
      }
      if (this.currentStep <= 2) {
        this.step2Form = this.dynamicFormService.createControl(this.step2FormData);
      }
      this.step3Form = this.dynamicFormService.createControl(this.step3FormData);
      this.uploadDocumentForm = this.dynamicFormService.createControl(uploadDocumentFormData);

      if (this.currentStep < 3) {
        this.currentAddressForm = this.dynamicFormService.createControl(this.currentAddressFormData);
        this.homeAddressForm = this.dynamicFormService.createControl(this.homeAddressFormData)
        this.emergencyContactForm = this.fb.group({
          contacts: this.fb.array([])
        });
        this.addNewEmergencyContact();
        this.rolesFormData = rolesFormData;
        this.rolesForm = this.fb.group({
          roles: this.fb.array([])
        });
        this.addNewRole();
      }
      //

    }


    switch (this.currentStep) {
      case 1:
        this.formSections = step1FormSections;
        this.step1FormData = step1FormData;
        if (!this.id) {
          this.step1Form = this.dynamicFormService.createControl(this.step1FormData);
        }
        const storedEmployeeId = localStorage.getItem('employeeId');
        if (!storedEmployeeId) {
          this.apiService.get(`core-hr/employee/generateId`).subscribe({
            next: (res: any) => {
              if (res) {
                this.step1Form.controls['employeeId'].setValue(res.customEmployeeId);
                localStorage.setItem('employeeId', res.customEmployeeId);
                this.listLoading = false;
                this.isProcessing = false;
                this.cdRef.detectChanges();
              }
            },
            error: (error: any) => {
              this.detectedError = true;
              this.isProcessing = false;
              //
            }
          });
        } else {
          this.step1Form.controls['employeeId'].setValue(storedEmployeeId);
          this.listLoading = false;
          this.isProcessing = false;
        }
        break;
      case 2:
        this.formSections = step2FormSections;
        this.step2FormData = step2FormData;
        if (!this.id) {
          this.step2Form = this.dynamicFormService.createControl(this.step2FormData);

          this.step2Form.get('workEmail').valueChanges.subscribe(value => {
            this.emailLoader = false;
            if (this.step2Form.get('workEmail').value?.length >= 3) {
              this.emailExist = false;
              this.emailLoader = true
              this.apiService.get(`core-hr/employee/check?email=${this.step2Form.get('workEmail').value}`).subscribe({
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

                  // console.error(error);
                }
              });
            }

          });
          this.currentAddressForm = this.dynamicFormService.createControl(this.currentAddressFormData);
          this.homeAddressForm = this.dynamicFormService.createControl(this.homeAddressFormData)
          this.emergencyContactForm = this.fb.group({
            contacts: this.fb.array([])
          });
          this.addNewEmergencyContact();
          this.rolesFormData = rolesFormData;
          this.rolesForm = this.fb.group({
            roles: this.fb.array([])
          });
          this.addNewRole();
        }
        break;
      case 3:
        this.formSections = step3FormSections;
        this.step3FormData = step3FormData;
        if (!this.id) {
          this.uploadDocumentForm = this.dynamicFormService.createControl(uploadDocumentFormData);
        }
        this.uploadDocumentFormData = uploadDocumentFormData;
        break;
    }

  }

  patchForm(data) {
    //patching step1Form
    this.step1Form.patchValue({
      "currency": data?.currency?.id,
      "supervisorId": data?.supervisor?.id,
      "indirectReportingId": data?.indirectReporting?.id,
      "locationId": data?.location?.id,
      "subsidiaryId": data?.subsidiary?.id,
      "departmentId": data?.department?.id,
      "classId": data?.class?.id,
      "gradeId": data?.grade?.id,
      "designationId": data?.designation?.id,
      "categoryId": data?.employeeCategory?.id,
      "employeeTypeId": data?.employeeType?.id,
      "statusId": data?.employeeStatus?.id,
      "hireDate": format(new Date(data?.hireDate), 'yyyy/MM/dd'),
    });

    this.cdRef.detectChanges();
  }

  clearElement(event, formName) {
    //
    //
    switch (formName) {
      case 'emergencyContactForm':
        //

        const removeContact = this.emergencyContactForm.get('contacts') as FormArray;
        removeContact.removeAt(event);
        break;
      case 'rolesForm':
        const removeRole = this.rolesForm.get('roles') as FormArray;
        removeRole.removeAt(event);
        break;
    }
    this.cdRef.detectChanges();
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

  assignTemplate(headerText, formTemplate) {
    this.headerText = headerText;
    this.formTemplate = formTemplate;
    if (headerText === 'uploadFile') {
      this.resetFilePond()
      this.isEditDocument = false;
      this.onEditDocumentIndex = undefined;
      this.enableTrackApplication = false;
      this.isSaveDisabled = true;
      this.uploadDocumentForm.reset();

    }
    else {
      this.isSaveDisabled = false;
    }

    this.cdRef.detectChanges();
  }


  editDocument(headerText, formTemplate, index) {
    this.headerText = headerText;
    this.formTemplate = formTemplate;
    this.isEditDocument = true;
    this.onEditDocumentIndex = index;
    let data = this.uploadFormArray[index];

    this.uploadDocumentForm.patchValue(data)
    this.enableTrackApplication = data?.trackingApplication;
    this.uploadDocumentForm.patchValue({
      issueDate: data?.issueDate ? format(new Date(data?.issueDate), 'yyyy/MM/dd') : null,
      expiryDate: data?.expiryDate ? format(new Date(data?.expiryDate), 'yyyy/MM/dd') : null,
    })
    this.uploadDocumentForm.patchValue({
      documentName: data?.documentName,
      documentTypeId: data?.documentTypeId,
      browse: data?.browse
    })

    this.resetFilePond()
    this.cdRef.detectChanges();

  }

  // private resetFilePond() {
  //   this.resetFilePond()
  //   setTimeout(() => {
  //     this.browseReset = false;
  //   }, 1000);
  // }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());

  }
  hasValidationErrors(label: any): boolean {
    return this.submit && label.validations.some(validation => {
      return this.classForm.get(label.labelName.alias)?.hasError(validation.name);
    });
  }
  step1HasValidationErrors(label: any): boolean {
    return this.submit && label.validations.some(validation => {
      return this.step1Form.get(label.labelName.defaultValue)?.hasError(validation.name);
    });
  }
  step2HasValidationErrors(label: any): boolean {
    return this.submit && label.validations.some(validation => {
      return this.step2Form.get(label.labelName.defaultValue)?.hasError(validation.name);
    });
  }
  step3HasValidationErrors(label: any): boolean {
    return this.submit && label.validations.some(validation => {
      return this.step3Form.get(label.labelName.defaultValue)?.hasError(validation.name);
    });
  }
  onPhoneUpdate(event, index) {

    this.contacts.at(index).patchValue({
      "isValid": event
    });

  }
  onPhoneUpdateStep2(event) {
    this.isPhoneValid = event;
  }

  // Step 3: Document Card Action Button
  actionBtnToggleId: number;
  actionBtnToggle: boolean = false;

  onActionBtnToggle(event, index) {
    this.actionBtnToggleId = index;
    this.actionBtnToggle = !this.actionBtnToggle
  }

  onRemoveDocument(event, index) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, cancel!',
      customClass: {
        confirmButton: `btn-${this.theme}`,
      }
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id) {
          // On Edit Form
          const document = this.uploadFormArray[index]

          // Ensure documents exists, initialize if not
          if (!this.finalForm?.destroy) {
            this.finalForm['destroy'] = {};
          }

          if (!this.finalForm?.destroy?.documents) {
            this.finalForm['destroy']['documents'] = [];
          }

          this.finalForm['destroy']['documents'].push(document.id)

          document.browse.forEach(key => {
            this.s3service.deleteFile(key).then(() => {
              this.uploadFormArray.splice(index, 1);
              this.actionBtnToggle = false;
              this.actionBtnToggleId = undefined;
            })
              .catch((error: any) => {
                console.error('Error deleting file from S3:', error);
              });
          })

        } else {
          // On Create Form
          this.uploadFormArray.splice(index, 1);
        }
      }
    });
  }
  private resetFilePond() {
    this.browseReset = true;
    setTimeout(() => {
      this.browseReset = false;
    }, 1000);
  }
}
