export enum TypePickerError {
    None,
    OutOfMaxMin,
    StartAfterEnd,
    MaxChooseDay
}

export class CalendareError {
    public isError: boolean;
    public errorMessage: string;

    constructor() {
        this.isError = false;
        this.errorMessage = '';
    }
}