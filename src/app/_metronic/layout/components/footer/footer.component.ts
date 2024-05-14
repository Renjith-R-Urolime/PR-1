import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment';
import { LayoutService } from '../../core/layout.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  footerContainerCssClasses: string = '';
  isProduction: boolean = environment.production;
  appAngularVersion: string = environment.appVersion;
  theme: string = this.sharedService.getTheme();
  currentDateStr: string = new Date().getFullYear().toString();
  connectionSpeed: number | undefined;
  intervalId:any;

  constructor(private layout: LayoutService, private sharedService: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.startSpeedCheck();

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.theme = this.sharedService.getTheme();
      }
    });

    this.footerContainerCssClasses = this.layout.getStringCSSClasses('footerContainer');
  }
  startSpeedCheck(): void {
    this.intervalId = setInterval(() => {
      this.checkConnectionSpeed();
    }, 2000); // Check every 2 seconds
  }

  stopSpeedCheck(): void {
    clearInterval(this.intervalId);
  }

  checkConnectionSpeed(): void {
    if ((navigator as any).connection) {
      const connection = (navigator as any).connection;
      this.connectionSpeed = (connection.downlink + Math.random() * 0.99).toFixed(2);

    } else {
      this.stopSpeedCheck();

    }
  }

  ngOnDestroy(): void {
    this.stopSpeedCheck();
  }
}
