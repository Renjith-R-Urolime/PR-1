import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth';
import { TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TabService } from 'src/app/shared/services/tab.service';
import { DataTable } from 'src/app/shared/ui/data-table-list/data-table-list';



@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmployeeProfileComponent {
  showToast = false;
  id = 1;
  verificationCode = "";
  qrCodeUrl = '';
  theme: string = this.sharedService.getTheme();
  detailsCardList: any;
  trapezoidTabs: TrazepoidTabsMeta[];
  trapezoidTabsTable: DataTable[];
  tableData: DataTable;
  mfaCode: string = '';
  mfaSetting;
  mfaEnabled = false;
  breadcrumb: string[] = ['Employee', 'View Employee']
  selectedTabIndex: number = 0;
  dataFetched: boolean
  private mfaCodeSubscription: Subscription;
  currentURL: any;
  empId: any;
  isOnboarded: any;
  isContributionApplied: boolean = false;
  isEmployeeExit: boolean = false;
  private routeSub: Subscription | undefined;

  constructor(private tabService: TabService, private cdRef: ChangeDetectorRef, private sharedService: SharedService, private route: ActivatedRoute,private authService: AuthService, private clipboardApi: ClipboardService, private router: Router) {

  }

  async ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];


    });
    this.sharedService.employeeDetails$.subscribe((data: any) => {


      this.isOnboarded = data?.employeeOverview?.personalDetails.isOnboarded;
      this.isEmployeeExit = data?.employeeInformation?.isEmployeeExit;
      //if already registered or not check not done, as it requires API change, which is pending
      if (data?.employeePayroll?.setup?.contributionRules.length > 0) {
        this.isContributionApplied = true;
      }
      else {
        this.isContributionApplied = false;
      }
console.log("isEmployeeExit",data?.employeeInformation?.isEmployeeExit);


    });

    await this.getMfaSetting();

    // this.tabService.setCurrentTab(0)
    // this.getCurrentDevice()

    this.tabService.currentTab$.subscribe(currentTab => {
      this.selectedTabIndex = currentTab
      // switch (this.selectedTabIndex) {
      //   case 0:
      //     this.detailsCardList = {
      //       meta: detailsCardEmployeeOverviewMeta,
      //       data: []
      //     };;
      //     this.trapezoidTabs = overViewTabsMeta;
      //     this.trapezoidTabsTable = [];
      //     this.tableData = this.trapezoidTabsTable[0];
      //     break;
      //   case 1:
      //     this.detailsCardList = employeeInfo;
      //     this.trapezoidTabs = employeeInfoPill;
      //     this.trapezoidTabsTable = [];
      //     this.tableData = this.trapezoidTabsTable[0];
      //     break;
      //   case 2:
      //     this.detailsCardList = Payroll;
      //     this.trapezoidTabs = payrollPill;
      //     this.trapezoidTabsTable = [];
      //     this.tableData = this.trapezoidTabsTable[0];
      //     break;
      //   case 3:
      //     this.detailsCardList = Leave;
      //     this.trapezoidTabs = leavePill;
      //     this.trapezoidTabsTable = leavePillTableData;
      //     this.tableData = this.trapezoidTabsTable[0];
      //     break;
      //   case 4:
      //     this.detailsCardList = Credentials;
      //     this.trapezoidTabs = credentialPill;
      //     this.trapezoidTabsTable = credentialPillTableData;
      //     this.tableData = this.trapezoidTabsTable[0];
      //     break;
      //   case 5:
      //     this.detailsCardList = [];
      //     this.trapezoidTabs = [];
      //     this.trapezoidTabsTable = [];
      //     this.tableData = this.trapezoidTabsTable[0];
      //     break;
      // }
    });

    // this.sharedService.selectedTabLabel$.subscribe(response => {
    //   this.tableData = this.trapezoidTabsTable.find(item => item.tableName === response

    //   );
    //   const checkArray: boolean[] = Array<boolean>(this.tableData.headers.length).fill(true);

    //   this.sharedService.updateCheckColumn(checkArray)
    // });

  }

  async activateMfa() {
    // let res: any = await this.authService.verifyMFA(this.verificationCode);

    // if (res.Status === "SUCCESS") {
    //   let result: any = await this.authService.enableDisableMFA(true);
    //   if (result === "SUCCESS") {
    //     this.verificationCode = '';
    //     await this.getMfaSetting();
    //   }
    // }
  }
  async deactivateMFA() {
    // let res: any = await this.authService.enableDisableMFA(false);

    // if (res === "SUCCESS") {
    //   await this.getMfaSetting();
    // }
  }

  async getMfaSetting() {
    // this.mfaSetting =await this.authService.userData();

    // if(this.mfaSetting.PreferredMfaSetting === 'SOFTWARE_TOKEN_MFA' || this.mfaSetting.UserMFASettingList
    // ){
    //   this.mfaEnabled = true;
    //
    // }
    // else {
    //   this.mfaEnabled = false;
    //   this.mfaCode = await this.authService.setupMFA() as string;
    //   let currentUser: any = this.authService.getCognitoUser();
    //   this.qrCodeUrl = `otpauth://totp/${currentUser.username}?secret=${this.mfaCode}&issuer=Cognito-TOTP-MFA`;
    // }
    // this.cdRef.detectChanges();
  }
  hideVerificationCode(code: string): string {
    // Replace all characters in the code with "x"
    return 'x'.repeat(code.length);
  }
  copyCode() {
    this.clipboardApi.copyFromContent(this.mfaCode)
  }
  async getCurrentDevice() {
    await this.authService.currentDevice();
  }



  fetchedData(event) {
    this.dataFetched = event
  }

  open(type) {
    this.sharedService.closeSideBar();
    let temp = this.router.url.split('/');
    this.empId = Number(temp.slice(-1)[0]);


    temp.splice(0, 1);
    this.currentURL = temp.join('/');


    if (type === 'edit') {
      this.router.navigate([`employee/master/edit/${this.empId}`]);
    }
    if (type === 'onboard') {
      this.router.navigate([`employee-hub/profiles/payroll-enrollment/${this.empId}`]);
    }
    if(type === 'contributionRegister'){
      this.router.navigate([`/employee/master/contribution-register/${this.empId}/create`]);
    }
  }

}
