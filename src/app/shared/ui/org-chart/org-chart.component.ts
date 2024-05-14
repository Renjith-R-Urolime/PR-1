import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
// import { jsPDF } from 'jspdf';
// const _ = require('lodash');
import { OrgChart } from 'd3-org-chart';
import domtoimage from 'dom-to-image';
import { cloneDeep } from 'lodash';
import { SharedService } from '../../services/shared.service';
import { colors, departments, orgData } from './org-chart.data';
@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.scss']
})
export class OrgChartComponent  implements OnInit, OnChanges,AfterViewInit{
  theme: string = this.sharedService.getTheme();
  compact: number = 0
  isFullScreen: boolean = false;
  departments: any[] = departments;
  @ViewChild('chartContainer') chartContainer: ElementRef;
  data = [...orgData]
  selectedDepartment: string;
  chart: any;
  showExport: boolean = false;
  assignedColors: any
  orgChartContainer: any;
  appendSelect: string = 'body';
  isProfile: boolean = false;
  profileClicked: any;
  parentProfile: any;
  prevProfileId:any;
  isOpen:boolean;
  numberOfClicks:number=0;
  constructor(private sharedService: SharedService, private elementRef: ElementRef, private cdRef: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this.assignedColors = this.assignColorsToDepartments(departments, colors);

  }
  ngOnChanges() {
    this.updateChart();
  }
  assignColorsToDepartments(departments, colors) {
    const assignedColors = {};
    // Shuffle the colors array to ensure random assignments
    for (let i = 0; i < departments.length; i++) {
      const department = departments[i];
      const color = colors[i % colors.length]; // Loop over colors if departments > colors
      assignedColors[department] = color;
    }
    return assignedColors;
  }
  showProfile(d) {
    this.isProfile = true;
    this.numberOfClicks+=1;
    if(this.numberOfClicks<=1){
      this.prevProfileId=d;
    }
    if(this.numberOfClicks>1){
      this.chart.render().clearHighlighting();
    }
    if (this.isProfile) {
      this.chart.setHighlighted(d).render();
    }
    else {
      this.chart.clearHighlighting().render();
    }
    this.profileClicked = this.data.find(element => element.id === d);
    if (this.profileClicked.parentId) {
      this.parentProfile = this.data.find(element => element.id === this.profileClicked.parentId);
    }
    this.cdRef.detectChanges();
  }
  updateChart() {
    if (!this.data) {
      return;
    }
    if (!this.chart) {
      return;
    }
    this.chart = new OrgChart()
      .container(this.chartContainer.nativeElement)
      .data(this.data)
      .nodeWidth(() => 210)
      .nodeHeight(() => 110)
      .onNodeClick(d => {
        this.showProfile(d);
      })
      .childrenMargin(() => 50)
      .compactMarginBetween(() => 25)
      .compactMarginPair(() => 50)
      .neightbourMargin(() => 25)
      .siblingsMargin(() => 25)
      .buttonContent(({ node }) => {
        return `<div style="px;color:#716E7B;border-radius:5px;padding:4px;font-size:10px;margin:auto auto;background-color:white;border: 1px solid #E4E2E9"> <span style="font-size:9px">${node.children
          ? `<i class="fas fa-angle-up"></i>`
          : `<i class="fas fa-angle-down"></i>`
          }</span> ${node.data._directSubordinates}  </div>`;
      })
      .nodeContent((d) => {
        const borderColor = this.assignedColors[d.data.department]
        const card = `
            <div style="min-width:fit-content; max-width:${d.width}px;height:${d.height}px;">
                <div class="bg-white rounded border-top-extended h-100" style="border-color: ${borderColor} ">
                  <div class="align-content-center d-flex gap-4 px-4 py-3">
                  <div class="align-self-center">
                  <div class="align-items-center bg-gray-400 h-50px justify-content-center rounded-circle w-50px" style=" display: ${d.data.image === '' ? 'd-flex' : 'none'}">
                    <span class="mb-1 svg-gray-400 svg-icon svg-icon-2" [inlineSVG]="'./assets/media/icons/person.svg'">
                    </span>
                  </div>
                  <img style="display: ${d.data.image !== '' ? 'block' : 'none'}" src="${d.data.image}" class="h-50px rounded-circle w-50px">
                </div>
                    <div >
                    <div class="fs-3 fw-bolder text-dark">${d.data.name}</div>
                    <div class="fs-9 text-dark">${d.data.position}</div>
                    <div class="fs-10 badge bg-gray-600 mt-2">${d.data.location}</div>
                  </div>
                </div>
              </div>
              </div>`;
        // const pill =
        //   ``
        return card;
      })
      .render();
  }
  async downloadPDF(type) {
    // this.onFullScreen();
    ///
    const orgChartContainer = this.chartContainer.nativeElement;
    // orgChartContainer.style.position = 'absolute'; // To position it absolutely within its parent
    // Optionally, set top and left properties to specify the starting position
    // orgChartContainer.style.top = '-300px'; // Example top position, adjust as needed
    // orgChartContainer.style.left = '-400px'; // Example left position, adjust as needed
    const orgChart = new OrgChart(
    );
    orgChart
      .container(orgChartContainer)
      .initialZoom(1)
      .compact(true)
      .data(this.data)
      // eslint-disable-next-line no-unused-vars
      .nodeWidth(d => 210)
      // eslint-disable-next-line no-unused-vars
      .nodeHeight(d => 110)
      .nodeContent((d) => {
        const borderColor = this.assignedColors[d.data.department];
        const card = `
        <div class="d-flex justify-content-between">
          <div class="col-lg-5" style="min-width:fit-content; max-width:${d.width}px;height:${d.height}px; ">
            <div class="bg-white rounded border-top-extended h-100" style="border-color: ${borderColor}">
              <div class="align-content-center d-flex gap-4 px-4 py-3">
                <div class="align-self-center">
                  <div class="align-items-center bg-gray-400 h-50px justify-content-center rounded-circle w-50px" style=" display: ${d.data.image === '' ? 'd-flex' : 'none'}">
                    </span>
                  </div>
                  <img style="display: ${d.data.image !== '' ? 'block' : 'none'}" src="${d.data.image}" class="h-50px rounded-circle w-50px">
                </div>
                <div>
                  <div class="fs-3 fw-bolder text-dark">${d.data.name}</div>
                  <div class="fs-9 text-dark">${d.data.position}</div>
                  <div class="fs-10 badge bg-gray-600 mt-2">${d.data.location}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-7"></div>
          </div>
          `;
        return card;
      })
      .render();
    try {
      const chartImage = await domtoimage.toPng(orgChartContainer);
      if (type === 'image') {
        // Save the chart image
        const link = document.createElement('a');
        link.href = chartImage;
        link.download = 'org-chart.png';
        link.click();
      } else if (type === 'pdf') {
        // const pdfWidth = 210; // Width of A4 in mm
        // const pdfHeight = (orgChartContainer.offsetHeight / orgChartContainer.offsetWidth) * pdfWidth;
        // const pdf = new jsPDF('l', 'mm', 'a4');
        // Add the chart image to the PDF
        // pdf.addImage(chartImage, 'PNG', 5, 5, pdfWidth - 10, pdfHeight - 10);
        // Save the PDF with a filename "org-chart.pdf"
        // pdf.save('org-chart.pdf');
      }
    } catch (error) {
      console.error('Error preloading images:', error);
    }
  }
  ngAfterViewInit() {
    if (!this.chart) {
      this.chart = new OrgChart()
    }
    this.updateChart();
    this.orgChartContainer = this.elementRef.nativeElement.querySelector('.svg-chart-container');
    this.orgChartContainer.style.width = '100%';
    this.orgChartContainer.style.height = 'calc(100vh - 175px)';
  }
  onFullScreen(): void {
    this.isFullScreen = !this.isFullScreen
    const orgChart = this.elementRef.nativeElement.querySelector('#org-chart');
    if (this.isFullScreen) {
      this.chart.fullscreen('#org-chart')
      this.appendSelect = '#org-chart'
      orgChart.classList.add('p-4', 'fullscreen-mode');
      this.orgChartContainer.style.height = 'calc(100vh - 100px)';
    } else {
      document.exitFullscreen();
      orgChart.classList.remove('p-4');
      this.appendSelect = 'body'
      this.orgChartContainer.style.height = 'calc(100vh - 310px)';
    }
  }
  onStyleChange(): void {
    this.chart.compact(!!(this.compact++ % 2)).render().fit()
  }
  filterDepartment(department) {

    if (department !== null) {
      const employess = cloneDeep(orgData);
      this.data = employess.filter(item => item.department === department);
      let nullParentIds = [];

      this.data.forEach(obj => {
        const parent = this.data.find(item => item.id === obj.parentId);
        if (!parent) {
          obj.parentId = null;
          nullParentIds.push(obj.id)
        }
      });
      if (nullParentIds.length > 1) {
        const rootNode = orgData.find(item => item.parentId === null);
        this.data = this.data.map(item => {
          if (item.parentId === null) {
            item.parentId = rootNode.id;
          }
          return item;
        });
        this.data.unshift(rootNode);
      }
      this.updateChart();
    }
  }
  onClearFilter() {
    this.data = [...orgData]
    this.updateChart();
  }
}
