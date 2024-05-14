import { ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Optional, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SubSink } from 'subsink';
import { CustomNgSelectLabelDirective, CustomNgSelectOptionDirective } from '../../directive/custom-template.directive';
import { ApiService } from '../../services/api.service';
import { JsonListService } from '../../services/json-list/json-list.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: "custom-ng-select",
  templateUrl: "./custom-ng-select.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomNgSelectComponent,
      multi: true,
    },
  ],
})
export class CustomNgSelectComponent implements OnInit, ControlValueAccessor {
  private subs = new SubSink();
  searchable: boolean = false;
  @Input() bodyAppend = null;
  itemsCount: number = 0;
  loadingText: string = "Loading....";
  loadMoreLoading: boolean = false;
  loading: boolean = false;
  selectedItems: any;
  theme: string = this.sharedService.getTheme();
  currentPage: number = 1;
  @Input() isSelectDisabled: boolean;
  baseApiList: any = [];
  searchText: string;
  originalItemsList: any = [];
  loadMoreNeeded: boolean = false;
  selectDisable: boolean = false;
  markedAll: boolean = false;
  loadMoreObject: any = {
    id: -999,
    name: "Load More",
    disabled: true,
  };
  state: string;
  @Input() scope: string = "dropdown";
  @Input() multiple: boolean = false;
  @Input() ngClass: any;
  @Input() clearable: boolean = this.multiple ? false : true;
  @Input() placeholder: string = "";
  @Input() items: any[] = [];
  @Input() fetchCondition: string[] = [];
  @Input() apiLink: string = "";
  @Input() jsonListName: string = "";
  @Input() bindLabel: string = "name";
  @Input() bindValue: string = "id";
  @Input() raw: boolean = false;
  @Input() patchData: any;
  @Input() maxLimit: number = 2;
  @Input() controlName: string;
  @Input() onOrder: boolean = true;
  @Output() onchange: EventEmitter<any> = new EventEmitter();
  @Output() onclear: EventEmitter<boolean> = new EventEmitter();

  @ContentChild(CustomNgSelectLabelDirective, { read: TemplateRef })
  customNgLabel: TemplateRef<any>;
  @ContentChild(CustomNgSelectOptionDirective, { read: TemplateRef })
  customNgOption: TemplateRef<any>;

