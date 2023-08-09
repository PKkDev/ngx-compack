import { ApplicationRef, EnvironmentInjector, Inject, Injectable, createComponent } from '@angular/core';
import { CompackBannerMergeService } from './compack-banner-merge.service';
import { CompackBannerComponent } from './compack-banner.component';
import { DisplayMessageConfig } from './model/display-message-config';
import { TypePositionMessage } from './model/type-position-message';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class CompackBannerService {

  constructor(
    private applicationRef: ApplicationRef,
    private cbms: CompackBannerMergeService,
    @Inject(DOCUMENT) private document: Document,
    private environmentInjector: EnvironmentInjector) {
    setTimeout(() => this.createdContainer(), 0);
  }

  public viewBanner(position: TypePositionMessage, message: string, title?: string, intervalView?: number) {
    const messConfig: DisplayMessageConfig = {
      position,
      message,
      title,
      intervalView
    }
    if (message || title)
      this.cbms.newMessageEvent$.next(messConfig);
  }

  public removeBanner() {
    this.cbms.removeMessageEvent$.emit(true);
  }

  private createdContainer() {
    const componentRef = createComponent(CompackBannerComponent, {
      environmentInjector: this.environmentInjector
    });

    this.applicationRef.attachView(componentRef.hostView);

    const body = this.document.getElementsByTagName('body')[0];
    const div = this.document.createElement('div');
    body.appendChild(div);

    div.appendChild(componentRef.location.nativeElement);
  }

}
