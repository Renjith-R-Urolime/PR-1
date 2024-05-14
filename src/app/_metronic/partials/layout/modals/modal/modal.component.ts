import { ChangeDetectorRef, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  currentURL: string;
  isProcessing: boolean;
  isSuccessfull: boolean;
  theme: string = this.sharedService.getTheme();
  pageName: string = this.sharedService.getPageName();
  isDeleteSuccess: boolean;
  id: string;
  onEdit: boolean = false;

  enableProgressButton:boolean = false;
  @Input() customTemplate: TemplateRef<any>;

  @Input() sumbmittingLogo: string = './assets/media/png/success-loading.png';
  @Input() modalLogo: string = './assets/media/gif/success.gif';
  @Input() confirmMessage: string = "Submitting the Form Details...";
  @Input() successMessage: string = "";
  @Input() isButton: boolean = true;
  @Input() modalName: string = 'submit';
  @Output() deleteConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() createdId: string;



  constructor(private router: Router, public modal: NgbActiveModal, private sharedService: SharedService, private route: ActivatedRoute, private cdRef: ChangeDetectorRef) {
    this.currentURL = router.url.split('?')[0];

  }

  detectSuccess(value) {
    this.isDeleteSuccess = value;
    if (this.isDeleteSuccess) {
      this.isProcessing = false;
      this.isSuccessfull = true;
      this.confirmMessage="Successfully Deleted"
      this.cdRef.detectChanges();
    }
  }
  onConfirm() {
    this.enableProgressButton=true;
    this.cdRef.detectChanges();
    // User confirmed delete
    this.deleteConfirmed.emit(true);
  }

  onCancel() {
    // User canceled delete
    this.deleteConfirmed.emit(false);
    this.modal.dismiss();
  }


  ngOnInit(): void {
    let pathArray = this.currentURL.split('/');
    if (pathArray[pathArray.length - 1] === "create") {
      pathArray = pathArray.slice(0, pathArray.length - 1);
    } else {
      pathArray = pathArray.slice(0, pathArray.length - 2);
      this.onEdit = true
    }

    this.currentURL = pathArray.join("/");


    let tempUrl = this.router.url.split('/')
    this.id = tempUrl[tempUrl.length - 1];


    // if (this.modalName === 'submit') {

    if (this.modalName === 'submit') {
        this.isProcessing = false;
        this.isSuccessfull = true;
    }
    else if(this.modalName==='delete'){
      this.isProcessing = true;
    this.isSuccessfull = false;
    }

  }
}
