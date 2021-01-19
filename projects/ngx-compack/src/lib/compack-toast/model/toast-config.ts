import { FileObj } from "./file-obj";
import { TypeToast } from "./type-toast";

export class ToastConfig {
    public title: string;
    public type: TypeToast;
    public message?: string;
    public file?: FileObj;

    constructor() {
        this.title = '';
        this.type = TypeToast.Error
    }
}
