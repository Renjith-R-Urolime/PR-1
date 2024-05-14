import { ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubSink } from 'subsink';
import { AdditionalOptionsDirective } from '../../directive/custom-template.directive';
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.service';
import { ManageEmpData } from '../manage-select-emp/manage-select-emp.data';
import { reportFilterMeta } from './reports-data';

@Component({
  selector: 'report-search-and-filter',
  templateUrl: './report-search-and-filter.component.html',
  styleUrls: ['./report-search-and-filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ReportSearchAndFilterComponent implements OnInit {
  private subs = new SubSink();
  gridIcon: string = './assets/media/icons/grid-outline.svg';
  tableIcon: string = './assets/media/icons/menu-outline.svg';
  searchText: string;
  isChecked$: boolean[] = [];
  checkedIndex: number;
  pinnedHeaders$ = [];
  headers$ = [];
  selectedOptionText: any[] = [];
  prevSelectedOption: string = '';
  isLoading: boolean;
  reportFilterMeta: any = reportFilterMeta


  @Input() filterButton: boolean = true;

  @Input() theme: string = this.sharedService.getTheme();
  @Input() Dropdown: boolean = false;
  @Output() searchEvent = new EventEmitter<string>();
  @Input() filterToggle: boolean;
  @Input() tableData;
  @Input() headers: string[];

  @Input() view: string = 'table';
  @Input() manageData: ManageEmpData[];
  @Input() multipleViewOptions:boolean = false;
  @Output() viewSelected = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  // Custom Templates
  @ContentChild(AdditionalOptionsDirective, { read: TemplateRef }) additionalOptions: TemplateRef<any>;


  constructor(private cdRef: ChangeDetectorRef, private sharedService: SharedService,private renderer: Renderer2, private el: ElementRef,private modalService: NgbModal,private apiService: ApiService, private router: Router, private route: ActivatedRoute) {

   }


  ngOnInit(): void {
    this.isLoading = true;
    // Check for 'info' parameter in the URL and set 'view' accordingly
    this.subs.add(
      this.route.queryParams.subscribe((params) => {
        if (params.view) {
          this.view = params.view;
        }
      }),
      this.sharedService.selectedOptionText$.subscribe(optionText => {
        if (!this.selectedOptionText.includes(optionText)) {
          this.selectedOptionText.push(optionText);
        }
      }),
      this.sharedService.pinnedHeader$.subscribe(data => {
        this.pinnedHeaders$ = data;
      }),
      this.sharedService.checkColumn$.subscribe(data => {
        this.isChecked$ = data;
      }),
      this.sharedService.headers$.subscribe(data => {
        this.headers$ = data
      }),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  applySearchFilter() {
    this.search.emit(this.searchText);
    this.sharedService.updateSearchText(this.searchText);
  }

  checked(index) {
    this.checkedIndex = index;
    this.sharedService.updateHideValue(index);
    this.filterToggle = !this.filterToggle;
    // this.isChecked[index]=!this.isChecked[index];
  }

  changeView(view:string){
    this.view=view;
    this.viewSelected.emit(this.view)
     // Update URL with the 'view' parameter
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { view: view },
      queryParamsHandling: 'merge',
    });
  }

  filteredData(event) {

    this.onSubmit.emit(event);
  }

}



