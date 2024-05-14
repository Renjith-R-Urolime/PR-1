import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { S3UploadService } from 'src/app/shared/services/s3-upload.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { employeeExitFormMeta, employeeFilterMeta, formSections, supervisorFilterMeta } from '../employee-exit.data';

@Component({
  selector: 'app-employee-exit-form',
  templateUrl: './employee-exit-form.component.html',
  styleUrls: ['./employee-exit-form.component.scss']
})
export class EmployeeExitFormComponent {
  constructor(public sharedService: SharedService, private dynamicFormService: DynamicFormService, private s3service: S3UploadService, private route: ActivatedRoute, public apiService: ApiService, private modalService: NgbModal, private cdRef: ChangeDetectorRef) { }

  submit: boolean = false;
  isProcessing: boolean = false;
  isLoading: boolean = false;
  formSections: Sections = formSections;
  employeeExitForm: FormGroup;
  formData: any;
  supervisorId:any
  employeeFilterMeta: any = employeeFilterMeta
  supervisorFilterMeta:any=supervisorFilterMeta
  detectedError: boolean = false;
  empSelected:any

  id;
  employeeExitData:any



  ngOnInit() {
    this.formData = employeeExitFormMeta;
    this.employeeExitForm = this.dynamicFormService.createControl(this.formData);
    const routeSub = this.route.params.subscribe(params => {
      // Access route parameters here
      this.id = params['id'];
    });
    if (this.id) {
      this.getEmployeeExitData();
    }
  }


  getEmployeeExitData(){
    this.isLoading = true;
    this.apiService.get(`core-hr/employee/eos-request/${this.id}`).subscribe({
      next: (res: any) => {
        if (res) {


          this.employeeExitData = res?.data;
          this.employeeExitForm.patchValue(res?.data)
          this.employeeExitForm.patchValue({
            "employeeId": res?.data?.employee?.id,
            "subTypeId":res?.data?.subType?.id,
            "type":res?.data?.type?.id,
            "supervisor":res?.data?.employee?.supervisor?.id
          });
          this.empSelected=res?.data?.employee

          this.isLoading = false;
          this.cdRef.detectChanges();
        }
      }, error: (error: any) => {
        this.detectedError = true;

        console.error(error);
      }


    });
  }



  onEmployeeChange(event){
  if(event?.id){
    this.supervisorId=event?.id
  }
  }











  onSubmit() {

    this.submit = true;
    if (this.employeeExitForm.invalid) {


      return '';
    }
    else {

      this.isProcessing = true;

      if (this.id) {
        this.apiService.put(`core-hr/employee/eos-request/${this.id}`, this.employeeExitForm.value, 'eos-request').subscribe({
          next: (res: any) => {
            if (res) {
              this.sharedService.handleSuccessModel({ id: this.id });
            }
          },
          error: (error: any) => {
          }
        }
        );

      }
      else {
        this.apiService.post(`core-hr/employee/eos-request`, this.employeeExitForm.value, 'eos-request').subscribe({
          next: (res: any) => {
            if (res) {
              this.sharedService.handleSuccessModel({ id: res?._id });
            }
          },
          error: (error: any) => {
          }
        }
        );
      }

    }
  }
  onFileSelect(event) {
    const file = event.target.files[0];
    this.s3service.uploadFile(file).then((imageKey: string) => {

      this.employeeExitForm.patchValue({
        "attachment": imageKey
      })
    })
      .catch((error: any) => {
        console.error('Error patching image key:', error);
      });

  }



}
