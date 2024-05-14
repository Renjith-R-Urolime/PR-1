import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbDateStruct, NgbDatepickerConfig, NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngrx/store";
import { BehaviorSubject, Observable, filter, of, switchMap } from "rxjs";
import { tabs } from "src/app/_metronic/layout/components/aside/tabs";
import { LayoutService } from "src/app/_metronic/layout/core/layout.service";
import { ModalComponent } from "src/app/_metronic/partials/layout/modals/modal/modal.component";
import { addTable, updatePin } from "../store/tables.actions";
import { TableSate } from "../store/tables.state";
import { FileUploadModalComponent } from "../ui/file-upload-modal/file-upload-modal.component";
import { ApiService } from "./api.service";
import { getFileName } from "./json-list/json-list-mapping";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  public numberOfDigitSBeforeDecimal = 3;
  public numberOfDigitAftereDecimal = 3;
  submit: boolean = false;
  componentForm: FormGroup;
  private modalRef: NgbModalRef;
  private apiLoaderSubject = new BehaviorSubject<boolean>(true);
  apiLoader$ = this.apiLoaderSubject.asObservable();
  private loaderSubject = new BehaviorSubject<boolean>(true);
  tableLoader$ = this.loaderSubject.asObservable();
  private cardLoaderSubject = new BehaviorSubject<boolean>(true);
  cardViewLoader$ = this.cardLoaderSubject.asObservable();
  private selectedOptionTextSubject = new BehaviorSubject<string>("");
  private passSearchTextSubject = new BehaviorSubject<string>("");
  private userDataSubject = new BehaviorSubject<string>("");
  public getUserData = this.userDataSubject.asObservable();
  public getSearchText$ = this.passSearchTextSubject.asObservable();
  private passHideValueSubject = new BehaviorSubject<number>(-1);
  private dropDownValueSubject = new BehaviorSubject<boolean>(true);
  private latestCardData = new BehaviorSubject<Object>({});
  private pinnedHeaderSubject = new BehaviorSubject<string[]>([]);
  pinnedHeader$ = this.pinnedHeaderSubject.asObservable();
  private checkedSubject = new BehaviorSubject<boolean[]>([]);
  checkColumn$ = this.checkedSubject.asObservable();
  private employeeDataListSubject = new BehaviorSubject<any[]>([]);
  public getHideValue$ = this.passHideValueSubject.asObservable();
  employeeDataList$ = this.employeeDataListSubject.asObservable();
  private employeeDetails = new BehaviorSubject<any>(null);
  employeeDetails$ = this.employeeDetails.asObservable();
  public employeeIdSubject = new BehaviorSubject<number>(null);
  employeeId$ = this.employeeIdSubject.asObservable();
  public phoneNumberChangeSubject = new BehaviorSubject<number>(null);
  phoneNumberChange$ = this.phoneNumberChangeSubject.asObservable();
  @Output() formDrawerCancel = new EventEmitter<string>();
  @Output() formDrawerSave = new EventEmitter<string>();
  private modalSource = new BehaviorSubject<string>("");
  currentModal = this.modalSource.asObservable();
  private apiSource = new BehaviorSubject<any>({});
  currentApi = this.apiSource.asObservable();
  private apiResponseForSuccess = new BehaviorSubject<any>({});
  currentApiResponse = this.apiResponseForSuccess.asObservable();
  private submitSource = new BehaviorSubject<boolean>(false);
  currentSubmitState = this.submitSource.asObservable();
  lastDay: number;
  public currentDate: Date = new Date();

  public minDate: Date;
  public maxDate: NgbDateStruct;
  accounts: any;
  calendarId: any;
  constructor(
    config: NgbDatepickerConfig,
    private router: Router,
    private layout: LayoutService,
    private http: HttpClient,
    private apiService: ApiService,
    private store: Store<TableSate>,
    private modalService: NgbModal
  ) {
    this.getYear();
  }


  reloadEvent: EventEmitter<void> = new EventEmitter<void>();
  selectedOptionText$ = this.selectedOptionTextSubject
    .asObservable()
    .pipe(filter((value) => value.trim() !== ""));

  private accountIdsSubject = new BehaviorSubject<string[]>([]);

  setAccountIds(accountIds: string[]): void {
    this.accountIdsSubject.next(accountIds);
  }

  getAccountIds(): Observable<string[]> {
    return this.accountIdsSubject.asObservable();
  }

  updatePinHeaders(data) {
    this.pinnedHeaderSubject.next(data);
  }
  updateAPILoader(value) {
    this.apiLoaderSubject.next(value);
  }
  updateCardViewLoader(value) {
    this.cardLoaderSubject.next(value);
  }
  emitEmployeeDataList(data: any[]) {
    this.employeeDataListSubject.next(data);
    ////console.log("ROY",   this.employeeDataListSubject.next(data))
  }
  setSelectedOptionText(value: string) {
    this.selectedOptionTextSubject.next(value);
  }
  updateCheckColumn(data) {
    this.checkedSubject.next(data);
  }
  getTheme(): string {
    const currentRoute = this.router.url.split("/")[1]; // Get the current route and remove any query parameters
    const matchingMenu = tabs.find((menu) =>
      menu.mainMenuLink.includes(currentRoute)
    );
    return matchingMenu ? matchingMenu.mainMenuColor : ""; // Return empty string if no match is found
  }
  updateLatestCardData(value) {
    this.latestCardData.next(value);
  }
  updateSearchText(text: string) {
    this.passSearchTextSubject.next(text);
  }
  updateHideValue(hideValue: number) {
    this.passHideValueSubject.next(hideValue);
  }
  updateDropdownState(close) {
    this.dropDownValueSubject.next(close);
  }
  triggerReload() {
    this.reloadEvent.emit();
  }

  updateSubmitState(newState: boolean) {
    this.submitSource.next(newState);
  }
  formatEmployeeSettings(input: string): string {
    ////console.log(input);
    return input
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  getPageName(): string {
    // Get the current module and page name of any route
    const url = this.router.url.split("?")[0];
    const currentModuleRoute = url.split("/")[1];
    const currentPageRoute = url.split("/")[2];
    const currentSubRoute = url.split("/")[3];
    ////console.log(currentModuleRoute,currentPageRoute,currentSubRoute);
    const mainMenu = tabs.find((item) =>
      item.mainMenuLink.includes(currentModuleRoute)
    );
    let currentSubMenu;
    let tabData;
    if (mainMenu && mainMenu.subMenu.length > 0) {
      currentSubMenu = mainMenu?.subMenu.find((item) =>
        item.subMenuLink.includes(currentPageRoute)
      );
    }
    if (
      currentSubRoute &&
      currentSubMenu &&
      currentSubMenu.subMenu.length > 0
    ) {
      tabData = currentSubMenu?.subMenu.find((i) =>
        i.subMenuLink.includes(currentSubRoute)
      );
    }
    let currentPageName;
    if (tabData) {
      currentPageName = tabData?.subMenuText;
    } else {
      currentPageName = currentSubMenu?.subMenuText;
    }
    ////console.log(currentPageName);
    return currentPageName;
  }

  getModuleIcon(): string {
    // Get the current module and page name of any route
    const url = this.router.url.split("?")[0];
    const currentModuleRoute = url.split("/")[1];
    const currentPageRoute = url.split("/")[2];
    const currentSubRoute = url.split("/")[3];
    ////console.log(currentModuleRoute,currentPageRoute,currentSubRoute);
    const mainMenu = tabs.find((item) =>
      item.mainMenuLink.includes(currentModuleRoute)
    );
    let currentSubMenu;
    let tabData;
    if (mainMenu && mainMenu.subMenu.length > 0) {
      currentSubMenu = mainMenu?.subMenu.find((item) =>
        item.subMenuLink.includes(currentPageRoute)
      );
    }
    if (
      currentSubRoute &&
      currentSubMenu &&
      currentSubMenu.subMenu.length > 0
    ) {
      tabData = currentSubMenu?.subMenu.find((i) =>
        i.subMenuLink.includes(currentSubRoute)
      );
    }
    let moduleIcon;
    if (tabData) {
      moduleIcon = tabData?.subMenuIcon;
    } else {
      moduleIcon = currentSubMenu?.subMenuIcon;
    }
    return moduleIcon;
  }

  //Trapezoid tabs
  private selectedTabLabelSubject = new BehaviorSubject<string>("");
  public selectedTabLabel$ = this.selectedTabLabelSubject.asObservable();
  updateTrapezoidTabLabel(label: string): void {
    this.selectedTabLabelSubject.next(label);
  }
  checkLinkActive = (pathname: string, url: string) => {
    const current = pathname.split(/[?#]/)[0];
    if (!current || !url) {
      return false;
    }
    if (current === url) {
      return true;
    }
    if (current.indexOf(url) > -1) {
      return true;
    }
    return false;
  };

  //Global Events
  public isAsideMenuOpen: EventEmitter<any> = new EventEmitter();
  isAsideMenuEvent(data: any) {
    this.isAsideMenuOpen.emit(data);
  }

  setCalendarId(id: any) {
    this.calendarId = id
  }

  // Convert Data to data table format
  private headersSubject = new BehaviorSubject<string[]>([]);
  public headers$ = this.headersSubject.asObservable();

  async convertTableList(data): Promise<any> {
    ////console.log(data);

    let keys = [];
    let tableValue = [];
    let count = 0;
    let columns = [];
    const excludedHeaders = [
      "createdAt",
      "logo",
      "details",
      "id",
      "customField",
      "inactive",
    ];
    if (data?.data.length > 0) {
      if (data?.data?.length > 0) {
        keys = Object.keys(data?.data[0]).filter(
          (key) => !excludedHeaders.includes(key)
        );
        columns = keys.map((key) => {
          return { name: key };
        });
        tableValue = data?.data;
        count = data?.count;
      }
    }
    const tableData = {
      columns: columns,
      collectionSize: count,
      data: tableValue,
    };

    this.headersSubject.next(keys); // Emit the keys to subscribers

    return tableData;
  }

  convertCardData(data) {
    return data.data.map(({ logo, name, country, currency, website }) => ({
      logo,
      name,
      country,
      currency,
      website,
    }));
  }

  private cachedData: { [field: string]: Observable<any> } = {};

  getDataList(field: string): Observable<any> {
    const { fileName, extractProperty, parentIdName } = getFileName(field);

    if (fileName !== undefined) {
      if (extractProperty) {
        return this.apiService.get(`resources/file/${fileName}.json`).pipe(
          switchMap((response: any) => {
            const data = response as any[];
            const flattenedData = data
              .map((item) =>
                item[extractProperty]?.map((subItem) => ({
                  ...subItem,
                  [parentIdName]: item.id,
                }))
              )
              .flat();
            return of(flattenedData.filter(Boolean));
          })
        );
      } else {
        return this.apiService.get(`resources/file/${fileName}.json`);
      }
    }

    return of({})
  }

  //store functions
  addNewTable(tableName, pinnedHeaders, pin, hideCol, checkedCol) {
    this.store.dispatch(
      addTable({ tableName, pinnedHeaders, pin, hideCol, checkedCol })
    );
  }
  updatePin(tableName, pinnedHeaders, pin, hideCol, checkedCol) {
    this.store.dispatch(
      updatePin({ tableName, pinnedHeaders, pin, hideCol, checkedCol })
    );
  }

  getCurrentApi() {


    // Get the current page name of any route
    const url = this.router.url.split("?")[0];
    const currentModuleRoute = url.split("/")[1];
    const currentPageRoute = url.split("/")[2];
    const currentSubRoute = url.split("/")[3];
    const mainMenu = tabs.find((item) =>
      item.mainMenuLink.includes(currentModuleRoute)
    );

    let currentSubMenu;
    let tabData;
    if (mainMenu && mainMenu.subMenu.length > 0) {
      currentSubMenu = mainMenu?.subMenu.find((item) =>
        item.subMenuLink.includes(currentPageRoute)
      );


    }
    if (
      currentSubRoute &&
      currentSubMenu &&
      currentSubMenu.subMenu.length > 0
    ) {
      tabData = currentSubMenu?.subMenu.find((i) =>
        i.subMenuLink.includes(currentSubRoute)
      );
    }

    let currentApiUrl = "";
    let scope = "";
    if (tabData) {
      currentApiUrl = tabData?.apiLink;
      scope = tabData?.scope;
    } else {
      currentApiUrl = currentSubMenu?.apiLink;
      scope = currentSubMenu?.scope
    }

    return {
      "url": currentApiUrl,
      "scope": scope
    };
  }

  private baseApi: string = "";

  setBaseApi(api: string): void {
    this.baseApi = api;
  }

  getBaseApi(): string {
    return this.baseApi;
  }

  hasValidationErrors(label: any, submit: boolean, form: FormGroup): boolean {
    return (
      submit &&
      label.validations !== undefined &&
      label.validations.some((validation) => {
        return form
          .get(label.labelName.defaultValue)
          ?.hasError(validation.name);
      })
    );
    return false;
  }
  closeSideBar() {
    ////console.log(tab)
    this.layout.setProp("aside.secondaryDisplay", false);
    this.layout.updateAsideMenuSecondary();
    document.body.classList.remove(`aside-secondary-enabled`);
    document.body.classList.add("aside-secondary-disabled");
    // this.cd.detectChanges();
    // KTHelpers.menuReinitialization();
  }

  onModalClose() {
    this.modalRef.close();
  }

  handleSuccessModel(data) {
    this.modalRef = this.modalService.open(ModalComponent, {
      centered: true,
      size: "fit",
      windowClass: "full-screen-modal",
      backdrop: "static",
      keyboard: false,
    });

    this.modalRef.componentInstance.createdId = data?.id;
    this.modalRef.componentInstance.customTemplate = data?.btnTemplate;
    // Conditionally override properties if data is defined
    if (data) {
      this.modalRef.componentInstance.successMessage =
        data.successMessage ?? this.modalRef.componentInstance.successMessage;
      this.modalRef.componentInstance.confirmMessage =
        data.confirmMessage ?? this.modalRef.componentInstance.confirmMessage;
      this.modalRef.componentInstance.sumbmittingLogo =
        data.sumbmittingLogo ?? this.modalRef.componentInstance.sumbmittingLogo;
      this.modalRef.componentInstance.modalLogo =
        data.modalLogo ?? this.modalRef.componentInstance.modalLogo;
      this.modalRef.componentInstance.isButton =
        data.isButton ?? this.modalRef.componentInstance.isButton;
      this.modalRef.componentInstance.modalName =
        data.modalName ?? this.modalRef.componentInstance.modalName;
    }
  }

  handleOpenFileUploadModel(size) {
    this.modalRef = this.modalService.open(FileUploadModalComponent, {
      size: size, centered: true, scrollable: false, windowClass: 'payroll-submit-form-modal', backdrop: 'static'
    });
  }


  changeModalData(modalData: string) {

    this.modalSource.next(modalData);
  }

  apiResponse(total: any, valid: any, error: any, success: any, csvData: any) {
    this.apiResponseForSuccess.next({ total: total, valid: valid, error: error, success: success, csvData: csvData});

  }

  changeApiResponses(apiType: any, exportType: string, file) {
    this.apiSource.next({ apiType: apiType, exportType: exportType, file: file });
  }

  // getTimeDifference(time1Input, time2Input) {
  //   const time1: any = new Date("1970-01-01T" + time1Input + "Z");
  //   const time2: any = new Date("1970-01-01T" + time2Input + "Z");

  //
  //

  //   // Check if dates are valid
  //   if (isNaN(time1) || isNaN(time2)) {
  //
  //   } else {
  //       // Calculate the time difference in milliseconds
  //       const timeDifferenceMs = Math.abs(time2 - time1);
  //


  //   // Convert the time difference to hours and minutes
  //   let hours: any = Math.floor(timeDifferenceMs / 3600000);
  //   let minutes: any = Math.floor((timeDifferenceMs % 3600000) / 60000);

  //   if (String(hours).length === 1) {
  //     ////console.log('0' + String(hours));
  //     hours = "0" + String(hours);
  //   }
  //   if (String(minutes).length === 1) {
  //     ////console.log('0' + String(minutes));
  //     minutes = "0" + String(minutes);
  //   }
  //   ////console.log(hours, minutes);
  //   return hours + ":" + minutes;
  // }
  // }


  getTimeDifference(time1Input, time2Input) {
    const currentDate = new Date();
    const time1 = new Date(currentDate.toDateString() + ' ' + time1Input);
    const time2 = new Date(currentDate.toDateString() + ' ' + time2Input);

    // Check if dates are valid
    if (isNaN(time1.getTime()) || isNaN(time2.getTime())) {

      return null;
    }

    if (time2 < time1) {
      time2.setDate(time2.getDate() + 1);
    }

    // Calculate the time difference in milliseconds
    // Convert Date objects to timestamps (number) for arithmetic operation
    const timeDifferenceMs = Math.abs(time2.getTime() - time1.getTime());

    // Convert the time difference to hours and minutes
    const hours = Math.floor(timeDifferenceMs / 3600000);
    const minutes = Math.floor((timeDifferenceMs % 3600000) / 60000);

    // Pad single-digit hours and minutes with leading zeros
    const formattedHours = hours < 10 ? "0" + hours : hours.toString();
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();

    return formattedHours + ":" + formattedMinutes;
  }

  getTimeSum(time1Input, time2Input) {
    // Split the time inputs into hours and minutes
    const [hours1, minutes1] = time1Input.split(":").map(Number);
    const [hours2, minutes2] = time2Input.split(":").map(Number);

    // Calculate the sum of hours and minutes
    let sumHours = hours1 + hours2;
    let sumMinutes = minutes1 + minutes2;

    // Handle carry-over if sum of minutes exceeds 60
    if (sumMinutes >= 60) {
      sumHours += Math.floor(sumMinutes / 60);
      sumMinutes %= 60;
    }

    // Format the sum of hours and minutes
    const formattedSumHours = sumHours < 10 ? "0" + sumHours : sumHours.toString();
    const formattedSumMinutes = sumMinutes < 10 ? "0" + sumMinutes : sumMinutes.toString();

    return formattedSumHours + ":" + formattedSumMinutes;
  }

  //   getUserEmail(userName){
  // this.userDataSubject.next(userName)
  //   }


  getDateDifference(startDateInput, endDateInput) {
    const startDate = new Date(startDateInput);
    const endDate = new Date(endDateInput);

    // Check if dates are valid
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {

      return null;
    }

    // Calculate the time difference in milliseconds
    const timeDifferenceMs = Math.abs(endDate.getTime() - startDate.getTime());

    // Convert the time difference to days
    const days = Math.ceil(timeDifferenceMs / (1000 * 60 * 60 * 24)) + 1;

    return days;
  }


  removeUndefinedAndNullFields<T>(obj: T): T {
    const result: any = {};

    for (const key in obj) {
      if (obj[key] !== undefined && obj[key] !== null) {
        result[key] = obj[key];
      }
    }

    return result as T;
  }


  /////////////////////////////////////Employee Details////////////////////////////////////////////
  setEmployeeDetails(employeeDetails: any, employeeId?) {
    this.employeeDetails.next(employeeDetails);
    if (employeeId) {
      this.employeeIdSubject.next(employeeId);
    }
  }

  formatDate(event: any) {
    let input = event.target.value;


    let formattedInput = input.replace(/\D/g, '');


    if (formattedInput.length > 0) {
      if (formattedInput.includes('/')) {


        formattedInput = formattedInput.replace(/\//g, ''); // Remove sl


      }
      if (formattedInput.length === 8) {

      }
      formattedInput = formattedInput.slice(0, 8);
      const year = parseInt(formattedInput.slice(0, 4), 10);
      const month = parseInt(formattedInput.slice(4, 6), 10);
      let day = parseInt(formattedInput.slice(6, 8), 10);
      if ((month) > 12) {
        formattedInput = formattedInput.slice(0, 4) + '12';
      }
      else {
        let lastDayOfMonth = new Date(year, Number(month), 0);
        // Get the day number (the last day of the month)
        let endDayOfMonth = lastDayOfMonth.getDate();
        this.lastDay = endDayOfMonth
      }

      if (day > this.lastDay) {
        day = this.lastDay;
        formattedInput = formattedInput.slice(0, 6) + day;
      }

      // Add slashes based on the length of the string
      if (formattedInput.length >= 5 && formattedInput.length < 7) {
        formattedInput = formattedInput.replace(/(\d{4})(\d{0,2})/, '$1/$2');
      } else if (formattedInput.length > 6 && formattedInput.length <= 8) {
        formattedInput = formattedInput.replace(/(\d{4})(\d{0,2})(\d{0,2})/, '$1/$2/$3');
      }

    }
    event.target.value = formattedInput;
  }

  private getYear(): void {
    const minYear = this.currentDate.getFullYear() - 100; // 100 years before the current year
    const maxYear = this.currentDate.getFullYear() + 100; // 100 years after the current year

    this.minDate = new Date(minYear);
    this.maxDate = { year: maxYear, month: 12, day: 31 };
  }

  /////////////////////////////////////////Updating employee details/////////////////////////////////////////////////////////////////////
  updateEmployeeData() {
    const employeeId = this.employeeIdSubject.value;

    this.apiService.get(`core-hr/employee/${employeeId}`, 'profile').subscribe({
      next: (res: any) => {
        if (res) {

          /////////////////////////////
          this.setEmployeeDetails(res?.data)
        }
      }, error: (error: any) => {

        //console.error(error);
      }
    });
  }

  viewBuffer(buffer: Blob, fileName){
      const blob = new Blob([buffer], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');

      return url;
  }
}
