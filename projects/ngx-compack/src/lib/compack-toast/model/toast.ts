import { ToastConfig } from "./toast-config";

export class Toast extends ToastConfig {
    public index: number;
    public color: string;

    constructor() {
        super();
        this.index = -1;
        this.color = '';
    }
}
