
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/_metronic/partials';
import { DetailsCardData } from 'src/app/shared/meta-interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { detailsCardMeta, tabsMeta } from '../employee-exit.data';
@Component({
  selector: 'app-employee-exit-view',
  templateUrl: './employee-exit-view.component.html',
  styleUrls: ['./employee-exit-view.component.scss']
})
export class EmployeeExitViewComponent {
  detailsCardData: DetailsCardData={
    meta: detailsCardMeta,
          data: []
  };
  employeeExitTabsMeta = tabsMeta;
  id;
  private modalRef: NgbModalRef;
  theme: string = this.sharedService.getTheme()
  constructor(private sharedService: SharedService, private router: Router, private route: ActivatedRoute, private apiService: ApiService, private modalService: NgbModal, private _location: Location) { }


  ngOnInit() {
    const routeSub = this.route.params.subscribe(params => {
      // Access route parameters here
      this.id = params['id'];
    });

  }
  open(type: string) {
    this.sharedService.closeSideBar();

    let targetUrl: string;
    let queryParams: any = {};


    const currentParams = this.route.snapshot.queryParams;

    if (type === 'edit') {
      targetUrl = this.router.url.replace('view', 'edit');
    } else if (type === 'gen-ff-summary') {
      targetUrl = '';
    }
    this.router.navigate([targetUrl]);


  }


  async deletePopup() {
    const deleteAPI = await this.sharedService.getCurrentApi();

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
      if (confirmed && deleteAPI !== undefined) {


        // Call your API for delete
        this.apiService.delete(`${deleteAPI.url}/${this.id}`).subscribe({
          next: (response: any) => {

            if (response) {
              this.modalRef.componentInstance.detectSuccess(true);
              this._location.back();
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





}
