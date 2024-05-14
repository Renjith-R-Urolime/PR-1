import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { Error404Component } from 'src/app/modules/errors/error404/error404.component';

const routes: Routes = [
  {
    path: '',
    component: Error404Component
  },

]
@NgModule({
  imports: [],
  declarations: []

})
export class RoasterPlannerModule { }
