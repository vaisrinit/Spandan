import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UmpiresRoutingModule } from './umpires-routing.module';
import { UmpiresComponent,AddUmpireDetailsDialogComponent } from './umpires.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UmpiresComponent,
    AddUmpireDetailsDialogComponent
  ],
  imports: [
    CommonModule,
    UmpiresRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UmpiresModule { }
