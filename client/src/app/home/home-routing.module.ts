import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DefenceComponent } from '../defence/defence.component';
import { TabsComponent } from './tabs/tabs.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent,
    children:[
      {path:"defence",loadChildren : ()=>import('../defence/defence.module').then(m=>m.DefenceModule)},
      {path:"sports",loadChildren : ()=>import('../sports/sports.module').then(m=>m.SportsModule)},
      {path:"tabs",loadChildren : ()=>import('./tabs/tabs.module').then(m=>m.TabsModule)},
      { path: '', redirectTo: '/home/tabs', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
