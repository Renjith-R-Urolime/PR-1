import { ChangeDetectorRef, Component, NgZone, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbDateParserFormatter, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { contractMasterFormMeta, formSections } from '../contract-master.data';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-contract-master-form',
  templateUrl: './contract-master-form.component.html',
  styleUrls: ['./contract-master-form.component.scss']
})
export class ContractMasterFormComponent {
  isLoading: boolean = false;
  detectedError: boolean = false;
  contractMasterForm: FormGroup;
  submit: boolean = false;
  formSections: Sections = formSections;
  formData: any = contractMasterFormMeta;
  theme: string = this.sharedService.getTheme();
  contractMasterData: any = {};
  formTemplate: TemplateRef<any>;
  activeTemplateName: string
  isProcessing: boolean = false
  saveButtonDisable: boolean = false
  headerText: string
  onDrawerSaveData: any
  resignationForm: boolean
  terminationForm: boolean
  entitlementPreviousStateResignation: any
  entitlementPreviousStateTermination: any
  sameAsResignationPreviousState:any
  applicableAfterEmployementYearsPreviousState:any
  currentResignationState: any


  entitlementStatusResignation: boolean
  entitlementStatusTermination: boolean

  calculatedGratuityRatioResignation: any
  calculatedGratuityRatioTermination: any
  classificationApplicabilityObject: any
  col: any = 4
  classificationApplicabilityFormSaved: boolean = false
  entitlementFormSaved: boolean = false
  private modalRef: NgbModalRef;
  public activeModal: NgbActiveModal
  deletedItemIdsResignation: number[] = [];
  deletedItemsIdsTermination: number[] = [];
  maxCapTooltipString: string
  classificationPatchData: any
  coutryFetchCondition: any
  subsidiaryFilter: string[] = [];
  formSubscription: any
  constructor(private zone: NgZone, private cdr: ChangeDetectorRef, public sharedService: SharedService, private fb: FormBuilder, private ngbFormatter: NgbDateParserFormatter, private dynamicFormService: DynamicFormService, private route: ActivatedRoute, public apiService: ApiService, private modalService: NgbModal, private cdRef: ChangeDetectorRef, private router: Router) { }
  id;

  ngOnInit() {

    this.maxCapTooltipString = 'Max Gratuity Payable Component * Maximum Cap'

    this.route.params.subscribe(params => {
      // Access route parameters here
      this.id = params['id'];
    });
    this.contractMasterForm = this.dynamicFormService.createControl(this.formData);
    this.contractMasterForm.addControl('resignation', this.fb.array([this.createEntitlementForm()]));
    this.contractMasterForm.addControl('termination', this.fb.array([this.createEntitlementForm()]));
    this.contractMasterForm.addControl('sameAsResignation', this.fb.control(null));
    this.contractMasterForm.addControl('applicableAfterEmployementYears', this.fb.control(null));



    if (this.id) {
      this.getContractMasterData();
    }

    if (!this.id) {
      const itemsResignation = this.contractMasterForm.get('resignation') as FormArray;
      itemsResignation.at(0).get('minimumYear').patchValue(0);

      const itemsTermination = this.contractMasterForm.get('termination') as FormArray;
      itemsTermination.at(0).get('minimumYear').patchValue(0);

    }







    const itemsResignation = this.contractMasterForm.get('resignation') as FormArray;
    this.formSubscription = itemsResignation.valueChanges.pipe(
      debounceTime(200)
    ).subscribe(changes => {
      this.reMapTermination();
    });
  }


  ngOnDestroy(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }






