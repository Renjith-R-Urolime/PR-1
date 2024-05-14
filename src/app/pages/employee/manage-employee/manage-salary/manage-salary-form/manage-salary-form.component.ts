import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { format } from 'date-fns';
import { Subscription, forkJoin } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { S3UploadService } from 'src/app/shared/services/s3-upload.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { formSections, manageSalaryFormData } from '../manage-salary.data';

@Component({
  selector: 'app-manage-salary-form',
  templateUrl: './manage-salary-form.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./manage-salary-form.component.scss']
})
export class ManageSalaryFormComponent {

  @Input() inputValue: boolean;
  salaryComponents:any = [];
  filteredSalaryComponents:any = [];
  manageFormReview:any;
  selectedEmployee:any;
  manageSalaryForm: FormGroup;
  isProcessing: boolean = false;
  submit: boolean = false;
  isPhoneValid: boolean = true;
  theme: string = this.sharedService.getTheme();
  baseCompSum: any;
  matchedItems: any;
  salaryDetails: any;
  matchedRates: any;
  formTemplate: null;
  emptyComponent: boolean;
  currentValue: any;
  defaultValues: any;
  enteredValue: any;

  constructor(private router: Router, private modalService: NgbModal, private apiService: ApiService, private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private dynamicFormService: DynamicFormService, public sharedService: SharedService, private _location: Location, private s3service: S3UploadService, private fb: FormBuilder,private cdr: ChangeDetectorRef) {
  }
  @ViewChild('customTemplate') customTemplate: TemplateRef<any>;
  id: any;
  col = 6;
  isLoading: boolean = false;
  formData: any = manageSalaryFormData;
  private routeSub: Subscription | undefined;
  formSections: Sections = formSections;
  private modalRef: NgbModalRef;
  formName: any;
  imageUrl: any;
  imgURL: string;
  showImg: boolean = false;
  listLoading = false;
  detectedError: boolean;
  manageSalaryData: any;
  timezoneCondition: string[] = []
  currencyCondition: string[] = []
  fileList: any;
  componentsData: any;
  formTemplateRef: TemplateRef<any>;
  activeTemplateName: string;


  ngOnInit() {
    this.manageSalaryForm = this.dynamicFormService.createControl(this.formData)


    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    if (this.id) {
      this.isLoading = true;

      forkJoin({
        componentData: this.getComponentData(),
        manageSalaryData: this.getManageSalaryData()
       }).subscribe({
        next: (results:any) => {
          const comp = results.componentData.data;
          comp.forEach(element => {
            this.salaryComponents.push({
              "componentId": element?.id,
              "componentName": element?.name,
              "rate":"",
              "isChecked":false,
              "isExisted":false,
              "oldRate":""
            })
          });
          const res = results.manageSalaryData.data;
          this.manageSalaryForm.patchValue(res)
          this.manageSalaryForm.patchValue({
            "employeeId":res.employee?.id,
            "effectiveDate":format(new Date(res?.effectiveDate), 'yyyy/MM/dd')
          });
          if(res?.component?.length>0){
            for (const comp of this.salaryComponents) {
              for (const sal of res?.component) {
                if (sal.id === comp.componentId) {
                  comp.rate = sal.componentMapping.rate;
                  comp.oldRate = sal.componentMapping.rate;
                //  comp.isChecked = true;
                  comp.isExisted = true;
                  break;
                }
              }
            }
          }
          this.selectedEmployee = {
            "firstName":res?.employee?.firstName,
            "lastName":res?.employee?.lastName,
            "grossPay":res?.grossPay,
            "salaryDetails":[
              {
                "allocation":res?.allocation,
                "component":res?.component
              }
            ]

          }
          this.isLoading = false;
        },
        error: (e) => console.error(e),
    })
    }
    else{
      this.getComponent();
    }

  }

  getComponent() {
    this.apiService.get(`payroll/setup/component?type=1&subType=1`).subscribe({
      next: (res: any) => {
        if (res && res.data) {
          res?.data.forEach(element => {
            this.salaryComponents.push({
              "componentId": element?.id,
              "componentName": element?.name,
              "rate":"",
              "isChecked":false,
              "isExisted":false,
              "oldRate":""
            })
          });

        }
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
      }
    });

  }
  getComponentData(){
    return this.apiService.get(`payroll/setup/component?type=1&subType=1`);
  }
  getManageSalaryData(){
    return this.apiService.get(`core-hr/employee/manage-salary/${this.id}`);
  }

onDropdownChange(selectedValue: any) {

    if(this.manageSalaryForm.value.employeeId){
    if(selectedValue?.id !== this.selectedEmployee?.salaryDetails?.[0]?.allocation?.id){
      for (const comp of this.salaryComponents) {
       comp.rate = 0;
       comp.isExisted = false;
      }
      this.manageSalaryForm.patchValue({
        "grossPay":""
      })
    }
    else{
      for (const comp of this.salaryComponents) {
        for (const sal of this.selectedEmployee?.salaryDetails?.[0]?.component) {
          if (sal.id === comp.componentId) {
            comp.rate = sal.componentMapping.rate;
            comp.isExisted = true;
            break;
          }
        }
      }
      this.manageSalaryForm.patchValue({
        "grossPay":this.selectedEmployee.grossPay
      })
    }
  }
  this.cdRef.detectChanges();
}

