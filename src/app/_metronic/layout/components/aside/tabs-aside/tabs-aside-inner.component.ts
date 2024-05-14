import { Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
// import { environment } from '../../../../../../environments/environment';

import { NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  DrawerComponent,
  MenuComponent,
  ScrollComponent,
  ToggleComponent,
} from '../../../../kt/components';
import { Tab, tabs } from '../tabs';
@Component({
  selector: 'app-tabs-aside-inner',
  templateUrl: './tabs-aside-inner.component.html',
})
export class TabsAsideInnerComponent implements OnDestroy {
  @Input() activeTab: Tab = tabs[0];
  @ViewChild('ktTabsAsideScroll', { static: true })
  ktTabsAsideScroll: ElementRef;
  private unsubscribe: Subscription[] = [];

  constructor(private router: Router) {}

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
      if (this.ktTabsAsideScroll && this.ktTabsAsideScroll.nativeElement) {
        this.ktTabsAsideScroll.nativeElement.scrollTop = 0;
      }
    }, 50);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
