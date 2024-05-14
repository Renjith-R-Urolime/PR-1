import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { employeeCardMetaData } from '../employee.data';
import { Subscription } from 'rxjs';

// import { payrollOnboardFormData, payrollOnboardformSections, payrollOnboardwizardTabs } from './payroll.data';
@Component({
  selector: 'app-payroll-onboard',
  templateUrl: './payroll-onboard.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./payroll-onboard.component.scss']
})
export class PayrollOnboardComponent implements OnInit, OnDestroy {
  componentTitle: string = 'Employees';
  theme: string = this.sharedService.getTheme();
  gridIcon: string = './assets/media/icons/grid-outline.svg';
  tableIcon: string = './assets/media/icons/menu-outline.svg';
  view: string = 'card';
  employeeDetails: Array<any> = [];
  onBoard: any = true
  cardJsonData:any = employeeCardMetaData;
  exportType: string;
  selectedFileName: string;
  selectedFile: File | null = null;
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

  constructor(private router: Router, private sharedService: SharedService, private apiService: ApiService,private cdRef: ChangeDetectorRef) { };

  onBoardEmployee(id,empDetails){


            this.router.navigate(['/employee-hub/profiles/payroll-enrollment', id]);
  }

  viewEmployee(id){


    this.router.navigate([`employee-hub/profiles/employee/view/${id}`]);
  }

  ngOnInit() {
    // this.cardJsonData = employeeCardMetaData;
    this.getRecordName()
    console.log(this.modalName)
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

  getRecordName() {
    const urlSegments = this.router.url.split('/').map(segment => segment.toLowerCase());
    console.log(urlSegments)
    let apiUrl = '';
    let recordName = '';
    if (urlSegments.includes('onboard')) {
      apiUrl = 'employee/onboard';
      recordName = 'payroll onboarding'
    }
    this.modalName = recordName
    return recordName
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

  getTemplate(selectedType) {
    const recordName = this.getRecordName()
    this.apiService.get(`core-hr/employee/onboard/import?model=payroll-onboard&importType=${selectedType}`)
      .subscribe({
        next: (response: any) => {
          const csvData = response.data;
          console.log(response)
          console.log(csvData)
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

    const apiEndpoint = `core-hr/employee/onboard/export?model=payroll-onboard`;

    this.apiService.post(apiEndpoint, formData).subscribe({
      next: (res: any) => {
        if (res.status === 'failed' && res.data === null) {
          console.log('test1')
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
