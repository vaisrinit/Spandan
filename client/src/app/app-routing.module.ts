import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotauthGuard } from './_guards/notauth.guard';
import { AuthGuard } from './_guards/auth.guard';
const routes: Routes = [
  {
    path:'',
    canActivate:[NotauthGuard],
    component:LoginComponent
  },
  {
    path:'login',
    canActivate:[NotauthGuard],
    loadChildren : ()=>import('./login/login.module').then(m=>m.LoginModule)
  },
  {
    path:'home',
    canActivate:[AuthGuard], 
    loadChildren : ()=>import('./home/home.module').then(m=>m.HomeModule)
  },
  {
    path:'register',
    canActivate:[NotauthGuard],
    loadChildren : ()=>import('./register/register.module').then(m=>m.RegisterModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
