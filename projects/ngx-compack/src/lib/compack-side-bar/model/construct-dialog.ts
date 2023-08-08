import { ComponentRef, EventEmitter } from "@angular/core";

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