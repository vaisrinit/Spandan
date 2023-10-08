import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliticsRoutingModule } from './politics-routing.module';
import { PoliticsComponent } from './politics.component';
import { GeneralElectionComponent } from './general-election/general-election.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    PoliticsComponent,
    GeneralElectionComponent
  ],
  imports: [
    CommonModule,
    PoliticsRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class PoliticsModule { }
