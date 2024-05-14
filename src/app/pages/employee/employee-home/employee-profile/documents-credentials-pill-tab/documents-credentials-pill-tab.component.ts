import { ChangeDetectorRef, Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { differenceInDays, format, parseISO } from 'date-fns';
import { menuReinitialization } from 'src/app/_metronic/kt/kt-helpers';
import { TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { InputFileUploadComponent } from 'src/app/shared/ui/input-file-upload/input-file-upload.component';import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { getCSSVariableValue } from '../../../../../_metronic/kt/_utils';
import { documentChartMeta, documentTabsMeta } from '../employee-profile-data';


import { documentChartColorMeta, uploadDocumentFormData } from './documents-credentials-data';
@Component({
  selector: 'app-documents-credentials-pill-tab',
  templateUrl: './documents-credentials-pill-tab.component.html',
  styleUrls: ['./documents-credentials-pill-tab.component.scss']
})
export class DocumentsCredentialsPillTabComponent {
  @ViewChild('cardContainer') cardContainer!: ElementRef;
  @ViewChild('uploadFormTemplate') uploadFormTemplate: TemplateRef<any>;
  @ViewChild(InputFileUploadComponent) inputFileComponent!: InputFileUploadComponent;
  documentPillTabsMeta: TrazepoidTabsMeta[] = documentTabsMeta;
  chartOptions: any = [];
  chartHeight: any = '100px'
  detectedError: boolean = false;
  isProcessing: boolean = false
  theme: string = this.sharedService.getTheme();
  documentChartMeta: any = documentChartMeta
  cardData = Array.from({ length: 10 }, (_, index) => index + 1);
  documentChartData: any
  updatedChartMeta: any = []
  formTemplate: TemplateRef<any>;
  headerText: string;
  uploadDocumentFormData = uploadDocumentFormData;
  uploadDocumentForm: FormGroup;
  formDrawerOpen: string = ""
  isButtonClicked: boolean = false
  btnToggle: boolean = false;
  btnToggleId: any;
  documentPatchData: any
  uploadFormArray: any = [];
  savedDocuments:any
  fileList: any
  trackingApplication: any = false
  documentId: any
  isLoading: boolean = true
  browseReset: boolean = false;
  currentTask: string
  currentTab: string
  isTabsFormSaveDisabled: boolean = true
  viewMode: boolean = false
  tabHeaderText: string
  formTemplateTabs: TemplateRef<any>;

  constructor(public apiService: ApiService, private sharedService: SharedService, private cdRef: ChangeDetectorRef, private dynamicFormService: DynamicFormService,) {

  }

  ngOnInit() {

    this.sharedService.employeeDetails$.subscribe((data: any) => {
      this.documentChartData = data?.employeeDocumentsAndCredentials;
      this.isLoading = false
      menuReinitialization();
      for (let i = 0; i < this.documentChartData?.length; i++) {
        const colorMetaIndex = i % documentChartColorMeta.length;
        const issueDate = parseISO(this.documentChartData[i]?.issueDate);
        const expiryDate = parseISO(this.documentChartData[i]?.expiryDate);

        const totalDays = differenceInDays(expiryDate, issueDate);
        const remainingDays = differenceInDays(expiryDate, new Date());
        const consumedDays = differenceInDays(new Date(), issueDate);
        this.documentChartData[i] = {
          ...this.documentChartData[i],
          ...documentChartColorMeta[colorMetaIndex],
          totalDays,
          remainingDays,
          consumedDays,
        };
      }

      //////////////////////


      ///////////////////////
      this.updatedChartMeta = this.documentChartData

      if (this.updatedChartMeta?.length > 0) {
        this.chartOptions = []
        this.uploadDocumentForm = this.dynamicFormService.createControl(uploadDocumentFormData);
        this.updatedChartMeta.forEach((meta) => {
          const chartOptions = this.getChartOptions(meta.chartHeight, meta.baseColor, meta.lightColor, meta?.consumedDays, meta?.totalDays, meta?.remainingDays);

          this.chartOptions.push(chartOptions);
          this.chartOptions = [...this.chartOptions];


        });
      }
    });
  }

  scrollLeft() {
    const scrollAmount = this.cardContainer.nativeElement.scrollLeft - 300;
    this.cardContainer.nativeElement.scrollTo({
      left: scrollAmount,
      behavior: 'smooth' // Enable smooth scrolling
    });
  }

  scrollRight() {
    const scrollAmount = this.cardContainer.nativeElement.scrollLeft + 300;
    this.cardContainer.nativeElement.scrollTo({
      left: scrollAmount,
      behavior: 'smooth' // Enable smooth scrolling
    });
  }

  getChartOptions(chartHeight: string, baseColor: string, lightColor: string, issue: number, expiry: number, remainingDays: number) {
    const labelColor = getCSSVariableValue('--bs-gray-700');
    let displayValue
    if (remainingDays > 100) {
      displayValue = `100+ Days`
    }
    else if (remainingDays <= 0) {
      displayValue = `expired`
    }
    else {
      displayValue = `${remainingDays} Days`
    }

    return {
      series: [(issue / expiry) * 100],
      chart: {
        fontFamily: 'inherit',
        height: '130px',
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: '50%',
          },
          dataLabels: {
            name: {
              show: false,
              fontWeight: '400',
            },
            value: {
              color: labelColor,
              fontSize: '10px',
              fontWeight: 'bold',
              offsetY: 5,
              show: true,
              formatter: function (val: number) {
                return `${displayValue}`
              },
            },
          },

          track: {
            background: lightColor,
            strokeWidth: '100%',
          },
        },
      },
      colors: [baseColor],
      stroke: {
        lineCap: 'round',
      },
      labels: ['Progress'],
    };
  }


  assignTemplate(headerText, formTemplate, data, task) {
    console.log(data,'dta psl');

    this.uploadFormArray = []
    this.uploadDocumentForm = this.dynamicFormService.createControl(uploadDocumentFormData);
    this.resetFilePond();
    //this.fileList = [data?.browse]
    this.headerText = headerText;
    this.formTemplate = formTemplate;
    if (task == 'edit') {
      this.currentTask = 'edit'
      this.isButtonClicked = true
      this.uploadFormArray.push(data);
      if (!data?.trackingApplication) {
        this.trackingApplication = false
      }
      else {
        this.trackingApplication = true
      }
      this.uploadDocumentForm.patchValue(data)
      this.uploadDocumentForm.patchValue({
        issueDate: data?.issueDate ? format(new Date(data?.issueDate), 'yyyy/MM/dd') : null,
        expiryDate: data?.expiryDate ? format(new Date(data?.expiryDate), 'yyyy/MM/dd') : null,
      })
      this.documentId = data.id
      this.uploadDocumentForm.patchValue({
        documentName: data?.documentName,
        documentTypeId: data?.documentType,
        browse: null,
        trackingApplication: data?.trackingApplication,
        credentialNumber: data.credentialNumber
      })
      this.cdRef.detectChanges();

    }
    else if (task == 'create') {
      this.currentTask = 'create'

    }
  }


  savePopupForm(event, formName) {
    if (this.documentId && this.currentTask == 'edit') {
      this.isLoading = true
      this.apiService.put(`core-hr/employee/document/${this.documentId}`, { ...this.uploadDocumentForm.value }, 'documents').subscribe({
        next: (res: any) => {
          if (res) {
            this.sharedService.updateEmployeeData()
          }
        },
        error: (error: any) => {
          this.handleError(error);
        }
      }
      );
    }
    else if (this.currentTask == 'create') {
      const employeeId = this.sharedService.employeeIdSubject.value

      this.isLoading = true
      this.apiService.put(`core-hr/employee/${employeeId}`, { documents: [{ ...this.uploadDocumentForm.value }] }, 'documents').subscribe({
        next: (res: any) => {
          if (res) {

            this.sharedService.updateEmployeeData()
            this.isLoading = false
          }
        },
        error: (error: any) => {
          this.handleError(error);
        }
      }
      );

    }
    this.viewMode = false
  }


  cancelPopupForm(event) {
    //this.getCancelFormsList(formName);
this.inputFileComponent.deleteFromS3()
    this.viewMode = false
    this.cdRef.detectChanges();

  }


  fileRemovedEvent(event) {
    console.log("file removed event");
if (this.documentId && this.currentTask == 'edit') {
  this.apiService.put(`core-hr/employee/document/${this.documentId}`, {browse:event?.files}, 'documents').subscribe({
    next: (res: any) => {
      if (res) {
console.log("uploaded to db");
      }
    },
    error: (error: any) => {
      this.handleError(error);
    }
  }
  );
}
  }



  onBtnToggle(id) {
    this.btnToggleId = id;
    this.btnToggle = !this.btnToggle
  }


  onCheckboxTypeChange(event) {
    if (event.target.checked == false) {
      this.trackingApplication = false
      this.uploadDocumentForm.patchValue({
        "placeOfIssue": null,
        "issueDate": null,
        "issueAuthority": null,
        "expiryDate": null,
        "country": null,
        "credentialNumber": null
      });
    }
    else {
      this.trackingApplication = true
    }
  }




  private handleError(error: any) {
    this.isProcessing = false;
    this.detectedError = true;
    this.cdRef.detectChanges();
    console.error(error);

  }


  uploadDocument() {

  }

  private resetFilePond() {
    this.browseReset = true;
    setTimeout(() => {
      this.browseReset = false;
    }, 1000);
  }


  open(type, id, data, tab, meta) {

    if (tab == 'documents') {
      if (type == 'view') {
        this.viewMode = true
        this.tabHeaderText = 'View Document'

      }
      else {
        this.viewMode = false
        this.tabHeaderText = 'Edit Document'

      }


      this.currentTab = tab
      this.assignTemplate(this.tabHeaderText, this.uploadFormTemplate, data, 'edit')
    }
  }

}