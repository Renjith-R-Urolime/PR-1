import { ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { cardMetaData, payrollItemList, payrollTypeList, tableMetaData } from './payroll-component-data';


@Component({
  selector: 'app-payroll-component',
  templateUrl: './payroll-component.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./payroll-component.component.scss']
})
export class PayrollComponentComponent implements OnInit {
  view:string='table';
  reordertableList = [];
  @Input() theme: string = this.sharedService.getTheme();
  apply:boolean=false;
  cardJsonData = cardMetaData;
  private modalRef: NgbModalRef;
  reorderData = [];
  swappedRows = [];
  reorderReqBody = [];
  isProcessing:boolean = false;
  isLoading: boolean;
  reorderTableHeaders = ["name","description","payrollItem","type"]
  reorder:boolean = false;
  listTableData$: Observable<any>;
  tableMetaData: any = tableMetaData;
  constructor(private apiService: ApiService,private sharedService: SharedService ,private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params.view) {
        this.view = params.view;
      }
    });
    //this.getComponentData();
  }

  changeView(event){
    this.view=event;
  }

  open(content) {
    this.isLoading = true;
    this.reordertableList = [];
    this.reorderData = [];
    this.swappedRows = [];
    this.reorderReqBody = [];
    this.apiService.get(`payroll/setup/component?limit=100`).subscribe({
      next:(res:any)=>{
        if (res) {
        //
          this.reordertableList = res.data;
          this.reordertableList.forEach(el => {
            const copiedElement = JSON.parse(JSON.stringify(el)); // Create a deep copy using JSON
            this.reorderData.push(copiedElement);
          });
          this.reordertableList.forEach(el => {
            const copiedData = JSON.parse(JSON.stringify(el)); // Create a deep copy using JSON
            this.swappedRows.push(copiedData);
          });
          this.isLoading = false;
          this.cdRef.detectChanges();
        }
      },error:(error:any)=>{

      }
    });
		this.modalRef = this.modalService.open(content, { size: 'xl', scrollable: true, windowClass: 'xl'});
	}
  showData(label,val){
    let res;
    if(label === "item"){
      const data = payrollItemList.filter(i => i.id ==  val)
      if(data != null && data != undefined && data){
        res = data[0]?.name;
      }
      else{
        res = val;
      }
    }
    else if(label === "type"){
      const data = payrollTypeList.filter(i => i.id ==  val)
      if(data != null && data != undefined && data){
        res = data[0]?.name;
      }
      else{
        res = val;
      }
    }
    else {
      res = val;
    }
    return res;
  }
  onDragStart(event: DragEvent, index: number) {
    event.dataTransfer!.setData('text/plain', index.toString());
    //this.draggedRowIndex = index;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, targetIndex: number) {
    event.preventDefault();
    const sourceIndex = parseInt(event.dataTransfer!.getData('text/plain'), 10);
    this.swapRows(sourceIndex, targetIndex);
  }

  swapRows(sourceIndex: number, targetIndex: number) {
    const sourceId = this.swappedRows[sourceIndex].id;

    const sourceSequenceNo = this.swappedRows[targetIndex].sequenceNo;
    const movedRow = this.swappedRows.splice(sourceIndex, 1)[0];
    this.swappedRows.splice(targetIndex, 0, movedRow);

    this.swappedRows[targetIndex].sequenceNo = sourceSequenceNo;

    this.reorderReqBody.push({
      "id":sourceId,
      "sequenceNo":parseInt(sourceSequenceNo)
    })

  }
  resetTable(){
    this.reordertableList = this.reorderData.concat();
    this.cdRef.detectChanges();
  }
  applyReorder(){
    this.isProcessing = true;
    // Compare the arrays and find updated rows
   /*  const updatedRows = this.swappedRows.filter(newData => {
      const previousData = this.reorderData.find(item => item.id === newData.id);
      return previousData && !isEqual(newData, previousData);
    });


    let data=[];
    updatedRows.forEach((el) => {
      data.push({
        "id":el.id,
        "sequenceNo":parseInt(el.sequenceNo)
      })
    }) */
     if(this.reorderReqBody){
      this.apiService.put(`payroll/setup/component/reorder`, this.reorderReqBody).subscribe({
        next:(res:any)=>{
          if (res) {

            this.reordertableList = [];
            this.reorderReqBody = [];
            this.isProcessing = false;
            let currentUrl = this.router.url;
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                this.router.navigate([currentUrl]);
            });
            this.modalRef.close();
          }

        },
        error:(error:any)=>{

          this.isProcessing = false;

        }
        });
    }

  }
  handleReorder(event: { updatedList: [], sourceIndex: number, targetIndex: number }): void {
    // Handle the updated list here

    this.swapRows(event.sourceIndex,event.targetIndex)
  }

}
