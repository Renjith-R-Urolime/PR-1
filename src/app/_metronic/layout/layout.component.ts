import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { ApiErrorService } from 'src/app/shared/services/api-error.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { setDropdownValues, setPermissions } from 'src/app/shared/store/app.actions';
import { fieldMappings } from 'src/app/shared/services/json-list/json-list-mapping';
import { LayoutInitService } from './core/layout-init.service';
import { LayoutService } from './core/layout.service';
import { JsonListService } from 'src/app/shared/services/json-list/json-list.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, AfterViewInit {
  headerText = "enter text here";
  // Public variables
  selfLayout = 'default';
  asideSelfDisplay: true;
  asideMenuStatic: true;
  contentClasses = '';
  contentContainerClasses = '';
  toolbarDisplay = true;
  contentExtended: false;
  asideCSSClasses: string;
  asideHTMLAttributes: any = {};
  headerMobileClasses = '';
  headerMobileAttributes = {};
  footerDisplay: boolean;
  footerCSSClasses: string;
  headerCSSClasses: string;
  headerHTMLAttributes: any = {};
  // offcanvases
  extrasSearchOffcanvasDisplay = false;
  extrasNotificationsOffcanvasDisplay = false;
  extrasQuickActionsOffcanvasDisplay = false;
  extrasCartOffcanvasDisplay = false;
  extrasUserOffcanvasDisplay = false;
  extrasQuickPanelDisplay = false;
  extrasScrollTopDisplay = false;
  asideDisplay: boolean;

  progress: number = 0;
  isProgress: boolean = true;
  loadTime: number = 0;
  jsonLists: any = fieldMappings;
  isError:boolean = false;
  isContent:boolean = false;


  @ViewChild('ktAside', { static: true }) ktAside: ElementRef;
  @ViewChild('ktHeaderMobile', { static: true }) ktHeaderMobile: ElementRef;
  @ViewChild('ktHeader', { static: true }) ktHeader: ElementRef;

  constructor(
    private initService: LayoutInitService,
    private layout: LayoutService,
    private sharedService: SharedService,
    private jsonListService: JsonListService,
    private router: Router,
    private apiErrorService: ApiErrorService,
      private apiService: ApiService,  private store: Store
  ) {
    this.initService.init();
  }

  ngOnInit(): void {
    // build view by layout config settings
    this.asideDisplay = this.layout.getProp('aside.display') as boolean;
    this.toolbarDisplay = this.layout.getProp('toolbar.display') as boolean;
    this.contentContainerClasses = this.layout.getStringCSSClasses('contentContainer');
    this.asideCSSClasses = this.layout.getStringCSSClasses('aside');
    this.headerCSSClasses = this.layout.getStringCSSClasses('header');
    this.headerHTMLAttributes = this.layout.getHTMLAttributes('headerMenu');
    this.footerCSSClasses = this.layout.getStringCSSClasses('footer')
    this.loadTime = 100 / Object.keys(this.jsonLists).length
    this.initLoad();

    // Subscribe to route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
         this.apiErrorService.dismiss();
      });

    this.apiErrorService.showError$.subscribe(data => {
      this.isError = data
    })
  }

  ngAfterViewInit(): void {
    if (this.ktHeader) {
      for (const key in this.headerHTMLAttributes) {
        if (this.headerHTMLAttributes.hasOwnProperty(key)) {
          this.ktHeader.nativeElement.attributes[key] =
            this.headerHTMLAttributes[key];
        }
      }
    }
  }


  initLoad(){
    this.startTimer();
    Object.keys(this.jsonLists).forEach( async name => {
      try{
        this.jsonListService.getDataList(name);
        if(this.loadTime < 100){
          this.loadTime +=  100 / Object.keys(this.jsonLists).length;
          this.startTimer();
        }
      }catch(error){
        if(this.loadTime < 100){
          this.loadTime +=  100 / Object.keys(this.jsonLists).length;
        this.startTimer();
        }
      }
    });
  }

  startTimer(){
    let loader = setInterval(() => {
      if(this.progress <= this.loadTime ) {
        this.progress += 1;
        if( this.progress > 100){
          clearInterval(loader);
          this.isProgress = false
        }
      }
    }, 4);
  }
}
