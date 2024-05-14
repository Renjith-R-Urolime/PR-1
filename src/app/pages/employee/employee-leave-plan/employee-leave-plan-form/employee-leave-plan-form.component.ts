import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { formSections, leavePlanFormData } from '../employee-leave-plan-data';

@Component({
  selector: 'app-employee-leave-plan-form',
  templateUrl: './employee-leave-plan-form.component.html',
  styleUrls: ['./employee-leave-plan-form.component.scss']
})
export class EmployeeLeavePlanFormComponent implements OnInit {
    employeeLeavePlanForm: FormGroup;
    isProcessing:boolean = false;
    submit:boolean= false;
    theme: string = this.sharedService.getTheme();
    id;
    col = 6;
    leaveTypeList = [];
    isLoading:boolean = false;
    formData:any = leavePlanFormData;
    private routeSub: Subscription | undefined;
    formSections:Sections=formSections;
   detectedError:boolean;
   employeeLeavePlanData:any;

    constructor(
      private router:Router,
      private apiService: ApiService, private route: ActivatedRoute,private cdRef: ChangeDetectorRef,private dynamicFormService: DynamicFormService,public sharedService:SharedService) { }


   ngOnInit() {
      this.employeeLeavePlanForm = this.dynamicFormService.createControl(this.formData)
      //this.employeeLeavePlanForm.addControl('details', this.fb.array([this.createSubForm()]));
      this.routeSub = this.route.params.subscribe(params => {
        // Access route parameters here
        this.id = params['id'];


      });
      if(this.id){
        this.isLoading = true;

        this.apiService.get(`core-hr/employee/settings/employee-leave-plan/${this.id}`).subscribe((res:any) => {
          if(res){

            this.employeeLeavePlanData = res.data;
            this.leaveTypeList = res?.data?.employee?.leavePlan?.leaveTypes;
            this.employeeLeavePlanForm.patchValue(res.data)
            this.employeeLeavePlanForm.patchValue({
              "employeeId":res?.data?.employee?.id,
              "leavePlan":res?.data?.employee?.leavePlan?.name,
              "leaveTypeId":res?.data?.leaveType?.id,
              "accruedUpto": format(new Date(res?.data?.accruedUpto), 'yyyy/MM/dd'),
              "accrualStartDate": format(new Date(res?.data?.accrualStartDate), 'yyyy/MM/dd'),
              "accrualEndDate": format(new Date(res?.data?.accrualEndDate), 'yyyy/MM/dd'),
              "accrualNextDate": format(new Date(res?.data?.accrualNextDate), 'yyyy/MM/dd')
            })
            this.isLoading = false;
            this.cdRef.detectChanges();
          }

        });
      }
    }

    onSubmit(){

      this.isProcessing = true;
      this.submit = true;
      if(this.employeeLeavePlanForm.invalid){

        this.isProcessing = false;
        return;
      }
      else{
        this.submit = false;
        let data = this.employeeLeavePlanForm.value;
        if(!this.id){
          this.apiService.post(`core-hr/employee/settings/employee-leave-plan`,data).subscribe({
            next:(res:any)=>{
             if (res) {

               this.isProcessing = false;
               this.cdRef.detectChanges();
               this.sharedService.handleSuccessModel({ id: res._id });

             }
            },
            error:(error:any)=>{
              this.detectedError=true;
              this.isProcessing = false;
              this.cdRef.detectChanges();
              console.error(error);
            }
           }
          );
        }
        else{
        data = this.dynamicFormService.getUpdatedData(this.employeeLeavePlanForm)

            this.apiService.put(`core-hr/employee/settings/employee-leave-plan/${this.id}`,data).subscribe({
              next:(res:any)=>{
                if (res) {

                  this.isProcessing = false;
                  this.cdRef.detectChanges();
                  this.sharedService.handleSuccessModel({ id: this.id });

                }
                else {
                  this.isProcessing = false;
                  this.cdRef.detectChanges();
                }
              },
              error:(error:any)=>{
                this.detectedError=true;
                this.isProcessing = false;
                this.cdRef.detectChanges();
                console.error(error);
              }
            });
        }
      }
    }

    onEmployeeChange(event){

      if(event){
        this.employeeLeavePlanForm.patchValue({
          "leavePlan":event?.leavePlan?.name,
        })
        this.leaveTypeList = event?.leavePlan?.leaveTypes;
      }
      else{
        this.employeeLeavePlanForm.patchValue({
          "leavePlan":"",
        })
        this.leaveTypeList = [];
      }

    }
}
