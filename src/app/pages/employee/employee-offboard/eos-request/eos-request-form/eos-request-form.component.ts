import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute,Router  } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { S3UploadService } from 'src/app/shared/services/s3-upload.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { employeeFilterMeta, eosRequestFormMeta, formSections, supervisorFilterMeta } from '../eos-request.data';

@Component({
  selector: 'app-eos-request-form',
  templateUrl: './eos-request-form.component.html',
  styleUrls: ['./eos-request-form.component.scss']
})

export class EosRequestFormComponent implements OnInit {

  constructor(private router: Router,public sharedService: SharedService, private dynamicFormService: DynamicFormService, private s3service: S3UploadService, private route: ActivatedRoute, public apiService: ApiService, private modalService: NgbModal, private cdRef: ChangeDetectorRef) { }

  submit: boolean = false;
  isProcessing: boolean = false;
  isLoading: boolean = false;
  formSections: Sections = formSections;
  eosRequestForm: FormGroup;
  formData: any;
  supervisorData:any
  employeeFilterMeta: any = employeeFilterMeta
  supervisorFilterMeta:any=supervisorFilterMeta
  detectedError: boolean = false;
  empSelected:any
  id;
  eosRequestData:any
  minEffectiveDate: Date;



  ngOnInit() {
    this.formData = eosRequestFormMeta;
    this.eosRequestForm = this.dynamicFormService.createControl(this.formData);
    const routeSub = this.route.params.subscribe(params => {
      // Access route parameters here
      this.id = params['id'];
    });
    if (this.id) {
      this.getEosRequestData();
    }
  }


  getEosRequestData(){
    this.isLoading = true;
    this.apiService.get(`core-hr/employee/eos-request/${this.id}`).subscribe({
      next: (res: any) => {
        if (res) {


          this.eosRequestData = res?.data;
          if(res?.data?.status?.name=='Approved'){
            console.log("route");            
            this.router.navigate([`/employee-hub/offboard/eos-request/view/${this.id}`]);
          }
          this.eosRequestForm.patchValue(res?.data)
          this.eosRequestForm.patchValue({
            "employeeId": res?.data?.employee?.id,
            "subTypeId":res?.data?.subType?.id,
            "type":res?.data?.type?.id,
            "status":res?.data?.status?.id
          });

          this.empSelected=res?.data?.employee
          this.supervisorData=res?.data?.employee?.supervisor


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
     this.supervisorData=event.supervisor
     this.minEffectiveDate = new Date(event?.payPeriodStartDate);

  }
  else{
    this.supervisorData=null
    this.minEffectiveDate = null;
  }
  }











  onSubmit() {

    this.submit = true;
    if (this.eosRequestForm.invalid) {


      return '';
    }
    else {

      this.isProcessing = true;

      if (this.id) {
        this.apiService.put(`core-hr/employee/eos-request/${this.id}`, this.eosRequestForm.value, 'eos-request').subscribe({
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
        this.apiService.post(`core-hr/employee/eos-request`, this.eosRequestForm.value, 'eos-request').subscribe({
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

      this.eosRequestForm.patchValue({
        "attachment": imageKey
      })
    })
      .catch((error: any) => {
        console.error('Error patching image key:', error);
      });

  }















}
