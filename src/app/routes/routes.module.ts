import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { RoutesComponent } from './routes.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { OverlayService } from '../core/services/overlay.service';


@NgModule({
  declarations: [
    RoutesComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RoutesRoutingModule,
    SharedModule
  ],
  providers: [OverlayService]
})
export class RoutesModule { }
