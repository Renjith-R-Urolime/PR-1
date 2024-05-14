import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/shared/services/shared.service';
import { expenseTypeCardMetaData, tableMetaData ,expenseTypeFormData} from './expense-type.data';
import { Subscription } from 'rxjs';
import { DataTableListComponent } from 'src/app/shared/ui/data-table-list/data-table-list.component';
import { CardViewListComponent } from 'src/app/shared/ui/card-view-list/card-view-list.component';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-expense-type',
  templateUrl: './expense-type.component.html',
  styleUrls: ['./expense-type.component.scss']
})
export class ExpenseTypeComponent {
  theme: string = this.sharedService.getTheme();
  title: string = this.sharedService.getPageName();
  @ViewChild('customTemplate') customTemplate: TemplateRef<any>;

  private modalRef: NgbModalRef;
  empRoute: string;
 formData= expenseTypeFormData;
 tableMetaData=tableMetaData;
  expenseTypeForm: FormGroup;
  submit: boolean = false;
  isProcessing: boolean = false;
  submitBtnText = 'Save';
  detectedError: boolean;
  view: string = 'table';
  id;
  settingData:any = [];
  name: string = '';
  action;
  btnToggle: boolean = false;
  btnToggleId: number;
 cardJsonData =expenseTypeCardMetaData;
  isLoading: boolean;
  currentId: any;
  pathUrl:any;
  private routeSub: Subscription | undefined;
  @ViewChild('dataTable') dataTable: DataTableListComponent;
  @ViewChild('cardView') cardView: CardViewListComponent;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private dynamicFormService: DynamicFormService,
    private apiService: ApiService,
    public sharedService: SharedService,
    private route: ActivatedRoute
  ) { }

  changeView(event) {
    this.view = event;
  }
  sampleFun(event){
    console.log(this.expenseTypeForm);
    
  }

  ngOnInit() {
    this.expenseTypeForm = this.dynamicFormService.createControl(this.formData);
    console.log(this.expenseTypeForm);
    let path = this.router.url.split('/')
    let apiUrl = path[path.length - 1];
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.route.queryParams.subscribe((params) => {
      if (params.view) {
        this.view = params.view;
      }
    });
  }

  handleCancelClick() {
    this.name = '';
    this.modalRef.close();
  }

  newModel(model, action, id) {
    this.expenseTypeForm.reset();
    this.settingData = [];
    this.action = action;
    this.currentId = id;
    this.modalRef = this.modalService.open(model, {
      size: 'md', scrollable: false, windowClass: 'settings-form-modal', backdrop: 'static'
    });
    if (this.action == 'Modify') {
      this.isLoading = true;
      this.apiService.get(`payroll/settings/expense-type/${this.currentId}`).subscribe({
        next: (res: any) => {
          if (res) {
            this.settingData = res.data;
            this.expenseTypeForm.patchValue(res.data)
            this.isLoading = false;
            this.cdRef.detectChanges();
          }
        }, error: (error: any) => {
          this.detectedError = true;
          this.isLoading = false;
          this.cdRef.detectChanges();

        }


      });
    }
  }

  onSubmit() {
    this.submit = true;
    this.isProcessing = true;
    let data = this.expenseTypeForm.value;
    console.log(data);
    
    if (this.expenseTypeForm.invalid) {
      this.isProcessing = false;

    }
    else {
      this.submit = false;
      data = this.dynamicFormService.getUpdatedData(this.expenseTypeForm);      
      if (!this.currentId) {
        this.apiService.post(`payroll/settings/expense-type`, data).subscribe({
          next: (res: any) => {

            if (res) {

              this.isProcessing = false;
              this.cdRef.detectChanges();
              this.modalRef.close();
              this.sharedService.handleSuccessModel({ id: res._id, btnTemplate: this.customTemplate });
              this.dataTable?.refreshData();
              this.cardView?.fetchData();
              this.cdRef.detectChanges();
            }
          },
          error: (error: any) => {
            this.isProcessing = false;
            this.detectedError = true;
            this.dataTable?.refreshData();
            this.cdRef.detectChanges();

          }
        });
      }
      else {
        data = this.dynamicFormService.getUpdatedData(this.expenseTypeForm)
        this.apiService.put(`payroll/settings/expense-type/${this.currentId}`, data).subscribe({
          next: (res: any) => {
            if (res) {
              this.isProcessing = false;
              this.modalRef.close();
              this.sharedService.handleSuccessModel({ id: res._id, btnTemplate: this.customTemplate });
              this.dataTable?.refreshData();

              this.cardView?.fetchData();
              this.cdRef.detectChanges();
            }
            else {
              this.isProcessing = false;
              this.cdRef.detectChanges();
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

  }
  onBtnToggle(id) {
    this.btnToggleId = id;
    this.btnToggle = !this.btnToggle
  }

  goBack() {
    const fullRoute = this.getFullRoute(this.route.snapshot);

      this.router.navigate([fullRoute]);
    }

    getFullRoute(routeSnapshot: ActivatedRouteSnapshot): string {
      const segments: string[] = [];
      while (routeSnapshot) {
        segments.unshift(...routeSnapshot.url.map(segment => segment.toString()));
        routeSnapshot = routeSnapshot.parent;
      }

      // Remove the last segment
      segments.pop();

      return segments.join('/');
    }

}
