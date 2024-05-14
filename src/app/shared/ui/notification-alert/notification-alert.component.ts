import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SurveyModelComponent } from 'src/app/shared/ui/survey-model/survey-model.component';
import { SharedService } from '../../services/shared.service';
// import { Modal } from 'bootstrap';
import { RunPayrollModalComponent } from '../run-payroll-modal/run-payroll-modal.component';

@Component({
  selector: 'notification-alert',
  templateUrl: './notification-alert.component.html'
})
export class NotificationAlertComponent implements OnInit {
  constructor(private cdRef: ChangeDetectorRef, private sharedService: SharedService, private modalService: NgbModal) { }
  @Input() theme: string = this.sharedService.getTheme();
  @Input() notificationHeader: any = "Header";
  @Input() notificationSubHeading: any = "Short Sub Heading";
  @Input() buttonOpenText: any = "Open";
  @Input() buttonCloseText: any = "Cancel";
  @Input() modalType: string = null
  modalRef:any;
  isLoading: boolean;
  playVideo: boolean = false;

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.cdRef.detectChanges();
    }, 100);

  }

  openModal(content){
    if(this.modalType === "survey"){
      this.modalRef = this.modalService.open(SurveyModelComponent, {
        centered: true,
        size: 'lg',
        windowClass: 'full-screen-modal',
        backdrop: 'static',
        keyboard: false
      });
    }
    if(this.modalType === "announcement"){
      this.modalRef = this.modalService.open(content, {
        centered: true,
        size: 'full',
        windowClass: 'full-screen-modal',
        backdrop: 'static',
        keyboard: false
      });
    }
    if(this.modalType === "run-payroll"){
      this.modalRef = this.modalService.open(RunPayrollModalComponent, {
        centered: true,
        size: 'fit',
        windowClass: 'full-screen-modal',
        backdrop: 'static',
        keyboard: false
      });
    }
  }

  onModalClose(){
    this.playVideo = false;
    this.modalRef.close();
  }

  open() {
    // const modalRef =
    this.modalService.open(SurveyModelComponent, {
      centered: true,
      size: 'lg',
      windowClass: 'full-screen-modal',
      backdrop: 'static',
      keyboard: false
    });
  }
}
