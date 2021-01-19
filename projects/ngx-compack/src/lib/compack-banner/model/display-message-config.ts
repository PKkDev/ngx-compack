import { TypeMessage } from "./type-message";
import { TypePositionMessage } from "./type-position-message";

export class DisplayMessageConfig {
    public title?: string;
    public message: string;
    public intervalView?: number;
    public typeMessage: TypeMessage;
    public position: TypePositionMessage;

    constructor() {
        this.title = undefined;
        this.message = '';
        this.intervalView = undefined;
        this.typeMessage = 0;
        this.position = 0;
    }


}