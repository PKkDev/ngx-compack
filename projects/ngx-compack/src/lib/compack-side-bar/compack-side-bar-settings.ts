import { ComponentRef, EventEmitter, InjectionToken } from "@angular/core";

export const SIDE_BAR_DATA: InjectionToken<any> = new InjectionToken<any>('SideBarData');

export class SideBarConfig {
    public title?: string | undefined | null = null;
    public viewCloseBtn?: boolean | undefined | null = null;
    public dialogWidth?: string | null = '50%';
}

export class ConstructDialog {
    public outerDiv: any;
    public innerDiv: any;
    public closeBtn: any | null;

    public componentRef: ComponentRef<any> | undefined;

    public clickEvent: (() => void) | undefined;
    public closeBtnClickEvent: (() => void) | undefined;

    public hideTimeOut: any;

    public closeBackEvent: EventEmitter<any>;

    constructor() {
        this.closeBackEvent = new EventEmitter<any>()
    }
}