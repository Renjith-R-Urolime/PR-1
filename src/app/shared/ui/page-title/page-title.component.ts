import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { capitalCase } from 'change-case-all';
import { Subscription } from 'rxjs';
import { ModalComponent } from 'src/app/_metronic/partials';
import { AdditionalOptionsDirective, CreateButtonTemplateDirective, DropdownButtonTemplateDirective } from '../../directive/custom-template.directive';
import { ApiService } from '../../services/api.service';
import { DynamicFormService } from '../../services/dynamic-form.service';
import { SharedService } from '../../services/shared.service';
@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})

export class PageTitleComponent implements OnInit {
  theme: string = this.sharedService.getTheme();
  title: string = this.sharedService.getPageName();
  isLoading: boolean = false;
  currentPath: string = '';
  currentUrl:any;
  deleteAPI:any;
  recordId:number;
  newBtnText: string = this.title;
  routeSub: Subscription | undefined;
  titlePrefix:string = ''
  formPaths = ['create', 'edit', 'customise'];

  // Custom Templates
  @ContentChild(DropdownButtonTemplateDirective, { read: TemplateRef }) dropdownButtonTemplate: TemplateRef<any>;
  @ContentChild(CreateButtonTemplateDirective, { read: TemplateRef }) customCreateButtonTemplate: TemplateRef<any>;
  @ContentChild(AdditionalOptionsDirective, { read: TemplateRef }) additionalOptions: TemplateRef<any>;


  // INPUT VALUES
  @Output() Save = new EventEmitter<void>();
  @Input() search: boolean
  @Input() isGoBack: boolean = false;
  @Input() isNewButton: boolean = false;
  @Input() isSaveButton: boolean = false;
  @Input() isPayRollButton: boolean = false;
  @Input() btnPrefix: string = 'Create';
  @Input() customNewRecordURL: string;
  @Input() newRecordOpenType: string = 'modal';
  @Input() isEditDeleteBtn: boolean = false;
  @Input() editToggle: boolean = false;
  @Input() confirmationModal: string = ''

  // TO BE REMOVED
  @Input() formSection: any
  @Input() formData: any
  @Input() wizardData: any
  @Input() trapezoidTabs: any
  @Input() trapizoid: any
  @Input() breadcrumbTrail: string[];
  @Input() formType: string = 'withoutSection';
  @Input() sub = ''
  @Input() empSettingModel: boolean = true;
  private modalRef: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private cdRef: ChangeDetectorRef,
    private dynamicFormService: DynamicFormService,
    private apiService: ApiService,
    public sharedService: SharedService,
    private router: Router, private _location: Location,
    private route: ActivatedRoute,
    ) {

  }

  currentPage: string;


  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.recordId = params['id'];
    });
    this.titlePrefix = capitalCase(this.formPaths.find(path => this.router.url?.split('?')[0].includes(path)) || '');

  }
  goBack() {
    this.sharedService.closeSideBar();
    const urlSegments = this.router.url.split('/').map(segment => segment.toLowerCase());
    if (urlSegments.includes('create')) {
      this.router.navigate(['../'], { relativeTo: this.route });
    } else if (urlSegments.includes('edit') || urlSegments.includes('view')) {
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else {
      this._location.back();
      // this.router.navigate(['/dashboard']);
    }
  }

  async deletePopup() {
    this.deleteAPI = await this.sharedService.getCurrentApi();

    this.modalRef = this.modalService.open(ModalComponent, {
      centered: true,
      size: 'fit',
      windowClass: 'full-screen-modal',
      backdrop: 'static',
      keyboard: false
    });

    this.modalRef.componentInstance.successMessage = "Successfully Deleted";
    this.modalRef.componentInstance.confirmMessage = "Are you sure you want to delete";
    this.modalRef.componentInstance.sumbmittingLogo = './assets/media/icons/trash-outline-custom.svg';
    this.modalRef.componentInstance.modalLogo = './assets/media/gif/success.gif';
    this.modalRef.componentInstance.isButton = 'true';
    this.modalRef.componentInstance.modalName = 'delete';

    // Wait for the confirmation from DeleteConfirmModelComponent
    this.modalRef.componentInstance.deleteConfirmed.subscribe((confirmed: boolean) => {
      if (confirmed && this.deleteAPI !== undefined) {


        // Call your API for delete
        this.apiService.delete(`${this.deleteAPI.url}/${this.recordId}`).subscribe({
          next: (response: any) => {
            if (response) {
              this.modalRef.componentInstance.detectSuccess(true);
              this.backToList();
            }
          },
          error: (error: any) => {
            console.error("Error while deleting:", error);
            // Handle error here (show message to user or log the error)
          }
        });
      }
    });
  }

  open(type) {
    this.sharedService.closeSideBar();

    if (this.router.url.includes('view') && type === 'edit') {
      this.customNewRecordURL = this.router.url.replace('view', 'edit');
    }
    if (this.customNewRecordURL) {
      this.router.navigateByUrl(this.customNewRecordURL);
    }
    else {
      let currentPath = this.router.url.split('?')[0];
      this.router.navigateByUrl(currentPath + '/' + this.btnPrefix.toLocaleLowerCase());
    }
  }



  backToList() {
    this._location.back();
  }
}
