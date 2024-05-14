import { Component } from '@angular/core';
import { SlickFooterComponent } from '@slickgrid-universal/custom-footer-component'; // Import the custom footer component
import { AngularGridInstance, Column, GridOption, Grouping, GroupingGetterFunction } from 'angular-slickgrid';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { reportFilterMeta } from '../reports-data';

@Component({
  selector: 'app-headcount-grade-report',
  templateUrl: '../report-view/report-view.component.html',
  styleUrls: ['../report-view/report-view.component.scss']
})
export class HeadcountGradeReportComponent {
  theme: string = this.sharedService.getTheme()
  columnDefinitions: Column[];
  reportFilterMeta: any = reportFilterMeta
  filterCondition: any;
  view: string = 'table';
  angularGrid: any;
  gridOptions: GridOption;
  dataset: any;
  gridObj: any;
  dataviewObj: any;
  selectedGroup: any;
  selectedGroupingFields: Array<string | GroupingGetterFunction> = ['', '', ''];
  draggableGroupingPlugin: any;
  slickFooterComponent: SlickFooterComponent;
  aggregatingColumns = ['financial1', 'financial2', 'profit', 'loss']
  isLoading: boolean;
  detectedError: boolean;
  subsideryData: any;
  showSlickGrid: boolean;
  totalRow: any;
  monthsList: string[];
  errorResponse: any = {};
  rowsChangedSubscription: any;
  monthYearDataSet: any;
  constructor(private sharedService: SharedService, public apiService: ApiService) {
  }
  ngOnInit(): void {
    this.getSubsideryHeadCount(this.filterCondition);
  }

  ngOnDestroy() {
    if (this.rowsChangedSubscription) {
      this.rowsChangedSubscription.unsubscribe();
    }
  }

  prepareGrid() {
    const uniqueMonths = this.monthYearDataSet && this.monthYearDataSet.length > 0 ? this.getUniqueMonthsAndYears(this.monthYearDataSet) : this.getUniqueMonthsAndYears(this.dataset);
    const columnDefinitions = [];

    columnDefinitions.push({ id: 'grade', name: 'Grade', field: 'grade', headerCssClass: 'red-header' });
    uniqueMonths.forEach(monthYear => {
      const countId = `${monthYear.split(' ')[0].toLowerCase()}${monthYear.split(' ')[1]}Count`;
      const percentId = `${monthYear.split(' ')[0].toLowerCase()}${monthYear.split(' ')[1]}CountPercent`;

      columnDefinitions.push(
        { id: countId, name: `Count`, field: countId, headerCssClass: 'count-header', sortable: false },
        { id: percentId, name: `Count (%)`, field: percentId, headerCssClass: 'count-header', sortable: false }
      );
    });

    this.columnDefinitions = columnDefinitions;


    this.gridOptions = {
      enableGrouping: true,
      enableSorting: false,
      enableColumnReorder: false,
      showCustomFooter: false,
      createFooterRow: true,
      showFooterRow: true,
      alwaysShowVerticalScroll: false,
      footerRowHeight: 35,
      enableGridMenu: false,
      createPreHeaderPanel: true,
      showPreHeaderPanel: true,
      preHeaderPanelHeight: 70,
      enableAutoResize: true,
      autoResize: {
        container: 'grid-container',
      },
      draggableGrouping: {
        dropPlaceHolderText: 'Drop a column header here to group by the column',
        deleteIconCssClass: 'fa fa-times',
        onGroupChanged: (e, args) => this.onGroupChanged(args),
        onExtensionRegistered: (extension) => this.draggableGroupingPlugin = extension,
      },
      enablePagination: false,
      pagination: {
        pageSizes: [10, 20, 25, 50],
        pageSize: 10
      },
    };


  }

  onGroupChanged(change: { caller?: string; groupColumns: Grouping[]; }) {

    const caller = change && change.caller || [];
    const groups = change && change.groupColumns || [];

    if (Array.isArray(this.selectedGroupingFields) && Array.isArray(groups) && groups.length > 0) {
      this.selectedGroupingFields.forEach((g, i) => this.selectedGroupingFields[i] = groups[i] && groups[i].getter || '');
    } else if (groups.length === 0 && caller === 'remove-group') {
      this.clearGroupingSelects();
    }
  }

