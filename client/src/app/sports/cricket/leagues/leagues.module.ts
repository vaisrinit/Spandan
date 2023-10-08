import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaguesRoutingModule } from './leagues-routing.module';
import { LeaguesComponent } from './leagues.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material/material.module';
import { PointsTableComponent } from './points-table/points-table.component';
import { BowlingDetailsComponent } from './bowling-details/bowling-details.component';
import { BattingDetailsComponent } from './batting-details/batting-details.component';
import { MatchSummaryComponent } from './match-summary/match-summary.component';


@NgModule({
  declarations: [
    LeaguesComponent,
    PointsTableComponent,
    BowlingDetailsComponent,
    BattingDetailsComponent,
    MatchSummaryComponent
  ],
  imports: [
    CommonModule,
    LeaguesRoutingModule,
    FlexLayoutModule,
    MaterialModule
  ]
})
export class LeaguesModule { }
