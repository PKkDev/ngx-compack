import { ToastConfig } from "./toast-config";

export class Toast extends ToastConfig {
    public index: number;
    public timeToDel: number

    constructor() {
        super();
        this.index = -1;
        this.timeToDel = 15;
    }
}
