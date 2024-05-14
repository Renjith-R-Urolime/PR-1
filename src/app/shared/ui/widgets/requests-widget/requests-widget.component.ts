import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requests-widget',
  templateUrl: './requests-widget.component.html',
  styleUrls: ['./requests-widget.component.scss']
})
export class RequestsWidgetComponent implements OnInit{

  isLoading: boolean = false;
  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.cdRef.detectChanges();
    }, 1000);
  }
  requestCardData = {
    "cardTitle": "Time off Requests ",
    "tableData": [
      {
        "profileImage": "./assets/media/avatars/300-1.jpg",
        "backgroundColor": "#EEE5FF",
        "name": "John Doe",
        "position": "Web Developer",
        "date": "Jan 1 - Jan 31 (Professional)",
        "editLink": "#"
      },
      {
        "profileImage": "./assets/media/avatars/300-2.jpg",
        "backgroundColor": "#FFF4DE",
        "name": "Jane Smith",
        "position": "Graphic Designer",
        "date": "Feb 1 - Feb 28 (Freelance)",
        "editLink": "#"
      },
      {
        "profileImage": "./assets/media/avatars/300-3.jpg",
        "backgroundColor": "#C9F7F5",
        "name": "Michael Johnson",
        "position": "Software Engineer",
        "date": "Mar 1 - Mar 31 (Professional)",
        "editLink": "#"
      },
      {
        "profileImage": "./assets/media/avatars/300-4.jpg",
        "backgroundColor": "#FFE2E5",
        "name": "Emily Davis",
        "position": "UX Designer",
        "date": "Apr 1 - Apr 30 (Freelance)",
        "editLink": "#"
      },
      {
        "profileImage": "./assets/media/avatars/300-5.jpg",
        "backgroundColor": "#E1E9FF",
        "name": "David Wilson",
        "position": "Mobile App Developer",
        "date": "May 1 - May 31 (Professional)",
        "editLink": "#"
      }
    ]
  };
}
