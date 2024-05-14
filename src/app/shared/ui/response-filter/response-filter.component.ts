import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { menuReinitialization } from 'src/app/_metronic/kt/kt-helpers';
import { ApiService } from '../../services/api.service';
import { JsonListService } from '../../services/json-list/json-list.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-response-filter',
  templateUrl: './response-filter.component.html',
  styleUrls: ['./response-filter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ResponseFilterComponent,
      multi: true
    }
  ]
})
export class ResponseFilterComponent implements ControlValueAccessor {
  @ViewChild('listContainer') listContainer!: ElementRef;

  selectedEmployee: any;
  loading: boolean = false;
  currentPage: number = 1;
  formTemplate: TemplateRef<any>;
  theme: string = this.sharedService.getTheme();
  @Input() ngClass: any;
  originalItemsList: any = [];
  previousState: any = []
  @Input() scope: string = 'dropdown';
  @Input() apiLink: string = '';
  @Input() jsonListName: string = '';
  @Input() employeeScope: string = 'dropdown';
  @Input() placeholder: string = 'Select Employee';
  @Input() responseFilterMeta: any
  @Input() selectedItem: any

  currentDataSet: any
  @Input() isDisabled: boolean;
  @Input() submitDisabled: boolean = false;
  @Input() items: any[] = [];
  datas: any
  @Input() fetchCondition: string[] = []
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  filter: any;
  searchText: string;
  filteredQueryParams: any[] = []
  sectionName: string
  filterActive: boolean = true
  @Output() onSelectedNames: EventEmitter<string[]> = new EventEmitter<string[]>(); // New event emitter

