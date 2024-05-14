import { Location } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { differenceInCalendarDays } from 'date-fns';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { formSections, leaveAdjustmentFormData } from '../leave-adjustment.data';

@Component({
  selector: 'app-leave-adjustment-form',
  templateUrl: './leave-adjustment-form.component.html',
  styleUrls: ['./leave-adjustment-form.component.scss']
})
export class LeaveAdjustmentFormComponent {
  theme: string = this.sharedService.getTheme();
  formSections: any = formSections;
  leaveAdjustmentFormData: any = leaveAdjustmentFormData;
  leaveAdjustmentForm: FormGroup;
  col: any = 4;
  id;
  isLoading: boolean = false;
  empSelected: any = {};
  private routeSub: Subscription | undefined;
  isProcessing: boolean = false;
  private modalRef: NgbModalRef;
  submit = false;
  patchData: any;
  selectedTransactionType: any;
  leavePlanType = [];
  showHourly: boolean = false;
  transactionUnitCondition = ['id!=3'];
  payrollOnboardDate: Date;
  lockTransaction:boolean = false;
  constructor(private modalService: NgbModal, private dynamicFormService: DynamicFormService, private apiService: ApiService, private cdRef: ChangeDetectorRef, private _location: Location, private  route: ActivatedRoute, public sharedService: SharedService, private router: Router) { }


  onCancel() {
    this._location.back();
  }

  onSubmit() {
    this.isProcessing = true;
    this.submit = true;
    if (this.leaveAdjustmentForm.invalid) {
      this.isProcessing = false;
      return;
    }
    else {
      let data = this.leaveAdjustmentForm.value;
      if (!this.id) {
        //   this.leaveAdjustmentForm.value['leaveAdjustmentHour'] = this.leaveAdjustmentForm.value['leaveAdjustmentHour'] + ":00:00"
        //this.leaveAdjustmentForm.value['leaveAdjustmentHour'] = "00:00:00"

        this.apiService.post(`leave/adjustment`, data).subscribe({
          next: (res: any) => {
            if (res) {

              this.isProcessing = false;
              this.submit = false;
              this.sharedService.handleSuccessModel({ id: res._id });
              this.cdRef.detectChanges();
            }
          },
          error: (error: any) => {
            this.submit = false
            this.isProcessing = false;
            this.cdRef.detectChanges();


          }
        }
        );
      }
      else {
        const reqBody = this.dynamicFormService.getUpdatedData(this.leaveAdjustmentForm)
        this.apiService.put(`leave/adjustment/${this.id}`, reqBody).subscribe({
          next: (res: any) => {
            if (res) {

              this.isProcessing = false;
              this.submit = false;
              this.sharedService.handleSuccessModel({ id: this.id });
              this.cdRef.detectChanges();
            }
            else {
              this.isProcessing = false;
              this.submit = false;
              this.cdRef.detectChanges();
            }
          },
          error: (error: any) => {
            this.isProcessing = false;
            this.cdRef.detectChanges();


          }
        });
      }
    }

  }

  fetchLeaveConfig(event) {
    this.payrollOnboardDate = event?.payrollOnboardDate;
    this.leavePlanType = [];
    if (event?.employeeLeavePlan && event?.employeeLeavePlan.length > 0) {
      this.leavePlanType = event?.employeeLeavePlan?.map((plan) => plan.leaveType) ;
    }
    this.cdRef.detectChanges();
  }

  calculateDays(event) {
    if (this.leaveAdjustmentForm.get('startDate').value && this.leaveAdjustmentForm.get('endDate').value) {

    }
    let eDate = new Date(this.leaveAdjustmentForm.get('endDate').value);
    let sDate = new Date(this.leaveAdjustmentForm.get('startDate').value);

    this.leaveAdjustmentForm.patchValue({
      "days": differenceInCalendarDays(eDate, sDate) + 1
    })

  }
  onLeaveTypeChange(event){
    if(event?.leaveRule?.allowHourly){
      this.showHourly = true;
      this.transactionUnitCondition = [];
     // this.leaveAdjustmentFormData.labels[5].hide = false;
    }
    else{
      this.showHourly = false;
      this.transactionUnitCondition = ['id!=3'];
     // this.leaveAdjustmentFormData.labels[5].hide = true;
    }
    this.cdRef.detectChanges();
  }

