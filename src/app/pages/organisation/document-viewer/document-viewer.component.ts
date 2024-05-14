import { Component, OnInit, ViewEncapsulation } from '@angular/core';


import { PageFlip } from 'page-flip';




@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnInit {
  pageCount:any;
  currentPageIndex:any = 0;

  pageFlip: any;

  // @HostListener('document:mousemove', ['$event'])
  // mouse(e: MouseEvent): void {
  //   this.pageFlipNext();
  // }

  // @HostListener('document:mousemove', ['$event'])
  // mouse(e: MouseEvent): void {
  //   this.pageFlipNext();
  // }

  // bookData = {
  //   numPages: () => {
  //     /* return number of pages */
  //   },
  //   getPage: (num: number, cb: (pageData: any) => void) => {
  //     /* return page number 'num' in the callback 'cb' */
  //     /* as any CanvasImageSource */
  //   }
  // };

  // pdfUrl:any = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf'

  pageFlipPrev(): void {
     this.pageFlip.flipPrev();


    // if(this.pageFlip.getCurrentPageIndex()  !== 0) {
    // }

    this.currentPageIndex -= 1;

  }

  pageFlipNext(): void {
    this.pageFlip.flipNext();
    // if(this.currentPageIndex <= this.pageCount) {
    //   this.currentPageIndex -= 1;
    // }
    if(this.currentPageIndex < this.pageCount) {
      this.currentPageIndex += 1;

    }


  }

  ngOnInit(): void {
    this.pageFlip = new PageFlip(document.getElementById('book'), {
      width: 580,
      height: 500,
      showCover: true
    });

    this.pageFlip.loadFromImages([
      'https://images.pexels.com/photos/7171398/pexels-photo-7171398.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/10863290/pexels-photo-10863290.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2512281/pexels-photo-2512281.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/320014/pexels-photo-320014.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2682543/pexels-photo-2682543.jpeg?auto=compress&cs=tinysrgb&w=600'
    ]);

    this.pageFlipPrev();
    this.pageFlipNext();

    this.pageCount = this.pageFlip.getPageCount();
    this.currentPageIndex = this.pageFlip.getCurrentPageIndex();



    // pdf to image
    const options = {
      density: 100,
      saveFilename: "untitled",
      savePath: "./images",
      format: "png",
      width: 600,
      height: 600
    };


    // const storeAsImage = fromPath('https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf', options);
    const pageToConvertAsImage = 1;


    // storeAsImage(pageToConvertAsImage).then((resolve) => {
    //

    //   return resolve;
    // });

  }

}
