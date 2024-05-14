import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  KtdGridComponent,
  KtdGridLayout,
  ktdTrackById,
} from "@katoid/angular-grid-layout";
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/modules/auth";
import { ApiService } from "src/app/shared/services/api.service";
import { SharedService } from "src/app/shared/services/shared.service";
import { setSampleText } from "src/app/shared/store/app.actions";
import {
  QuickCardMeta,
  WidgetLayout,
  WidgetSizes,
  quickCardsMetaData,
} from "./dashboard";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  @ViewChild(KtdGridComponent, { static: true }) grid: KtdGridComponent;
  theme: string = this.sharedService.getTheme();
  @Input() cssClass: string = "";
  @Input() description: string = "";
  @Input() color: string = "";
  @Input() img: string = "";
  isLoading: boolean = false;
  initializeLayout: boolean = false;
  isCustomizable: boolean = false;
  isDraggable: boolean = false;
  isResizable: boolean = false;
  isEditable: boolean = false;
  cols: number = 12;
  toggleSizeMenuId: string = "";
  toggleSizeMenu: boolean = false;
  autoResize = true;
  rowHeight: number = 50;
  compactType: "vertical" | "horizontal" | null = "vertical";
  widgetLayout = WidgetLayout;
  widgetSizes = WidgetSizes;
  user: any = {};
  //3,4,6,8
  trackById = ktdTrackById;
  sample: string = "";
  resizeSubscription: Subscription;
  sampleStoreTestValue: any;
  quickCardsMeta: QuickCardMeta[] = quickCardsMetaData;
  data: any = {};
  constructor(
    private store: Store,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private authService: AuthService,
    private apiService: ApiService,
    private cdRef: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    console.log('ngOnInit');
    this.store.dispatch(
      setSampleText({ sampleText: this.sampleStoreTestValue })
    );
    this.initializeLayout = true;
    this.route.queryParams.subscribe((params) => {
      this.isDraggable = params["edit"];
      this.isCustomizable = params["edit"];
      //  this.isResizable = params['edit'];
      this.isEditable = params["edit"];
    });
    // USER DETAILS
    this.authService.getUserAttributes().then((attributes: any) => {
      for (let i = 0; i < attributes.length; i++) {
        if (attributes[i].getName() === "name") {
          this.user.name = attributes[i].getValue();
        }
        if (attributes[i].getName() === "email_verified") {
          this.user.verified = attributes[i].getValue();
        }
        if (attributes[i].getName() === "email") {
          this.user.email = attributes[i].getValue();
        }
      }
    });
  }

  toggleMenu(id) {
    console.log('toggleMenu');
    if (this.toggleSizeMenuId === id) {
      this.toggleSizeMenu = !this.toggleSizeMenu;
    } else {
      this.toggleSizeMenu = true;
    }
    this.toggleSizeMenuId = id;
  }

  onSizeChange(size) {
    console.log('onSizeChange');
    const widgetSize = this.widgetSizes.flatMap((widget) =>
      widget.id === this.toggleSizeMenuId ? [widget] : []
    );
    const itemId = 1;
    if (widgetSize.length > 0) {
      const changedProperties = widgetSize[0].sizes[size];
      let layout = [...this.widgetLayout];
      this.widgetLayout = this.calculateLayout(
        layout,
        this.toggleSizeMenuId,
        changedProperties
      );
    }
  }

  onDeleteWidget(id) {
    console.log('onDeleteWidget');
    const element = this.elementRef.nativeElement.querySelector(`#${id}`);
    if (element) {
      this.renderer.removeChild(element.parentNode, element);
    }
    let layout = [...this.widgetLayout];
    this.widgetLayout = this.calculateLayout(layout, id, null);
  }

  calculateLayout(
    layout: KtdGridLayout,
    itemId: string,
    changedProperties: any
  ) {
    console.log('calculateLayout');
    let currentY = 0;
    let currentX = 0;
    let itemFound = false;
    let indexToDelete = -1;
    for (let i = 0; i < layout.length; i++) {
      const item = layout[i];
      if (item.id === itemId) {
        if (changedProperties === null) {
          // Delete the item from the layout
          indexToDelete = i;
        } else {
          // Update the changed properties
          for (const prop in changedProperties) {
            item[prop] = changedProperties[prop];
          }
        }
        itemFound = true;
      }
      const itemWidth = item.w;
      if (indexToDelete !== -1 && i >= indexToDelete) {
        // Skip items after the deleted item
        continue;
      }
      if (currentX + itemWidth > this.cols) {
        currentX = 0;
        currentY += this.rowHeight;
      }
      item.x = currentX;
      item.y = currentY;
      currentX += itemWidth;
    }
    if (indexToDelete !== -1) {
      // Delete the item from the layout
      layout.splice(indexToDelete, 1);
      // Reset the layout calculation to start from the first item
      currentY = 0;
      currentX = 0;
      for (const item of layout) {
        const itemWidth = item.w;
        if (currentX + itemWidth > this.cols) {
          currentX = 0;
          currentY += this.rowHeight;
        }
        item.x = currentX;
        item.y = currentY;
        currentX += itemWidth;
      }
    } else if (!itemFound && changedProperties !== null) {
      // Add the item to the layout
      const newItem = {
        id: itemId,
        ...changedProperties,
        x: currentX,
        y: currentY,
      };
      layout.push(newItem);
      // Adjust the layout calculation to include the newly added item
      currentX += newItem.w;
      if (currentX > this.cols) {
        currentX = 0;
        currentY += this.rowHeight;
      }
    }
    return layout;
  }

  checkSizeName(size) {
    console.log('checkSizeName');
    const widgetSize = this.widgetSizes.filter(
      (item) => item.id === this.toggleSizeMenuId
    );
    const layout = this.widgetLayout.filter(
      (item) => item.id === this.toggleSizeMenuId
    );
    if (widgetSize.length > 0 && layout.length > 0) {
      return (
        widgetSize[0].sizes[size].w === layout[0].w &&
        widgetSize[0].sizes[size].h === layout[0].h
      );
    }
  }

}
