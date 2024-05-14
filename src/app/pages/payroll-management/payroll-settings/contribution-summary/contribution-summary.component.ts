import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { cardMetaData, tableMetaData } from './contribution-summary.data';

@Component({
  selector: 'app-contribution-summary',
  templateUrl: './contribution-summary.component.html',
  styleUrls: ['./contribution-summary.component.scss']
})
export class ContributionSummaryComponent {
  view: string = 'table';
  cardJsonData: any = cardMetaData;
  tableMetaData: any = tableMetaData;
  empId: any;
  theme: string = this.sharedService.getTheme();
  currentURL: any;


  constructor(private route: ActivatedRoute, private sharedService: SharedService, private router: Router) { }


  changeView(event) {
    this.view = event;
  }
  open(type, id) {
    let temp = this.router.url.split('/');
    temp.splice(0,1);
    this.currentURL = temp.join('/');
    if (type === 'view') {

      this.router.navigate([this.currentURL, 'view', id]);
    }
  }

    getFullRoute(routeSnapshot: ActivatedRouteSnapshot): string {
      const segments: string[] = [];
      while (routeSnapshot) {
        segments.unshift(...routeSnapshot.url.map(segment => segment.toString()));
        routeSnapshot = routeSnapshot.parent;
      }

      // Remove the last segment
      segments.pop();

      return segments.join('/');
    }

}
