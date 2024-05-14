import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
// import { event } from 'jquery';

@Directive({
  selector: '[appOutsideClick]'
})
export class OutsideClickDirective {

  @Input() filterToggle: boolean;
  @Output() toggleFilter = new EventEmitter<boolean>(false);
  numberOfClicked: number = 0;


  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any): void {

    this.numberOfClicked += 1;

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);

    if (clickedInside) {

      this.filterToggle = true;
    }
    if(!clickedInside && !this.filterToggle){

      this.filterToggle=true;
      this.toggleFilter.emit(this.filterToggle);
    }
    if (!clickedInside && this.numberOfClicked > 1) {

      this.filterToggle = false;
      this.toggleFilter.emit(this.filterToggle);
    }
  }


  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent) {

    // this.filterToggle = false;
    // this.toggleFilter.emit(this.filterToggle);
  }
}
