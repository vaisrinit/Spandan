import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren : ()=>import('./login/login.module').then(m=>m.LoginModule)
  },
  {
    path:'register',
    loadChildren : ()=>import('./register/register.module').then(m=>m.RegisterModule)
  },
  {
    path:'login',
    loadChildren : ()=>import('./login/login.module').then(m=>m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
