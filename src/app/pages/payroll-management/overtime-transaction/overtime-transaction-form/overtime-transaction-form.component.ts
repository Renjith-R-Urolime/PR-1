import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { format, parseISO } from 'date-fns';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { employeeFilterMeta, formSections, overtimeFormData } from '../overtime-transaction.data';

@Component({
  selector: 'app-overtime-transaction-form',
  templateUrl: './overtime-transaction-form.component.html',
  styleUrls: ['./overtime-transaction-form.component.scss']
})
export class OvertimeTransactionFormComponent implements OnInit {
  employeeFilterMeta: any = employeeFilterMeta;
  theme: string = this.sharedService.getTheme();
  formSections: any = formSections;
  overtimeFormData: any = overtimeFormData;
  overtimeForm: FormGroup;
  col: any = 4;
  id;
  isLoading: boolean = false;
  empSelected: any = {};
  private routeSub: Subscription | undefined;
  isProcessing: boolean = false;
  private modalRef: NgbModalRef;
  submit = false;
  patchData: any;
  minDate: Date;

  constructor(private modalService: NgbModal, private dynamicFormService: DynamicFormService, private apiService: ApiService, private cdRef: ChangeDetectorRef, private _location: Location, private route: ActivatedRoute, private sharedService: SharedService, private router: Router) {
  }

  onCancel() {
    this._location.back();
  }

  onSubmit() {
    this.isProcessing = true;
    if (this.overtimeForm.invalid) {
      this.isProcessing = false;
      return;
    }
    else {
      this.submit = true;

      //
      // this.overtimeForm.value['overtimeHour'] = Number(this.overtimeForm.value['overtimeHour']);

      let data = this.overtimeForm.value;


      data['createdBy'] = 1
      if (!this.id) {

        this.apiService.post(`payroll/overtime`, data).subscribe({
          next: (res: any) => {
            if (res) {

              this.isProcessing = false;
              this.cdRef.detectChanges();
              this.sharedService.handleSuccessModel({ id: res._id });
              //   this._location.back();
            }
          },
          error: (error: any) => {
            this.cdRef.detectChanges();
            this.isProcessing = false;


          }
        }
        );
      }
      else {

        this.overtimeForm.value['days'] = Number(this.overtimeForm?.value['days']?.id)


        this.apiService.put(`payroll/overtime/${this.id}`, data).subscribe({
          next: (res: any) => {
            if (res) {

              this.isProcessing = false;
              this.cdRef.detectChanges();
              this.sharedService.handleSuccessModel({ id: this.id });
              // this._location.back();
            }
            else {
              this.isProcessing = false;
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

  onEmployeeChange(event) {

    this.overtimeForm.patchValue({
      "date": null
    });
    this.minDate = event?.payrollOnboardDate;
  }

  onComponentChange(event) {

  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    if (this.id) {
      this.overtimeFormData.labels[8].hide = false;
      this.isLoading = true;

      this.apiService.get(`payroll/overtime/${this.id}`).subscribe({
        next: (res: any) => {
          if (res) {

            this.patchData = res?.data;

            //this.editData = res.data;
            this.overtimeForm.patchValue(res.data);
            this.overtimeForm.patchValue({
              "employeeId": res?.data?.employee?.id,
              "date": format(parseISO(res.data.date), 'yyyy/MM/dd')
            });
            this.minDate = res?.data?.employee?.payrollOnboardDate;
            this.empSelected = {
              employeeId: res?.data?.employee?.employeeId,
              firstName: res?.data?.employee?.firstName,
              lastName: res?.data?.employee?.lastName
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
    this.overtimeForm = this.dynamicFormService.createControl(this.overtimeFormData);


    this.overtimeForm.valueChanges.subscribe(
      (value) => {
        if (this.overtimeForm.value["overtimeHour"] && this.overtimeForm.value["overtimeRate"]) {


          const [hours, minutes] = this.overtimeForm.value['overtimeHour'].split(':').map(Number);
          let otHours = hours + minutes / 60;
          let otRate = this.overtimeForm.value['overtimeRate'];
          if (otHours && otRate) {

            this.overtimeForm.patchValue({
              "overtimeAmount": (otHours * otRate).toFixed(3)
            }, { emitEvent: false });
            this.cdRef.detectChanges();
          }

        }
      }
    );

  }
}