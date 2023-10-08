import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Playing11Component } from './playing11.component';

const routes: Routes = [
  {path:'',component:Playing11Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Playing11RoutingModule { }
