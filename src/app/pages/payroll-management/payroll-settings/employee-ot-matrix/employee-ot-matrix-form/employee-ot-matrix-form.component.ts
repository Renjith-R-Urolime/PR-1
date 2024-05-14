import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { S3UploadService } from 'src/app/shared/services/s3-upload.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { employeeFilterMeta, employeeOTMatrixFormMeta, formSections } from '../employee-ot-matrix.data';

@Component({
  selector: 'app-employee-ot-matrix-form',
  templateUrl: './employee-ot-matrix-form.component.html',
  styleUrls: ['./employee-ot-matrix-form.component.scss']
})
export class EmployeeOtMatrixFormComponent {

  employeeOtMatrixForm: FormGroup;
  employeeOtMatrixData:any
  employeeFilterMeta:any=employeeFilterMeta
  isProcessing: boolean = false;
  submit: boolean = false;
  theme: string = this.sharedService.getTheme();
  constructor(private router: Router, private modalService: NgbModal, private apiService: ApiService, private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private dynamicFormService: DynamicFormService, public sharedService: SharedService, private _location: Location, private s3service: S3UploadService,private fb: FormBuilder) {
}
isLoading: boolean = false;
formMeta: any = employeeOTMatrixFormMeta;
formSections: Sections = formSections;
showImg: boolean = false;
listLoading = false;
detectedError: boolean;
private routeSub: Subscription | undefined;

@ViewChild('customTemplate') customTemplate: TemplateRef<any>;
id:any;
ngOnInit() {
  this.employeeOtMatrixForm = this.dynamicFormService.createControl(this.formMeta)
  this.routeSub = this.route.params.subscribe(params => {
    this.id = params['id'];
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////
  if (this.id) {
    this.isLoading = true;

    this.apiService.get(`payroll/settings/employee-ot-matrix/${this.id}`).subscribe({
      next: (res: any) => {
        if (res) {

          this.employeeOtMatrixForm.patchValue(res.data)
          this.employeeOtMatrixData = res.data
          this.isLoading = false;
          this.employeeOtMatrixForm.patchValue({
            "employeeId": res?.data?.employee?.id
          });

          this.cdRef.detectChanges();
        }
      }, error: (error: any) => {
        this.detectedError = true;
        this.isLoading = false;
        this.cdRef.detectChanges();



      }


    });
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////
}

onSubmit() {
  // --------success popup page--------

  this.isProcessing = true;
  this.submit = true;
  if (this.employeeOtMatrixForm.invalid) {

    this.isProcessing = false;
    return;
  }
  else {
    this.submit = false;
    let data = this.employeeOtMatrixForm.value;
    if (!this.id) {

      this.apiService.post(`payroll/settings/employee-ot-matrix `, data, 'employee-ot-matrix').subscribe({
        next: (res: any) => {
          if (res) {

            this.isProcessing = false;
            this.cdRef.detectChanges();
            this.sharedService.handleSuccessModel({ id: res._id });
            //   this._location.back();
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

       let reqBody={...this.employeeOtMatrixForm.value}

      data = this.dynamicFormService.getUpdatedData(this.employeeOtMatrixForm)
      this.apiService.put(`payroll/settings/employee-ot-matrix/${this.id}`, data, 'employee-ot-matrix').subscribe({
        next: (res: any) => {
          if (res) {
            this.isProcessing = false;
            this.cdRef.detectChanges();
            this.sharedService.handleSuccessModel({ id: res._id, btnTemplate: this.customTemplate });          }
          else {
            this.isProcessing = false;
            this.cdRef.detectChanges();
          }
        },
        error: (error: any) => {
          this.detectedError = true;
          this.isProcessing = false;
          this.cdRef.detectChanges();


        }
      });
    }
  }

}


goToCreateEmployeeOtMatrix(){
  this.router.navigate(['payroll-management/settings/employee-ot-matrix/create']);
  this.sharedService.onModalClose();
}

listAll() {
  this.router.navigate(['payroll-management/settings/employee-ot-matrix']);
  this.sharedService.onModalClose();
}







}
