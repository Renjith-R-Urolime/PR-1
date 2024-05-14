import { ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, filter, fromEvent, map } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { tableMetaData } from './roles-and-permissions.data';

@Component({
  selector: 'app-roles-and-permissions',
  templateUrl: './roles-and-permissions.component.html',
})
export class RolesAndPermissionsComponent implements OnInit {

  view: string = 'table';
  templateName: string = 'Allocation'
  formTemplateRef: TemplateRef<any>;
  selectedEmployees: any = [];
  searchText:string;
  employeesCount;
  listLoading: boolean = false;
  employeeList: any=[];
  selectAll:boolean = false;
  roleId : any = '';
  pageNo = 1;
  roles: any = [];
  roleAssignEnable:boolean = true;
  tableMetaData: any = tableMetaData;
  @ViewChild('input') input: ElementRef;
  theme: string = this.sharedService.getTheme();
  constructor( private sharedService: SharedService, private router: Router, private apiService: ApiService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.getEmployeeList();
    this.getRoles();
  }
  ngAfterViewInit() {
      if(this.input){
        fromEvent(this.input.nativeElement, 'keyup')
        .pipe(
          debounceTime(500),
          map(() => this.input.nativeElement.value),
          filter(text => text !== this.searchText),
        )
        .subscribe((text) => {
          this.searchText = text;
          if(this.searchText.length >= 3 || this.searchText === '' || this.searchText === null || this.searchText === undefined){
            this.pageNo = 1;
            this.employeeList = [];
            this.getEmployeeList();
          }
        });
      }
  }
  getRoles(){
    this.apiService.get(`setup/access/roles`, 'dropdown').subscribe({
      next: (res: any) => {
        if (res) {
          this.roles = res.data;
          this.cdRef.detectChanges();
        }
      },
      error: (error: any) => {

      }
    })
  }
  getEmployeeList(){
    this.listLoading = true;
    this.apiService.get(`core-hr/employee?limit=50&page=${this.pageNo}${this.searchText ? '&search=' + this.searchText : ''}`, 'dropdown').subscribe({
      next: (res: any) => {
        if (res) {
          this.employeeList = [...this.employeeList,...res.data];
          this.employeesCount = res.count;
         /*  if(this.searchText){
            for (let i = 0; i < this.employeeList.length; i++) {
              this.employeeList[i].isSelected = false;
            }
          } */
          this.listLoading = false;
          this.cdRef.detectChanges();
        }
      },
      error: (error: any) => {

      }
    })
  }

  changeView(event){
    //
  }
  open(event, id?){
    this.sharedService.closeSideBar();
    const currentURL = this.router.url.split('?')[0];
    this.router.navigate([currentURL, event, id ? id : null].filter(Boolean));
  }
  onDrawerSave(event){


    let data = {
      "roleId":this.roleId,
      "employee":this.selectedEmployees
    }

    if(this.selectedEmployees && this.roleId){
      this.roleAssignEnable = false;
      this.apiService.put(`setup/access/assign`,data, 'role assign').subscribe({
        next: (res: any) => {
          if (res) {
            this.selectedEmployees = [];
            this.roleId = null;
          }
        },
        error: (error: any) => {

        }
      })
    }
  }
  onDrawerCancel(event){
    this.selectedEmployees = [];
    this.roleId = null;
  }
  applySearchFilter(){
    if(this.searchText.length >=3)
    this.getEmployeeList();
  }

  toggleEmployeeSelection(event,empid) {
    const index = this.employeeList.findIndex(i => i.id === empid);

    if (index !== -1 && event.target.checked) {
      this.selectedEmployees.push(empid);
    }

  }
  checkUncheckAll() {
    for (var i = 0; i < this.employeeList.length; i++) {
      this.employeeList[i].isSelected = this.selectAll;
    }
    this.getCheckedItemList();
  }
  isAllSelected() {
    this.selectAll = this.employeeList.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }
  getCheckedItemList(){
    this.selectedEmployees = [];
    for (var i = 0; i < this.employeeList.length; i++) {
      if(this.employeeList[i].isSelected)
      this.selectedEmployees.push(this.employeeList[i].id);
    }
  }
  openDrawer(){
    this.roleId = null;
    this.selectedEmployees = [];
    this.selectAll = false;
    if(this.searchText){
      this.pageNo = 1;
      this.searchText = '';
      this.input.nativeElement.value = '';
      this.employeeList = [];
      this.getEmployeeList();
    }
    for (let i = 0; i < this.employeeList?.length; i++) {
      this.employeeList[i].isSelected = false;
    }
  }
  loadMore(){
    this.pageNo++;
    this.getEmployeeList();
  }
}
