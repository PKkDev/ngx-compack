export class DisplayMessage {
    public title?: string;
    public message: string;
    public intervalView?: number;
    public positionClass: string;

    constructor() {
        this.title = undefined;
        this.message = '';
        this.intervalView = undefined;
        this.positionClass = ''
    }
}
