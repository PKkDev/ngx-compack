import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { CompackBannerMergeService } from './compack-banner-merge.service';
import { CompackBannerComponent } from './compack-banner.component';
import { DisplayMessageConfig } from './model/display-message-config';

@Injectable({
  providedIn: 'root'
})
export class CompackBannerService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector,
    private cbms: CompackBannerMergeService) {
    setTimeout(() => this.createdContainer(), 0);
  }

  public addNewMessage(messConfig: DisplayMessageConfig) {
    this.cbms.newMessageEvent$.next(messConfig);
  }

  public removeMessage() {
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
    console.log('compFactory', compFactory);

    const componentRef = compFactory.create(this.injector);
    console.log('componentRef', componentRef);

    this.applicationRef.attachView(componentRef.hostView);

    // this.renderer.createElement('div');

    const body = document.getElementsByTagName('body')[0];
    console.log('body', body);

    let div = document.createElement('div');
    console.log('div', div);

    body.appendChild(div);

    div.appendChild(componentRef.location.nativeElement);
  }

}
