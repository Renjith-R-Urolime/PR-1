import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { DataTableListComponent } from 'src/app/shared/ui/data-table-list/data-table-list.component';
import { CardMetaData, employeeSettingFormData, gradeCardMetaData, gradeFormData } from '../employee-settings.data';
@Component({
  selector: 'app-employee-settings-list',
  templateUrl: './employee-settings-list.component.html',
  styleUrls: ['./employee-settings-list.component.scss']
})
export class EmployeeSettingsListComponent implements OnInit {

  theme: string = this.sharedService.getTheme();
  title: string = this.sharedService.getPageName();

  private modalRef: NgbModalRef;
  empRoute: string;
  employeeSettingFormData = employeeSettingFormData;
  empSettingForm: FormGroup;
  empSettingFormData: any;
  submit: boolean = false;
  isProcessing: boolean = false;
  submitBtnText = 'Save';
  detectedError: boolean;
  view: string = 'table';
  id;
  name: string = '';
  // data = {
  //   "name": '',
  //   "inactive": false
  // }
  action;
  subLink = '';
  cardJsonData;
  isLoading: boolean;
  currentId: any;
  designationList = [];
  pathUrl:any;
  private routeSub: Subscription | undefined;
  @ViewChild('dataTable') dataTable: DataTableListComponent;
  @ViewChild('customTemplate') customTemplate: TemplateRef<any>;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private dynamicFormService: DynamicFormService,
    private apiService: ApiService,
    public sharedService: SharedService,
    private route: ActivatedRoute,
    public modal: NgbActiveModal
  ) { }

  changeView(event) {
    this.view = event;
  }
  onResetForm() {
    this.empSettingForm.reset();
  }

  closeModal() {
  this.sharedService.onModalClose();
  }

  refreshPage() {
    window.location.reload();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {

      this.subLink = params['sub'];
    });
    if(this.subLink === 'grade'){
      this.empSettingFormData = gradeFormData;
      this.cardJsonData = gradeCardMetaData;
    }
    else{
      this.empSettingFormData = employeeSettingFormData;
      this.cardJsonData = CardMetaData;
    }
    this.empSettingForm = this.dynamicFormService.createControl(this.empSettingFormData)
    let path = this.router.url.split('/')
    let apiUrl = path[path.length - 1];
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    if (this.action == 'Modify') {
      this.isLoading = true;

      let apiUrl = path[path.length - 1];
      this.apiService.get(`core-hr/employee/settings/${apiUrl}`).subscribe({
        next: (res: any) => {
          if (res) {
            //this.editData = res.data;
            this.empSettingForm.patchValue(res.data)
            this.designationList = res?.data?.designation;
            this.isLoading = false;
            this.cdRef.detectChanges();
          }
        }, error: (error: any) => {
          this.detectedError = true;
          this.isLoading = false;
          this.cdRef.detectChanges();
          console.error(error);
        }


      });
    }
  }

  handleCancelClick() {
    this.name = '';
    this.modalRef.close();
  }

  newModel(model, action, id) {
    this.empSettingForm.reset();

    this.action = action;
    this.currentId = id;
    this.modalRef = this.modalService.open(model, {
      size: 'md', scrollable: false, windowClass: 'emp-settings-modal', backdrop: 'static'
    });
    let path = this.router.url.split('/')
    if (this.action == 'Modify') {
      this.isLoading = true;
      let apiUrl = path[path.length - 1];
      this.apiService.get(`core-hr/employee/settings/${apiUrl}/${id}`).subscribe({
        next: (res: any) => {
          if (res) {
            //this.editData = res.data;
            this.empSettingForm.patchValue(res.data)
            this.isLoading = false;
            this.cdRef.detectChanges();
          }
        }, error: (error: any) => {
          this.detectedError = true;
          this.isLoading = false;
          this.cdRef.detectChanges();
          console.error(error);
        }


      });
    }
  }

  onEmpSubmit() {
    this.submit = true;
    this.isProcessing = true;
    let data = this.empSettingForm.value;
    if (this.empSettingForm.invalid) {
      this.isProcessing = false;

    }
    else {
      this.submit = false;
      data = this.dynamicFormService.getUpdatedData(this.empSettingForm)
      let path = this.router.url.split('/')
      let apiUrl = path[path.length - 1];
      this.pathUrl=apiUrl

      if (!this.currentId) {
        this.apiService.post(`core-hr/employee/settings/${apiUrl}`, data).subscribe({
          next: (res: any) => {

            if (res) {

              this.isProcessing = false;
              this.cdRef.detectChanges();
              this.modalRef.close();
              this.dataTable.refreshData();

              this.cdRef.detectChanges();
              this.sharedService.handleSuccessModel({btnTemplate:this.customTemplate})

              this.modalRef.close();
              this.sharedService.triggerReload();

            }
          },
          error: (error: any) => {
            this.isProcessing = false;
            this.detectedError = true;
            this.dataTable.refreshData();

            this.cdRef.detectChanges();

          }
        });
      }
      else {
        data = this.dynamicFormService.getUpdatedData(this.empSettingForm)
        this.apiService.put(`core-hr/employee/settings/${apiUrl}/${this.currentId}`, data, 'subsidiary').subscribe({
          next: (res: any) => {
            if (res) {
              this.isProcessing = false;
              this.modalRef.close();
              this.dataTable.refreshData();

              this.cdRef.detectChanges();
            }
            else {
              this.isProcessing = false;
              this.cdRef.detectChanges();
            }
          },
          error: (error: any) => {
            this.detectedError = true;
            this.isProcessing = false;
            this.cdRef.detectChanges();
            console.error(error);

          }
        });
      }
    }

  }

}
