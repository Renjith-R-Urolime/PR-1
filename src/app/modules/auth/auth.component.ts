import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { rightSectionData, updatesData } from './components/login-page/login-page.data';
import { AuthService } from './services/auth.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '<body[root]>',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  today: Date = new Date();
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
   hasError: boolean;
   returnUrl: string;
   isLoading$: Observable<boolean>;
   autoSlideInterval: number = 2000;
   private unsubscribe: Subscription[] = [];
   constructor(public translate: TranslateService,
     private authService: AuthService,
     private route: ActivatedRoute,
     private router: Router,
     private cdRef: ChangeDetectorRef,
     private sharedService: SharedService
   ) {
     this.isLoading$ = this.authService.isLoading$;
     // redirect to home if already logged in
     /* if (this.authService.currentUserValue) {
       this.router.navigate(['/']);
     } */
     translate.setDefaultLang('en');
     translate.addLangs(['en', 'ar']);
     const browserLang = translate.getBrowserLang();
     translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');
     this.enableArabic = true;
     // this.breakSentenceIntoLines(10);
   }
   ngOnInit(): void {
    document.body.classList.add('bg-body');
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/dashboard';
  }
  ngOnDestroy() {
    document.body.classList.remove('bg-body');
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