  getContractMasterData() {
    this.isLoading = true;
    this.apiService.get(`payroll/setup/contract/${this.id}`, 'edit').subscribe({
      next: (res: any) => {
        if (res) {
          this.classificationPatchData = {
            country: res?.data?.country,
            subsidiary: res?.data?.subsidiary,
            jurisdiction: res?.data?.jurisdiction,
            location: res?.data?.location,
            class: res?.data?.class,
            department: res?.data?.department,
          }


          if (res?.data?.resignation[0]?.maximumYear) {
            this.entitlementFormSaved = true
          }


          if (res?.data?.maximumCap) {
            this.formData.labels[10].hide = false;
            this.formData.labels[11].hide = false;
          }
          else {
            this.formData.labels[10].hide = true;
            this.formData.labels[11].hide = true;

          }

          let items = this.contractMasterForm.get('resignation') as FormArray;
          for (var i = 0; i <= res?.data?.resignation?.length - 1; i++) {
            items.push(this.createEntitlementForm());
          }
          this.removeItem(items.length - 1, 'resignation')
          /////////////////////////////////////////////////////////////////////////////////////////////////

          let itemTermination = this.contractMasterForm.get('termination') as FormArray;
          for (var i = 0; i <= res?.data?.termination?.length - 1; i++) {
            itemTermination.push(this.createEntitlementForm());
          }
          this.removeItem(items.length - 1, 'termination')


          this.entitlementStatusResignation = true
          this.contractMasterData = res?.data;
          this.contractMasterForm.patchValue(this.contractMasterData)

          this.isLoading = false;
        }
      }, error: (error: any) => {
        this.detectedError = true;


      }
    });
  }


  emittedEvent(event) {
    console.log(event, 'classsification aplcabiltiy data -final');
    this.classificationApplicabilityObject = event
  }

  onInputValueChange(value: number, k: any, name: string, type: string) {
    let entitlementArray
    if (type == 'termination') {
      entitlementArray = this.contractMasterForm.get('termination') as FormArray;
    }
    else if (type == 'resignation') {
      entitlementArray = this.contractMasterForm.get('resignation') as FormArray;
    }
    if (name == 'standardDays') {
      entitlementArray.at(k).get('standardDays').patchValue(value);
    }
    else if (name == 'gratuityDays') {
      entitlementArray.at(k).get('gratuityDays').patchValue(value);
    }

    if (type == 'termination') {
      this.gratuityDaysRatio(k, 'termination')
    }
    else if (type == 'resignation') {
      this.gratuityDaysRatio(k, 'resignation')
    }


  }



  /// Ratio logic resignation
  gratuityDaysRatio(k, event) {

    let entitlementArray

    if (event == 'resignation') {
      entitlementArray = this.contractMasterForm.get('resignation') as FormArray;
    }
    else if (event == 'termination') {
      entitlementArray = this.contractMasterForm.get('termination') as FormArray;
    }
    let gratuityDay = entitlementArray.at(k).get('gratuityDays').value
    let standardDays = entitlementArray.at(k).get('standardDays').value
    if (gratuityDay && standardDays) {
      let gratuityDaysRatio = (parseInt(gratuityDay) / standardDays).toFixed(2)
      entitlementArray.at(k).get('gratuityDaysRatio').patchValue(gratuityDaysRatio);
      entitlementArray.at(k).get('provisionRatio').patchValue(gratuityDaysRatio);

      if (event == 'resignation') {
        this.calculatedGratuityRatioResignation = gratuityDaysRatio
      }
      else if (event == 'termination') {
        this.calculatedGratuityRatioTermination = gratuityDaysRatio
      }
    }
    else {
      entitlementArray.at(k).get('gratuityDaysRatio').reset()
      entitlementArray.at(k).get('provisionRatio').reset()
      if (event == 'resignation') {
        this.calculatedGratuityRatioResignation = ''
      }
      else if (event == 'termination') {
        this.calculatedGratuityRatioTermination = ''
      }
    }
  }


