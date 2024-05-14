import { Component, OnInit, ViewEncapsulation,TemplateRef ,Input} from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { DataTable } from 'src/app/shared/ui/data-table-list/data-table-list';
import { DetailsCardData, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { detailsCardMeta,tabsMeta } from '../contract-master.data';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-contract-master-view',
  templateUrl: './contract-master-view.component.html',
  styleUrls: ['./contract-master-view.component.scss']
})
export class ContractMasterViewComponent {
  classificationApplicabilityData:any
  formTemplate:TemplateRef<any>
  headerText:string
id:any
  tableData: DataTable;
  detailsCardData: DetailsCardData  = {
    meta: detailsCardMeta,
    data: []
  };
  contractMasterTabsMeta: TrazepoidTabsMeta[] = tabsMeta;


  assignTemplate(headerText, formTemplate) {

    this.headerText = headerText;
    this.formTemplate = formTemplate;

  }


}
