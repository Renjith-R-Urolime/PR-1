import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { componentMappingFormData, formSections } from '../component-mapping-data';

@Component({
  selector: 'app-component-mapping-form',
  templateUrl: './component-mapping-form.component.html',
  styleUrls: ['./component-mapping-form.component.scss']
})
export class ComponentMappingFormComponent implements OnInit {
  componentMappingForm: FormGroup;
  formData;
  detectedError: boolean;
  formSections: Sections = formSections;
  isProcessing: boolean = false;
  submit: boolean = false;
  theme: string = this.sharedService.getTheme();
  col = 4;
  earningFetchCondition = [];
  deductionFetchCondition = [];
  private unsubscribe: Subscription[] = [];
  id: any;
  private modalRef: NgbModalRef;
  isLoading: boolean = false;
  componentMappingData:any=[];

  constructor(private cdRef: ChangeDetectorRef, private dynamicFormService: DynamicFormService,
    public sharedService: SharedService,
    public validErrors: SharedService,

    private router: Router, private _location: Location, private route: ActivatedRoute, private apiService: ApiService, private modalService: NgbModal) { }

  ngOnInit() {
    this.formData = componentMappingFormData;

    this.formData.labels[1].hide = false;
    this.componentMappingForm = this.dynamicFormService.createControl(this.formData)

    const routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.unsubscribe.push(routeSub);
    if (this.id) {
      this.isLoading = true;
      this.apiService.get(`payroll/settings/transaction-component-mapping/${this.id}`).subscribe({
        next: (res: any) => {
          if (res) {

            this.componentMappingData = res.data;
            this.componentMappingForm.patchValue(res.data);
            this.componentMappingForm.patchValue({
              "earningComponentId":res?.data?.earningComponent,
              "deductionComponentId":res?.data?.deductionComponent
            })
            this.formData.labels[1].hide = res?.data?.transactionType?.id === '7' || res?.data?.transactionType?.id === '8' ? true : false;
            this.earningFetchCondition =res?.data?.transactionType?.id === '7' || res?.data?.transactionType?.id === '8' ? [] :  ["type=2", "subType=4", "payrollItem=1"];;
            this.deductionFetchCondition = res?.data?.transactionType?.id === '7' || res?.data?.transactionType?.id === '8' ? ["type=2", "subType=5", "payrollItem=2"] :  ["type=2", "subType=4", "payrollItem=2"];
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
    else{
      this.earningFetchCondition =  ["type=2", "subType=4", "payrollItem=1"];
      this.deductionFetchCondition = ["type=2", "subType=4", "payrollItem=2"];
    }

  }

  onSubmit() {
    this.sharedService.updateSubmitState(true);

    this.isProcessing = true;
    this.submit = true;
    if (this.componentMappingForm.invalid) {

      this.isProcessing = false;
      return;
    }
    else {
      this.submit = false;
      let data = this.componentMappingForm.value;
      data.createdBy = 1
      if (this.id) {
        data = this.dynamicFormService.getUpdatedData(this.componentMappingForm)
        this.apiService.put(`payroll/settings/transaction-component-mapping/${this.id}`, data).subscribe({
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
        this.apiService.post(`payroll/settings/transaction-component-mapping`, data).subscribe({
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


  onCancel() {
    this._location.back();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  onTransactionChange(event){

    if(event?.id === '7' || event?.id === '8'){
      this.formData.labels[1].hide = true;
      this.componentMappingForm.patchValue({
        "earningComponentId":'null'
      })

      this.earningFetchCondition = [];
      this.deductionFetchCondition =  ["type=2", "subType=5", "payrollItem=2"];
    }
    else{
      this.formData.labels[1].hide = false;
      this.earningFetchCondition = ["type=2", "subType=4", "payrollItem=1"];
      this.deductionFetchCondition =  ["type=2", "subType=4", "payrollItem=2"];
    }
  }
}
