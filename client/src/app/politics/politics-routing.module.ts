import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoliticsComponent } from './politics.component';

const routes: Routes = [
  {path:"",component:PoliticsComponent},
  {path:"parlelections",loadChildren : ()=>import('./general-election/general-election.module').then(m=>m.GeneralElectionModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoliticsRoutingModule { }
