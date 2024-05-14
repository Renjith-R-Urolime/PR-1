import { ChangeDetectorRef, Component, OnInit, SimpleChanges, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import Swal from 'sweetalert2';
import { EncashmentFormMeta, formMetadata, formSections, leavePayCalculationList } from '../leave-setup.data';

@Component({
  selector: 'app-leave-setup-form',
  templateUrl: './leave-setup-form.component.html',
  styleUrls: ['./leave-setup-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LeaveSetupFormComponent implements OnInit {

  formTemplateRef: TemplateRef<any>;
  activeTemplateName: string;
  saveButtonDisable: boolean = true;
  leaveForm: FormGroup;
  editMode: boolean = false;
  formArrayIndex = 0;
  showValueError = false;
  deletedLeaveTypes: any = [];
  detectedError: boolean = false;
  submit: boolean = false;
  formData: any = formMetadata;
  draftSuccessMsg = '';
  componentFetch = [];
  encashmentFormMeta: any = EncashmentFormMeta;
  formSections: Sections = formSections;
  isLoading: boolean = false;
  patchDataList: any;
  leavePayListAll = [];
  filterCondition = [];
  payCalculationList = leavePayCalculationList;
  subsidiaryList = [];
  leavePayTypeList = [];
  formPercentage: number = 0;
  leavePlanId;
  PlanDraft = false;
  leaveTypeId;
  leaveRuleId;
  leaveRule1Draft = false;
  leaveTypeDraft = false;
  classListLoading: boolean = true;
  deptListLoading: boolean = true;
  locListLoading: boolean = true;
  jurListLoading: boolean = true;
  isProcessing: boolean = false;
  isDraftProcessing: boolean = false;
  componentLoading: boolean = true;
  payTypeDisable: boolean[] = [];
  leaveData: any;
  col = 6;
  showIndex = 0;
  sideClick: boolean = false;
  planCheckLoader: boolean = false;
  theme: string = this.sharedService.getTheme();
  leaveFormData = formMetadata[0];
  applicableForEncashmentSaved: boolean = false
  fullNFinalSaved: boolean = false
  entitlementPerPeriodSaved: boolean = false
  currentURL: string
  id: any;
  pathId: string;
  private modalRef: NgbModalRef;
  @ViewChild('customTemplate') customTemplate: TemplateRef<any>;
  fullFinalTemp: any = [];
  leavePlanExist: boolean = false;
  encashmentTemp: any = [];
  entitlememtTemp: any = [];
  applicableFullNFinal: any = [];
  applicableEncashment: any = [];
  currentYear: number;
  validationMsg: string = '';
  nextClick: boolean = false;
  private unsubscribe: Subscription[] = [];
  days = Array.from({ length: 28 }, (_, i) => ({ id: (i + 1).toString(), name: (i + 1).toString() }));
  constructor(private dynamicFormService: DynamicFormService, private apiService: ApiService, public sharedService: SharedService, private fb: FormBuilder, private cdRef: ChangeDetectorRef, private router: Router, private modalService: NgbModal, private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentURL = this.router.url;
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
    const routeSub = this.route.params.subscribe(params => {
      // Access route parameters here
      this.id = params['id'];
    });
    this.unsubscribe.push(routeSub)
    this.getDropdownValues();
    this.buildDynamicForm();
    if (this.id) {
      this.editMode = true;
      this.getLeaveData();
    }
    this.leaveForm.get('leavePlanForm').valueChanges.pipe(
      debounceTime(1000), // Optional: Debounce time to wait for further changes
      distinctUntilChanged(), // Optional: Only emit if the value has changed
      switchMap(() => {
        // Create request body based on form values
        const planReqBody = {
          "jurisdictionId": this.leaveForm.get('leavePlanForm').value.jurisdictionId,
          "locationId": this.leaveForm.get('leavePlanForm').value.location,
          "departmentId": this.leaveForm.get('leavePlanForm').value.department,
          "classId": this.leaveForm.get('leavePlanForm').value.class
        };
        this.leavePlanExist = false;
        this.validationMsg = '';
        // Check if all fields in planReqBody are empty
        const isEmptyRequestBody = Object.values(planReqBody).every(value => value === null || value === '' || value === undefined || value?.length === 0);

        // If all fields are empty, return an observable that completes immediately
        if (isEmptyRequestBody) {
          return of(null);
        }

        // Make API call with the constructed request body
        return this.apiService.post(`leave/configuration/plan/check`, planReqBody);
      })
    ).subscribe({
      next: (res: any) => {
        if (!res?.availabilityStatus) {
          this.leavePlanExist = false;
        }
        else {
          if (this.id === res?._id || this.leaveForm.get('leavePlanForm').value.leavePlanId === res?._id) {
            this.leavePlanExist = false;
          }
          else {
            this.leavePlanExist = true;
          }
        }
      },
      error: (error: any) => {
        this.detectedError = true;
        this.cdRef.detectChanges();
        console.error('API error:', error);
      }
    });
    let pathArray = this.currentURL.split('/');
    if (pathArray[pathArray.length - 1] == "create") {
      pathArray = pathArray.slice(0, pathArray.length - 1);
    } else {
      pathArray = pathArray.slice(0, pathArray.length - 2);
    }

    this.currentURL = pathArray.join("/");


    let tempUrl = this.router.url.split('/')
    // this.pathId = tempUrl[tempUrl.length - 1];


  }
  getLeaveData() {
    this.isLoading = true;
    this.apiService.get(`leave/configuration/${this.id}`).subscribe({
      next: (res: any) => {
        if (res) {
          this.leaveData = res.data;
          this.filterCondition = res?.data?.jurisdiction?.subsidiary?.length > 0 ? [`subsidiary=${res?.data?.jurisdiction?.subsidiary.map(s => s.id)}`] : [];
          this.subsidiaryList = res?.data?.jurisdiction?.subsidiary;

          this.leaveForm.get('leavePlanForm').patchValue(res?.data)
          this.leaveForm.get('leavePlanForm').patchValue({
            "leavePlanId": res?.data?.id,
            "jurisdictionId": res?.data?.jurisdiction?.id,
            "subsidiary": res?.data?.jurisdiction?.subsidiary?.map(sub => sub.id),
            "location": res?.data?.location?.map(loc => loc.id),
            "department": res?.data?.department?.map(dept => dept.id),
            "class": res?.data?.class?.map(cls => cls.id)
          })
          for (var i = 0; i < res?.data?.leaveTypes?.length; i++) {
            this.addFormArray(i, res?.data?.leaveTypes?.[i]?.leaveRule?.entitlementPerPeriod?.perPeriodForm?.length);
          }
          this.leaveForm.get('leaveTypeForm').patchValue(res?.data?.leaveTypes)
          res?.data?.leaveTypes?.forEach((el, index) => {
            this.componentFetch[index] = [`type=2`, `subType=5`, `payrollItem=${el?.leaveItemType?.id}`];
            this.savePatchDataList(el?.component, `component_${index}`)
            this.leaveTypeData?.at(index).patchValue({
              "leavePlanId": res?.data?.id,
              "leaveTypeId": el?.id,
              "leaveRuleId": el?.leaveRule?.id,
              "componentId": el?.component?.id,
              "leaveItemType": el?.leaveItemType?.id,
              "leavePayType": el?.leavePayType?.id,
              "entitlementUnit": el?.entitlementUnit?.id,
              "encashmentComponent": el?.encashmentComponent.map(item => item.id)
            });

            if (el?.leaveItemType?.id === '1') {
              this.leaveTypeData?.at(index)?.get('leavePayType').disable();
              this.leaveTypeData?.at(index).patchValue({
                "value": el?.incrementValue,
              });
            }
            else {
              this.leaveTypeData?.at(index).patchValue({
                "value": el?.decrementValue,
              });
            }

            this.leaveTypeData?.at(index)?.get('leaveRule1Form')?.patchValue(el?.leaveRule);
            this.leaveTypeData?.at(index)?.get('leaveRule2Form')?.patchValue(el?.leaveRule);
            this.leaveTypeData?.at(index)?.get('leaveRule1Form')?.patchValue({
              "leaveTypeId": el?.id,
              "leaveReason": el?.leaveRule?.leaveReason?.map(item => item.id),
              "genderApplicability": el?.leaveRule?.genderApplicability?.map(item => item.id),
              "nationalityApplicability": el?.leaveRule?.nationalityApplicability?.map(item => item.id),
              "religionApplicability": el?.leaveRule?.religionApplicability?.map(item => item.id)
            })
            this.leaveTypeData?.at(index)?.get('leaveRule2Form')?.patchValue({
              "leaveTypeId": el?.id,
              "accrualType": el?.leaveRule?.accrualType?.id,
              "accrualFrequency": el?.leaveRule?.accrualFrequency?.id,
              "quotaResetType": el?.leaveRule?.quotaResetType?.id,
              "quotaResetFrequency": el?.leaveRule?.quotaResetFrequency?.id
            })
            if (el?.leaveRule?.allowCarryOver) {
              this.leaveTypeData.at(index).get('leaveRule2Form').get('maxCarryOver').enable();
              this.leaveTypeData.at(index).get('leaveRule2Form').get('allowCarryOverToBeUsedWithin').enable();
            }
            else {
              this.leaveTypeData.at(index).get('leaveRule2Form').get('maxCarryOver').disable();
              this.leaveTypeData.at(index).get('leaveRule2Form').get('allowCarryOverToBeUsedWithin').disable();
            }
            if (el?.entitlementUnit?.id === '2') {
              this.leaveTypeData.at(index).get('leaveRule1Form').get('allowHourly').disable();
            }
            el?.leaveRule?.applicability?.forEach((element) => {
              if (element.applicabilityType === 'fullAndFinal') {

                this.applicableFullNFinal[index] = element;
                this.leaveTypeData?.at(index)?.get('fullAndFinal')?.patchValue(element);
                this.fullFinalData(index)?.get('fullNFinalSaved')?.patchValue(true)
                this.fullFinalData(index).patchValue({
                  "leaveRuleId": el?.leaveRule?.id,
                  "componentId": element?.component?.id,
                  "encashComponent": element?.encashComponent?.id,
                  "payCalculation": element?.payCalculation?.id
                })
              }
              else {
                this.applicableEncashment[index] = element;
                this.leaveTypeData?.at(index)?.get('encashment')?.patchValue(element);
                this.encashmentData(index)?.get('encashmentSaved')?.patchValue(true);
                this.encashmentData(index)?.patchValue({
                  "leaveRuleId": el?.leaveRule?.id,
                  "componentId": element?.component?.id,
                  "encashComponent": element?.encashComponent?.id,
                  "payCalculation": element?.payCalculation?.id
                })
              }
            });
            this.leaveTypeData?.at(index)?.get('entitlementPerPeriodForm')?.patchValue(el?.leaveRule?.entitlementPerPeriod);
            if (el?.leaveRule?.entitlementPerPeriod) {
              this.leaveEntitlement(index)?.get('perPeriodSaved')?.patchValue(true);
            }

          })
          //this.leaveForm.get('leavePlanForm').get('subsidiary').disable({ onlySelf: true });
          /*    this.formPercentage = 25
             if (this.leaveData.leaveTypes.length > 0) {
               this.formPercentage += 25 / this.leaveData.leaveTypes.length;
               this.leaveData.leaveTypes.forEach(type => {
                 if (type.leaveRule) {
                   this.formPercentage += 50 / this.leaveData.leaveTypes.length;
                 }
               });
             }

             this.formPercentage = Number(this.formPercentage) */
             this.formPercentage = this.calculateFormPercentage();
          if (this.router.url.split('/').includes('add-leave-type')) {
            this.addLeaveType();
          }
          this.isLoading = false;
          this.cdRef.detectChanges();
        }
      }, error: (error: any) => {
        this.detectedError = true;

        console.error(error);
      }


    });
  }
  ngOnChanges(changes: SimpleChanges): void {

  }

  getDropdownValues() {
    // this.sharedService.getDataList("payrollItem").subscribe({
    //   next: (result) => {
    //     this.itemTypeList = result;
    //   }
    // });
    // this.sharedService.getDataList("entitlementUnit").subscribe({
    //   next: (result) => {
    //     this.entitlementUnitList = result;
    //   }
    // });
    // this.sharedService.getDataList("leavePayType").subscribe({
    //   next: (result) => {
    //     this.leavePayTypeList = result;
    //     this.leavePayListAll = result;
    //   }
    // });
    // this.sharedService.getDataList("accrualType").subscribe({
    //   next: (result) => {
    //     this.accrualTypeList = result;
    //     this.quotaResetTypeList = result;
    //   }
    // });
    // this.sharedService.getDataList("accrualFrequency").subscribe({
    //   next: (result) => {
    //     this.accrualFrequencyList = result;
    //     this.quotaResetFrequencyList = result;
    //   }
    // });
    // this.sharedService.getDataList("nationality").subscribe({
    //   next: (result) => {
    //     this.nationalityRestrictionsList = result;


    //   },
    // })
    // this.sharedService.getDataList('gender').subscribe({
    //   next: (result) => {
    //     this.genderRestrictionsList = result;
    //   },
    // })
    // this.sharedService.getDataList('religion').subscribe({
    //   next: (result) => {
    //     this.religionRestrictionsList = result;
    //   },
    // })
    // this.apiService.get(`core-hr/organisation/jurisdiction?subsidiary=true`, 'dropdown').subscribe((res: any) => {
    //   if (res) {
    //     this.jurisdictionList = res.data;
    //
    //     this.jurListLoading = false;
    //     this.cdRef.detectChanges();
    //   }
    // });
    // this.apiService.get(`payroll/setup/component`, 'dropdown').subscribe((res: any) => {
    //   if (res) {
    //     const response = res.data;
    //     const compdata = response.filter(i => i.payrollType === '2' && i.subType === '2')
    //
    //     const encashdata = response.filter(i => i.payrollType === '1' && i.subType === '1')
    //
    //     this.componentList = compdata;
    //     this.encashCompList = encashdata;
    //     this.componentLoading = false;
    //
    //     // this.subListLoading = false;
    //     // this.cdRef.detectChanges();
    //   }
    // });
  }

  onModelCancel() {
    this.sharedService.onModalClose();
  }

  onSubmit() {
    this.submit = true;
    this.validationMsg = '';



    if (this.leaveForm.get('leavePlanForm').invalid || this.checkFormValid()) {
      this.validationMsg = 'Please fill all mandatory fields';
      return '';
    }
    else {

      this.submit = false;
      let data = {
        ...this.leaveForm.getRawValue()
      };
      if (this.filterCondition?.length > 0) {
        const filterString = this.filterCondition?.join('&');
        const filters = {
          location: filterString,
          department: filterString,
          class: filterString,
        }
        Object.assign(data, { filters });
      }


      data?.leaveTypeForm.forEach(item => {
        const leaveRule1Form = item.leaveRule1Form || {};
        const leaveRule2Form = item.leaveRule2Form || {};
        const applicability = [
          {
            ...item.fullAndFinal,
            "applicabilityType": "fullAndFinal"
          },
          {
            ...item.encashment,
            "applicabilityType": "encashment"
          }
        ];
        //const fullAndFinal = item.fullAndFinal || {};
        //const encashment = item.encashment || {};
        const entitlementPerPeriod = item.entitlementPerPeriodForm || [];

        // Combine the two objects into leaveRule without modifying the original data object
        item.leaveRule = { ...leaveRule1Form, ...leaveRule2Form, applicability, entitlementPerPeriod };
        item.leaveRule.isDraft = false;
        item.isDraft = false;
        delete item.leaveRule1Form;
        delete item.leaveRule2Form;
        delete item.fullAndFinal;
        delete item.encashment;
        delete item.entitlementPerPeriodForm;

      });

      // Create a shallow copy of leaveTypes
      data.leaveTypes = [...data.leaveTypeForm];
      data.leavePlanForm.isDraft = false;


      let removedTypes = {};
      if (this.deletedLeaveTypes?.length > 0) {
        removedTypes = {
          "leaveTypes": this.deletedLeaveTypes
        }
      }
      // Create reqBody without copying the reference to data.leavePlanForm and leaveTypes
      let reqBody = {
        ...data.leavePlanForm,
        "filters": data.filters,
        leaveTypes: data.leaveTypes,
        "destroy": removedTypes
      };


      this.isProcessing = true;
      if (this.leaveForm.get('leavePlanForm').value.leavePlanId && (this.id === '' || this.id === 'null' || this.id === undefined)) {
        this.apiService.put(`leave/configuration/publish/${this.leaveForm.get('leavePlanForm').value.leavePlanId}`, reqBody, 'leave-configuration').subscribe({
          next: (res: any) => {
            if (res) {

              this.isProcessing = false;
              this.pathId = this.leaveForm.get('leavePlanForm').value.leavePlanId;
              this.cdRef.detectChanges();
              this.sharedService.handleSuccessModel({ id: this.leaveForm.get('leavePlanForm').value.leavePlanId, btnTemplate: this.customTemplate });

            }
          },
          error: (error: any) => {
            this.isProcessing = false;
            this.detectedError = true;
            console.error(error);

          }
        }
        );
      }
      else if (this.id) {
        this.apiService.put(`leave/configuration/plan/${this.id}`, reqBody, 'leave-configuration').subscribe({
          next: (res: any) => {
            if (res) {
              this.isProcessing = false;


              this.pathId = this.id;
              // this.router.navigate(['/leave-management/configuration/create']);
              this.sharedService.handleSuccessModel({ id: this.id, btnTemplate: this.customTemplate });

            }
          },
          error: (error: any) => {
            this.isProcessing = false;
            this.detectedError = true;
            console.error(error);

          }
        }
        );
      }
      else {
        this.apiService.post(`leave/configuration/plan`, reqBody, 'leave').subscribe({
          next: (res: any) => {
            if (res) {

              this.isProcessing = false;
              this.cdRef.detectChanges();
              this.pathId = res._id;
              this.leaveForm.get('leavePlanForm').patchValue({
                "leavePlanId": res._id
              })
              const formArray = this.leaveForm.get('leaveTypeForm') as FormArray;
              // Iterate through each row and patch values
              for (let i = 0; i < formArray.length; i++) {
                const formGroup = formArray.at(i) as FormGroup;
                formGroup.patchValue({
                  "leavePlanId": res._id
                });
              }
              // this.router.navigate(['/leave-management/configuration/create']);
              this.sharedService.handleSuccessModel({ id: res._id, btnTemplate: this.customTemplate });
            }
          },
          error: (error: any) => {
            this.isProcessing = false;
            this.detectedError = true;
            console.error(error);

          }
        }
        );
      }
    }
  }
  onCancel() {

    if (this.leaveFormData.formName === 'leavePlanForm') {
      this.router.navigate(['/leave-management/configuration']);
    }
    else if (this.leaveFormData.formName === 'leaveTypeForm') {
      if (this.leaveForm.value.leaveTypeForm[this.formArrayIndex].leaveTypeId) {
        this.deletedLeaveTypes.push(this.leaveForm.value.leaveTypeForm[this.formArrayIndex].leaveTypeId)
      }

      this.leaveTypeData.removeAt(this.formArrayIndex);
      this.leaveFormData = formMetadata[0];
      this.sideClick = false;
      this.showIndex = null;
      this.formArrayIndex = null;
    }
    else if (this.leaveFormData.formName === 'leaveRule1Form' || this.leaveFormData.formName === 'leaveRule2Form') {
      this.leaveFormData = formMetadata[1];
    }
  }
  onNext(index) {
    this.submit = true;
    this.draftSuccessMsg = '';
    this.planCheckLoader = false;
    if (this.leaveFormData.formName === 'leavePlanForm' || this.leaveFormData.formName === 'leaveTypeForm') {

      if (this.leaveFormData.formName === 'leavePlanForm') {
        if (this.leaveForm.get(this.leaveFormData.formName).invalid) {
          return ''
        }
        else {
          this.validationMsg = '';
          const planReqBody = {
            "jurisdictionId": this.leaveForm.get('leavePlanForm').value.jurisdictionId,
            "locationId": this.leaveForm.get('leavePlanForm').value.location,
            "departmentId": this.leaveForm.get('leavePlanForm').value.department,
            "classId": this.leaveForm.get('leavePlanForm').value.class
          }
          this.planCheckLoader = true;
          this.leavePlanExist = false;
          this.apiService.post(`leave/configuration/plan/check`, planReqBody).subscribe({
            next: (res: any) => {
              if (res) {

                if (!res?.availabilityStatus) {
                  this.leavePlanExist = false;
                  this.onNextSubmit(index);
                  this.validationMsg = '';
                }
                else {
                  if (this.id === res?._id || this.leaveForm.get('leavePlanForm').value.leavePlanId === res?._id) {
                    this.leavePlanExist = false;
                    this.onNextSubmit(index);
                    this.validationMsg = '';
                  }
                  else {
                    this.leavePlanExist = true;
                    this.validationMsg = 'Leave Plan already exist';
                  }
                }
                this.planCheckLoader = false;
              }
            },
            error: (error: any) => {
              this.detectedError = true;
              this.planCheckLoader = false;
              this.cdRef.detectChanges();
              console.error(error);
            }
          }
          );
        }
      }
      else {
        if (this.customValidation()) {
          return ''
        }
        else {
          this.submit = false;
          this.leaveFormData = formMetadata[index + 1]
        }
        this.formPercentage = this.calculateFormPercentage();
      }

    }
    else {


      if (this.leaveFormData.formName === 'leaveRule1Form' && this.leaveRule1Data(this.formArrayIndex).invalid) {
        return '';
      }
      else {
        this.submit = false;
        this.leaveFormData = formMetadata[index + 1]
      }
      this.formPercentage = this.calculateFormPercentage();
    }


  }
  onNextSubmit(index) {
    this.submit = false;
    this.leaveFormData = formMetadata[index + 1]
    if (index == 0 && this.leaveTypeData.controls.length === 0) {
      this.addFormArray();
    }
    this.showIndex = 0;
    this.formArrayIndex = 0;
    this.sideClick = false;
    this.nextClick = true;
  }
  customValidation() {
    this.showValueError = false;
    if (this.leaveTypeData.at(this.formArrayIndex).value.leavePayType === "6" && (this.leaveTypeData.at(this.formArrayIndex).value.value === '' || this.leaveTypeData.at(this.formArrayIndex).value.value === null || this.leaveTypeData.at(this.formArrayIndex).value.value === undefined)) {
      this.showValueError = true;
    }
    let formStatus = false;
    this.leaveFormData.labels.forEach(label => {
      if (this.leaveTypeData.at(this.formArrayIndex).get(label.labelName.defaultValue).status === "INVALID") {
        formStatus = true;
      }
    });

    if (this.showValueError || formStatus) {
      return true;
    }
    else {
      return false;
    }


  }
  get leaveTypeData(): FormArray {
    return this.leaveForm?.get("leaveTypeForm") as FormArray
  }
  get entitlementPerPeriodData(): FormArray {
    const leaveTypeFormArray = this.leaveForm?.get('leaveTypeForm') as FormArray;
    return leaveTypeFormArray?.at(this.formArrayIndex)?.get('entitlementPerPeriodForm')?.get('perPeriodForm') as FormArray;
  }
  leaveRule1Data(i): FormGroup {
    const leaveTypeFormArray = this.leaveForm?.get('leaveTypeForm') as FormArray;
    return leaveTypeFormArray?.at(i)?.get('leaveRule1Form') as FormGroup;
  }
  leaveRule2Data(i): FormGroup {
    const leaveTypeFormArray = this.leaveForm?.get('leaveTypeForm') as FormArray;
    return leaveTypeFormArray?.at(i)?.get('leaveRule2Form') as FormGroup;
  }
  leaveEntitlement(i): FormGroup {
    const leaveTypeFormArray = this.leaveForm?.get('leaveTypeForm') as FormArray;
    return leaveTypeFormArray?.at(i)?.get('entitlementPerPeriodForm') as FormGroup;
  }
  entitlementData(i): FormArray {

    const leaveTypeFormArray = this.leaveForm?.get('leaveTypeForm') as FormArray;
    return leaveTypeFormArray?.at(i)?.get('entitlementPerPeriodForm')?.get('perPeriodForm') as FormArray;



  }
  fullFinalData(i): FormGroup {
    const leaveTypeFormArray = this.leaveForm?.get('leaveTypeForm') as FormArray;
    return leaveTypeFormArray?.at(i)?.get('fullAndFinal') as FormGroup;
  }
  encashmentData(i): FormGroup {
    const leaveTypeFormArray = this.leaveForm?.get('leaveTypeForm') as FormArray;
    return leaveTypeFormArray?.at(i)?.get('encashment') as FormGroup;
  }
  buildDynamicForm() {
    const formGroup = {};

    this.formData.forEach(tab => {
      const tabGroup = {};
      if (tab.tabName === 'Leave Plan') {
        tab.labels.forEach(label => {
          const control = new FormControl(null, label.required ? Validators.required : []);
          tabGroup[label.labelName.defaultValue] = control;
        });
        tabGroup['leavePlanId'] = new FormControl(null);
        formGroup[tab.formName] = this.fb.group(tabGroup);
      }
      if (tab.tabName === 'Leave Type') {
        const formArray = this.fb.array([]); // Initialize an empty FormArray

        formGroup[tab.formName] = formArray;
      }
    });

    this.leaveForm = this.fb.group(formGroup);

  }
  buildFormArray() {
    const leaveTypeFormArray: any = this.fb.array([]);
    const formGroup: any = {};
    this.formData[1].labels.forEach(label => {
      const formControl = new FormControl(null, label.required ? Validators.required : []);
      formGroup[label.labelName.defaultValue] = formControl;
    });
    formGroup['leavePlanId'] = new FormControl(null);
    formGroup['leaveTypeId'] = new FormControl(null);
    formGroup['id'] = new FormControl(null);
    leaveTypeFormArray.push(this.fb.group(formGroup));
    return leaveTypeFormArray;
  }
  addFormArray(index?, length?) {
    // const leaveTypeArray = this.buildFormArray();
    // this.leaveForm.setControl('leaveTypeForm', leaveTypeArray);
    this.addDynamicFormArray();

    if (length) {
      for (var i = 0; i < length; i++) {
        this.entitlementDrawer(index ? index : this.leaveTypeData.controls.length - 1)
      }
    }
    else {
      this.entitlementDrawer(index ? index : this.leaveTypeData.controls.length - 1)
    }


  }
  addLeaveType() {
    if (this.leavePlanExist) {
      this.validationMsg = "Leave Plan already exist";
    }
    else {
      this.leaveFormData = formMetadata[1]
      this.showIndex = this.leaveTypeData.controls.length;
      this.sideClick = false;
      this.nextClick = false;
      this.addFormArray();
    }


  }

  addDynamicFormArray() {
    const items = this.leaveForm.get('leaveTypeForm') as FormArray;
    this.componentFetch[items.controls.length] = [];
    items.push(this.generateFormControls());


  }

  generateFormControls(): FormGroup {
    let formGroup: any = {};
    const group: any = {};
    this.formData[1].labels.forEach(header => {
      // group[header.labelName.defaultValue] = '';

      const formControl = new FormControl({ value: null, disabled: header?.disable || false }, this.bindValidations(header.validations || []));
      group[header.labelName.defaultValue] = formControl

    });

    const tabGroup: any = this.generateRuleGroup();
    const entitlementgroup: any = {};
    this.encashmentFormMeta[0].labels.forEach((el, index) => {
      // group[header.labelName.defaultValue] = '';
      if (index === 0)
        entitlementgroup[el.labelName.defaultValue] = null;

    });
    entitlementgroup['perPeriodSaved'] = false;
    formGroup = this.fb.group({
      ...group,
      ...tabGroup,
      "leaveTypeId": "",
      "id": "",
      "incrementValue": "",
      "decrementValue": "",
      "leavePlanId": this.leaveForm.value.leavePlanForm.leavePlanId,
      "typeDraft": false,
      "leaveRuleId": "",
      "ruleDraft": false,
      "entitlementPerPeriodForm": this.fb.group({
        ...entitlementgroup,
        "perPeriodForm": this.fb.array([])
      })
    })
    //formGroup['leaveTypeForm'] = this.fb.group(group)
    //formGroup['leaveTypeForm'] = this.fb.group(tabGroup);

    return formGroup;
  }
  generateRuleGroup() {
    const formGroup = {};

    this.formData.forEach(tab => {
      const tabGroup = {};
      if (tab.tabName === 'Leave Rule 1') {
        tab.labels.forEach(label => {
          const control = new FormControl({ value: label?.default ? label?.default : null, disabled: label?.disable || false }, this.bindValidations(label.validations || []));
          tabGroup[label.labelName.defaultValue] = control
        });
        formGroup[tab.formName] = this.fb.group({
          ...tabGroup,
          "id": "",
          "leaveTypeId": ""
        });
      }
      if (tab.tabName === 'Leave Rule 2') {
        tab.labels.forEach(label => {
          const control = new FormControl({ value: null, disabled: label?.disable || false }, this.bindValidations(label.validations || []));
          tabGroup[label.labelName.defaultValue] = control
        });
        formGroup[tab.formName] = this.fb.group({
          ...tabGroup,
          "id": "",
          "leaveTypeId": ""
        });
      }
    });
    this.encashmentFormMeta.forEach(el => {
      const tabGroup = {};
      if (el.formName === 'fullAndFinal') {
        el.labels.forEach(label => {

          const control = new FormControl(null, this.bindValidations(label.validations || []));
          tabGroup[label.labelName.defaultValue] = control
        });
        tabGroup['fullNFinalSaved'] = new FormControl(false);
        formGroup[el.formName] = this.fb.group({
          ...tabGroup,
          "id": "",
          "leaveRuleId": "",
        });
      }
      if (el.formName === 'encashment') {
        el.labels.forEach(label => {
          const control = new FormControl(null, this.bindValidations(label.validations || []));
          tabGroup[label.labelName.defaultValue] = control
        });
        tabGroup['encashmentSaved'] = new FormControl(false);
        formGroup[el.formName] = this.fb.group({
          ...tabGroup,
          "id": "",
          "leaveRuleId": ""
        });
      }
    });

    return formGroup;
    // this.cdRef.detectChanges()
  }

  getFormTemplate(template: TemplateRef<any>, name: string, index?) {
    this.submit = false;
    this.formTemplateRef = template
    this.activeTemplateName = name
    if (name === 'entitlementPerPeriod') {
      this.entitlememtTemp = this.leaveTypeData.at(index).get('entitlementPerPeriodForm').value;

    }
    else if (name === 'applicableForEncashment') {
      this.encashmentTemp = this.encashmentData(index).value;

    }
    else if (name === 'applicableForFullFinal') {
      this.fullFinalTemp = this.fullFinalData(index).value;

    }
    /*   if(name === 'entitlementPerPeriod'){
this.entitlementDrawer(index);
} */
  }

  trackByName(index, label) {
    return label.labelName.defaultValue;
  }
  entitlementDrawer(index) {

    this.formArrayIndex = index;
    this.draftSuccessMsg = '';
    //const items = this.leaveForm.get('leaveTypeForm') as FormArray;
    const leaveTypeFormArray = this.leaveForm.get('leaveTypeForm') as FormArray;
    const items = leaveTypeFormArray.at(index).get('entitlementPerPeriodForm').get('perPeriodForm') as FormArray;

    let formGroup: any = {};
    const group: any = {};
    this.encashmentFormMeta[0].labels.forEach((header, index) => {
      if (index != 0) {
        const control = new FormControl('', header.required ? Validators.required : []);
        group[header.labelName.defaultValue] = control
      }
    });

    formGroup = this.fb.group(group)

    items.push(formGroup);
    this.formPercentage = this.calculateFormPercentage();


    this.cdRef.detectChanges();
    /*

const formGroup = {};

this.encashmentFormMeta.forEach(tab => {
  const tabGroup = {};
  if (tab.formName === 'entitlementPerPeriodForm') {
    tab.labels.forEach(label => {
      const control = new FormControl('', label.required ? Validators.required : []);
      tabGroup[label.labelName.defaultValue] = control;
    });
    formGroup[tab.formName] = this.fb.group(tabGroup);
  }
});
//console.log(formGroup) */
  }

  addEntitlementPerPeriod() {
    this.entitlementDrawer(this.formArrayIndex);
  }

  onJurisdictionChange(event) {

    if (event) {
      this.subsidiaryList = event.subsidiary;

      this.filterCondition = event?.subsidiary?.length > 0 ? [`subsidiary=${event?.subsidiary?.map(s => s.id)}`] : [];
      this.leaveForm.get('leavePlanForm').patchValue({
        "subsidiary": this.subsidiaryList ? this.subsidiaryList.map(item => item.id) : [],
        "location": [],
        "department": [],
        "class": []
      }, { emitEvent: false })

      this.savePatchDataList(event, 'jurisdiction')
      this.savePatchDataList([], 'location')
      this.savePatchDataList([], 'department')
      this.savePatchDataList([], 'class')
      // this.leaveForm.get('leavePlanForm').get('subsidiary').disable({onlySelf: true});
    } else {
      this.leaveForm.get('leavePlanForm').patchValue({
        "subsidiary": [],
        "location": [],
        "department": [],
        "class": []
      }, { emitEvent: false })
      this.filterCondition = [];
      this.savePatchDataList([], 'location')
      this.savePatchDataList([], 'department')
      this.savePatchDataList([], 'class')
    }
    this.cdRef.detectChanges();
  }

  onItemTypeChange(event, index) {
    this.savePatchDataList(event, `leaveItemType_${index}`)
    this.savePatchDataList(null, `component_${index}`)
    if (event) {
      if (event?.id?.toString() === "1") { // earning
        this.leaveTypeData.at(index).patchValue({ "leavePayType": "1", "value": 1, "componentId": null,"incrementValue":1,"decrementValue":0 }, { emitEvent: false });
        this.leaveTypeData.at(index).get('leavePayType').disable();
        //this.leaveTypeData.at(index).get('value').disable();
       // this.leaveTypeData.at(index).value.incrementValue = 1;
       // this.leaveTypeData.at(index).value.decrementValue = 0;

      } else {
        this.leaveTypeData.at(index).get('leavePayType').enable();
        this.leaveTypeData.at(index).patchValue({ "leavePayType": null, "value": null, "componentId": null,"incrementValue":null,"decrementValue":null }, { emitEvent: false });
        //  this.leaveTypeData.at(index).get('value').disable();
       // this.leaveTypeData.at(index).value.incrementValue = null;
       // this.leaveTypeData.at(index).value.decrementValue = null;
      //  this.leaveTypeData.at(index).patchValue({ value: null }, { emitEvent: false });

      }
      this.componentFetch[index] = [`type=2`, `subType=5`, `payrollItem=${event?.id}`];
    }
    else {
      this.componentFetch[index] = [];
      this.leaveTypeData.at(index).get('leavePayType').enable();
      this.leaveTypeData.at(index).patchValue({ "leavePayType": null, "value": null,"incrementValue":null,"decrementValue":null,"componentId": null }, { emitEvent: false });
      //  this.leaveTypeData.at(index).get('value').disable();
      //this.leaveTypeData.at(index).value.incrementValue = null;
      //this.leaveTypeData.at(index).value.decrementValue = null;
      //this.leaveTypeData.at(index).patchValue({ value: null }, { emitEvent: false });
    }

    this.cdRef.detectChanges();
  }
  onPayTypeChange(event, typeid) {
    //this.savePatchDataList(event, `leavePayType_${typeid}`)
    if (event) {
      let val;
      //  this.leaveTypeData.at(typeid).get('value').disable();
      this.leaveTypeData.at(typeid).patchValue({ value: null }, { emitEvent: false });
      if (event?.id === "2") {
        val = 0.25;
      } else if (event?.id === "3") {
        val = 0.5;
      } else if (event?.id === "4") {
        val = 0.75;
      } else if (event?.id === "5") {
        val = 1;
      } else if (event?.id === "6") {
        // this.leaveTypeData.at(typeid).get('value').enable();
      }

      if (event?.id === "1") {
        this.leaveTypeData.at(typeid).value.incrementValue = 1;
        this.leaveTypeData.at(typeid).value.decrementValue = 0;
        this.leaveTypeData.at(typeid).patchValue({ value: 1 }, { emitEvent: false });
      }
      else {
        this.leaveTypeData.at(typeid).value.incrementValue = 0;
        this.leaveTypeData.at(typeid).value.decrementValue = val;
        this.leaveTypeData.at(typeid).patchValue({ value: val }, { emitEvent: false });
      }

    }
    else {
      this.leaveTypeData.at(typeid).value.incrementValue = 0;
      this.leaveTypeData.at(typeid).value.decrementValue = 0;
      this.leaveTypeData.at(typeid).patchValue({
        "value": ''
      }, { emitEvent: false });
    }
  }
  enabledFormArray(selectedForm, index?) {


    this.nextClick = false;
    if (selectedForm === "leavePlanForm") {
      this.leaveFormData = formMetadata[0];
      this.showIndex = -1;
      this.formArrayIndex = -1;
      this.sideClick = true;
    }
    else if (selectedForm === "leaveTypeForm") {
      if (!this.leavePlanExist) {
        this.leaveFormData = formMetadata[1];
        this.showIndex = index;
        this.formArrayIndex = index;
        this.sideClick = true;
      }
      else {
        this.validationMsg = "Leave Plan already exist";
      }
    }
    else if (selectedForm === "leaveRule1Form") {

      let isInvalid = false;
        this.formData[1].labels.forEach(label => {
          const control = this.leaveTypeData.at(index).get(label.labelName.defaultValue);
          if (control && control.invalid) {
            isInvalid = true;
          }
        });
      if (isInvalid) {
        this.submit = true;
        return ''
      } else {
        if (!this.leavePlanExist) {
          this.submit = false;
          this.leaveFormData = formMetadata[2];
          this.showIndex = index;
          this.formArrayIndex = index;
          this.sideClick = true;
        }
        else{
          this.validationMsg = "Leave Plan already exist";
        }

      }
    }
    else if (selectedForm === "leaveRule2Form") {
      let isInvalid = false;
        this.formData[1].labels.forEach(label => {
          const control = this.leaveTypeData.at(index).get(label.labelName.defaultValue);
          if (control && control.invalid) {
            isInvalid = true;
          }
        });
      if (isInvalid || this.leaveRule1Data(index).invalid) {
        this.submit = true;
        return ''
      } else {
        if (!this.leavePlanExist) {
          this.submit = false;
          this.leaveFormData = formMetadata[3];
          this.showIndex = index;
          this.formArrayIndex = index;
          this.sideClick = true;
        }else{
          this.validationMsg = "Leave Plan already exist";
        }
      }
    }

    this.formPercentage = this.calculateFormPercentage();

  }
  getRuleCompletedStatus(formName, index) {

    if (formName === 'leaveRule1Form') {

      return this.leaveRule1Data(index).status && this.leaveRule1Data(index).touched
    }
    if (formName === 'leaveRule2Form') {

      return this.leaveRule2Data(index).status && this.leaveRule2Data(index).touched
    }
  }

  calculatePercentage() {
    this.leaveForm.controls.leavePlanForm.touched ? this.formPercentage = 25 : '';


    const typesCount = this.leaveTypeData.controls.length;

    this.leaveTypeData.controls.forEach(typeForm => {
      typeForm.touched ? this.formPercentage = this.formPercentage + 75 / (typesCount * 3) : '';
      typeForm.get('leaveRule1Form').touched ? this.formPercentage = this.formPercentage + 75 / (typesCount * 3) : '';
      typeForm.get('leaveRule2Form').touched ? this.formPercentage = this.formPercentage + 75 / (typesCount * 3) : '';

    })

    this.formPercentage = Math.ceil(this.formPercentage) > 100 ? 100 : Number(Math.ceil(this.formPercentage));
  }

  onSaveDraft() { //
    if (this.leaveFormData.formName === 'leavePlanForm') {
      let data = { ...this.leaveForm.getRawValue() };
      let reqBody = { ...data.leavePlanForm };
      reqBody.isDraft = true;

      this.leavePlanSaveDraft(reqBody)
    }
    else if (this.leaveFormData.formName === 'leaveTypeForm') {
      let data = { ...this.leaveForm.getRawValue() };
      data?.leaveTypeForm.forEach(item => {
        delete item.leaveRule1Form;
        delete item.leaveRule2Form;
        delete item.fullAndFinal;
        delete item.encashment;
        delete item.entitlementPerPeriodForm;

      });
      let reqBody;
      if (this.leaveForm.get('leavePlanForm').value.leavePlanId) {
        reqBody = data.leaveTypeForm[this.formArrayIndex];
        reqBody.leavePlanId = this.leaveForm.get('leavePlanForm').value.leavePlanId;
        reqBody.isDraft = true;
        this.leaveTypeSaveDraft(reqBody)
      }
      else {
        const leaveTypes = data.leaveTypeForm || [];
        leaveTypes[this.formArrayIndex].isDraft = true;
        data.leavePlanForm.isDraft = true;
        reqBody = { ...data.leavePlanForm, leaveTypes };
        reqBody.isDraft = true;
        this.leavePlanSaveDraft(reqBody)
      }

    }
    else if (this.leaveFormData.formName === 'leaveRule1Form') {
      let data = { ...this.leaveForm.getRawValue() };
      let reqBody;
      if (this.leaveForm.value.leaveTypeForm[this.formArrayIndex].leaveTypeId) {
        reqBody = data.leaveTypeForm[this.formArrayIndex].leaveRule1Form;
        reqBody.isDraft = true;
        reqBody.leavePlanId = this.leaveForm.get('leavePlanForm').value.leavePlanId;
        reqBody.leaveTypeId = this.leaveForm.value.leaveTypeForm[this.formArrayIndex].leaveTypeId;
        this.leaveRuleSaveDraft(reqBody)
      }
      else {
        if (this.leaveForm.get('leavePlanForm').value.leavePlanId) {
          data?.leaveTypeForm.forEach(item => {
            const leaveRule1Form = item.leaveRule1Form || {};

            // Combine the two objects into leaveRule without modifying the original data object
            item.leaveRule = { ...leaveRule1Form };
            item.leaveRule.isDraft = true;
            item.leaveRule.leavePlanId = this.leaveForm.get('leavePlanForm').value.leavePlanId;
            delete item.leaveRule1Form;
            delete item.leaveRule2Form;
            delete item.fullAndFinal;
            delete item.encashment;
            delete item.entitlementPerPeriodForm;

          });


          // Create a shallow copy of leaveTypes
          data.leaveTypes = [...data.leaveTypeForm];
          reqBody = data.leaveTypeForm[this.formArrayIndex];
          reqBody.isDraft = true;
          this.leaveTypeSaveDraft(reqBody)
        }
        else {
          data?.leaveTypeForm.forEach(item => {
            const leaveRule1Form = item.leaveRule1Form || {};

            // Combine the two objects into leaveRule without modifying the original data object
            item.leaveRule = { ...leaveRule1Form };
            item.leaveRule.isDraft = true;
            delete item.leaveRule1Form;
            delete item.leaveRule2Form;
            delete item.fullAndFinal;
            delete item.encashment;
            delete item.entitlementPerPeriodForm;

          });
          const leaveTypes = data.leaveTypeForm || [];
          leaveTypes[this.formArrayIndex].isDraft = true;
          data.leavePlanForm.isDraft = true;
          reqBody = { ...data.leavePlanForm, leaveTypes };
          this.leavePlanSaveDraft(reqBody)
        }
      }


    }
    else if (this.leaveFormData.formName === 'leaveRule2Form') {
      let data = { ...this.leaveForm.getRawValue() };
      let reqBody;
      if (this.leaveForm.value.leaveTypeForm[this.formArrayIndex].leaveTypeId) {
        reqBody = data.leaveTypeForm[this.formArrayIndex].leaveRule2Form;
        reqBody.isDraft = true;
        reqBody.leavePlanId = this.leaveForm.get('leavePlanForm').value.leavePlanId;
        reqBody.leaveTypeId = this.leaveForm.value.leaveTypeForm[this.formArrayIndex].leaveTypeId;
        this.leaveRuleSaveDraft(reqBody)
      }
      else {
        if (this.leaveForm.get('leavePlanForm').value.leavePlanId) {
          data?.leaveTypeForm.forEach(item => {
            const leaveRule1Form = item.leaveRule1Form || {};
            const leaveRule2Form = item.leaveRule2Form || {};
            const applicability = [
              {
                ...item.fullAndFinal,
                "applicabilityType": "fullAndFinal"
              },
              {
                ...item.encashment,
                "applicabilityType": "encashment"
              }
            ];
            const fullAndFinal = item.fullAndFinal || {};
            const encashment = item.encashment || {};
            const entitlementPerPeriodForm = item.entitlementPerPeriodForm || [];

            // Combine the two objects into leaveRule without modifying the original data object
            item.leaveRule = { ...leaveRule1Form, ...leaveRule2Form, applicability, entitlementPerPeriodForm };
            item.leaveRule.isDraft = true;
            item.leaveRule.leavePlanId = this.leaveForm.get('leavePlanForm').value.leavePlanId;
            delete item.leaveRule1Form;
            delete item.leaveRule2Form;
            delete item.fullAndFinal;
            delete item.encashment;
            delete item.entitlementPerPeriodForm;

          });


          // Create a shallow copy of leaveTypes
          data.leaveTypes = [...data.leaveTypeForm];
          reqBody = data.leaveTypeForm[this.formArrayIndex];
          reqBody.isDraft = true;
          this.leaveTypeSaveDraft(reqBody)
        }
        else {
          data?.leaveTypeForm.forEach(item => {
            const leaveRule1Form = item.leaveRule1Form || {};
            const leaveRule2Form = item.leaveRule2Form || {};
            const applicability = [
              {
                ...item.fullAndFinal,
                "applicabilityType": "fullAndFinal"
              },
              {
                ...item.encashment,
                "applicabilityType": "encashment"
              }
            ];
            const fullAndFinal = item.fullAndFinal || {};
            const encashment = item.encashment || {};
            const entitlementPerPeriodForm = item.entitlementPerPeriodForm || [];

            // Combine the two objects into leaveRule without modifying the original data object
            item.leaveRule = { ...leaveRule1Form, ...leaveRule2Form, applicability, entitlementPerPeriodForm };
            item.leaveRule.isDraft = true;
            delete item.leaveRule1Form;
            delete item.leaveRule2Form;
            delete item.fullAndFinal;
            delete item.encashment;
            delete item.entitlementPerPeriodForm;

          });
          const leaveTypes = data.leaveTypeForm || [];
          leaveTypes[this.formArrayIndex].isDraft = true;
          data.leavePlanForm.isDraft = true;
          reqBody = { ...data.leavePlanForm, leaveTypes };
          this.leavePlanSaveDraft(reqBody)
        }
      }


    }
  }

  checkboxChange(event, label, typeid) {
    if (label === 'documentMandatory') {
      if (event.target.checked === false) {
        this.leaveTypeData.at(typeid).get('leaveRule1Form').patchValue({ "thresholdDays": null })
      }
    }
    if (label === 'allowNegativeLeaves') {
      if (event.target.checked === false) {
        this.leaveTypeData.at(typeid).get('leaveRule1Form').patchValue({ "negativeLeaveLimit": null })
      }
    }
    if (label === 'applicableForResumption') {
      if (event.target.checked === false) {
        this.leaveTypeData.at(typeid).get('leaveRule2Form').patchValue({ "resumptionThresholdDays": null })
      }
    }
    if (label === 'allowCarryOver') {
      if (event.target.checked === false) {
        this.leaveTypeData.at(typeid).get('leaveRule2Form').patchValue({
          "maxCarryOver": null,
          "allowCarryOverToBeUsedWithin": null
        })
        this.leaveTypeData.at(typeid).get('leaveRule2Form').get('maxCarryOver').disable();
        this.leaveTypeData.at(typeid).get('leaveRule2Form').get('allowCarryOverToBeUsedWithin').disable();
      }
      else {
        this.leaveTypeData.at(typeid).get('leaveRule2Form').get('maxCarryOver').enable();
        this.leaveTypeData.at(typeid).get('leaveRule2Form').get('allowCarryOverToBeUsedWithin').enable();
      }
    }
  }
  onAccrualChange(event, typeid) {
    //this.savePatchDataList(event, `accrualType_${typeid}`)

    if (event?.id?.toString() !== "5") {

      this.leaveTypeData.at(typeid).get('leaveRule2Form').patchValue({ "accrualDay": null })
    }
  }
  onQuotaChange(event, typeid) {

    this.savePatchDataList(event, `quotaResetType_${typeid}`)
    if (event?.id?.toString() !== "5") {

      this.leaveTypeData.at(typeid).get('leaveRule2Form').patchValue({ "quotaResetDay": null })
    }
  }

  onEntitlementChange(event, typeid) {

    this.savePatchDataList(event, `entitlementUnit_${typeid}`)
    if (event?.id?.toString() === "2") {
      this.leaveTypeData.at(typeid).get('leaveRule1Form').patchValue({ "allowHourly": true })
      this.leaveTypeData.at(typeid).get('leaveRule1Form').get('allowHourly').disable();
    }
    else {
      this.leaveTypeData.at(typeid).get('leaveRule1Form').patchValue({ "allowHourly": false })
      this.leaveTypeData.at(typeid).get('leaveRule1Form').get('allowHourly').enable();
    }
  }
  onValueChange(event, label, typeid) {
    if (label === 'value') {

      this.leaveTypeData.at(typeid).patchValue({ incrementValue: 0 });
      this.leaveTypeData.at(typeid).patchValue({ decrementValue: event.target.value });

    }
  }
  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }
  onDrawerSave(event) {
    let isValid = false;
    if (this.activeTemplateName === 'applicableForEncashment') {
      if (this.encashmentData(this.formArrayIndex).status === 'INVALID') {
        isValid = true;
        this.encashmentData(this.formArrayIndex).get('encashmentSaved').patchValue(false)
        this.applicableForEncashmentSaved = false
      } else {
        this.encashmentData(this.formArrayIndex).get('encashmentSaved').patchValue(true)
        this.applicableForEncashmentSaved = true;
      }
    }
    else if (this.activeTemplateName === 'applicableForFullFinal') {
      if (this.fullFinalData(this.formArrayIndex).status === 'INVALID') {
        isValid = true;
        this.fullNFinalSaved = false
        this.fullFinalData(this.formArrayIndex).get('fullNFinalSaved').patchValue(false)
      } else {
        this.fullNFinalSaved = true
        this.fullFinalData(this.formArrayIndex).get('fullNFinalSaved').patchValue(true)
      }
    }
    else if (this.activeTemplateName === 'entitlementPerPeriod') {
      if (this.entitlementData(this.formArrayIndex).status === 'INVALID') {
        isValid = true;
        this.entitlementPerPeriodSaved = false
        this.leaveEntitlement(this.formArrayIndex).get('perPeriodSaved').patchValue(false)
      } else {
        this.entitlementPerPeriodSaved = true
        this.leaveEntitlement(this.formArrayIndex).get('perPeriodSaved').patchValue(true)
      }
      this.formPercentage = this.calculateFormPercentage();
    }

    if (isValid) {
      this.submit = true;
      this.saveButtonDisable = true;
    }
    else {
      this.submit = false;
      this.saveButtonDisable = false;
    }

  }
  onDrawerCancel(event) {
    this.submit = false;



    let formName = '';
    if (this.activeTemplateName === 'applicableForEncashment') {

      formName = 'encashment';
      this.applicableForEncashmentSaved = false
      this.leaveTypeData.at(this.formArrayIndex).get(formName).patchValue(this.encashmentTemp);
      this.patchDataList['encashment_encashmentComponent' + '_' + this.formArrayIndex] = this.encashmentTemp['encashmentComponent']
      this.patchDataList['encashment_component' + '_' + this.formArrayIndex] = this.encashmentTemp['component']
    }
    else if (this.activeTemplateName === 'applicableForFullFinal') {
      formName = 'fullAndFinal';
      this.fullNFinalSaved = false
      this.leaveTypeData.at(this.formArrayIndex).get(formName).patchValue(this.fullFinalTemp);
      delete this.patchDataList['fullNFinal_encashmentComponent' + '_' + this.formArrayIndex]
      delete this.patchDataList['fullNFinal_component' + '_' + this.formArrayIndex]
    }
    else if (this.activeTemplateName === 'entitlementPerPeriod') {
      formName = 'entitlementPerPeriodForm';
      this.entitlementPerPeriodSaved = false
      this.leaveTypeData.at(this.formArrayIndex).get(formName).patchValue(this.entitlememtTemp);
      // this.entitlementData(this.formArrayIndex).clear();
      //this.entitlementDrawer(this.formArrayIndex);
      // this.encashmentData(this.formArrayIndex).reset();
    }


  }

  leavePlanSaveDraft(reqbody) {
    this.isDraftProcessing = true;
    this.draftSuccessMsg = '';

    if (this.leaveForm.get('leavePlanForm').value.leavePlanId) {
      this.apiService.put(`leave/configuration/plan/${this.leaveForm.get('leavePlanForm').value.leavePlanId}`, reqbody, 'leave-configuration').subscribe({
        next: (res: any) => {
          if (res) {

            this.isDraftProcessing = false;
            this.draftSuccessMsg = 'Draft saved Successfully';
            this.cdRef.detectChanges();
            //this.leavePlanId = res._id;
            //this.PlanDraft = true;
          }
        },
        error: (error: any) => {
          this.detectedError = true;
          console.error(error);
          this.cdRef.detectChanges();

        }
      }
      );
    }
    else {
      this.apiService.post(`leave/configuration/plan`, reqbody, 'leave plan').subscribe({
        next: (res: any) => {
          if (res) {

            //this.leavePlanId = res._id;
            //this.leaveForm.value.leavePlanId = res._id;
            this.leaveForm.get('leavePlanForm').patchValue({
              "leavePlanId": res._id
            })
            const formArray = this.leaveForm.get('leaveTypeForm') as FormArray;
            // Iterate through each row and patch values
            for (let i = 0; i < formArray.length; i++) {
              const formGroup = formArray.at(i) as FormGroup;
              formGroup.patchValue({
                "leavePlanId": res._id
              });
            }
            //this.leaveForm.value.planDraft = true;
            //this.PlanDraft = true;

            this.isDraftProcessing = false;
            this.draftSuccessMsg = 'Draft saved Successfully';
            this.cdRef.detectChanges();
          }
        },
        error: (error: any) => {
          this.detectedError = true;
          // console.error(error);
          this.isDraftProcessing = false;
          this.cdRef.detectChanges();

        }
      }
      );

    }
  }
  leaveTypeSaveDraft(reqbody) {
    this.isDraftProcessing = true;
    this.draftSuccessMsg = '';




    if (this.leaveForm.value.leaveTypeForm[this.formArrayIndex].leaveTypeId) {
      this.apiService.put(`leave/configuration/types/${this.leaveForm.value.leaveTypeForm[this.formArrayIndex].leaveTypeId}`, reqbody, 'leave-configuration').subscribe({
        next: (res: any) => {
          if (res) {

            //this.leaveTypeId = res._id;
            //this.leaveTypeDraft = true;
            this.isDraftProcessing = false;
            this.draftSuccessMsg = 'Draft saved Successfully';
            this.cdRef.detectChanges();
          }
        },
        error: (error: any) => {
          this.detectedError = true;
          // console.error(error);
          this.isDraftProcessing = false;
          this.cdRef.detectChanges();

        }
      }
      );
    }
    else {
      this.apiService.post(`leave/configuration/types`, reqbody, 'leave type').subscribe({
        next: (res: any) => {
          if (res) {

            //this.leaveTypeId = res._id;
            //this.leaveTypeDraft = true;

            this.isDraftProcessing = false;
            this.leaveTypeData.at(this.formArrayIndex).patchValue({
              "leaveTypeId": res._id
            });
            this.draftSuccessMsg = 'Draft saved Successfully';
            this.cdRef.detectChanges();
            //this.leaveForm.value.leaveTypeForm[this.formArrayIndex].leaveTypeId = res._id;
            //this.leaveForm.value.leaveTypeForm[this.formArrayIndex].typeDraft = true;

          }
        },
        error: (error: any) => {
          this.detectedError = true;
          console.error(error);
          this.isDraftProcessing = false;
          this.cdRef.detectChanges();

        }
      }
      );

    }
  }

  leaveRuleSaveDraft(reqBody) {

    this.draftSuccessMsg = '';
    this.isDraftProcessing = true;
    if (this.leaveForm.value.leaveTypeForm[this.formArrayIndex].leaveRuleId && this.leaveForm.value.leaveTypeForm[this.formArrayIndex].ruleDraft) {
      this.apiService.put(`leave/configuration/rule/${this.leaveForm.value.leaveTypeForm[this.formArrayIndex].leaveRuleId}`, reqBody, 'leave-configuration').subscribe({
        next: (res: any) => {
          if (res) {

            this.leaveRuleId = res._id;
            this.leaveRule1Draft = true;
            this.isDraftProcessing = false;
            this.draftSuccessMsg = 'Draft saved Successfully';
            this.cdRef.detectChanges();
          }
        },
        error: (error: any) => {
          this.detectedError = true;
          console.error(error);
          this.isDraftProcessing = false;

          this.cdRef.detectChanges();
        }
      }
      );
    }
    else {
      this.apiService.post(`leave/configuration/rule`, reqBody, 'leave rule').subscribe({
        next: (res: any) => {
          if (res) {

            this.leaveForm.value.leaveTypeForm[this.formArrayIndex].leaveRuleId = res._id;
            this.leaveForm.value.leaveTypeForm[this.formArrayIndex].ruleDraft = true;
            this.leaveRuleId = res._id;
            this.leaveRule1Draft = true;
            this.isDraftProcessing = false;
            this.leaveTypeData.at(this.formArrayIndex).patchValue({
              "leaveRuleId": res._id,
              "ruleDraft": true
            });
            this.draftSuccessMsg = 'Draft saved Successfully';
            this.cdRef.detectChanges();
          }
        },
        error: (error: any) => {
          this.detectedError = true;
          console.error(error);
          this.isDraftProcessing = false;

          this.cdRef.detectChanges();
        }
      }
      );

    }
  }
  savePatchDataList(event, type) {
    this.patchDataList = { ...this.patchDataList, [type]: event };

  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  checkFormValid() {
    let isInvalid = false;
    const leaveTypeFormArray = this.leaveForm?.get('leaveTypeForm') as FormArray;
    for (let i = 0; i < leaveTypeFormArray.controls.length; i++) {
      this.formData[1].labels.forEach(label => {
        const control = leaveTypeFormArray.at(i).get(label.labelName.defaultValue);

        if (control && control.invalid) {
          isInvalid = true;
          // Control is invalid
        }
      });
      if (this.entitlementData(i).status === 'INVALID' || this.leaveRule1Data(i).status === 'INVALID' || this.leaveRule2Data(i).status === 'INVALID') {
        isInvalid = true;
      }
    }
    return isInvalid;
  }

  onAddMore() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.currentURL, 'add-leave-type', this.pathId]);
    });
  }
  removeEntitlementPerPeriod(index) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Ensure that the deletion process follows the proper sequence!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, cancel!',
      customClass: {
        confirmButton: `btn-${this.theme}`,
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.entitlementData(this.formArrayIndex).removeAt(index)
      }
    });

  }
  onKeyDown(event: KeyboardEvent): void {
    // Check if the pressed key is 'e' or 'E'
    if (event.key.toLowerCase() === 'e') {
      // Prevent the default action (i.e., prevent typing 'e')
      event.preventDefault();
    }
  }
  onInput(event: any, name: string, min: number, max: number) {

    if (name === 'value') {
      const value = parseFloat(event.target.value);
      if (isNaN(value) || value < min) {
        if (event.inputType === 'insertText') {
          event.target.value = min;
        }
      } else if (value > max) {
        event.target.value = max;
      }
    } else {
      let value = event.target.value.replace(/[^\d]/g, '');
      if (isNaN(parseInt(value)) || parseInt(value) < min) {
        if (event.inputType === 'insertText') {
          event.target.value = min;
        }
      } else if (parseInt(value) > max) {
        event.target.value = max;
      }
    }
  }


  onSubsidiaryChange(event) {

    if (event?.length > 0) {
      this.filterCondition = [`subsidiary=${event?.map(s => s.id)}`];
    }
    else {
      this.filterCondition = [];
    }
    this.leaveForm.get('leavePlanForm').patchValue({
      "location": [],
      "department": [],
      "class": []
    })
    this.savePatchDataList([], 'location')
    this.savePatchDataList([], 'department')
    this.savePatchDataList([], 'class')
  }
  calculateFormPercentage() {
    let validCount = 0;
    let totalCount = 0;

    // Loop through the main form labels
    this.formData[0].labels.forEach(label => {
      const control = this.leaveForm.get('leavePlanForm').get(label.labelName.defaultValue);
      if (control && (control.valid || control.disabled)) {
        validCount++;
      }
      totalCount++
    });

    // Loop through the leave type form array
    const leaveTypeFormArray = this.leaveForm?.get('leaveTypeForm') as FormArray;
    for (let i = 0; i < leaveTypeFormArray.controls.length; i++) {
      this.formData[1].labels.forEach(label => {
        const control = leaveTypeFormArray.at(i).get(label.labelName.defaultValue);
        if (control && (control.valid || control.disabled)) {
          validCount++;
        }
        totalCount++;
      });

      // Loop through the leave rule 1 data
      this.formData[2].labels.forEach(label => {
        const control = this.leaveRule1Data(i).get(label.labelName.defaultValue);
        if (control && (control.valid || control.disabled)) {
          validCount++;
        }
        totalCount++;
      });

      // Loop through the leave rule 2 data
      this.formData[3].labels.forEach(label => {
        const control = this.leaveRule2Data(i).get(label.labelName.defaultValue);
        if (control && (control.valid || control.disabled)) {
          validCount++;
        }
        if(label.labelName.defaultValue !== 'entitlementPerPeriod' && label.labelName.defaultValue !== 'applicableForEncashment' && label.labelName.defaultValue !== 'applicableForFullFinal'){
          totalCount++;
        }
      });

      // Loop through the entitlement data
      this.encashmentFormMeta[0].labels.forEach((header, index) => {
        if (index !== 0) {
          const control = this.entitlementData(i).get(header.labelName.defaultValue);
          if (control && (control.valid || control.disabled)) {
            validCount++;
          }
          totalCount++;
        }

      });
    }


    // Calculate the percentage
    const percentage = (validCount / totalCount) * 100;

    // Round the percentage to two decimal places
    const roundedPercentage = Number(percentage.toFixed(2));

    return roundedPercentage;
  }
  onFrequencyChange(event,index,label){
    if(event){
      if(label === 'accrualFrequency'){
        if(event?.id === '1'){
          this.leaveRule2Data(index).patchValue({
            "accrualType":"3"
          })
        }
      }
    }
    else{
      if(label === 'accrualFrequency'){
        this.leaveRule2Data(index).patchValue({
          "accrualType":null
        })
      }else{
        this.leaveRule2Data(index).patchValue({
          "quotaResetType":null
        })
      }
    }
  }
}

