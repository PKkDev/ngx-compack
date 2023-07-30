import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { CompackBannerMergeService } from './compack-banner-merge.service';
import { CompackBannerComponent } from './compack-banner.component';
import { DisplayMessageConfig } from './model/display-message-config';
import { TypeMessage } from './model/type-message';
import { TypePositionMessage } from './model/type-position-message';

@Injectable()
export class CompackBannerService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector,
    private cbms: CompackBannerMergeService) {
    setTimeout(() => this.createdContainer(), 0);
  }

  public viewBanner(typeMessage: TypeMessage, position: TypePositionMessage, message: string, title?: string, intervalView?: number) {
    const messConfig: DisplayMessageConfig = {
      typeMessage,
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

  public setInfoColor(newInfoColor: string) {
    this.cbms.setInfoColor(newInfoColor);
  }

  public setErrorColor(newError: string) {
    this.cbms.setErrorColor(newError);
  }

  private createdContainer() {
    const compFactory = this.componentFactoryResolver.resolveComponentFactory(CompackBannerComponent);
    const componentRef = compFactory.create(this.injector);
    this.applicationRef.attachView(componentRef.hostView);

    const body = document.getElementsByTagName('body')[0];
    const div = document.createElement('div');
    body.appendChild(div);

    div.appendChild(componentRef.location.nativeElement);
  }

}
