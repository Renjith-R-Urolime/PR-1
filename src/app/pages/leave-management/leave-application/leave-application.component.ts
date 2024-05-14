import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexPlotOptions,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis
} from "ng-apexcharts";
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { cardMetaData, tableMetaData } from './leave-application-data';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  labels: any;
  legend: ApexLegend;
  colors: string[];
};

@Component({
  selector: 'app-leave-application',
  templateUrl: './leave-application.component.html',
  styleUrls: ['./leave-application.component.scss']
})
export class LeaveApplicationComponent implements OnInit, OnDestroy {
  chartOptions: any = [];
  cardJsonData =cardMetaData;
  view: string = 'table';
  applicationData;
  chartSeries = [];
  tableMetaData: any = tableMetaData;
  theme: string = this.sharedService.getTheme();
  modalName: string;
  private subscription: Subscription;
  requestList:any = [
    {
      "name":"Sick Leave Request",
      "employee":"Farhan",
      "time":"2 hours ago",
      "days":2,
      "startDate":"14 June",
      "endDate":"16 June",
      "available":20,
      "used":5
    },
    {
      "name":"Sick Leave Request",
      "employee":"Farhan",
      "days":2,
      "time":"30 minutes ago",
      "startDate":"14 June",
      "endDate":"16 June",
      "available":20,
      "used":5
    },
    {
      "name":"Sick Leave Request",
      "employee":"Farhan",
      "days":2,
      "time":"1 hour ago",
      "startDate":"14 June",
      "endDate":"16 June",
      "available":20,
      "used":5
    },
    {
      "name":"Sick Leave Request",
      "employee":"Farhan",
      "days":2,
      "time":"15 minutes ago",
      "startDate":"14 June",
      "endDate":"16 June",
      "available":20,
      "used":5
    }
  ]
  isLoading;
  detectedError;
  isRowWise: boolean;
  availableDays: any;
  usedDays: any;
  apiErrorMessage: any;
  hasError: boolean;
  totalCount: any;
  successCount: any;
  failedCount: any;
  selectedFile: null;
  modalSize: string;
  downloadData: any;
  selectedFileName: null;
  constructor(private route: ActivatedRoute,private sharedService:SharedService,private cdRef:ChangeDetectorRef,private apiService:ApiService,private router: Router) { }