  createEntitlementForm(slNo?: number, minimumYear?: number, maxYear?: number, gratuityDays?: number, standardDays?: number, gratuityDaysRatio?: number, provisionRatio?: number): FormGroup {
    const formGroup = {};

    formGroup['slNo'] = new FormControl(slNo || 0, Validators.required)
    formGroup['id'] = new FormControl()
    formGroup['minimumYear'] = new FormControl(minimumYear, Validators.required)
    formGroup['maximumYear'] = new FormControl(maxYear, [Validators.required, this.validateToGreaterThanFrom.bind(this)])
    formGroup['gratuityDays'] = new FormControl(gratuityDays, Validators.required)
    formGroup['standardDays'] = new FormControl(standardDays, Validators.required)
    formGroup['gratuityDaysRatio'] = new FormControl(gratuityDaysRatio)
    formGroup['provisionRatio'] = new FormControl(provisionRatio)

    return this.fb.group(formGroup);
  }
  validateToGreaterThanFrom(control: FormControl): { [key: string]: boolean } | null {
    const fromValue = control.parent?.get('minimumYear')?.value;
    const toValue = control.value;

    // Check if 'minimumYear' is greater than 'maximumYear'
    if (fromValue !== null && toValue !== null && fromValue >= toValue) {
      return { 'toGreaterThanFrom': true };
    }

    return null;
  }
  getFormTemplate(template: TemplateRef<any>, headerText: string, name: string) {
    this.activeTemplateName = name
    this.headerText = headerText;
    this.formTemplate = template;
  }





  newModel(model, headerText) {
    this.submit = true


    if (this.contractMasterForm.value?.eosType) {
      if (this.contractMasterForm.value?.eosType.includes('1')) {
        this.resignationForm = true;
        this.terminationForm = false;

      }

      if (this.contractMasterForm.value?.eosType.includes('2')) {
        this.terminationForm = true;
        this.resignationForm = false;

      }

      if ((this.contractMasterForm.value?.eosType.includes('1') && this.contractMasterForm.value?.eosType.includes('2')) || this.contractMasterForm.value?.eosType.includes('ALL')) {
        this.resignationForm = true;
        this.terminationForm = true;
      }
      this.entitlementStatusResignation = true;
      this.entitlementStatusTermination = true;

      const entitlementArrayResignation = this.contractMasterForm.get('resignation') as FormArray;
      this.entitlementPreviousStateResignation = entitlementArrayResignation.value.map((item: any) => ({ ...item }));
      const entitlementArrayTermination = this.contractMasterForm.get('termination') as FormArray;
      this.entitlementPreviousStateTermination = entitlementArrayTermination.value.map((item: any) => ({ ...item }));
      this.sameAsResignationPreviousState = this.contractMasterForm?.value?.sameAsResignation
      this.applicableAfterEmployementYearsPreviousState = this.contractMasterForm?.value?.applicableAfterEmployementYears

      this.headerText = headerText
      this.modalRef = this.modalService.open(model, {
        size: 'xl', scrollable: false, windowClass: 'settings-form-modal', backdrop: 'static'
      });
    }
  }



  onCheckboxTypeChange(event) {
    this.entitlementStatusTermination = true
    this.onModelSubmitType('resignation')
    if (this.entitlementStatusResignation && event.target.checked) {
      const entitlementArrayResignation = this.contractMasterForm.get('resignation') as FormArray;
      this.currentResignationState = entitlementArrayResignation.value.map((item: any) => ({ ...item }));
      const entitlementArrayTermination = this.contractMasterForm.get('termination') as FormArray;

      // Clear existing controls in the FormArray
      entitlementArrayTermination.clear();

      // Patch values from the saved state
      this.currentResignationState.forEach((item: any) => {
        entitlementArrayTermination.push(this.createEntitlementForm(item.slNo, item.minimumYear, item.maximumYear, item.gratuityDays, item.standardDays, item.gratuityDaysRatio, item.provisionRatio));
      });
    }
    else {
      const entitlementArrayTermination = this.contractMasterForm.get('termination') as FormArray;

      // Clear existing controls in the FormArray
      entitlementArrayTermination.clear();
      entitlementArrayTermination.push(this.createEntitlementForm());
      entitlementArrayTermination.at(0).get('minimumYear').patchValue(0);
    }
  }



  reMapTermination() {
    if (this.contractMasterForm?.value?.sameAsResignation) {
      const entitlementArrayResignation = this.contractMasterForm.get('resignation') as FormArray;
      this.currentResignationState = entitlementArrayResignation.value.map((item: any) => ({ ...item }));
      const entitlementArrayTermination = this.contractMasterForm.get('termination') as FormArray;

      // Clear existing controls in the FormArray
      entitlementArrayTermination.clear();

      // Patch values from the saved state
      this.currentResignationState.forEach((item: any) => {
        entitlementArrayTermination.push(this.createEntitlementForm(item.slNo, item.minimumYear, item.maximumYear, item.gratuityDays, item.standardDays, item.gratuityDaysRatio, item.provisionRatio));
      });
    }

  }


