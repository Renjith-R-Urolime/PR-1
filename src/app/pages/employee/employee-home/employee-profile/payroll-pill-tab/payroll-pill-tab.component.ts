import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexPlotOptions,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis
} from "ng-apexcharts";
import { Subscription } from 'rxjs';
import { DetailsCardData, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { defineSalaryFormData, detailsCardExpenseManagementMeta, detailsCardPayPeriodInformationMeta, detailsCardProvisionMeta, detailsCardSalaryInformationMeta, detailsCardSetupMeta, payrollTabsMeta, setUpFormData } from '../employee-profile-data';
const _ = require('lodash');

import { format } from 'date-fns';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';

import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  labels: any;
  legend: ApexLegend;
  colors: string[];
};
@Component({
  selector: 'app-payroll-pill-tab',
  templateUrl: './payroll-pill-tab.component.html',
  styleUrls: ['./payroll-pill-tab.component.scss']
})
export class PayrollPillTabComponent implements OnInit {
  htmlResponse: any;
  isLoading: boolean;
  batchId: number;
  htmlContent:any;

  constructor(private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private dynamicFormService: DynamicFormService, private sharedService: SharedService, private apiService: ApiService, private router: Router, private sanitizer: DomSanitizer) {

  }


  public chartOptions: any;
  salaryInformationData: any
  expenseManagementData: any
  payPeriodInformationData: any
  provisionData: any
  setupData: any
  isSetupDrawerOpen: boolean = false
  isDefineSalaryDrawerOpen: boolean = false
  isProcessing: boolean = false
  detectedError: boolean;
  theme: string = this.sharedService.getTheme();
  componentItems: any[] = [];
  componentList: any = [];
  print : any = {
    id: 0,
    status: false,
  }
  isProgress: boolean = false; // Flag to control the loading screen
  progress: number = 0;
  setUpFormData: any = setUpFormData
  defineSalaryFormData: any = defineSalaryFormData
  salaryBreakupDetails: any
  setUpTemplate: TemplateRef<any>;
  defineSalaryTemplate: TemplateRef<any>;
  isSetUpFormSaveDisabled: boolean = true
  isDefineSalaryFormSaveDisabled: boolean = true
  submit: boolean = false
  setUpForm: FormGroup
  defineSalaryForm: FormGroup
  employeeProfileData: any
  contributionRuleCondition: string[] = [];
  classificationData: any
  employeeOverviewData: any
  originalOvertimeRulesList: any = [];
  overtimeRulesList: any = [];
  filterCondition: string[] = [];
  private routeSub: Subscription | undefined;
  id: string | number;
  isPercentageAllocation: boolean = false;
  maxLimit: any = Infinity
  componentTotal: number = 0;
  basicSalary: any
  modifiedHtmlContent:any;
  saveButtonDisable: boolean = true
  @ViewChild('customTemplate') customTemplate: TemplateRef<any>;

  payrollPillTabsMeta: TrazepoidTabsMeta[] = payrollTabsMeta;
  labels: any = []
  values: any = []



  cardSalaryInformationMeta: DetailsCardData = {
    meta: detailsCardSalaryInformationMeta,
    data: []
  };

  expenseManagementMeta: DetailsCardData = {
    meta: detailsCardExpenseManagementMeta,
    data: []
  };

  provisionMeta: DetailsCardData = {
    meta: detailsCardProvisionMeta,
    data: []
  };

  setupMeta: DetailsCardData = {
    meta: detailsCardSetupMeta,
    data: []
  };

  payPeriodInformationMeta: DetailsCardData = {
    meta: detailsCardPayPeriodInformationMeta,
    data: []
  };







