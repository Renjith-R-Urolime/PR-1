import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { ComponentMappingFormComponent } from './component-mapping-form/component-mapping-form.component';
import { ComponentMappingViewComponent } from './component-mapping-view/component-mapping-view.component';
import { ComponentMappingComponent } from './component-mapping.component';

const routes: Routes = [
  {
    path: '',
    component: ComponentMappingComponent,
  },
  {
    path: 'create',
    component: ComponentMappingFormComponent
  },
  {
    path: 'edit/:id',
    component: ComponentMappingFormComponent
  },
  {
    path: 'view/:id',
    component: ComponentMappingViewComponent
  },

]

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    InlineSVGModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ComponentMappingComponent, ComponentMappingFormComponent, ComponentMappingViewComponent]
})
export class ComponentMappingModule { }
