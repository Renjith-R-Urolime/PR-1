import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

import { DetailsCardData, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { EncashmentFormMeta, detailsCardMeta, leaveTypeMeta, tabsMeta } from '../leave-setup.data';

@Component({
  selector: 'app-leave-setup-view',
  templateUrl: './leave-setup-view.component.html',
  styleUrls: ['./leave-setup-view.component.scss']
})
export class LeaveSetupViewComponent implements OnInit {
  @ViewChild('listContainer') listContainer!: ElementRef;
  formTemplateRef: TemplateRef<any>;
  activeTemplateName: string;
  theme: string = this.sharedService.getTheme();
  detailsCardData: DetailsCardData={
    meta: detailsCardMeta,
          data: []
  };
  encashmentFormMeta:any = EncashmentFormMeta;
  typeMeta:any = leaveTypeMeta;
  selectedTabData:any;
  selectedIndex = 0;
  applicabilityEncashmentData:any=[];
  applicabilityFullAndFinalData:any=[];
  leaveTabsMeta: TrazepoidTabsMeta[]= tabsMeta;
  showAllItems: boolean[] = [];

  constructor(private sharedService:SharedService) { }

  ngOnInit() {
/*     this.typeMeta.labels.forEach(() => {
      this.showAllItems.push(false);
  }); */
  }
  onTabClick(index){
    this.selectedIndex = index;
  }
  getFormTemplate(template: TemplateRef<any>, name: string, data) {
    this.formTemplateRef = template
    this.activeTemplateName = name

    this.selectedTabData = data?.leaveTypes[this.selectedIndex]
    this.selectedTabData?.leaveRule?.applicability?.forEach(element => {
      if(element.applicabilityType === 'encashment'){
        this.applicabilityEncashmentData = element
      }
      else{
        this.applicabilityFullAndFinalData = element
      }
    });
  }
  getSubsidiary(data){
    return data?.map(sub => sub?.name).join(', ');
  }

  onRouterNavigate(url: string, id: number): void {
    if (url) {
      const newTab = window.open('', '_blank');
      newTab.location.href = `${url}/view/${id}`;
    }
  }

  scrollLeft() {
    const scrollAmount = this.listContainer.nativeElement.scrollLeft - 400;
    this.listContainer.nativeElement.scrollTo({
        left: scrollAmount,
        behavior: 'smooth' // Enable smooth scrolling
    });
  }

  scrollRight() {
      const scrollAmount = this.listContainer.nativeElement.scrollLeft + 400;
      this.listContainer.nativeElement.scrollTo({
          left: scrollAmount,
          behavior: 'smooth' // Enable smooth scrolling
      });
  }
}
