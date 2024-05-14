import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { intermediaryTableCardMetaData, tableMetaData } from './payroll-intermediary-table.data';

@Component({
  selector: 'app-payroll-intermediary-table',
  templateUrl: './payroll-intermediary-table.component.html',
  styleUrls: ['./payroll-intermediary-table.component.scss']
})
export class PayrollIntermediaryTableComponent {
  view: string = 'table';
  cardJsonData: any = intermediaryTableCardMetaData;
  tableMetaData: any = tableMetaData;
  empId: any;
  theme: string = this.sharedService.getTheme();
  currentURL: any;
  tableData=[
    {
      employee:{id:1,firstName:"Varsha",lastName:"K"},
      date:"13/11/2023",
      type:"Advance Salary",
      payrollType:"Regular",
      payrollTransactionType:"Earnings"
    }
  ]


  constructor(private route: ActivatedRoute, private sharedService: SharedService, private router: Router) { }


  changeView(event) {
    this.view = event;
  }
  open(type, id) {
    let temp = this.router.url.split('/');
    temp.splice(0,1);
    this.currentURL = temp.join('/');
    if (type === 'view') {

      this.router.navigate([this.currentURL, 'view', id]);
    }
  }
}
