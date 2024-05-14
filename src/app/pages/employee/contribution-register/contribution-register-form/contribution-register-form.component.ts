import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { format } from 'date-fns';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { contributionRegisterFormData, formSections } from '../contribution-register.data';


@Component({
  selector: 'app-contribution-register-form',
  templateUrl: './contribution-register-form.component.html',
  styleUrls: ['./contribution-register-form.component.scss']
})

export class ContributionRegisterFormComponent implements OnInit {
  theme: string = this.sharedService.getTheme();
  formSections: any = formSections;
  registerFormData: any = contributionRegisterFormData;
  registerForm: FormGroup;
  col: any = 4;
  empSelected: any = {};
  isProcessing: boolean = false;
  private routeSub: Subscription | undefined;
  id: any;
  isLoading: boolean = false;
  private modalRef: NgbModalRef;
  contributionType: any = [{ id: '1', "name": "GOSI" }];
  submit: boolean = false;
  salaryDetails: any;
  components: any;
  minEffectiveDate: Date;
  contributionTypeList: any = [];
  contributionTypeName: any = '';
  patchData: any;
  empImage: any;


  constructor(private modalService: NgbModal, private dynamicFormService: DynamicFormService, private apiService: ApiService, private cdRef: ChangeDetectorRef, private _location: Location, private route: ActivatedRoute, public sharedService: SharedService, private router: Router) { }

  getSubscriptionSalary(event) {
    this.registerFormData.labels[3].hide = false;
    this.registerFormData.labels[4].hide = false;
    this.registerFormData.labels[5].hide = false;

    this.contributionTypeName = event['name'];

    this.registerForm.patchValue({
      "subscriptionSalary": event.contributionSalary
    });
  }

  onCancel() {
    this._location.back();
  }

  onSubmit() {
    this.submit = true;
    this.isProcessing = true;

    if (this.registerForm.invalid) {
      // this.submit = false;
      this.isProcessing = false;
      this.cdRef.detectChanges();

    }
    else {


      this.registerForm.patchValue({
        "employeeId": this.empSelected.id
      })
      let data = this.registerForm.value;
      data['createdBy'] = 1
      if (this.id && this.router.url.split('/').includes('create')) {

        this.apiService.post(`core-hr/employee/contribution-register`, data).subscribe({
          next: (res: any) => {
            if (res) {

              this.isProcessing = false;
              this.cdRef.detectChanges();
              this.sharedService.handleSuccessModel({ id: res._id });
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


        this.apiService.put(`core-hr/employee/contribution-register/${this.id}`, data, 'contribution-register').subscribe({
          next: (res: any) => {
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
          error: (error: any) => {
            this.isProcessing = false;
            this.cdRef.detectChanges();


          }
        });
      }
    }

  }

  ngOnInit(): void {
    // this.isLoading = true;
    this.routeSub = this.route.params.subscribe(params => {


      this.id = params['id'];
    });
    this.isLoading = true;
    if (this.id && this.router.url.split('/').includes('create')) {
      this.registerFormData.labels[3].hide = true;
      this.registerFormData.labels[4].hide = true;
      this.registerFormData.labels[5].hide = true;
      this.registerFormData.labels[6].hide = true;
      this.apiService.get(`core-hr/employee/${this.id}`, 'contributionRegister').subscribe({
        next: (res: any) => {
          if (res) {

            this.empImage=res?.data.image


            this.empSelected = {
              employeeId: res?.data?.employeeId,
              id: res?.data?.id,
              firstName: res?.data?.firstName,
              lastName: res?.data?.lastName,
              empImage:res?.data?.image
            };

            this.contributionTypeList = res?.data?.contributionRules;
            this.registerForm.patchValue({
              "effectiveDate": res?.data?.payPeriodStartDate,
              "isRegistered": true
            });
            this.minEffectiveDate = new Date(res?.data?.payPeriodStartDate);
            this.components = res?.data?.contributionRules;
            this.salaryDetails = res?.data?.salaryDetails;




            if (this.empSelected) {
              this.isLoading = false;
            }
            this.cdRef.detectChanges();
          }
        }, error: (error: any) => {
          this.isLoading = false;
          this.cdRef.detectChanges();

          console.error(error);

        }
      });
    }


    if (this.id && this.router.url.split('/').includes('edit')) {

      this.apiService.get(`core-hr/employee/contribution-register/${this.id}`).subscribe({
        next: (res: any) => {
          if (res) {
            this.registerFormData.labels[3].hide = false;
            this.registerFormData.labels[4].hide = false;
            this.registerFormData.labels[5].hide = false;
            this.registerFormData.labels[6].hide = false;




            this.patchData = res.data;
            this.contributionTypeName = this.patchData?.contributionType?.name;


            this.registerForm.patchValue(res.data);
            this.registerForm.patchValue({
              "effectiveDate": format(new Date(res.data.effectiveDate), 'yyyy/MM/dd'),
              "contributionTypeId": res.data.contributionType.id
            });
            this.contributionTypeList = res?.data?.employee?.contributionRules;




            this.empSelected = {
              employeeId: res.data.employee.employeeId,
              firstName: res.data.employee.firstName,
              lastName: res.data.employee.lastName
            }

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
    this.registerForm = this.dynamicFormService.createControl(this.registerFormData);

  }
}
