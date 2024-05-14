import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AppState } from 'src/app/shared/store/app.state';
import { employeeFormData, formSections, wizardTabs } from '../employee.data';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./employee-home.component.scss']
})
export class EmployeeHomeComponent implements OnInit, OnDestroy {

  componentTitle: string = 'Employees';
  gridIcon: string = './assets/media/icons/grid-outline.svg';
  tableIcon: string = './assets/media/icons/menu-outline.svg';
  view: string = 'card';
  theme: string = this.sharedService.getTheme();
  breadcrumbTrail: string[] = ['Employee', 'Employee List'];
  filterText: string;
  cardJsonData;
  isOnBoarded;
  btnToggle: boolean = false;
  btnToggleId: number;
  wizardData = wizardTabs;
  formData = employeeFormData;
  formSection = formSections;
  isContributionApplied: boolean = false;
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


  constructor(private router: Router, private sharedService: SharedService, private store: Store<AppState>, private apiService: ApiService, private cdRef: ChangeDetectorRef,) { };

  openView(type, id, empData?) {



    this.sharedService.closeSideBar();
    const currentURL = this.router.url.split('?')[0];

    if (type === 'edit') {
      this.router.navigate([currentURL, 'edit', id]);
    }
    if (type === 'register') {

      if(empData?.registeredContributions === '0'){
        this.router.navigate([currentURL, 'contribution-register', id, 'create']);
      }
      else{

          this.router.navigate([currentURL, 'contribution-register', id]);
      }
    }
    if (type === 'view') {
      this.router.navigate([currentURL, 'view', id]);
    }
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

  changeView(event) {
    this.view = event;
  }
  editEmployee(id) {
    const currentURL = this.router.url.split('?')[0];


    this.router.navigate([currentURL, 'edit', id]);
  }

  onBoardEmployee(id, empDetails) {



    this.router.navigate(['/employee-hub/profiles/payroll-enrollment', id]);
  }

  onBtnToggle(id) {

    this.btnToggleId = id;
    this.btnToggle = !this.btnToggle
  }

  viewEmployee(id) {


    this.router.navigate([`employee-hub/profiles/employee/view/${id}`]);
  }

  ngOnInit() {
    //---------store value read--------


    this.store.pipe(select(state => state.sampleText)).subscribe(data => {

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

  getRecordName() {
    const urlSegments = this.router.url.split('/').map(segment => segment.toLowerCase());

    let apiUrl = '';
    let recordName = '';
    if (urlSegments.includes('employee')) {
      apiUrl = 'employee/master';
      recordName = 'employee'
    }
    this.modalName = recordName
    return recordName
  }

  getTemplate(selectedType) {
    const recordName = this.getRecordName()
    this.apiService.get(`core-hr/employee/template/import?model=employee&importType=${selectedType}`)
      .subscribe({
        next: (response: any) => {
          const csvData = response.data;


          const blob = new Blob([csvData], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = selectedType === 'create' ? `Employee-Upload-Template.csv` : `Employee-Upload-Template.csv`;
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

    const apiEndpoint = `core-hr/employee/export?model=employee`;

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
