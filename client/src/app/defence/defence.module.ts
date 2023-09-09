import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefenceRoutingModule } from './defence-routing.module';
import { DefenceComponent } from './defence.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    DefenceComponent
  ],
  imports: [
    CommonModule,
    DefenceRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class DefenceModule { }
