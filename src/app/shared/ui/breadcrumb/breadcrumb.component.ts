import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { capitalCase } from 'change-case-all';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit{
@Input() breadcrumbs:any;

constructor(private router: Router, private route: ActivatedRoute){}

ngOnInit(): void {
  const url = this.router.url.split('/');
  const lastPart = url[url.length - 1].toLowerCase();
  const secondLastPart = url[url.length - 2].toLowerCase();

  if (lastPart === 'create') {
    this.breadcrumbs = [capitalCase(lastPart)];
  }
  else if (secondLastPart === 'edit') {
    this.breadcrumbs = ['Modify'];
  }
  else if (secondLastPart === 'customise') {
    this.breadcrumbs = ['Customise'];
  }
  else if (secondLastPart === 'onboard') {
    this.breadcrumbs = ['Onboard'];
  }
  else if (secondLastPart === 'reports') {
    this.breadcrumbs = ['Reports'];
  }
  else{
    this.breadcrumbs = ['List'];
  }


}
goBack() {
  const urlSegments = this.router.url.split('/').map(segment => segment.toLowerCase());

  if (urlSegments.includes('create')) {
    this.router.navigate(['../'], { relativeTo: this.route });
  } else if (urlSegments.includes('edit')) {
    this.router.navigate(['../../'], { relativeTo: this.route });
  } else {
    this.router.navigate(['/dashboard']);
  }
}
}
