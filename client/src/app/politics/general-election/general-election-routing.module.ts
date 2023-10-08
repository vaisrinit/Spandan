import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralElectionComponent } from './general-election.component';

const routes: Routes = [
  {path:'',component:GeneralElectionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralElectionRoutingModule { }
