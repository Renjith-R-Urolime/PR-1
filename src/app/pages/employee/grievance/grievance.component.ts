import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { grievanceFormData, grievanceformSections, grievancewizardTabs } from './grievance.data';


@Component({
  selector: 'app-grievance',
  templateUrl: './grievance.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./grievance.component.scss']
})
export class GrievanceComponent implements OnInit {
  Dropdown=false;
  filterToggle=false;
  componentTitle: string = 'Employees';
  gridIcon: string = './assets/media/icons/grid-outline.svg';
  tableIcon: string = './assets/media/icons/menu-outline.svg';
  view: string = 'card';
  employeeDetails: Array<any> = [];
  grievance: any = true

  wizardData = grievancewizardTabs;
  formData = grievanceFormData;
  formSection = grievanceformSections;
  constructor(private router: Router) { };


  ngOnInit() {
  }
}
