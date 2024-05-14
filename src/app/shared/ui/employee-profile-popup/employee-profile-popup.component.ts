import { Component,Input } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-employee-profile-popup',
  templateUrl: './employee-profile-popup.component.html',
  styleUrls: ['./employee-profile-popup.component.scss']
})
export class EmployeeProfilePopupComponent {
  @Input() value:any;
  @Input() showEmployee: boolean = false;
  theme: string = this.sharedService.getTheme();
  
  constructor(public sharedService: SharedService){}
  

  ngOnInit(){
  console.log("In EmployeeProfilePopupComponent",this.value);
  }


}
