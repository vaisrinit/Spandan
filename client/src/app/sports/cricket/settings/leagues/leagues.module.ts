import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaguesRoutingModule } from './leagues-routing.module';
import { LeaguesComponent,AddLeagueDetailsDialogComponent } from './leagues.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LeaguesComponent,
    AddLeagueDetailsDialogComponent
  ],
  imports: [
    CommonModule,
    LeaguesRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LeaguesModule { }
