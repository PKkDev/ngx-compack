import { TypeToast } from "./type-toast";

export class ToastConfig {
    public title: string;
    public type: TypeToast;
    public message?: string; 

    constructor() {
        this.title = '';
        this.type = TypeToast.Error
    }
}
