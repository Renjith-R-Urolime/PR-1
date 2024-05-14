import { Component, ViewEncapsulation } from '@angular/core';
import { DetailsCardMeta, FormMeta } from 'src/app/shared/meta-interface';
import { FieldConfig, Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { DataTable } from 'src/app/shared/ui/data-table-list/data-table-list';
import { WizardTabs } from 'src/app/shared/ui/wizard-tabs/wizard-tabs';
import { assignmentTaskFormData, assignmentTaskformSections, assignmentTaskwizardTabs, detailsCardList } from '../assignment-task.data';

@Component({
  selector: 'app-assignment-and-task-view',
  templateUrl: './assignment-and-task-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./assignment-and-task-view.component.scss']
})
export class AssignmentAndTaskViewComponent {
  detailsCardList: DetailsCardMeta[] = detailsCardList;
  // trapezoidTabs: TrazepoidTabsMeta= tabs;
  // trapezoidTabsTable: DataTable[] = trapezoidTabTableData;
  tableData: DataTable;
  wizardData: WizardTabs = assignmentTaskwizardTabs;
  formData: FormMeta[] =assignmentTaskFormData;
  formSection: Sections = assignmentTaskformSections;
}
