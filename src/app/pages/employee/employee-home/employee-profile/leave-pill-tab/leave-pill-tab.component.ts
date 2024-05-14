import { ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DetailsCardData, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { getCSSVariableValue } from '../../../../../_metronic/kt/_utils';
import { detailsCardLeaveSetupMeta, leaveChartMeta, leaveSetupFormData, leaveTabsMeta } from '../employee-profile-data';


@Component({
  selector: 'app-leave-pill-tab',
  templateUrl: './leave-pill-tab.component.html',
  styleUrls: ['./leave-pill-tab.component.scss']
})
export class LeavePillTabComponent implements OnInit {
  @ViewChild('cardContainer') cardContainer!: ElementRef;
  leavePillTabsMeta: TrazepoidTabsMeta[] = leaveTabsMeta;
  chartOptions: any = [];
  chartHeight: any = '100px'
  leaveChartMeta: any = leaveChartMeta
  leaveChartData: any = []
  isProcessing: boolean = false
  submit: boolean = false
  leaveSetupForm: FormGroup
  leaveSetupFormData: any = leaveSetupFormData
  leaveSetupTemplate: TemplateRef<any>;
  isleaveSetupFormSaveDisabled: boolean = true
  isLeaveDrawerOpen: boolean = false
  detectedError: boolean;
  isOnboarded: boolean=false
  leavePlanCondition: string[] = [];
  employeeProfileData: any
  classificationData: any
  employeeId:string
  theme: string = this.sharedService.getTheme();
  private routeSub: Subscription | undefined;
  id: string | number;

  cardData = Array.from({ length: 10 }, (_, index) => index + 1);
  leaveSetupMeta: DetailsCardData = {
    meta: detailsCardLeaveSetupMeta,
    data: []
  };
  @ViewChild('customTemplate') customTemplate: TemplateRef<any>;

  leaveSetupData: any
  constructor(private router: Router,private route: ActivatedRoute, private apiService: ApiService, private sharedService: SharedService, private dynamicFormService: DynamicFormService, private cdRef: ChangeDetectorRef) {

  }


  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.leaveSetupForm = this.dynamicFormService.createControl(leaveSetupFormData);

    this.sharedService.employeeDetails$.subscribe((data: any) => {
      this.employeeProfileData = data?.employeeProfile
      this.classificationData = data?.employeeInformation?.classification || { data: null };
      this.leaveSetupData = data?.employeeLeave?.leaveSetup || { data: null }
      this.leaveChartData = data?.employeeLeave?.leaveChartData || []
      this.isOnboarded = data?.employeeOverview?.personalDetails?.isOnboarded
      this.employeeId = data?.employeeOverview?.personalDetails?.employeeId
    });



    this.leaveChartMeta.forEach((meta) => {
      const chartOptions = this.getChartOptions(meta.chartHeight, meta.baseColor, meta.lightColor, meta.total, meta.used);
      this.chartOptions.push(chartOptions);
    });
   // this.setleavePlanCondition()

    this.leaveSetupForm.patchValue({
      "leavePlanId": this.leaveSetupData?.leavePlan?.id,
    });





  }

  scrollLeft() {
    this.cardContainer.nativeElement.scrollLeft -= 300;
  }
  scrollRight() {
    this.cardContainer.nativeElement.scrollLeft += 300;
  }

  getChartOptions(chartHeight: string, baseColor: string, lightColor: string, total: number, used: number,) {
    const labelColor = getCSSVariableValue('--bs-gray-700');

    return {
      series: [(used / total) * 100],
      chart: {
        fontFamily: 'inherit',
        height: chartHeight,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: '50%',
          },
          dataLabels: {
            name: {
              show: false,
              fontWeight: '400',
            },
            value: {
              color: labelColor,
              fontSize: '15px',
              fontWeight: '700',
              offsetY: 5,
              show: true,
              formatter: function (val: number) {
                return used + '/' + total;
              },
            },
          },

          track: {
            background: lightColor,
            strokeWidth: '100%',
          },
        },
      },
      colors: [baseColor],
      stroke: {
        lineCap: 'round',
      },
      labels: ['Progress'],
    };
  }



  applyLeave() {
    let queryParams: any = {};
    queryParams.employeeId = this.employeeId;

    const navigationExtras: NavigationExtras = {
      queryParams: queryParams,
    };
    this.router.navigate(['leave-management/leave-application/create'],navigationExtras);
  }
  onSubmit() {

    this.isProcessing = true;
    this.submit = true;

    if (this.leaveSetupForm.invalid) {
      this.isProcessing = false;
      this.isleaveSetupFormSaveDisabled = true
      return;
    }
    else {
      //edit
      this.isleaveSetupFormSaveDisabled = false
      this.submit = false;
      let updatedEmployeeInformationForm = this.dynamicFormService.getUpdatedData(this.leaveSetupForm)
      //     let data = { ...updatedEmployeeInformationForm};
      let data = { ...this.leaveSetupForm.value };





      this.apiService.put(`core-hr/employee/${this.id}`, data, 'employee').subscribe({
        next: (res: any) => {
          if (res) {
            this.isProcessing = false;
            this.isleaveSetupFormSaveDisabled = false
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
  }



  setleavePlanCondition() {
    this.leavePlanCondition = this.classificationData?.userSubsidiary?.id ? [`subsidiary=${this.classificationData?.userSubsidiary?.id ? this.classificationData?.userSubsidiary?.id : ''}`] : this.leavePlanCondition;
    this.leavePlanCondition = this.classificationData?.class?.id ? [this.leavePlanCondition[0] + `&class=${this.classificationData?.class?.id ? this.classificationData?.class?.id : ''}`] : this.leavePlanCondition;
    this.leavePlanCondition = this.employeeProfileData?.department?.id ? [this.leavePlanCondition[0] + `&department=${this.employeeProfileData?.department?.id ? this.employeeProfileData?.department?.id : ''}`] : this.leavePlanCondition;
    this.leavePlanCondition = this.employeeProfileData?.location?.id ? [this.leavePlanCondition[0] + `&location=${this.employeeProfileData?.location?.id}`] : this.leavePlanCondition;
  }









  getFormTemplate(template: TemplateRef<any>, headerText: string, name: string) {
    if (name == 'leaveSetup') {
      this.leaveSetupTemplate = template;
      this.isLeaveDrawerOpen = true
    }
  }

  onDrawerSaveLeaveSetupForm(event) {
    this.isleaveSetupFormSaveDisabled = false
    this.isLeaveDrawerOpen = false
    this.onSubmit()
  }

  cancelLeaveSetupForm(event) {

  }



  onViewClicked() {
    this.sharedService.onModalClose();
  }




}
