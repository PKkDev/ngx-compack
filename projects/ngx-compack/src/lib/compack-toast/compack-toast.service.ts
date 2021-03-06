import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { CompackToastMergeService } from './compack-toast-merge.service';
import { CompackToastComponent } from './compack-toast.component';
import { ToastConfig } from './model/toast-config';

@Injectable()
export class CompackToastService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector,
    private ctms: CompackToastMergeService) {
    setTimeout(() => this.createdContainer(), 0);
  }

  public emitNewNotif(message: ToastConfig) {
    this.ctms.notifEmite$.next(message);
  }

  public setInfoColor(newInfoColor: string) {
    this.ctms.setInfoColor(newInfoColor);
  }

  public setErrorColor(newError: string) {
    this.ctms.setErrorColor(newError);
  }

  public setSuccessColor(newSuccess: string) {
    this.ctms.setSuccessColor(newSuccess);
  }

  private createdContainer() {
    const compFactory = this.componentFactoryResolver.resolveComponentFactory(CompackToastComponent);
    const componentRef = compFactory.create(this.injector);
    this.applicationRef.attachView(componentRef.hostView);
    const body = document.getElementsByTagName('body')[0];
    let div = document.createElement('div');
    body.appendChild(div);
    div.appendChild(componentRef.location.nativeElement);
  }

}
