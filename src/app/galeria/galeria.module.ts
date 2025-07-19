import { CommonModule } from '@angular/common';
import { GaleriaComponent } from './galeria.component';
import { GaleriaRoutingModule } from './galeria-routing.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GaleriaComponent
  ],
  imports: [
    CommonModule,
    GaleriaRoutingModule,
    ReactiveFormsModule
  ]
})
export class GaleriaModule { }
