import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { componentFormData, formSections, tagGLAccountFormData } from '../payroll-component-data';

@Component({
  selector: 'app-payroll-component-form',
  templateUrl: './payroll-component-form.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./payroll-component-form.component.scss']
})
export class PayrollComponentFormComponent implements OnInit {
  tagGLAccountFormData: any = tagGLAccountFormData;
  componentForm: FormGroup;
  formData = componentFormData;
  detectedError: boolean;
  formSections: Sections = formSections;
  isProcessing: boolean = false;
  submit: boolean = false;
  theme: string = this.sharedService.getTheme();
  col = 4;
  private unsubscribe: Subscription[] = [];
  // formName: any;
  // formType: string;
  payrollType = [];
  payrollSubType = [];
  itemList = [];
  payrollSubTypeCondition: string[] = ['componentTypeId=0'];
  routeSub: Subscription | undefined;
  id: any;
  listLoading: boolean = true;
  private modalRef: NgbModalRef;
  componentData: any = {};
  isLoading: boolean = false;
  saveAsDraftForm: any = {};
  isTagGLSaved: boolean = false;
  activeTemplateName: string;
  formTemplateRef: TemplateRef<any>;
  onDrawerSaveData: any;
  deletedTagGLAccount:any[]=[];
  showErrorMessage:boolean = false;

  constructor(private cdRef: ChangeDetectorRef, private dynamicFormService: DynamicFormService,
    public sharedService: SharedService,
    public validErrors: SharedService,

    private router: Router, private _location: Location, private route: ActivatedRoute, private apiService: ApiService, private fb: FormBuilder, private modalService: NgbModal) { }


  onDrawerSave(event) {
    console.log(this.componentForm);
    this.isTagGLSaved = true;
  }

  getFormTemplate(template: TemplateRef<any>, name: string) {
    console.log(template, name);

    this.formTemplateRef = template;
    this.activeTemplateName = name;
  }

  onDrawerCancel(event) { }

  get detail(): FormArray {
    return this.componentForm.get('tagAccount') as FormArray;
  }
  createSubForm(): FormGroup {
    const formGroup = {};
    tagGLAccountFormData.labels.forEach((label) => {
      const control = new FormControl();
      formGroup[label.labelName.defaultValue] = control;
    });
    console.log(formGroup);
    return this.fb.group(formGroup);
  }

  addMore() {
    const tagGLForm = this.createSubForm();
    this.detail.push(tagGLForm);
    console.log(this.componentForm);
    console.log(this.detail.controls);
  }

  clearElement(event) {
    console.log(this.componentForm.get('tagAccount').value[event]);

    const removeAccount = this.componentForm.get('tagAccount') as FormArray;
    console.log(removeAccount);
    this.deletedTagGLAccount.push(this.componentForm.get('tagAccount').value[event]);
    console.log("deletedTagGLAccount",this.deletedTagGLAccount);
    removeAccount.removeAt(event)
    

    console.log(this.componentForm);
  }

  ngOnInit() {
    this.componentForm = this.dynamicFormService.createControl(this.formData[0])
    this.componentForm.addControl('tagAccount', this.fb.array([this.createSubForm()]));

    const routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.unsubscribe.push(routeSub);
    // this.apiService.get(`payroll/setup/chart-of-accounts`,'dropdown').subscribe({
    //   next:(res:any)=>{
    //     if (res) {
    //
    //       this.debitAccountList = res.data;
    //       this.creditAccountList = res.data;
    //       this.listLoading = false;
    //       this.cdRef.detectChanges();
    //     }
    //   },error:()=>{
    //     this.detectedError=true;
    //     this.listLoading = false;
    //   }
    // });
    if (this.id) {
      this.isLoading = true;
      this.apiService.get(`payroll/setup/component/${this.id}`).subscribe({
        next: (res: any) => {
          if (res) {
            console.log(res.data["tagAccount"]);

            this.componentData = res.data;
            this.componentForm.patchValue(res.data);
            if (res?.data?.["tagAccount"].length > 0) {
              this.isTagGLSaved = true;
              this.detail.clear();
              for (let i = 0; i < res?.data?.["tagAccount"].length; i++) {
                res.data["tagAccount"][i]['expenseTypeId'] = res.data["tagAccount"][i]['expenseType']?.id
                res.data["tagAccount"][i]['debitAccountId'] = res.data["tagAccount"][i]['debitAccount']?.id
                res.data["tagAccount"][i]['creditAccountId'] = res.data["tagAccount"][i]['creditAccount']?.id
                console.log(res.data["tagAccount"]);
                this.addMore();
              }
              this.detail.patchValue(res?.data?.["tagAccount"]);
              console.log(this.detail);

            }
            // this.componentForm.patchValue({
            //   "debitAccountId":res.data.debitAccount.id,
            //   "creditAccountId":res.data.creditAccount.id
            // })
            this.payrollSubTypeCondition = [`componentTypeId=${typeof res.data.type === 'object' ? res.data.type?.id : res.data.type}`]
            // const subdata:any = this.payrollType.filter(i => i.id === res?.data?.payrollType)
            // if(subdata != null && subdata != '' && subdata != undefined){
            //   this.payrollSubType = subdata[0]?.subType
            // }
            this.isLoading = false;
            this.cdRef.detectChanges();
          }
        }, error: () => {
          this.detectedError = true;
          this.isLoading = false;
          this.cdRef.detectChanges();
        }
      });
    }

  }

