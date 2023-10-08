import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BowlingDetailsRoutingModule } from './bowling-details-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBowlingDetailsComponent } from './bowling-details.component';


@NgModule({
  declarations: [
    AddBowlingDetailsComponent
  ],
  imports: [
    CommonModule,
    BowlingDetailsRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BowlingDetailsModule { }
