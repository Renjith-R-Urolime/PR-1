import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { cardMetaData } from './pay-structure-data';

@Component({
  selector: 'app-pay-structure',
  templateUrl: './pay-structure.component.html',
  styleUrls: ['./pay-structure.component.scss']
})
export class PayStructureComponent implements OnInit {
  theme: string = this.sharedService.getTheme();
  view:string='table';
  cardJsonData = cardMetaData
  constructor(private route: ActivatedRoute,private router: Router,private sharedService:SharedService) { }


  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params.view) {
        this.view = params.view;
      }
    });
  }
  changeView(event){
    this.view=event;
  }
  goBack() {
    const fullRoute = this.getFullRoute(this.route.snapshot);

      this.router.navigate([fullRoute]);
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
