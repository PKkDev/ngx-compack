import { TypePositionMessage } from "./type-position-message";

export class DisplayMessageConfig {
    public title?: string;
    public message: string;
    public intervalView?: number;
    public position: TypePositionMessage;

    constructor() {
        this.title = undefined;
        this.message = '';
        this.intervalView = undefined;
        this.position = 0;
    }
}