import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BattingDetailsRoutingModule } from './batting-details-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBattingDetailsDialog } from './batting-details.component';


@NgModule({
  declarations: [
    AddBattingDetailsDialog
  ],
  imports: [
    CommonModule,
    BattingDetailsRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BattingDetailsModule { }
