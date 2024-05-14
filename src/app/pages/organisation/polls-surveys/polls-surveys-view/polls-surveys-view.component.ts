import { Component, ViewEncapsulation } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FieldConfig, Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { DataTable } from 'src/app/shared/ui/data-table-list/data-table-list';
// import { DetailsCardMeta } from 'src/app/shared/meta-interface';
import { DetailsCardMeta } from 'src/app/shared/meta-interface';
import { WizardTabs } from 'src/app/shared/ui/wizard-tabs/wizard-tabs';
import { detailsCardList, pollDetailsFormData, pollsFormSections, pollsWizardTabs } from '../polls-surveys.data';

@Component({
  selector: 'app-polls-surveys-view',
  templateUrl: './polls-surveys-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./polls-surveys-view.component.scss']
})
export class PollsSurveysViewComponent {
  detailsCardList: DetailsCardMeta[] = detailsCardList;

  tableData: DataTable;
  wizardData: WizardTabs = pollsWizardTabs;
  formData: FieldConfig = pollDetailsFormData;
  formSection: Sections = pollsFormSections;
  constructor(private sharedService: SharedService) { }

  //  ngOnInit() {
  //     this.sharedService.selectedTabLabel$.subscribe(response => {
  //       this.tableData = this.trapezoidTabsTable.find( item => item.tableName === response
  //     );
  //   })
  // }
}
