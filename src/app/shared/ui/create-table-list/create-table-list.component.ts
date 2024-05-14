import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from '../../services/shared.service';
import { WizardService } from '../../services/wizard.service';
import { CreateTable } from './create-table-list';

@Component({
  selector: 'app-create-table-list',
  templateUrl: './create-table-list.component.html',
  styleUrls: ['./create-table-list.component.scss']
})
export class CreateTableListComponent implements OnInit {
  stickyHeader: boolean = true;
  @Input() viewMode = false;
  date: Date = new Date();
  theme: string = this.sharedService.getTheme();
  selectedTabData: any;
  @Input() tableData: CreateTable[];
  myDateValue: Date;
  formArrayValue$: any = '';
  @Input() formArrayData: any;
  selectedFormData: any;
  private unsubscribe: Subscription[] = [];
  constructor(private cdRef: ChangeDetectorRef, private sharedService: SharedService, private router: Router, private formBuilder: FormBuilder, private wizardService: WizardService) {

  }

  basicForm: FormGroup;
  get formFields(): FormArray {
    return this.basicForm.get(this.selectedTabData.tableName) as FormArray;
  }

  addMore() {
    const items = this.basicForm.get(this.selectedTabData.tableName) as FormArray;
    items.push(this.generateFormControls(this.selectedTabData.headers));


  }

  addFormFields(tableName: string, headers, data?): void {

    const items = this.basicForm.get(tableName) as FormArray;
    items.push(this.generateFormControls(headers, data));
  }

  ngOnInit() {


    this.selectedTabData = this.tableData[0];
    //get form value
    const formSubscr = this.wizardService.formArrayValueSource$.subscribe((val) => {
      this.formArrayValue$ = val;
    });
    this.createForm();

    //slected trapezoid tab data
    this.sharedService.selectedTabLabel$.subscribe(response => {
      if (response) {
        this.selectedTabData = this.tableData.find(item => item.tableName === response
        );
        //this.selectedFormData = this.formArrayData.find(i => i )
      }

    })

    //update form value
    const formChangesSubscr = this.basicForm.valueChanges.subscribe((val) => {

      this.wizardService.updateFormArrayData(val);
    }
    );

    this.unsubscribe.push(formChangesSubscr, formSubscr);
  }

  createForm() {
    const formArrays = [];

    this.tableData.forEach(element => {
      const formArray = this.formBuilder.array([]);

      formArrays[element.tableName] = formArray;

      this.basicForm = this.formBuilder.group({
        ...formArrays,
      });

      if (JSON.stringify(this.formArrayValue$) !== '{}' && this.formArrayValue$ !== '') {
        for (var i = 0; i < this.formArrayValue$[element.tableName].length; i++) {
          this.addFormFields(element.tableName, element.headers, this.formArrayValue$[element.tableName][i]);
        }
      }
      else {
        this.addFormFields(element.tableName, element.headers);
      }

      /*  this.form = this.formBuilder.group({
         [element.tableName]: this.formBuilder.array([]),
       });
       this.addFormFields(element.tableName,element.headers); */
    });


  }
  generateFormControls(headers, data?): FormGroup {
    const group: any = {};
    if (data) {
      headers.forEach(header => {
        group[header.labelName.alias] = data[header.labelName.alias];

      });
    }
    else {
      headers.forEach(header => {
        group[header.labelName.alias] = '';

      });
    }


    return this.formBuilder.group(group);
  }
}
