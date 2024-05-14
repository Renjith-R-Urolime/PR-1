import { ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { CardBodyTemplateDirective, CardButtonTemplateDirective, CardFooterTemplateDirective, CardHeaderTemplateDirective, DataCellTemplateDirective } from '../../directive/custom-template.directive';

@Component({
  selector: 'app-card-view-list',
  templateUrl: './card-view-list.component.html',
  styleUrls: ['./card-view-list.component.scss']
})
export class CardViewListComponent implements OnInit {
  @Input() component: any;
  @Input() cardDataInput: any;
  @Input() cardMetaData: any;
  @Input() cardData$: Observable<any>;
  @Input() cardData: any;
  @ContentChild(CardHeaderTemplateDirective, { read: TemplateRef }) customHeaderTemplate: TemplateRef<any>;
  @ContentChild(CardBodyTemplateDirective, { read: TemplateRef }) customBodyTemplate: TemplateRef<any>;
  @ContentChild(CardFooterTemplateDirective, { read: TemplateRef }) customFooterTemplate: TemplateRef<any>;
  @ContentChild(CardButtonTemplateDirective, { read: TemplateRef }) customButtonTemplate: TemplateRef<any>;
  @ContentChild(DataCellTemplateDirective, { read: TemplateRef }) dataCellTemplate: TemplateRef<any>;
  isLoading: boolean = true;
  currentUrl: string = '';
  fullUrl: string = '';
  page: number = 1;
  selectedValue = 1;
  pageSize: number = 8;
  collectionSize: number = 8;
  maxSize: number = 1;
  skeletonLoaderSize: any;
  filterText: string = '';
  btnToggle: boolean = false;
  btnToggleId: number;
  shades: string[] = ['', 'light', 'bright'];
  id;
  @Output() pageChange: EventEmitter<any> = new EventEmitter();
  @Output() sizeChange: EventEmitter<any> = new EventEmitter();
  theme: string = this.sharedService.getTheme();
  subLink: any;
  routeSub: Subscription | undefined;

  constructor(
    private sharedService: SharedService,
    private apiService: ApiService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  hovered = false;

  ngOnInit(): void {

    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.cardData = {
      meta: this.cardMetaData,
      data: []
    };

    if (this.router.url.split('/')[2]) {
      this.fullUrl = this.router.url.split('/')[2]; // Assuming this gives you "subsidiary?view=card"
    }
    else {
      this.fullUrl = this.router.url.split('/')[1];
    }
    this.currentUrl = this.fullUrl.split('?')[0];


    this.route.params.subscribe(params => {

      this.subLink = params['sub'];
    });
    this.fetchData();
    this.cdRef.detectChanges();
    this.skeletonLoaderSize = Array.from(Array(this.pageSize).keys());


  }

  openView(type, id, empData?) {

    this.sharedService.closeSideBar();
    const currentURL = this.router.url.split('?')[0];

    if (type === 'edit') {
      this.router.navigate([currentURL, 'edit', id]);
    }
    if(type === 'view') {
      this.router.navigate([currentURL, 'view', id]);
    }
  }

  onPageChange(event) {
    this.isLoading = true;
    this.cdRef.detectChanges();
    this.pageChange.emit(event);
    this.fetchData();
  }

  onBtnToggle(id) {
    this.btnToggleId = id;
    this.btnToggle = !this.btnToggle
  }

  onEntryChange() {
    this.isLoading = true;
    this.cdRef.detectChanges();
    const noOfPages = Math.ceil(this.collectionSize / this.pageSize);
    if (this.page > noOfPages) {
      this.page = noOfPages;
      this.pageChange.emit(this.page);
    }
    this.page = 1;
    this.fetchData();
    this.sizeChange.emit(this.pageSize);
  }

  fetchData() {

    const baseApi = this.sharedService.getCurrentApi();

    const apiUrl = `${baseApi?.url}${this.subLink ? '/' + this.subLink : ''}?${this.page ? 'page=' + this.page : ''}${this.pageSize ? '&limit=' + this.pageSize : ''
      }${ this.cardData.meta?.queryParams ? `&${this.cardData.meta.queryParams}=` + this.id : ''}`;


    this.apiService.get(apiUrl,baseApi.scope ? baseApi.scope : '' ).subscribe({
      next: (res: any) => {
        this.cardData.data = res.data;
        this.collectionSize = res.count;
      },
      error: (error: any) => {
        this.cardData.data = [];
        this.collectionSize = 0;
        this.isLoading = false;
        console.error('Error while fetching data:', error);
      },
      complete: () => {
        this.isLoading = false;
      },
    })
  }

  getColor(): string {
    const colors = ['#ffc700', '#eadbff', '#45349c'];
    return colors[0];
  }
  getValidStatus(type) {
    return type && !type.isDraft && (!type.leaveRule || !type.leaveRule.isDraft);
  }
  openUrlInNewWindow(url: any): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
