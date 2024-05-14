import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-metric-info-widget',
  templateUrl: './metric-info-widget.component.html',
  styleUrls: ['./metric-info-widget.component.scss']
})
export class MetricInfoWidgetComponent implements OnInit {
  rows: Array<{ description: string; count: string }>;
  theme: string = this.sharedService.getTheme();
  constructor(private sharedService: SharedService, private cdRef: ChangeDetectorRef) { }

  isLoading: boolean;

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.cdRef.detectChanges();
    }, 1000);
    this.rows = [
      { description: 'Avg. User Budget', count: '$6,570' },
      { description: 'Lowest User Check', count: '$6,570' },
      { description: 'Avg. Net Profit', count: '$6,570' },
    ];

  }
}
