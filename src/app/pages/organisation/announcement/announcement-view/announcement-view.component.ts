import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { DetailsCardData, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { detailsCardList, responseCardData, tabsMeta } from './../announcement.data';
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
  selector: 'app-announcement-view',
  templateUrl: './announcement-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./announcement-view.component.scss']
})
export class AnnouncementViewComponent implements OnInit {
  public chartOptions: any;
  theme: string = this.sharedService.getTheme();
  detailsCardData: DetailsCardData = {
    meta: detailsCardList,
    data: []
  };
  responseCardData: DetailsCardData = {
    meta: responseCardData,
    data: []
  };
  labels: any = ['a','b']
  values: any = [1,2]
  items=[{
    name:"Rekha",
    
  }]

  announcementMetaData: TrazepoidTabsMeta[] = tabsMeta;
  constructor(private sharedService: SharedService) { }

  
  ngOnInit(): void {
    this.chartOptions = {
      series: this.values,
      chart: {
        type: "donut",
        height:475
      },
      legend: {
        show: false
      },
      labels: this.labels,
      colors: ['#FC1777', '#FF8100', '#BAB1D1', '#482084', '#1da745', '#d7c327'],
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          customScale: 0.4,
          donut: {
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
              },
            }
          }
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 100
            },
            legend: {
              position: "top"
            }
          }
        }
      ]
    };

  }
}
