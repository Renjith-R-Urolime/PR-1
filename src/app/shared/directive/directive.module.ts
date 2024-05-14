import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActionButtonTemplateDirective, AdditionalOptionsDirective, AdditionalSearchFilterButtonTemplateDirective, AdditionalViewTemplateDirective, CardBodyTemplateDirective, CardButtonTemplateDirective, CardFooterTemplateDirective, CardHeaderTemplateDirective, CreateButtonTemplateDirective, CustomDetailsCardElementDirective, CustomModelButtonDirective, CustomNgSelectLabelDirective, CustomNgSelectOptionDirective, CustomViewTemplate, DataCellTemplateDirective, DropdownButtonTemplateDirective, FormDrawerFooterTemplateDirective, HeaderCellTemplateDirective,TooltipTemplateDirective } from './custom-template.directive';
import { CustomTooltipDirective } from './custom-tooltip.directive';
import { OutsideClickDirective } from './outside-click.directive';
import { DraggableRowDirective } from './table-drag.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    OutsideClickDirective,
    ActionButtonTemplateDirective,
    CustomTooltipDirective,
    AdditionalSearchFilterButtonTemplateDirective,
    DropdownButtonTemplateDirective,
    FormDrawerFooterTemplateDirective,
    CardHeaderTemplateDirective,
    CardBodyTemplateDirective,
    CardFooterTemplateDirective,
    AdditionalViewTemplateDirective,
    CreateButtonTemplateDirective,
    CustomNgSelectLabelDirective,
    CardFooterTemplateDirective,
    AdditionalViewTemplateDirective,
    DraggableRowDirective,
    DataCellTemplateDirective,
    HeaderCellTemplateDirective,
    CustomModelButtonDirective,
    CustomNgSelectOptionDirective,
    CardButtonTemplateDirective,
    CustomDetailsCardElementDirective,
    AdditionalOptionsDirective,
    CustomViewTemplate,
    TooltipTemplateDirective
  ],
  exports:[
    OutsideClickDirective,
    ActionButtonTemplateDirective,
    CustomTooltipDirective,
    AdditionalSearchFilterButtonTemplateDirective,
    DropdownButtonTemplateDirective,
    AdditionalOptionsDirective,
    FormDrawerFooterTemplateDirective,
    CustomNgSelectLabelDirective,
    CardHeaderTemplateDirective,
    CardBodyTemplateDirective,
    CardFooterTemplateDirective,
    CreateButtonTemplateDirective,
    AdditionalViewTemplateDirective,
    DraggableRowDirective,
    DataCellTemplateDirective,
    HeaderCellTemplateDirective,
    CustomModelButtonDirective,
    CustomNgSelectOptionDirective,
    CardButtonTemplateDirective,
    CustomDetailsCardElementDirective,
    CustomViewTemplate,
    TooltipTemplateDirective
  ]
})
export class DirectiveModule { }
