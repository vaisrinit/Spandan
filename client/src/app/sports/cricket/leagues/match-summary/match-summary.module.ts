import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchSummaryRoutingModule } from './match-summary-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMatchSummaryDialogComponent, MatchSummaryComponent } from './match-summary.component';


@NgModule({
  declarations: [AddMatchSummaryDialogComponent],
  imports: [
    CommonModule,
    MatchSummaryRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MatchSummaryModule { }
