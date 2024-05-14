import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { cardMetaData } from './leave-setup.data';

@Component({
  selector: 'app-organisation',
  templateUrl: './leave-setup.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class LeaveSetupComponent implements OnInit {
  theme: string = this.sharedService.getTheme();
  view: string = 'card'
  cardJsonData:any = cardMetaData
  shades: string[] = ['','light', 'bright']
  pageSize: number = 8;
  collectionSize: number = 8;
  maxSize: number = 1;
  page: number = 1;
  isLoading: boolean = true;
  // cardMetaData: any;

  constructor(private apiService: ApiService,private sharedService: SharedService, private router: Router,private cdRef: ChangeDetectorRef, private route: ActivatedRoute) {

  }

  changeView(event){
    this.view=event;
  }
  ngOnInit() {
  //
  }
  getColor(): string {
    const colors = ['#ffc700', '#eadbff', '#45349c'];
    return colors[0];
  }
  getValidStatus(type){
    return type && !type.isDraft && (!type.leaveRule || !type.leaveRule.isDraft);
  }
  openView(type, id) {

    this.sharedService.closeSideBar();
    const currentURL = this.router.url.split('?')[0];

    this.router.navigate([currentURL, type, id]);
  }
}