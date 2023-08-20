import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompackIconDirective } from './compack-icon.directive';

@NgModule({
  declarations: [
    CompackIconDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CompackIconDirective
  ]
})
export class CompackIconModule { }