  itemsCount: number = 0;
  // ControlValueAccessor implementation
  onChange: any = () => { };
  onTouch: any = () => { };
  dateSelected: any;
  toDate: any;
  fromDate: Date;
  selectedNames: string[];

  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  writeValue(value: any): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  constructor(private sharedService: SharedService, private apiService: ApiService, private cdRef: ChangeDetectorRef, private jsonListService: JsonListService) {
  }
  ngOnInit() {
    if (this.responseFilterMeta) {
      this.getAPIList()
    }
    menuReinitialization();




  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedItem) {
      if (!changes.selectedItem.firstChange) {
        if (this.selectedItem.length != this.selectedNames.length) {
          this.resetAll()
          this.processSelectedItems(this.selectedItem)
        }

        // const currentValue = changes?.selectedItem?.currentValue; // Assuming SelectedItem contains the current value to be checked
        // for (const component of this.datas) {
        //   const componentName = component?.name?.replace('Id', '');
        //   for (const dataItem of component.data) {
        //     let marked = false;
        //     currentValue?.forEach(item => {
        //       if (componentName === item.label && dataItem.id === item.id) {
        //         marked = true;
        //       }
        //     })
        //     dataItem.selected = marked;
        //   }
        // }
        // Iterate through all items in datas and mark unmatched items as selected: false

      }
    }

  }


  submitData(selectedNames: string[]) {
    this.onSelectedNames.emit(selectedNames); // Emit selected names through the new event emitter
  }

  getAPIList(search?) {
    this.loading = true;
    this.sectionName = this.responseFilterMeta.labels[0].sectionName
    const currentPage = this.currentPage > 1 ? `page=${this.currentPage}` : '';
    const searchQuery = search ? `search=${search}` : '';
    const conditionQuery = this.fetchCondition && this.fetchCondition.length > 0 ? this.fetchCondition.join('&') : '';
    const query = (searchQuery || conditionQuery || currentPage) ? `?${[searchQuery, conditionQuery, currentPage].filter(Boolean).join('&')}` : '';
    // Collect all the observables to be merged using forkJoin
    const requests = this.responseFilterMeta.labels.map(meta => {
      if (meta.jsonListName) {
        if (meta.jsonListName == 'year') {
          const currentYear = new Date().getFullYear();
          const yearList = Array.from({ length: 5 }, (_, index) => {
            const year = currentYear - 4 + index;
            return { id: year.toString(), name: year.toString() };
          });

          const transformedData = {
            message: `List of ${meta.jsonListName}`,
            data: yearList,
            count: yearList.length,
          };

          return of(transformedData);
        }
        /*   if (meta.jsonListName == 'month') {
            const monthList = this.monthNames.map((month, index) => {
              return { id: (index + 1).toString(), name: month };
            });
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            monthList.map((month, index) => ({
              ...month,
              selected: index === currentMonth // Set selected to true for the current month
            }));
            const transformedData = {
              message: `List of ${meta.jsonListName}`,
              data: monthList,
              count: monthList.length,
            };
            return of(transformedData);
          } */

        // If jsonListName is present in meta, fetch data using getJSONList
        return this.jsonListService.getDataList(meta.jsonListName).pipe(
          catchError(error => {
            console.error(`Error in fetching data for ${meta.jsonListName}`, error);
            return of({ data: null });
          }),
          map(response => {

            let jsonListRes = response
            if (meta.jsonListName == 'month') {
              const currentDate = new Date();
              const currentMonth = currentDate.getMonth(); // Get the current month (0-indexed)

              jsonListRes = response.map((month, index) => ({
                ...month // Set selected to true for the current month
              }));
            }
            // Transform the response to include the 'selected' property for each month
            const transformedData = {
              message: `List of ${meta.jsonListName}`,
              data: jsonListRes,
              count: (response || []).length,
            };
            return transformedData;
          })
        );
      }
      else {
        const modifiedLink = meta.apiLink;
        return this.apiService.get(`${modifiedLink}${query ? query : ''}`, this.employeeScope ? this.employeeScope : 'dropdown')
          .pipe(
            take(1),
            catchError(error => {
              console.error(`Error in API request for ${modifiedLink}`, error);
              return of({ data: null });
            })
          );
      }
    });

    // Merge all observables using forkJoin
    forkJoin(requests).subscribe((responses: any[]) => {

      if (responses) {
        this.loading = false
      }
      this.datas = this.responseFilterMeta.labels
        .map((meta, index) => {
          const data = responses[index]?.data || [];
          return data.length > 0 ? { data, name: meta?.labelName?.defaultValue, customQueryParamsName: meta?.labelName?.customQueryParamsName, label: meta?.labelName?.alias, multiple: meta?.multiple, type: meta?.type, required: meta?.required } : null;
        })
        .filter(item => item !== null);
      this.processResponses();
      this.originalItemsList = JSON.stringify(this.datas);

      if (this.selectedItem) {
        this.loading = true

        this.processSelectedItems(this.selectedItem)
      }
    });
  }

  processResponses() {
    const dateTypeData = this.responseFilterMeta.labels
      .filter(meta => meta.type === 'date')
      .map((meta) => ({
        label: meta.labelName?.alias,
        type: meta.type,
        name: meta?.labelName?.defaultValue,
        multiple: meta?.multiple,
        defaultValue: meta?.defaultValue,
        required: meta?.required
      }));

    const firstMonthIndex = this.datas.findIndex(item => item.type === 'month');

    if (firstMonthIndex !== -1) {
      this.datas.splice(firstMonthIndex, 0, ...dateTypeData);
    } else {
      this.datas.push(...dateTypeData);
    }

  }



  ///////////////////////////Processs for sleected data////////////////////////////////////////////////////////////////////

  processSelectedItems(items: any[]): void {
    items.forEach(item => {
      const index = this.findIndexByName(this.datas, item.name);

      if (index !== -1) {
        item['selected'] = item.hasOwnProperty('selected') ? item.selected : true;
        this.onSelectChange(null, index,null,item);
      } else {

      }
    });
    this.datas=JSON.parse(this.originalItemsList)
    this.loading = false
    this.filteredQueryParams = this.extractSelectedData(JSON.parse(this.originalItemsList));


    const selectedNames = this.extractSelectedName(JSON.parse(this.originalItemsList));

    this.comparingWithObtainedItems(this.filteredQueryParams,this.selectedItem)
    this.selectedNames=selectedNames
  }







