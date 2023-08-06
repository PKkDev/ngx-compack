import { DOCUMENT } from '@angular/common';
import { ApplicationRef, EventEmitter, Inject, Injectable, Injector, Renderer2, RendererFactory2, Type, createComponent, EnvironmentInjector } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstructDialog, SIDE_BAR_DATA, SideBarConfig } from './compack-side-bar-settings';

@Injectable({
  providedIn: 'root'
})
export class CompackSideBarService {

  private openedDialogs: ConstructDialog[] = [];

  private renderer: Renderer2;

  constructor(
    private applicationRef: ApplicationRef,
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    private environmentInjector: EnvironmentInjector) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngOnDestroy() {
    for (const sideBar of this.openedDialogs) {
      this.closeActiveSideBar();
    }
  }

  public openSideBar(
    component: Type<any>, 
    sideBarConfig: SideBarConfig | null = null, 
    dialogData: any | null = null): Observable<any> {

    const outerDiv = this.renderer.createElement('div');
    this.renderer.addClass(outerDiv, 'side-bar-shadow');
    this.renderer.addClass(outerDiv, 'side-bar-shadow-up');
    this.renderer.setStyle(outerDiv, 'z-index', (1000 + this.openedDialogs.length).toString());

    const innerDiv = this.renderer.createElement('div');
    this.renderer.addClass(innerDiv, 'side-bar-content');
    this.renderer.addClass(innerDiv, 'side-bar-content-left');
    let width = sideBarConfig?.dialogWidth ? sideBarConfig.dialogWidth : '50%'
    this.renderer.setStyle(innerDiv, 'width', width);
    this.renderer.setStyle(innerDiv, 'z-index', (1000 + this.openedDialogs.length + 1).toString());

    let closeBtn: any | null = null;
    if (sideBarConfig && (sideBarConfig.title || sideBarConfig.viewCloseBtn)) {
      const headerContainer = this.renderer.createElement('div');
      this.renderer.addClass(headerContainer, 'header-container');

      this.renderer.setStyle(innerDiv, 'padding', '7vh 0 0 0');

      if (sideBarConfig.title) {
        const title = this.renderer.createText(sideBarConfig.title);
        this.renderer.appendChild(headerContainer, title);
      }

      if (sideBarConfig.viewCloseBtn) {
        closeBtn = this.renderer.createElement('div');
        this.renderer.addClass(closeBtn, 'side-bar-close-btn');
        const span = this.renderer.createElement('span');
        this.renderer.appendChild(closeBtn, span);
        this.renderer.appendChild(headerContainer, closeBtn);
      }
      this.renderer.appendChild(innerDiv, headerContainer);
    }

    this.renderer.appendChild(this.document.body, innerDiv);
    this.renderer.appendChild(this.document.body, outerDiv);

    const injector: Injector = Injector.create({ providers: [{ provide: SIDE_BAR_DATA, useValue: dialogData }] });

    const componentRef = createComponent(component, {
      environmentInjector: this.environmentInjector,
      elementInjector: injector
    })

    this.applicationRef.attachView(componentRef.hostView);
    this.renderer.appendChild(innerDiv, componentRef.location.nativeElement);

    let closeBtnClickEvent: (() => void) | undefined;
    if (sideBarConfig && sideBarConfig.viewCloseBtn && closeBtn) {
      closeBtnClickEvent = this.renderer.listen(closeBtn, 'click', event => {
        this.closeActiveSideBar();
      });
    }

    const clickEvent = this.renderer.listen(outerDiv, 'click', event => {
      if (!innerDiv.contains(event.target)) {
        this.closeActiveSideBar();
      }
    });

    const newDialog: ConstructDialog = {
      outerDiv: outerDiv,
      innerDiv: innerDiv,
      closeBtn: closeBtn,
      componentRef: componentRef,
      clickEvent: clickEvent,
      closeBtnClickEvent: closeBtnClickEvent,
      hideTimeOut: null,
      closeBackEvent: new EventEmitter<any>()
    }
    this.openedDialogs.push(newDialog);

    return newDialog.closeBackEvent;
  }

  public closeActiveDialog(result: any | null = null) {
    this.closeActiveSideBar(result);
  }

  private closeActiveSideBar(result: any | null = null) {
    if (this.openedDialogs.length > 0) {
      const sideBar = this.openedDialogs[this.openedDialogs.length - 1];

      this.renderer.addClass(sideBar.outerDiv, 'side-bar-shadow-down');
      this.renderer.addClass(sideBar.innerDiv, 'side-bar-content-right');

      if (sideBar.closeBtnClickEvent) sideBar.closeBtnClickEvent();
      if (sideBar.clickEvent) sideBar.clickEvent();

      if (sideBar.hideTimeOut) clearTimeout(sideBar.hideTimeOut);

      sideBar.hideTimeOut = setTimeout(() => {
        if (sideBar.componentRef)
          sideBar.componentRef.destroy();

        this.renderer.removeChild(this.document.body, sideBar.outerDiv);
        this.renderer.removeChild(this.document.body, sideBar.innerDiv);

        sideBar.closeBackEvent?.next(result);

        this.openedDialogs.pop();
      }, 500);
    }
  }


}
