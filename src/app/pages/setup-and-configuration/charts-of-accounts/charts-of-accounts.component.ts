import { ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { coaCardMetaData, tableMetaData } from './charts-of-accounts.data';
@Component({
  selector: 'app-charts-of-accounts',
  templateUrl: './charts-of-accounts.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ChartsOfAccountsComponent {
  moduleTableData$: Observable<any> | undefined;
  moduleTableData: any;
  model: boolean=false;
  pageView: boolean=true;
  isDataTableLoading: boolean = false;
  currentUrl : string = '';
  page: number = 1;
  pageSize: number;
  view:string='table';
  @Input() component: any;
  @Input() cardData$: Observable<any>;
  cardData: any;
  isLoading: boolean = true;
  cardViewLoader$ = true;
  cardJsonData = coaCardMetaData;
  tableMetaData: any = tableMetaData;


  constructor(private sharedService: SharedService, private router: Router,private apiService: ApiService,private cdRef: ChangeDetectorRef,private route: ActivatedRoute) {
  }

  changeView(event){
    this.view=event;
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params.view) {
        this.view = params.view;
      }
    });
   // this.getTableData()
    // this.currentUrl = 'chart-of-accounts';

  }

  getTableData(){
    let url = `payroll/setup/chart-of-accounts${ this.page ? '&page='+this.page : '' }${ this.pageSize ? '&limit='+this.pageSize : ''}`;

    this.moduleTableData$ = this.apiService.get(url).pipe(
      tap((res: any) => {

        this.isDataTableLoading = false;
        this.moduleTableData = res
      })
    );
   // this.moduleTableData$.subscribe();
  }



  onPageChange(event){

      this.page = event;
      this.getTableData();
  }

  onSizeChange(event){

    this.pageSize = event;
    this.getTableData();
  }



  //ngOnChanges(changes: SimpleChanges): void {
  //   if (changes.moduleTableData$) {
  //     this.moduleTableData$.pipe(
  //       tap(data => {
  //         this.cardData = {
  //           meta: cardMetaData,
  //           data: data
  //         };
  //       }),
  //       catchError(error => {
  //         console.error(error);
  //         throw error;
  //       })
  //     ).subscribe();


  //   }

  // }




}
