import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompackToastComponent } from './compack-toast.component';
import { CompackToastMergeService } from './compack-toast-merge.service';
import { CompackToastService } from './compack-toast.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CompackToastComponent
  ],
  entryComponents: [
    CompackToastComponent
  ],
  exports: [
    CompackToastComponent
  ],
  providers: [CompackToastMergeService, CompackToastService]
})
export class CompackToastModule { }
