import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'app-progress-button',
  templateUrl: './progress-button.component.html',
  styleUrls: ['./progress-button.component.scss']
})
export class ProgressButtonComponent implements OnInit {
  theme: string = this.sharedService.getTheme();
  @Input() submitBtnText: string = 'Submit';
  @Input() cancelBtnText: string = 'Cancel';
  @Input() isCancelBtn: boolean = true;
  @Input() isDraftBtn: boolean = false
  @Input() isProcessing: boolean = false;
  @Input() modal: boolean = false;
  @Input() isSubmitBtnDisabled: boolean = false;
  @Output() submitEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  isLoading: boolean;

  constructor(private _location: Location, private sharedService : SharedService, private apiService : ApiService) {
    this.apiService.$isProcessing.subscribe( value => {
          this.isProcessing = value;
    })

  }

  ngOnInit(): void {

  }

  goCancel() {
    this.cancelEvent.emit(true)
    if(!this.modal){
      this.goBack()
    }
  }

  goBack() {
    this._location.back();
  }

  onSubmit() {
    this.submitEvent.emit(true)
  }
}
