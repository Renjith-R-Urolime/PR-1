import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { cardMetaData, tableMetaData } from './employee-exit.data';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/services/api.service';
import { ModalComponent } from 'src/app/_metronic/partials';
import { Location } from '@angular/common';


@Component({
  selector: 'app-employee-exit',
  templateUrl: './employee-exit.component.html',
  styleUrls: ['./employee-exit.component.scss']
})
export class EmployeeExitComponent {
  id: number;
  view: string = 'table';
  cardJsonData = cardMetaData;
  tableMetaData: any = tableMetaData;
  private modalRef: NgbModalRef;

  theme: string = this.sharedService.getTheme();
  constructor(private sharedService: SharedService, private router: Router, private route: ActivatedRoute, private apiService: ApiService, private cdRef: ChangeDetectorRef, private modalService: NgbModal, private _location: Location) { }


  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params.view) {
        this.view = params.view;
        this.id=params['id']
      }
    });
  }
  changeView(event) {
    this.view = event;
  }

}









