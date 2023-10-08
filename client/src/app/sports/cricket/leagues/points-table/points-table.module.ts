import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PointsTableRoutingModule } from './points-table-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PointsTableRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PointsTableModule { }
