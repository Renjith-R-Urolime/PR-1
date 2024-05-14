import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiErrorService {

  // errorResponse: any = {};
  private showErrorSubject = new BehaviorSubject<any>(null);
  // public showError$ = this.showErrorSubject.asObservable();
  timeoutId: any;
  constructor(public router: Router) { }

  show(errorResponse: any) {
    if (!this.showErrorSubject.value) {
      this.showErrorSubject.next(errorResponse);
    }
  }

  get showError$() {
    return this.showErrorSubject.asObservable();
  }

  dismiss() {
    this.showErrorSubject.next(null);
  }
  //handling error
  handleError(error: HttpErrorResponse, url?: string) {
    const errorResponse: any = {};
    console.error(error)

    if (error.error && (error.error.message || error.error.details)) {
      errorResponse.message = error.error.message || error.error.details;
    } else {
      switch (error.status) {
        case 400:
          errorResponse.message = 'The server cannot process the request.';
          break;
        case 401:
          errorResponse.message = 'Authentication is required.';
          break;
        case 403:
          errorResponse.message = 'You do not have permission to access this resource.';
          break;
        case 404:
          errorResponse.message = 'The requested resource could not be found.';
          break;
        case 0:
          errorResponse.message = 'Could not connect to the server';
          break
        case 301:
        case 302:
        case 307:
          errorResponse.message = 'CORS Issue';
          break;
        case 500:
          errorResponse.message = 'The server encountered an unexpected condition.';
          break;
        default:
          // For other status codes, set a generic error message
          errorResponse.message = 'Technical Error';
          break;
      }
    }

    errorResponse.fullPage = (error.status === 403 || error.status === 404 ) ? true : false;

    this.show(errorResponse)
    return throwError(() => errorResponse);

    // return errorResponse;
  }
}
