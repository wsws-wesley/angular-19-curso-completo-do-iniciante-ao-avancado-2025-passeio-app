import { CommonModule } from '@angular/common';
import { LocaisComponent } from './locais.component';
import { LocaisRoutingModule } from './locais-routing.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LocaisComponent
  ],
  imports: [
    CommonModule,
    LocaisRoutingModule,
    ReactiveFormsModule
  ]
})
export class LocaisModule { }