  async fetchSalaryDetails(event) {

    this.selectedEmployee = event;
    this.manageSalaryForm.patchValue({
      "grossPay":event?.grossPay,
      "allocation":event?.salaryDetails?.length > 0 ? event?.salaryDetails?.[0]?.allocation?.id : "null"
    })
    await this.resetSalaryComp();
    if(event?.salaryDetails?.length>0){
      for (const comp of this.salaryComponents) {
        for (const sal of event?.salaryDetails?.[0]?.component) {
          if (sal.id === comp.componentId) {
            comp.rate = sal.componentMapping.rate;
            comp.oldRate = sal.componentMapping.rate;
          //  comp.isChecked = true;
            comp.isExisted = true;
            break;
          }
        }
      }
    }
  }

  onRateChange(){
    let sumOfRate = this.salaryComponents.reduce((acc, component) => {
      if (component.isChecked || component.isExisted) {
        return acc + parseFloat(component.rate);
      } else {
        return acc;
      }
    }, 0);
    this.manageSalaryForm.patchValue({
      "grossPay": sumOfRate
  });
  }
  calculateAndUpdateGrossPay() {
    // Get the current gross pay from the form
    let currentGrossPay = Number(this.manageSalaryForm.get("grossPay").value) || 0;

    // Iterate over the salary components to calculate the new gross pay
    for (const comp of this.salaryComponents) {
        // Ensure comp.oldRate and comp.rate are treated as numbers
        let oldRate = Number(comp.oldRate) || 0;
        let newRate = Number(comp.rate) || 0;

        // Calculate the temporary array: (gross pay - old rate)
        let tempArray = currentGrossPay - oldRate;




        // Calculate the new gross pay: (temp array + new rate)
        let newGrossPay = tempArray + newRate;


        // Update the current gross pay for the next iteration
        currentGrossPay = newGrossPay;
    }

    // Update the grossPay field in the form with the final calculated value
    this.manageSalaryForm.patchValue({
        "grossPay": currentGrossPay
    });
}



  resetSalaryComp(){
    this.salaryComponents.forEach(element => {
      element.rate = "";
      element.oldRate = "";
      element.isChecked = false;
      element.isExisted = false;
    });
  }

  toggleCheckbox(event,index) {

    this.salaryComponents[index].isChecked = event.target.checked;
    if(!event.target.checked){
      this.salaryComponents[index].rate = this.salaryComponents[index].oldRate
    }
    this.onRateChange();
  }

  onSubmit() {
    // --------success popup page--------

    this.isProcessing = true;
    this.submit = true;
    if (this.manageSalaryForm.invalid) {

      this.isProcessing = false;
      return;
    }
    else {
      this.submit = false;
      if(!this.id){
        const data = {...this.manageSalaryForm.value,"componentMapping":this.filteredSalaryComponents,"fromManageSalary":true};
        this.apiService.post(`core-hr/employee/manage-salary`, data, 'Manage Salary').subscribe({
          next: (res: any) => {
            if (res) {

              this.isProcessing = false;
              this.cdRef.detectChanges();
              this.sharedService.handleSuccessModel({ id: res._id });
            }
          },
          error: (error: any) => {
            this.detectedError = true;
            this.cdRef.detectChanges();
            console.error(error);

          }
        }
        );
      }
      else{

        let data = {...this.dynamicFormService.getUpdatedData(this.manageSalaryForm),"componentMapping":this.filteredSalaryComponents,"fromManageSalary":true,...this.manageSalaryForm.value};
        this.apiService.put(`core-hr/employee/manage-salary/${this.id}`, data, 'Manage Salary').subscribe({
          next: (res: any) => {
            if (res) {
              this.isProcessing = false;
              this.cdRef.detectChanges();
              this.sharedService.handleSuccessModel({ id: this.id });
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
            console.error(error);
          }
        });
      }
    }
  }

  getFormTemplate(template: TemplateRef<any>, name: string) {

    this.filteredSalaryComponents = this.salaryComponents.filter(component =>
      component.isChecked || component.isExisted
    );
    this.manageFormReview = {
      "employeeId":this.selectedEmployee?.firstName + " " + this.selectedEmployee?.lastName ?? 'Not Available',
      "effectiveDate":this.manageSalaryForm.value.effectiveDate ?? 'Not Available',
      "allocation": this.manageSalaryForm.value.allocation === "1" ? "Fixed Method" :
      this.manageSalaryForm.value.allocation === "2" ? "Percentage Method" :
      "Not Selected",
      "grossPay": this.manageSalaryForm.value.grossPay ?? 'Not Available'
    }
    this.formTemplateRef = template
    this.activeTemplateName = name
 }




  onDrawerSave(event) {


    this.onSubmit();
  }

  onDrawerCancel(event) {

    this.formTemplate = null;

  }

  goBack() {
    this._location.back();

  }
  onDateSelected(selectedDate: Date) {


  }
}
