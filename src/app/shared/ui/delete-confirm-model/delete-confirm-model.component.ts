import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-delete-confirm-model',
  templateUrl: './delete-confirm-model.component.html',
  styleUrls: ['./delete-confirm-model.component.scss']
})
export class DeleteConfirmModelComponent {

  @Output() deleteConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();



  constructor( private sharedService : SharedService, 
    public activeModal: NgbActiveModal) {}


  //public modal: NgbActiveModal;
  theme: string = this.sharedService.getTheme();

 


  onConfirm() {
    // User confirmed delete
    this.deleteConfirmed.emit(true);
    this.activeModal.close();
  }

  onCancel() {
    // User canceled delete
    this.deleteConfirmed.emit(false);
    this.activeModal.dismiss();
  }

  

}
