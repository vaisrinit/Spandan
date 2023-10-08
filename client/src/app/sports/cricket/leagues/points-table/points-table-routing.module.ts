import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PointsTableComponent } from './points-table.component';

const routes: Routes = [
  {path:'',component:PointsTableComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PointsTableRoutingModule { }
