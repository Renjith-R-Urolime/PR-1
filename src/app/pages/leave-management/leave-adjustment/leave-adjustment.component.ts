import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { leaveAdjustmentCardMetaData, tableMetaData } from './leave-adjustment.data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-leave-adjustment',
  templateUrl: './leave-adjustment.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./leave-adjustment.component.scss']
})
export class LeaveAdjustmentComponent implements OnInit, OnDestroy {
  theme: string = this.sharedService.getTheme();
  view: string = 'table';
  currentURL: any;
  cardJsonData: any = leaveAdjustmentCardMetaData;
  tableMetaData:any= tableMetaData;
  isLoading: boolean;
  apiErrorMessage: any;
  hasError: boolean;
  totalCount: any;
  successCount: any;
  failedCount: any;
  selectedFile: null;
  modalSize: string;
  downloadData: string;
  modalName: string;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private sharedService: SharedService, private router: Router, private apiService:ApiService,) { }

  changeView(event) {
    this.view = event;
  }

  openView(type, id, empData?) {

    const currentURL = this.router.url.split('?')[0];

    if (type === 'edit') {
      this.router.navigate([currentURL, 'edit', id]);
    }
    if(type === 'view') {
      this.router.navigate([currentURL, 'view', id]);
    }
  }

  ngOnInit() {
      this.isLoading = true;
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
    const urlSegments = this.router.url.split('/').map(segment => segment.toLowerCase());
    let apiUrl = '';
    let recordName = '';
    if (urlSegments.includes('leave-management')) {
      apiUrl = 'leave-management/adjustment';
      recordName = 'leave-adjustment'
    }
    this.modalName = recordName
    return recordName
  }

  getTemplate(selectedType) {
    const recordName = this.getRecordName()
    this.apiService.get(`leave/adjustment/template/export?model=${recordName}&importType=${selectedType}`)
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

    const apiEndpoint = `leave/adjustment/import?model=${recordName}`;

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
}
