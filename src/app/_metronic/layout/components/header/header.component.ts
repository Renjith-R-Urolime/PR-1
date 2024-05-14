import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { NavigationCancel, NavigationEnd, Router } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Subscription, debounceTime } from "rxjs";
import { Tab, tabs } from "src/app/_metronic/layout/components/aside/tabs";
import { ApiService } from "src/app/shared/services/api.service";
import { SharedService } from "src/app/shared/services/shared.service";
import { DrawerComponent, MenuComponent } from "../../../kt/components";
import { LayoutService } from "../../core/layout.service";

export interface MenuItem {
  id: number;
  text: string;
  link: string;
  color?: string;
  icon?: string;
  subItems?: MenuItem[];
  breadcrumb?: string[];
}

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  menuItems: MenuItem[] = [];
  filteredMenuItems: MenuItem[] = [];
  matchedCharacters: string[] = [];
  headerContainerCssClass: string = "";
  currentLayoutType = "light-header";
  isProfileOpen: boolean = false;
  isNotificationOpen: boolean = false;
  isSearchingEmployee:boolean = false;
  @ViewChild("ktPageTitle", { static: true }) ktPageTitle: ElementRef;
  logoSrc: any;
  modalNotificationRef: NgbModalRef;
  theme: string = this.sharedService.getTheme();
  showDropdown = false;
  searchedEmployee: any = [];
  originalEmployeeList: any = [];
  employeeCount:number = 0;
  @ViewChild("searchBox") searchBox: ElementRef;
  @Input() appHeaderDefaulMenuDisplay: boolean;
  @Input() isRtl: boolean;
  itemClass: string = "ms-1 ms-lg-3";
  btnClass: string =
    "btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-36px w-md-40px h-md-40px";
  userAvatarClass: string = "symbol-34px symbol-md-40px";
  btnIconClass: string = "svg-icon-1";
  searchText: string = "";

  private unsubscribe: Subscription[] = [];
  constructor(
    private layout: LayoutService,
    private router: Router,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private apiService: ApiService,
    private modalService: NgbModal,
    public sharedService: SharedService
  ) {
    this.routingChanges();
  }
  ngOnInit(): void {
    const mutableTabs: Tab[] = tabs.slice(); // Convert readonly to mutable
    this.menuItems = this.mapTabsToMenuItems(mutableTabs);
    this.filteredMenuItems = [...this.menuItems];

    // console.log(this.menuItems);
    this.headerContainerCssClass =
      this.layout.getStringCSSClasses("headerContainer");
    this.apiService.get(`company/info`).subscribe({
      next: (res: any) => {
        if (res) {
          // console.log(" res*******", res);
          this.logoSrc = res.data.logo;
        }
      },
    });
  }
  routingChanges() {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        DrawerComponent.reinitialization();
        MenuComponent.reinitialization();
      }
    });
    this.unsubscribe.push(routerSubscription);
  }

  openDropdown(type) {
    if (type === "notification") {
      this.isProfileOpen = false;
      this.isNotificationOpen = !this.isNotificationOpen;
    } else if (type === "profile") {
      this.isNotificationOpen = false;
      this.isProfileOpen = !this.isProfileOpen;
    }
  }
  @HostListener("document:click", ["$event"])
  handleClick(event: Event): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isProfileOpen = false;
    }
  }
  @HostListener("document:click", ["$event"])
  closeDropdownOnClickOutside(event: Event): void {
    console.log("Closing dropdown on click")
    this.searchText = "";
  }

  //  NEW CODE FOR SEARCH

  mapTabsToMenuItems(tabs: Tab[]): MenuItem[] {
    const menuItems: MenuItem[] = [];
    tabs.forEach((tab) => {
      if (tab.subMenu) {
        this.mapSubMenuItems( tab.subMenu, tab.mainMenuColor, tab.mainMenuIcon, menuItems, tab.mainMenuLink, [tab.mainMenuText], tab.mainMenuIcon );
      }
    });
    return menuItems;
  }

  mapSubMenuItems(subMenu: any, color: string, icon: string, menuItems: MenuItem[], menulink: string, parent: string[], menuIcon: string): void {
    subMenu.forEach((subItem) => {
        let subMenuLink = menulink;
        let breadcrumb = [...parent]; // Making a copy of parent array
        let subMenuIcon = subItem.subMenuIcon ? subItem.subMenuIcon : menuIcon;

        if (subItem.isLink || subItem.subMenu === undefined || (subItem.subMenu && subItem.subMenu.length === 0)) {
            const menuItem: MenuItem = {
                id: subItem.id,
                text: subItem.subMenuText,
                link: subMenuLink + subItem.subMenuLink,
                color: color,
                icon: subMenuIcon,
                breadcrumb: breadcrumb, // Using copied breadcrumb array
            };
            menuItems.push(menuItem);
        }

        if (subItem.subMenu) {
            subMenuLink += subItem.subMenuLink;
            breadcrumb.push(subItem.subMenuText);
            this.mapSubMenuItems(subItem.subMenu, color, icon, menuItems, subMenuLink, breadcrumb, subMenuIcon);
        }
    });
}


  onSearch(): void {
    if (!this.searchText.trim()) {
      this.filteredMenuItems = [...this.menuItems];
    } else {
      const searchTextLower = this.searchText.toLowerCase().trim();
      this.filteredMenuItems = this.menuItems.filter((item) =>
        item.text.toLowerCase().includes(searchTextLower)
      );
      this.getSearchedEmployee();
    }
  }

  getSearchedEmployee(){
    console.log(this.employeeCount ,this.originalEmployeeList.length )
    if( this.employeeCount === 0 || this.employeeCount !== this.originalEmployeeList.length){
      this.isSearchingEmployee = true
      this.apiService.get(`core-hr/employee?limit=max&search=${this.searchText}`).pipe(
        debounceTime(500)
      ).subscribe({
        next: (res: any) => {
          if (res) {
            this.employeeCount = res.count
            this.searchedEmployee = res.data.map((item) => {
              return {
                id: item.id,
                text: `${item.employeeId}: ${item.fullName}`,
                fullName: item.fullName,
                link: `/employee-hub/profiles/employee/view/${item.id}`,
                color: 'purple',
                image: item.image,
                breadcrumb: ['Employee Hub', 'Profiles', 'Employee'],
              }
            })
            this.originalEmployeeList = [...this.searchedEmployee]
            this.isSearchingEmployee = false
          }
        },
      })
    }else{
      const searchTextLower = this.searchText.toLowerCase().trim();
      this.searchedEmployee = this.originalEmployeeList.filter((item) =>
        item.text.toLowerCase().replace(':','').includes(searchTextLower)
      );
    }

  }
  navigateRoute(link){
    // console.log(link)
    this.searchText = '';
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([link]);
    })
  }
}




