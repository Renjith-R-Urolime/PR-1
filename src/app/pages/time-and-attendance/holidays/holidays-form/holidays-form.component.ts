import { ChangeDetectorRef, Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { Subscription, forkJoin } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { classificationApplicabilityFormMeta, formData, formSections } from '../holidays.data';
@Component({
  selector: 'app-holidays-form',
  templateUrl: './holidays-form.component.html',
  styleUrls: ['./holidays-form.component.scss']
})
export class HolidaysFormComponent {
  isLoading: boolean = false;

  theme: string = this.sharedService.getTheme();
  id: any;
  formSections:Sections = formSections;
  formData: any = formData;
  classificationApplicabilityFormData: any = classificationApplicabilityFormMeta;
  holidayForm: FormGroup;
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
  calendarData: any;
  selectAllChecked: boolean = false;
  selectedCalendar: any;
  holidayData:any;
  calendarId: any;

  constructor(public sharedService: SharedService, private dynamicFormService: DynamicFormService,private apiService: ApiService, private route: ActivatedRoute,private cdRef: ChangeDetectorRef, ) { }


  ngOnInit() {
    this.holidayForm = this.dynamicFormService.createControl(this.formData)
    this.classificationApplicabilityForm = this.dynamicFormService.createControl(this.classificationApplicabilityFormData)

    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.route.queryParams.subscribe(params => {
      const calendarId: string[] = params['calendarId'] || [];
      this.calendarId=calendarId
    });

    if (this.id) {
      this.classificationApplicabilityFormSaved = true;
      this.isLoading = true;

      forkJoin({
        calendarData: this.getCalendarData(),
        holidayData: this.getHolidayData()
      }).subscribe({
        next: (results: any) => {
          this.calendarData = results.calendarData.data;
          this.holidayData = results.holidayData.data;
          this.holidayForm.patchValue(this.holidayData);
          this.holidayForm.patchValue({
            date: this.holidayData.date ? format(new Date(this.holidayData.date), 'yyyy/MM/dd') : null,
          });

          this.calendarData.forEach((calendarItem: any) => {

            // calendarItem.isSelected = this.calendarId === calendarItem.id;
            calendarItem.isSelected = this.holidayData.workCalendar.some((workCalendarItem: any) => {
              return workCalendarItem.id === calendarItem.id;
          });
        });
        this.selectAllChecked = this.calendarData.every((item: any) => item.isSelected === true);

          this.isLoading = false;
        },
        error: (e) => console.error(e),
      });
    } else {
      this.isLoading = true;
      this.apiService.get(`time-attendance/work-calendar?limit=max`).subscribe({
        next: (res: any) => {
          if (res) {
            for (let calendarItem of res.data) {
              // Check if the calendarItem's id is the same as calendarId
              calendarItem.isSelected = this.calendarId === calendarItem.id;
            }

            this.calendarData = res.data;
            this.isLoading = false;
            this.cdRef.detectChanges();
          }
        },
        error: (error: any) => {
          this.detectedError = true;
          this.isLoading = false;
          this.cdRef.detectChanges();

          console.error(error);

        }
      });
    }
  }


  getHolidayData(){
    return this.apiService.get(`time-attendance/holiday/${this.id}`);
  }
  getCalendarData(){
    return this.apiService.get(`time-attendance/work-calendar?limit=max`);
  }
  onSelectAll() {


    // this.selectAllChecked=!this.selectAllChecked;
    for (let calendarItem of this.calendarData) {
        calendarItem.isSelected = this.selectAllChecked;
    }
}

onCalendarSelect(event: any, index: number) {



  this.selectAllChecked = this.calendarData.every(function(item:any) {
    return item.isSelected === true;
  })

}
getSelectedItems(): any[] {
  this.selectedCalendar = this.calendarData.filter(item => item.isSelected);


  return this.selectedCalendar.map(item => item.id);
}



  onSubmit() {


    const selectedItems = this.getSelectedItems();


    this.isProcessing = true;
    this.submit = true;
    if (this.holidayForm.invalid || !this.isPhoneValid) {

      this.isProcessing = false;
      return;
    }

    this.submit = false;
    if (!this.id) {
    let reqBody={...this.holidayForm.value,"workCalendar":selectedItems}


      this.apiService.post(`time-attendance/holiday`, reqBody,'work-calendar').subscribe({
        next:(res:any)=>{
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


    let reqBody={...this.dynamicFormService.getUpdatedData(this.holidayForm),"workCalendar":selectedItems}

      this.apiService.put(`time-attendance/holiday/${this.id}`, reqBody,'work-calendar').subscribe({
        next:(res:any)=>{
          if (res) {
            this.isProcessing = false;
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
    this.onDrawerSaveData = this.holidayForm.value
    this.classificationApplicabilityFormSaved=true





  }

  onDrawerCancel(event) {
   // this.holidayForm.reset(this.onDrawerSaveData)
   // this.formTemplate = null;

  }
  collapsed = true;

  toggle() {
    this.collapsed = !this.collapsed;
  }


  sample(event){


  }

  applySearchFilter() {
    this.search.emit(this.searchText);
    this.sharedService.updateSearchText(this.searchText);
  }






}
