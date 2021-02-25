import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompackBannerComponent } from './compack-banner.component';
import { CompackBannerMergeService } from './compack-banner-merge.service';
import { CompackBannerService } from './compack-banner.service';

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
  ],
  providers: [CompackBannerMergeService, CompackBannerService]
})
export class CompackBannerModule { }
