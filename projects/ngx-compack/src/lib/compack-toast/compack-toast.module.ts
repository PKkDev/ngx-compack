import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompackToastComponent } from './compack-toast.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CompackToastComponent
  ],
  exports: [
    CompackToastComponent
  ]
})
export class CompackToastModule { }
