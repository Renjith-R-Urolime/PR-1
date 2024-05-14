import { ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AdditionalViewTemplateDirective, CustomDetailsCardElementDirective } from '../../directive/custom-template.directive';
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.service';
@Component({
  selector: 'details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.scss']
})
export class DetailsCardComponent implements OnInit {
  isLoading: boolean = true;
  filteredItem: any;
  filteredData: any;
  isCardExpanded: boolean = true;
  modelName: string;
  rowLevel: number;
  empSelected: any;
  Array = Array
  showAllItems: boolean[] = [];

  @ContentChild(CustomDetailsCardElementDirective, { read: TemplateRef }) customElement: TemplateRef<any>;
  @ContentChild(AdditionalViewTemplateDirective, { read: TemplateRef }) viewTemplate: TemplateRef<any>;


  constructor(public sharedService: SharedService, private modalService: NgbModal, private cdRef: ChangeDetectorRef, private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }
  theme: string = this.sharedService.getTheme();
  showImage: boolean = false;
  apiLoaderSubscription: any;
  selectedTab = 1
  detailsCardLoader$: boolean = true
  @Input() detailsCardData: any = {};
  @Input() apiLink;
  @Input() inlineWithLabel:boolean=false;
  @Input() col:number=6;
  @Input() isEditBtn:boolean=false;
  @Input() fullHeight:boolean=false;
  @Input () data:any
  @Input () headingToHide:any
  @Output() detailsCardDataChange = new EventEmitter<any>();
  @Output() editEvent = new EventEmitter<void>();

  id;
  private modalRef: NgbModalRef;
  showEmployee: boolean = false;
  private unsubscribe: Subscription[] = [];
  private routeSub: Subscription | undefined;
  // @Input() detailsCardData: DetailsCardData;
  // @Input() detailsCardData$:Observable<DetailsCardData>;

  isCheckbox(detail: any): boolean {
    return detail.checkbox;
  }

  openDefaultMailBox(event,email){

    event.preventDefault();
    // Construct the mailto link
    const mailtoLink = `mailto:?subject=Email Subject&body=Test Email`;

    // Open the default mail client
    window.open(mailtoLink);
  }

  openEmployeeModal(modal) {
    this.modalRef = this.modalService.open(modal, {
      size: 'md', scrollable: false, windowClass: 'emp-settings-modal', backdrop: 'static'
    });
  }
//////////////Edit event/////////////////////////////////////////////
  emitEditEvent() {
    this.editEvent.emit();
}

  getRange(total: number): any[] {
    return Array(total).fill(0);
  }
  showAllValues: boolean[] = [];
  toggleShowAllValues(index: number) {


    this.showAllValues[index] = !this.showAllValues[index];


  }

  ngOnInit() {
  this.detailsCardData.meta[0].labels.forEach(() => {
      this.showAllItems.push(false);
  });
  // this.showAllValues = new Array(this.detailsCardData.meta[0].labels.length).fill(false);


    this.isLoading = true;
    const routeSub = this.route.params.subscribe(params => {
      // Access route parameters here
      this.id = params['id'];
    });
    this.unsubscribe.push(routeSub);
    this.getDetailedData();



  }

  getValueType(value: any): string {

    return typeof value;
  }

  openUrlInNewWindow(url: any): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  onRouterNavigate(url: string, id: number): void {
    if (url) {
      const newTab = window.open('', '_blank');
      newTab.location.href = `${url}/view/${id}`;
    }
  }

  onViewEmployee(id) {

    const newTab = window.open('', '_blank');
    newTab.location.href = `employee-hub/profiles/employee/view/${id}`;
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //
  //   if (changes.detailsCardData.currentValue !== undefined) {
  //     this.isLoading = false;
  //
  //
  //
  //   this.empSelected=this.detailsCardData.data.employee;
  //     this.cdRef.detectChanges();
  //   }
  // }
  checkFileExtension(fileName) {


    const fileExt = fileName.split('.').pop();
    if (['jpg', 'png', 'jpeg', 'svg'].includes(fileExt)) {
      return 'image'
    } else {
      return 'file'
    }
  }
///////////////////////////////////////////////////////

ngOnChanges(changes: SimpleChanges) {
  if (changes.data && !changes.data.firstChange) {

  this.ngOnInit()
  }
}


/////////////////////////////////////////////////////////
  async getDetailedData() {
    this.isLoading = true;
    if(this.data){
      this.detailsCardData.data = this.data;
      this.cdRef.detectChanges();
      this.isLoading = false;
    }
    else{
      let baseApi = await this.sharedService.getCurrentApi();
      if (baseApi) {
        this.sharedService.setBaseApi(baseApi.url);
        this.apiService.get(`${baseApi.url}/${this.id}`).subscribe({
          next: (res: any) => {
            if (res) {

              this.detailsCardData.data = res.data;
              this.detailsCardDataChange.emit(this.detailsCardData)

              this.cdRef.detectChanges();
              this.isLoading = false;
            }
          }, error: (error: any) => {

            console.error(error);
          }
        });
      }
    }


  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  getModifiedValue(originalValue: any): string {


    // Perform your modifications here
    let modifiedValue: string = originalValue;

    // Example: Remove decimal if it's .000
    if (typeof originalValue === 'string' && originalValue.endsWith('.000')) {
      modifiedValue = originalValue.slice(0, -4);
    }
    const formattedValue = Number(modifiedValue).toLocaleString('en');
    // Add more modifications as needed...

    return formattedValue;
  }
}