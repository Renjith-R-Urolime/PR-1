import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { contributionregisterCardMetaData, tableMetaData } from './contribution-register.data';

@Component({
  selector: 'app-contribution-register',
  templateUrl: './contribution-register.component.html',
  styleUrls: ['./contribution-register.component.scss']
})
export class ContributionRegisterComponent implements OnInit {
  view: string = 'table';
  cardJsonData: any = contributionregisterCardMetaData;
  tableMetaData: any = tableMetaData;
  empId: any;
  theme: string = this.sharedService.getTheme();
  employee: any;
  currentURL: any;

  constructor(private route: ActivatedRoute, private sharedService: SharedService, private router: Router) { }

  changeView(event) {
    this.view = event;
  }

  open(event, id?){
    let currentURL = this.router.url.split('?')[0];
    let tempURL = currentURL.split('/');
    tempURL.pop();

    currentURL=tempURL.join('/');

    this.router.navigate([currentURL, event, id ? id : null].filter(Boolean));
  }

  openView(type, id, empData?) {

    let currentURL = this.router.url.split('?')[0];
    let tempURL = currentURL.split('/');
    tempURL.pop();

    currentURL=tempURL.join('/');


    if (type === 'edit') {
      this.router.navigate([currentURL, 'edit', id]);
    }
    if(type === 'view') {
      this.router.navigate([currentURL, 'view', id]);
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.empId = params['empid'];

      tableMetaData['pathId'] = this.empId;

    });
  }
}
