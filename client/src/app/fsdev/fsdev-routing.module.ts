import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FsdevComponent } from './fsdev.component';

const routes: Routes = [
  {
    path:'',
    component:FsdevComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FsdevRoutingModule { }
