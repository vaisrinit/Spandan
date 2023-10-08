import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FsdevRoutingModule } from './fsdev-routing.module';
import { FsdevComponent } from './fsdev.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    FsdevComponent
  ],
  imports: [
    CommonModule,
    FsdevRoutingModule,
    MaterialModule
  ]
})
export class FsdevModule { }
