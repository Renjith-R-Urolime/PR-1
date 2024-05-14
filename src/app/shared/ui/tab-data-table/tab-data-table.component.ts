import { ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActionButtonTemplateDirective, CustomViewTemplate, DataCellTemplateDirective } from '../../directive/custom-template.directive';
import { TrazepoidTabsData, TrazepoidTabsMeta } from '../../meta-interface';
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.service';
// import { TrazepoidTabsData, TrazepoidTabsMeta } from './trapezoid-tabs';

@Component({
  selector: 'app-tab-data-table',
  templateUrl: './tab-data-table.component.html',
  styleUrls: ['./tab-data-table.component.scss']
})
export class TabDataTableComponent implements OnInit {

  theme: string = this.sharedService.getTheme();
  currentTabLabel: string;
  selectedTabTableMetaData: any;
  @Input() key:string;
  @Input() id: string | number;
  pageSize: number;
  page: number;
  tabsData: TrazepoidTabsData[];
  searchText: string;
  isCustomView:boolean = false;
  tabsData$;
  tableData;
  @Input() showFilter: boolean = true;
  @Input() tabsMeta: TrazepoidTabsMeta[] = [
    { label: "Tab 1", tabIndex: 0 },
    { label: "Tab 2", tabIndex: 1 },
    { label: "Tab 3", tabIndex: 2 },
  ]
  // isShiftTab: boolean = false;
  @Output() isShiftTabChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() isShiftTab: boolean;

  @ContentChild(DataCellTemplateDirective, { read: TemplateRef }) tabDataCellTemplate: TemplateRef<any>;
  @ContentChild(CustomViewTemplate, { read: TemplateRef }) tabCustomViewTemplate: TemplateRef<any>;
  @ContentChild(ActionButtonTemplateDirective, { read: TemplateRef }) actionButtonTemplate: TemplateRef<any>;


  constructor(private cdRef: ChangeDetectorRef, private sharedService: SharedService, private apiService: ApiService,private router: Router) { }

  ngOnInit() {
    if(this.key === undefined){
      new Error("Key is not available")
    }
    this.updateSelectedTab(this.tabsMeta[0])
    //this.getTabsData()


  }

  updateSelectedTab(tab): void {
    this.currentTabLabel = tab.label;
    this.selectedTabTableMetaData = tab.tableData;
    this.isCustomView = tab?.isCustomView ? tab.isCustomView : false;
    // this.isShiftTabChange.emit(this.isShiftTab);

  }
  open(type, id) {
    this.sharedService.closeSideBar();
    if (type === 'edit') {
      this.router.navigate([this.selectedTabTableMetaData.redirectUrl, 'edit', id]);
    } else {
      this.router.navigate([this.selectedTabTableMetaData.redirectUrl, 'view', id]);
    }
  }

}
