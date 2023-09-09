import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'login',
    loadChildren : ()=>import('./login/login.module').then(m=>m.LoginModule)
  },
  {
    path:'home',
    loadChildren : ()=>import('./home/home.module').then(m=>m.HomeModule)
  },
  {
    path:'register',
    loadChildren : ()=>import('./register/register.module').then(m=>m.RegisterModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
