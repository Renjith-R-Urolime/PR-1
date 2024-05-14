import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { cardMetaData } from './component-mapping-data';

@Component({
  selector: 'app-component-mapping',
  templateUrl: './component-mapping.component.html',
  styleUrls: ['./component-mapping.component.scss']
})
export class ComponentMappingComponent implements OnInit {
  view:string='table';
  cardJsonData = cardMetaData;

  theme: string = this.sharedService.getTheme();

  constructor(private sharedService:SharedService,private router: Router,private route:ActivatedRoute) { }

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
