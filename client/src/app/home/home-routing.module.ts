import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DefenceComponent } from '../defence/defence.component';
import { TabsComponent } from './tabs/tabs.component';
import { FsdevComponent } from '../fsdev/fsdev.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent,
    children:[
      {path:"defence",loadChildren : ()=>import('../defence/defence.module').then(m=>m.DefenceModule)},
      {path:"sports",loadChildren : ()=>import('../sports/sports.module').then(m=>m.SportsModule)},
      {path:"tabs",loadChildren : ()=>import('./tabs/tabs.module').then(m=>m.TabsModule)},
      {path:"fsdev",loadChildren : ()=>import('../fsdev//fsdev.module').then(m=>m.FsdevModule)},
      {path:"politics",loadChildren : ()=>import('../politics//politics.module').then(m=>m.PoliticsModule)},
      { path: '', redirectTo: '/home/tabs', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
