import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  DrawerComponent,
  MenuComponent,
  ScrollComponent,
  ToggleComponent,
} from 'src/app/_metronic/kt/components';
import { LayoutService } from 'src/app/_metronic/layout/core/layout.service';
import { ApiErrorService } from 'src/app/shared/services/api-error.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { setSubMenuLinks } from 'src/app/shared/store/app.actions';
import { RenamedTabs, Subtab, Tab } from '../../tabs';

@Component({
  selector: 'app-submenu-tab',
  templateUrl: './submenu-tab.component.html',
  styleUrls: ['./submenu-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmenuTabComponent implements OnInit, OnDestroy {
  @Input() activeTab: Tab;
  renamedTabs = RenamedTabs
  subMenuOpen: boolean = false;
  subMenuId: string = '';
  @ViewChild('ktAsideScroll', { static: true }) ktAsideScroll: ElementRef;
  private unsubscribe: Subscription[] = [];
  dynamicLinks: any = []
  disableCalculateMenuItemCssClass : boolean = false;
  dataStore: any
  currentURL: string;
  constructor(private store: Store, private router: Router, private layout: LayoutService, private sharedService: SharedService, private apiErrorService: ApiErrorService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    MenuComponent.bootstrap()
    this.currentURL = this.router.url
    // this.layout.subDropdown$.subscribe(val => {
    //   if(val){
    //     this.subMenuOpen = val;
    //     this.cdRef.detectChanges();
    //   }else{
    //     setTimeout(() => {
    //       this.subMenuOpen = val;
    //       this.cdRef.detectChanges();
    //     }, 260)
    //   }
    // });
  }

  onClick(tab: Subtab, isSubDropdown: boolean, sub?) {

    // this.clickedId = tab.id
    // MenuComponent.getTriggerElement();
    // this.layout.setSubMenuDropdown(false);
    const newRouteUrl = this.getRouteUrl(tab, isSubDropdown, sub)
    if (this.router.url !== newRouteUrl) {
      this.apiErrorService.dismiss();
      this.currentURL = ''
      this.router.navigateByUrl('/module-loading', { skipLocationChange: true }).then(() => {
        this.router.navigate([newRouteUrl]);
        this.routingChanges();
      });
    }
    this.sharedService.closeSideBar();
    // this.cd.detectChanges();
  }

  getRouteUrl(tab: Subtab, isSubDropdown: boolean, sub?): string {
    let url;
    if (isSubDropdown) {
      url = this.activeTab.mainMenuLink + tab.subMenuLink + sub.subMenuLink
    }
    else {
      url = this.activeTab.mainMenuLink + tab.subMenuLink
    }
    return url;
  }

  routingChanges() {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.menuReinitialization();
      }
    });
    this.unsubscribe.push(routerSubscription);
  }

  menuReinitialization() {
    setTimeout(() => {
      MenuComponent.reinitialization();
      DrawerComponent.reinitialization();
      ToggleComponent.reinitialization();
      ScrollComponent.reinitialization();
      if (this.ktAsideScroll && this.ktAsideScroll.nativeElement) {
        this.ktAsideScroll.nativeElement.scrollTop = 0;
      }
    }, 50);
  }




  ngOnChanges( changes:SimpleChanges ): void {
    this.dynamicLinks = []
    this.dataStore = this.store.pipe(select(state => state['app'])).subscribe((item) => {
      let isDynamicLinkInStore = item.subMenuLinks.find((item) => item.menu === this.activeTab.mainMenuText)
      if (isDynamicLinkInStore) {
        this.dynamicLinks = isDynamicLinkInStore.dynamicLinks
      }
      else {
        this.activeTab.subMenu.forEach( ( subTab: Subtab) => {
          if(subTab.subMenu.length > 0) {
            let subDynamicLinks = [];
            subDynamicLinks.push(this.getRouteUrl(subTab, false));
            subTab.subMenu.forEach( ( subMenu ) => {
              subDynamicLinks.push(this.getRouteUrl(subTab, true, subMenu))
            })
            this.dynamicLinks.push(subDynamicLinks)
          }else{
            this.dynamicLinks.push(this.getRouteUrl(subTab, false))
          }
        });
        this.store.dispatch(setSubMenuLinks({
          menu: this.activeTab.mainMenuText,
          dynamicLinks: this.dynamicLinks
        }))
      }
    })


    this.unsubscribe.push(this.dataStore)
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }




}
