import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SportsRoutingModule } from './sports-routing.module';
import { SportsComponent } from './sports.component';

import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    SportsComponent
  ],
  imports: [
    CommonModule,
    SportsRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class SportsModule { }
