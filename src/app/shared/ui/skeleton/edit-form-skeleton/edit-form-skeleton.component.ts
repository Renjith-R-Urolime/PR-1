import { Component, Input } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-edit-form-skeleton',
  templateUrl: './edit-form-skeleton.component.html',
  styleUrls: ['./edit-form-skeleton.component.scss']
})
export class EditFormSkeletonComponent {

  @Input() isLoading:boolean = false;

  constructor(private sharedService: SharedService ) {}

  theme: string = this.sharedService.getTheme();
  routeName: string; 

  ngOnInit() {
    this.isLoading = true;
    const baseApi = this.sharedService.getCurrentApi();
    this.routeName = baseApi.url.split('/')[2];
  
    // setTimeout(() => {
    //   this.isLoading = false;
    // }, 5000);

  }
    
}
