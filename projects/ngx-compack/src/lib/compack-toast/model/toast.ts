import { ToastConfig } from "./toast-config";

export class Toast extends ToastConfig {
    public index: number;
    public color: string;
    public timeToDel: number

    constructor() {
        super();
        this.index = -1;
        this.color = '';
        this.timeToDel = 15;
    }
}
