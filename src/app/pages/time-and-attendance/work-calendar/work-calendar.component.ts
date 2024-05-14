import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormMeta, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { CreateTable } from 'src/app/shared/ui/create-table-list/create-table-list';
import { DataTable } from 'src/app/shared/ui/data-table-list/data-table-list';
import { WizardTabs } from 'src/app/shared/ui/wizard-tabs/wizard-tabs';
import { calendarCardMetaData, createTableData, formSectionsList, tableMetaData, tabs, workCalendarFormData, workCalendarTableData, workCalendarwizardTabs } from './work-calendar.data';

@Component({
  selector: 'app-work-calendar',
  templateUrl: './work-calendar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./work-calendar.component.scss']
})
export class WorkCalendarComponent implements OnInit {
  trapizoid: boolean = true
  createTableData:CreateTable[]=createTableData;
  view:string='table';
  currentURL: string;
  tableMetaData: any = tableMetaData;

  constructor(private sharedService: SharedService,private router: Router) {this.currentURL = this.router.url }
  cardJsonData=calendarCardMetaData;
  wizardData: WizardTabs = workCalendarwizardTabs;
  formData: FormMeta = workCalendarFormData;
  formSection: Sections = formSectionsList;
  moduleTableData: DataTable = workCalendarTableData;
  trapezoidTabs: TrazepoidTabsMeta[]= tabs;
  ngOnInit() {
    //
  }

  changeView(event){
    this.view=event;
  }
  open(type, id) {
    this.sharedService.closeSideBar();
    this.currentURL = this.currentURL.split('?')[0];

    if (type === 'edit') {
      this.router.navigate([this.currentURL, 'edit', id]);
    }
    else if(type === 'view'){
      this.router.navigate([this.currentURL, 'view', id]);
    }
  }

  // open(event, id?){
  //   this.sharedService.closeSideBar();
  //   const currentURL = this.router.url.split('?')[0];
  //   this.router.navigate([currentURL, event, id ? id : null].filter(Boolean));
  // }
}
