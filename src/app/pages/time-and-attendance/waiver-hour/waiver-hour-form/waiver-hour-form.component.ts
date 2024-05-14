
import { ChangeDetectorRef, Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { Subscription, forkJoin } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { classificationApplicabilityFormMeta, formData, formSections } from '../waiver-hour.data';

@Component({
  selector: 'app-waiver-hour-form',
  templateUrl: './waiver-hour-form.component.html',
  styleUrls: ['./waiver-hour-form.component.scss']
})
export class WaiverHourFormComponent {
  isLoading: boolean = false;

  theme: string = this.sharedService.getTheme();
  id: any;
  formSections: Sections = formSections;
  formData: any = formData;
  classificationApplicabilityFormData: any = classificationApplicabilityFormMeta;
  waiverHourForm: FormGroup;
  classificationApplicabilityForm: FormGroup;
  col: any = 4;
  offset: any = 0;
  headerText: any;
  formTemplate: any;
  toleranceSaved: boolean = false;
  classificationSaved: boolean = false;
  formTemplateRef: TemplateRef<any>;
  activeTemplateName: string;
  onDrawerSaveData: any
  isProcessing: boolean;
  finalForm: any = {};
  submit: boolean = false;
  isPhoneValid: boolean = true;
  classificationApplicabilityFormSaved: boolean = false
  private routeSub: Subscription | undefined;
  detectedError: boolean;
  @ViewChild('customTemplate') customTemplate: TemplateRef<any>;
  @Output() search = new EventEmitter<string>();
  searchText: string;
  employeeData: any[] = []; // Assuming employeeData is an array of objects
  selectedEmployee: any;
  waiverHourData: any;
  pageNo = 1;

  selectAllChecked: boolean = false;
  minDate: Date;
  maxDate: Date;
  employeeCount: any;
  employeesCount: any;
  count: any = 10;
  isLoadingMore: boolean = false;

  constructor(public sharedService: SharedService, private dynamicFormService: DynamicFormService, private apiService: ApiService, private route: ActivatedRoute, private cdRef: ChangeDetectorRef,) { }


  ngOnInit() {

    this.waiverHourForm = this.dynamicFormService.createControl(this.formData)
    this.classificationApplicabilityForm = this.dynamicFormService.createControl(this.classificationApplicabilityFormData)


    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    // this.isLoading = true;
    // this.apiService.get(`core-hr/employee`).subscribe({
    //   next: (res: any) => {
    //     if (res) {
    //
    //       this.employeeData = res.data
    //       // this.waiverHourForm.patchValue(res.data)
    //       // this.classificationApplicabilityForm.patchValue(res.data)


    //       // this.waiverHourForm = res.data

    //       // this.policyForm.get('country').disable();
    //       // this.timezoneCondition = [`countryId=${ this.policyForm?.value.country.id }`]
    //       // this.currencyCondition = [`id=${ this.policyForm?.value.country.id }`]
    //       this.isLoading = false;
    //       this.cdRef.detectChanges();
    //     }
    //   }, error: (error: any) => {
    //     this.detectedError = true;
    //     this.isLoading = false;
    //     this.cdRef.detectChanges();
    //
    //     console.error(error);
    //
    //   }


    // });


    if (this.id) {
      this.classificationApplicabilityFormSaved = true
      this.isLoading = true;
      this.isLoadingMore = true;

      forkJoin({
        employeeData: this.getemployeeData(),
        waiverHourData: this.getwaiverHourData()
      }).subscribe({
        next: (results: any) => {


          this.employeeData = results.employeeData.data;
          this.waiverHourData = results.waiverHourData.data;
          this.employeesCount = results.employeeData.count;


          this.waiverHourForm.patchValue(this.waiverHourData)
          this.waiverHourForm.patchValue({
            "fromDate": format(new Date(this.waiverHourData.fromDate), 'yyyy/MM/dd'),
            "toDate": format(new Date(this.waiverHourData.toDate), 'yyyy/MM/dd'),

          })
          this.employeeData.forEach((employeeItem: any) => {


            // Check if the calendarItem's id is present in the workCalendar array
            employeeItem.isSelected = this.waiverHourData.employee.some((selectedEmployeeItem: any) => {
              return selectedEmployeeItem.id === employeeItem.id;
            });
          });
          this.selectAllChecked = this.employeeData.every((item: any) => item.isSelected === true);
          this.isLoading = false;
          this.isLoadingMore = false;

        },
        error: (e) => console.error(e),
      })
    }
    else {
      this.isLoading = true;
      this.apiService.get(`core-hr/employee?limit=${this.count}&page=${this.pageNo}`).subscribe({
        next: (res: any) => {
          if (res) {
            this.employeesCount = res.count;


            for (let calendarItem of res.data) {
              calendarItem.isSelected = this.selectAllChecked;
            }
            this.employeeData = res.data



            this.isLoading = false;
            this.cdRef.detectChanges();
          }
        }, error: (error: any) => {
          this.detectedError = true;
          this.isLoading = false;
          this.cdRef.detectChanges();

          console.error(error);

        }


      });
    }
  }

  getwaiverHourData() {
    return this.apiService.get(`time-attendance/waiver-hour/${this.id}`);
  }
  getemployeeData() {
    return this.apiService.get(`core-hr/employee?limit=${this.count}&page=${this.pageNo}`)
  }
  getemployeeDatas() {
    this.isLoadingMore = true;
    return this.apiService.get(`core-hr/employee?limit=${this.count}&page=${this.pageNo}`).subscribe({
      next: (res: any) => {
        if (res) {
          this.employeesCount = res.count;


          // Append new data to the existing array
          this.employeeData = [...this.employeeData, ...res.data];

          this.isLoadingMore = false;
          this.cdRef.detectChanges();
        }
      },
      error: (error: any) => {
        this.detectedError = true;
        this.isLoadingMore = false;
        this.cdRef.detectChanges();

        console.error(error);

      }
    });
  }
  onSelectAll() {


    // this.selectAllChecked=!this.selectAllChecked;
    for (let calendarItem of this.employeeData) {
      calendarItem.isSelected = this.selectAllChecked;
    }
  }

  onCalendarSelect(event: any, index: number) {



    this.selectAllChecked = this.employeeData.every(function (item: any) {
      return item.isSelected === true;
    })

  }
  getSelectedItems(): any[] {
    this.selectedEmployee = this.employeeData.filter(item => item.isSelected);


    return this.selectedEmployee.map(item => item.id);
  }

  onSubmit() {
    const selectedItems = this.getSelectedItems();

    this.isProcessing = true;
    this.submit = true;
    if (this.waiverHourForm.invalid || !this.isPhoneValid) {

      this.isProcessing = false;
      return;
    }

    this.submit = false;

    if (!this.id) {
      let reqBody = { ...this.waiverHourForm.value, "employee": selectedItems }


      this.apiService.post(`time-attendance/waiver-hour`, reqBody, 'waiver-hour').subscribe({
        next: (res: any) => {
          if (res) {

            this.isProcessing = false;
            this.cdRef.detectChanges();
            this.sharedService.handleSuccessModel({ id: res._id, btnTemplate: this.customTemplate });

            //   this._location.back();
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
    else {

      let reqBody = { ...this.dynamicFormService.getUpdatedData(this.waiverHourForm), "employee": selectedItems }

      this.apiService.put(`time-attendance/waiver-hour/${this.id}`, reqBody, 'work-calendar').subscribe({
        next: (res: any) => {
          if (res) {
            this.isProcessing = false;
            // this.sharedService.clearStoreList('subsidiary');
            this.cdRef.detectChanges();
            this.sharedService.handleSuccessModel({ id: res._id, btnTemplate: this.customTemplate });
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




  // --------success popup page--------

  getFormTemplate(template: TemplateRef<any>, name: string) {
    this.formTemplateRef = template
    this.activeTemplateName = name
  }
  onDrawerSave(event) {
    this.onDrawerSaveData = this.waiverHourForm.value
    this.classificationApplicabilityFormSaved = true






  }

  onDrawerCancel(event) {
    //this.waiverHourForm.reset(this.onDrawerSaveData)
    //this.formTemplate = null;

  }
  collapsed = true;

  toggle() {
    this.collapsed = !this.collapsed;
  }


  sample(event) {


  }

  applySearchFilter() {
    this.search.emit(this.searchText);
    this.sharedService.updateSearchText(this.searchText);
  }


  onDateSelected(selectedDate: Date, fieldName: string): void {



    if (fieldName === "fromDate") {
      this.minDate = new Date(selectedDate)

    }
    if (fieldName === "toDate") {
      this.maxDate = new Date(selectedDate)

    }
    // Update the form control with the selected date

  }
  loadMore() {


    this.pageNo++;


    this.count = this.count + 10


    this.getemployeeDatas();
  }
}