  checkIfDisabled(){
    if (this.componentForm?.value?.["tagAccount"]?.[0]?.["creditAccountId"] === null || this.componentForm?.value?.["tagAccount"]?.[0]?.["debitAccountId"] === null || this.componentForm?.value?.["tagAccount"]?.[0]?.["expenseTypeId"] === null) {
      this.showErrorMessage =true;
      return true;
    }
    else{
      this.showErrorMessage =false;
      return false;
    }
  }

  onSubmit() {
    this.sharedService.updateSubmitState(true);

    this.isProcessing = true;
    this.submit = true;
    if (this.componentForm.invalid) {

      this.isProcessing = false;
      return;
    }
    else {
      this.submit = false;
      if (this.componentForm?.value?.["tagAccount"][0]?.["creditAccountId"] === null || this.componentForm?.value?.["tagAccount"][0]?.["debitAccountId"] === null || this.componentForm?.value?.["tagAccount"][0]?.["expenseTypeId"] === null) {
        this.componentForm.removeControl('tagAccount');
      }
      let data = this.componentForm.value;

      if (this.id) {
        const dataToDelete = {
          destroy: {
            tagAccount: this.deletedTagGLAccount,
          }
        }
        data = this.dynamicFormService.getUpdatedData(this.componentForm);
        data= {...dataToDelete}

        console.log(data);
        
        this.apiService.put(`payroll/setup/component/${this.id}`, data).subscribe({
          next: (res: any) => {
            if (res) {

              this.isProcessing = false;
              this.cdRef.detectChanges();
              this.sharedService.handleSuccessModel({ id: this.id });
            }
            else {
              this.isProcessing = false;
            }
          },
          error: (error: any) => {
            this.detectedError = true;

            this.isProcessing = false;

          }
        });
      }
      else {
        this.apiService.post(`payroll/setup/component`, data).subscribe({
          next: (res: any) => {
            if (res) {
              this.isProcessing = false;
              this.cdRef.detectChanges();
              this.sharedService.handleSuccessModel({ id: res._id });
            }
          },
          error: (error: any) => {
            this.detectedError = true;


          }
        }
        );

      }
    }
  }

  onSaveAsDraft() {
    let data: any;
    if (!this.componentForm.invalid) {
      this.saveAsDraftForm = { ...this.componentForm.value };
      this.saveAsDraftForm['isDraft'] = true;
    }
    else {

    }
    if (!this.componentForm.invalid) {
      data = this.saveAsDraftForm;

      data.createdBy = 1
      if (!this.id) {
        this.apiService.post(`payroll/setup/component`, data).subscribe({
          next: (res: any) => {
            if (res) {
              this.isProcessing = false;
              this.cdRef.detectChanges();
              //   this._location.back();

              this.sharedService.handleSuccessModel({ id: res._id });
            }
          },
          error: (error: any) => {
            this.detectedError = true;
            this.isProcessing = false;
            this.cdRef.detectChanges();


          }
        }
        );
      }
    }
  }

  onCancel() {
    this._location.back();
  }
  onTypeChange(event) {
    if (event) {
      this.payrollSubTypeCondition = [`componentTypeId=${event.id}`]
      // this.componentForm.patchValue({
      //   "payrollSubType": null
      // })
    }
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
