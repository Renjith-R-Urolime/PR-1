import { Component, ViewEncapsulation } from '@angular/core';
import { assignmentTaskFormData, assignmentTaskTableData, assignmentTaskformSections, assignmentTaskwizardTabs } from './assignment-task.data';

@Component({
  selector: 'app-assignment-and-task',
  templateUrl: './assignment-and-task.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./assignment-and-task.component.scss']
})
export class AssignmentAndTaskComponent {
  wizardData = assignmentTaskwizardTabs;
  formData = assignmentTaskFormData;
  formSection = assignmentTaskformSections;
  moduleTableData = assignmentTaskTableData

}
