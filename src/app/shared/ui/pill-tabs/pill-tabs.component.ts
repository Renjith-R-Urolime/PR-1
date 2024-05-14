import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from '../../services/shared.service';
import { TabService } from '../../services/tab.service';
import { pillTabs } from './pill-tabs';

@Component({
  selector: 'pill-tabs',
  templateUrl: './pill-tabs.component.html',
  styleUrls: ['./pill-tabs.component.scss']
})
export class PillTabsComponent implements OnInit {
  selectedTabIndex: any
  theme: string = this.sharedService.getTheme();
  currentTab$ = new BehaviorSubject<number>(0);
  skeletonTheme: any = { 'border-radius': '5px', 'height': '30px', 'width': '100px', 'margin': 0 };
  isLoading: boolean;
  selectedTab : number;
  filteredItem: any;
  constructor(private cdRef: ChangeDetectorRef, private sharedService: SharedService,private tabService: TabService) { }
  @Input() id: number = 0;
  @Input() pillLabel:pillTabs;
  filteredData: any;
  ngOnInit() {
    this.tabService.currentTab$.subscribe(currentTab => {
     this.selectedTab = currentTab


    });

    // this.filteredItem = this.filteredData[0].tab[0].tabItems
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.cdRef.detectChanges();
    }, 1000);
  }

  onTabSelect(tabIndex){
    this.tabService.setCurrentTab(tabIndex)
  }
}
