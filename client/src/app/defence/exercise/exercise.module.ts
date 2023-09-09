import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExerciseRoutingModule } from './exercise-routing.module';
import { AddDefenceExerciseDialog, ExerciseComponent } from './exercise.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ExerciseComponent,
    AddDefenceExerciseDialog
  ],
  imports: [
    CommonModule,
    ExerciseRoutingModule,
    FlexLayoutModule,
    MaterialModule,FormsModule,ReactiveFormsModule
  ]
})
export class ExerciseModule { }
