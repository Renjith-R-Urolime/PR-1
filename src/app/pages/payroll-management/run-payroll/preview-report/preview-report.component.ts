import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-preview-report',
  templateUrl: './preview-report.component.html',
  styleUrls: ['./preview-report.component.scss']
})
export class PreviewReportComponent implements OnInit {
  report: any;
  isLoading: boolean = true;
  batchId;
  isProgress: boolean = false; // Flag to control the loading screen
  progress: number = 0;
  loadTime: number = 0;
  private routeSub: Subscription | undefined;
  constructor(private apiService: ApiService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }
  htmlResponse;
  ngOnInit() {
    // this.isProgress = true;
    this.routeSub = this.route.params.subscribe(params => {
      this.batchId = params['batchId'];
    });
    this.generatePaySlip();
  }
  generatePaySlip() {
    this.apiService.getPdfData(`payroll/run/view/payslip/${this.batchId}`).subscribe({
      next: (data: any) => {
        if (data) {
          this.htmlResponse = this.sanitizer.bypassSecurityTrustHtml(data);
          this.isLoading = false;
        }
      }, error: () => {

      }
    });
  }

  startTimer() {

    let loader = setInterval(() => {
      if (this.progress < 100) {
        this.progress += 1; // Increment by 1 instead of incrementValue
      } else {
        clearInterval(loader);
        this.isProgress = false;
      }
    }, );
  }


}
