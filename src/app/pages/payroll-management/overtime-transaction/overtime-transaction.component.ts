import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { overtimeTransactionCardMetaData, tableMetaData } from './overtime-transaction.data';

@Component({
  selector: 'app-overtime-transaction',
  templateUrl: './overtime-transaction.component.html',
  styleUrls: ['./overtime-transaction.component.scss']
})
export class OvertimeTransactionComponent implements OnInit, OnDestroy{
  view: string = 'table';
  theme: string = this.sharedService.getTheme();
  cardJsonData: any = overtimeTransactionCardMetaData;
  tableMetaData: any = tableMetaData;
  currentURL: any;
  selectedFile: File | null = null;
  selectedFileName: string;
  failedCount: number;
  downloadData: string;
  isDragOver: boolean;
  isLoading: boolean;
  apiErrorMessage: any;
  hasError: boolean;
  errorMessage: string;
  selectedExportType: string = 'create';
  successCount: any;
  totalCount: any;
  modalName: string;
  modalSize: any = 'lg';
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private sharedService: SharedService, private router: Router, private modalService: NgbModal, private cdRef: ChangeDetectorRef, private apiService: ApiService,) { }
  private modalRef: NgbModalRef;

  changeView(event) {
    this.view = event;
  }

  ngOnInit(): void {


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
    if (urlSegments.includes('overtime')) {
      apiUrl = 'payroll-management/overtime';
      recordName = 'overtime'
    }
    this.modalName = recordName
    return recordName
  }

  getTemplate(selectedType) {
    const recordName = this.getRecordName()
    this.apiService.get(`payroll/overtime/template/import?model=overtime&importType=${selectedType}`)
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

    const apiEndpoint = `payroll/overtime/export?model=${recordName}`;

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
          this.selectedFileName = null;
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
