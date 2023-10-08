import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaguesComponent } from './leagues.component';

const routes: Routes = [
  {path:'',component:LeaguesComponent},
  {path:"batting",loadChildren : ()=>import('./batting-details/batting-details.module').then(m=>m.BattingDetailsModule)},
  {path:"bowling",loadChildren : ()=>import('./bowling-details/bowling-details.module').then(m=>m.BowlingDetailsModule)},
  {path:"match",loadChildren : ()=>import('./match-summary/match-summary.module').then(m=>m.MatchSummaryModule)},
  {path:"playing11",loadChildren : ()=>import('./playing11/playing11.module').then(m=>m.Playing11Module)},
  {path:"points",loadChildren : ()=>import('./points-table/points-table.module').then(m=>m.PointsTableModule)},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaguesRoutingModule { }
