import { ApplicationRef, createComponent, EnvironmentInjector, Inject, Injectable, Injector } from '@angular/core';
import { CompackToastMergeService } from './compack-toast-merge.service';
import { CompackToastComponent } from './compack-toast.component';
import { TypeToast } from './model/type-toast';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class CompackToastService {

  constructor(
    private applicationRef: ApplicationRef,
    private injector: Injector,
    private ctms: CompackToastMergeService,
    @Inject(DOCUMENT) private document: Document,
    private environmentInjector: EnvironmentInjector) {
    setTimeout(() => this.createContainer(), 0);
  }

  public view(type: TypeToast, title: string, message?: string) {
    if (message || title)
      if (message)
        this.ctms.viewNotification$.next({ title, type, message });
      else
        this.ctms.viewNotification$.next({ title, type });
  }

  public setTimeToAutoRemove(time: number) {
    this.ctms.setTimeToAutoRemove(time);
  }

  private createContainer() {
    const componentRef = createComponent(CompackToastComponent, {
      environmentInjector: this.environmentInjector
    });
    this.applicationRef.attachView(componentRef.hostView);
    const body = this.document.getElementsByTagName('body')[0];
    const div = this.document.createElement('div');
    body.appendChild(div);
    div.appendChild(componentRef.location.nativeElement);
  }

}
