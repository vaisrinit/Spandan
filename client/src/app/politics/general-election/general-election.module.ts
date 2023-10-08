import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralElectionRoutingModule } from './general-election-routing.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GeneralElectionRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class GeneralElectionModule { }