comparingWithObtainedItems(queryParams,selectedItems){
  let aObject = {};
  queryParams.forEach(item => {
      let [key, value] = item.split("=");
      aObject[key] = value;
  });

  // Check each item in items
  selectedItems.forEach(item => {
      // Use customParamsName if it exists, otherwise use name
      let itemName = item.customQueryParamsName || item.name;
      if (item.required && !(itemName in aObject)) {
          queryParams.push(`${itemName}=${item.id}`);
      }
  });

  this.onSubmit.emit(queryParams);
  this.onSelectedNames.emit(selectedItems);
}

  onDrawerSave(event: any) {
    if (!this.submitDisabled) {
      this.filteredQueryParams = this.extractSelectedData(JSON.parse(this.originalItemsList));
      this.onSubmit.emit(this.filteredQueryParams);
      const selectedNames = this.extractSelectedName(JSON.parse(this.originalItemsList));
      this.onSelectedNames.emit(selectedNames);
    }
  }

  onDrawerCancel($event) {
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Backspace') {
      event.stopPropagation();
    }
  }

  atLeastOneSelected(items: any[], currentIndex: number): boolean {
    return items.some((item, index) => index !== currentIndex && item.selected);
  }

  onSelectChange(event, i, j, currentItem) {
    const parsedObject = JSON.parse(this.originalItemsList);
    const selectedNames: string[] = [];

    parsedObject[i].data.forEach(item => {
      if (item.id === currentItem.id) {
        item.selected = currentItem.selected;
      }
      if (item.selected) {
        selectedNames.push(item.name); // Push the name of selected items into the array
      }
    });

    const totalSelected = selectedNames.length;
    parsedObject[i].count = totalSelected;
    this.datas[i].count = totalSelected;
    this.originalItemsList = JSON.stringify(parsedObject);
    // this.selectedNames = selectedNames


    const objectsWithRequiredTrue = parsedObject.filter(obj => obj.required === true);

    const allRequiredObjectsHaveSelectedTrue = objectsWithRequiredTrue.every(obj =>
      obj.data.some(item => item.selected === true)
    );
    this.submitDisabled = !allRequiredObjectsHaveSelectedTrue

    this.cdRef.detectChanges();


  }

  onSearch(event, i) {
    this.searchText = event.target['value']
    if (this.datas[i].data) {
      this.currentDataSet = this.datas[i].data.slice();
    }
    const filteredItem = this.filterItems(this.searchText, i)
    this.datas[i].data = filteredItem


  }

  filterItems(searchText, i) {
    const filteredItems = JSON.parse(this.originalItemsList)[i].data.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    this.itemsCount = filteredItems.length;
    return filteredItems;
  }

  resetItems() {
    this.items = [...this.originalItemsList];
    this.itemsCount = this.items.length;
  }

  fromDateChange(fromDate: Date) {
    this.fromDate = fromDate

  }
  toDateChange(toDate: any) {
    this.toDate = toDate

  }

  formatDate(newDate: Date) {
    throw new Error('Method not implemented.');
  }

  extractSelectedData(data) {
    const result = [];

    data?.forEach(component => {
      const componentName = component.name;
      const customQueryParamsName = component?.customQueryParamsName
      const selectedObjects = component?.data?.filter(item => item.selected === true);

      if (selectedObjects && selectedObjects?.length > 0) {
        if (customQueryParamsName) {
          const objectIds = selectedObjects.map(selectedObject => selectedObject.id);
          result.push(`${customQueryParamsName}=${objectIds.join(',')}`);
        }
        else {
          const objectIds = selectedObjects.map(selectedObject => selectedObject.id);
          result.push(`${componentName}=${objectIds.join(',')}`);
        }
      }
      else if (componentName === 'fromDate' && this.fromDate !== undefined) {
        result.push(`${componentName}=${this.fromDate}`);
      }
      else if (componentName === 'toDate' && this.toDate !== undefined) {
        result.push(`${componentName}=${this.toDate}`);
      }
    });

    return result;
  }


  reset(i) {
    const jsonString = this.originalItemsList
    const parsedObject = JSON.parse(this.originalItemsList);
    parsedObject[i].data.forEach(item => {
      item.selected = false;
    });
    this.datas[i].data.forEach(item => {
      item.selected = false;
    });
    const totalSelected = parsedObject[i].data.filter(item => item.selected).length;
    parsedObject[i].count = totalSelected;
    this.datas[i].count = totalSelected
    this.originalItemsList = JSON.stringify(parsedObject);
  }

  //////////////////////////////////////////////////////////////////////
  extractSelectedName(data) {
    const result = [];


    data.forEach(component => {
      const componentName = component.name;
      if (componentName == 'country') {
        component?.data?.forEach(item => {
          if (item?.selected) {
            result.push({
              "id": item?.id,
              "label": item?.name,
              "name": component?.name,
              "currency": item?.currency,
              "required": component?.required,
              "customQueryParamsName":component?.customQueryParamsName
            })
          }
        })
      }
      else {
        component?.data?.forEach(item => {
          if (item?.selected) {
            result.push({
              "id": item?.id,
              "label": item?.name,
              "name": component?.name,
              "required": component?.required,
              "customQueryParamsName":component?.customQueryParamsName
            })
          }
        })
      }


      // const selectedObjects = component.data.filter(item => item.selected === true);


      /* if (selectedObjects.length > 0) {
        const namesArray = selectedObjects.map(selectedObject => selectedObject.name);
        result.push(...namesArray); // Spread the namesArray into the result array
      } */
      //result.push(...selectedObjects)
    });

    return result;
  }
  scrollToTop() {
    this.listContainer.nativeElement.scrollTo({
      top: 0,
      behavior: 'smooth' // Enable smooth scrolling
    });
  }



  findIndexByName(dataArray: any[], name: string): number {
    return dataArray.findIndex(item => item.name === name);
  }




  resetAll() {
    const parsedObject = JSON.parse(this.originalItemsList);
    parsedObject.forEach(obj => {
      obj.data.forEach(item => {
        item.selected = false;
      });
      obj.count = 0; // Reset count
    });
    this.originalItemsList = JSON.stringify(parsedObject);
  }










}
