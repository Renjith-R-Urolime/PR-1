import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-file-upload-modal',
  templateUrl: './file-upload-modal.component.html',
  styleUrls: ['./file-upload-modal.component.scss']
})
export class FileUploadModalComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  selectedFile: File | null = null;
  modalName = '';
  templateType: any;
  private modalRef: NgbModalRef;
  method: string;
  message: string;
  apiErrorMessage: string;
  errorMessage: string;
  hasError: boolean;
  selectedFileName: string;
  failedCount: number;
  downloadData: string;
  selectedExportType: string = 'create';
  isDragOver: boolean;
  isLoading: boolean = false;
  isSuccess: boolean = false;
  totalCount: any;
  successCount: any;
  private successmodal: Subscription;
  showSuccessModal: boolean = false;
  private subs = new SubSink();
  theme: string = this.sharedService.getTheme();
  constructor(private sharedService: SharedService, private modalService: NgbModal, private cdRef: ChangeDetectorRef) {
   }

  ngOnInit() {

    this.subs.add(
      this.subscription = this.sharedService.currentModal.subscribe(data => {
        this.modalName = data;
      }),

      this.successmodal = this.sharedService.currentApiResponse.subscribe(data => {
        if (data && data.success) {
          this.showSuccessModal = true;
          this.totalCount = data.total;
          this.successCount = data.valid;
          this.failedCount = data.error;
          this.downloadData = data.csvData;
          this.cdRef.detectChanges();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  handleImportAPI(apiType: string) {

    this.sharedService.changeApiResponses(apiType, this.selectedExportType, null);
  }

  handleExportAPI(apiType: string) {
    this.isLoading = true
    this.sharedService.changeApiResponses(apiType, null, this.selectedFile);
  }

  changeToUpperCase(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  closeModal() {
    this.isLoading = false
    this.sharedService.onModalClose();
    this.cdRef.detectChanges();
    this.selectedFile = null;
    this.selectedFileName = null;
    this.showSuccessModal = false;

  }

  onExportTypeSelected(exportType: string) {
    this.selectedExportType = exportType;
  }

  fileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.errorMessage = null;

    if (input.files && input.files.length > 0) {
      this.apiErrorMessage = ''
      this.errorMessage = ''
      this.hasError = false;
      const file = input.files[0];
      const maxSize = 10 * 1024 * 1024;

      if (file.size > maxSize) {
        this.errorMessage = 'File size exceeds 10MB. Please select a smaller file.';
        this.hasError = true;
        input.value = '';
        this.selectedFile = null;
        this.selectedFileName = null;
      } else if (file.type !== "text/csv") {
        this.errorMessage = 'Unsupported file type. Please select a CSV file.';
        this.hasError = true;
        input.value = '';
        this.selectedFile = null;
        this.selectedFileName = null;
      } else {
        this.selectedFile = file;
        this.selectedFileName = file.name;
        this.downloadData = '';
      }
    } else {
      this.errorMessage = 'No file selected.';
      this.hasError = true;
      this.selectedFile = null;
      this.selectedFileName = null;
    }
  }

  importFile(): void {
    if (this.selectedFile) {
      // this.uploadData(this.selectedFile);
      this.apiErrorMessage = ''
      this.errorMessage = ''
      this.hasError = false;
    } else {
      console.error('No file selected for upload');
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === "text/csv") {
        this.selectedFile = file;
        this.selectedFileName = file.name;
        this.downloadData = '';
      } else {
        console.error('Unsupported file type');
      }
    }
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let file: File | null = null;
    if (element.files && element.files.length > 0) {
      file = element.files[0];
    }
    this.handleFile(file);
  }

  handleFile(file: File | null): void {
    if (!file) {
      return;
    }
    if (file.type !== 'text/csv') {
      console.error('Only CSV files are allowed.');
      return;
    }

  }

  clearSelectedFile(): void {
    this.selectedFile = null;
    this.selectedFileName = null;
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.value = '';
  }

  downloadCSV() {
    const blob = new Blob([this.downloadData], { type: 'text/csv' });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${this.modalName}_upload_errors_result.csv`);

    link.click();

    window.URL.revokeObjectURL(url);
  }


}
