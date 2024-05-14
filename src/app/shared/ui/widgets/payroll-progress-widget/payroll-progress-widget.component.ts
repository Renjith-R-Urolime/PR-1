import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-payroll-progress-widget',
  templateUrl: './payroll-progress-widget.component.html',
  styleUrls: ['./payroll-progress-widget.component.scss']
})
export class PayrollProgressWidgetComponent implements OnInit {
  // theme:string = this.sharedService.getTheme();
  @Input() progress = '';
  @Input() color = '';
  @Input() description = '';
  @Input() title = '';
  colorblue=' #5db8fe';
  onboarderProgress = '48%';
  onboardingProgress = '32%';
  pendingProgress = '20%';
  constructor(private cdRef: ChangeDetectorRef) {  this.setSize('lg');}
  size: string;
  sizeClass: string;

  isLoading: boolean;

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.cdRef.detectChanges();
    }, 1000);}
  setSize(size: string) {
    this.size = size;
    switch (size) {
      case 'sm':
        this.sizeClass = 'col-md-4';
        break;
      case 'md':
        this.sizeClass = 'col-md-6';
        break;
      case 'lg':
        this.sizeClass = 'col-md-12';
        break;
    }
  }
}
