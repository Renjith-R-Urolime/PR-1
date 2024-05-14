import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {
  NgbTooltipModule
} from "@ng-bootstrap/ng-bootstrap";
import { InlineSVGModule } from "ng-inline-svg-2";
import { Routing } from "../../pages/routing";
import { DrawersModule } from "../partials";
import { AsideMenuComponent } from "./components/aside/aside-menu/aside-menu.component";
import { AsideComponent } from "./components/aside/aside.component";
import { TabsAsideInnerComponent } from "./components/aside/tabs-aside/tabs-aside-inner.component";
import { TabsAsideComponent } from "./components/aside/tabs-aside/tabs-aside.component";
import { MenuTabComponent } from "./components/aside/tabs/menu-tab/menu-tab.component";
import { SearchComponent } from "./components/aside/tabs/projects-tab/search/search.component";
import { SubscriptionsTabComponent } from "./components/aside/tabs/subscriptions-tab/subscriptions-tab.component";
import { ContentComponent } from "./components/content/content.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { ScriptsInitComponent } from "./components/scripts-init/scripts-init.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { TopbarComponent } from "./components/topbar/topbar.component";
import { LayoutComponent } from "./layout.component";

import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { UiModule } from "src/app/shared/ui/ui.module";
import { ThemeModeModule } from "../partials/layout/theme-mode-switcher/theme-mode.module";
import { SubmenuTabComponent } from "./components/aside/tabs/submenu-tab/submenu-tab.component";
import { NotificationDropdownComponent } from "./components/header/notification-dropdown/notification-dropdown.component";
import { UserInnerComponent } from "../partials/layout/extras/dropdown-inner/user-inner/user-inner.component";
import { LazyLoadImageModule } from "ng-lazyload-image";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: Routing,
  },
];

@NgModule({
  declarations: [
    LayoutComponent,
    AsideComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    ScriptsInitComponent,
    ToolbarComponent,
    AsideMenuComponent,
    TopbarComponent,
    TabsAsideComponent,
    TabsAsideInnerComponent,
    NotificationDropdownComponent,
    MenuTabComponent,
    SubscriptionsTabComponent,
    SearchComponent,
    SubmenuTabComponent,
    UserInnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InlineSVGModule,
    NgxSkeletonLoaderModule,
    DrawersModule,
    NgbTooltipModule,
    FormsModule,
    TranslateModule,
    ThemeModeModule,
    UiModule,
    LazyLoadImageModule
  ],
  exports: [RouterModule],
})
export class LayoutModule { }
