import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { SharedService } from '../services/shared.service';


@Directive({
  selector: '[appCustomTooltip]'
})
export class CustomTooltipDirective {

  theme: string = this.sharedService.getTheme();

  @Input('appCustomTooltip') tooltipTitle: string;

  @Input() delay: string = "500";
  @Input() backgroundColor: string; // Dynamic background color
  @Input() fieldHelp: string; // Dynamic field help text
  @Input() payrollSubsidiary: string; // Dynamic payroll subsidiary text
  @Input() dummyText: string; // Dynamic dummy text

  appCustomTooltip: HTMLElement;
  offset = 10;

  constructor(private sharedService: SharedService,
    private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.appCustomTooltip) { this.show(); }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.appCustomTooltip) { this.hide(); }
  }

  hideTimeout: any;



  show() {
    this.create();
    this.setPosition();
    this.renderer.addClass(this.appCustomTooltip, 'ng-tooltip-show');
  }

  hide() {
    if (this.appCustomTooltip) {
      this.appCustomTooltip.remove();
      this.appCustomTooltip = null;
    }
  }

  create() {
    this.appCustomTooltip = this.renderer.createElement('div');
    this.renderer.setStyle(this.appCustomTooltip, 'height', 'auto');
    this.renderer.setStyle(this.appCustomTooltip, 'width', '364px'); this.renderer.addClass(this.appCustomTooltip, 'tooltip');
    this.renderer.setAttribute(this.appCustomTooltip, 'data-toggle', 'tooltip');
    this.renderer.setAttribute(this.appCustomTooltip, 'data-placement', 'right');
    this.renderer.addClass(this.appCustomTooltip, `tooltip-${this.theme}-triangle-left`)

    // Second row div
    const secondRowDiv = this.renderer.createElement('div');
    this.renderer.addClass(secondRowDiv, `tooltip-${this.theme}`);

    this.renderer.setStyle(secondRowDiv, 'color', 'white');
    this.renderer.setStyle(secondRowDiv, 'font-size', '18px');
    this.renderer.setStyle(secondRowDiv, 'font-weight', '500');
    // this.renderer.setStyle(secondRowDiv, 'border-bottom-left-radius', '15px');
    this.renderer.setStyle(secondRowDiv, 'border-radius', '0.5rem');
    this.renderer.setStyle(secondRowDiv, 'text-align', 'left'); // Align content to the left
    this.renderer.setStyle(secondRowDiv, 'border', '1px solid #c4c3d0');

    // First div within second row
    const firstDiv = this.renderer.createElement('div');
    this.renderer.setStyle(firstDiv, 'font-size', '16px');
    this.renderer.setStyle(firstDiv, 'font-weight', '100');
    this.renderer.setStyle(firstDiv, 'color', 'white');
    this.renderer.setStyle(firstDiv, 'padding', '10px 10px 10px 10px');
    this.renderer.addClass(firstDiv, 'custom-tooltip-dummy-text');
    this.renderer.appendChild(firstDiv, this.renderer.createText(this.dummyText));

    const headers = ['Employee', 'Department', 'Salary'];


    const dummyData = [
      ['Marzook', 'HR', '50000',],
      ['Jane Smith', 'Finance', '60000'],


    ];

    const numColumns = headers.length;


    const tableElement = this.renderer.createElement('div');
    this.renderer.addClass(tableElement, 'custom-table');

    // Create the table header row
    const headerRow = this.renderer.createElement('tr');
    this.renderer.addClass(headerRow, 'header-row-container');

    // Create the table headers (Employee, Department, Location)
    headers.forEach((headerText, index) => {
      const th = this.renderer.createElement('th');
      this.renderer.addClass(th, 'headers-row-container');
      this.renderer.addClass(th, 'custom-th');
      this.renderer.setStyle(th, 'border-right', index < numColumns - 1 ? '1px solid black' : 'none');
      //this.renderer.setStyle(th, 'width', `${columnWidth}%`);
      this.renderer.setStyle(th, 'flex', '1');
      this.renderer.setStyle(th, 'padding-left', '4px');
      this.renderer.setStyle(th, 'text-align', 'left');
      this.renderer.appendChild(th, this.renderer.createText(headerText));
      this.renderer.appendChild(headerRow, th);
    });

    // Append the header row to the table
    this.renderer.appendChild(tableElement, headerRow);

    // ... your dummyData array and loop

    // Create the table rows for dummy data
    dummyData.forEach((rowData, rowIndex) => {
      const row = this.renderer.createElement('div');
      this.renderer.addClass(row, 'data-row-container');
      this.renderer.setStyle(row, 'display', 'flex')


      rowData.forEach((cellData, index) => {
        const cell = this.renderer.createElement('div');
        this.renderer.addClass(cell, 'custom-td');
        this.renderer.setStyle(cell, 'border-right', index < numColumns - 1 ? '1px solid black' : 'none');
        this.renderer.setStyle(cell, 'flex', '1');
        this.renderer.setStyle(cell, 'padding-left', '4px');
        this.renderer.setStyle(cell, 'text-align', 'left');
        this.renderer.setStyle(cell, 'font-size', '13px');
        this.renderer.appendChild(cell, this.renderer.createText(cellData));


        // Check if it's the first column (index 0) and add the image
        // if (index === 0) {
        //   const image = this.renderer.createElement('img');
        //   this.renderer.setAttribute(image, 'src', cellData); // Assuming cellData contains the URL of the image
        //   this.renderer.appendChild(cell, image);

        // } else {
        //   this.renderer.appendChild(cell, this.renderer.createText(cellData));
        // }
        this.renderer.appendChild(row, cell);
      });

      // Check if it's the last row and add a class to remove border-bottom
      if (rowIndex === dummyData.length - 1) {
        this.renderer.addClass(row, 'no-border-bottom');
      }

      this.renderer.appendChild(tableElement, row);
    });

    //  this.renderer.appendChild(thirdDiv, tableElement);

    //  table content ends


    //  table content starts - 2

    const tableElement1 = this.renderer.createElement('div');
    this.renderer.addClass(tableElement1, 'custom-table');

    // Create the table header row
    const headerRow1 = this.renderer.createElement('tr');
    this.renderer.addClass(headerRow1, 'header-row-container');

    // Create the table headers (Employee, Department, Location)
    headers.forEach((headerText, index) => {
      const th = this.renderer.createElement('th');
      this.renderer.addClass(th, 'headers-row-container');
      this.renderer.addClass(th, 'custom-th');
      this.renderer.setStyle(th, 'border-right', index < numColumns - 1 ? '1px solid black' : 'none');
      //this.renderer.setStyle(th, 'width', `${columnWidth}%`);
      this.renderer.setStyle(th, 'flex', '1');
      this.renderer.setStyle(th, 'padding-left', '4px');
      this.renderer.setStyle(th, 'text-align', 'left');
      this.renderer.appendChild(th, this.renderer.createText(headerText));
      this.renderer.appendChild(headerRow1, th);
    });

    // Append the header row to the table
    this.renderer.appendChild(tableElement1, headerRow1);

    // ... your dummyData array and loop

    // Create the table rows for dummy data
    dummyData.forEach((rowData, rowIndex) => {
      const row = this.renderer.createElement('div');
      this.renderer.addClass(row, 'data-row-container');
      this.renderer.setStyle(row, 'display', 'flex')


      rowData.forEach((cellData, index) => {
        const cell = this.renderer.createElement('div');
        this.renderer.addClass(cell, 'custom-td');
        this.renderer.setStyle(cell, 'border-right', index < numColumns - 1 ? '1px solid black' : 'none');
        this.renderer.setStyle(cell, 'flex', '1');
        this.renderer.setStyle(cell, 'padding-left', '4px');
        this.renderer.setStyle(cell, 'text-align', 'left');
        this.renderer.setStyle(cell, 'font-size', '13px');
        this.renderer.appendChild(cell, this.renderer.createText(cellData));
        this.renderer.appendChild(row, cell);
      });

      // Check if it's the last row and add a class to remove border-bottom
      if (rowIndex === dummyData.length - 1) {
        this.renderer.addClass(row, 'no-border-bottom');
      }

      this.renderer.appendChild(tableElement1, row);
    });

    //  this.renderer.appendChild(thirdDiv, tableElement);

    //  table content ends





    // Append the child divs to the secondRowDiv
    this.renderer.appendChild(secondRowDiv, firstDiv);

    //  this.renderer.appendChild(secondRowDiv, tableElement);
    // this.renderer.appendChild(secondRowDiv, tableElement1);




    // Append the child divs to the main tooltip div
    // this.renderer.appendChild(this.appCustomTooltip, firstRowDiv);
    this.renderer.appendChild(this.appCustomTooltip, secondRowDiv);

    // this.showFullText();
    this.showEllipsisText();

    // Append the appCustomTooltip to the document body
    this.renderer.appendChild(document.body, this.appCustomTooltip);

    // Handle the "Read More..." link hover event
    // this.renderer.listen(spanElementSecond, 'mouseenter', () => {
    //   this.showFullText();
    // });

    this.renderer.addClass(this.appCustomTooltip, 'ng-tooltip');
    // this.renderer.addClass(this.appCustomTooltip, `ng-tooltip-${this.placement}`);

    // delay
    this.renderer.setStyle(this.appCustomTooltip, '-webkit-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.appCustomTooltip, '-moz-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.appCustomTooltip, '-o-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.appCustomTooltip, 'transition', `opacity ${this.delay}ms`);

    // this.hideTimeout = window.setTimeout(() => {
    //   this.renderer.removeChild(document.body, this.appCustomTooltip);
    //   this.appCustomTooltip = null;
    // }, 2000);
  }

  // Method to show the full dummy text
  private showFullText() {
    const fieldDescription = this.appCustomTooltip.querySelector('.custom-tooltip-dummy-text') as HTMLElement;
    fieldDescription.textContent = this.dummyText;

    const spanElementSecond = this.appCustomTooltip.querySelector('.custom-tooltip-read-more-link') as HTMLElement;
    if (spanElementSecond) {
      this.renderer.setStyle(spanElementSecond, 'display', 'none');
    }
  }


  private showEllipsisText() {
    const fieldDescription = this.appCustomTooltip.querySelector('.custom-tooltip-dummy-text') as HTMLElement;

    const firstDiv = this.appCustomTooltip.querySelector('.custom-tooltip-read-more-link') as HTMLElement;
    if (firstDiv) {
      // Add ellipsis to the dummy text
      const ellipsisText = this.dummyText.slice(0, 100) + '...';
      fieldDescription.textContent = ellipsisText;

      // Calculate the height needed to display the full dummyText
    }
  }


  // Helper method to calculate the height of content within an element
  private getContentHeight(element: HTMLElement): number {
    const tempDiv = this.renderer.createElement('div');
    this.renderer.setStyle(tempDiv, 'position', 'absolute');
    this.renderer.setStyle(tempDiv, 'visibility', 'hidden');
    this.renderer.appendChild(tempDiv, this.renderer.createText(element.textContent || ''));
    this.renderer.appendChild(document.body, tempDiv);
    const height = tempDiv.offsetHeight;
    this.renderer.removeChild(document.body, tempDiv);

    return height;
  }



  setPosition() {
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.appCustomTooltip.getBoundingClientRect();
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const tooltipWidth = tooltipPos.width; // Get the width of the tooltip
    // Calculate the position for the tooltip
    const topPosition = `${hostPos.top - 7 + scrollPos}px`;
    const leftPosition = `${hostPos.left + hostPos.width + 10}px`;
    const rightPosition = `${hostPos.right + hostPos.width + 10}px`;

    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const tooltipRightPos = hostPos.left + hostPos.width + 10 + tooltipWidth; // Calculate the right position of the tooltip

    if (tooltipRightPos > viewportWidth) {
      // Tooltip overflows to the right

      const adjustedLeftPosition = `${hostPos.left - tooltipWidth - 10}px`; // Move tooltip to the left side
      this.renderer.setStyle(this.appCustomTooltip, 'left', adjustedLeftPosition);
      this.renderer.setStyle(this.appCustomTooltip, 'top', topPosition);
      this.renderer.removeClass(this.appCustomTooltip, `tooltip-${this.theme}-triangle-left`);
      this.renderer.addClass(this.appCustomTooltip, `tooltip-${this.theme}-triangle-right`);
    }
    else {
      this.renderer.setStyle(this.appCustomTooltip, 'top', topPosition);
      this.renderer.setStyle(this.appCustomTooltip, 'left', leftPosition);
    }
  }


}
