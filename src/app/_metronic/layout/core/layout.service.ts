import { Injectable } from '@angular/core';
import * as objectPath from 'object-path';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  DefaultLayoutConfig,
  ILayout,
  ILayoutCSSVariables,
} from './default-layout.config';

const LAYOUT_CONFIG_LOCAL_STORAGE_KEY = `${environment.appVersion}-layoutConfig`;

export type LayoutType = ILayout | undefined;

export const getEmptyCSSVariables = (): ILayoutCSSVariables => {
  return {
    body: new Map(),
  };
};

export function getEmptyHTMLAttributes(): {
  [key: string]: {
    [attrName: string]: string | boolean;
  };
} {
  return {
    asideMenu: {},
    headerMobile: {},
    headerMenu: {},
    headerContainer: {},
    pageTitle: {},
  };
}

export function getEmptyCssClasses(): {
  [key: string]: string[];
} {
  return {
    header: [],
    headerContainer: [],
    headerMobile: [],
    headerMenu: [],
    aside: [],
    asideMenu: [],
    asideToggle: [],
    toolbar: [],
    toolbarContainer: [],
    content: [],
    contentContainer: [],
    footerContainer: [],
    sidebar: [],
    pageTitle: [],
  };
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private subMenuDropdownSubject = new BehaviorSubject<boolean>(false);
  private asideMenuSecondarySubject = new BehaviorSubject<boolean>(false);

  asideMenuSecondary$: Observable<boolean> = this.asideMenuSecondarySubject.asObservable();
  subDropdown$ = this.subMenuDropdownSubject.asObservable();

  public layoutConfigSubject: BehaviorSubject<LayoutType> =
    new BehaviorSubject<LayoutType>(undefined);

  // scope list of css classes
  private classes: {
    [key: string]: string[];
  } = getEmptyCssClasses();

  // scope list of html attributes
  private attrs: {
    [key: string]: {
      [attrName: string]: string | boolean;
    };
  } = getEmptyHTMLAttributes();

  // scope list of body css variables
  private cssVariables: ILayoutCSSVariables;

  constructor() {}

  initConfig(): void {
    const configFromLocalStorage = localStorage.getItem(
      LAYOUT_CONFIG_LOCAL_STORAGE_KEY
    );
    if (configFromLocalStorage) {
      try {
        this.layoutConfigSubject.next(JSON.parse(configFromLocalStorage));
        return;
      } catch (error) {
        this.removeConfig();
        console.error('config parse from local storage', error);
      }
    }
    this.layoutConfigSubject.next(DefaultLayoutConfig);
  }

  private removeConfig(): void {
    localStorage.removeItem(LAYOUT_CONFIG_LOCAL_STORAGE_KEY);
  }

  refreshConfigToDefault(): void {
    this.setConfigWithPageRefresh(undefined);
  }

  getConfig(): ILayout {
    const config = this.layoutConfigSubject.value;
    if (!config) {
      return DefaultLayoutConfig;
    }

    return config;
  }

  setConfig(config: LayoutType) {
    if (!config) {
      this.removeConfig();
    } else {
      localStorage.setItem(
        LAYOUT_CONFIG_LOCAL_STORAGE_KEY,
        JSON.stringify(config)
      );
    }
    this.layoutConfigSubject.next(config);
  }

  updateAsideMenuSecondary(): void {
    const asideMenuSecondary = this.getProp('aside.secondaryDisplay') as boolean;
    this.asideMenuSecondarySubject.next(asideMenuSecondary);
  }

  updateConfig(fieldsToUpdate: Partial<ILayout>) {
    const config = this.layoutConfigSubject.value;
    if (!config) {
      return;
    }

    const updatedConfig = { ...config, ...fieldsToUpdate };
    this.classes = getEmptyCssClasses();
    this.cssVariables = getEmptyCSSVariables();
    this.attrs = Object.assign({}, getEmptyHTMLAttributes());
    this.layoutConfigSubject.next(updatedConfig);
  }

  setConfigWithoutLocalStorageChanges(config: LayoutType) {
    this.layoutConfigSubject.next(config);
  }

  setConfigWithPageRefresh(config: LayoutType) {
    this.setConfig(config);
    document.location.reload();
  }

  getProp(path: string): string | boolean | undefined | Object {
    const layoutConfig = this.layoutConfigSubject.value;
    if (!layoutConfig) {
      return;
    }

    return objectPath.get(layoutConfig, path);
  }

  setSubMenuDropdown(val: boolean) {
    this.subMenuDropdownSubject.next(val);
  }

  setProp(path:string,value:boolean){
    const layoutConfig = this.layoutConfigSubject.value;
    if (!this.layoutConfigSubject.value) {
      return;
    }

    this.layoutConfigSubject.value.aside.secondaryDisplay = value;


  }
  setCSSClass(path: string, classesInStr: string) {
    const cssClasses = this.classes[path];
    if (!cssClasses) {
      this.classes[path] = [];
    }
    classesInStr
      .split(' ')
      .forEach((cssClass: string) => this.classes[path].push(cssClass));
  }

  getCSSClasses(path: string): string[] {
    const cssClasses = this.classes[path];
    if (!cssClasses) {
      return [];
    }

    return cssClasses;
  }

  getStringCSSClasses(path: string) {
    return this.getCSSClasses(path).join(' ');
  }

  getHTMLAttributes(path: string): {
    [attrName: string]: string | boolean;
  } {
    const attributesObj = this.attrs[path];
    if (!attributesObj) {
      return {};
    }
    return attributesObj;
  }

  setHTMLAttribute(path: string, attrKey: string, attrValue: string | boolean) {
    const attributesObj = this.attrs[path];
    if (!attributesObj) {
      this.attrs[path] = {};
    }
    this.attrs[path][attrKey] = attrValue;
  }
}
