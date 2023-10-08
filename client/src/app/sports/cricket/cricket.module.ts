import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CricketRoutingModule } from './cricket-routing.module';
import { CricketComponent } from './cricket.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    CricketComponent
  ],
  imports: [
    CommonModule,
    CricketRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class CricketModule { }
