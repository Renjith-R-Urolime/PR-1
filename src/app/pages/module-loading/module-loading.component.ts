import { Component, OnInit } from '@angular/core';
import { InlineSVGModule } from 'ng-inline-svg-2';

@Component({
  selector: 'app-module-loading',
  templateUrl: './module-loading.component.html',
  standalone: true,
  imports: [InlineSVGModule ],
  styleUrls: ['./module-loading.component.scss']
})
export class ModuleLoadingComponent implements OnInit {

  currentImageIndex = 0;
  currentImage: string;

  constructor() { }

  ngOnInit() {
    this.changeImage();
  }

  changeImage() {
    const images = [
      '<img class="h-46px w-46px" src="./assets/media/icons/briefcase-outline.svg">',
      '<img class="h-46px w-46px" src="./assets/media/icons/people-outline.svg" >',
      '<img class="h-46px w-46px" src="./assets/media/icons/time-outline.svg" >',
      '<img class="h-46px w-46px" src="./assets/media/icons/calendar-outline.svg" >',
      '<img class="h-46px w-46px" src="./assets/media/icons/wallet-outline.svg" >',
      '<img class="h-46px w-46px" src="./assets/media/icons/settings-outline.svg" >',
      '<img class="h-46px w-46px" src="./assets/media/icons/person-outline.svg" >',
      '<img class="h-46px w-46px" src="./assets/media/icons/podium-outline.svg" >',
    ];

    this.currentImage = images[this.currentImageIndex];

    // Increment the image index, reset if reaching the end of the array
    this.currentImageIndex = (this.currentImageIndex + 1) % images.length;

    // Repeat the image change every 3 seconds
    setTimeout(() => {
      this.changeImage();
    }, 4000);
  }

}
