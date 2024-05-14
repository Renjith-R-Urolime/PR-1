import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-onboard-widget',
  templateUrl: './onboard-widget.component.html',
  styleUrls: ['./onboard-widget.component.scss']
})
export class OnBoardWidgetComponent implements OnInit {
  @Input() cssClass: string = '';
  @Input() size: string = '';
  @Input() description: string = '';
  @Input() color: string = '';
  @Input() img: string = '';
  sizeClass: string;

  constructor(private cdRef: ChangeDetectorRef) {
    // this.setSize('lg');
  }
  isLoading: boolean;

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.cdRef.detectChanges();
    }, 1000);}

  // setSize(size: string) {
  //   this.size = size;
  //   switch (size) {
  //     case 'sm':
  //       this.sizeClass = 'col-md-3';
  //       break;
  //     case 'md':
  //       this.sizeClass = 'col-md-5';
  //       break;
  //     case 'lg':
  //       this.sizeClass = 'col-md-12';
  //       break;
  //   }
  // }
}
