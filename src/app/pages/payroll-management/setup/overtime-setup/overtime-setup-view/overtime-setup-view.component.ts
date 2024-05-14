import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DetailsCardData, TrazepoidTabsMeta } from 'src/app/shared/meta-interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { DataTable } from 'src/app/shared/ui/data-table-list/data-table-list';
import { detailsCardMeta, tabsMeta } from '../overtime-setup.data';

@Component({
    selector: 'app-overtime-setup-view',
    templateUrl: './overtime-setup-view.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./overtime-setup-view.component.scss']
})
export class OvertimeSetupViewComponent implements OnInit {
    classificationApplicabilityData: any
    formTemplate: TemplateRef<any>
    headerText: string
    defineRangeData: any
    private modalRef: NgbModalRef;
    overtimeSetupData: any
    id: any
    tableData: DataTable;
    formattedExpression: any = ''

    originalLabelsData: any;
    detailsCardData: DetailsCardData = {
        meta: detailsCardMeta,
        data: []
    };
    overtimeSetupTabsMeta: TrazepoidTabsMeta[] = tabsMeta;
    availableVariables: any[] = [
        { name: 'OT Hour', value: '$otHour' },
        { name: 'OT Rate', value: '$otRate' },
        { name: 'OT Ratio', value: '$otRatio' },
        { name: 'Per hour Salary', value: '$perHourSalary' },
        { name: 'Per Day Salary', value: '$perDay' },
    ];

    constructor(private sharedService: SharedService, public apiService: ApiService, private route: ActivatedRoute, private modalService: NgbModal) { }
    ngOnInit() {


        this.route.params.subscribe(params => {
            // Access route parameters here
            this.id = params['id'];
        });
        this.originalLabelsData = JSON.parse(JSON.stringify(detailsCardMeta[0].labels));

        this.apiService.get(`payroll/setup/overtime-setup/${this.id}`).subscribe({
            next: (res: any) => {
                if (res) {
                    this.overtimeSetupData = res?.data;


                    if (this.overtimeSetupData?.isNight == false) {
                        detailsCardMeta[0].labels = detailsCardMeta[0].labels.filter(label => !["startTime", "endTime", "nightRate"].includes(label.labelName.defaultValue));
                    }

                    if (this.overtimeSetupData?.payableCycle?.id != '3') {
                        detailsCardMeta[0].labels = detailsCardMeta[0].labels.filter(label => !["payableCycleDay"].includes(label.labelName.defaultValue));
                    }

                    if (this.overtimeSetupData?.type?.id != '2') {
                        detailsCardMeta[0].labels = detailsCardMeta[0].labels.filter(label => !["defineRange"].includes(label.templateName));
                    }
                    if (this.overtimeSetupData?.type?.id != '1') {
                        detailsCardMeta[0].labels = detailsCardMeta[0].labels.filter(label => !["employeeOtMatrix"].includes(label.templateName));
                    }

                    if (this.overtimeSetupData?.type?.id != '3') {
                        detailsCardMeta[0].labels = detailsCardMeta[0].labels.filter(label => !["hour", "month", "days", "maxOt", "rate", "baseComponent"].includes(label.labelName.defaultValue));
                    }

                    if (this.overtimeSetupData?.type?.id == '1' && this.overtimeSetupData?.isNight == true) {
                        detailsCardMeta[0].labels = detailsCardMeta[0].labels.filter(label => !["nightRate"].includes(label.labelName.defaultValue));

                    }




                }


                if (this.overtimeSetupData?.overtimeFormulaType?.id == '2') {
                    if (this.overtimeSetupData?.overtimeFormula) {
                        const formulaString = this.overtimeSetupData?.overtimeFormula;
                        const transformedString = this.availableVariables.reduce(
                            (result, variable) => {
                                const regex = new RegExp('\\' + variable.value, 'g');
                                return result.replace(regex, `${variable.name}`);
                            },
                            formulaString
                        );

                        this.formattedExpression = transformedString
                    }
                }
                else if(this.overtimeSetupData?.overtimeFormula){
                    this.formattedExpression=this.overtimeSetupData?.infithraFormula?.name
                }





            }, error: (error: any) => {


            }
        });
    }
    assignTemplate(headerText, formTemplate) {

        this.headerText = headerText;
        this.formTemplate = formTemplate;

    }

    employeeOtMatrixModal(model, headerText) {
        this.headerText = headerText
        this.modalRef = this.modalService.open(model, {
            size: 'md', scrollable: false, windowClass: 'settings-form-modal', backdrop: 'static'
        });
    }

    handleCancelModalClickEmplyeeMatrix() {
        this.modalRef.close();
    }


    ngOnDestroy(): void {
        detailsCardMeta[0].labels = JSON.parse(JSON.stringify(this.originalLabelsData));
    }












}
