import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { KTHelpers } from 'src/app/_metronic/kt';
import { ApiErrorService } from 'src/app/shared/services/api-error.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { LayoutService } from '../../core/layout.service';
import { Tab, tabs } from './tabs';
@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)',
      })),
      state('out', style({
        transform: 'translateX(-100%)',
      })),
      transition('in => out', [
        animate('500ms ease-in-out')
      ]),
      transition('out => in', [
        animate('500ms ease-in-out')
      ])
    ])
    // trigger('slideInOut', [
    //   transition(':enter', [
    //     style({ transform: 'translateX(-100%)', opacity: 0 }),
    //     animate('500ms ease-in-out', style({ transform: 'translateX(0)', opacity: 1 }))
    //   ]),
    //   transition(':leave', [
    //     animate('500ms ease-in-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
    //   ])
    // ])
  ],
})
export class AsideComponent implements OnInit, OnDestroy {
  activeTab: Tab = tabs[0];
  tabState: any = '';
  asideMenuSecondary: boolean = false;
  private unsubscribe: Subscription[] = [];
  constructor(
    private layout: LayoutService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private elementRef: ElementRef,
    private sharedService: SharedService,
    private apiErrorService: ApiErrorService
  ) { }

  // @HostBinding('@slideInOut') get slideInOut() {
  //   return this.asideMenuSecondary ? 'in' : 'out';
  // }

  @HostListener('document:click', ['$event'])
  closeDropdownOnClickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.asideMenuSecondary = false;
    }
  }

  ngOnInit(): void {
    this.layout.asideMenuSecondary$.subscribe(state => {
       this.asideMenuSecondary = state;
    });

  }

  routingChanges() {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        KTHelpers.menuReinitialization();
      }
    });
    this.unsubscribe.push(routerSubscription);
  }

  setActiveTab = (selectedTabLink: string) => {

    const tab = tabs.find((t) => t.mainMenuLink === selectedTabLink);

    if (tab) {
      // Update the active tab
      this.tabState = this.activeTab.mainMenuLink;


      // Handle aside menu secondary display
      if (selectedTabLink !== '/dashboard') {

        if (selectedTabLink === this.activeTab.mainMenuLink) {
          this.asideMenuSecondary = !this.asideMenuSecondary;
        } else if (selectedTabLink !== '/dashboard') {
          this.asideMenuSecondary = true
            if(!this.router.url.includes('/dashboard') ){
              if( this.tabState === '/dashboard'){
                this.asideMenuSecondary = false
              }
              else{
                this.asideMenuSecondary = true;
              }
            }else{
              if( this.tabState === '/dashboard'){
                this.asideMenuSecondary = true
              }
            }
          } else {
              this.asideMenuSecondary = false;
          }
        // Update aside menu secondary display in layout
        this.layout.setProp('aside.secondaryDisplay', this.asideMenuSecondary);

        // Update body class
        document.body.classList.remove(`aside-secondary-disabled`);
        document.body.classList.add(`aside-secondary-${this.asideMenuSecondary ? 'enabled' : 'disabled'}`);
      } else {
        // Handle '/dashboard' case
        this.apiErrorService.dismiss()
        this.layout.setProp('aside.secondaryDisplay', false);
        this.asideMenuSecondary = this.layout.getProp('aside.secondaryDisplay') as boolean;
        document.body.classList.remove(`aside-secondary-enabled`);
        document.body.classList.add(`aside-secondary-${this.asideMenuSecondary ? 'enabled' : 'disabled'}`);
        this.router.navigate(['/']);
      }

      // Detect changes and perform menu reinitialization
      this.cd.detectChanges();
      KTHelpers.menuReinitialization();

      this.activeTab = tab;

    }

    // Event handler
    this.sharedService.isAsideMenuEvent(this.asideMenuSecondary);
  };


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }



}
