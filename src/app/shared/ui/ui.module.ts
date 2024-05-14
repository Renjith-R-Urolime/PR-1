import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbActiveModal, NgbModalModule, NgbModule, NgbPaginationModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
// import { EditorModule } from "@tinymce/tinymce-angular";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginPdfPreview from "filepond-plugin-pdf-preview";
import { InlineSVGModule } from "ng-inline-svg-2";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FilePondModule, registerPlugin } from 'ngx-filepond';
import { ImageCropperModule } from 'ngx-image-cropper';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { ModalComponent } from "src/app/_metronic/partials/layout/modals/modal/modal.component";
import { NoticesDropdownComponent } from "src/app/shared/ui/notices-dropdown/notices-dropdown.component";
import { TimelessPickerModule } from 'timeless-picker';
import { DirectiveModule } from "../directive/directive.module";
import { PipeModule } from "../pipe/pipe.module";
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CardViewListComponent } from "./card-view-list/card-view-list.component";
import { CreateTableListComponent } from './create-table-list/create-table-list.component';
import { CustomNgSelectComponent } from './custom-ng-select/custom-ng-select.component';
import { DataTableListComponent } from "./data-table-list/data-table-list.component";
import { DeleteConfirmModelComponent } from './delete-confirm-model/delete-confirm-model.component';
import { DetailsCardComponent } from "./details-card/details-card.component";
import { EditorComponent } from './editor/editor.component';
import { NewEditorComponent } from './editor/new-editor/new-editor.component';
import { EmployeeProfilePopupComponent } from './employee-profile-popup/employee-profile-popup.component';
import { EmployeeSelectComponent } from './employee-select/employee-select.component';
import { ErrorPopupComponent } from './error-popup/error-popup.component';
import { FileUploadModalComponent } from './file-upload-modal/file-upload-modal.component';
import { FormDrawerComponent } from './form-drawer/form-drawer.component';
import { InputFileUploadComponent } from './input-file-upload/input-file-upload.component';
import { InputTextFieldComponent } from './input-text-field/input-text-field.component';
import { InputTimeFieldComponent } from './input-time-field/input-time-field.component';
import { IntlPhonenumberComponent } from './intl-phonenumber/intl-phonenumber.component';
import { ManageSelectEmpComponent } from './manage-select-emp/manage-select-emp.component';
import { ModuleSettingsComponent } from "./module-settings/module-settings.component";
import { SettingsListComponent } from "./module-settings/settings-list/settings-list.component";
import { NewDatePickerComponent } from './new-date-picker/new-date-picker.component';
import { NewTimePickerComponent } from './new-time-picker/new-time-picker.component';
import { NotificationAlertComponent } from "./notification-alert/notification-alert.component";
import { OrgChartComponent } from './org-chart/org-chart.component';
import { PageTitleComponent } from "./page-title/page-title.component";
import { PayrollInfoWindowComponent } from './payroll-info-window/payroll-info-window.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { PillTabsComponent } from "./pill-tabs/pill-tabs.component";
import { ProgressButtonComponent } from "./progress-button/progress-button.component";
import { ReportSearchAndFilterComponent } from "./report-search-and-filter/report-search-and-filter.component";
import { ResponseFilterComponent } from "./response-filter/response-filter.component";
import { RunPayrollModalComponent } from "./run-payroll-modal/run-payroll-modal.component";
import { ScrollableCardsComponent } from './scrollable-cards/scrollable-cards.component';
import { SearchAndFilterComponent } from "./search-and-filter/search-and-filter.component";
import { EditFormSkeletonComponent } from './skeleton/edit-form-skeleton/edit-form-skeleton.component';
import { SurveyModelComponent } from "./survey-model/survey-model.component";
import { TabDataTableComponent } from "./tab-data-table/tab-data-table.component";
import { TimePickerComponent } from './time-picker/time-picker.component';
import { ToolTipComponent } from './tool-tip/tool-tip.component';
import { UserDetailsComponent } from "./user-details/user-details.component";
import { WizardTabsComponent } from "./wizard-tabs/wizard-tabs.component";
import { ClassificationApplicabilityComponent } from './classification-applicability/classification-applicability.component';

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview, FilePondPluginImageEdit, FilePondPluginImageCrop, FilePondPluginPdfPreview);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    TimelessPickerModule,
    FilePondModule,
    NgbPaginationModule,
    DirectiveModule,
    InlineSVGModule,
    NgxSkeletonLoaderModule,
    NgSelectModule,
    NgbModule,
    ImageCropperModule,
    NgbModalModule,
    // EditorModule,
    PipeModule,
    NgbTooltipModule,
    InfiniteScrollModule,
    BsDatepickerModule.forRoot(),
    // DatepickerModule.forRoot()
  ],
  declarations: [
    TabDataTableComponent,
    ModalComponent,
    CustomNgSelectComponent,
    DetailsCardComponent,
    NotificationAlertComponent,
    PageTitleComponent,
    SearchAndFilterComponent,
    ReportSearchAndFilterComponent,
    PillTabsComponent,
    UserDetailsComponent,
    DataTableListComponent,
    WizardTabsComponent,
    ProgressButtonComponent,
    SurveyModelComponent,
    EditorComponent,
    NoticesDropdownComponent,
    ManageSelectEmpComponent,
    PeopleListComponent,
    CreateTableListComponent,
    OrgChartComponent,
    WizardTabsComponent,
    RunPayrollModalComponent,
    ScrollableCardsComponent,
    PayrollInfoWindowComponent,
    DeleteConfirmModelComponent,
    BreadcrumbComponent,
    ErrorPopupComponent,
    FormDrawerComponent,
    CardViewListComponent,
    EditFormSkeletonComponent,
    TimePickerComponent,
    InputFileUploadComponent,
    ModuleSettingsComponent,
    SettingsListComponent,
    EmployeeSelectComponent,
    IntlPhonenumberComponent,
    InputTimeFieldComponent,
    InputTextFieldComponent,
    ResponseFilterComponent,
    NewDatePickerComponent,
    NewTimePickerComponent,
    FileUploadModalComponent,
    ToolTipComponent,
    NewEditorComponent,
    EmployeeProfilePopupComponent,
    ClassificationApplicabilityComponent
  ],

  exports: [
    PipeModule,
    InputFileUploadComponent,
    NgSelectModule,
    DetailsCardComponent,
    NotificationAlertComponent,
    WizardTabsComponent,
    PageTitleComponent,
    SearchAndFilterComponent,
    ReportSearchAndFilterComponent,
    PillTabsComponent,
    UserDetailsComponent,
    DataTableListComponent,
    SurveyModelComponent,
    EditorComponent,
    CustomNgSelectComponent,
    DirectiveModule,
    NoticesDropdownComponent,
    ManageSelectEmpComponent,
    ProgressButtonComponent,
    OrgChartComponent,
    ScrollableCardsComponent,
    PayrollInfoWindowComponent,
    RunPayrollModalComponent,
    ModalComponent,
    BreadcrumbComponent,
    TabDataTableComponent,
    ErrorPopupComponent,
    FormDrawerComponent,
    CardViewListComponent,
    EditFormSkeletonComponent,
    ModuleSettingsComponent,
    SettingsListComponent,
    EmployeeSelectComponent,
    IntlPhonenumberComponent,
    InputTimeFieldComponent,
    ImageCropperModule,
    InputTextFieldComponent,
    InfiniteScrollModule,
    ResponseFilterComponent,
    NewDatePickerComponent,
    NewTimePickerComponent,
    FileUploadModalComponent,
    ToolTipComponent,
    NewEditorComponent,
    ClassificationApplicabilityComponent
  ],
  providers: [NgbActiveModal, ModalComponent]
})
export class UiModule { }
