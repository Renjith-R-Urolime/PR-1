import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import moment from "moment";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { AuthService } from "src/app/modules/auth";
import {
  employeeFormData,
  formSections,
  wizardTabs,
} from "src/app/pages/employee/employee.data";
import { ApiService } from "src/app/shared/services/api.service";
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { pillTabs } from "src/app/shared/ui/pill-tabs/pill-tabs";
import Swal from 'sweetalert2';
import { pillsData, profileImageFormData } from "../../../pages/employee/employee-home/employee-profile/employee-profile-data";
import { FormMeta } from "../../meta-interface";
import { S3UploadService } from "../../services/s3-upload.service";
import { SharedService } from "../../services/shared.service";
import { TabService } from "../../services/tab.service";
import { Sections } from "../basic-form/basic-form";
import { WizardTabs } from "../wizard-tabs/wizard-tabs";

// import { OpenModelComponent } from '../model/open-model/open-model.component';

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.scss"],
})
export class UserDetailsComponent implements OnInit {
  @Input() id: number;
  pillLabel: pillTabs = pillsData;
  theme: string = this.sharedService.getTheme();
  @Input() btnPrefix: string = "New";
  @Input() customNewRecordURL: string;
  @Input() newRecordOpenType: string = "modal";
  @Output() fetchedData: EventEmitter<any> = new EventEmitter();

