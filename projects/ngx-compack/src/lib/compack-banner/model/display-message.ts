export class DisplayMessage {
    public title?: string;
    public message: string;
    public intervalView?: number;
    // public backClass: string;
    public color: string
    public positionClass: string;

    constructor() {
        this.title = undefined;
        this.message = '';
        this.intervalView = undefined;
        // this.backClass = '';
        this.color = '';
        this.positionClass = ''
    }
}
