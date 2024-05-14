import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, debounceTime } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { chartsOfAccountsFormData, formSections } from '../charts-of-accounts.data';
@Component({
  selector: 'app-charts-of-accounts-form',
  templateUrl: './charts-of-accounts-form.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./charts-of-accounts-form.component.scss']
})

export class ChartsOfAccountsFormComponent {
  createEditForm: FormGroup;
  isProcessing: boolean = false;
  submit: boolean = false;
  theme: string = this.sharedService.getTheme();
  constructor(private modalService: NgbModal,private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private dynamicFormService: DynamicFormService, public sharedService: SharedService, private _location: Location, private apiService: ApiService, private router: Router) { }
  @ViewChild('successModelButtonTemplate') successModelButtonTemplate: TemplateRef<any>;
  id;
  countries = [];
  subsidiaryList = [];
  parentList = [];
  accountTypeList =[];
  col = 6;
  currentURL: string;
  isLoading: boolean = false;
  formData: any = chartsOfAccountsFormData;
  private routeSub: Subscription | undefined;
  formSections: Sections = formSections;
  private modalRef: NgbModalRef;
  imageUrl: any;
  imgURL:string;
  showImg:boolean=false;
  subListLoading = true;
  parentListLoading = true;
  detectedError:boolean;
  chrtOfAccData:any;

  ngOnInit() {


    this.detectedError=false;

    this.currentURL = this.router.url
    let pathArray = this.currentURL.split('/');
    if (pathArray[pathArray.length - 1] == "create") {
      pathArray = pathArray.slice(0, pathArray.length - 1);
    } else {
      pathArray = pathArray.slice(0, pathArray.length - 2);
    }

    this.currentURL = pathArray.join("/");


    this.createEditForm = this.dynamicFormService.createControl(this.formData)

    this.routeSub = this.route.params.subscribe(params => {


      // Access route parameters here
      this.id = params['id'];


    });
    if (this.id) {
      this.isLoading = true;

        this.apiService.get(`payroll/setup/chart-of-accounts/${this.id}`).subscribe({
        next:(res:any)=>{
          if (res) {
            this.chrtOfAccData = res.data;
            this.createEditForm.patchValue(res.data)
            this.isLoading = false;
            this.cdRef.detectChanges();
          }
        },error:(error:any)=>{
          this.detectedError=true;
          this.isLoading = false;
          this.cdRef.detectChanges();

          console.error(error);

        }
      });
    }

    this.createEditForm.controls.name.valueChanges.pipe(debounceTime(2000)).subscribe(() => {
      if (this.createEditForm.value.name !== '' && this.createEditForm.value.name !== null) {
        if (this.createEditForm.value.displayName === '' || this.createEditForm.value.displayName === null) {
          this.createEditForm.patchValue({
            "displayName": this.createEditForm.value.name
          })
        }
        if (this.createEditForm.value.legalName === '' || this.createEditForm.value.legalName === null) {
          this.createEditForm.patchValue({
            "legalName": this.createEditForm.value.name
          })
        }

      }
    })

  }
  // getSubsidiaryList(searchValue?){
  //   this.subListLoading = true;
  //
  //   this.apiService.get(`core-hr/organisation/subsidiary?page=1&limit=5${ searchValue ? '&search='+searchValue: '' }`).subscribe((res: any) => {
  //     if (res) {
  //
  //       this.subsidiaryList = res.data;
  //       this.subListLoading = false;
  //       this.cdRef.detectChanges();
  //     }
  //   });
  // }
  // getSubAccountList(searchValue?){
  //   this.subListLoading = true;
  //   this.apiService.get(`payroll/setup/chart-of-accounts?page=1&limit=5${ searchValue ? '&search='+searchValue: '' }`).subscribe((res: any) => {
  //     if (res) {
  //       this.parentList = res.data;
  //       this.parentListLoading = false;
  //       this.cdRef.detectChanges();
  //     }
  //   });
  // }

  onSubmit() {
    // --------success popup page--------


    this.isProcessing = true;
    this.submit = true;
    if (this.createEditForm.invalid) {

      this.isProcessing = false;
      return;
    }
    else {
      this.submit = false;
      let data = this.createEditForm.value;
      data.createdBy = 1
      if (!this.id) {
        this.apiService.post(`payroll/setup/chart-of-accounts`, data).subscribe({
        next:(res:any)=>{
          if (res) {

            this.isProcessing = false;
            this.cdRef.detectChanges();
            this.sharedService.handleSuccessModel({ id: res._id ,btnTemplate:this.successModelButtonTemplate });
          }
        },
        error:(error:any)=>{
          this.detectedError=true;
          console.error(error);

        }
        }
        );
      }
      else {
        data = this.dynamicFormService.getUpdatedData(this.createEditForm)
        this.apiService.put(`payroll/setup/chart-of-accounts/${this.id}`, data).subscribe({
        next:(res:any)=>{
          if (res) {
            this.isProcessing = false;
            this.cdRef.detectChanges();
            this.sharedService.handleSuccessModel({ id: this.id });
          }
          else {
            this.isProcessing = false;
          }
        },
        error:(error:any)=>{
          this.detectedError=true;
          console.error(error);

        }
        });
      }
    }

  }

  onCancel() {
    this._location.back();
  }

  onSearch(searchTerm: string, field?) {

    if (searchTerm && searchTerm.length >= 3) { // Add a minimum character threshold
      if( field === 'subAccountOf' ){
        // this.getSubAccountList(searchTerm)
      }
      if( field  === 'subsidiary' ){
        // this.getSubsidiaryList(searchTerm)
      }
  }
  }
  onModelCancel() {
    this.sharedService.onModalClose();
    }

  clearForm(){
    this.createEditForm = this.dynamicFormService.createControl(this.formData)
  }

}
