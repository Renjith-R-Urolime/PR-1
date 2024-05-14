import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AuthService } from '../../services/auth.service';
import { rightSectionData, updatesData } from './login-page.data';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy{
  // theme: string = this.sharedService.getTheme();
  textStyle: string;
  Lang = 'en';
  enableArabic: boolean;
  enableEnglish: boolean;
  rightSectionData = rightSectionData;
  updatesData = updatesData;
  selectedContent:any = this.rightSectionData[0]
  defaultAuth: any = {
    email: 'admin@kpi.co',
    password: 'K9W-v8M0'
  };
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  autoSlideInterval: number = 2000;
  private unsubscribe: Subscription[] = [];
  constructor(public translate: TranslateService,
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private sharedService: SharedService
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    translate.setDefaultLang('en');
    translate.addLangs(['en', 'ar']);
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');
    this.enableArabic = true;
    // this.breakSentenceIntoLines(10);
  }
  ngOnInit(): void {

    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/dashboard';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
  initForm() {
    this.loginForm = this.fb.group({
      email: [
        this.defaultAuth.email,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
        ]),
      ],
    });
  }
  submit() {
    this.hasError = false;
    const loginSubscr = this.authService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe((authenticated: boolean) => {
        if (authenticated) {

          this.router.navigate(['/dashboard']);
        } else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(loginSubscr);
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
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
}
