import { ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, debounceTime } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ActionButtonTemplateDirective, CustomViewTemplate, DataCellTemplateDirective, HeaderCellTemplateDirective } from '../../directive/custom-template.directive';
import { ApiService } from '../../services/api.service';
import { TableSate } from '../../store/tables.state';
@Component({
  selector: 'data-table-list',
  templateUrl: './data-table-list.component.html',
  styleUrls: ['./data-table-list.component.scss']
})

export class DataTableListComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  subLink = ''
  modelName; string;
  stickyHeader: boolean = true;
  pin: boolean[] = [];
  hideCol: boolean[] = [];
  checkedCol: boolean[] = [];
  indexClicked: any = -1;
  filterToggleType: string = '';
  filterToggle: boolean = false;
  currentURL: string;
  page: number = 1;
  selectedValue = 1;
  pageSize: number = 5;
  collectionSize: number = 5;
  maxSize: number = 1;
  pinFilterToggle: boolean = false;
  unPinFilterToggle: boolean = false;
  pinnedHeaders: any = [];
  sortOrder: string = "ASC";
  filterText: string;
  tableLoader$ = true;
  draggedColumn: string = '';
  drag: boolean = false;
  tb: any;
  activeTable: any = [];
  statusCode: number;
  imageStatus: boolean[];
  id: number;
  initLoad: boolean = true;
  viewTabTableData: any;
  theme: string = this.sharedService.getTheme();
  Array = Array
  isLoading: boolean = true;

  @Input() customData: boolean = false;
  @Input() isHeaderOption: boolean = true;
  @Input() data;
  @Input() tabs: boolean = false;
  @Input() tabsApiKey: string;
  @Input() imageColumn: string = '';
  @Input() metaData: any;
  @Input() isActionCol: boolean = true;
  @Input() isPrintCol: boolean = false;
  @Input() async: boolean = true;
  @Input() tableData: any;
  @Input() tableData$: Observable<any>;
  @Input() currentTab: string;
  @Output() pageChange: EventEmitter<any> = new EventEmitter;
  @Output() sizeChange: EventEmitter<any> = new EventEmitter;
  routeSub: Subscription | undefined;
  employee: any;
  // skeleton: TemplateRef<NgIfContext<boolean>>;

  // Custom Templates
  @ContentChild(ActionButtonTemplateDirective, { read: TemplateRef }) actionButtonTemplate: TemplateRef<any>;
  @ContentChild(HeaderCellTemplateDirective, { read: TemplateRef }) headerCellTemplate: TemplateRef<any>;
  @ContentChild(DataCellTemplateDirective, { read: TemplateRef }) dataCellTemplate: TemplateRef<any>;
  @ContentChild(CustomViewTemplate, { read: TemplateRef }) customViewTemplate: TemplateRef<any>;

  constructor(private cdRef: ChangeDetectorRef, private sharedService: SharedService, private apiService: ApiService,
    private router: Router, private route: ActivatedRoute, private store: Store<TableSate>) {
    this.currentURL = this.router.url;

  }

  private dataSubscription: Subscription;

  ngOnInit(): void {
    this.isLoading = true;
    this.isActionCol = this.metaData?.isActionColumn !== undefined ? this.metaData?.isActionColumn : this.isActionCol;
    const routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.subLink = params['sub'];
    });
    if(!this.customData){
      this.getDataTable()
    }
    const searchSub = this.sharedService.getSearchText$
      .pipe(debounceTime(500))
      .subscribe(data => {
        this.filterText = data;
        if (data.length > 0) {
          this.initLoad = false;
        }
        if (!this.initLoad) {
          this.searchList();
        }
      });

    /** Getting hide column index and hide column based on filter*/
    const hideSub = this.sharedService.getHideValue$.subscribe(data => {
      this.hideColumn(data);
    });
    this.unsubscribe.push(routeSub, hideSub, searchSub);
  }

  async dataTransform(response) {

    if (this.metaData) {

      this.metaData['data'] = response?.data;
      this.metaData['collectionSize'] = response?.count;
      this.tableData = this.metaData;


    } else {
      this.tableData = await this.sharedService.convertTableList(response);
    }

    //pagination initializations
    this.collectionSize = this.tableData.collectionSize;

    this.imageStatus = Array(this.tableData.data?.length).fill(true);

    /** Intializing pin/unpin and show/hide array */
    for (let i = 0; i < this.tableData.columns.length; i++) {
      this.hideCol[i] = false;
      this.pin[i] = false;
      this.checkedCol[i] = true;
    }
    const storeSub = this.store.pipe(select(state => state.tables)).subscribe(data => {
      this.tb = data;


      this.activeTable = this.tb.tables.find(item => item.tableName === this.tableData.tableName);

    });
    this.unsubscribe.push(storeSub)
    this.checkStoreTable();

    this.sharedService.updateCheckColumn(this.checkedCol)
    this.filterText = '';

    this.statusCode = 200;
    this.isLoading = false;
    this.cdRef.detectChanges();
  }

  reInitializePinnedHeaders() {
    let temp = [];
    if (this.activeTable.pinnedHeaders) {
      this.activeTable.pinnedHeaders.forEach(element => {
        temp.push(element);
      });
      this.pinnedHeaders = temp;
    }
  }

  reInitializePin() {
    let temp = [];
    if (this.activeTable.pin) {
      this.activeTable.pin.forEach(element => {
        temp.push(element);
      });
      this.pin = temp;
    }
    // this.pin=this.activeTable.pin;
  }

  updateStates(headers, pin, hideCol, checkedCol) {
    let tempHeaders = headers.concat();
    let tempPin = pin.concat();
    let tempHideCol = hideCol.concat();
    let tempCheckedCol = checkedCol.concat();
    // this.sharedService.updatePinnedHeaders(this.tableData.tableName,headers);
    // this.sharedService.updatehideColFromTableHeader(this.tableData.tableName,pin);
    this.sharedService.updatePin(this.sharedService.getPageName().toLocaleLowerCase(), tempHeaders, tempPin, tempHideCol, tempCheckedCol);
  }

  checkStoreTable() {
    let tempPin = this.pin.concat();
    let tempHideCol = this.hideCol.concat();
    let tempCheckedCol = this.checkedCol.concat();
    if (this.activeTable === undefined) {
      this.sharedService.addNewTable(this.sharedService.getPageName().toLocaleLowerCase(), [], tempPin, tempHideCol, tempCheckedCol);
    }
    else {
      this.reInitializePinnedHeaders();
      this.reInitializePin();
    }
  }

  hideColumn(index) {
    this.hideCol[index] = !this.hideCol[index];
    this.checkedCol[index] = !this.checkedCol[index]
    this.sharedService.updateCheckColumn(this.checkedCol);
    this.updateStates(this.pinnedHeaders, this.pin, this.hideCol, this.checkedCol);
  }

  open(type, id) {

    this.sharedService.closeSideBar();
    this.currentURL = this.currentURL.split('?')[0];

    if (type === 'edit') {
      this.router.navigate([this.currentURL, 'edit', id]);
    } else {
      this.router.navigate([this.currentURL, 'view', id]);
    }
  }
  onPageChange(event) {
    //this.pageChange.emit(event);
    this.page = event;
    this.getDataTable();
  }
  onEntryChange() {

    var noOfPages = Math.ceil(this.collectionSize / this.pageSize)
    if (this.page > noOfPages) {
      this.page = noOfPages;
      // this.pageChange.emit(this.page);
    }
    this.getDataTable();
    // this.sizeChange.emit(this.pageSize);
    //this.loadTableData();
  }

  toggleFilter(i, type?: string) {
    this.filterToggleType = type
    this.indexClicked = i;
    this.filterToggle = !this.filterToggle;
  }

  /** Add pinned columns */
  pinCol(i, columnName) {
    const pinnedElement = this.tableData.columns.find(column => column.name === columnName);
    this.pinnedHeaders.push(pinnedElement);
    this.sharedService.updatePinHeaders(this.pinnedHeaders);
    this.pin[i] = true;
    this.updateStates(this.pinnedHeaders, this.pin, this.hideCol, this.checkedCol);
    this.toggleFilter(i);
  }

  /**Remove pinned columns */
  unPinCol(pinnedIndex, columnName) {
    const unPinColElement = this.pinnedHeaders.find(column => column.name === columnName);
    this.pinnedHeaders = this.pinnedHeaders.filter(column => column.name !== columnName);
    this.sharedService.updatePinHeaders(this.pinnedHeaders);
    this.pin.fill(false);
    const columnIndex = this.tableData.columns.findIndex(column => column.name === unPinColElement.name);
    if (columnIndex !== -1) {
      this.pin[columnIndex] = false;
    }
    this.updateStates(this.pinnedHeaders, this.pin, this.hideCol, this.checkedCol);
    this.toggleFilter(pinnedIndex);
  }

  sort(i, headerType?: string) {
    this.tableData.data.sort((a, b) => {
      var col = '';
      if (headerType === "pinned") {
        col = this.pinnedHeaders[i];
      } else {
        col = this.tableData.columns[i];
      }
      const valueA = a[col].toLowerCase();
      const valueB = b[col].toLowerCase();
      return this.sortOrder === "ASC" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });
    this.sortOrder === "ASC" ? this.sortOrder = "DESC" : this.sortOrder = "ASC";
    this.toggleFilter(this.indexClicked);
  }

  closeDropdown(close) {

    this.sharedService.updateDropdownState(close);

  }

  handleDragStart(event: DragEvent, column: string) {
    this.draggedColumn = column;
  }

  handleDragOver(event: DragEvent) {

    event.preventDefault();
  }
  handleDragEnter(event: DragEvent, column: string) {
    this.drag = true;
    event.preventDefault();

    const targetColumn = event.target as HTMLElement;

    // Find the indexes of the dropped column and the target column
    const draggedIndex = this.tableData.columns.findIndex((col) => col.name === this.draggedColumn);
    const targetIndex = this.tableData.columns.findIndex((col) => col.name === targetColumn.getAttribute('data-header'));

    if (draggedIndex > -1 && targetIndex > -1) {
      // Create a copy of the dragged column
      const draggedColumnCopy = { ...this.tableData.columns[draggedIndex] };

      // Remove the dragged column from the array
      this.tableData.columns.splice(draggedIndex, 1);
      this.pin.splice(draggedIndex, 1);
      this.hideCol.splice(draggedIndex, 1);
      this.checkedCol.splice(draggedIndex, 1);

      // Insert the dragged column at the target index
      this.tableData.columns.splice(targetIndex, 0, draggedColumnCopy);

      this.pin.splice(targetIndex, 0, draggedColumnCopy.pin);
      this.hideCol.splice(targetIndex, 0, draggedColumnCopy.hide);
      this.checkedCol.splice(targetIndex, 0, draggedColumnCopy.checked);

      this.sharedService.updateCheckColumn(this.checkedCol);
    }
  }


  handleDragLeave(event: DragEvent, column: string) {


    event.preventDefault();
  }
  handleDragEnd(event: DragEvent) {
    this.sharedService.updateDropdownState(true);


    event.preventDefault();
  }
  handleDrop(event: DragEvent, column: string) {
    event.preventDefault();

    this.draggedColumn = '';
    const draggedColumn = event.dataTransfer.getData('text/plain');
    const targetColumn = event.target as HTMLElement;

    // Find the indexes of the dropped column and the target column
    const dragedIndex = this.tableData.columns.indexOf(draggedColumn);
    const targetIndex = this.tableData.columns.indexOf(targetColumn.getAttribute('data-header'));

    // Swap the positions of the dropped column and the target column in the columns array
    if (dragedIndex > -1 && targetIndex > -1) {
      const removedColumn = this.tableData.columns.splice(dragedIndex, 1)[0];
      const removedPin = this.pin.splice(dragedIndex, 1)[0]
      const removedDrop = this.hideCol.splice(dragedIndex, 1)[0]
      const removedCheck = this.checkedCol.splice(dragedIndex, 1)[0]
      this.tableData.columns.splice(targetIndex, 0, removedColumn);
      this.pin.splice(targetIndex, 0, removedPin);
      this.hideCol.splice(targetIndex, 0, removedDrop);
      this.checkedCol.splice(targetIndex, 0, removedCheck);
      this.sharedService.updateCheckColumn(this.checkedCol)
    }
  }

  async getDataTable() {
    if (this.data) {
      this.metaData['data'] = this.data
      this.tableData = this.metaData
      this.isLoading = false;
      this.cdRef.detectChanges();
      return;
    } else {
      try {
        const baseApi = this.sharedService.getCurrentApi();
        const urlSplit = baseApi?.url?.split('/');
        let currentUrl;

        if (this.currentTab) {
          currentUrl = `tabs/${this.tabsApiKey || urlSplit[urlSplit.length - 1]}/${this.id}`;
        } else {
          currentUrl = `${baseApi?.url}/${this.subLink || ''}`;
        }

        if (currentUrl) {
          this.sharedService.setBaseApi(baseApi.url);

          const queryParams = `?page=${this.page || ''}&limit=${this.pageSize || ''}${this.filterText ? '&search='+ this.filterText : ''}${this.metaData?.queryParams ? `&${this.metaData.queryParams}=${this.id || ''}` : ''
            }`;

          const fullUrl = currentUrl + queryParams;

          this.apiService.get(fullUrl, baseApi.scope || '').subscribe({
            next: (res: any) => {
              if (res) {
                if (this.currentTab) {
                  this.modelName = this.currentTab;
                  this.viewTabTableData = res.tabs;
                  this.dataTransform(res.tabs[this.currentTab]);
                } else {
                  this.modelName = urlSplit[urlSplit.length - 1];
                  this.dataTransform(res);
                }
              }
            },
            error: (error: any) => {
              this.modelName = '';
              this.dataTransform({ data: [], count: 0 });
              this.isLoading = false;
              console.error('Error while fetching data:', error);
            },
            complete: () => {
              this.isLoading = false;
            },
          });
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        // Handle unexpected errors here
      }
    }
  }

  refreshData() {
    this.isLoading = true;
    let baseApi = this.sharedService.getCurrentApi();
    let urlSplit = baseApi?.url.split('/')
    let currentUrl;

    if (this.currentTab) {
      currentUrl = `tabs/${this.tabsApiKey || urlSplit[urlSplit.length - 1]}/${this.id}`;
    } else {
      currentUrl = baseApi?.url + '/' + (this.subLink ? this.subLink : '')
    }


    if (currentUrl) {
      this.sharedService.setBaseApi(baseApi.url);
      this.apiService.get(`${currentUrl}${this.page ? '?page=' + this.page : ''}${this.pageSize ? '&limit=' + this.pageSize : ''}${this.filterText ? '&search=' + this.filterText : ''}`, baseApi.scope ? baseApi.scope : '').subscribe({
        next: (res: any) => {
          if (res) {
            if (this.currentTab) {
              this.viewTabTableData = res.tabs;
              this.dataTransform(res.tabs[this.currentTab])
            }
            else {
              this.dataTransform(res)
            }

          }
        }, error: (error: any) => {

          console.error(error);

        }
      });
    }
  }

  searchList() {

    // if(this.filterText == '' || this.filterText == null || this.filterText == undefined) {
    //   this.page = 1;
    //   this.pageSize = 5;
    //   this.getDataTable();
    // }
    if (this.filterText === '' || this.filterText.length >= 3) {
      this.page = 1;
      this.pageSize = 5;
      this.getDataTable();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {

    if (changes.currentTab && this.viewTabTableData) {
      this.modelName = this.currentTab;
      this.dataTransform(this.viewTabTableData[changes.currentTab.currentValue])
    }
    if (changes?.data?.currentValue) {
      this.metaData['data'] = this.data
      this.tableData = this.metaData;
      this.isLoading = false;
      this.cdRef.detectChanges();
    }
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  openUrlInNewWindow(url: any): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  onRouterNavigate(url: string, id: number | string): void {
    if (url) {
      const newTab = window.open('', '_blank');
      newTab.location.href = `${url}/view/${id}`;
    }
  }
}
