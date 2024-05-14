import { Component, OnInit } from '@angular/core';
import { TranslationService } from './modules/i18n';
// language list
import { ThemeModeService } from './_metronic/partials/layout/theme-mode-switcher/theme-mode.service';
import { environment } from 'src/environments/environment';

@Component({
  // tslint:disable-next-line:component-selector
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  constructor(
    private translationService: TranslationService,
    private modeService: ThemeModeService,
  ) {
    localStorage.setItem('appVersion', environment.appVersion);

    if (localStorage.getItem('isLoggedIn') === null) {
      localStorage.setItem('isLoggedIn', 'false');
    }
    // register translations
    // this.translationService.loadTranslations(enLang,chLang,esLang,jpLang,deLang,frLang);
  }

  ngOnInit() {
    this.modeService.init();
    // this.loadTime = 100 / this.baseApiList.length
    // this.initLoad();
  }
}
