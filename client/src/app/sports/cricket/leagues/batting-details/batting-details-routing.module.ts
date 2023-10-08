import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Playing11Component } from '../playing11/playing11.component';
import { BattingDetailsComponent } from './batting-details.component';

const routes: Routes = [
  {path:'',component:BattingDetailsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BattingDetailsRoutingModule { }
