import { Location } from "@angular/common";
import { ChangeDetectorRef, Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/shared/services/api.service";
import { SharedService } from "src/app/shared/services/shared.service";
import { WizardService } from "src/app/shared/services/wizard.service";
import { WizardTabs } from "src/app/shared/ui/wizard-tabs/wizard-tabs";
import { SubSink } from "subsink";
import {
  allReportsData,
  employeeFilterMeta,
  oneTimeTableData,
  payrollTableData,
  wizardTabs,
} from "../run-payroll.data";
@Component({
  selector: "app-create-payroll",
  templateUrl: "./create-payroll.component.html",
  styleUrls: ["./create-payroll.component.scss"],
})
export class CreatePayrollComponent {
  // Employee
  employeeList: any[] = [];
  selectedEmployees: any[] = [];
  employeeCache: any[] = [];
  employeeCount: any = 0;
  selectedEmployeeCount: any = 0;
  employeeNotIncludedCount: number = 0;

  // Processing
  isProcessing: boolean = false;
  isLoading: boolean = true;
  loading: boolean = false;
  subs = new SubSink();

  // Payroll
  payrollType: any;
  cacheId: any;
  batchId: string = "";
  step1Total: number = 0;

  payrollTableData: any;
  currency: string;

  // UI
  shades: string[] = ["", "light", "bright", ""];
  theme: string = this.sharedService.getTheme();
  currentStep: any;
  isCollapsed1: boolean = true;
  isCollapsed2: boolean = true;
  isExpanded1: boolean[];
  isExpanded2: boolean[];
  selectAllChecked: boolean = false;
  applyButton: boolean = false;
  collapsed: boolean = true;

  // Wizard
  wizardData: WizardTabs = wizardTabs;

  // Additional component
  additionalComponent: any[] = [];
  isAdditionalComponentChecked: boolean[] = [];

  // Date
  currentMonth: number;
  currentMonthName: string;
  currentYear: number;
  currentDate: Date = new Date();
  firstDateOfMonth: string = this.getFirstDateOfMonth();
  lastDateOfMonth: string = this.getLastDateOfMonth();

  // Pagination
  pageSize: number = 2000;
  collectionSize: number = 5;
  page: number = 1;

  // Filtering
  filterCondition: any;
  filterText: string;
  selectedItem: any;
  preventRefresh: boolean = false
  errorMessage: string;

  // Total
  totalSummary: number = 0;
  totalGrossPay: any = 0;

  // API response
  allReportsData: any = allReportsData;

  // Layout
  private itemHeight = 40;
  private numberOfItems = 10;

  // Input
  @Input() employeeFilterMeta: any = employeeFilterMeta;

  constructor(
    private sharedService: SharedService,
    private wizardService: WizardService,
    private router: Router,
    private apiService: ApiService,
    private _location: Location,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.currentMonth = this.currentDate.getMonth() + 1; // Months are zero-based, so add 1
    this.currentYear = this.currentDate.getFullYear();
    const monthName = new Date(2000, this.currentDate.getMonth()).toLocaleString(
      "default",
      { month: "long" }
    );
    this.filterCondition = [
      `month=${this.currentMonth}`,
      `year=${this.currentYear}`,
    ];
    this.currentMonthName = this.getCurrentMonthName(this.currentDate);
  }
  ngOnInit(): void {
    console.log('ngOnInit');
    //this.payrollType = this.router.url.split('/').pop();
    this.getCountry();
    this.subs.sink = this.route.params.subscribe((params) => {
      this.payrollType = params["type"];
    });
    if (
      this.payrollType === "regular" ||
      this.payrollType === "full-and-final"
    ) {
      this.payrollTableData = payrollTableData;
    } else if (this.payrollType === "one-time") {
      this.payrollTableData = oneTimeTableData;
    }
    this.subs.sink = this.wizardService.currentStep$.subscribe((currentStep) => {
      // Use the currentStep value as needed
      this.currentStep = currentStep;
      // Perform your logic or update the component based on the currentStep value
    });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  getCurrentMonthName(date): string {
    console.log('getCurrentMonth');
    return date.toLocaleString("default", { month: "short" });
  }
  getFirstDateOfMonth(): string {
    console.log('getFirstDateOfMonth');
    const firstDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );
    return firstDate.toLocaleDateString("default", { day: "numeric" });
  }
  getLastDateOfMonth(): string {
    console.log('getLastDateOfMonth');
    const lastDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    );
    return lastDate.toLocaleDateString("default", { day: "numeric" });
  }
  private getEmployees() {
    console.log('getEmployees');
    this.isLoading = true;
    const searchParam =
      this.filterText !== undefined && this.filterText !== ""
        ? `&search=${this.filterText}`
        : "";
    this.subs.sink = this.apiService
      .get(
        `payroll/run/${this.payrollType}/employees?page=${this.page}&limit=${
          this.pageSize
        }&${this.filterCondition.join("&")}${searchParam}`
      )
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.page++;
            this.cacheId = res?.cacheId;
            this.additionalComponent = res?.components;
            this.isAdditionalComponentChecked = Array<boolean>(
              res?.components?.length ?? 0
            ).fill(true);
            this.employeeCount = res?.count;
            this.employeeNotIncludedCount =
              this.employeeCount - this.selectedEmployeeCount;
            res?.data?.forEach((member: any) => {
              member.isChecked = false;
              member?.additionalComponents?.earnings?.forEach((e) => {
                e.isChecked = true;
              });
              member?.additionalComponents?.deductions?.forEach((d) => {
                d.isChecked = true;
              });
            });
            this.selectAllChecked = false;
            // Assuming employeeList is a property of your class
            this.employeeList = [...res?.data];
            this.employeeCache[this.page - 1] = res?.data;
            this.isExpanded1 = Array(this.employeeList?.length).fill(false);
            this.step1Total = res?.sumTotalSalary;
            //this.step1Total += res?.data.reduce((sum, item) => sum + item.totalSalary, 0)
            this.loading = false; // Set loading to false on completion
            this.isLoading = false;
          }
        },
        error: () => {
          this.loading = false; // Set loading to false on error
        },
      });
  }

  getExcelSheet = async (selectedLayout: string) => {
    console.log('clicked')
    this.apiService.get(`reports/payroll/regular/report?layout=${selectedLayout}&${this.filterCondition.join('&')}`).subscribe({
      next: (res: any) => {
        this.downloadXLSX(res.data)
      },
      error: (error: any) => {
        console.error("Error occurred while fetching report data:", error);
        this.errorMessage = "Error occurred while fetching report data";
      }
    });
  }

  downloadXLSX(xlsxData: string) {
    const excelBuffer = this.base64ToArrayBuffer(xlsxData);
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    a.download = `${formattedDate}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = window.atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  formatDate(date: Date): string {
    const year = date.getFullYear().toString().slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return year + month + day + hours + minutes + seconds;
  }

  toggleExpand(index: number, currentStep): void {
    console.log('toggleExpand');
    if (currentStep === 1) {
      this.isExpanded1[index] = !this.isExpanded1[index];
      const allExpanded = this.isExpanded1.every((value) => value === true);
      const allCollapsed = this.isExpanded1.every((value) => value === false);
      this.isCollapsed1 = allExpanded ? false : allCollapsed ? true : true;
    } else {
      this.isExpanded2[index] = !this.isExpanded2[index];
      const allExpanded = this.isExpanded2.every((value) => value === true);
      const allCollapsed = this.isExpanded2.every((value) => value === false);
      this.isCollapsed2 = allExpanded ? false : allCollapsed ? true : true;
    }
  }
  calculateTotalSalary(salaryDist) {
    console.log('calculateTotalSalary');
    let tot = 0;
    if (salaryDist) {
      const numericSalaries = salaryDist.map((salary) =>
        parseFloat(salary?.amount)
      );
      const validSalaries = numericSalaries.filter((salary) => !isNaN(salary));
      tot = validSalaries.reduce((sum, salary) => sum + salary, 0);
    }
    return tot;
  }
  onEntryChange() {
    console.log('onEntryChange');
    var noOfPages = Math.ceil(this.collectionSize / this.pageSize);
    if (this.page > noOfPages) {
      this.page = noOfPages;
      // this.pageChange.emit(this.page);
    }
    // this.getDataTable();
    // this.sizeChange.emit(this.pageSize);
    //this.loadTableData();
  }
  getCountry() {
    console.log('getCountry');
    const userDataString = sessionStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);

      let country = userData?.country;
      let currency = userData?.currency;
      if (currency) {
        this.currency = currency?.name;
      }
      if (country) {
        this.selectedItem = [
          {
            id: country?.id,
            name: "country",
            label: country?.name,
            required: true,
            customQueryParamsName: "currency",
          },
          {
            id: this.currentMonth.toString(),
            name: "month",
            label: this.getCurrentMonthName(new Date(2000, this.currentDate.getMonth())),
            required: true,
          },
          {
            id: this.currentYear.toString(),
            name: "year",
            label: this.currentYear.toString(),
            required: true,
          },
        ];
      } else {
        this.selectedItem = [
          {
            id: this.currentMonth.toString(),
            name: "month",
            label: this.getCurrentMonthName(new Date(2000, this.currentDate.getMonth())),
            required: true,
          },
          {
            id: this.currentYear.toString(),
            name: "year",
            label: this.currentYear.toString(),
            required: true,
          },
        ];
      }
    }
  }
  getEmployeeCount() {
    console.log('getEmployeeCount');
    this.subs.sink = this.apiService
      .get(
        `payroll/run/regular/employees?limit=max&month=${this.currentMonth}&year=${this.currentYear}`
      )
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.isLoading = false;
            this.employeeCount = res?.count;
            this.employeeNotIncludedCount = res?.count;
            // Calculate total gross pay
            this.totalGrossPay = res.data.reduce(
              (total, employee) => total + (employee.grossPay || 0),
              0
            );
            // Aggregate all additional components into a single array
            this.additionalComponent = res?.components;
          }
        },
        error: () => {},
      });
  }
  onAdditionalSelect(event, type, empIndex, cmpIndex) {
    console.log('onAdditionalSelect');
    if (type === "earning") {
      this.selectedEmployees[empIndex].additionalComponents.earnings[
        cmpIndex
      ].isChecked = event.target.checked;
    } else {
      this.selectedEmployees[empIndex].additionalComponents.deductions[
        cmpIndex
      ].isChecked = event.target.checked;
    }
    this.totalSummary = this.calculateSelectedAmount();
    this.selectedEmployees[empIndex].employeeNet = this.calculateEmployeeNet(
      this.selectedEmployees[empIndex]
    );
    this.additionalComponent.forEach((adcmp, index) => {
      let compCount = 0,
        checkCount = 0;
      const isAdditionalComponentCheckedForAllEmployees =
        this.selectedEmployees.every((emp) => {
          const allComponents =
            emp?.additionalComponents?.earnings?.concat(
              emp?.additionalComponents?.deductions
            ) || [];
          if (allComponents?.length > 0) {
            allComponents?.forEach((e) => {
              if (e.id === adcmp.id) {
                compCount = compCount + 1;
                if (e.isChecked === true) {
                  checkCount = checkCount + 1;
                }
              }
            });
          }
          return compCount === checkCount ? true : false;
        });
      this.isAdditionalComponentChecked[index] =
        isAdditionalComponentCheckedForAllEmployees;
    });
  }
  onSelectAll(): void {
    console.log('onSelectAll');
    this.selectAllChecked = !this.selectAllChecked;
    this.employeeList.forEach((member: any) => {
      member.isChecked = this.selectAllChecked;
    });
    // Count the number of selected employees
    this.selectedEmployeeCount = this.employeeList.filter(
      (emp) => emp.isChecked
    ).length;
    this.employeeNotIncludedCount =
      this.employeeCount - this.selectedEmployeeCount;
    const selectedEmployees = this.employeeList.filter((emp) => emp.isChecked);
    this.totalGrossPay = selectedEmployees.reduce(
      (total, employee) => total + (employee.totalSalary || 0),
      0
    );
    //this.step1Total = this.totalGrossPay;
    //
  }
  onEmployeeSelect(event, index) {
    console.log('onEmployeeSelect');
    this.employeeList[index].isChecked = event.target.checked;
    this.selectAllChecked = this.employeeList.every(
      (emp) => emp.isChecked === true
    );
    this.selectedEmployeeCount = this.employeeList.filter(
      (emp) => emp.isChecked
    ).length;
    this.employeeNotIncludedCount =
      this.employeeCount - this.selectedEmployeeCount;
    const selectedEmployees = this.employeeList.filter((emp) => emp.isChecked);
    this.totalGrossPay = selectedEmployees.reduce(
      (total, employee) => total + (employee.totalSalary || 0),
      0
    );
    //this.step1Total = this.totalGrossPay;
    //
  }
  onSelectAllComponent(currentindex, id): void {
    console.log('onSelectAllComponent');
    this.isAdditionalComponentChecked[currentindex] =
      !this.isAdditionalComponentChecked[currentindex];
    const isChecked = this.isAdditionalComponentChecked[currentindex];
    this.selectedEmployees.forEach((emp) => {
      emp?.additionalComponents?.earnings?.forEach((earning) => {
        if (earning.id === this.additionalComponent[currentindex].id) {
          earning.isChecked = isChecked;
        }
      });
      emp?.additionalComponents?.deductions?.forEach((deduction) => {
        if (deduction.id === this.additionalComponent[currentindex].id) {
          deduction.isChecked = isChecked;
        }
      });
    });
    this.totalSummary = this.calculateSelectedAmount();
    this.selectedEmployees.forEach((e) => {
      e.employeeNet = this.calculateEmployeeNet(e);
    });
  }
  onCollapseAll(currentStep) {
    console.log('onCollapseAll');
    if (currentStep === 1) {
      this.isCollapsed1 = !this.isCollapsed1;
      this.isExpanded1.fill(!this.isCollapsed1);
    } else {
      this.isCollapsed2 = !this.isCollapsed2;
      this.isExpanded2.fill(!this.isCollapsed2);
    }
  }
  switchTab(event) {
    console.log('switchTab');
    this.preventRefresh = true;

    if (event === 2) {
      this.selectedEmployees = this.employeeList.filter(
        (member) => member.isChecked
      );
      this.isExpanded2 = Array(this.selectedEmployees?.length).fill(false);
      this.isCollapsed2 = true;
      this.totalSummary = this.calculateSelectedAmount();
      this.selectedEmployees.forEach((e) => {
        e.employeeNet = this.calculateEmployeeNet(e);
      });
    } else {
      this.isExpanded1 = Array(this.employeeList?.length).fill(false);
      this.isCollapsed1 = true;
    }
  }
  onSubmit() {
    console.log('onSubmit');
    if (this.currentStep === 1) {
      this.selectedEmployees = this.employeeList.filter(
        (member) => member.isChecked
      );
      this.isExpanded2 = Array(this.selectedEmployees?.length).fill(false);
      this.selectedEmployees.forEach((e) => {
        e.employeeNet = this.calculateEmployeeNet(e);
      });
      this.isCollapsed2 = true;
      this.totalSummary = this.calculateSelectedAmount();
      this.wizardService.setCurrentStep(2);
    } else {
      this.isProcessing = true;

      const idArray = this.selectedEmployees.map((item) => item.id);
      const idObject: { [key: string]: any } = {};
      this.selectedEmployees.forEach((emp) => {
        let excludedComponents = [];
        const allComponents =
          emp?.additionalComponents?.earnings?.concat(
            emp?.additionalComponents?.deductions
          ) || [];
        if (allComponents?.length > 0) {
          allComponents?.forEach((e) => {
            if (!e.isChecked) {
              excludedComponents.push(e.id);
            }
          });

        }
        if (excludedComponents.length > 0) {
          const id = emp.id;
          idObject[id] = excludedComponents;
        }
      });

      // Logging the resulting object
      let data = {
        employeeFiltered: idArray,
        excludedComponent: idObject,
      };

      let payrollReq = {};
      this.selectedEmployees.forEach((emp) => {
        let includedComponents = [];
        const allComponents =
          emp?.additionalComponents?.earnings?.concat(
            emp?.additionalComponents?.deductions
          ) || [];
        allComponents.forEach((component) => {
          if (component.isChecked) {
            includedComponents.push(component.id);
          }
        });
        payrollReq[emp.id] = {
          components: includedComponents,
        };
      });
      this.subs.sink = this.apiService
        .post(
          `payroll/run/${this.payrollType}/process/?cacheId=${
            this.cacheId
          }&${this.filterCondition.join("&")}`,
          payrollReq
        )
        .subscribe({
          next: (res: any) => {
            if (res) {
              this.isProcessing = false;
              this.batchId = res?.batch;
              this.router.navigate(["/payroll/run/success/", this.batchId]);
            }
          },
          error: (error: any) => {
            this.isProcessing = false;
          },
        });
    }
  }
  onCancel() {
    console.log('onCancel');
    if (this.currentStep === 1) {
      this._location.back();
    } else {
      this.isExpanded1 = Array(this.employeeList?.length).fill(false);
      this.isCollapsed1 = true;
      this.wizardService.setCurrentStep(1);
    }
  }
  calculateEmployeeNet(data) {
    console.log('calculateEmployeeNet');
    let earning = 0,
      deduction = 0;
    const gross = data?.totalSalary ? data?.totalSalary : 0;
    if (data?.additionalComponents?.earnings?.length > 0) {
      const earningCmp = data.additionalComponents.earnings
        .filter((e) => e.isChecked)
        .map((e) => parseFloat(e?.amount));
      const validEarnngs = earningCmp.filter((val) => !isNaN(val));
      earning = validEarnngs.reduce((sum, earning) => sum + earning, 0);
    }
    if (data?.additionalComponents?.deductions?.length > 0) {
      const deductionCmp = data.additionalComponents.deductions
        .filter((d) => d.isChecked)
        .map((d) => parseFloat(d?.amount));
      const validDeductions = deductionCmp.filter((val) => !isNaN(val));
      deduction = validDeductions.reduce(
        (sum, deduction) => sum + deduction,
        0
      );
    }
    const res = gross + earning - deduction;
    return Number(res.toFixed(3));
  }
  calculateSelectedAmount() {
    console.log('calculateSelectedAmount');
    let sum = 0;
    this.selectedEmployees.forEach((emp) => {
      sum = sum + this.calculateEmployeeNet(emp);
    });
    return Number(sum.toFixed(3));
  }
  filteredData(event) {
    console.log('filteredData');
    if (!this.preventRefresh) {
      let monthPresent = false;
      let yearPresent = false;
      const appliedFilter = event;
      let selectedMonth, selectedYear;
      // Iterate through the filter conditions
      for (const condition of appliedFilter) {
        // Split each condition string into key and value

       
        const [key, value] = condition.split("=");
        // Check if the condition is related to the month
        if (key === "month") {
          monthPresent = true;
          selectedMonth = value;
        }
        // Check if the condition is related to the year
        if (key === "year") {
          yearPresent = true;
          selectedYear = value;
        }
      }
        
      if (monthPresent && yearPresent) {
        this.filterCondition = event;
        this.currentMonthName = this.getCurrentMonthName(new Date(selectedYear,selectedMonth - 1))

        this.currentYear = selectedYear;
        this.employeeNotIncludedCount = 0;
        this.selectedEmployeeCount = 0;
        this.totalGrossPay = 0;
        this.page = 1;
        this.employeeList = [];
        this.employeeCount = 0;
        this.getEmployees();
        this.applyButton = false;
      } else {
        this.applyButton = true;
      }
      this.cdRef.detectChanges();
    }
  }

  handleSelectedNames(selectedNames: string[]) {
    console.log('handleSelectedNames');
    this.preventRefresh = false;
    this.selectedItem = selectedNames;
    this.selectedItem.forEach((item) => {
      if (item.name === "country" && item.currency) {
        this.currency = item.currency;
      }
    });
  }
  unselectName(id, label): void {
    console.log('unselectName');
    this.preventRefresh = false;
    if (label !== "month" && label !== "year") {
      this.selectedItem = this.selectedItem.filter(
        (n) => !(n.id === id && n.name === label)
      );
      this.isLoading = true;
    }
    this.cdRef.detectChanges();
  }
}
