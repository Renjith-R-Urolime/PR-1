import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-shortcuts-widget',
  templateUrl: './shortcuts-widget.component.html',
  styleUrls: ['./shortcuts-widget.component.scss']
})
export class ShortcutsWidgetComponent  implements OnInit{
  theme: string = this.sharedService.getTheme();

  isLoading: boolean = false;
  constructor(private sharedService: SharedService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.cdRef.detectChanges();
    }, 1000);
  }

  shortcutsCardData= {
    "title": "My Shortcuts",
    "shortcuts": [
      {
        "text": "Employee Directory",
        "iconSrc": "./assets/media/svg/shortcut-1.svg"
      },
      {
        "text": "Next Payroll Date",
        "iconSrc": "./assets/media/svg/shortcut-2.svg"
      },
      {
        "text": "Onboarding",
        "iconSrc": "./assets/media/svg/shortcut-3.svg"
      },
      {
        "text": "Leave Request",
        "iconSrc": "./assets/media/svg/shortcut-4.svg"
      }
    ]
  }

}
