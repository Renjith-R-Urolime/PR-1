import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { add, format, parseISO } from 'date-fns';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { WizardService } from 'src/app/shared/services/wizard.service';
import { WizardTabs, } from 'src/app/shared/ui/wizard-tabs/wizard-tabs';
import { SubSink } from 'subsink';
import { componentFormData, formData, formSections, wizardTabs } from '../payroll.data';
const _ = require('lodash');


@Component({
  selector: 'app-payroll-onboard-form',
  templateUrl: './payroll-onboard-form.component.html',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: ['./payroll-onboard-form.component.scss']
})
export class PayrollOnboardFormComponent implements OnInit {
  @ViewChild('customTemplate') customTemplate: TemplateRef<any>;
  formData: any = formData;
  baseForm: FormGroup;
  isProcessing: boolean = false;
  submit: boolean = false;
  theme: string = this.sharedService.getTheme();
  id;
  subsidiaryList = [];
  col = 6;
  isLoading: boolean = false;
  options = [];
  formName: any;
  private modalRef: NgbModalRef;
  detectedError: boolean;
  private routeSub: Subscription | undefined;
  wizardData: WizardTabs = wizardTabs;
  salaryAllocationList: any = []
  private subs = new SubSink();
  overtimeRulesList: any = [];
  originalOvertimeRulesList: any = [];
  componentList: any = [];
  ticketEligibilityList: any;
  contributionRulesList: any;
  leavePlanList: any;
  payrollCycleList: any;
  paymentMethodList: any;
  shiftList: any;
  accountType: any;
  defineSalaryFormState: any
  jurisdictionList: any;
  employeeContractList: any = [];
  countryList: any;
  currentStep: any;
  fetchedPayStructureDetails: any
  formSections: any = formSections;
  basicSalary: any
  listLoading = false;
  formTemplate: TemplateRef<any>;
  headerText: string;
  saveButtonDisable: boolean = false
  minGrossPay: any
  maxGrossPay: any
  salaryAllocationType: any
  showUploadForm: boolean = false;
  componentFormData = componentFormData;
  next: boolean = false;
  c3IdPaymentMethod = [];
  empSelected: any = {};
  wpsSelected: boolean = false;
  c3Selected: boolean = false;
  componentTotal: number = 0;
  componentItems: any[] = [];
  showPaymentId: boolean = false;
  defineSalarySaved: boolean = false;
  maxLimit: any = Infinity
  isPercentageAllocation: boolean = false;
  filterCondition: string[] = [];
  workCalendarCondition: string[] = [];
  leavePlanCondition: string[] = [];
  contributionRuleCondition: string[] = [];
  contractCondition: string[] = [];
  showContributionRegButton: boolean = false;
  subsidiaryCountryFilter: string[] = [];
  isContractRequired: boolean = false;
  employeeInformationInvalidControls: any = [];
  bankInformationInvalidControls: any = [];
  payrollSetupInvalidControls: any = [];
  leaveSetupInvalidControls: any = [];
  isSwitchRequired: boolean = false;
  idPrefix = "";
  showNoComponentMsg: boolean = false;

  constructor(
    private router: Router,
    private dynamicFormService: DynamicFormService,
    private fb: FormBuilder, private modalService: NgbModal,
    private apiService: ApiService,
    private wizardService: WizardService, private route: ActivatedRoute,
    public sharedService: SharedService, private cdRef: ChangeDetectorRef, private _location: Location) { }

  onCancel() {
    this._location.back();
  }

  goToList() {
    this.router.navigate([`/employee-hub/profiles/payroll-enrollment`]);
    this.sharedService.onModalClose();
  }
  goToView() {
    this.router.navigate([`employee-hub/profiles/employee/view/${this.id}`]);
    this.sharedService.onModalClose();
  }
  goToContributionRegister() {
    this.router.navigate([`/employee/master/contribution-register/${this.id}/create`]);
    this.sharedService.onModalClose();
  }

