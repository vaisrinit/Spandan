import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CricketComponent } from './cricket.component';

const routes: Routes = [
  {path:'',component:CricketComponent},
  {path:"settings",loadChildren : ()=>import('./settings/settings.module').then(m=>m.SettingsModule)},
  {path:"leagues",loadChildren : ()=>import('./leagues/leagues.module').then(m=>m.LeaguesModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CricketRoutingModule { }
