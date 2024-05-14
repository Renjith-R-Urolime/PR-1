import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgSelectModule } from "@ng-select/ng-select";
import { ChangeCasePipe } from "./change-case.pipe";
import { DataValuePipe } from "./data-value.pipe";
import { DateToJsonPipe } from './date-to-json.pipe';
import { DecimalFormatPipe } from "./decimal-format.pipe";
import { FileTypePipe } from './fileType.pipe';
import { MatchFilterPipe } from "./match-filter.pipe";
import { OrderByPipe } from "./order-by.pipe";
import { ParseFloatPipe } from './parse-float.pipe';
import { RenameValuePipe } from "./rename-value.pipe";
import { S3FileFetchPipe } from "./s3-file-fetch.pipe";
import { SanitizePipe } from "./sanitize.pipe";
import { SearchHighlightPipe } from './search-highlight.pipe';
import { SumPipe } from './sum.pipe';
import { TimeAgoPipe } from './time-ago.pipe';


@NgModule({
  imports:[
    CommonModule
  ],
  declarations: [
    S3FileFetchPipe,
    RenameValuePipe,
    ChangeCasePipe,
    DataValuePipe,
    MatchFilterPipe,
    OrderByPipe,
    DateToJsonPipe,
    DecimalFormatPipe,
    SanitizePipe,
    FileTypePipe,
    TimeAgoPipe,
    ParseFloatPipe,
      SumPipe,
      SearchHighlightPipe
   ],

  exports: [
    ChangeCasePipe,
    S3FileFetchPipe,
    DataValuePipe,
    NgSelectModule,
    MatchFilterPipe,
    RenameValuePipe,
    FileTypePipe,
    DateToJsonPipe,
    DecimalFormatPipe,
    OrderByPipe,
    SanitizePipe,
    DatePipe,
    TimeAgoPipe,
    ParseFloatPipe,
    SumPipe,
    SearchHighlightPipe
  ],
  providers: []
})
export class PipeModule { }