  onSubmit() {
    this.submit = true;
    let finalformData = {};
    this.isProcessing = true;
    let onboardInfo = {};
    if (this.baseForm.value['payrollSetupForm']["contributionRules"].length > 0) {
      this.showContributionRegButton = true;
    }
    else {
      this.showContributionRegButton = false;
    }
    this.cdRef.detectChanges();
    onboardInfo = { ...this.baseForm.value['employeeInformationForm'], ...this.baseForm.value['payrollSetupForm'], ...this.baseForm.value['leaveSetupForm'] }
    delete onboardInfo["employeeId"];
    finalformData = { ...onboardInfo };
    finalformData['bankDetails'] = Array(this.baseForm.value['bankInformationForm']);
    finalformData['salaryDetails'] = {};
    finalformData['salaryDetails'] = { ...this.baseForm.value['defineSalary'] };
    finalformData['grossPay'] = this.baseForm.value['defineSalary'].grossPay;
    finalformData['expenseTypeId'] = this.baseForm.value['defineSalary'].expenseTypeId;
    let grossPay = this.baseForm.value['defineSalary'].grossPay

    let components = [];

    this.componentItems.forEach(element => {
      if (element.checked) {
        if (this.isPercentageAllocation) {

          components.push({ "componentId": element.id, "rate": ((parseInt(element.value) * grossPay) / 100).toFixed(2) })
        }
        else {
          components.push({ "componentId": element.id, "rate": element.value })
        }
      }
    })
    finalformData['salaryDetails']["component"] = components;
    finalformData['salaryDetails'] = Array(finalformData['salaryDetails']);



    if (!this.baseForm.controls['payrollSetupForm'].invalid && !this.baseForm.controls['leaveSetupForm'].invalid) {
      this.submit = false;
      this.apiService.put(`core-hr/employee/${this.id}`, finalformData).subscribe({
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
          this.isProcessing = false;


        }
      }
      );
    }
    else {

      this.isProcessing = false;
    }
  }

  onBack() {
    this.currentStep = this.currentStep - 1;
    this.wizardService.setCurrentStep(this.currentStep);
    this.isProcessing = false;
  }

  onNext() {
    /* this.salaryAllocationList=[];
    this.salaryAllocationList = [{ "id": 1, "name": "Fixed Method" }];

    this.baseForm.get('defineSalary').patchValue({
      "allocation": this.salaryAllocationList[0].id
    }) */
    // for (const name in this.baseForm.controls['employeeInformationForm']['controls']) {
    //   if (this.baseForm.controls['employeeInformationForm']['controls'][name].invalid && !this.employeeInformationInvalidControls.includes(name)) {
    //     this.employeeInformationInvalidControls.push(name);
    //   }
    // }
    // for (const name in this.baseForm.controls['bankInformationForm']['controls']) {
    //   if (this.baseForm.controls['bankInformationForm']['controls'][name].invalid && !this.bankInformationInvalidControls.includes(name)) {
    //     this.bankInformationInvalidControls.push(name);
    //   }
    // }
    // for (const name in this.baseForm.controls['payrollSetupForm']['controls']) {
    //   if (this.baseForm.controls['payrollSetupForm']['controls'][name].invalid && !this.payrollSetupInvalidControls.includes(name)) {
    //     this.payrollSetupInvalidControls.push(name);
    //   }
    // }
    // for (const name in this.baseForm.controls['leaveSetupForm']['controls']) {
    //   if (this.baseForm.controls['leaveSetupForm']['controls'][name].invalid && !this.leaveSetupInvalidControls.includes(name)) {
    //     this.leaveSetupInvalidControls.push(name);
    //   }
    // }

    this.next = true;
    if (!this.baseForm.controls['employeeInformationForm'].invalid && !this.baseForm.controls['bankInformationForm'].invalid) {
      // if (!this.baseForm.invalid) {
      this.next = false;
      this.currentStep = this.currentStep + 1;
    }
    else {

    }
    this.wizardService.setCurrentStep(this.currentStep);
  }


  validateDefineSalary() {
    console.log( this.baseForm.get('defineSalary').invalid );
    
    if (!this.isPercentageAllocation && this.componentTotal > 0) {
      if (this.componentTotal > this.baseForm.get('defineSalary').get('grossPay').value || this.componentTotal < this.baseForm.get('defineSalary').get('grossPay').value || this.baseForm.get('defineSalary').invalid) {
        this.saveButtonDisable = true
        return;
      }
      else {
        this.saveButtonDisable = false
      }
    }
    /////////////////////////////

    if (this.isPercentageAllocation) {
      if (this.componentTotal > 100) {
        this.saveButtonDisable = true
        return;
      }
      else {
        this.saveButtonDisable = false

      }
    }

  }


  savePopupForm(formName, headerText) {
    if (headerText == 'defineSalary') {
      this.validateDefineSalary()

      if (this.baseForm.get('defineSalary').get('grossPay').value && this.componentTotal === 0) {
        this.showNoComponentMsg = true;
        this.cdRef.detectChanges();
      }
      else {
        this.showNoComponentMsg = false;
        this.cdRef.detectChanges();
      }
      if (this.baseForm.get('defineSalary').get('grossPay').value > 0 && this.componentTotal > 0 && this.saveButtonDisable) {
        this.defineSalarySaved = true;
      }
      this.defineSalaryFormState = {
        basic: this.baseForm.get('defineSalary').value,
        component: JSON.stringify(this.componentItems)
      }
    }
  }

  cancelPopupForm(formName, headerText) {
    this.defineSalarySaved = false;
    if (headerText == 'defineSalary') {
      this.componentItems = [];

      this.baseForm.get('defineSalary').patchValue({
        "grossPay": '',
        "allocation": "1",
        "effectiveDate": this.empSelected.hireDate ? format(parseISO(this.empSelected.hireDate), 'yyyy/MM/dd') : format(new Date(), 'yyyy/MM/dd'),
      });
      this.cdRef.detectChanges();
      this.getComponentList();
      //check logic here
      // this.salaryAllocationType = this.defineSalaryFormState?.basic?.allocation

      // this.componentItems = JSON.parse(this.defineSalaryFormState?.component)

    }
  }


  createForms() {
    let formGroup = {};

    formData.forEach(form => {
      const innerForm = {}
      if (form.tabName === 'step1') {
        //creating employee and bank forms
        form.labels.forEach(label => {
          const control = new FormControl('', label.required ? Validators.required : []);
          innerForm[label.labelName.defaultValue] = control;
        });
        formGroup[form.formName] = this.fb.group(innerForm);
        this.baseForm = this.fb.group(formGroup);
      }
      if (form.tabName == 'step2') {
        //creating payroll and leave forms
        form.labels.forEach(label => {
          const control = new FormControl('', label.required ? Validators.required : []);
          innerForm[label.labelName.defaultValue] = control;
        });
        formGroup[form.formName] = this.fb.group(innerForm);
        this.baseForm = this.fb.group(formGroup);
      }
    });
  }

  enableInputField(event, index, currentComponent) {
    if (event.target.checked) {
      this.componentItems[index].checked = true;
    }
    else {
      this.componentItems[index].checked = false;
      const componentToUpdate = this.componentItems.find(component => component.id == currentComponent.id);
      if (componentToUpdate) {
        componentToUpdate.checked = false;
        componentToUpdate.value = null
        this.calculateTotal()
      }
    }
  }
  getComponentList() {
    this.componentList.forEach((element) => {
      this.componentItems.push({ id: element.id, label: element.name, checked: false, value: '' })
    });

    //////////////////////////////////////////////////////////
    ///////////////////////////////////////Initializign the salary allocation according to the API////////////////////////////////////////////////////////////////////////////////////////
    // this.apiService.get(`core-hr/employee/settings/pay-structure/100`).subscribe({
    //   next: (res) => {
    //     this.fetchedPayStructureDetails = res["data"]["details"][0]
    //     this.salaryAllocationType = res["data"]["details"][0]["salaryAllocation"]
    //     this.baseForm.get('defineSalary').patchValue({
    //       "allocation": res["data"]["details"][0]["salaryAllocation"]['id']
    //     });

    //     this.chooseComponentAllocationMethod(this.salaryAllocationType)

    //     this.minGrossPay = res["data"]["details"][0]["minimum"]
    //     this.maxGrossPay = res["data"]["details"][0]["maximum"]

    //     this.cdRef.detectChanges();
    //   },
    //   error: (error) => {
    //

    //   }
    // })

    /////////////////
  }


  checkIfPayementIdRequired(event) {
    this.baseForm.get('bankInformationForm').patchValue({
      "paymentId": ''
    })
    if (['WPS', 'C3'].includes(event.name)) {
      if (event.name === 'WPS') {
        this.idPrefix = 'MOL';
      }
      if (event.name === 'C3') {
        this.idPrefix = 'C3';
      }
      this.cdRef.detectChanges();
      this.showPaymentId = true;
    }
    else {
      this.showPaymentId = false;
    }
  }

  chooseComponentAllocationMethod(event) {
    this.resetDefineSalarySubComponent()
    if (event.name == 'Percentage Method') {
      this.maxLimit = 100
      this.isPercentageAllocation = true

      let componentToBeShown = this.fetchedPayStructureDetails["componentDetails"].map(item => {

        if (item?.isBasic) {
          this.basicSalary = item.percentage
        }
        return { "id": item.component, "value": item.percentage, 'formula': item.formula, 'isBasic': item.isBasic }
      });

      componentToBeShown.forEach(item => {
        if (item.value !== undefined) {
          this.updateValueById(item.id.toString(), item.value.toString(), item.formula.toString(), true, item.isBasic)
        }
      });
      this.salaryAllocationType = this.baseForm.value['defineSalary'].allocation
      this.calculateTotal()
      this.cdRef.detectChanges();
    }
    else {
      this.maxLimit = Infinity
      this.isPercentageAllocation = false;
      this.resetDefineSalarySubComponent()
      this.calculateTotal()

    }

  }


  resetDefineSalarySubComponent() {
    this.componentItems.forEach(elem => {
      elem.checked = false;
      elem.value = '';
    });
  }

  setFilterCondition() {
    this.filterCondition = this.empSelected?.subsidiary ? [`subsidiary=${this.empSelected?.subsidiary?.id ? this.empSelected.subsidiary.id : ''}`] : this.filterCondition;
    this.contributionRuleCondition = this.empSelected?.subsidiary ? [`subsidiary=${this.empSelected?.subsidiary?.id ? this.empSelected.subsidiary.id : ''}`] : this.contributionRuleCondition;
    this.contractCondition = this.empSelected?.subsidiary ? [`subsidiary=${this.empSelected?.subsidiary?.id ? this.empSelected.subsidiary.id : ''}`] : this.contractCondition;

    this.filterCondition = this.empSelected?.class ? [this.filterCondition[0] + `&class=${this.empSelected?.class?.id ? this.empSelected.class.id : ''}`] : this.filterCondition;
    this.contributionRuleCondition = this.empSelected?.class ? [this.contributionRuleCondition[0] + `&class=${this.empSelected?.class?.id ? this.empSelected.class.id : ''}`] : this.contributionRuleCondition;
    this.contractCondition = this.empSelected?.class ? [this.contractCondition[0] + `&class=${this.empSelected?.class?.id ? this.empSelected.class.id : ''}`] : this.contractCondition;
    this.leavePlanCondition = this.empSelected?.class ? [`class=${this.empSelected?.class?.id ? this.empSelected.class.id : ''}`] : this.leavePlanCondition;

    this.filterCondition = this.empSelected?.department ? [this.filterCondition[0] + `&department=${this.empSelected?.department?.id ? this.empSelected.department.id : ''}`] : this.filterCondition;
    this.contributionRuleCondition = this.empSelected?.department ? [this.contributionRuleCondition[0] + `&department=${this.empSelected?.department?.id ? this.empSelected.department.id : ''}`] : this.contributionRuleCondition;
    this.contractCondition = this.empSelected?.department ? [this.contractCondition[0] + `&department=${this.empSelected?.department?.id ? this.empSelected.department.id : ''}`] : this.contractCondition;
    this.leavePlanCondition = this.empSelected?.department ? [this.leavePlanCondition[0] + `&department=${this.empSelected?.department?.id ? this.empSelected?.department.id : ''}`] : this.leavePlanCondition;

    this.filterCondition = this.empSelected?.location ? [this.filterCondition[0] + `&location=${this.empSelected.location.id}`] : this.filterCondition;
    this.contributionRuleCondition = this.empSelected?.location ? [this.contributionRuleCondition[0] + `&location=${this.empSelected.location.id}`] : this.contributionRuleCondition;
    this.contractCondition = this.empSelected?.location ? [this.contractCondition[0] + `&location=${this.empSelected.location.id}`] : this.contractCondition;
    this.leavePlanCondition = this.empSelected?.location ? [this.leavePlanCondition[0] + `&location=${this.empSelected.department.id}`] : this.leavePlanCondition;
    this.contributionRuleCondition = this.empSelected?.nationality ? [this.contributionRuleCondition[0] + `&contributionSetupDetails.nationality=${this.empSelected.nationality.id}`] : this.contributionRuleCondition;

  }



  ngOnInit() {
    this.isLoading = true;
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.createForms();


    this.apiService.get(`core-hr/employee/${this.id}`, 'onboard').subscribe({
      next: (res) => {
        this.empSelected = res["data"];
        // this.setFilterCondition();
        this.baseForm.get('employeeInformationForm').patchValue({
          "expenseSubsidiaryId": this.empSelected?.subsidiary?.id,
          "sponserSubsidiaryId": this.empSelected?.subsidiary?.id,
          "probationPeriod": 0,
          "noticePeriod": 0,
          "dateOfConfirmation": this.empSelected.hireDate ? format(parseISO(this.empSelected.hireDate), 'yyyy/MM/dd') : format(new Date(), 'yyyy/MM/dd'),
          "payrollOnboardDate": this.empSelected.hireDate ? format(parseISO(this.empSelected.hireDate), 'yyyy/MM/dd') : format(new Date(), 'yyyy/MM/dd')
        });

        this.subsidiaryCountryFilter = [`country=${this.empSelected?.subsidiary?.country?.id}`]

        this.apiService.get(`core-hr/organisation/jurisdiction${this.empSelected?.subsidiary?.id ? '?subsidiary=' + this.empSelected?.subsidiary?.id : ''}`).subscribe({
          next: (res) => {
            this.jurisdictionList = res["data"];
          }
        });
        //this.salaryAllocationList = [{ "id": 1, "name": "Fixed Method" }];
        this.baseForm.get('defineSalary').patchValue({
          "allocation": "1",
          "effectiveDate": this.empSelected.hireDate ? format(parseISO(this.empSelected.hireDate), 'yyyy/MM/dd') : format(new Date(), 'yyyy/MM/dd'),
        });
        this.isLoading = false;
        this.cdRef.detectChanges();
      },
      error: (error) => {


      }
    })
    this.listLoading = true;

    this.wizardService.currentStep$.subscribe(currentStep => {
      this.currentStep = currentStep;
    });



    this.apiService.get(`payroll/setup/component?limit=max&subType=1&type=1`, 'dropdown').subscribe({
      next: (res) => {
        this.componentList = res["data"];
        this.getComponentList();
      }
    })

    this.baseForm.get('employeeInformationForm.probationPeriod').valueChanges.subscribe(
      (newProbationPeriod) => {
        this.cdRef.detectChanges();
        const probationEndDate = add(new Date(this.empSelected.hireDate), { days: newProbationPeriod });

        this.baseForm.get('employeeInformationForm').patchValue({
          'dateOfConfirmation': format(probationEndDate, 'yyyy/MM/dd')
        })
        this.cdRef.detectChanges();
      }
    );

    this.baseForm.get('employeeInformationForm.payrollOnboardDate').valueChanges.subscribe(
      (val) => {
        this.baseForm.get('defineSalary').patchValue({
          "effectiveDate": val,
        });
      });

    this.cdRef.detectChanges();
  }
  //ngOnInit ends

  filterShift(event) {
    if (event) {
      this.workCalendarCondition = [`workCalendar=${event.id}`]
    }
    else {
      this.workCalendarCondition = [];
    }
  }


  filterOvertimeList(event) {
    if (event.length > 0) {
      let tempOTList = _.cloneDeep(this.originalOvertimeRulesList);
      event.forEach(elem => {
        if (Number(elem?.type?.id) === 3) {
          tempOTList.forEach(ot => {
            if (parseInt(ot.id) !== parseInt(elem?.id) && parseInt(ot.type.id) !== 3) {
              ot["disabled"] = true;
              this.cdRef.detectChanges();
            }
            else {
              delete ot.disabled;
              this.cdRef.detectChanges();
            }
          });
          this.overtimeRulesList = [];
          this.overtimeRulesList = _.cloneDeep(tempOTList);
          this.cdRef.detectChanges();
        }

        else if (Number(elem?.type?.id) === 1 || Number(elem?.type?.id) === 2) {
          tempOTList.forEach(ot => {
            if (parseInt(ot.id) !== parseInt(elem?.id)) {
              ot["disabled"] = true;
              this.cdRef.detectChanges();
            }
            else {
              delete ot.disabled;
              this.cdRef.detectChanges();
            }
          });
          this.overtimeRulesList = [];
          this.overtimeRulesList = _.cloneDeep(tempOTList);
          this.cdRef.detectChanges();
        }
      });
    }

    if (event.length <= 0) {
      this.overtimeRulesList = _.cloneDeep(this.originalOvertimeRulesList);
      this.cdRef.detectChanges();
    }
  }

  addJurisdictionToFilter(event) {
    this.filterCondition = [];
    this.leavePlanCondition = [];
    this.contributionRuleCondition = [];
    this.workCalendarCondition = [];

    this.employeeContractList = [];
    this.baseForm.get('employeeInformationForm').patchValue({
      "contractId": '',
      "workCalendarId": '',
      "shiftId": '',
    });
    this.baseForm.get('payrollSetupForm').patchValue({
      "contributionRules": '',
      "overtimeRules": '',
      "leavePlanId": '',
    });
    this.cdRef.detectChanges();
    if (this.baseForm.get('employeeInformationForm').value['jurisdictionId']) {
    this.setFilterCondition();

      this.filterCondition = event ? [this.filterCondition[0] + `&jurisdiction=${event.id ? event.id : ''}`] : this.filterCondition;
      this.leavePlanCondition = event ? [this.leavePlanCondition[0] + `&jurisdiction=${event.id ? event.id : ''}`] : this.leavePlanCondition;
      this.contributionRuleCondition = event ? [this.contributionRuleCondition[0] + `&jurisdiction=${event.id ? event.id : ''}`] : this.contributionRuleCondition;
      this.contractCondition = event ? [this.contractCondition[0] + `&jurisdiction=${event.id ? event.id : ''}`] : this.contractCondition;
      this.contractCondition = [this.contractCondition[0] + `&nationalityRestrictionAttr=true`];//adding nationalityRestrictionAttr to get nationality info in response
      let tempContractList = [];

      this.apiService.get(`payroll/setup/contract?` + this.contractCondition[0], 'dropdown').subscribe({
        next: (res: any) => {

          this.employeeContractList = res.data;
          // Assuming contractList is already defined
          this.employeeContractList = this.employeeContractList.filter(contract => {
            // Check if nationalityRestriction exists and if any of its elements have id equal to 68
            return !contract.nationalityRestriction || !contract.nationalityRestriction.some(nat => parseInt(nat.id) === parseInt(this.empSelected?.nationality?.id));
          });
          if (this.employeeContractList.length >= 1) {
            //add logic to make contract mandate
            this.isContractRequired = true;
            this.formData[0].labels[4].required = true;
            this.formData[0].labels[4].validations = [
              {
                name: "required",
                validator: Validators.required,
                message: "Employee Contract Required"
              }
            ];
            this.cdRef.detectChanges();

          }
          else {
            this.isContractRequired = false;
            this.formData[0].labels[4].required = false;
            this.formData[0].labels[4].validations = [];
          }
        }
      })


      this.apiService.get(`payroll/setup/overtime-setup?${this.filterCondition}&limit=max`, 'dropdown').subscribe({
        next: (res: any) => {
          if (res) {
            this.originalOvertimeRulesList = _.cloneDeep(res?.data);
            this.overtimeRulesList = _.cloneDeep(res?.data);//.map(item => ({ id: item.id, name: item.name }))
            this.cdRef.detectChanges();
          }
        },
        error(err) {

        },
      })
    }
    this.cdRef.detectChanges();
  }

  switchTab(event) {
    this.next = true;

    if (this.currentStep < event) {
      if (!this.baseForm.controls['employeeInformationForm'].invalid && !this.baseForm.controls['bankInformationForm'].invalid) {
        this.isSwitchRequired = true;
        this.onNext();
      }
      else {
        this.isSwitchRequired = false;
      }
    }
    else if (this.currentStep > event) {
      this.onBack();
    }
  }

  assignTemplate(headerText, formTemplate) {
    this.headerText = headerText;
    this.formTemplate = formTemplate;
  }
  ///////////////update the value field by passing the id and the value /////////////////

  updateValueById(id: string, newValue: string, formula?, disable?, isBasic?): void {
    const componentToUpdate = this.componentItems.find(component => component.id == id);

    if (componentToUpdate) {
      if (formula && formula == '2' && this.basicSalary) {
        componentToUpdate.value = ((parseInt(newValue) / 100) * parseInt(this.basicSalary)).toString();
        componentToUpdate.checked = true;
        componentToUpdate.disable = disable
        componentToUpdate.formula = formula
        componentToUpdate.isBasic = isBasic
      }
      else {
        componentToUpdate.value = newValue;
        componentToUpdate.checked = true;
        componentToUpdate.disable = disable
        componentToUpdate.formula = formula
        componentToUpdate.isBasic = isBasic
      }
    }

  }

  totalGrossPay(event) {
    this.baseForm.get('defineSalary').get('grossPay').patchValue(event)
  }

  calculateTotal(event?, component?) {
    this.updateValueById(component?.id, event)
    let grossPay;
    let sum = 0;
    if (this.baseForm.value['defineSalary'].grossPay) {
      grossPay = Number(this.baseForm.value['defineSalary'].grossPay);
    }
    this.componentItems.forEach(element => {

      if (element.checked) {
        sum += Number(element.value);
      }
    })
    this.componentTotal = sum;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  hasValidationErrors(label: any): boolean {
    return this.submit && label.validations.some(validation => {
      return this.baseForm.get(label.labelName.alias)?.hasError(validation.name);
    });

  }

  step1HasValidationErrors(label: any, formName: any): boolean {
    return this.submit && label.validations.some(validation => {
      return this.baseForm.get(label.labelName.alias)?.hasError(validation.name);

    });

  }


}
