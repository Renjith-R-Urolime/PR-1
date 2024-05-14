import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { format } from 'date-fns';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { JsonListService } from 'src/app/shared/services/json-list/json-list.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { formSections, leaveResuptionFormData } from '../leave-resumption.data';

@Component({
  selector: 'app-leave-resumption-form',
  templateUrl: './leave-resumption-form.component.html',
  styleUrls: ['./leave-resumption-form.component.scss']
})
export class LeaveResumptionFormComponent implements OnInit {
  theme: string = this.sharedService.getTheme();
  formSections: any = formSections;
  leaveResumptionFormData: any = leaveResuptionFormData;
  leaveResumptionForm: FormGroup;
  col: any = 4;
  id;
  isLoading: boolean = false;
  empSelected: any = {};
  private routeSub: Subscription | undefined;
  isProcessing: boolean = false;
  private modalRef: NgbModalRef;
  submit = false;
  patchData: any;
  leavePlanType = [];
  formTemplate: TemplateRef<any>;
  headerText: string;
  employeeList: any = [];
  resumeTypeList: any = [];
  leaveTypeList: any = [];
  employeeIdSelected: any;
  resumeDateMin: Date = new Date();
  actualRejoiningDate: Date;

  constructor(private modalService: NgbModal, private jsonListService: JsonListService, private dynamicFormService: DynamicFormService, private apiService: ApiService, private cdRef: ChangeDetectorRef, private _location: Location, private route: ActivatedRoute, public sharedService: SharedService, private router: Router) { }

  onLeaveTypeChange(event) {

    this.apiService.get(`leave/application?employee=${this.employeeIdSelected ? this.employeeIdSelected : ''}&leaveTypeId=${event?.id ? event.id : ''}`).subscribe({
      next: (res: any) => {
        if (res) {




          if (res?.data[0]?.rejoiningDate) {
            this.actualRejoiningDate = new Date(res?.data[0]?.rejoiningDate);
          }
          if (res?.data[0]?.startDate) {
            this.resumeDateMin = new Date(res?.data[0]?.startDate);
            this.cdRef.detectChanges();
          }
          this.leaveResumptionForm.patchValue({
            "leaveStartDate": format(new Date(res?.data[0]?.startDate), 'yyy/MM/dd'),
            "leaveEndDate": format(new Date(res?.data[0]?.endDate), 'yyyy/MM/dd'),
            "leaveDays": res?.data[0]?.leaveDays,
            "resumeDay": format(new Date(res?.data[0]?.rejoiningDate), 'yyyy/MM/dd'),
          });





        }

      }
    })
  }

  onEmployeeChange(event) {

    this.employeeIdSelected = event?.id;

    if (event?.leaveApplication.length > 0) {
      this.leaveTypeList = event?.leaveApplication.map(value => value?.leaveType ? value?.leaveType : '');

      this.leaveTypeList = this.leaveTypeList.filter(value => value !== "")

      this.cdRef.detectChanges();
    }
    this.apiService.get(`leave/application/types/${this.employeeIdSelected}`).subscribe({
      next: (result) => {
        if (result) {

          this.resumeTypeList = result?.['data'];

        }
      }
    });
  }



  onCancel() {
    this._location.back();
  }

  onSubmit() {


    this.submit = true;
    this.isProcessing = true;
    if (this.leaveResumptionForm.invalid) {
      this.isProcessing = false;
      return;
    }
    else {
      let data = this.leaveResumptionForm.value;


      data['createdBy'] = 1
      if (!this.id) {

        this.apiService.post(`leave/resumption`, data).subscribe({
          next: (res: any) => {
            if (res) {

              this.isProcessing = false;
              this.cdRef.detectChanges();
              this.sharedService.handleSuccessModel({ id: res._id});
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


        this.apiService.put(`leave/resumption/${this.id}`, data).subscribe({
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

  ngOnInit(): void {
    this.apiService.get('core-hr/employee', 'leaveResumption').subscribe({
      next: (res: any) => {

        this.employeeList = res.data.filter(value => value.leaveApplication.length > 0);

      }
    });

    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];

    });

    this.leaveResumptionForm = this.dynamicFormService.createControl(this.leaveResumptionFormData);

    if (this.id) {
      this.isLoading = true;

      this.apiService.get(`leave/resumption/${this.id}`).subscribe({
        next: (res: any) => {
          if (res) {

            //this.editData = res.data;
            this.leaveResumptionForm.patchValue(res.data);
            this.leaveResumptionForm.patchValue({
              "employeeId": res?.data?.employee?.id,
              "resumeDay": format(new Date(res?.data?.resumeDay), 'yyyy/MM/dd'),
              "leaveTypeId":res?.data?.leaveType?.id,
              "resumeTypeId":res?.data?.resumeType?.id
            });
            this.employeeIdSelected=res?.data?.employee?.id;
            this.resumeDateMin = new Date(res?.data?.leaveStartDate)
            this.cdRef.detectChanges();

            // if (event?.employeeLeavePlan.length > 0) {
            //   this.leaveTypeList = event?.employeeLeavePlan.map(value => value?.leaveType ? value?.leaveType : '');
            //
            //   this.leaveTypeList = this.leaveTypeList.filter(value => value !== "")
            //
            //   this.cdRef.detectChanges();
            // }
            if (res?.data?.employee?.employeeLeavePlan?.length > 0) {


              this.leaveTypeList = res?.data?.employee?.employeeLeavePlan.map(value => value?.leaveType ? value?.leaveType : '');

              this.leaveTypeList = this.leaveTypeList.filter(value => value !== "")

              this.cdRef.detectChanges();
            }


            this.apiService.get(`leave/application/types/${res.data.employee.id}`).subscribe({
              next: (result) => {
                if (result) {

                  this.resumeTypeList = result?.['data'];

                  this.cdRef.detectChanges();
                }
              }
            });
            this.patchData = res.data;
            this.isLoading = false;
            this.cdRef.detectChanges();
          }

        }, error: (error: any) => {
          this.isLoading = false;
          this.cdRef.detectChanges();

          console.error(error);

        }
      });
    }
  }
}
