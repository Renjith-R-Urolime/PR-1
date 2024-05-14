import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class TabService {
    private currentTabSubject = new BehaviorSubject<number>(0);
    currentTab$ = this.currentTabSubject.asObservable();

    constructor() { }

    setCurrentTab(tab: number) {
        this.currentTabSubject.next(tab);
    }
}
