import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from "@angular/core";

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: "[rowDrag]",
})
export class DraggableRowDirective {
  private currRow: HTMLElement | null = null;
  private dragElem: HTMLElement | null = null;
  private mouseDownX = 0;
  private mouseDownY = 0;
  private mouseX = 0;
  private mouseY = 0;
  private mouseDrag = false;
  private sourceIndex: number = -1;
  private targetIndex: number = -1;
  private mouseUpListener: () => void;
  @Output() reordertableListChange = new EventEmitter<{ updatedList: [], sourceIndex: number, targetIndex: number }>();

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener("mouseenter") onMouseEnter() {
    // Add the custom cursor class when hovering
    // this.renderer.addClass(this.el.nativeElement, 'custom-cursor');
    // Add the .draggable-table class to the table element
    const table = this.el.nativeElement.closest("table");
    if (table) {
      this.renderer.addClass(table, "draggable-table");
      this.renderer.addClass(table, "position-relative");
    }
  }

  @HostListener("mousemove", ["$event"])
  onMouseMove(event: MouseEvent): void {
    if (!this.mouseDrag) return;

    const coords = this.getMouseCoords(event);
    this.mouseX = coords.x - this.mouseDownX;
    this.mouseY = coords.y - this.mouseDownY;
    this.moveRow(this.mouseX, this.mouseY);
  }

  @HostListener("mouseup", ["$event"])
  onMouseUp(event: MouseEvent): void {
    if (!this.mouseDrag) return;

    this.currRow?.classList.remove("is-dragging");
    if (this.dragElem) {
      this.renderer.removeChild(this.el.nativeElement, this.dragElem);
    }

    this.dragElem = null;
    this.mouseDrag = false;
    if (this.mouseUpListener) {
      this.mouseUpListener(); // Invoke the function returned by renderer.listen
      this.mouseUpListener = null; // Reset the listener
    }

    // Trigger the event only on drop
    this.reordertableListChange.emit({
      updatedList: [],
      sourceIndex: this.sourceIndex,
      targetIndex: this.targetIndex,
    });

    // Reset the source and target indices
    this.sourceIndex = -1;
    this.targetIndex = -1;
  }

  @HostListener("mousedown", ["$event"])
  onMouseDown(event: MouseEvent): void {
    const handle = this.gethandleElement(event.target);

    if (handle) {
      this.currRow = handle.closest("tr") as HTMLElement;
      this.addDraggableRow(this.currRow);

      this.currRow.classList.add("is-dragging");
      const coords = this.getMouseCoords(event);
      this.mouseDownX = coords.x;
      this.mouseDownY = coords.y;
      this.mouseDrag = true;

      this.sourceIndex = Array.from(this.getRows()).indexOf(this.currRow);

      // Prevent text selection while dragging
      event.preventDefault();

      this.mouseUpListener = this.renderer.listen('document', 'mouseup', (mouseupEvent: MouseEvent) => {
        this.onMouseUp(mouseupEvent);
      });
    }
  }

  private gethandleElement(target: EventTarget | null): HTMLElement | null {
    if (!target) return null;

    // If the clicked target has the 'handle' attribute
    if ((target as HTMLElement).hasAttribute('handle')) {
      return target as HTMLElement;
    }

    // Check parent elements until the 'handle' attribute is found or the body element is reached
    let currentElement = target as HTMLElement | null;
    while (currentElement && currentElement !== document.body) {
      if (currentElement.hasAttribute('handle')) {
        return currentElement;
      }
      currentElement = currentElement.parentElement;
    }

    return null;
  }
  private addDraggableRow(target: HTMLElement): void {
    this.dragElem = target.cloneNode(true) as HTMLElement;
    this.dragElem.classList.add("draggable-table__drag");
    this.dragElem.style.height = this.getStyle(target, "height");
    this.dragElem.style.backgroundColor = this.getStyle(
      target,
      "backgroundColor"
    );

    //  get call style properties in the clone node
    for (let i = 0; i < target.children.length; i++) {
      const oldTD = target.children[i];
      const newTD = this.dragElem.children[i] as HTMLElement;
      const computedStyle = getComputedStyle(oldTD);
      newTD.style.width = computedStyle.width;
      newTD.style.height = computedStyle.height;
      newTD.style.margin = computedStyle.margin;
    }

    this.renderer.appendChild(this.el.nativeElement, this.dragElem);
    const tPos = target.getBoundingClientRect();
    const dPos = this.dragElem.getBoundingClientRect();

    this.dragElem.style.bottom = dPos.y - tPos.y - tPos.height + "px";
    // this.dragElem.style.left = "-1px";
  }

  private moveRow(x: number, y: number): void {
    if (!this.dragElem) return;

    this.dragElem.style.transform = `translate3d(0, ${y}px, 0)`;

    // Call the method to handle row swapping
    this.handleRowSwapping();
  }

  private handleRowSwapping(): void {
    const dPos = this.dragElem.getBoundingClientRect();
    const currStartY = dPos.y;
    const currEndY = currStartY + dPos.height;
    const rows = this.getRows();

    for (let i = 0; i < rows.length; i++) {
      const rowElem = rows[i] as HTMLElement;
      const rowSize = rowElem.getBoundingClientRect();
      const rowStartY = rowSize.y;
      const rowEndY = rowStartY + rowSize.height;

      if (
        this.currRow !== rowElem &&
        this.isIntersecting(currStartY, currEndY, rowStartY, rowEndY)
      ) {
        if (Math.abs(currStartY - rowStartY) < rowSize.height / 2) {
          this.swapRow(rowElem, i);
        }
      }
    }
  }

  private swapRow(rowElem: HTMLElement, index: number): void {
    const tbody = this.el.nativeElement.querySelector("tbody");
    const rowsArray = Array.from(tbody.children);
    if (index >= 0 && index < rowsArray.length) {
      // Find the index of the currently dragged row
      const currentIndex = rowsArray.indexOf(this.currRow);
      // Swap the rows in the DOM
      if (currentIndex !== -1) {
        this.targetIndex = index;
        // Remove the dragged row
        rowsArray.splice(currentIndex, 1);

        // Insert the dragged row at the target index
        rowsArray.splice(index, 0, this.currRow);

        // Update the table visually (optional)
        tbody.innerHTML = ""; // Clear the tbody
        rowsArray.forEach((row) => tbody.appendChild(row));
      }
    }

  }

  private getRows(): NodeListOf<Element> {
    return this.el.nativeElement.querySelectorAll("tbody tr");
  }

  private getMouseCoords(event: MouseEvent): { x: number; y: number } {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }

  private getStyle(target: HTMLElement, styleName: string): string {
    const compStyle = getComputedStyle(target);
    const style = compStyle.getPropertyValue(styleName);

    return style || "";
  }

  private isIntersecting(
    min0: number,
    max0: number,
    min1: number,
    max1: number
  ): boolean {
    return (
      Math.max(min0, max0) >= Math.min(min1, max1) &&
      Math.min(min0, max0) <= Math.max(min1, max1)
    );
  }
  ngOnDestroy(): void {
     // Ensure to unsubscribe when the directive is destroyed
    if (this.mouseUpListener) {
      this.mouseUpListener();
    }
  }
}