  onTransactionTypeChange(event) {

    if( event?.id === '5' || event?.id === '3' || event?.id === '2'){
      this.leaveAdjustmentFormData.labels[4].hide = false;
      this.leaveAdjustmentFormData.labels[6].hide = false;
      this.leaveAdjustmentFormData.labels[7].hide = false;
      this.leaveAdjustmentFormData.labels[9].hide = false;
      this.leaveAdjustmentFormData.labels[10].hide = false;

      /* if(this.showHourly){
        this.transactionUnitCondition = [];
        this.leaveAdjustmentFormData.labels[5].hide = false;
      }
      else{
        this.transactionUnitCondition = ['id!=3'];
        this.leaveAdjustmentFormData.labels[5].hide = true;
      } */

    }else{
      this.leaveAdjustmentFormData.labels[4].hide = true;
      this.leaveAdjustmentFormData.labels[6].hide = true;
      this.leaveAdjustmentFormData.labels[7].hide = true;
      this.leaveAdjustmentFormData.labels[9].hide = true;
      this.leaveAdjustmentFormData.labels[10].hide = true;
    }
    this.leaveAdjustmentFormData.labels[8].labelName.alias = event?.name ? event?.name + 'Days' : 'Days' ;
    this.cdRef.detectChanges();
  }


  ngOnInit(): void {
    this.leaveAdjustmentFormData.labels[4].hide = true;
    this.leaveAdjustmentFormData.labels[5].hide = true;
    this.leaveAdjustmentFormData.labels[6].hide = true;
    this.leaveAdjustmentFormData.labels[7].hide = true;
    this.leaveAdjustmentFormData.labels[9].hide = true;
    this.leaveAdjustmentFormData.labels[10].hide = true;
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.leaveAdjustmentForm = this.dynamicFormService.createControl(leaveAdjustmentFormData);

    if (this.id) {
      this.isLoading = true;

      this.apiService.get(`leave/adjustment/${this.id}`).subscribe({
        next: (res: any) => {
          if (res) {
            this.patchData = res.data;
            if(res?.data?.attendanceID || res?.data?.leaveID){
              this.lockTransaction = true;
            }
            this.leavePlanType = res?.data?.employee?.employeeLeavePlan?.map(plan => plan.leaveType) ?? [];
            this.leaveAdjustmentForm.patchValue(res.data);
            this.leaveAdjustmentForm.patchValue({
              "employeeId":res?.data?.employee?.id,
              // "leaveType":res?.data?.lea?.id
            })
            if( res?.data?.transactionType?.id === '5' || res?.data?.transactionType?.id === '3' || res?.data?.transactionType?.id === '2'){
              this.leaveAdjustmentFormData.labels[4].hide = false;
              this.leaveAdjustmentFormData.labels[6].hide = false;
              this.leaveAdjustmentFormData.labels[7].hide = false;
              this.leaveAdjustmentFormData.labels[9].hide = false;
              this.leaveAdjustmentFormData.labels[10].hide = false;
            }
            if(res?.data?.transactionUnit?.id === 3){
              this.leaveAdjustmentFormData.labels[5].hide = false;
            }
            else{
              this.leaveAdjustmentFormData.labels[5].hide = true;
            }
            this.isLoading = false;
            this.cdRef.detectChanges();
          }
        }, error: (error: any) => {
          this.isLoading = false;
          this.cdRef.detectChanges();
        }
      });
    }

  }
  onTransactionUnitChange(event){
    if(event?.id === 3){
      this.leaveAdjustmentFormData.labels[5].hide = false;
    }
    else{
      this.leaveAdjustmentFormData.labels[5].hide = true;
    }
  }
}
