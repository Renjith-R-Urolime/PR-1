import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import 'bootstrap/dist/js/bootstrap.bundle';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ClipboardModule } from 'ngx-clipboard';
import { ConnectionServiceModule } from 'ngx-connection-service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { HeadersInterceptor } from './interceptors/headers.interceptor';
import { appReducer } from './shared/store/app.reducer';
import { tablesReducer } from './shared/store/tables.reducer';
// import {AgmCoreModule} from  '@agm/core';

export function httpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LazyLoadImageModule,
    BrowserAnimationsModule,
    RouterModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    NgxSkeletonLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    ConnectionServiceModule,
    StoreModule.forRoot({tables:tablesReducer, app:appReducer}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyBKOybK6xSV3JkExBXX2oqXuRoviKXnKZM'
    // })
  ],
  providers: [
    // {provide: NgbDateAdapter, useClass: CustomDateAdapter},
    // { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    // {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},
    {
      provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
