import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { SharedService, } from 'src/app/shared/services/shared.service';
@Component({
  selector: 'app-class-card-view',
  templateUrl: './class-card-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./class-card-view.component.scss']
})
export class ClassCardViewComponent  implements OnInit{
  @Input() component:any;
  @Input() cardData$:Observable<any>;
  cardData:any;
  theme: string = this.sharedService.getTheme();

  constructor( private sharedService: SharedService){

  }
  convertCardData(data){
    return data.data.map(({logo,name,country,currency,website})=>({logo,name,country,currency,website}));

  }

  ngOnInit(): void {


    this.cardData$.pipe(
      tap(data=>{
        this.cardData=this.convertCardData(data);

        this.cardData.forEach(element => {


        });
      }),
      catchError(error=>{
        throw error;
      })
    ).subscribe();


  }
}