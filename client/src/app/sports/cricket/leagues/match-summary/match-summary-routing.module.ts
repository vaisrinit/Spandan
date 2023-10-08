import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchSummaryComponent } from './match-summary.component';

const routes: Routes = [
  {path:'',component:MatchSummaryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchSummaryRoutingModule { }
