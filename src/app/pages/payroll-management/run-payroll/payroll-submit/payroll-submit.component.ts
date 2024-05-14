import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexTitleSubtitle, ApexXAxis, ApexYAxis } from 'ng-apexcharts';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { allReportsData, tableMetaData2 } from '../run-payroll.data';
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
  selector: 'app-payroll-submit',
  templateUrl: './payroll-submit.component.html',
  styleUrls: ['./payroll-submit.component.scss']
})

export class PayrollSubmitComponent implements OnInit {
  allReportsData: any = allReportsData;
  public chartOptions: any;
  isProcessing: boolean = false;
  isDownloading: boolean = false;
  theme: string = this.sharedService.getTheme();
  batchId;
  tableMetaData: any = tableMetaData2;

  private routeSub: Subscription | undefined;
  colorArray: string[] = ['#ff8000', '#492185', '#fc1777', '#b9b0d1', '#b380ff', '#fc7db2', '#413366', '#ffbf80', '#a175e3', '#fc7db2', '#d1c9e6', '#b899e6', '#f28cb7', '#6e4dcc', '#fff2e5', '#f4edff', '#ffd9e9', '#ebe3ff', '#e7d6ff', '#ffe3ef', '#b499ff', '#e67300', '#3f216b', '#e3176c', '#867d9e', '#8a4de5', '#f21a74', '#3a334d'];



  private modalRef: NgbModalRef;
  options = [
    { label: 'Basic Salary', percentage: 61.95, dotColor: '#51546F' },
    { label: 'Sample', percentage: 38.05, dotColor: '#482084' },
    { label: 'Benefits', percentage: 10, dotColor: '#482084' },
    { label: 'Company Taxes', percentage: 20, dotColor: '#FC7EB3' },
    { label: 'Paid Time Off', percentage: 20, dotColor: '#FC1777' },
    { label: 'Reimbursement', percentage: 20, dotColor: '#FF8100' },
    { label: 'Overtime', percentage: 20, dotColor: '#F0E5FF' },
  ];
  compNames: any;
  percentages: any;
  summaryData: any;
  dotColor: any;
  isSummaryLoading: boolean = true;
  detailsdata: any = [];
  establishmentNo: any;
  payslips: any;
  xlsChecked: boolean = true;
  csvChecked: boolean = false;
  pdfChecked: boolean = false;
  sifChecked: boolean = false;
  selectedLayout: string = 'vertical';
  reportCardId: number;
  detectedError: boolean;
  errorMessage: string = '';
  print : any = {
    id: 0,
    status: false,
  }
  fetchedData: any;
  constructor(private sharedService: SharedService, private router: Router, private apiService: ApiService, private route: ActivatedRoute, private modalService: NgbModal, private cdRef: ChangeDetectorRef,) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.batchId = params['batchId'];
    });

    this.getSummary()
    this.getDetails()
    // PLEASE ONLY CALL THESE API WHEN USER CLICK ON PARTICULAR REPORTTO GENERATE

    // this.getWPSReportData()
    // this.getPayrollComparisonData()
    this.chartOptions = {
      // series: this.percentages,
      chart: {
        height: 330,

        type: 'donut',
      },
      // labels: this.compNames,
      colors: this.colorArray,
      dataLabels: {
        enabled: false,
      },
      legend: { show: false },
      plotOptions: {
        pie: {
          labels: {
            show: false,
            name: {
              show: false
            },
            value: {
              show: false,
              formatter: (val) => {
                return '';
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
    };
  }

  previewReport(index) {
    if (index === 3) {
      this.isProcessing = true;
      this.router.navigate(['/payroll/run/payslip/preview', this.batchId]);
    }
  }

  downloadReport(index) {
    if (index === 3) {
      this.isDownloading = true;
      this.apiService.getPdfData(`payroll/run/generate/payslip/${this.batchId}`).subscribe({
        next: (data: any) => {
          if (data) {
            const blob = new Blob([data], { type: 'application/pdf' });

            // Create a link element
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);

            // Set the download attribute with a suggested file name
            link.download = 'payslip.pdf';

            // Append the link to the body
            document.body.appendChild(link);

            // Trigger a click event to start the download
            link.click();

            // Remove the link from the DOM
            document.body.removeChild(link);
            this.isDownloading = false;
          }
        }, error: () => {

          this.isDownloading = false;
        }
      });
    }
  }

  getSummary() {
    this.apiService.get(`payroll/run/summary/${this.batchId}`).subscribe({
      next: (res: any) => {
        if (res && res.data) {

          this.summaryData = res.data.map((item: any, index: number) => ({
            ...item,
            // Assign dot color to res data
            dotColor: this.colorArray[index % this.colorArray.length]
          }));

          // Extract component names and percentages into separate arrays using map
          this.compNames = res.data.map((item: any) => item.name);
          this.percentages = res.data.map((item: any) => item.percentage);

          //Map th items to the chart
          this.chartOptions.series = this.percentages.map((percentage: string) => parseFloat(percentage.replace('%', '')));
          this.chartOptions.labels = this.compNames
          this.chartOptions.colors = this.summaryData.map((color: any) => color.dotColor);

          this.isSummaryLoading = false
        }
      }, error: () => {

        this.isSummaryLoading = false;
      }
    });
  }

  getWPSReportData(type: string) {
    this.apiService.get(`reports/payroll/wps-report/${this.batchId}?fileType=${type}`).subscribe({
      next: (res: any) => {
        if (res && res.status === 'success' && res.fileData) {
          this.establishmentNo = res.establishmentNo;
          this.payslips = res.fileData
          if (type === 'xlsx') {
            this.downloadXLSX(res.fileData);
          } else if (type === 'cvs') {
            this.downloadCSV(res.fileData);
          } else if (type === 'sif') {
            this.downloadSIF()
          } else if (type === 'pdf') {
            this.downloadPDF()
          }
        } else {
          this.errorMessage = res.message || "Failed to generate report";
        }
      },
      error: (error: any) => {
        console.error("Error occurred while fetching report data:", error);
        this.errorMessage = "Error occurred while fetching report data";
      }
    });
  }

  downloadXLSX(xlsxData: string) {
    const excelBuffer = this.base64ToArrayBuffer(xlsxData);
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    a.download = `${this.establishmentNo}${formattedDate}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = window.atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }
  
  downloadCSV(csvData) {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    a.download = `${this.establishmentNo}${formattedDate}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  getPayrollComparisonData(type) {
    this.apiService.get(`reports/payroll/payroll-comparison/${this.batchId}?fileType=${type}&layout=${this.selectedLayout}`).subscribe({
      next: (res: any) => {
        if (res && res.fileData) {
          this.establishmentNo = res.establishmentNo;
          if (type === 'xlsx') {
            this.downloadXLSX(res.fileData);
          } else {
            this.downloadCSV(res.fileData);
          }
        }
      },
      error: (error: any) => {
        this.detectedError = true
        console.error("error detected", error);
      },
      complete: () => {
      }
    });
  }

  handleCheckboxClick(checkboxName: string) {
    if (checkboxName !== 'xls') this.xlsChecked = false;
    if (checkboxName !== 'csv') this.csvChecked = false;
    if (checkboxName !== 'pdf') this.pdfChecked = false;
    if (checkboxName !== 'sif') this.sifChecked = false;
  }

  closeModal() {
    this.cdRef.detectChanges();
    this.modalRef.close();
  }

  downloadFile() {
    if (this.reportCardId === 3) {
      if (this.xlsChecked) {
        this.getWPSReportData('xlsx');
      }
      if (this.csvChecked) {
        this.getWPSReportData('csv');
      }
      if (this.sifChecked) {
        this.getWPSReportData('sif');
      }
      if (this.pdfChecked) {
        this.getWPSReportData('pdf');
      }
    }
    if (this.reportCardId === 2) {
      if (this.xlsChecked) {
        this.getPayrollComparisonData('xlsx');
      }
      if (this.csvChecked) {
        this.getPayrollComparisonData('csv');
      }
    }
  }

  newModel(model: any, action: string, id: any, reportId: any) {
    // this.settingForm.reset();
    // this.settingData = [];
    // this.action = action;
    // this.currentId = id;
    this.modalRef = this.modalService.open(model, {
      size: 'md', scrollable: false, windowClass: 'payroll-submit-form-modal', backdrop: 'static'
    });
    let path = this.router.url.split('/')
    this.reportCardId = reportId;
    // if (this.action == 'Modify') {
    //   this.isLoading = true;
    //   let apiUrl = path[path.length - 1];
    //   this.apiService.get(`${this.formData.apiUrl}/${this.subLink}/${this.currentId}`).subscribe({
    //     next: (res: any) => {
    //       if (res) {
    //         this.settingData = res.data;
    //         this.settingForm.patchValue(res.data)
    //         this.isLoading = false;
    //         this.cdRef.detectChanges();
    //       }
    //     }, error: (error: any) => {
    //       this.detectedError = true;
    //       this.isLoading = false;
    //       this.cdRef.detectChanges();
    //
    //     }


    //   });
  }

  downloadPDF() {
    if (this.payslips && this.payslips.length > 0) {
      const keys = this.payslips.length > 0 ? Object.keys(this.payslips[0]) : [];
      const documentDefinition = {
        content: [
          {
            style: 'tableStyle',
            table: {
              headerRows: 1,
              widths: Array(keys.length).fill('auto'),
              body: [
                keys.map(key => ({ text: key, style: 'tableHeader' })),
                ...(this.payslips ? this.payslips.map(payslip =>
                  keys.map(key => ({ text: payslip[key], style: 'tableCell' }))
                ) : [])
              ]
            }
          }
        ],
        styles: {
          tableStyle: {
            margin: [0, 0, 0, 0],
            padding: [0, 0, 0, 0]
          },
          tableHeader: {
            bold: true,
            fontSize: 8,
            fillColor: '#CCCCCC'
          },
          tableCell: {
            fontSize: 8
          }
        }
      };
      const pdf = pdfMake.createPdf(documentDefinition);
      pdf.open();
    }
    else {
      this.detectedError = true
    }
  }

  getDetails() {
    this.apiService.get(`payroll/run/details/${this.batchId}`).subscribe({
      next: (res: any) => {
        if (res) {

          this.detailsdata = res.data

          this.cdRef.detectChanges();
        }
      }, error: () => {

      }
    });
  }


 downloadSIF() {
    if (this.payslips && this.payslips.length > 0) {
      const sifData = this.convertToCustomFormat(this.payslips);

      const blob = new Blob([sifData], { type: 'text/plain' });

      const link = document.createElement('a');

      link.href = window.URL.createObjectURL(blob);

      const currentDate = new Date();
      const formattedDate = this.formatDate(currentDate);

      link.download = `${this.establishmentNo}${formattedDate}.sif`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    }
    else {
      this.detectedError = true
    }
  }

  convertToCustomFormat(payslips: any[]): string {
    let result = '';

    payslips.forEach(payslip => {
      let line = '';

      Object.keys(payslip).forEach(key => {
        line += payslip[key] + ',';
      });

      line = line.slice(0, -1) + '\n';

      result += line;
    });

    return result;
  }

  formatDate(date: Date): string {
    const year = date.getFullYear().toString().slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return year + month + day + hours + minutes + seconds;
  }


  payslipPreview(id, fileName){
    // this.router.navigate(['/employee/payslip-preview',id]);
    this.print = {id: id,status: true}
    this.apiService.getPdfData(`payroll/run/view/payslip/${id}`).subscribe({
      next: (data: any) => {
        if (data) {
          this.sharedService.viewBuffer(data, fileName);
        }
      },
      error: (error) => {
        this.print = {id: 0,status: false}
        console.error("Error fetching PDF:", error);
      },
      complete: () => {
        this.print = {id: 0,status: false}
      }
    });
  }
}
