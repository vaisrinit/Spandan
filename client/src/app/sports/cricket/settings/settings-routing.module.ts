import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {path:'',component:SettingsComponent},
  {path:"umpires",loadChildren : ()=>import('./umpires/umpires.module').then(m=>m.UmpiresModule)},
  {path:"venues",loadChildren : ()=>import('./venues/venues.module').then(m=>m.VenuesModule)},
  {path:"leagues",loadChildren : ()=>import('./leagues/leagues.module').then(m=>m.LeaguesModule)},
  {path:"teams",loadChildren : ()=>import('./teams/teams.module').then(m=>m.TeamsModule)},
  {path:"matches",loadChildren : ()=>import('./matches/matches.module').then(m=>m.MatchesModule)},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
