import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Observable, Subscription, of } from "rxjs";
import { catchError, first } from "rxjs/operators";
// import { UserModel } from '../../models/user.model';
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { ApiService } from "src/app/shared/services/api.service";
import { environment } from "src/environments/environment";
import { AuthService } from "../../services/auth.service";
import { rightSectionData, updatesData } from "../login-page/login-page.data";
// import  {environmentUrl}  from 'src/environments/environment.server';
import { HttpClient } from "@angular/common/http";
import { SharedService } from "src/app/shared/services/shared.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  pin;
  textStyle: string;
  Lang = "en";
  recoverMsg = "";
  enableQrcode = false;
  qrCode;
  showPassword: boolean = false;
  public showPasswordOnPress: boolean;
  enableArabic: boolean = true;
  enableEnglish: boolean;
  mfaCodeSection: boolean = false;
  newPasswordSetup: boolean = false;
  mfaType = "SOFTWARE_TOKEN_MFA";
  otp: string = "";
  loginForm: FormGroup;
  newPasswordForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  rightSectionData = rightSectionData;
  updatesData = updatesData;
  verificationCode: any;
  selectedContent: any = this.rightSectionData[0];
  appUrl: string = environment.appUrl;
  selectedAccountId: string;
  modalRef: NgbModalRef;
  isMultipleAccounts: boolean = false;
  @ViewChild("accountSelectionModal") accountSelectionModal: TemplateRef<any>;
  // private fields
  private unsubscribe: Subscription[] = [];
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: "",
    inputStyles: {
      width: "60px",
      height: "60px",
    },
  };
  headerText: any;
  accountIds: any;
  data: any;
  apiUrl: any;
  accounts: string[];
  urlAccountID: string;
  constructor(
    public translate: TranslateService,
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal,
    private apiService: ApiService,
    private http: HttpClient,
    private sharedService: SharedService
  ) {
    this.isLoading$ = this.authService.isLoading$;
  }
  togglePasswordFieldType() {
    this.showPassword = !this.showPassword;
  }
  ngOnInit(): void {
    this.initForm();
    this.authService.clearUserCache();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams["returnUrl".toString()] || "/dashboard";
    this.urlAccountID = this.authService.getAccountIdFromHost();
  }
  get f() {
    return this.loginForm.controls;
  }
  initForm() {
    this.loginForm = this.fb.group({
      email: [
        undefined,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
        undefined,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
        ]),
      ],
      rememberDevice: [],
    });
    this.newPasswordForm = this.fb.group(
      {
        password: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100),
          ]),
        ],
        confirmPassword: [
          "", // Add the custom validator function to the confirmPassword control
        ],
      },
      {
        validator: [this.matchPassword, this.customPasswordValidator],
      }
    );
    // Listen to changes on the "password" control and trigger validation for "confirmPassword"
    this.newPasswordForm.get("password")?.valueChanges.subscribe(() => {
      this.newPasswordForm.get("confirmPassword")?.updateValueAndValidity();
    });
    const npf = this.newPasswordForm.controls;
    // Check if either password or confirmPassword has a value
    if (npf["password"].value || npf["confirmPassword"].value) {
      // Set touched to true for both controls
      npf["password"]?.markAsTouched();
      npf["confirmPassword"]?.markAsTouched();
    }
  }
  matchPassword(control: AbstractControl): void {
    const password = control.get("password")?.value;
    const confirmPassword = control.get("confirmPassword")?.value;
    if (password !== "" && password !== confirmPassword) {
      control.get("confirmPassword")?.setErrors({ passwordsMismatch: true });
    }
  }
  customPasswordValidator(control: AbstractControl): void {
    const value: string = control.get("password")?.value;
    // Use a single regex to check all password conditions
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/\-|=])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\\/\-|=]{1,}$/;
    if (!passwordRegex.test(value)) {
      control.get("password")?.setErrors({
        isAlpha: !/[a-zA-Z]/.test(value),
        isNumeric: !/\d/.test(value),
        isSpecial: !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/\-|=]/.test(value),
        isLowerCase: !/[a-z]/.test(value),
        isUpperCase: !/[A-Z]/.test(value),
      });
    }
  }
  async submit() {
    this.hasError = false;
    const loginSubscr = this.authService
      .login(
        this.f.email.value,
        this.f.password.value,
        this.mfaType,
        this.otp,
        this.f.rememberDevice.value,
        this.newPasswordForm.controls["password"].value
      )
      .pipe(
        first(),
        catchError((error) => {
          console.error("Error during login:", error);
          this.hasError = true;
          return of(false);
        })
      )
      .subscribe(async (authenticated: boolean) => {
        if (authenticated["status"]) {
          const accountIds = authenticated["accountIds"];
          this.isMultipleAccounts = accountIds.length > 1;
          if (this.isMultipleAccounts && this.urlAccountID === null) {
            // Fetch accounts information
            this.apiService
              .get(`accounts/info?accounts=${accountIds.join(",")}`)
              .subscribe({
                next: (res: any) => {
                  this.data = res.data;
                  this.accounts = res.data;
                  this.openModal(
                    this.accountSelectionModal,
                    "Select Account ID"
                  );
                  // Open the modal before making the API call
                },
                error: (error: any) => {
                  console.error(error);
                },
              });
          } else {
            if (accountIds.includes(this.urlAccountID)) {
              this.redirectToDashboard(this.urlAccountID);
              return;
            } else {
              this.redirectToDashboard(accountIds[0]);
              return;
            }
          }
          this.mfaCodeSection = false;
          this.newPasswordSetup = false;
        } else {
          if (authenticated["type"] === "newPasswordRequired") {
            this.newPasswordSetup = true;
            this.mfaCodeSection = false;
          }
          if (authenticated["type"] === "totpRequired") {
            this.mfaCodeSection = true;
            this.newPasswordSetup = false;
          }
        }
      });
    this.unsubscribe.push(loginSubscr);
  }
  openModal(model, headerText) {
    this.headerText = headerText;
    this.modalRef = this.modalService.open(model, {
      size: "md",
      scrollable: false,
      windowClass: "settings-form-modal",
      backdrop: "static",
    });
  }
  onCompanyCardClick(accountId: string) {
    this.selectedAccountId = accountId;
  }
  handleSelectAccountClick() {
    this.redirectToDashboard(this.selectedAccountId);
    this.modalRef.close();
  }
  handleCancelModalClickAccountSelection() {
    this.modalRef.dismiss();
  }
  private redirectToDashboard(accountId: string) {
    if (environment.live) {
      window.location.href = `https://${accountId}.${this.appUrl}/dashboard`;
    } else {
      window.location.href = `http://${accountId}.${this.appUrl}/dashboard`;
    }
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  onOtpChange(otp) {
    this.otp = otp;
  }
  convertor(lang) {
    if (lang === "ar") {
      this.textStyle = "rtl";
      this.enableArabic = false;
      this.enableEnglish = true;
    } else {
      this.textStyle = "ltr";
      this.enableArabic = true;
      this.enableEnglish = false;
    }
    this.translate.use(lang);
  }
  recoverMFA() {
    // this.mfaType = "SMS_MFA";
    this.enableQrcode = true;
    // this.submit();
    // this.recoverMsg = "Enter a verification code that we send to your phone"
  }
  getQrcode() {
    this.qrCode = true;
    this.enableQrcode = false;
    this.qrCode = `otpauth://totp/${this.f.email.value}?secret=${this.verificationCode}&issuer=Cognito-TOTP-MFA`;
  }
}
