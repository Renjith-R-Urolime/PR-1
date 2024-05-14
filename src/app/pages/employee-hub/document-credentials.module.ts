import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Error404Component } from "src/app/modules/errors/error404/error404.component";

const routes: Routes = [
  {
    path: "documents",
    component: Error404Component,
  },
  {
    path: "credentials",
    component: Error404Component,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  declarations: [],
})
export class DocumentsCredentailsModule {}