  onModelSubmit() {
    this.onModelSubmitType('resignation')
    this.onModelSubmitType('termination')
    if (this.entitlementStatusResignation && this.entitlementStatusTermination) {
      this.modalRef.close();
    }
  }

  onModelSubmitType(event) {
    let items
    if (event == 'resignation') {
      items = this.contractMasterForm.get('resignation') as FormArray;
    }
    else if (event == 'termination') {
      items = this.contractMasterForm.get('termination') as FormArray;

    }
    let status = this.checkValidation(items.value)
    const firstItem = items.at(0);
    if (items.value[0].maximumYear && items.value[0].maximumYear != 0) {
      this.entitlementFormSaved = true
    }
    else {
      this.entitlementFormSaved = false
    }
    if (items.status == 'VALID' && status == true) {

      if (event == 'termination') {
        this.entitlementStatusTermination = true
      }
      else if (event == 'resignation') {
        this.entitlementStatusResignation = true

      }

    }
    else if (items.length == 1 && !firstItem.get('minimumYear').value && !firstItem.get('maximumYear').value
      && !firstItem.get('gratuityDays').value && !firstItem.get('standardDays').value && !firstItem.get('gratuityDaysRatio').value
      && !firstItem.get('provisionRatio').value) {
    }
    else {
      if (event == 'termination') {
        this.entitlementStatusTermination = false
      }
      else if (event == 'resignation') {
        this.entitlementStatusResignation = false

      }
    }

  }





  handleCancelModalClick() {
    const entitlementArrayResignation = this.contractMasterForm.get('resignation') as FormArray;

    // Clear existing controls in the FormArray
    entitlementArrayResignation.clear();

    // Patch values from the saved state
    this.entitlementPreviousStateResignation.forEach((item: any) => {
      entitlementArrayResignation.push(this.createEntitlementForm(item.slNo, item.minimumYear, item.maximumYear, item.gratuityDays, item.standardDays, item.gratuityDaysRatio, item.provisionRatio));
    });



    const entitlementArrayTermination = this.contractMasterForm.get('termination') as FormArray;

    // Clear existing controls in the FormArray
    entitlementArrayTermination.clear();

    // Patch values from the saved state
    this.entitlementPreviousStateTermination.forEach((item: any) => {
      entitlementArrayTermination.push(this.createEntitlementForm(item.slNo, item.minimumYear, item.maximumYear, item.gratuityDays, item.standardDays, item.gratuityDaysRatio, item.provisionRatio));
    });

this.contractMasterForm.patchValue({
"sameAsResignation": this.sameAsResignationPreviousState,
"applicableAfterEmployementYears":this.applicableAfterEmployementYearsPreviousState
})

    this.modalRef.close();
  }




  addMoreEntitlementField(event) {
    let items
    if (event == 'resignation') {
      items = this.contractMasterForm.get('resignation') as FormArray;
    }
    else if (event == 'termination') {
      items = this.contractMasterForm.get('termination') as FormArray;
    }
    if (items.status == 'VALID') {
      const lastItem = items.length > 0 ? items.at(items.length - 1).get('maximumYear').value : 0

      if (event == 'resignation') {
        this.entitlementStatusResignation = true
      }
      else if (event == 'termination') {
        this.entitlementStatusTermination = true
      }
      items.push(this.createEntitlementForm(items.length + 1));
      const newFromValue = parseFloat(lastItem);
      items.at(items.length - 1).get('minimumYear').patchValue(newFromValue);
    }
    else {

      if (event == 'resignation') {
        this.entitlementStatusResignation = false
      }
      else if (event == 'termination') {
        this.entitlementStatusTermination = false
      }
    }
  }

