import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { getCSSVariableValue } from 'src/app/_metronic/kt/_utils';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-donut-chart-widget',
  templateUrl: './donut-chart-widget.component.html',
  styleUrls: ['./donut-chart-widget.component.scss']
})
export class DonutChartWidgetComponent implements OnInit{
  theme: string = this.sharedService.getTheme();

  @Input() stats: number = 273;
  @Input() description: string = 'Total Employees';
  @Input() chartSize: number = 100;
  @Input()  wchartSize:number = 200;
  @Input() chartLine: number = 20;
  @Input() chartRotate?: number = 145;
  jsonData = [
    { status: 'Active', count: 26 },
    { status: 'Inactive', count: 48 },
    { status: 'In Progress', count: 3 }
  ];
  isLoading:boolean = false;
  constructor(public sharedService: SharedService,private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    setTimeout(() => {
      initChart(this.chartSize, this.chartLine, this.chartRotate);
    }, 10);

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.cdRef.detectChanges();
    }, 1000);
  }
}

const initChart = function (
  chartSize: number = 70,
  chartLine: number = 11,
  chartRotate: number = 145
) {
  const el = document.getElementById('kt_card_widget_17_chart');

  if (!el) {
    return;
  }

  var options = {
    size: chartSize,
    lineWidth: chartLine,
    rotate: chartRotate,
    //percent:  el.getAttribute('data-kt-percent') ,
  };

  const canvas = document.createElement('canvas');
  const span = document.createElement('span');

  // @ts-ignore
  if (typeof G_vmlCanvasManager !== 'undefined') {
    // @ts-ignore
    G_vmlCanvasManager.initElement(canvas);
  }

  const ctx = canvas.getContext('2d');
  canvas.width = canvas.height = options.size;

  el.appendChild(span);
  el.appendChild(canvas);

  // @ts-ignore
  ctx.translate(options.size / 2, options.size / 2); // change center
  // @ts-ignore
  ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

  //imd = ctx.getImageData(0, 0, 240, 240);
  const radius = (options.size - options.lineWidth) / 2;

  const drawCircle = function (
    color: string,
    lineWidth: number,
    percent: number
  ) {
    percent = Math.min(Math.max(0, percent || 1), 1);
    if (!ctx) {
      return;
    }

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
    ctx.strokeStyle = color;
    ctx.lineCap = 'round'; // butt, round or square
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };

  // Init
  drawCircle('#E4E6EF', options.lineWidth, 100 / 100);
  drawCircle('#00A3FF', options.lineWidth, 100 / 150);
  drawCircle(getCSSVariableValue('--bs-success'), options.lineWidth, 100 / 250);
};