  @Input() disableMarkAllInMultiSelect: boolean = false;
  searchPageNo:number = 1;
  constructor(
    private apiService: ApiService,
    private cdRef: ChangeDetectorRef,
    private sharedService: SharedService,
    private store: Store,
    @Optional() private controlContainer: ControlContainer,
    private jsonListService: JsonListService
  ) { }
  // Custom Templates
  onChange: (value: any) => void;

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === "Backspace") {
      event.stopPropagation();
    }
  }

  @ViewChild("input", { static: false })
  set input(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }

  dropDownClosedEventTriggered() {
    if (this.searchText && this.apiLink !== "") {



      //this.items = this.filterItems("");
      this.originalItemsList = [];
      this.searchText = "";
      this.getAPIList(this.searchText);
    }else if(this.searchText){
        this.items = this.filterItems("");
        this.searchText = "";
      }
  }

  ngOnInit() {
    this.patchData = this.convertIdsToString(this.patchData);

    if (
      this.patchData &&
      this.multiple &&
      this.patchData.every((item) => isNaN(item))
    ) {
      this.items = [...this.patchData, ...this.items];
    } else if (
      this.patchData &&
      !this.multiple &&
      typeof this.patchData === "object"
    ) {
      this.items.push(this.patchData);
    }


    if (this.apiLink !== "") {
      // this.state = this.baseApiList.find(
      //   (item) => item.apiLink === this.apiLink
      // )?.state;

      // const apiLinkSplit = this.apiLink?.split("/");

      // if (!this.state) {
      //   this.state = apiLinkSplit[apiLinkSplit.length - 1];
      // }
      // if (this.state && this.fetchCondition.length === 0) {
      //   this.subs.add(this.store.pipe(select(state => state['app'])).subscribe(data => {
      //     this.subs.unsubscribe();
      //     if (data && data.dropdowns && data.dropdowns[this.state]) {
      //         this.transformAPIList( data.dropdowns[this.state] )
      //       } else {
      //         this.getAPIList();
      //       }
      //     })
      //   )
      // } else {
      this.getAPIList();
    } else if (this.jsonListName !== "") {
      this.getJSONList();
    } else if (this.items && this.items.length > 0) {

      this.originalItemsList = [...this.items];
      this.itemsCount = this.items.length;
      this.cdRef.detectChanges();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.fetchCondition && !changes.fetchCondition.firstChange) || (changes.apiLink && !changes.apiLink.firstChange) || (changes.jsonListName && !changes.jsonListName.firstChange)) {
      if (this.apiLink) {
        this.originalItemsList = [];
        this.currentPage = 1;
        this.items = [];
        this.itemsCount = this.items.length;
        this.getAPIList();
      } else if (this.jsonListName) {
        this.items = this.filterData(this.originalItemsList);
        this.itemsCount = this.items.length;
        if (this.multiple && this.selectedItems && this.selectedItems.length > 0) {
          this.selectedItems = this.items.filter(item => this.selectedItems.includes(item.id)).map(item => item.id)
          this.markedAll = this.items.length === this.selectedItems?.length;
        } else if (!this.multiple && !(this.items.find(item => item.id === this.selectedItems))) {
          this.selectedItems = null
        }

        // this.selectedItems = undefined;
      } else {
        this.originalItemsList = [];
        this.currentPage = 1;
        this.items = [];
        this.itemsCount = this.items.length;
        this.selectedItems = undefined;
      }



      this.setControl();
    }

    if (changes.patchData && !changes.patchData.firstChange) {
      this.selectedItems = changes.patchData.currentValue;
      this.setControl();
    }
    if (changes.isSelectDisabled && !changes.isSelectDisabled.firstChange) {
      this.selectDisable = changes.isSelectDisabled.currentValue;
    }
    if (changes.items && !changes.items.firstChange) {
      if (this.selectedItems !== undefined || (this.selectedItems && this.selectedItems.length > 0)) {
        if (this.multiple) {
          this.selectedItems = this.items.filter(item => this.selectedItems.includes(item.id)).map(item => item.id)
        } else {
          if (!(this.items.find(item => item.id === this.selectedItems))) {
            this.selectedItems = undefined
          }
        }
      }
    }

    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  writeValue(values: any): void {
    values = this.convertIdsToString(values);

    // Set the selected items based on the provided values
    this.selectedItems = values
      ? this.multiple // If multiple selection is enabled
        ? values.every((item) => !isNaN(item))
          ? values
          : values.map((value) => value[this.bindValue]) // If values are valid numbers, use them directly; otherwise, map the values to the corresponding bindValue property
        : this.patchData // If patchData is provided
          ? this.multiple // If multiple selection is enabled
            ? this.patchData.every((item) => isNaN(item))
              ? this.patchData.map((item) => item[this.bindValue])
              : this.patchData // If patchData values are valid numbers, use them directly; otherwise, map the values to the corresponding bindValue property
            : typeof this.patchData === "object"
              ? this.patchData?.id
              : this.patchData // If patchData is an object, use its id property; otherwise, use the patchData value directly
          : values // If patchData is not provided, use the values directly
      : this.patchData // If patchData is provided
        ? this.multiple // If multiple selection is enabled
          ? this.patchData.every((item) => isNaN(item))
            ? this.patchData.map((item) => item[this.bindValue])
            : this.patchData // If patchData values are valid numbers, use them directly; otherwise, map the values to the corresponding bindValue property
          : typeof this.patchData === "object"
            ? this.patchData?.id
            : this.patchData // If patchData is an object, use its id property; otherwise, use the patchData value directly
        : values; // If patchData is not provided, use the values directly

    // Update the form control if controlName is provided
    if (
      (!values || Array.isArray(values) || typeof values === "object") &&
      this.selectedItems &&
      this.controlName &&
      values !== this.selectedItems
    ) {
      this.setControl();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {


    if (this.isSelectDisabled === undefined) {
      this.selectDisable = isDisabled;
    } else {
      this.selectDisable = this.isSelectDisabled;
    }
    // if(!this.isSelectDisabled){
    //   this.isSelectDisabled = isDisabled
    // }
  }
  onSelectChange(event) {


    if (!(event?.target instanceof HTMLInputElement)) {
      const selectedData =
        event !== undefined
          ? this.multiple
            ? event.map((item) => item[this.bindValue])
            : event[this.bindValue]
          : null;

      this.markedAll = this.items.length === this.selectedItems?.length;
      this.onChange(this.raw ? event : selectedData);
      this.writeValue(this.raw ? event : selectedData);
      this.onchange.emit(event);
    }
  }

  onClearClicked(event) {

    this.onChange(null);
    this.onchange.emit(null);
    this.onclear.emit(true);
  }

  getAPIList(search?) {
    this.loading = true;
    let currentPage;
    if(this.searchText){
       currentPage = this.searchPageNo > 1 ? `page=${this.searchPageNo}` : "";
    }
   else{
    currentPage = this.currentPage > 1 ? `page=${this.currentPage}` : "";
   }
    const searchQuery = this.searchText?.length>=3 ? `search=${this.searchText}` : "";
    const conditionQuery =
      this.fetchCondition && this.fetchCondition.length > 0
        ? this.fetchCondition.join("&")
        : "";

    const query =
      searchQuery || conditionQuery || currentPage
        ? `?${[searchQuery, conditionQuery, currentPage]
          .filter(Boolean)
          .join("&")}`
        : "";

    this.apiService
      .get(`${this.apiLink}${query ? query : ""}`, this.scope)
      .subscribe((res: any) => {
        if (res) {
          if(!this.searchText){
            res.data = [...this.originalItemsList, ...res.data];
          }
          this.markedAll = false;
          this.saveToStore(this.state, res);
          this.transformAPIList(res);
        } else {
          this.loading = false;
          this.markedAll = false;
          this.loadMoreLoading = false;
        }
      });
  }

  onSearch(event) {
    this.searchText = event.target["value"];

    if (this.apiLink === "") {
      this.items = this.filterItems(this.searchText);
    } else if (
      this.searchText.length >= 3
    ) {
      const items = this.filterItems(this.searchText)

      if(items.length === 0){
        this.getAPIList(this.searchText);
      }
      else{
        this.items = items;
      }
      this.currentPage = 1;
    } else if (
      this.searchText.length === 0
    ) {
      //this.resetItems();
      this.originalItemsList = [];
      this.items = [];
      this.itemsCount = this.items.length;
      this.searchPageNo = 1;
      this.getAPIList(this.searchText);
    } else {
      this.items = this.filterItems(this.searchText);
    }
  }

  filterItems(searchText) {
    let filteredItems = [];
    if(this.apiLink !== "" && this.apiLink.includes("employee")){

      const searchWords = searchText.trim().toLowerCase().split(" ");

      filteredItems = this.originalItemsList.filter(item =>
        searchWords.some(word =>
          (item?.fullName && item?.fullName?.toLowerCase().includes(word)) ||
          (item?.employeeId && item?.employeeId?.toLowerCase().includes(word)) ||
          (item?.firstName && item?.firstName?.toLowerCase().includes(word)) ||
          (item?.lastName && item?.lastName?.toLowerCase().includes(word))
        )
      );
    }
    else{
       filteredItems = this.originalItemsList.filter((item) =>
      item?.name?.toLowerCase().includes(searchText.toLowerCase())
    );
    }
    this.itemsCount = filteredItems.length;
    return filteredItems;
  }

  resetItems() {
    this.items = [...this.originalItemsList];
    this.itemsCount = this.items.length;
  }

  listLoop = 0;

  getJSONList() {

    this.loading = true;
    this.jsonListService.getDataList(this.jsonListName).subscribe({
      next: (result) => {
        this.markedAll = false;
        this.transformJsonList(result);
      },
    });
  }

  loadMore() {
    if(this.searchText){
      this.searchPageNo++
    }else{
      this.currentPage++;
    }


    this.loadMoreLoading = true;
    this.getAPIList();
  }

  transformAPIList(res) {
    this.itemsCount = res.count;
    const loadMoreIndex = this.items.findIndex(
      (item) => item === this.loadMoreObject
    );
    if (loadMoreIndex !== -1) {
      this.items.splice(loadMoreIndex, 1);
    }

    // Merge the new data from the API with the existing items while preserving order
    let newItems = this.convertIdsToString(res.data);

    if (this.patchData && this.multiple) {
      newItems = newItems.filter(
        (item) => !this.patchData.some((patchItem) => patchItem.id === item.id)
      );
    } else if (this.patchData && !this.multiple) {
      newItems = newItems.filter((item) => this.patchData.id !== item.id);
    }

    this.items = [...this.items, ...newItems];

    this.items = this.filterUniqueObjectsById(this.items)

    this.originalItemsList = [...this.items];
    this.loadMoreNeeded = this.items.length < this.itemsCount;

    if (this.loadMoreNeeded) {
      this.items.push(this.loadMoreObject);
    }

    if (this.multiple && this.selectedItems && this.selectedItems.length > 0) {
      this.selectedItems = this.items.filter(item => this.selectedItems.includes(item.id)).map(item => item.id)
      this.markedAll = this.items.length === this.selectedItems?.length;
    } else if (!this.multiple && !(this.items.find(item => item.id === this.selectedItems))) {
      this.selectedItems = null
    }

    this.loading = false;
    this.loadMoreLoading = false;
    this.setControl()
    this.cdRef.detectChanges();
  }

  transformJsonList(result) {
    result = this.convertIdsToString(result);
    if (this.fetchCondition && this.fetchCondition.length > 0) {
      this.items = this.filterData(result);
    } else {
      this.items = result;
    }
    this.originalItemsList = [...result];
    this.itemsCount = this.items.length;

    this.loading = false;
    this.markedAll = this.items.length === this.selectedItems?.length;






    this.cdRef.detectChanges();
  }

  filterData(data) {
    let filteredData = data.filter((item) => {
      return (this.fetchCondition).every((condition) => {
        if (condition.includes("!=")) {
          const [key, value] = condition.split("!=");
          return item[key.trim()] !== value.toString().trim();
        } else {
          const [key, value] = condition.split("=");
          const targetValues = value.split(',').map(val => val.trim());
          return targetValues.includes(item[key.trim()]);
          //return item[key.trim()] === value.toString().trim();
        }
      });
    });
    return filteredData;
  }

  saveToStore(listName, list) {
    // this.store.dispatch(setDropdownValues({ listName: listName , list : list }));
  }

  convertIdsToString(input) {
    if (Array.isArray(input)) {
      // If it's an array, iterate through its elements
      return input.map((item) => this.convertIdsToString(item));
    } else if (typeof input === "object" && input !== null) {
      // If it's an object, recursively iterate through its properties
      const result = {};
      for (const key in input) {
        if (Object.prototype.hasOwnProperty.call(input, key)) {
          result[key] = this.convertIdsToString(input[key]);
        }
      }
      return result;
    } else if (typeof input === "number") {
      // If it's a number, convert it to a string
      return input.toString();
    } else {
      // If it's neither an array nor an object nor a number, return it as is
      return input;
    }
  }

  setControl() {
    const control = this.controlContainer?.control?.get(this.controlName);
    if (control) {
      control.setValue(this.selectedItems);
    }
  }

  toggleCheckAll(event: any) {
    event.stopPropagation();
    if (event.currentTarget.checked) {
      this.selectAllItems();
    } else {
      this.unselectAllItems();
    }
  }

  private selectAllItems() {
    const newList = this.items.map((x) => x.id);
    this.selectedItems = [...newList];
    if (this.searchText || (this.fetchCondition || []).length > 0) {
      this.onChange(this.selectedItems);
    } else {
      this.onChange("ALL");
    }
    this.onchange.emit(this.items);
  }

  private unselectAllItems() {
    this.selectedItems = [];
    this.onChange(this.selectedItems);
    this.onchange.emit(this.selectedItems);
  }

  private filterUniqueObjectsById = (items) => {
    const uniqueObjectsMap = new Map();

    for (const obj of items) {
      if (!uniqueObjectsMap.has(obj.id)) {
        uniqueObjectsMap.set(obj.id, obj);
      }
    }

    return Array.from(uniqueObjectsMap.values());
  }
}
