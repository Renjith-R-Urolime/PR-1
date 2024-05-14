import { Component, ContentChild, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { menuReinitialization } from 'src/app/_metronic/kt/kt-helpers';
import { FormDrawerFooterTemplateDirective } from '../../directive/custom-template.directive';
import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'app-form-drawer',
  templateUrl: './form-drawer.component.html',
  styleUrls: ['./form-drawer.component.scss']
})
export class FormDrawerComponent implements OnInit {
  theme: string = this.sharedService.getTheme();
  @Input() drawerWidth = 550;
  @Input() customOnSave:Function;
  @Input() customClass: string = '';
  @Input() formTemplate: TemplateRef<any>;
  @Input() headerText: string;
  @Input() buttonDisable = false;
  @Input() viewMode = false;
  @Input() saveButtonText: string='Save';
  @Input() cancelButtonText: string='Cancel';
  @Input()responseFilterStyle: boolean=false
  @Input() drawerOpened: boolean=false;
  @Input() formDrawerId = '#kt_drawer_form_toggle'
  @Input() formDrawerCloseId = 'kt_drawer_form_close'
  @Input() isProcessing: boolean = false;

  @Output() isSaved:EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() isCanceled:EventEmitter<boolean> = new EventEmitter<boolean>(false);

  // Custom Template
  @ContentChild(FormDrawerFooterTemplateDirective, { read: TemplateRef }) footerTemplate: TemplateRef<any>;


  constructor(
  private sharedService: SharedService) { }

  ngOnInit(): void {
    //
    menuReinitialization()
  }

  onSave(){
    this.isSaved.emit(true)
          }
  onCancel(){
    this.isCanceled.emit(true)
          }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.buttonDisable) {
      const newValue = changes.buttonDisable.currentValue;
      const previousValue = changes.buttonDisable.previousValue;

    }
  }
}
