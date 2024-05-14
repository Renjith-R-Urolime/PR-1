import { ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { JsonListService } from 'src/app/shared/services/json-list/json-list.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { formSections, rapFormMeta, roleType } from '../roles-and-permissions.data';
@Component({
  selector: 'app-roles-and-permissions-form',
  templateUrl: './roles-and-permissions-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class RolesAndPermissionsFormComponent implements OnInit {

  private modalRef: NgbModalRef;
  permissionData = [];
  rolePermissions = [];
  permissionsConfig = [];
  @Input() theme: string = this.sharedService.getTheme();
  detectedError: boolean = false;
  isLoading: boolean = true;
  formSections: Sections = formSections
  submit: boolean = false;
  roleAndPermissionsForm: FormGroup;
  formData: any = rapFormMeta;
  isProcessing: boolean = false;
  permissionList = [];
  roleTypeList = roleType;
  hideme: boolean[] = [];
  rights: string[] = ['view', 'create', 'edit', 'delete', 'cancel', 'import', 'export']
  id;
  rolesAndPermissionData:any;
  subsidiaryCondition: string[]=[];
  subsidiaryFilter: string[]=[];

  constructor(public sharedService: SharedService, public apiService: ApiService, private dynamicFormService: DynamicFormService, private cdRef: ChangeDetectorRef,private fb: FormBuilder,private route: ActivatedRoute,private router: Router,private modalService: NgbModal, private jsonListService: JsonListService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // Access route parameters here
      this.id = params['id'];
    });
    this.roleAndPermissionsForm = this.dynamicFormService.createControl(this.formData)
    this.getData();
    this.getRoleConfig();
  }

  onSubsidiaryChange(event) {

    if(this.roleAndPermissionsForm.value?.subsidiary !== 'ALL' && event.length > 0) {
      this.subsidiaryFilter = [`subsidiary=${event.map( item => item.id).join(',')}`];
    }else{
      this.subsidiaryFilter = []
    }
  }


  async getData() {
    await this.getRoleConfig()
    this.getDropdownValues();
    if(this.id){
      this.getRolePermissions()
    }
  }
  getDropdownValues() {
    this.jsonListService.getDataList("employeePermission").subscribe({
      next: (result) => {
        this.permissionList = result;
      }
    });
  }
  changeValue(i) {
    this.hideme[i] = !this.hideme[i];
  }
  onSubmit() {
    this.submit = true;
    if (this.roleAndPermissionsForm.invalid) {
      return '';
    }
    else {
      this.isProcessing = true;
      let data = {
        ...this.roleAndPermissionsForm.getRawValue(),
        "access":this.permissionData
      }

      if(this.router.url.includes('customise')){
        this.apiService.post(`setup/access/roles`, data, 'role permission').subscribe({
          next: (res: any) => {
            if (res) {

              this.sharedService.handleSuccessModel({ id: res._id });
            }
          },
          error: (error: any) => {
            this.isProcessing = false
            this.detectedError = true;
            console.error(error);
            this.cdRef.detectChanges();

          }
        }
        );
      }
      else{
        data = this.dynamicFormService.getUpdatedData(this.roleAndPermissionsForm)
        this.apiService.put(`setup/access/roles/${this.id}`, data, 'role permission').subscribe({
          next: (res: any) => {
            if (res) {

              this.sharedService.handleSuccessModel({ id: this.id});            }
          },
          error: (error: any) => {
            this.isProcessing = false
            this.detectedError = true;
            console.error(error);
            this.cdRef.detectChanges();

          }
        }
        );
      }
    }
  }

  getRoleConfig() {
    this.apiService.get(`setup/access/config`).subscribe({
      next: (res: any) => {
        if (res) {
          this.permissionsConfig = res.data;


          for (let i = 0; i < this.permissionsConfig.length; i++) {
            this.hideme.push(true);
            for (let j = 0; j < this.permissionsConfig[i].permissions.length; j++) {
              this.permissionData.push({
                "name":this.permissionsConfig[i].permissions[j].name,
                "permissionId":this.permissionsConfig[i].permissions[j].id,
                "view": false,
                "create":false,
                "edit":false,
                "delete":false,
                "cancel":false,
                "import":false,
                "export":false
              })
            }
          }
          this.hideme[0]=false;
          this.cdRef.detectChanges();
        }
      }, error: (error: any) => {
        this.detectedError = true;

        console.error(error);
      }


    });
  }
  /* get permissionData(): FormArray {
    return this.roleAndPermissionsForm.get("permissions") as FormArray
  } */
  getRolePermissions() {
    this.apiService.get(`setup/access/roles/${this.id}`).subscribe({
      next: (res: any) => {
        if (res) {
          this.rolesAndPermissionData = res.data
          this.roleAndPermissionsForm.patchValue(res?.data)
          this.roleAndPermissionsForm.patchValue({
            "subsidiary": this.roleAndPermissionsForm.value.subsidiary.map(item => item.id),
            "jurisdiction":this.roleAndPermissionsForm.value.jurisdiction.map(item => item.id),
            "location":this.roleAndPermissionsForm.value.location.map(item => item.id),
            "class":this.roleAndPermissionsForm.value.class.map(item => item.id),
            "department":this.roleAndPermissionsForm.value.department.map(item => item.id)
          })
          if(this.router.url.includes('customise')){
            this.roleAndPermissionsForm.patchValue({
              "name":"Copy of "+this.roleAndPermissionsForm.value.name,
              "roleType":"custom",
              "parentRoleId":this.id
            })
          }
          this.rolePermissions = res?.data?.permissions;
          for (let i = 0; i < this.permissionData.length; i++) {
            for (let j = 0; j < this.rolePermissions.length; j++) {
              if(this.rolePermissions[j].permissionId === this.permissionData[i].permissionId){
                this.permissionData[i].view = this.rolePermissions[j].view
                this.permissionData[i].create = this.rolePermissions[j].create
                this.permissionData[i].edit = this.rolePermissions[j].edit
                this.permissionData[i].delete = this.rolePermissions[j].delete
                this.permissionData[i].cancel = this.rolePermissions[j].cancel
                this.permissionData[i].import = this.rolePermissions[j].import
                this.permissionData[i].export = this.rolePermissions[j].export
              }
            }
          }
          this.isLoading = false;
          this.cdRef.detectChanges();
        }
      }, error: (error: any) => {
        this.detectedError = true;

        console.error(error);
      }


    });
  }
  getCheckedValue(id, mode) {
    const data = this.rolePermissions.filter(i => i.permissionId === id);
    if (data.length > 0) {
      return data[0][mode];
    } else {
      return false;
    }
  }
  onCheckChange(event,id, mode){
    const index = this.permissionData.findIndex(i => i.permissionId === id);
    if (index !== -1) {
      this.permissionData[index][mode] = event.target.checked;
    }
  }
}
