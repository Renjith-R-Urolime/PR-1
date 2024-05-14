import { animate, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { SubSink } from 'subsink';
import { ApiErrorService } from '../../services/api-error.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.scss'],
  animations: [
    trigger('errorMessageAnimation', [
      transition(':enter', [
        style({
          right: '50%',
          transform: 'translate(50%, -70px)'
        }),
        animate('0.6s', style({
          right: '50%',
          transform: 'translate(50%, -13px)'
        }))
      ]),
      transition(':leave', [
        animate('0.6s', style({
          right: '50%',
          transform: 'translate(50%, -70px)'
        }))
      ])
    ])
  ]
})
export class ErrorPopupComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  error: any;
  errorMessage: string = '';
  errorStatus: number = 0;
  pageName: string = this.sharedService.getPageName();
  icon: string = this.sharedService.getModuleIcon();
  theme: string = this.sharedService.getTheme();

  constructor(
    private apiErrorService: ApiErrorService,
    private sharedService: SharedService,
    private _location: Location,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    this.subs.sink = this.apiErrorService.showError$.subscribe(data => {
      if(data){
        this.error = data;
        this.errorStatus = this.error?.status;

        if (this.errorStatus === 401) {
          this.auth.logout();
        }
        if (this.error.message) {
          this.errorMessage = this.error.message;
        } else if (this.error.details) {
          this.errorMessage = this.error.details.join(', ');
        }
        setTimeout(() => {
          this.apiErrorService.dismiss()
        }, 10000)
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  goBack() {
    this._location.back();
  }
  onRefresh(){
    location.reload();
  }
}