  clearGroupingSelects() {
    this.selectedGroupingFields.forEach((g, i) => this.selectedGroupingFields[i] = '');
  }

  angularGridReady(event: any) {
    this.angularGrid = event.detail as AngularGridInstance;
    this.gridObj = this.angularGrid?.slickGrid;
    this.dataviewObj = this.angularGrid?.dataView;
    this.gridObj?.onHeaderRowCellRendered.subscribe((e, args) => {
      if (args.column.id === 'someColumnId') {
        const preHeaderCell = document.createElement('div');
        preHeaderCell.classList.add('your-custom-class');
        preHeaderCell.textContent = 'Your Custom Header';
        args.node.appendChild(preHeaderCell);
      }

    });
    this.createGroupedHeaders()
    this.gridObj?.init();
    this.gridObj?.setPreHeaderPanelVisibility(true);
    this.calculateTotals();
    this.updateFooterRow();
    if (this.rowsChangedSubscription) {
      this.rowsChangedSubscription.unsubscribe();
    }

    this.rowsChangedSubscription = this.dataviewObj.onRowsChanged.subscribe(() => {
      this.recalculateAndRefreshFooter();
    });
  };

  recalculateAndRefreshFooter() {

    this.calculateTotals();
    this.updateFooterRow();
  }

  getSubsideryHeadCount(filterCondition) {

    this.isLoading = true;
    const queryString = !filterCondition ? '' : this.constructQueryString(filterCondition);

    this.apiService.get(`reports/grade/head-count?limit=max&${queryString}`).subscribe({
      next: (res: any) => {
        if (res && res.data) {
          this.dataset = this.processApiData(res.data);
          this.showSlickGrid = true;

          this.prepareGrid();
          this.angularGridReady({ detail: this.angularGrid });
        }
      },
      error: (error: any) => {
        this.detectedError = true;
        console.error("error detected", error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  calculateTotals() {
    const totals = {};
    if (this.dataset.length > 0) {
      this.dataset.forEach(row => {
        Object.keys(row).forEach(col => {
          if (!totals[col]) totals[col] = 0;
          if (col.includes("Percent")) {
            totals[col] = '100%';
          } else {
            totals[col] += Number(row[col]) || 0;
          }
        });
      });
    } else {
      this.monthYearDataSet.forEach(row => {
        Object.keys(row).forEach(col => {
          if (!totals[col]) totals[col] = 0;
          if (col.includes("Percent")) {
            totals[col] = '0%';
          } else {
            totals[col] += Number(row[col]) || 0;
          }
        });
      });
    }


    totals['grade'] = 'Total';

    this.totalRow = totals;

  }

  updateFooterRow() {
    const grid = this.angularGrid?.slickGrid;
    const columns = grid?.getColumns();
    columns.forEach(column => {
      const footerCell = grid?.getFooterRowColumn(column.id);
      if (footerCell) {
        footerCell.innerHTML = this.totalRow[column.field] || 0;
        if (column.id.includes('Percent')) {
          footerCell.innerHTML = '100%';
        }
      }
    });
  }

  createGroupedHeaders() {
    const preHeaderPanel = document.querySelector('.slick-preheader-panel');

    if (preHeaderPanel) {
      preHeaderPanel.innerHTML = '';

      const gradeHeaderDiv = document.createElement('div');
      gradeHeaderDiv.className = 'header-group common-report-header';
      gradeHeaderDiv.textContent = 'Grade';
      preHeaderPanel.appendChild(gradeHeaderDiv);

      const uniqueMonths = this.monthYearDataSet && this.monthYearDataSet.length > 0 ? this.getUniqueMonthsAndYears(this.monthYearDataSet) : this.getUniqueMonthsAndYears(this.dataset);

      uniqueMonths.forEach((monthYear, index) => {
        const monthHeaderGroupDiv = document.createElement('div');
        monthHeaderGroupDiv.className = 'header-group month-header-group';

        const monthHeaderDiv = document.createElement('div');
        monthHeaderDiv.className = 'month-header';
        monthHeaderDiv.textContent = monthYear;
        monthHeaderGroupDiv.appendChild(monthHeaderDiv);

        const subHeadersContainer = document.createElement('div');
        subHeadersContainer.className = 'sub-headers-container';

        const countHeaderDiv = document.createElement('div');
        countHeaderDiv.className = 'sub-header';
        countHeaderDiv.textContent = 'Count';
        if (index === 0) {
          countHeaderDiv.classList.add('first-count-header');
        }
        subHeadersContainer.appendChild(countHeaderDiv);

        const percentHeaderDiv = document.createElement('div');
        percentHeaderDiv.className = 'sub-header';
        percentHeaderDiv.textContent = 'Count (%)';
        subHeadersContainer.appendChild(percentHeaderDiv);

        monthHeaderGroupDiv.appendChild(subHeadersContainer);

        preHeaderPanel.appendChild(monthHeaderGroupDiv);
      });
    }
  }

  calculateTotalWidthForMonth(monthYear) {
    const monthYearKey = monthYear.toLowerCase().replace(/\s+/g, '');
    const countColumnId = `${monthYearKey}Count`;
    const countPercentColumnId = `${monthYearKey}CountPercent`;
    const countColumn = this.gridObj.getColumns().find(column => column.id === countColumnId);
    const countPercentColumn = this.gridObj.getColumns().find(column => column.id === countPercentColumnId);
    if (!countColumn || !countPercentColumn) {
      console.error(`Columns not found for monthYear: ${monthYear}`);
      return 0;
    }
    let totlaCount = countColumn.width + countPercentColumn.width;



      ;
    return totlaCount
  }

  processApiData(apiData: any[]) {
    const mockDataset: any[] = [];
    let id = 0;
    const uniqueMonthYears = new Set<string>();
    const monthYearsWithData = new Set<string>();

    const formatMonthYear = (monthYear: string): string => {
      const [month, year] = monthYear.split(' ');
      return `${month.toLowerCase()}${year}`;
    };

    this.monthYearDataSet = [];

    apiData.forEach(monthData => {
      uniqueMonthYears.add(monthData.monthYear);
      if (monthData.entries.length > 0) {
        monthYearsWithData.add(monthData.monthYear);
      }
    });

    if (monthYearsWithData.size === 0) {
      uniqueMonthYears.forEach(monthYear => {
        this.monthYearDataSet.push({
          monthYear: [monthYear],
        });
      });
    }
    apiData.forEach(monthData => {
      const monthYear: string = monthData.monthYear;
      monthData.entries.forEach((grade: any) => {
        let existingEntry = mockDataset.find(entry => entry.name === grade.name);
        if (!existingEntry) {
          existingEntry = {
            id: id++,
            grade: grade.name,
            monthYear: Array.from(uniqueMonthYears),
          };
          uniqueMonthYears.forEach(my => {
            const formattedMonthYear = formatMonthYear(my);
            existingEntry[`${formattedMonthYear}Count`] = 0;
            existingEntry[`${formattedMonthYear}CountPercent`] = '0%';
          });
          mockDataset.push(existingEntry);
        }
        const formattedMonthYear = formatMonthYear(monthYear);
        existingEntry[`${formattedMonthYear}Count`] = grade.count;
        existingEntry[`${formattedMonthYear}CountPercent`] = grade.percentage;
      });
    });

    const sortedEntries = mockDataset.sort((a, b) => {
      if (a.grade === 'No Grade') return 1;
      if (b.grade === 'No Grade') return -1;
      return 0;
    });

    return sortedEntries;
  }

  getUniqueMonthsAndYears(dataset: any[]): string[] {
    if (!Array.isArray(dataset)) {
      console.warn('Dataset is undefined or not an array');
      return [];
    }

    const monthYearSet = new Set<string>();

    dataset.forEach(data => {
      if (Array.isArray(data.monthYear)) {
        data.monthYear.forEach((my: string) => {
          if (typeof my === 'string') {
            monthYearSet.add(my);
          } else {
            console.warn('Unexpected monthYear format:', my);
          }
        });
      } else {
        console.warn('Unexpected data format, monthYear expected to be an array:', data);
      }
    });

    return Array.from(monthYearSet).filter(monthYear => monthYear !== '');
  }

  updateFooter() {
    if (this.angularGrid && this.angularGrid.slickGrid && this.angularGrid.gridService) {
      const grid = this.angularGrid.slickGrid;

      const footerRow = grid.getFooterRowColumn('grade');
      footerRow.innerHTML = '';

      const totalItemElement = document.createElement('div');
      totalItemElement.textContent = `Total Items: ${this.totalRow.grade}`;
      footerRow.appendChild(totalItemElement);

      grid.invalidateAllRows();
      grid.render();
    }
  }

  filteredData(event) {
    this.getSubsideryHeadCount(event);
  }

  constructQueryString(event) {
    this.filterCondition = {};
    event.forEach(item => {
      const [key, value] = item.split('=');
      const adjustedKey = key.endsWith('Id') ? key + 's' : key;
      this.filterCondition[adjustedKey] = encodeURIComponent(value);
    });

    let queryString = '';

    Object.keys(this.filterCondition).forEach(key => {
      if (!['fromDate', 'toDate', 'month'].includes(key) && this.filterCondition[key]) {
        queryString += `${key}=${this.filterCondition[key]}&`;
      }
    });

    if (this.filterCondition.fromDate) {
      queryString += `fromDate=${this.filterCondition.fromDate}&`;
    }
    if (this.filterCondition.toDate) {
      queryString += `toDate=${this.filterCondition.toDate}&`;
    }
    if (this.filterCondition.month) {
      queryString += `month=${this.filterCondition.month}&`;
    }

    queryString = queryString.slice(0, -1);


    return queryString;
  }

  downloadCSVFromData(data, fileName) {
    if (!data || data.length === 0) {
      this.errorResponse['message'] = 'No data to export';
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    const headers = Object.keys(data[0])
      .filter(key => key !== 'id' && key !== 'Total' && key !== 'monthYear');

    const formattedHeaders = headers.map(header => `"${this.formatHeader(header)}"`).join(',');
    csvContent += formattedHeaders + '\r\n';

    data.forEach(row => {
      const rowContent = headers.map(key => `"${row[key]}"`).join(',');
      csvContent += rowContent + '\r\n';
    });

    csvContent += '\r\n';

    const totalRowContent = headers.map(key => `"${this.totalRow[key] || ''}"`).join(',');
    csvContent += totalRowContent;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);

    link.click();
  }


  downloadExcelFromData(data, fileName) {
    if (!data || data.length === 0) {
      this.errorResponse['message'] = 'No data to export';
      return;
    }

    // const workbook = XLSX.utils.book_new();
    const headers = Object.keys(data[0])
      .filter(key => key !== 'id' && key !== 'Total' && key !== 'monthYear');

    const ws_data = [headers.map(header => this.formatHeader(header))];

    data.forEach(row => {
      const rowData = headers.map(key => row[key]);
      ws_data.push(rowData);
    });

    ws_data.push([]);

    const totalRowData = headers.map(key => this.totalRow[key] || '');
    ws_data.push(totalRowData);

    // const worksheet = XLSX.utils.aoa_to_sheet(ws_data);
    // XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    // XLSX.writeFile(workbook, fileName);
  }

  downloadReportCSV(): void {
    if (!this.dataset || this.dataset.length === 0) {
      this.errorResponse['message'] = 'No data to export';
      return;
    }
    this.downloadCSVFromData(this.dataset, 'grade-headcount-report.csv');
  }

  downloadReportExcel(): void {
    if (!this.dataset || this.dataset.length === 0) {
      this.errorResponse['message'] = 'No data to export';
      return;
    }
    // this.downloadExcelFromData(this.dataset, 'grade-headcount-report.xlsx');
  }

  formatHeader(header) {
    header = header.replace(/(\d+)/g, ' $1 ');
    header = header.replace(/([A-Z])/g, ' $1');

    return header.split(/\s+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  }
}
