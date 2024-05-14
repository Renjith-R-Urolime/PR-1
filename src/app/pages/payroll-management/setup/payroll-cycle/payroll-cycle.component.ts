import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, tap } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { DataTable } from 'src/app/shared/ui/data-table-list/data-table-list';
import { WizardTabs } from 'src/app/shared/ui/wizard-tabs/wizard-tabs';
import { cardMetaData, cycleFormData, cycleTableData, formSections, tableMetaData, wizardTabs } from './payroll-cycle-data';



@Component({
  selector: 'app-payroll-cycle',
  templateUrl: './payroll-cycle.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./payroll-cycle.component.scss']
})
export class PayrollCycleComponent implements OnInit {
  moduleTableData: DataTable = cycleTableData;
  wizardData: WizardTabs = wizardTabs;
  formData= cycleFormData;
  formSection: Sections = formSections;
  moduleTableData$: Observable<any> | undefined;
  view:string='table';
  currentUrl : string = '';
  page: number = 1;
  pageSize: number=5;
  isDataTableLoading: boolean = false;
  tableMetaData: any = tableMetaData;
  cardJsonData = cardMetaData;

  constructor(private sharedService: SharedService, private router: Router,private apiService: ApiService,private cdRef: ChangeDetectorRef, private route: ActivatedRoute) {}


  changeView(event){
    this.view=event;
  }

  getCycleDataList(){
    let url = `payroll/setup/${this.currentUrl}?${ this.page ? 'page='+this.page : '' }${ this.pageSize ? '&limit='+this.pageSize : ''}`;
    // this.moduleTableData$ = this.apiService.get(url).pipe(
      this.moduleTableData$ = this.apiService.get(url).pipe(
      tap((res: any) => {

        this.isDataTableLoading = false;
        this.moduleTableData = res;
        if(res){
          this.sharedService.updateLatestCardData(res.data);
        }
      }),
      catchError(error => {

        throw error;
      })
    );
   // this.moduleTableData$.subscribe();
  }

  onPageChange(event){

      this.page = event;
      this.getCycleDataList();
  }

  onSizeChange(event){

    this.pageSize = event;
    this.getCycleDataList();
  }

  ngOnInit() {
  this.currentUrl='cycle';
  // Check for 'info' parameter in the URL and set 'view' accordingly
  this.route.queryParams.subscribe((params) => {
    if (params.view) {
      this.view = params.view;
    }
  });
  //this.getCycleDataList();
  }

}
