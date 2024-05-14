import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, debounceTime } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { S3UploadService } from 'src/app/shared/services/s3-upload.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { cycleFormData, formSections } from '../payroll-cycle-data';

@Component({
  selector: 'app-payroll-cycle-form',
  templateUrl: './payroll-cycle-form.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./payroll-cycle-form.component.scss']
})
export class PayrollCycleFormComponent implements OnInit {
  detectedError: boolean;
  private modalRef: NgbModalRef;
  formName: any;
  payrollCycleForm: FormGroup;
  isProcessing: boolean = false;
  submit: boolean = false;
  theme: string = this.sharedService.getTheme();
  formData: any = cycleFormData;
  formSections: Sections = formSections;
  listLoading = false;
  payrollCycleTypeList:any;
  private routeSub: Subscription | undefined;
  id: any;
  isLoading: boolean = false;
  col = 6;
  date: Date;
  cycleData:any;
  @ViewChild('dp') dp: any;

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer, private modalService: NgbModal, private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private dynamicFormService: DynamicFormService, public sharedService: SharedService, private _location: Location, private s3service: S3UploadService) { }

  getPayrollCycleList(searchValue?) {
    this.listLoading = true;
    this.apiService.get(`payroll/setup/cycle?page=1&limit=5${searchValue ? '&search=' + searchValue : ''}`).subscribe((res: any) => {
      if (res) {
       this.cycleData=res;

        this.listLoading = false;
        this.cdRef.detectChanges();
      }
    });
  }

  // selectFile(event?) {
    // const file = event.target.files[0];
    // this.s3service.uploadFile(file);
  // }

  onCancel() {
    this._location.back();
  }

  onSubmit() {
    // --------success popup page--------


    this.isProcessing = true;
    this.submit = true;
    if (this.payrollCycleForm.invalid) {

      this.isProcessing = false;
      return;
    }
    else {
      this.submit = false;
      let data = this.payrollCycleForm.value;
      data.createdBy = 1
      if (!this.id) {

        this.apiService.post(`payroll/setup/cycle`, data).subscribe({
          next: (res: any) => {
            if (res) {

              this.isProcessing = false;
              this.cdRef.detectChanges();
              this.sharedService.handleSuccessModel({ id: res._id });
            }
          },
          error: (error: any) => {
            this.detectedError = true;
            this.cdRef.detectChanges();

          }
        }
        );
      }
      else {
        data = this.dynamicFormService.getUpdatedData(this.payrollCycleForm)


        this.apiService.put(`payroll/setup/cycle/${this.id}`, data).subscribe({
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

            this.cdRef.detectChanges();

          }
        });
      }
    }

  }


  ngOnInit(): void {
    this.payrollCycleForm = this.dynamicFormService.createControl(this.formData);

    // this.sharedService.getDataList('cycleType').subscribe({
    //   next: (result) => {
    //     this.payrollCycleTypeList = result
    //   },})

    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];


    });

    if (this.id) {
      this.isLoading = true;

      this.apiService.get(`payroll/setup/cycle/${this.id}`).subscribe({

        next: (res: any) => {
          if (res) {

       this.cycleData=res.data;



            this.payrollCycleForm.patchValue(res.data);

          //   let cycleTypeValue =this.payrollCycleTypeList.find((elem) => elem.id === String(res.data.cycleType));
          //  if(cycleTypeValue){
          //   this.payrollCycleForm.patchValue({
          //     "cycleType":cycleTypeValue.name
          //   })
          //  }
          //   else{
          //     this.payrollCycleForm.patchValue({
          //       "cycleType":"No Value Exist"
          //     })
          //   }
            this.isLoading = false;
            this.cdRef.detectChanges();
          }
        }, error: (error: any) => {
          this.detectedError = true;
          this.isLoading = false;
          this.cdRef.detectChanges();



        }
      });
    }

    this.payrollCycleForm.controls.name.valueChanges.pipe(debounceTime(2000)).subscribe(() => {
      if (this.payrollCycleForm.value.name !== '' && this.payrollCycleForm.value.name !== null) {
        if (this.payrollCycleForm.value.displayName === '' || this.payrollCycleForm.value.displayName === null) {
          this.payrollCycleForm.patchValue({
            "displayName": this.payrollCycleForm.value.name
          })
        }
        if (this.payrollCycleForm.value.legalName === '' || this.payrollCycleForm.value.legalName === null) {
          this.payrollCycleForm.patchValue({
            "legalName": this.payrollCycleForm.value.name
          })
        }

      }
    })
  }
}
