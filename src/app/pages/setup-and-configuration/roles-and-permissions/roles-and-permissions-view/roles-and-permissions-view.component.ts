import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, catchError, tap } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
// import { DetailsCardData } from 'src/app/shared/ui/details-card/details-card';
import { DetailsCardData } from 'src/app/shared/meta-interface';
import { detailsCardMeta } from '../roles-and-permissions.data';
@Component({
  selector: 'app-roles-and-permissions-view',
  templateUrl: './roles-and-permissions-view.component.html',
  styleUrls: ['./roles-and-permissions-view.component.scss']
})
export class RolesAndPermissionsViewComponent implements OnInit {
  theme: string = this.sharedService.getTheme();
  detailsCardData: DetailsCardData={
    meta: detailsCardMeta,
    data: []
  };
  isLoading:boolean = true;
  constructor(private apiService:ApiService,private sharedService:SharedService,private _location: Location,private cdRef: ChangeDetectorRef, private route: ActivatedRoute,private router: Router) { }
  private routeSub: Subscription | undefined;
  id;
  rolePermissionData:any = [];
  rolePermissions = [];
  permissionsConfig = [];
  hideme: boolean[] = [];
  detectedError: boolean = false;
  rights:string[] = ['view', 'create', 'edit', 'delete', 'cancel', 'import', 'export']
  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      // Access route parameters here
      this.id = params['id'];
    });
    this.getRoleConfig();
    this.getDetailedView();
  }

  getDetailedView(){
    this.apiService.get(`setup/access/roles/${this.id}`).pipe(
      tap((res: any) => {
        /* this.detailsCardData = {
          meta: detailsCardMeta,
          data: res.data
        }; */
        this.rolePermissionData = res.data;
        this.rolePermissions = res?.data?.permissions;
        this.isLoading = false;
        this.cdRef.detectChanges();
      }),
      catchError(err=>{

        this._location.back();
        throw err;
      })
    ).subscribe();
  }
  getRoleConfig(){

    this.apiService.get(`setup/access/config`).subscribe({
      next:(res:any)=>{
        if (res) {

          this.permissionsConfig = res.data;
          for (let i = 0; i <= this.permissionsConfig.length; i++) {
            this.hideme.push(true);
          }
          this.hideme[0]=false;
          this.cdRef.detectChanges();
        }
      },error:(error:any)=>{
        this.detectedError=true;

        console.error(error);
      }


    });
  }
  changeValue(i) {
    this.hideme[i] = !this.hideme[i];
  }
  getCheckedValue(id, mode) {
    const data = this.rolePermissions.filter(i => i.permissionId === id);
    if (data.length > 0) {
      return data[0][mode];
    } else {
      return false;
    }
  }
  open(option){
    let customUrl = '';
    if(option === 'customise'){
      customUrl = this.router.url.replace('view', 'customise');
    }
    else if(option === 'makecopy'){
      customUrl = this.router.url.replace('view', 'customise');
    }
    else{
      customUrl = this.router.url.replace('view', 'edit');
    }
    this.router.navigateByUrl(customUrl);
  }
}
