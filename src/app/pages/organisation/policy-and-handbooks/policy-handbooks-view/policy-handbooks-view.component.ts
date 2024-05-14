import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
// import { PageFlip } from 'page-flip';
// import * as pdfjsLib from 'pdfjs-dist';


@Component({
  selector: 'app-policy-handbooks-view',
  templateUrl: './policy-handbooks-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./policy-handbooks-view.component.scss']
})
export class PolicyHandbooksViewComponent implements OnInit,AfterViewInit {

  pdfSrc = "http://localhost:5200/assets/media/pdf/sample.pdf";

  @ViewChild('pdfViewer') pdfViewer: ElementRef;
  pdf:any;
  pageFlip:any;
  bookContainer:any;
  audio = new Audio();
  bookUpdated: boolean = true;
  iframeStyle:any;

  constructor(private cdRef: ChangeDetectorRef) {
    this.audio.src = '/assets/media/sound/page-flip.mp3';
  }

  ngOnInit(): void {
    setTimeout(() => {
      var backBtn = document.getElementById('fb5-button-back')

      backBtn.remove()
    },5000)
    // this.bookContainer = document.getElementById('book');
    // this.pageFlip = new PageFlip(this.bookContainer, {
    //   width: 450, // required parameter - base page width
    //   height: 642, // required parameter - base page height
    // });

    // // Event listener for keyboard input
    // document.addEventListener('keydown', (event) => {
    //   if (event.key === 'ArrowLeft') {
    //     // Turn to the previous page
    //     this.pageFlip.flipPrev('top');
    //   } else if (event.key === 'ArrowRight') {
    //     // Turn to the next page
    //     this.pageFlip.flipNext('top');
    //   }
    //   setTimeout(() => {
    //     this.audio.play();
    //   },100)
    //   // this.getPages(this.pageFlip.getCurrentPageIndex() + 1)
    //
    // });
  }

  async ngAfterViewInit() {
    // const pdfPath = this.pdfSrc;
    // let pageIndex = 1
    // const pdfjs = await import('pdfjs-dist/build/pdf');
    // const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');
    // pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;


    // /// Load the PDF document
    // pdfjsLib.getDocument(pdfPath).promise.then((pdf) => {
    //   this.pdf = pdf;
    //   this.getPages(pdf.numPages)
    // });
}

getPages(noOfPages: number){

    for (let i = 1; i <= noOfPages; i++) {

      // Fetch the page
      this.pdf.getPage(i).then((page) => {
        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render the page on the canvas
        page.render({
          canvasContext: context,
          viewport: viewport
        }).promise.then(() => {
          // Append the canvas to a new .my-page element
          const pageContainer = document.createElement('div');
          pageContainer.className = 'my-page';
          pageContainer.appendChild(canvas);

          // Append the page container to the #book container
          this.bookContainer.appendChild(pageContainer);

          if( i === noOfPages -1){
              this.initPageFlip()
          }
        });
      });
    }
}

initPageFlip(): void {
    // Load the pages into the page flip
    this.pageFlip.loadFromHTML(this.bookContainer.querySelectorAll('.my-page'));
    this.bookUpdated = true
    // this.cdRef.detectChanges();

}

}



