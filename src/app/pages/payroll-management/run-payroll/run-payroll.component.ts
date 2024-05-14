import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { payrollCardData, tableMetaData } from './run-payroll.data';
// import { detailsCardList } from '../loan/loan.data';

@Component({
  selector: 'app-run-payroll',
  templateUrl: './run-payroll.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./run-payroll.component.scss']
})
export class RunPayrollComponent {
  payrollCardData = payrollCardData;
  tableMetaData: any = tableMetaData;
  currentStep: any;
  isLoading : boolean = false;
  theme: string = this.sharedService.getTheme();
  showFirstContainer: boolean;
  payrollType:any;
  showViewBtn :boolean = false;
  currentDate: Date = new Date();
  regularIcon ='./assets/media/icons/calendar-outline.svg'
  currentMonth: string = this.getCurrentMonth();
  firstDateOfMonth: string = this.getFirstDateOfMonth();
  lastDateOfMonth: string = this.getLastDateOfMonth();
  message = '';
  constructor(private sharedService: SharedService,
    private router: Router,public apiService: ApiService,private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.message = `Please run payroll for ${this.currentDate.toLocaleString('default', { month: 'long' })}.`;
    //this.getPayrollMonthData()
  }
  getCurrentMonth(): string {
    return this.currentDate.toLocaleString('default', { month: 'short' });
  }

  getFirstDateOfMonth(): string {
    const firstDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    return firstDate.toLocaleDateString('default', { day: 'numeric' });
  }

  getLastDateOfMonth(): string {
    const lastDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    return lastDate.toLocaleDateString('default', { day: 'numeric' });
  }

  onClickRunPayroll(type) {
    // this.payrollType = this.payrollCardData[0].title.split(' ').map(element => element.toLowerCase()).join('-');
    if(type === 'regular' || type === 'one-time' || type === 'full-and-final'){
      this.router.navigate([`/payroll/run/${type}`]);
    }

  }

  getPayrollMonthData(){
    this.apiService.get(`payroll/run/regular/pending/pay-period`).subscribe({
      next: (res: any) => {
        if (res) {

          if(res?.status === 'completed'){
            this.regularIcon ='./assets/media/icons/checkmark-circle-outline.svg';
            this.message = `Payroll for ${this.currentDate.toLocaleString('default', { month: 'long' })} has already been processed.`;
            this.showViewBtn = true;
          }
          else{
            this.message = `Please run payroll for ${this.currentDate.toLocaleString('default', { month: 'long' })}.`;
            this.showViewBtn = false;
          }
          this.isLoading = false;
          this.cdRef.detectChanges();
        }
      }, error: (error: any) => {


      }


    });
  }
}
