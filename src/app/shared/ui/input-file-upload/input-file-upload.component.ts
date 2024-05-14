import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import Swal from 'sweetalert2';
import { S3UploadService } from '../../services/s3-upload.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'input-file-upload',
  templateUrl: './input-file-upload.component.html',
  styleUrls: ['./input-file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFileUploadComponent),
      multi: true
    }
  ]
})
export class InputFileUploadComponent implements ControlValueAccessor {
  
  @ViewChild('myPond') myPond: any;
  @ViewChild('imagePreviewPopup') imagePreviewPopupElement: ElementRef | undefined;
  pondOptions: any = {}
  pondFiles = []
  @Input() multiple: boolean = false;
  @Input() reset: boolean = false;
  uploadedFileKeys: any = this.multiple ? [] : '';
  @Input() uploadedFiles: any = this.multiple ? [] : '';
  @Input() idleLabel: string;
  @Input() theme: "light" | 'dark' = 'light';
  @Input() themeColor: string = this.sharedService.getTheme();
  @Input() infithraTheme: string;
  @Input() fieldStyle: string = '';
  @Input() previewHeight: number = 236;
  customClass: string;
  @Input() patchData: string[] = [];
  @Input() imagePreview: boolean = false;
  @Input() allowImages: boolean = true
  @Input() allowPdf: boolean = false
  @Input() pdfPreview: boolean = false
  @Input() imageEdit: boolean = false
  @Input() fileUploadcancelled: boolean = false
  

  showImagePreviewPopup: boolean = false
  imageData: any = {};
  @Output() onFileUploaded: EventEmitter<any> = new EventEmitter<any>();
  @Output() onFileRemoved: EventEmitter<any> = new EventEmitter<any>();

  private onChange = (_: any) => { };
  private onTouched = () => { };