  wizardData: WizardTabs = wizardTabs;
  formData: FormMeta[] = employeeFormData;
  formSection: Sections = formSections;
  isfileUploadCancelled: boolean = false
  filteredData: any;
  isLoading: boolean;
  editUserModal: any;
  detectedError: boolean = false;
  workTenure: string = "";
  officeNumber: string = "";
  isProcessing: boolean = false;
  mockData: any;
  employeeDetails: any;
  private modalRef: NgbModalRef;
  private modalRefProfileImage: NgbModalRef;
  profileImageFormData = profileImageFormData
  currentProfileImage:string
  newProfileImage:string
  profileImageForm: FormGroup;
  uploadFormArray: any = [];
  patchFile:any=[]
  isEditEnabled: boolean = false
  reportingTo: any;
  uploadedFileKeys: any = "";
  imageLoading: boolean = false;
  isEmployeeInProbation: boolean = false;
  isCropping: boolean = false;
  fileName: string;
  headerText: string;
  browseReset: boolean;

  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal,
    private sharedService: SharedService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    public apiService: ApiService,
    private s3Service: S3UploadService,
    private tabService: TabService,
    private dynamicFormService: DynamicFormService
  ) { }

  @ViewChild("cropImage") cropImage: TemplateRef<any>;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // Access route parameters here
      this.id = params["id"];
    });
    this.profileImageForm = this.dynamicFormService.createControl(this.profileImageFormData);





    this.getUserData();

    this.sharedService.employeeDetails$.subscribe((data: any) => {
      this.isLoading = true;
      if (data?.employeeProfile) {
        this.filteredData = data?.employeeProfile;
        this.profileImageForm.patchValue({
          browse: data?.employeeProfile.logo,
        })
        if (data?.employeeProfile.logo) {
          this.uploadFormArray.push({ browse: [data?.employeeProfile.logo] });
        }
        this.processingData();
      }
    });
      }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  getUserData() {
    this.isLoading = true;
    // scope:'onboardedEmployee',
    ///////////////////////////

    this.apiService.get(`core-hr/employee/${this.id}`, "profile").subscribe({
      next: (res: any) => {
        if (res) {
          this.employeeDetails = res?.data;


          /////////////////////////////
          this.sharedService.setEmployeeDetails(this.employeeDetails, this.id);
          this.fetchedData.emit(true);

          this.filteredData = this.employeeDetails?.employeeProfile;
          this.processingData();

          this.isLoading = false;
          /////////////////////////////
        }
      },
      error: (error: any) => {
        this.fetchedData.emit(false);

        this.detectedError = true;

        console.error(error);
      },
    });

    //////////////////////////////
    // this.employeeDetails = this.mockData?.data


    // this.sharedService.setEmployeeDetails(this.employeeDetails)
    // this.filteredData=this.employeeDetails?.employeeProfile
    // this.filteredData['fullName']=this.employeeDetails?.employeeOverview?.personalDetails?.fullName
    // if(this.filteredData?.joininDate){
    //     this.calculateWorkTenure();
    // }

    // if(this.filteredData?.home?.code && this.filteredData?.home?.number ){
    //     this.homeNumber=`+${this.filteredData?.home?.code}-${this.filteredData?.home?.number}`
    // }
    // this.isLoading = false;


  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // {{ '+ ' + (filteredData?.mobile?.code ||
  //     'Not Available') + ' ' + (filteredData?.mobile?.number || 'Not Available')
  //     }}
  processingData() {
    if (this.filteredData) {
      this.filteredData["fullName"] =
        `${this.employeeDetails?.employeeOverview?.personalDetails?.employeeId} ${this.employeeDetails?.employeeOverview?.personalDetails?.fullName}`;

      if (this.employeeDetails?.employeeOverview?.personalDetails?.firstName) {
        this.filteredData["firstName"] = this.employeeDetails?.employeeOverview?.personalDetails?.firstName
      }


      if (this.employeeDetails?.employeeOverview?.personalDetails?.lastName) {
        this.filteredData["lastName"] = this.employeeDetails?.employeeOverview?.personalDetails?.lastName
      }




      if (
        this.filteredData?.reportingTo?.firstName &&
        this.filteredData?.reportingTo?.lastName &&
        this.filteredData?.reportingTo?.employeeId
      ) {
        this.reportingTo = {
          name: `${this.filteredData?.reportingTo.employeeId} ${this.filteredData?.reportingTo.firstName} ${this.filteredData?.reportingTo?.lastName}`,
          id: this.filteredData?.reportingTo?.id,
        };
      } else {
        this.reportingTo = null;
      }

      if (this.filteredData?.joininDate) {
        this.calculateWorkTenure();
      }

      if (this.filteredData?.dateOfConfirmation) {
        this.isProbation();
      }

      if (
        this.filteredData?.office?.code &&
        this.filteredData?.office?.number
      ) {
        this.officeNumber = `+${this.filteredData?.office?.code}-${this.filteredData?.office?.number}`;
      }
      this.isLoading = false;
    }
  }
  calculateWorkTenure() {

    const hireDateMoment = moment(this.filteredData?.joininDate, "YYYY-MM-DD");

    if (hireDateMoment.isAfter(moment())) {
      this.workTenure = "0y 0m 0d";
      return;
    }

    const duration = moment.duration(moment().diff(hireDateMoment));
    const years = duration.years();
    const months = duration.months();
    const days = duration.days() + 1;

    this.workTenure = `${years}y ${months}m ${days}d`;
  }


  isProbation() {
    if (this.filteredData?.dateOfConfirmation) {
      const confirmationDateMoment = moment(
        this.filteredData.dateOfConfirmation,
        "YYYY-MM-DD"
      );
      const isEmployeeInProbation = confirmationDateMoment.isAfter(moment());
      this.isEmployeeInProbation = isEmployeeInProbation;

    }
  }

  handleCancelModalClick() {
    this.isCropping = false;
    this.imageLoading = false;
    this.modalRef.close();
  }

  open(type) {
    /*    if(this.router.url.includes('view') && this.newRecordOpenType === 'page' && type === 'edit'){
         this.customNewRecordURL = this.router.url.replace('view', 'edit');
       }
       if( this.newRecordOpenType === 'modal'){
         this.modalConfig = {
           modalType: type,
           manageEmployee: true,
           dismissButtonLabel: 'Submit',
           closeButtonLabel: 'Cancel',
           backdrop: 'static',
           keyboard: false,
         };
         const modalRef = this.modalComponent.open();
       }else{
         this.customNewRecordURL !== undefined ?
         this.router.navigateByUrl(this.customNewRecordURL)
         : this.router.navigate([this.router.url, this.btnPrefix.toLocaleLowerCase()]);
       } */


    this.router.navigate(["/employee/employeeList/edit/1"]);
  }
  onFileSelected(event: any): void {


    if (event?.target?.files[0]) {
      this.imageChangedEvent = event;
      this.fileName = event?.target?.files[0]?.name;
      this.isCropping = true;

      this.headerText = "Please crop the image";
      this.modalRef = this.modalService.open(this.cropImage, {
        size: "lg",
        scrollable: false,
        windowClass: "settings-form-modal",
        backdrop: "static",
      });
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Define properties
  imageChangedEvent: any = "";
  croppedImage: any = "";

  // Event handlers
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.blob;

  }

  imageLoaded() {
    // Image loaded callback
  }

  cropperReady() {
    // Cropper ready callback
  }

  loadImageFailed() {
    // Load image failed callback
  }

  onModelSubmit() {
    this.isCropping = false;
    this.imageLoading = true;
    this.modalRef.close();
    var file = new File([this.croppedImage], this.fileName, {
      lastModified: new Date().getTime(),
    });

    if (file) {
      this.s3Service
        .uploadFile(file)
        .then((fileKey: string) => {
          this.uploadedFileKeys = fileKey;
          if (this.uploadedFileKeys) {
            //////////////////////////
            this.apiService
              .put(`core-hr/employee/profile/${this.id}`, {
                profileKey: this.uploadedFileKeys,
              })
              .subscribe({
                next: (res: any) => {
                  if (res) {
                    console.error("uploaded to Db:", res);
                  }
                },
                error: (error: any) => {
                  this.handleError(error);
                },
              });
            //////////////////////////
            this.filteredData["logo"] = this.uploadedFileKeys;
            this.imageLoading = false;
          }
        })
        .catch((error: any) => {
          console.error("Error uploading to S3:", error);
        });
    }
  }

  private handleError(error: any) {
    this.isProcessing = false;
    this.detectedError = true;
    this.cdRef.detectChanges();
    console.error(error);

  }

  onRouterNavigate(url: string, id: number): void {
    if (url) {
      const newTab = window.open("", "_blank");
      newTab.location.href = `${url}/view/${id}`;
    }
  }

  ngOnDestroy(): void {
    this.sharedService.setEmployeeDetails({}, this.id);
    this.tabService.setCurrentTab(0);
  }


  onModelSubmitProfileImage() {

    this.uploadedFileKeys = this.profileImageForm.value.browse

console.log(this.currentProfileImage,'old image key');


    if(this.currentProfileImage){
      this.s3Service.deleteFile(this.currentProfileImage).then(() => {


      }).catch((error: any) => {
        console.error('Error deleting file from S3:', error);
      });
    }

    if (this.uploadedFileKeys) {
      this.uploadFormArray.push({ browse: [this.uploadedFileKeys] });
      //////////////////////////
      this.apiService
        .put(`core-hr/employee/profile/${this.id}`, {
          profileKey: this.uploadedFileKeys,
        })
        .subscribe({
          next: (res: any) => {
            if (res) {

            }
          },
          error: (error: any) => {
            this.handleError(error);
          },
        });
      //////////////////////////
      this.filteredData["logo"] = this.uploadedFileKeys;
      this.imageLoading = false;

      this.modalRefProfileImage.close()
    }
  }


  handleCancelModalClickProfileImage() {
    if (!this.isEditEnabled) {
      this.isfileUploadCancelled = true
    }
    this.modalRefProfileImage.close()
    this.patchFile = [];

  }


  newModel(model, headerText) {
    this.profileImageForm.patchValue({
      browse:null
    })
    this.resetFilePond();
    this.isfileUploadCancelled = false
    this.isEditEnabled = false
    this.currentProfileImage=this.profileImageForm.value.browse
    if (this.filteredData?.logo) {
      this.profileImageForm.patchValue({
           browse:this.filteredData?.logo,
         })
      this.isEditEnabled = true
      this.patchFile.push(this.filteredData?.logo)
    }

    this.headerText = headerText
    this.modalRefProfileImage = this.modalService.open(model, {
      size: 'sm', scrollable: false, windowClass: 'settings-form-modal', backdrop: 'static'
    });
  }

  fileRemovedEvent(event) {


    this.apiService
      .put(`core-hr/employee/profile/${this.id}`, {
        profileKey: '',
      })
      .subscribe({
        next: (res: any) => {
          if (res) {

            this.uploadFormArray = [];
            this.filteredData["logo"] = null;
            this.imageLoading = false;
            this.profileImageForm.patchValue({
              browse: null,
            })
            this.patchFile = [];


          }
        },
        error: (error: any) => {
          this.handleError(error);
        },
      });


  }

  private resetFilePond() {
    this.browseReset = true;
    setTimeout(() => {
      this.browseReset = false;
    }, 1000);
  }





  onuploadFormArrayRemove() {
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
          confirmButton: `btn-${this.theme}`,
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.imageLoading = true;
          if (this.uploadFormArray !== '' || (this.uploadFormArray && this.uploadFormArray?.length > 0)) {
            const removedFileKey = this.uploadFormArray[0].browse[0]


            // User clicked "Yes," proceed with file removal
            this.s3Service.deleteFile(removedFileKey).then(() => {

              this.uploadFormArray = this.uploadFormArray.filter((key) => key !== removedFileKey)
              let files = this.uploadedFileKeys.concat(this.uploadFormArray)
              this.uploadFormArray = [];
              this.fileRemovedEvent(null)
              this.resetFilePond()
              this.patchFile=[]

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


  fileUploadedEvent(event) {

    // this.isfileUploadCancelled = false
    // this.profileImageForm.patchValue({
    //   browse: event?.files,
    // })
    // this.newProfileImage=event?.files
    // this.uploadFormArray = [];
    // if (this.isEditEnabled) {
    //   this.isEditEnabled = false
    // }
  }


}
