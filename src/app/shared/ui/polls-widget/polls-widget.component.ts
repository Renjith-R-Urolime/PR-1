import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-polls-widget',
  templateUrl: './polls-widget.component.html',
  styleUrls: ['./polls-widget.component.scss']
})
export class PollsWidgetComponent implements OnInit{
  items: any[] = [
    {
      name: 'Job Satisfaction',
      postedDate: 'Posted 1 day ago',
      src: './assets/media/avatars/300-15.jpg',
      state: 'success',
      borderColor: "#FC1777"
    },
    {
      name: 'Job Satisfaction',
      src: './assets/media/avatars/300-15.jpg',
      state: 'warning',
      postedDate: 'Posted 1 day ago',
      borderColor: "#FF8100"

    },
    {
      name: 'Rate Communication',
      src: './assets/media/avatars/300-15.jpg',
      state: 'warning',
      postedDate: 'Posted 1 day ago',
      borderColor: "#482084"

    },
    {
      name: 'Workload Management',
      // src: './assets/media/avatars/300-15.jpg',
      initials: '+19',
      state: 'warning',
      postedDate: 'Posted 1 day ago',
      borderColor: "#170C34"

    },
    {
      name: 'Data Management',
      initials: '+19',
      state: 'warning',
      postedDate: 'Posted 1 day ago',
      borderColor: "#FC1777"

    },
    {
      name: 'Employee Management',
      initials: '+19',
      state: 'warning',
      postedDate: 'Posted 1 day ago',
      borderColor: "#482084"

    },
    // {
    //   name: 'Mike Johnson',
    //   initials: 'MJ',
    //   state: 'danger',
    //   postedDate:'Posted 1 day ago',
    //   borderColor: "rgb(21, 204, 91)"

    // },
    // { name: 'Alan Warden',
    // initials: '+49',
    //  state: 'warning',
    //  postedDate:'Posted 1 day ago',
    //  borderColor: "#E4E6EF"

    //  },
    // Add more items as needed
  ];
  size: string;
  sizeClass: string;
  isLoading: boolean = false;
  constructor(private cdRef: ChangeDetectorRef) {
    this.setSize('lg');
  }
  ngOnInit(): void {

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.cdRef.detectChanges();
    }, 1000);
  }

  setSize(size: string) {
    this.size = size;
    switch (size) {
      case 'sm':
        this.sizeClass = 'col-md-4';
        break;
      case 'md':
        this.sizeClass = 'col-md-6';
        break;
      case 'lg':
        this.sizeClass = 'col-md-12';
        break;
    }
  }

}
