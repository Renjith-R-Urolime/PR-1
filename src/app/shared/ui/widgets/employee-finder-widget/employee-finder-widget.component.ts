import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-employee-finder-widget',
  templateUrl: './employee-finder-widget.component.html',
  styleUrls: ['./employee-finder-widget.component.scss']
})
export class EmployeeFinderWidgetComponent implements OnInit {
  theme: string = this.sharedService.getTheme();
constructor(private sharedService: SharedService,private cdRef: ChangeDetectorRef){
  this.setSize('lg');
}
  membersData = [
    {
      id: 1,
      name: 'Brad Jessica Simmons',
      technology:'HTML, JS, ReactJS',
      avatar: './assets/media/svg/avatars/001-boy.svg',
      department:'Application Development',
      deptInfo:'Web, UI/UX Design, ERP',
      designation: 'Applications Manager',
      joinDate:'Join date: 1/2/2015',
      status: 'Approved',
    },
    {
      id: 2,
      name: 'Jessie  Clarkson',
      technology:'C#, ASP.NET, MS SQL',
      avatar: './assets/media/svg/avatars/014-girl-7.svg',
      department:'Application Development',
      deptInfo:'Oracle, PR Suite, NetSuite',
      designation: 'NetSuite Developer',
      joinDate:'Join date: 2/3/2016',
      status: 'Approved',
    },
    {
      id: 3,
      name: 'Lebron Wayde Johnson',
      technology:'PHP, Laravel, VueJS',
      avatar: './assets/media/svg/avatars/043-boy-18.svg',
      department:'Human Resources',
      deptInfo:'',
      designation: 'Senior HR Co-ordinator',
      joinDate:'Join date: 3/4/2017',
      status: 'Approved',
    },
    {
      id: 4,
      technology:'Python, PostgreSQL, ReactJS',
      name: 'Natali Ivanka May',
      avatar: './assets/media/svg/avatars/018-girl-9.svg',
      department:'Application Development',
      deptInfo:'Mobile Development',
      designation: 'Application Developer',
      joinDate:'Join date: 5/6/2018',
      status: 'Approved',
    }
  ];
  size: string;
  sizeClass: string;
  isLoading: boolean;
ngOnInit(): void {
  this.isLoading = true;
  setTimeout(() => {
    this.isLoading = false;
    this.cdRef.detectChanges();
  }, 1000);



}


  setSize(size: string) {
    this.size = size;
    switch (size) {
      case 'sm':
        this.sizeClass = 'col-md-6';
        break;
      case 'md':
        this.sizeClass = 'col-md-8';
        break;
      case 'lg':
        this.sizeClass = 'col-md-12';
        break;
    }
  }
}
