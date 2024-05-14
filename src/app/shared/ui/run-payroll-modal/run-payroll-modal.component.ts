import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-run-payroll-modal',
  templateUrl: './run-payroll-modal.component.html',
  styleUrls: ['./run-payroll-modal.component.scss']
})
export class RunPayrollModalComponent {

  @Input() theme = this.sharedService.getTheme() || 'purple';
  isSuccessfull = false;
  isProcessing = false;
  constructor(public modal: NgbActiveModal, private sharedService: SharedService,
    private router: Router,

    ) { }

  onProcessApproved(){
    this.isProcessing = true;
    setTimeout(() => {
      this.isProcessing = false;
      this.isSuccessfull = true;

    },3000)
  }
  backToRunPayroll(){
    this.router.navigate(['/payroll-management/run-payroll']);

  }
}
