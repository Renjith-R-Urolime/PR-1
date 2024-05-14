import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { CardViewListComponent } from '../../card-view-list/card-view-list.component';
import { DataTableListComponent } from '../../data-table-list/data-table-list.component';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.scss']
})
export class SettingsListComponent implements OnInit, OnDestroy {
  theme: string = this.sharedService.getTheme();
  title: string = this.sharedService.getPageName();

  private modalRef: NgbModalRef;
  empRoute: string;
  @Input() formData;
  settingForm: FormGroup;
  submit: boolean = false;
  isProcessing: boolean = false;
  submitBtnText = 'Save';
  detectedError: boolean;
  view: string = 'table';
  id;
  settingData:any = [];
  name: string = '';
  private subscription: Subscription;
  // data = {
  //   "name": '',
  //   "inactive": false
  // }
  action;
  subLink = '';
  btnToggle: boolean = false;
  btnToggleId: number;
  @Input() cardJsonData;
  isLoading: boolean;
  currentId: any;
  pathUrl:any;
  private routeSub: Subscription | undefined;
  @ViewChild('dataTable') dataTable: DataTableListComponent;
  @ViewChild('cardView') cardView: CardViewListComponent;
  @Input() importExportOption:boolean = false;
  modalName: string;
  apiErrorMessage: any;
  hasError: boolean;
  totalCount: any;
  successCount: any;
  failedCount: any;
  selectedFile: null;
  modalSize: string;
  downloadData: string;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private dynamicFormService: DynamicFormService,
    private apiService: ApiService,
    public sharedService: SharedService,
    private route: ActivatedRoute
  ) { }

  changeView(event) {
    this.view = event;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {

      this.subLink = params['sub'];
    });
    this.settingForm = this.dynamicFormService.createControl(this.formData)
    let path = this.router.url.split('/')
    let apiUrl = path[path.length - 1];
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.route.queryParams.subscribe((params) => {
      if (params.view) {
        this.view = params.view;
      }
    });
    this.getRecordName()
    this.subscription = this.sharedService.currentApi.subscribe(data => {
      if (data) {
        if (data.apiType === 'import' && data.exportType) {
          this.getTemplate(data.exportType);
        } else if (data.apiType === 'export' && data.file) {
          this.uploadData(data.file);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openModalFromEvent(size: 'lg' | 'md' = 'lg') { 
    this.sharedService.changeModalData(this.modalName);
    this.sharedService.apiResponse('', '', '', false, '');
    this.sharedService.handleOpenFileUploadModel(size);
  }

  openModalFromResponse(total, valid, error, success, csvData, size: 'lg' | 'md' = 'md') {
    this.sharedService.onModalClose();
    this.sharedService.apiResponse(total, valid, error, success, csvData);
    this.sharedService.handleOpenFileUploadModel(size);
  }

  getRecordName() {
    const urlSegments = this.router.url.split('/').filter(segment => segment.trim() !== '').map(segment => segment.toLowerCase());
    console.log(urlSegments);

    let apiUrl = '';
    let recordName = '';

    if (urlSegments.includes('employee-hub')) {
        apiUrl = 'employee-hub/settings';
        recordName = urlSegments[urlSegments.length - 1];
    }

    this.modalName = recordName;
    return recordName;
}


  getTemplate(selectedType) {
    const recordName = this.getRecordName()
    this.apiService.get(`core-hr/employee/settings/template/export/${recordName}?model=${recordName}&importType=${selectedType}`)
      .subscribe({
        next: (response: any) => {
          const csvData = response.data;
          const blob = new Blob([csvData], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = selectedType === 'create' ? `${recordName}-template-sample.csv` : `${recordName}-update-template`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        },
        error: (error: any) => {
          console.error("There was an error downloading the file", error);
        }
      });
  }

  uploadData(selectedFile: File) {
    this.isLoading = true;
    const recordName = this.getRecordName()
    const formData = new FormData();
    formData.append('file', selectedFile);

    const apiEndpoint = `core-hr/employee/settings/template/import/${recordName}?model=${recordName}`;

    this.apiService.post(apiEndpoint, formData).subscribe({
      next: (res: any) => {
        if (res.status === 'failed' && res.data === null) {

          this.apiErrorMessage = res.message;
          this.hasError = true;
          this.isLoading = false;
        }
        if (res && res.data && res.data.length > 0) {
          this.totalCount = res.total
          this.successCount = res.valid
          this.failedCount = res.error
        }
        if (res.status === 'success') {
          this.isLoading = false;
          this.selectedFile = null;
          this.selectedFile = null;
          const fileInput = document.getElementById('fileInput') as HTMLInputElement;
          fileInput.value = '';
          const success = true;
          this.modalSize = 'md'
          this.openModalFromResponse(res.total, res.valid, res.error, success, '', 'md');
        }
        if (res.status === 'failed' && Array.isArray(res.data) && res.data.length > 0) {
          this.isLoading = false;
          const csvData = this.convertToCSV(res.data);
          this.downloadData = csvData
          this.selectedFile = null;
          this.selectedFile = null;
          const success = true;
          this.modalSize = 'md'
          this.openModalFromResponse(res.total, res.valid, res.error, success, csvData, 'md')
        }
      },
      error: (error: any) => {
        console.error("Error in file upload", error);
      }
    });
  }

  convertToCSV(data: any[]): string {
    let csvContent = '';

    const columnHeadings = Object.keys(data[0]?.rowData || {});

    columnHeadings.unshift("Error");

    csvContent += columnHeadings.join(',') + '\n';

    data.forEach(row => {
      const rowData = row.rowData;

      const rowValues = columnHeadings.map(key => {
        if (key === "Error") {
          return `"${row.errors.join(', ')}"`;
        } else {
          const value = rowData[key];
          return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
        }
      });

      csvContent += rowValues.join(',') + '\n';

      csvContent += '\n';
    });

    return csvContent;
  }

  handleCancelClick() {
    // this.data = {
    //   "name": '',
    //   "inactive": false
    // };
    this.name = '';
    this.modalRef.close();
  }

  newModel(model, action, id) {
    this.settingForm.reset();
    this.settingData = [];
    this.action = action;
    this.currentId = id;
    this.modalRef = this.modalService.open(model, {
      size: 'md', scrollable: false, windowClass: 'settings-form-modal', backdrop: 'static'
    });
    let path = this.router.url.split('/')
    if (this.action == 'Modify') {
      this.isLoading = true;
      let apiUrl = path[path.length - 1];
      this.apiService.get(`${this.formData.apiUrl}/${this.subLink}/${this.currentId}`).subscribe({
        next: (res: any) => {
          if (res) {
            this.settingData = res.data;
            this.settingForm.patchValue(res.data)
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

  onSubmit() {
    this.submit = true;
    this.isProcessing = true;
    let data = this.settingForm.value;
    if (this.settingForm.invalid) {
      this.isProcessing = false;

    }
    else {
      this.submit = false;
      data = this.dynamicFormService.getUpdatedData(this.settingForm)
      let path = this.router.url.split('/')
      let apiUrl = path[path.length - 1];
      this.pathUrl=apiUrl

      if (!this.currentId) {
        this.apiService.post(`${this.formData.apiUrl}/${this.subLink}`, data).subscribe({
          next: (res: any) => {

            if (res) {

              this.isProcessing = false;
              this.cdRef.detectChanges();
              this.modalRef.close();
              this.dataTable?.refreshData();
              this.cardView?.fetchData();
              this.cdRef.detectChanges();
            }
          },
          error: (error: any) => {
            this.isProcessing = false;
            this.detectedError = true;
            this.dataTable?.refreshData();
            this.cdRef.detectChanges();

          }
        });
      }
      else {
        data = this.dynamicFormService.getUpdatedData(this.settingForm)
        this.apiService.put(`${this.formData.apiUrl}/${this.subLink}/${this.currentId}`, data).subscribe({
          next: (res: any) => {
            if (res) {
              this.isProcessing = false;
              this.modalRef.close();
              this.dataTable?.refreshData();
              this.cardView?.fetchData();
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
  onBtnToggle(id) {
    this.btnToggleId = id;
    this.btnToggle = !this.btnToggle
  }

  goBack() {
    const fullRoute = this.getFullRoute(this.route.snapshot);

      this.router.navigate([fullRoute]);
    }

    getFullRoute(routeSnapshot: ActivatedRouteSnapshot): string {
      const segments: string[] = [];
      while (routeSnapshot) {
        segments.unshift(...routeSnapshot.url.map(segment => segment.toString()));
        routeSnapshot = routeSnapshot.parent;
      }

      // Remove the last segment
      segments.pop();

      return segments.join('/');
    }

}
