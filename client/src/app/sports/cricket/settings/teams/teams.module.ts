import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsComponent,AddTeamDetailsDialogComponent, EditTeamDetailsDialogComponent } from './teams.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TeamsComponent,
    AddTeamDetailsDialogComponent,
    EditTeamDetailsDialogComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TeamsModule { }
