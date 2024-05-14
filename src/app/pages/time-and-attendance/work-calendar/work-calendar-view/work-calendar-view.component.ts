import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ModalComponent } from 'src/app/_metronic/partials';
import { DetailsCardData, FormMeta, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { DataTable } from 'src/app/shared/ui/data-table-list/data-table-list';
import { WizardTabs } from 'src/app/shared/ui/wizard-tabs/wizard-tabs';
import { formSections } from '../../shift-scheduler/shift.data';
import { classificationApplicabilityFormMeta, detailsCardList, detailsCardLists, formSectionsList, tabs, tabsMetaData, trapezoidTabTableData, workCalendarFormData, workCalendarwizardTabs } from '../work-calendar.data';

@Component({
  selector: 'app-work-calendar-view',
  templateUrl: './work-calendar-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./work-calendar-view.component.scss']
})

export class WorkCalendarViewComponent implements OnInit {

  detailsCardLists: DetailsCardData = {
    meta: detailsCardLists,
    data: []
  };
  isShiftTab: boolean;
  workCalendarTabsMeta = tabsMetaData;
  wizardData: WizardTabs = workCalendarwizardTabs; data: any;
  selectedShiftId: string;
  selectedShiftData: any;
  workCalendatDetails: any;
  totalBreakTime: any;
  totalAdditionalBreak: string;
  showEditOptions: boolean = false;
  shiftDataDetails: any;
  shiftData: any;
  @Input() btnPrefix: string = 'Create';
  formSection: Sections = formSectionsList;
  tableData: DataTable;
  trapezoidTabs: TrazepoidTabsMeta[] = tabs;
  trapezoidTabsTable: DataTable[] = trapezoidTabTableData;
  formData: FormMeta = workCalendarFormData;
  search: boolean = false
  trapizoid: boolean = true
  detailsCardDataList: DetailsCardData = {
    meta: detailsCardList,
    data: []
  };
  id: number;
  classificationApplicabilityFormData: any = classificationApplicabilityFormMeta;
  @ViewChild('modifyTimingsTemplate') modifyTimingsTemplate: TemplateRef<any>;
  showLess: boolean = false;
  showAllItems: boolean[] = [];
  // Function to toggle showLess
  toggleShowLess() {
    this.showLess = !this.showLess;
  }

  private routeSub: Subscription | undefined;
  isLoading: boolean = true;
  formSections = formSections;
  activeTemplateName: string;
  formTemplateRef: TemplateRef<any>;
  headerText: string
  formTemplate: TemplateRef<any>
  calendarData: any
  shiftId: any = 0
  showEditButton: boolean = false;
  totalShiftIds:any
  theme: string = this.sharedService.getTheme(); weekdays: { name: { name: string; }; }[];
  result: string;
  calendarId: any;
  classificationApplicabilityData: any
  editDeleteDropdownOpen: boolean = false;
  selectedShiftIndex: number = 0;
  private modalRef: NgbModalRef;
  constructor(private sharedService: SharedService, private router: Router, private route: ActivatedRoute, private apiService: ApiService, private cdRef: ChangeDetectorRef, private modalService: NgbModal, private _location: Location) { }

  ngOnInit() {
    this.classificationApplicabilityFormData.labels.forEach(() => {
      this.showAllItems.push(false);
    });
    this.sharedService.selectedTabLabel$.subscribe(response => {
      this.tableData = this.trapezoidTabsTable.find(item => item.tableName === response);

    });

    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.calendarId = this.id
    });

this.allShiftData()




  }

  processedDays: Set<string> = new Set();

  getFormTemplate(template: TemplateRef<any>, name: string) {
    this.formTemplateRef = template
    this.activeTemplateName = name
  }

  selectShift(shiftId: number, shiftData?: any) {

    this.shiftId = shiftId
    this.selectedShiftIndex = shiftId;
    this.showEditButton = false;
  }


  toggleEditButton() {
    this.showEditButton = !this.showEditButton;
  }

  toggleEditOptions(): void {
    this.showEditOptions = !this.showEditOptions;
  }

  handleEdit(): void {

  }

  toggleEditDeleteDropdown(): void {
    this.editDeleteDropdownOpen = !this.editDeleteDropdownOpen;
  }

  async deletePopup() {
    const deleteAPI = await this.sharedService.getCurrentApi();

    this.modalRef = this.modalService.open(ModalComponent, {
      centered: true,
      size: 'fit',
      windowClass: 'full-screen-modal',
      backdrop: 'static',
      keyboard: false
    });

    this.modalRef.componentInstance.successMessage = "Successfully Deleted";
    this.modalRef.componentInstance.confirmMessage = "Are you sure you want to delete";
    this.modalRef.componentInstance.sumbmittingLogo = './assets/media/icons/trash-outline-custom.svg';
    this.modalRef.componentInstance.modalLogo = './assets/media/gif/success.gif';
    this.modalRef.componentInstance.isButton = 'true';
    this.modalRef.componentInstance.modalName = 'delete';

    // Wait for the confirmation from DeleteConfirmModelComponent
    this.modalRef.componentInstance.deleteConfirmed.subscribe((confirmed: boolean) => {
      if (confirmed && deleteAPI !== undefined) {


        // Call your API for delete
        this.apiService.delete(`${deleteAPI.url}/${this.id}`).subscribe({
          next: (response: any) => {

            if (response) {
              this.modalRef.componentInstance.detectSuccess(true);
              this._location.back();
            }
          },
          error: (error: any) => {
            console.error("Error while deleting:", error);
            // Handle error here (show message to user or log the error)
          }
        });
      }
    });
  }

  editShift(shiftId: number): void {
    if (shiftId) {
      this.router.navigate(['/time-and-attendance/calendar/shift/edit', shiftId]);
    }
  }


  open(type: string) {
    this.sharedService.closeSideBar();

    let targetUrl: string;
    let queryParams: any = {};

    const currentParams = this.route.snapshot.queryParams;
    if (Object.keys(currentParams).length > 0) {
      queryParams = { ...currentParams };
    }

    if (type === 'edit') {
      targetUrl = this.router.url.replace('view', 'edit');
    } else if (type === 'add-shift') {
      targetUrl = '/time-and-attendance/calendar/shift/create';
    } else if (type === 'add-holiday') {
      targetUrl = '/time-and-attendance/calendar/holiday/create';
    } else if (type === 'add-waiver-hour') {
      targetUrl = '/time-and-attendance/calendar/waiver/create';
    } else {
      targetUrl = this.router.url.split('?')[0] + '/' + this.btnPrefix.toLowerCase();
    }


    queryParams.calendarId = this.calendarId;

    const navigationExtras: NavigationExtras = {
      queryParams: queryParams,
    };
    this.router.navigate([targetUrl], navigationExtras);
  }


  allShiftData(){
    if (this.id) {
      this.isLoading = true;

      this.apiService.get(`tabs/work-calendar/${this.id}`).subscribe({
        next: (res: any) => {
          if (res) {
            this.totalShiftIds= res.tabs?.shift?.data?.map(item => item.id);


          }
        }, error: (error: any) => {
          this.isLoading = false;
          this.cdRef.detectChanges();

          console.error(error);

        }
      });
    }
  }













}

