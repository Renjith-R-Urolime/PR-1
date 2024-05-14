import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyInfoComponent } from 'src/app/pages/company-info/company-info.component';
import { UiModule } from 'src/app/shared/ui/ui.module';



const routes: Routes = [
 
  {
    path: 'company-info',
    component: CompanyInfoComponent
  },
 
]
@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ CompanyInfoComponent]
 
})
export class ComapnyInfoModule {}
