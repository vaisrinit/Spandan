import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportsComponent } from './sports.component';

const routes: Routes = [
  {path:"",component:SportsComponent},
  {path:"cricket",loadChildren : ()=>import('./cricket/cricket.module').then(m=>m.CricketModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SportsRoutingModule { }
