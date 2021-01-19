export class FileObj {
    public file: Blob;
    public fileName: string;

    constructor(file: Blob, fileName: string) {
        this.file = file;
        this.fileName = fileName
    }
}
