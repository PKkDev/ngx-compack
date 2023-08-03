import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmpButtonDirective } from './cmp-button.directive';

@NgModule({
  declarations: [
    CmpButtonDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CmpButtonDirective
  ]
})
export class CompackButtonModule { }