  ngOnInit() {

    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.sharedService.employeeDetails$.subscribe((data: any) => {
      this.employeeProfileData = data?.employeeProfile
      this.classificationData = data?.employeeInformation?.classification || { data: null };
      this.employeeOverviewData = data?.employeeOverview?.personalDetails
      //this.setFilterCondition()
      this.salaryInformationData = data?.employeePayroll?.salaryInformation || { data: null }
      this.expenseManagementData = data?.employeePayroll?.expenseManagement || { data: null };
      this.provisionData = data?.employeePayroll?.provision || { data: null };
      this.setupData = data?.employeePayroll?.setup || { data: null };


      if (data?.employeePayroll?.payPeriodInformation?.startDate) {
        const payPeriodInformationData = {
          startDate: format(new Date(data?.employeePayroll?.payPeriodInformation?.startDate), 'yyyy-MM-dd'),
          month: data?.employeePayroll?.payPeriodInformation?.month,
          endDate: format(new Date(data?.employeePayroll?.payPeriodInformation?.endDate), 'yyyy-MM-dd'),
        };
        this.payPeriodInformationData = payPeriodInformationData
      }



      this.salaryBreakupDetails = data?.employeePayroll?.salaryBreakUp?.[0]?.component || null
      if (this.salaryBreakupDetails) {
        this.labels = this.salaryBreakupDetails.map(component => component?.name)
        this.values = this.salaryBreakupDetails.map(component => parseInt(component?.componentMapping?.rate))
      }
    });

    this.chartOptions = {
      series: this.values,
      chart: {
        type: "donut"
      },
      legend: {
        show: false
      },
      labels: this.labels,
      colors: ['#FC1777', '#FF8100', '#BAB1D1', '#482084', '#1da745', '#d7c327'],
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          customScale: 0.8,
          donut: {
            labels: {
              show: false,
              name: {
                show: false
              },
              value: {
                show: false,
                formatter: (val) => {
                  return '';
                }
              },
            }
          }
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 700
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    this.setUpForm = this.dynamicFormService.createControl(setUpFormData);
    this.defineSalaryForm = this.dynamicFormService.createControl(defineSalaryFormData);
    // this.fetchOvertimeData()


    ////////////////////////////////////////define salary ////////////////////////////////////////////
    // this.apiService.get(`payroll/setup/component`, 'dropdown').subscribe({
    //   next: (res) => {
    //     res["data"].filter(component => component.type.name === 'Fixed Pay').filter(comp => comp.subType.name === 'Salary').forEach(component => {
    //       this.componentList.push({ "id": component.id, "name": component.name, "hide": false });
    //     })
    //     this.getComponentList();
    //   }
    // })


    this.setUpForm.patchValue({
      "payrollCycleId": this.setupData?.payrollCycle?.id,
      "contributionRules": this.setupData?.contributionRules,
      "overtimeRules": this.setupData?.overtimeRules,
      "airTicketEligibilityId": this.setupData?.airTicketEligibilty?.id,
    });

    this.defineSalaryForm.patchValue({
      "grossPay": this.salaryInformationData?.grossPay,
      "allocation": "1",
      "effectiveDate": this.salaryInformationData?.effectiveDate,
    });

  }



  getComponentList() {
    this.componentList.forEach((element) => {
      this.componentItems.push({ id: element.id, label: element.name, checked: false, value: '' })
    });
  }

  calculateTotal(event?, component?) {
    //this.updateValueById(component?.id, event)
    let grossPay;
    let sum = 0;
    if (this.defineSalaryForm.value.grossPay) {
      grossPay = Number(this.defineSalaryForm.value.grossPay);
    }
    this.componentItems.forEach(element => {

      if (element.checked) {
        sum += Number(element.value);
      }
    })
    this.componentTotal = sum;
  }




  ///////////////update the value field by passing the id and the value /////////////////

  // updateValueById(id: string, newValue: string, formula?, disable?, isBasic?): void {
  //   const componentToUpdate = this.componentItems.find(component => component.id == id);

  //   if (componentToUpdate) {
  //     if (formula && formula == '2' && this.basicSalary) {
  //       componentToUpdate.value = ((parseInt(newValue) / 100) * parseInt(this.basicSalary)).toString();
  //       componentToUpdate.checked = true;
  //       componentToUpdate.disable = disable
  //       componentToUpdate.formula = formula
  //       componentToUpdate.isBasic = isBasic
  //     }
  //     else {
  //       componentToUpdate.value = newValue;
  //       componentToUpdate.checked = true;
  //       componentToUpdate.disable = disable
  //       componentToUpdate.formula = formula
  //       componentToUpdate.isBasic = isBasic
  //     }
  //   }

  // }


  resetDefineSalarySubComponent() {
    this.componentItems.forEach(elem => {
      elem.checked = false;
      elem.value = '';
    });
  }

  enableInputField(event, index, currentComponent) {
    if (event.target.checked) {
      this.componentItems[index].checked = true;
    }
    else {
      this.componentItems[index].checked = false;
      const componentToUpdate = this.componentItems.find(component => component.id == currentComponent.id);

      if (componentToUpdate) {
        componentToUpdate.checked = false;
        componentToUpdate.value = null
        this.calculateTotal()
      }
    }
  }















  setFilterCondition() {
    this.contributionRuleCondition = this.classificationData?.userSubsidiary?.id ? [`subsidiary=${this.classificationData?.userSubsidiary?.id ? this.classificationData?.userSubsidiary?.id : ''}`] : this.contributionRuleCondition;
    this.contributionRuleCondition = this.classificationData?.class?.id ? [this.contributionRuleCondition[0] + `&class=${this.classificationData?.class?.id ? this.classificationData?.class?.id : ''}`] : this.contributionRuleCondition;
    this.contributionRuleCondition = this.employeeProfileData?.department?.id ? [this.contributionRuleCondition[0] + `&department=${this.employeeProfileData?.department?.id ? this.employeeProfileData?.department?.id : ''}`] : this.contributionRuleCondition;
    this.contributionRuleCondition = this.employeeProfileData?.location?.id ? [this.contributionRuleCondition[0] + `&location=${this.employeeProfileData?.location?.id}`] : this.contributionRuleCondition;
    this.contributionRuleCondition = this.employeeOverviewData?.nationality ? [this.contributionRuleCondition[0] + `&contributionSetupDetails.nationality=${this.employeeOverviewData.nationality.id}`] : this.contributionRuleCondition;


    this.filterCondition = this.classificationData?.userSubsidiary?.id ? [`subsidiary=${this.classificationData?.userSubsidiary?.id ? this.classificationData?.userSubsidiary?.id : ''}`] : this.filterCondition;
    this.filterCondition = this.classificationData?.class?.id ? [this.filterCondition[0] + `&class=${this.classificationData?.class?.id ? this.classificationData?.class?.id : ''}`] : this.filterCondition;
    this.filterCondition = this.employeeProfileData?.department?.id ? [this.filterCondition[0] + `&department=${this.employeeProfileData?.department?.id ? this.employeeProfileData?.department?.id : ''}`] : this.filterCondition;
    this.filterCondition = this.employeeProfileData?.location?.id ? [this.filterCondition[0] + `&location=${this.employeeProfileData?.location?.id}`] : this.filterCondition;

  }

  filterOvertimeList(event) {

    if (event.length > 0) {
      let tempOTList = _.cloneDeep(this.originalOvertimeRulesList);
      event.forEach(elem => {
        if (Number(elem?.type?.id) === 3) {
          tempOTList.forEach(ot => {
            if (parseInt(ot.id) !== parseInt(elem?.id) && parseInt(ot.type.id) !== 3) {
              ot["disabled"] = true;
              this.cdRef.detectChanges();
            }
            else {
              delete ot.disabled;
              this.cdRef.detectChanges();
            }
          });
          this.overtimeRulesList = [];
          this.overtimeRulesList = _.cloneDeep(tempOTList);
          this.cdRef.detectChanges();
        }

        else if (Number(elem?.type?.id) === 1 || Number(elem?.type?.id) === 2) {
          tempOTList.forEach(ot => {



            if (parseInt(ot.id) !== parseInt(elem?.id)) {

              ot["disabled"] = true;
              this.cdRef.detectChanges();
            }
            else {

              delete ot.disabled;
              this.cdRef.detectChanges();
            }
          });
          this.overtimeRulesList = [];
          this.overtimeRulesList = _.cloneDeep(tempOTList);


          this.cdRef.detectChanges();
        }
      });
    }

    if (event.length <= 0) {
      this.overtimeRulesList = _.cloneDeep(this.originalOvertimeRulesList);
      this.cdRef.detectChanges();
    }
  }



  fetchOvertimeData() {
    this.apiService.get(`payroll/setup/overtime-setup?${this.filterCondition}`, 'dropdown').subscribe({
      next: (res: any) => {
        if (res) {
          this.originalOvertimeRulesList = _.cloneDeep(res?.data);
          this.overtimeRulesList = _.cloneDeep(res?.data);//.map(item => ({ id: item.id, name: item.name }))
          this.cdRef.detectChanges();
        }
      },
      error(err) {
        console.error(err);
      },
    })
  }

  onSubmit() {
    this.isProcessing = true;
    this.submit = true;

    if (this.setUpForm.invalid) {
      this.isProcessing = false;
      this.isSetUpFormSaveDisabled = true
      return;
    }
    else {
      //edit
      this.isSetUpFormSaveDisabled = false
      this.submit = false;
      let updatedSetupForm = this.dynamicFormService.getUpdatedData(this.setUpForm)
      let data = { ...updatedSetupForm };
      this.apiServiceComponent(data)
    }
  }



  onSubmitDefineSalary() {
    this.isProcessing = true;
    this.submit = true;

    if (this.setUpForm.invalid) {
      this.isProcessing = false;
      this.isSetUpFormSaveDisabled = true
      return;
    }
    else {
      //edit
      this.isSetUpFormSaveDisabled = false
      this.submit = false;
      let updatedSetupForm = this.dynamicFormService.getUpdatedData(this.setUpForm)
      let data = { ...updatedSetupForm };
      this.apiServiceComponent(data)
    }
  }


  apiServiceComponent(data) {
    this.apiService.put(`core-hr/employee/${this.id}`, data, 'employee').subscribe({
      next: (res: any) => {
        if (res) {
          this.isProcessing = false;
          this.isSetUpFormSaveDisabled = false
          this.cdRef.detectChanges();
          this.sharedService.handleSuccessModel({ id: this.id, btnTemplate: this.customTemplate });
          this.sharedService.updateEmployeeData()
        }
        else {
          this.isProcessing = false;
          this.cdRef.detectChanges();
          this.sharedService.updateEmployeeData()
        }
      },
      error: (error: any) => {
        this.detectedError = true;
        this.isProcessing = false;
        this.cdRef.detectChanges();
      }
    });
  }

  open(type, id) {

  }

payslipPreview(id) {
  // Fetch HTML content using id and then convert it to PDF
  // Fetch HTML content using id
  this.print = {
    id: id,
    status: true,
  }
  this.apiService.getPdfData(`payroll/run/view/payslip/${id}`).subscribe({
    next: (data: any) => {
      if (data) {
        this.sharedService.viewBuffer(data, 'Payslip.pdf')
      }
    },
    error: (error) => {
      this.print = {
        id: 0,
        status: false,
      }
      console.error("Error fetching PDF:", error);
    },
    complete: () => {
      this.print = {
        id: 0,
        status: false,
      }
    }
  });
}


  getFormTemplate(template: TemplateRef<any>, headerText: string, name: string) {
    if (name == 'setUp') {
      this.setUpTemplate = template;
      this.isSetupDrawerOpen = true

    }

    if (name == 'defineSalary') {
      this.defineSalaryTemplate = template;
      this.isDefineSalaryDrawerOpen = true
    }
  }



  onDrawerSaveSetUpForm(event) {
    this.isSetUpFormSaveDisabled = false
    this.isSetupDrawerOpen = false
    this.onSubmit()
  }


  cancelSetupForm(event) {
    this.isSetupDrawerOpen = false
  }

  onViewClicked() {
    this.sharedService.onModalClose();
    //  window.location.reload();
  }



  onDrawerSaveDefineSalaryForm(event) {
    this.isDefineSalaryFormSaveDisabled = false
    this.isDefineSalaryDrawerOpen = false
    this.onSubmitDefineSalary()
  }


  cancelDefineSalaryForm(event) {
    this.isDefineSalaryDrawerOpen = false
  }






}
