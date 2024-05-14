import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { warningsFormData, warningsWizardTabs, warningsformSections } from './warnings.data';

@Component({
  selector: 'app-warnings',
  templateUrl: './warnings.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./warnings.component.scss']
})
export class WarningsComponent implements OnInit {
  Dropdown=false;
  filterToggle=false;
  theme: string = this.sharedService.getTheme();
  componentTitle: string = 'Employees';
  gridIcon: string = './assets/media/icons/grid-outline.svg';
  tableIcon: string = './assets/media/icons/menu-outline.svg';
  view: string = 'card';
  employeeDetails: Array<any> = [];
  onBoard: any = true
  warnings: any = true


  wizardData = warningsWizardTabs;
  formData = warningsFormData;
  formSection = warningsformSections;
  constructor(private router: Router, private sharedService:SharedService) { };


  ngOnInit() {

    // warningDetails.forEach(warning => {
    //   let data = {
    //     from: warning.from,
    //     title: warning.title,
    //     date: warning.date,
    //     to: warning.to,
    //     description: warning.description,
    //     type: warning.type,

    //   }
    //   this.employeeDetails.push(data);
    //   this.employeeTableData.data.push({ "From": warning.from, "Title": warning.title, "Date": warning.date, "To": warning.to,  "Description": warning.description,  "Type": warning.type });
    // });

  }
}
