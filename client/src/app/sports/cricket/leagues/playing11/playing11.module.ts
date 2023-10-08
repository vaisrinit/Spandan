import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Playing11RoutingModule } from './playing11-routing.module';
import { Playing11Component } from './playing11.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    Playing11Component
  ],
  imports: [
    CommonModule,
    Playing11RoutingModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class Playing11Module { }
