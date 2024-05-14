import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { ConfirmPasswordValidator } from '../registration/confirm-password.validator';

enum ErrorStates {
  NotSubmitted,
  HasError,
  NoError,
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  textStyle: string;
  enableArabic:boolean = true;
  enableEnglish:boolean;
  otp:any;
  otpError:string = '';
  forgotPasswordForm: FormGroup;
  resetPasswordForm: FormGroup;
  errorState: ErrorStates = ErrorStates.NotSubmitted;
  errorStates = ErrorStates;
  isLoading$: Observable<boolean>;
  hasError:string;
  emailSection:boolean = true;
  otpSection:boolean = false;
  resetSection:boolean = false;
  successSection:boolean = false;
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '60px',
      'height': '60px'
    }
  };
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  constructor(private fb: FormBuilder, private authService: AuthService,public translate: TranslateService, private router:Router,private route: ActivatedRoute,private cdRef: ChangeDetectorRef,) {
    this.isLoading$ = this.authService.isLoading$;
  }

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.forgotPasswordForm.controls;
  }

  initForm() {
    this.forgotPasswordForm = this.fb.group({
      email: [
        'admin@kpi.co',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
    });
    this.resetPasswordForm = this.fb.group({
      password: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
        ]),
      ],
      cPassword: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
        ]),
      ]
    },
    {
      validator: ConfirmPasswordValidator.MatchPassword,
    });
  }

  submit() {
    if(this.forgotPasswordForm.invalid){
      return ;
    }
    this.errorState = ErrorStates.NotSubmitted;
    this.resendOtp();
    // this.emailSection = false;
    // this.otpSection = true;
  }
  verifyOtp(){
    if(this.otp){
      this.otpError = "";
      this.otpSection = false;
      this.resetSection = true;

    }
    else{
      this.otpError = "Otp is required";
    }
  }
  onOtpChange(otp) {
    this.otp = otp;
  }
  updatePassword(){
    if(this.resetPasswordForm.invalid){
      return ;
    }
    const resetPasswordSubscr = this.authService
      .resetPassword(this.f.email.value,this.resetPasswordForm.controls.password.value,this.otp)
      .pipe(first())
      .subscribe((result: boolean) => {
        if(result){
          this.router.navigate(['/auth/login']);
        }
        else {
          this.hasError = 'Incorrect otp';
        }
        this.errorState = result ? ErrorStates.NoError : ErrorStates.HasError;
      });
    this.unsubscribe.push(resetPasswordSubscr);
  }

  resendOtp(){
    const forgotPasswordSubscr = this.authService
    .forgotPassword(this.f.email.value)
    .pipe(first())
    .subscribe((result: boolean) => {
      if(result){
        this.emailSection = false;
        this.otpSection = true;
      }
      else {
        this.hasError = 'Something went wrong';
      }
      this.errorState = result ? ErrorStates.NoError : ErrorStates.HasError;
    });
  this.unsubscribe.push(forgotPasswordSubscr);
  }
  convertor(lang) {
    if (lang === 'ar') {
      this.textStyle = "rtl";
      this.enableArabic = false;
      this.enableEnglish = true;
    }
    else {
      this.textStyle = "ltr";
      this.enableArabic = true;
      this.enableEnglish = false;
    }


    this.translate.use(lang);
  }
  resetPassword(){
    this.resetSection = false;
      this.successSection = true;

  }
  backToLogin(){
    this.router.navigate(['/auth/login']);
  }
}
