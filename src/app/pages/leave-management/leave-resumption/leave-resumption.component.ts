import { Component, ViewEncapsulation } from '@angular/core';
import { FieldConfig, Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { DataTable } from 'src/app/shared/ui/data-table-list/data-table-list';
import { WizardTabs } from 'src/app/shared/ui/wizard-tabs/wizard-tabs';
import { tableMetaData,leaveAdjustmentCardMetaData } from './leave-resumption.data';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-leave-resumption',
  templateUrl: './leave-resumption.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./leave-resumption.component.scss']
})
export class LeaveResumptionComponent {
  view: string = 'table';
  theme: string = this.sharedService.getTheme();
  cardJsonData: any = leaveAdjustmentCardMetaData;
  tableMetaData: any = tableMetaData;
  currentURL: any;

  constructor(private route: ActivatedRoute, private sharedService: SharedService, private router: Router) { }
  
  changeView(event) {
    this.view = event;
  }

  }
