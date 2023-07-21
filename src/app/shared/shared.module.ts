import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { DurationPipe } from './pipes/duration.pipe';
import { OverlayComponent } from './components/overlay/overlay.component';
import { TypeOfPipe } from './pipes/type-of.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    TaskCardComponent,
    ReversePipe,
    DurationPipe,
    OverlayComponent,
    TypeOfPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HeaderComponent,
    TaskCardComponent,
    ReversePipe,
    DurationPipe,
    TypeOfPipe
  ]
})
export class SharedModule { }
