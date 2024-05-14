import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { formSections, payStructureFormData, tableFormData } from '../pay-structure-data';

@Component({
  selector: 'app-pay-structure-form',
  templateUrl: './pay-structure-form.component.html',
  styleUrls: ['./pay-structure-form.component.scss']
})
export class PayStructureFormComponent implements OnInit {
  tempData: any;
  drawerTempData: any;
  @Input() theme: string = this.sharedService.getTheme();
  detectedError: boolean = false;
  isLoading: boolean = true;
  formSections: Sections = formSections
  submit: boolean = false;
  payStructureForm: FormGroup;
  formData: any = payStructureFormData;
  isProcessing: boolean = false;
  gradeLoading: boolean = true;
  payStructureData: any = [];
  tableMeta = tableFormData;
  componentList = [];
  allDesignationList = [];
  deletedRows = [];
  designationList = [];
  formArrayIndex = 0;
  gradeList = [];
  isCheckboxDisabled:boolean=false
  disableDrawer: boolean = false;
  shades: string[] = ['','light', 'bright']
  private modalRef: NgbModalRef;
  patchDataList: any;

  private unsubscribe: Subscription[] = [];
  salaryAllocationList = [
    {
      "id": "1",
      "name": "Fixed Method"
    },
    {
      "id": "2",
      "name": "Percentage Method"
    }
  ];
  formulaList = [
    {
      "id": "1",
      "name": "Of Gross Pay"
    },
    {
      "id": "2",
      "name": "Of Basic Pay"
    }
  ]
  id;
  componentListLoading: boolean = true;
  templateName: string = 'Component Allocation'
  formTemplateRef: TemplateRef<any>;
  constructor(public sharedService: SharedService, public apiService: ApiService, private dynamicFormService: DynamicFormService, private cdRef: ChangeDetectorRef, private route: ActivatedRoute, private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit() {
    const routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.unsubscribe.push(routeSub);
    this.payStructureForm = this.dynamicFormService.createControl(this.formData);
    this.designationList[0] = [];
    if (this.id) {
      this.payStructureForm.addControl('details', this.fb.array([this.createSubForm()]));
    } else {
      this.payStructureForm.addControl('details', this.fb.array([this.createSubForm()]));
    }
    this.getComponentList().then(() => {
      if (this.id) {
        return this.getPayStructureData();
      } else {
        this.isLoading = false;
      }
    });
  }

  getComponentList() {
    // Define two Promises for the API calls
    const componentListPromise = new Promise<void>((resolve, reject) => {
      this.apiService.get(`payroll/setup/component?payrollType=1&payrollSubType=1`, 'dropdown').subscribe({
        next: (res: any) => {
          if (res) {
            this.componentList = res.data;
            this.componentListLoading = false;
            resolve(); // Resolve the Promise when the operation is done
          }
        },
        error: (error: any) => {
          console.error(error);
          reject(error); // Reject the Promise in case of an error
        }
      });
    });

    const gradeListPromise = new Promise<void>((resolve) => {
      this.apiService.get(`core-hr/employee/settings/grade`, 'dropdown').subscribe({
        next: (res: any) => {
          if (res) {
            this.gradeList = res.data;
            this.gradeList.forEach(grade => {
              this.allDesignationList.push(...grade.designation);
            });
            this.gradeLoading = false;
            resolve(); // Resolve the Promise when the operation is done
          }
        },
        error: (error: any) => {
          console.error(error);
          resolve(); // Resolve the Promise even in case of an error to avoid blocking further execution
        }
      });
    });

    // Wait for both promises to resolve
    return Promise.all([componentListPromise, gradeListPromise]);
  }


  getPayStructureData() {
    return new Promise<void>((resolve, reject) => {
      this.isLoading = true;

      this.apiService.get(`core-hr/employee/settings/pay-structure/${this.id}`).subscribe({
        next: (res: any) => {
          if (res) {
            this.processPayStructureData(res);
            resolve();
          }
        },
        error: (error: any) => {
          this.detectedError = true;
          console.error(error);
          reject(error);
        }
      });
    });
  }

  processPayStructureData(res) {
    this.payStructureData = res?.data;

    for (let i = 0; i < res?.data?.details?.length; i++) {
      if(i !== res?.data?.details?.length-1){
        this.addMore();
      }
      if (res?.data?.details[i]?.componentDetails?.length > 0) {
        this.addAllocation(i);
      }
    }

    this.payStructureForm.patchValue(res?.data);
    this.payStructureForm?.get('details')?.patchValue(res?.data?.details);

    for (let i = 0; i < res?.data?.details?.length; i++) {
      this.formFields.at(i).patchValue({
        "gradeId": res?.data?.details[i]?.grade?.id,
        "designationId": (res?.data?.details[i]?.designation?.id).toString(),
        "salaryAllocation": res?.data?.details[i]?.salaryAllocation?.id,
        "viewMode": true
      });

      if (res?.data?.details[i]?.componentDetails?.length > 0) {
        this.updateComponentDetails(i, res);
      }
    }

    this.isLoading = false;
    this.cdRef.detectChanges();
  }

  updateComponentDetails(i, res) {
    this.componentList.forEach((c, index) => {
      let matchComponent = false;
      for (let j = 0; j < res?.data?.details[i]?.componentDetails?.length; j++) {
        if ((c.id)?.toString() === res?.data?.details[i]?.componentDetails[j]?.component?.toString()) {
          matchComponent = true;
          this.componentAllocationData(i).at(index).patchValue({
            "name": c.name,
            "component": c.id,
            "percentage": res?.data?.details[i]?.componentDetails[j].percentage,
            "formula": res?.data?.details[i]?.componentDetails[j].formula
          });
        }
      }
      if (!matchComponent) {
        this.componentAllocationData().at(index).patchValue({
          "name": c.name,
          "component": c.id,
          "percentage": null,
          "formula": null
        });
      }
    });
  }

  onSubmit() {
    this.submit = true;
    if (this.payStructureForm.invalid) {
      return '';
    }
    else {
      this.isProcessing = true;
      if (this.id) {
        const destroyObject = {
          "destroy" : {
              "details" : this.deletedRows
          }
      }
        let reqBody = {...this.payStructureForm.value, ...destroyObject}
        this.apiService.put(`core-hr/employee/settings/pay-structure/${this.id}`, reqBody, 'pay-structure').subscribe({
          next: (res: any) => {
            if (res) {
              this.sharedService.handleSuccessModel({ id: this.id });
            }
          },
          error: (error: any) => {
            this.handleError(error);
          }
        }
        );
      }
      else {
         this.apiService.post(`core-hr/employee/settings/pay-structure`, this.payStructureForm.value, 'pay structure').subscribe({
          next: (res: any) => {
            if (res) {
              this.sharedService.handleSuccessModel({ id: res?._id });
            }
          },
          error: (error: any) => {
            this.handleError(error);
          }
        }
        );
      }

    }
  }
  createSubForm(): FormGroup {
    const formGroup = {};
    tableFormData.labels.forEach((label) => {
      const control = new FormControl();
      formGroup[label.labelName.defaultValue] = control;
    });
    formGroup['viewMode'] = new FormControl(false);
    if(this.id){
      formGroup['id'] = new FormControl();
    }
    formGroup['componentDetails'] = this.fb.array([]);
    return this.fb.group(formGroup);
  }
  createAllocationForm(index?, component?) {
    const subFormArray = this.payStructureForm?.get('details') as FormArray;
    const items = subFormArray?.at(index)?.get('componentDetails') as FormArray;

    let formGroup: any = {};
    const group: any = {
      'name': new FormControl(component?.name),
      'component': new FormControl(component?.id),
      'isBasic':new FormControl(),
      'percentage': new FormControl(),
      'formula': new FormControl('1'),
    };

    formGroup = this.fb.group(group)
    items.push(formGroup);
  }
  get formFields(): FormArray {
    return this.payStructureForm?.get('details') as FormArray;
  }
  addMore() {
    const items = this.payStructureForm?.get('details') as FormArray;
    this.designationList[items.length] = [];
    items.push(this.createSubForm());
  }
  addAllocation(index?) {

    for (var i = 0; i < this.componentList.length; i++) {
      this.createAllocationForm(index ? index : this.formArrayIndex, this.componentList[i]);
    }
  }
  componentAllocationData(index?): FormArray {
    const subFormArray = this.payStructureForm?.get('details') as FormArray;
    return subFormArray?.at(index ? index : this.formArrayIndex)?.get('componentDetails') as FormArray;

  }


  onEdit(index) {

  }
  onDrawerSave(event) {
  }

  checkboxChange(event,i){
    let formArray=this.formFields.at(this.formArrayIndex)?.get('componentDetails') as FormArray


    if(event.target.checked==true){
      this.isCheckboxDisabled=true
      formArray.at(i).patchValue({'isBasic':true,'formula':'1'})
    }
    else if(event.target.checked==false){
      this.isCheckboxDisabled=false
      formArray.at(i).patchValue({'isBasic':false,'formula':null})
    }




  }

  onDrawerCancel(event) {
    this.formFields.at(this.formArrayIndex)?.get('componentDetails')?.patchValue(this.drawerTempData)
  }
  onDrawerClick(index) {
    this.formArrayIndex = index;
    if ((this.formFields.at(this.formArrayIndex).value.salaryAllocation)?.toString() === '1') {
      this.disableDrawer = true;
    }
    else {
      this.disableDrawer = false;
      if (this.componentAllocationData().length === 0) {
        this.addAllocation();
      }
      this.drawerTempData = this.formFields.at(this.formArrayIndex).value.componentDetails
    }
  }
  setMode(val, index, mode?) {
    if (mode === 'delete') {
      if(this.id && this.formFields?.at(index)?.value.id){
        this.deletedRows.push(this.formFields?.at(index)?.value.id)
      }
      this.removeItem(index);
    }
    else {
      if (mode === 'edit') {
        this.tempData = this.formFields.at(index).value;
      }
      else if (mode === 'cancel') {
        if (this.tempData) {
          this.formFields.at(index).patchValue(this.tempData)
        }
      }
      this.formFields.at(index).patchValue({
        "viewMode": val
      })
    }
  }
  removeItem(index: number) {
    const itemsArray = this.payStructureForm?.get('details') as FormArray;
    itemsArray.removeAt(index);
  }
  showData(val, name) {
    let result = '';
    if (name === 'gradeId') {
      const data: any = this.gradeList?.filter(i => (i.id)?.toString() === val?.toString());
      if (data) {
        result = data[0]?.name;
      }
    }
    else if (name === 'designationId') {
      const data: any = this.allDesignationList?.filter(item => (item.id)?.toString() === val?.toString());
      if (data) {
        result = data[0]?.name;
      }
    }
    else if (name === 'salaryAllocation') {
      const data: any = this.salaryAllocationList?.filter(i => (i.id)?.toString() === val?.toString());
      if (data) {
        result = data[0]?.name;
      }
    }
    else {
      result = val;
    }
    return result;
  }
  ongradeChange(event, index) {
    this.designationList[index] = event?.designation;
    this.formFields.at(index).patchValue({
      "designationId": null
    })
  }


  private handleError(error: any) {
    this.isProcessing = false;
    this.detectedError = true;
    this.cdRef.detectChanges();
    console.error(error);
  }

  checkFilled(i){
    return ((this.payStructureForm?.get('details') as FormArray)?.controls.at(i) as FormGroup).touched && ((this.payStructureForm?.get('details') as FormArray)?.controls?.at(0) as FormGroup).status === 'VALID'
  }
  savePatchDataList(event, type){
    this.patchDataList = { ...this.patchDataList, [type]: event };
  }
  getDesignationList(index){
    let gradeList = this.gradeList?.filter(grade => (grade?.id)?.toString() === (this.formFields?.at(index)?.value?.gradeId)?.toString())
    return gradeList?.length > 0 ? gradeList?.[0]?.designation : []
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