  onSubmit() {

    this.submit = true;


    if (this.contractMasterForm.controls.name['status'] != 'VALID' || this.contractMasterForm.controls.eosType['status'] != 'VALID') {
      return '';
    }
    else {
      const dataToDelete = {
        destroy: {
          resignation: this.deletedItemIdsResignation,
          termination: this.deletedItemsIdsTermination
        }
      }
      this.isProcessing = true;
      const refinedData = this.sharedService.removeUndefinedAndNullFields({ ...dataToDelete, ...this.contractMasterForm.value })

      if (this.id) {

        let updatedcontractMasterFormData = this.dynamicFormService.getUpdatedData(this.contractMasterForm)
        this.apiService.put(`payroll/setup/contract/${this.id}`, { ...dataToDelete, ...updatedcontractMasterFormData, ...this.classificationApplicabilityObject }, 'contract').subscribe({
          next: (res: any) => {
            if (res) {
              this.sharedService.handleSuccessModel({ id: this.id });
            }
          },
          error: (error: any) => {
            this.isProcessing = false;
          }
        }
        );
      }
      else {
        console.log({ ...refinedData, ...this.classificationApplicabilityObject }, 'final object submited');
        if (!this.classificationApplicabilityObject) {
          console.log("not found ");
          this.classificationApplicabilityObject = {
            country: null,
            jurisdiction: 'ALL',
            subsidiary: 'ALL',
            location: 'ALL',
            department: 'ALL',
            class: 'ALL'
          }
        }

        this.apiService.post(`payroll/setup/contract`, { ...refinedData, ...this.classificationApplicabilityObject }, 'contract').subscribe({
          next: (res: any) => {
            if (res) {
              this.sharedService.handleSuccessModel({ id: res?._id });
            }
          },
          error: (error: any) => {

            this.isProcessing = false;


          }
        }
        );
      }

    }
  }


  remove(index, event) {

    if (event == 'resignation') {
      this.entitlementStatusResignation = true
      this.removeItem(index, 'resignation');
    }
    else if (event == 'termination') {
      this.entitlementStatusTermination = true
      this.removeItem(index, 'termination');
    }
  }



  removeItem(index: number, event) {
    let itemsArray
    if (event == 'resignation') {
      itemsArray = this.contractMasterForm.get('resignation') as FormArray;
    }
    else if (event == 'termination') {
      itemsArray = this.contractMasterForm.get('termination') as FormArray;
    }
    const requiredItem = itemsArray.at(index)?.value;
    if (requiredItem?.id != null) {
      if (event == 'resignation') {
        this.deletedItemIdsResignation.push(requiredItem.id);
      }
      if (event == 'termination') {
        this.deletedItemsIdsTermination.push(requiredItem.id);
      }
    }
    if (itemsArray.length != 1) {
      itemsArray.removeAt(index);
    }
    else {
      itemsArray.clear()
      itemsArray.push(this.createEntitlementForm());
      itemsArray.at(0).get('minimumYear').patchValue(0);

    }
  }


  checkValidation(objects): boolean {
    for (let i = 1; i < objects.length; i++) {
      const prevRange = objects[i - 1];
      const currentRange = objects[i];

      if (currentRange.minimumYear != parseInt(prevRange.maximumYear) || currentRange.maximumYear <= parseInt(currentRange.minimumYear)) {
        return false;
      }
    }
    return true;
  }




  isAnyKeyWithData(keys, dataObject) {
    for (const key of keys) {
      if (dataObject[key] && dataObject[key].length > 0) {
        return true; // Data is present in at least one key
      }
    }

    return false; // No data found in any of the specified keys
  }

  isObjectEmpty(obj: any): boolean {
    for (const key in obj) {
      if (
        obj[key] !== undefined &&
        obj[key] !== null &&
        obj[key] !== '' &&
        !(Array.isArray(obj[key]) && obj[key].length === 0)
      ) {
        return false;
      }
    }
    return true;
  }

  toggleOnChange(event) {
    console.log(event, 'log event ');
    if (event) {
      this.formData.labels[10].hide = false;
      this.formData.labels[11].hide = false;
    }
    else {
      this.contractMasterForm.patchValue({
        "gratuityComponent": "",
        "number": ""
      })

      this.formData.labels[10].hide = true;
      this.formData.labels[11].hide = true;
    }
  }

}
