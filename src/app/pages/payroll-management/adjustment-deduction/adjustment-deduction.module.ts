import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { AdjustmentDeductionFormComponent } from './adjustment-deduction-form/adjustment-deduction-form.component';
import { AdjustmentDeductionViewComponent } from './adjustment-deduction-view/adjustment-deduction-view.component';
import { AdjustmentDeductionComponent } from './adjustment-deduction.component';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    InlineSVGModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule
  ],
  declarations: [AdjustmentDeductionComponent,AdjustmentDeductionViewComponent,AdjustmentDeductionFormComponent],
  exports: [AdjustmentDeductionComponent,AdjustmentDeductionViewComponent,AdjustmentDeductionFormComponent]
})
export class AdjustmentDeductionModule { }

