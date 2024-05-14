import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { attendanceCardMetaData, tableMetaData } from './attendance.data';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  theme: string = this.sharedService.getTheme();
  tableMetaData:any=tableMetaData;
  view:any='table';
  currentURL: any;
  cardJsonData: any = attendanceCardMetaData;

  constructor(private route: ActivatedRoute,private dynamicFormService: DynamicFormService, public sharedService: SharedService,private router: Router){}

  changeView(event) {
    this.view = event;
  }
  openView(type, id, empData?) {

    const currentURL = this.router.url.split('?')[0];

    if (type === 'edit') {
      this.router.navigate([currentURL, 'edit', id]);
    }
    if(type === 'view') {
      this.router.navigate([currentURL, 'view', id]);
    }
  }
 ngOnInit(): void {
  this.route.queryParams.subscribe((params) => {
    if (params.view) {
      this.view = params.view;
    }
  });
 }

}
