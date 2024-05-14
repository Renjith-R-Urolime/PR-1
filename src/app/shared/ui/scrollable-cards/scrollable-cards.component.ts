import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.service';
@Component({
  selector: 'app-scrollable-cards',
  templateUrl: './scrollable-cards.component.html',
  styleUrls: ['./scrollable-cards.component.scss']
})
export class ScrollableCardsComponent implements OnInit {
  private modalRef: NgbModalRef;
  @Input() isLoading: boolean = false;
  theme: string = this.sharedService.getTheme();
  @Input() metaData:any = [];
  formTemplateRef: TemplateRef<any>;
  isDrawerOpen: boolean;
  openOverViewTab: boolean;
  isOverViewFormSaveDisabled: boolean = true
  activeTemplateName: string;
  apiCardData: any;
  allowedCardsData: any;
  isEditable:boolean=true;
  drawerCardData: any = [];
  drawerCardData1: any[];
  selectedCards: any[] = [];
  constructor(private cdRef: ChangeDetectorRef,private sharedService:SharedService, private modalService: NgbModal, private apiService: ApiService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getQuickCardData();
  }

  getQuickCardData() {
    this.apiService.get(`dashboard/quick-cards`).subscribe({
      next: (res: any) => {
        if (res) {
          this.isLoading = false;
          this.apiCardData = res.data.map(item => {
            const matchedCard = this.metaData.find(card => card.id === item.id);
            if (matchedCard) {
              return {
                ...item,
                name: matchedCard.name,
                backgroundColor: matchedCard.backgroundColor,
                backgroundImage: matchedCard.backgroundImage,
              };
            } else {
              console.error("No matching card found for ID:", item.id);
              return item;
            }
          });
          // this.drawerCardData = res.allData.map(item => {
          //   const matchedCard = this.metaData.find(card => card.id === item.id);
          //   if (matchedCard) {
          //     return {
          //       ...item,
          //       backgroundImage: matchedCard.backgroundImage,
          //       backgroundColor: matchedCard.backgroundColor
          //     };
          //   } else {
          //     console.error("No matching card found for ID:", item.id);
          //     return item;
          //   }
          // });
        }
      }
    })
  }



  // getCheckboxStyles(num) {
  //   if (this.drawerCardData[num] && this.drawerCardData[num].selected === true) {
  //     return {
  //       'border-color': this.drawerCardData[num].backgroundColor,
  //       'background-color': this.drawerCardData[num].backgroundColor
  //     };
  //   } else {
  //     return {};
  //   }
  // }

  // getBordercolour(num) {
  //
  //   if (this.drawerCardData[num] && this.drawerCardData[num].selected === true) {
  //     const borderColor = this.drawerCardData[num].backgroundColor;
  //     return {
  //       'border': `2px solid ${borderColor}`
  //     };
  //   } else {
  //     return {
  //       'border': '2px solid #B5B5C3'
  //     };
  //   }
  // }

  getFormTemplate(template: TemplateRef<any>, name: string) {
    this.formTemplateRef = template;
    this.activeTemplateName = name;
    this.metaData.map(card => {
      const matchedCard = this.apiCardData.find(apiCard => {
        return apiCard.id === card.id;
      });
      if (matchedCard) {
        card.selected = true;
      }
    });

  }
  onDrawerSave(event) {
    this.isLoading = true;
    // Filter out the selected cards
    this.selectedCards = this.metaData.filter(card => card.selected);
    // Optionally, clear selection status for all cards
    this.metaData.forEach(card => card.selected = false);
    const postData = {
      quickCards: this.selectedCards.map(item => ({
        id: item.id,
        sequence: item.sequence
      }))
    };

    this.apiService.post(`dashboard/quick-cards`, postData).subscribe({
      next: (res: any) => {
        this.getQuickCardData()
      }
    })
  }

  toggleCardSelection(card: any) {
    if (card.selected) {
      this.selectedCards = card;
    } else {

      this.selectedCards = null;
    }
  }

  onDrawerCancel(event) { }
  // convertToTitleCase(str: string): string {
  //   return str.split('-')
  //     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  //     .join(' ');
  // }

}
