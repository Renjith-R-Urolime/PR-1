import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../../../../modules/auth';
import { TranslationService } from '../../../../../../modules/i18n';
@Component({
  selector: 'app-user-inner',
  templateUrl: './user-inner.component.html',
})
export class UserInnerComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px position-absolute header-dropdown-position`;
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';
  userEmail: any;
  userName: any
  verified: any;
  language: LanguageFlag;
  user: any = {
    name: '',
    email: '',
    verified: 'false'
  };
  showCategory: boolean
  langs = languages;
  appUrl: string = environment.appUrl;
  isAccordionOpen = false;
  @Input() accounts: any;

  private unsubscribe: Subscription[] = [];
  data: { id: string; name: string; legalName: string; logo: string; locale: string; url: string; timezone: string; licensedUsers: number; employees: string; statusId: number; vat: string; accountId: string; createdAt: string; updatedAt: string; }[];
  length: number;
  isLoading: boolean;
  accountIds: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private translationService: TranslationService,
    private elementRef: ElementRef,
    private cookieService: CookieService,
    private authService: AuthService,
    private apiService: ApiService,
    private sharedService: SharedService,
    private http: HttpClient,

  ) { }

  getCookieValue(cookieName: string): string {
    return this.cookieService.get(cookieName);
  }

  @HostListener("document:click", ["$event"])
  onClick(event: MouseEvent) {
    if (
      this.showCategory &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.showCategory = false;
    }
  }

  ngOnInit(): void {
    this.setLanguage(this.translationService.getSelectedLanguage());
    //////////////////////////////////////////////////////////////////////////
     // Check if the data is present in session storage
const userDataString = sessionStorage.getItem('userData');

if (userDataString) {
  // Data exists in session storage, parse it and use it
  const userData = JSON.parse(userDataString);

} else {
  // Data doesn't exist in session storage, make API call to fetch it
  this.apiService.get(`core-hr/employee/user`).subscribe({
    next: (res: any) => {
      if (res) {

        // Store the retrieved data in session storage
        sessionStorage.setItem('userData', JSON.stringify(res?.data));
      }
    },
    error: (error: any) => {
      console.error("Error detected while fetching data from API:", error);
    }
  });
}

////////////////////////////////////////////////////////////////////////////////////////

    this.authService.getUserAttributes().then((attributes: any) => {
      for (let i = 0; i < attributes.length; i++) {
        if (attributes[i].getName() === "name") {
          this.user.name = attributes[i].getValue();
        }
        if (attributes[i].getName() === "email_verified") {
          this.user.verified = attributes[i].getValue();
        }
        if (attributes[i].getName() === "email") {
          this.user.email = attributes[i].getValue();
        }
      }
    }
    )
      .catch(error => {
        console.error("Error getting user attributes:", error);
      });
    this.accountIds = localStorage.getItem('accountIds');
    // this.apiService.get(`accounts/info?accounts=${this.accountIds}`).subscribe({

    //   next: (res: any) => {
    //     this.data = res.data;
    //     this.length = this.data.length
    //     this.filterAccountData();
    //   },
    //   error: (error: any) => {
    //     console.error(error);
    //   }
    // });
    this.data = [
      {
        "id": "2",
        "name": "Apple",
        "legalName": "Apple INC.",
        "logo": "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png",
        "locale": "en",
        "url": "apple.com",
        "timezone": "US",
        "licensedUsers": 10,
        "employees": "2000",
        "statusId": 1,
        "vat": "2345",
        "accountId": "5555555",
        "createdAt": "2023-07-05T13:05:01.000Z",
        "updatedAt": "2023-07-05T13:05:05.000Z"
      },
      {
        "id": "1",
        "name": "kpi",
        "legalName": "KPI Suite",
        "logo": "https://kpi.co/assets/images/logo-colour.svg",
        "locale": "en",
        "url": "kpi.co",
        "timezone": "Dubai",
        "licensedUsers": 2,
        "employees": "30",
        "statusId": 1,
        "vat": "12345",
        "accountId": "6666666",
        "createdAt": "2023-07-05T13:02:54.000Z",
        "updatedAt": "2023-07-05T13:02:57.000Z"
      }
    ]
    this.length = this.data.length
    this.filterAccountData()

    this.sharedService.getAccountIds().subscribe((accountIds) => {

      this.accountIds = accountIds;
    });
  }

  filterAccountData() {
    const urlParts = window.location.hostname.split('.');
    const accountIdFromUrl = urlParts[0];

    this.data = this.data.filter(account => account.accountId !== accountIdFromUrl);
  }


  switchAccount(account: any) {
    if (environment.live) {
      window.location.href = `https://${account.accountId}.${this.appUrl}/dashboard`;
    } else {
      window.location.href = `http://${account.accountId}.${this.appUrl}/dashboard`;
    }
  }


  logout() {
    this.auth.logout();
    localStorage.clear();
    sessionStorage.clear();
    // localStorage.setItem("isLoggedIn", 'false');
    // this.router.navigate(['/auth/login']);
    // document.location.reload();
  }
  companyInfo() {
    this.router.navigate(['/company/company-info']);

  }
  selectLanguage(lang: string) {
    this.translationService.setLanguage(lang);
    this.setLanguage(lang);
    // document.location.reload();
  }

  setLanguage(lang: string) {
    this.langs.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

const languages = [
  {
    lang: 'en',
    name: 'English',
    flag: './assets/media/flags/united-states.svg',
  },
  {
    lang: 'zh',
    name: 'Mandarin',
    flag: './assets/media/flags/china.svg',
  },
  {
    lang: 'es',
    name: 'Spanish',
    flag: './assets/media/flags/spain.svg',
  },
  {
    lang: 'ja',
    name: 'Japanese',
    flag: './assets/media/flags/japan.svg',
  },
  {
    lang: 'de',
    name: 'German',
    flag: './assets/media/flags/germany.svg',
  },
  {
    lang: 'fr',
    name: 'French',
    flag: './assets/media/flags/france.svg',
  },
];