  constructor(private s3Service: S3UploadService, private cdRef: ChangeDetectorRef, private elementRef: ElementRef, private sharedService: SharedService) { }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const targetElement = event.target as HTMLElement;
    // Check if the click is outside the file-pond and image preview elements
    if (!this.elementRef.nativeElement.contains(targetElement) && !(this.imagePreviewPopupElement && this.imagePreviewPopupElement.nativeElement.contains(targetElement))
    ) {
      this.showImagePreviewPopup = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.reset) {
      if (this.reset) {

        this.removeFilesFromPond();
      }
    }
    console.log("changes detected");
    if (changes.fileUploadcancelled) {
      if (this.fileUploadcancelled) {
        this.deleteFromS3()
      }
    }
  }

  deleteFromS3(): void {
    if (!this.multiple) {
      console.log(this.uploadedFileKeys, 'Previous file key name');
      if (this.uploadedFileKeys) {
        this.s3Service.deleteFile(this.uploadedFileKeys).then(() => {
          this.onFileRemoved.emit({ status: true, files: '' });
          this.uploadedFileKeys = '';
          this.onChange('');
          console.log('Previous file deleted from S3:', this.uploadedFileKeys);
        }).catch((error: any) => {
          console.error('Error deleting file from S3:', error);
        });
      }
    } else {
      // Handle multiple key deletion
      console.log("multiple file deleting ");
      console.log(this.uploadedFileKeys, 'Previous file key name');

      if (this.uploadedFileKeys && this.uploadedFileKeys.length > 0) {
        const deletePromises = this.uploadedFileKeys.map(key => {
          return this.s3Service.deleteFile(key).catch(error => {
            console.error('Error deleting file from S3:', error);
          });
        });

        Promise.all(deletePromises).then(() => {
          this.onFileRemoved.emit({ status: true, files: '' });
          this.uploadedFileKeys = [];
          this.onChange('');
          console.log('Previous files deleted from S3:', this.uploadedFileKeys);
        }).catch((error: any) => {
          console.error('Error deleting files from S3:', error);
        });
      }
    }
  }


  ngOnInit(): void {
    let options = {
      allowMultiple: this.multiple,
      idleLabel: this.idleLabel ? this.idleLabel : null,
      credits: false,
      acceptedFileTypes: (this.allowImages ? ['image/*'] : []).concat(this.allowPdf ? ['application/pdf'] : []),
            beforeRemoveFile: (fileItem) => this.onRemovePopup(fileItem),
      server: {
        process: (fieldName, file, metadata, load, error, progress, abort) => {
 
          // Implement your S3 upload logic here
          this.uploadToS3(file,load)

          // You can also provide functions for progress and abort if needed
          // progress(percent)
          // abort()
        },
        revert: null,
        // revert: (uniqueFileId, load, error) => {
        //   this.s3Service.deleteFile(uniqueFileId).then(() => {
        //     this.uploadedFileKeys = this.multiple
        //       ? this.uploadedFileKeys.filter((key) => key !== uniqueFileId)
        //       : '';
        //       this.onFileUploaded.emit({ status: true, files: this.uploadedFileKeys})
        //       this.onChange(this.uploadedFileKeys);
        //     }).catch((error: any) => {
        //       this.onFileUploaded.emit({ status: true, files: this.uploadedFileKeys})
        //       console.error('Error deleting file from S3:', error);
        //     });
        // },
        // Implement other server methods (fetch, restore, load) as needed
        fetch: null,
        restore: null,
        load: (source, load, error, progress, abort, headers) => {
          // Fetch file data using your s3Service.getFile method

          if (source) {
            this.s3Service.getFile(source).then((data: any) => {
              this.imageData = data

              if (data.buffer instanceof ArrayBuffer) {
                const blob = new Blob([data.buffer], { type: data.type });

                // Load the Blob into FilePond
                load(blob);
              } else {
                console.error('Error: Unable to load file');
                error('Error loading file');
              }
            })
              .catch((err: any) => {
                console.error('Error fetching file data from S3:', err);
                error('Error fetching file data from S3');
              });
          }
        }
      },
      instantUpload: true,
      allowProcess: true,
      allowImageCrop: this.fieldStyle === 'compact' ? false : this.imageEdit,
    allowImagePreview: this.fieldStyle === 'compact' ? false : this.imagePreview,
      imageCropAspectRatio: 1,
      allowPdfPreview: this.fieldStyle === 'compact' ? false : this.pdfPreview,
      pdfPreviewHeight: this.previewHeight,
      // pdfComponentExtraParams: 'toolbar=0&view=fit&page=1',
      allowImageEdit: this.imagePreview ? true : false,
    }
    this.pondOptions = options
    this.customClass = this.fieldStyle + '-' + this.theme
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }


  uploadToS3(file,load){
    this.s3Service.uploadFile(file).then((fileKey: string) => {
      this.uploadedFileKeys = this.multiple ? [...this.uploadedFileKeys, fileKey] : fileKey
      load(fileKey);
      this.onFileUploaded.emit({ status: true, files: this.uploadedFileKeys })
      this.onChange(this.uploadedFileKeys.concat(this.uploadedFiles));
      console.log(this.uploadedFileKeys, 'new uploaded key');
    })
      .catch((error: any) => {
        this.onFileUploaded.emit({ status: false, files: this.uploadedFileKeys })
        console.error('Error uploading to S3:', error);
      });
  }


  private removeFilesFromPond() {
    // Access the FilePond instance and remove files
    const pond = this.myPond?.pond;
    if (pond) {
      this.multiple ? pond.removeFiles() : pond.removeFile();
    }
    this.patchData = undefined
    this.pondFiles = []
    this.uploadedFileKeys = this.multiple ? [] : '';
    this.cdRef.detectChanges();
  }

  // pondHandleInit() {
  //
  // }

  pondHandleAddFile(event: any) {
    if (this.fieldStyle === 'compact') {
      var reader = new FileReader();

      reader.readAsDataURL(event.file.file);
      reader.onload = (e) => {
        this.imageData['base64Data'] = e.target.result
        this.imageData['name'] = event.file.name
      };
    }
  }

  pondHandleActivateFile(event: any) {


    if (this.fieldStyle === 'compact') {
      this.showImagePreviewPopup = !this.showImagePreviewPopup
    }
  }

  // ControlValueAccessor methods
  writeValue(value: any) {
    if (value) {
      if (this.multiple) {
        this.uploadedFileKeys = [...this.uploadedFileKeys, value];
        this.uploadedFileKeys.forEach(fileName => {
          if (!this.pondFiles.some(file => file.source === fileName)) {
            this.pondFiles.push({
              source: fileName,
              options: {
                type: 'local'
              }
            });
          }
        });
      } else {
        if (!this.pondFiles.some(file => file.source === value)) {
          this.uploadedFileKeys = value;
          this.pondFiles.push({
            source: value,
            options: {
              type: 'local'
            }
          });
        }
      }
    };
  }

  onRemovePopup(fileItem: any): Promise<any> {
    return new Promise((resolve, reject): void => {
      // Your confirmation logic here
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        customClass: {
          confirmButton: `btn-${this.themeColor}`,
        }
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true);
        } else {
          reject();
        }
      });
    });
  }

  pondHandleRemoveFile(event) {
    if (this.uploadedFileKeys !== '' || (this.uploadedFileKeys && this.uploadedFileKeys?.length > 0)) {
      const fileName = event.file.filename.split(" ").join("-").toLowerCase();
      const removedFileKey = this.multiple ? this.uploadedFileKeys.filter(key => key.split('/')[1] === fileName)[0] : this.uploadedFileKeys;
      // User clicked "Yes," proceed with file removal
      if (removedFileKey) {
        this.s3Service.deleteFile(removedFileKey).then(() => {
          this.showImagePreviewPopup = false;
          this.imageData = {};
          if (this.multiple) {
            this.uploadedFileKeys = this.uploadedFileKeys.filter((key) => key !== removedFileKey)
            let files = this.uploadedFileKeys.concat(this.uploadedFiles)
            this.onFileRemoved.emit({ status: true, files: files });
            this.onChange(files);
          } else {
            this.uploadedFileKeys = ''
            this.onFileRemoved.emit({ status: true, files: '' });
            this.onChange('');
          }

        }).catch((error: any) => {
          console.error('Error deleting file from S3:', error);
        });
      }
    }
  }

  onUploadedFilesRemove(fileName) {
    return new Promise((resolve, reject): void => {
      // Your confirmation logic here
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        customClass: {
          confirmButton: `btn-${this.themeColor}`,
        }
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.uploadedFiles !== '' || (this.uploadedFiles && this.uploadedFiles?.length > 0)) {
            const removedFileKey = this.multiple ? this.uploadedFiles.filter(key => key === fileName)[0] : this.uploadedFiles;
            // User clicked "Yes," proceed with file removal
            this.s3Service.deleteFile(removedFileKey).then(() => {

              this.uploadedFiles = this.uploadedFiles.filter((key) => key !== removedFileKey)
              let files = this.uploadedFileKeys.concat(this.uploadedFiles)
              this.onFileRemoved.emit({ status: true, files: files });
              this.imageData = {}
              this.onChange(files);

            }).catch((error: any) => {
              console.error('Error deleting file from S3:', error);
            });
          }
        } else {
          reject();
        }
      });
    });
  }

  pondUpdateFiles(event) {
    this.pondFiles = event.items
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
