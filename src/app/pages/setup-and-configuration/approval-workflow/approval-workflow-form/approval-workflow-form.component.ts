import { ChangeDetectorRef, Component, NgZone, TemplateRef,Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbDateParserFormatter, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/services/api.service';
import { DynamicFormService } from 'src/app/shared/services/dynamic-form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Sections } from 'src/app/shared/ui/basic-form/basic-form';
import { classificationApplicabilityFormMeta, approvalWorkflowFormData, formSections } from '../approval-workflow.data';
@Component({
  selector: 'app-approval-workflow-form',
  templateUrl: './approval-workflow-form.component.html',
  styleUrls: ['./approval-workflow-form.component.scss']
})
export class ApprovalWorkflowFormComponent {
  theme: string = this.sharedService.getTheme();

  saveButtonDisable: boolean = false
  detectedError: boolean = false;
  isLoading: boolean = false;
  formTemplate: TemplateRef<any>;
  headerText: string
  classificationApplicabilityFormData: any = classificationApplicabilityFormMeta
  formSections: Sections = formSections;
  formData: any = approvalWorkflowFormData;
  classificationApplicabilityForm: FormGroup;
  approvalForm:FormGroup
  coutryFetchCondition: any
  subsidiaryFilter: string[] = [];
  @Input() tabsMeta = [
    { label: "Level 1", tabIndex: 0 },
    { label: "Level 2", tabIndex: 1 },
    { label: "Level 3", tabIndex: 2 },
  ]
  constructor(private zone: NgZone, private cdr: ChangeDetectorRef, public sharedService: SharedService, private fb: FormBuilder, private ngbFormatter: NgbDateParserFormatter, private dynamicFormService: DynamicFormService, private route: ActivatedRoute, public apiService: ApiService, private modalService: NgbModal, private cdRef: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
    this.approvalForm = this.dynamicFormService.createControl(this.formData);
    this.classificationApplicabilityForm = this.dynamicFormService.createControl(this.classificationApplicabilityFormData)

  }



  getFormTemplate(template: TemplateRef<any>, headerText: string, name: string) {
    this.headerText = headerText;
    this.formTemplate = template;
  }




  onDrawerSave(event){

  }

  onDrawerCancel(event){
    
  }

  onCountryChange(event) {
    console.log(event,'event pls ');
    if(event){
      this.coutryFetchCondition = [`country=${event.id}`]
    }
    else{
      this.coutryFetchCondition = []   
    }
    this.cdRef.detectChanges();

  }


  onSubsidiaryChange(event) {

    if (this.classificationApplicabilityForm.value?.subsidiary !== 'ALL' && event.length > 0) {


      this.subsidiaryFilter = [`subsidiary=${event.map(item => item.id).join(',')}`];
    } else {
      this.subsidiaryFilter = []
    }
  }







}
