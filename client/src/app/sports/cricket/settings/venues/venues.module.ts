import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VenuesRoutingModule } from './venues-routing.module';
import { VenuesComponent,AddVenueDetailsDialogComponent,EditVenueDetailsDialogComponent } from './venues.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VenuesComponent,
    AddVenueDetailsDialogComponent,EditVenueDetailsDialogComponent
  ],
  imports: [
    CommonModule,
    VenuesRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class VenuesModule { }
