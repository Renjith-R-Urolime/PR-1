import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { cardMetaData, tableMetaData } from './timeoff-adjustment-data';

@Component({
  selector: 'app-time-off-adjustment',
  templateUrl: './time-off-adjustment.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./time-off-adjustment.component.scss']
})
export class TimeOffAdjustmentComponent implements OnInit, OnDestroy {
  view:string='table';
  cardJsonData = cardMetaData;
  tableMetaData: any = tableMetaData;
  theme: string = this.sharedService.getTheme();
  exportType: string;
  selectedFileName: string;
  downloadData: string;
  totalCount: any;
  successCount: any;
  failedCount: any;
  modalName: string;
  apiErrorMessage: any;
  hasError: boolean;
  errorMessage: string | null;
  modalSize: any = 'lg';
  private subscription: Subscription;
  selectedFile: File | null = null;

  constructor(private route: ActivatedRoute, private sharedService:SharedService, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
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
  changeView(event){
    this.view=event;
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
    if (urlSegments.includes('time-off-adjustment')) {
      apiUrl = 'payroll-management/time-off-adjustment';
      recordName = 'time off adjustment'
    }
    this.modalName = recordName
    return recordName
  }

  getTemplate(selectedType) {
    const recordName = this.getRecordName()
    this.apiService.get(`payroll/time-off-adjustment/template/import?model=timeoffadjustment&importType=${selectedType}`)
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
    const recordName = this.getRecordName()
    const formData = new FormData();
    formData.append('file', selectedFile);

    const apiEndpoint = `payroll/time-off-adjustment/export?model=${recordName}`;

    this.apiService.post(apiEndpoint, formData).subscribe({
      next: (res: any) => {
        if (res.status === 'failed' && res.data === null) {

          this.apiErrorMessage = res.message;
          this.hasError = true;
        }
        if (res && res.data && res.data.length > 0) {
          this.totalCount = res.total
          this.successCount = res.valid
          this.failedCount = res.error
        }
        if (res.status === 'success') {
          this.selectedFile = null;
          this.selectedFileName = null;
          const fileInput = document.getElementById('fileInput') as HTMLInputElement;
          fileInput.value = '';
          const success = true;
          this.modalSize = 'md'
          this.openModalFromResponse(res.total, res.valid, res.error, success, '', 'md');
        }
        if (res.status === 'failed' && Array.isArray(res.data) && res.data.length > 0) {
          const csvData = this.convertToCSV(res.data);
          this.downloadData = csvData
          this.selectedFile = null;
          this.selectedFileName = null;
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