  ngOnInit() {
  /*   this.chartOptions = {
      chart: {
        height: 230,
        type: "donut"
      },
      labels: ["Available", "Used"],
      colors: ['#1177ff', '#9bd9fe'],
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          pie: {
            offsetX: -50,
            offsetY: 20,

            donut: {
              size: "75%"
            }
          },
          donut: {
            size: "75%",
            labels: {
              show: true,
              name: {
                show: false
              },
              value: {
                show: true,
                formatter: (val) => {
                  return val;
                }
              },
              total: {
                show: true,
                showAlways: false,
                formatter: (w) => {
                 return '02/05'
                }
              }
            }
          }
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };  */
    this.isLoading = true;
    this.route.queryParams.subscribe((params) => {
      if (params.view) {
        this.view = params.view;
      }
    });
    this.getApplicationDashboard();
    this.getRecordName()
    this.subscription = this.sharedService.currentApi.subscribe(data => {
      if (data) {
        if (data.apiType === 'import' && data.exportType) {
          this.getTemplate(data.exportType);
        } else if (data.apiType === 'export' && data.file) {
          this.uploadData(data.file);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openModalFromEvent(size: 'lg' | 'md' = 'lg') { 
    this.sharedService.changeModalData(this.modalName);
    this.sharedService.apiResponse('', '', '', false, '');
    this.sharedService.handleOpenFileUploadModel(size);
  }

  openModalFromResponse(total, valid, error, success, csvData, size: 'lg' | 'md' = 'md') {
    this.sharedService.onModalClose();
    this.sharedService.apiResponse(total, valid, error, success, csvData);
    this.sharedService.handleOpenFileUploadModel(size);
  }

  getRecordName() {
    const urlSegments = this.router.url.split('/').map(segment => segment.toLowerCase());
    let apiUrl = '';
    let recordName = '';
    if (urlSegments.includes('leave-management')) {
      apiUrl = 'leave-management/leave-application';
      recordName = 'leave-application'
    }
    this.modalName = recordName
    return recordName
  }

  getTemplate(selectedType) {
    const recordName = this.getRecordName()
    this.apiService.get(`leave/application/template/export?model=leave-application&importType=${selectedType}`)
      .subscribe({
        next: (response: any) => {
          const csvData = response.data;
          const blob = new Blob([csvData], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = selectedType === 'create' ? `${recordName}-template-sample.csv` : `${recordName}-update-template`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        },
        error: (error: any) => {
          console.error("There was an error downloading the file", error);
        }
      });
  }

  uploadData(selectedFile: File) {
    this.isLoading = true;
    const recordName = this.getRecordName()
    const formData = new FormData();
    formData.append('file', selectedFile);

    const apiEndpoint = `leave/application/import?model=${recordName}`;

    this.apiService.post(apiEndpoint, formData).subscribe({
      next: (res: any) => {
        if (res.status === 'failed' && res.data === null) {

          this.apiErrorMessage = res.message;
          this.hasError = true;
          this.isLoading = false;
        }
        if (res && res.data && res.data.length > 0) {
          this.totalCount = res.total
          this.successCount = res.valid
          this.failedCount = res.error
        }
        if (res.status === 'success') {
          this.isLoading = false;
          this.selectedFile = null;
          this.selectedFile = null;
          const fileInput = document.getElementById('fileInput') as HTMLInputElement;
          fileInput.value = '';
          const success = true;
          this.modalSize = 'md'
          this.openModalFromResponse(res.total, res.valid, res.error, success, '', 'md');
        }
        if (res.status === 'failed' && Array.isArray(res.data) && res.data.length > 0) {
          this.isLoading = false;
          const csvData = this.convertToCSV(res.data);
          this.downloadData = csvData
          this.selectedFile = null;
          this.selectedFileName = null;
          const success = true;
          this.modalSize = 'md'
          this.openModalFromResponse(res.total, res.valid, res.error, success, csvData, 'md')
        }
      },
      error: (error: any) => {
        console.error("Error in file upload", error);
      }
    });
  }

  convertToCSV(data: any[]): string {
    let csvContent = '';

    const columnHeadings = Object.keys(data[0]?.rowData || {});

    columnHeadings.unshift("Error");

    csvContent += columnHeadings.join(',') + '\n';

    data.forEach(row => {
      const rowData = row.rowData;

      const rowValues = columnHeadings.map(key => {
        if (key === "Error") {
          return `"${row.errors.join(', ')}"`;
        } else {
          const value = rowData[key];
          return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
        }
      });

      csvContent += rowValues.join(',') + '\n';

      csvContent += '\n';
    });

    return csvContent;
  }


  getApplicationDashboard(){
    this.apiService.get(`leave/application/dashboard`).subscribe({
      next: (res: any) => {
        if (res) {

          this.applicationData = res;
          if (this.applicationData.recentApplications.length !=0){

            this.isRowWise= false;
          }
          else{

            this.isRowWise= true;
          }
           res?.recentApplications.forEach((e) => {
            const availableDays = e.availableDays ? parseFloat(e.availableDays) : 0
            const usedDays = e.usedDays ? parseFloat(e.usedDays) : 0
            const showData = `${usedDays}/${availableDays}`
            const chartOptions =  {
              series: [availableDays,usedDays],
              chart: {
                height: 100,
                type: "donut"
              },
              labels: ["Available", "Used"],
              colors: ['#1177ff', '#9bd9fe'],
              dataLabels: {
                enabled: false,
              },
              plotOptions: {
                pie: {
                  pie: {
                    offsetX: -50,
                    offsetY: 20,

                    donut: {
                      size: "75%"
                    }
                  },
                  donut: {
                    size: "75%",
                    labels: {
                      show: true,
                      name: {
                        show: false
                      },
                      value: {
                        show: true,
                        formatter: (val) => {
                          return val;
                        }
                      },
                      total: {
                        show: true,
                        showAlways: false,
                        formatter: (w) => {
                         return showData
                        }
                      }
                    }
                  }
                }
              },
              stroke: {
                lineCap: 'round',
              }
            }
            this.chartOptions.push(chartOptions);


          });
          this.isLoading = false;
          this.cdRef.detectChanges();
        }
      }, error: (error: any) => {
        this.detectedError = true;

        console.error(error);
      }


    });
  }
  changeView(event){
    this.view=event;
  }

  onApprove(applicationId,statusId){
    if(applicationId){
      let reqBody = {
        "status":statusId
      }
      this.apiService.put(`leave/application/${applicationId}`, reqBody, 'leave-application').subscribe({
        next: (res: any) => {
          if (res) {
            let currentUrl = this.router.url;
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate([currentUrl]);
          });
           // this.sharedService.handleSuccessModel({ id: applicationId });
          }
        },
        error: (error: any) => {
          console.error(error)
        }
      }
      );
    }

  }
}



