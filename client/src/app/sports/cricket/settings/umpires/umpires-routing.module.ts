import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UmpiresComponent } from './umpires.component';

const routes: Routes = [
  {path:'',component:UmpiresComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UmpiresRoutingModule { }
