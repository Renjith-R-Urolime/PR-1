import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { TravelComponent } from './travel.component';
import { TravelsFormComponent } from './travels-form/travels-form.component';
import { TravelDetailComponent } from './travel-detail/travel-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TravelComponent
  },
  {
    path: 'new',
    component: TravelsFormComponent
  },
  {
    path: 'edit/:id',
    component: TravelsFormComponent
  },
  {
    path: 'view/:id',
    component: TravelDetailComponent
  },
]
@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TravelComponent, TravelsFormComponent, TravelDetailComponent]
})
export class TravelModule { }
