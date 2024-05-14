import { ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SubSink } from 'subsink';
import { AdditionalOptionsDirective } from '../../directive/custom-template.directive';
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.service';
import { ManageEmpData } from '../manage-select-emp/manage-select-emp.data';

@Component({
  selector: 'search-and-filter',
  templateUrl: './search-and-filter.component.html',
  styleUrls: ['./search-and-filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SearchAndFilterComponent implements OnInit {
  private subs = new SubSink();
  gridIcon: string = './assets/media/icons/grid-outline.svg';
  tableIcon: string = './assets/media/icons/menu-outline.svg';
  searchText: string;
  templateType: string;
  isChecked$: boolean[] = [];
  checkedIndex: number;
  pinnedHeaders$ = [];
  headers$ = [];
  selectedOptionText: any[] = [];
  prevSelectedOption: string = '';
  isLoading: boolean;
  isIconClicked: boolean = false;
  private modalRef: NgbModalRef;
  @Input() filterButton: boolean = true;

  @Input() theme: string = this.sharedService.getTheme();
  @Input() Dropdown: boolean = false;
  @Output() searchEvent = new EventEmitter<string>();
  @Input() filterToggle: boolean;
  @Input() showExport: boolean;
  @Input() openUploadModal: boolean;
  @Input() tableData;
  @Input() headers: string[];

  @Input() view: string = 'table';
  @Input() manageData: ManageEmpData[];
  @Input() multipleViewOptions:boolean = false;
  @Input() importExportOption:boolean = false;
  @Output() viewSelected = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();
  @Output() exportTemplate = new EventEmitter<string>();
  @Output() exportDropdownTemplate = new EventEmitter<string>();
  @Output() importTemplate = new EventEmitter<string>();
  @Output() openImportModal: EventEmitter<string> = new EventEmitter<string>();

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

  exportTemplateSample() {
    this.exportTemplate.emit();
  }

  showExportDropdown() {
    this.showExport = true;
  }

  selectTemplateType (selectedExportType: string) {
    this.exportDropdownTemplate.emit(selectedExportType);
  }

  onOpenModal() {
    this.isIconClicked = !this.isIconClicked;
    this.openImportModal.emit();
  }

  importTemplateData(event) {
    this.importTemplate.emit(event)
  }

  closeModal() {
    this.cdRef.detectChanges();
    this.modalRef.close();
  }

  addChip(): void {
    if (this.selectedOptionText && !this.selectedOptionText.includes('')) {
      this.selectedOptionText.push(this.selectedOptionText[0]);
    }
  }

  removeChip(chip: string): void {
    const index = this.selectedOptionText.indexOf(chip);
    if (index !== -1) {
      this.selectedOptionText.splice(index, 1);
    }
  }

  memberUpdate(member: any) {
    if (this.selectedOptionText.includes(member.target.value)) {
      this.removeChip(member.target.value);
    }
    else {
      this.selectedOptionText.push(member.target.value);
    }
  }

  getNotificationStatus(event: any) {
    const index = this.selectedOptionText.indexOf(event.target.value);
    if (this.selectedOptionText.includes("Notification: On")) {
      this.selectedOptionText.splice(index, 1, "Notification: Off");
    }
    else if (this.selectedOptionText.includes("Notification: Off")) {
      this.selectedOptionText.splice(index, 1, "Notification: On");
    }
    else {
      this.selectedOptionText.push("Notification: On")
    }
  }

  logSelectedValue(event: any) {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target[selectedIndex];
    const selectedOptionText = selectedOption.text;
    this.removeChip(this.prevSelectedOption);
    this.prevSelectedOption = selectedOption.text;
    this.sharedService.setSelectedOptionText(selectedOptionText);
  }

  onDisable(col) {
    return this.pinnedHeaders$.includes(col);
  }

}



