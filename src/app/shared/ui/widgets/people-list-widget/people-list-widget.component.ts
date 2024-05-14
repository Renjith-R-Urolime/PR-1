import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-people-list-widget',
  templateUrl: './people-list-widget.component.html',
  styleUrls: ['./people-list-widget.component.scss']
})
export class PeopleListWidgetComponent implements OnInit{
  @Input() cssClass: string = '';
  @Input() icon: boolean = false;
  @Input() stats: number = 357;
  @Input() description: string = 'Professionals';
  @Input() labelColor: string = 'dark';
  @Input() textColor: string = 'gray-300';
  items: Array<{ name: string; initials?: string; state?: string, src?: string }>;
  theme: string = this.sharedService.getTheme();
  isLoading: boolean = false;
  constructor(private sharedService: SharedService, private cdRef: ChangeDetectorRef) {    this.setSize('lg'); }
  size: string;
  sizeClass: string;


  setSize(size: string) {
    this.size = size;
    switch (size) {
      case 'sm':
        this.sizeClass = 'col-md-3';
        break;
      case 'md':
        this.sizeClass = 'col-md-5';
        break;
      case 'lg':
        this.sizeClass = 'col-md-12';
        break;
    }
  }
  ngOnInit(): void {

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.cdRef.detectChanges();
    }, 1000);
    this.items = [
      { name: 'Alan Warden', initials: 'A', state: 'warning' },
      { name: 'Michael Eberon', src: './assets/media/avatars/300-15.jpg' },
      { name: 'Susan Redwood', initials: 'S', state: 'primary' },
      { name: 'Melody Macy', src: './assets/media/avatars/300-15.jpg' },
      // { name: 'Perry Matthew', initials: 'P', state: 'danger' },
      // { name: 'Barry Walter', src: './assets/media/avatars/300-15.jpg' },
      // { name: 'Perry Matthew', initials: 'P', state: 'danger' },
      // { name: 'Barry Walter', src: './assets/media/avatars/300-15.jpg' },
      { name: 'Alan Warden', initials: '+49', state: 'warning' },
    ];
  }

}
