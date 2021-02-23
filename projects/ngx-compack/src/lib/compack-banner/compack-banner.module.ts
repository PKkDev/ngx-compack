import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompackBannerComponent } from './compack-banner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CompackBannerComponent
  ],
  entryComponents: [
    CompackBannerComponent
  ],
  exports: [
    CompackBannerComponent
  ]
})
export class CompackBannerModule { }
