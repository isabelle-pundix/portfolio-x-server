export class FxcoredError extends Error {
    url: string;
    method: string;
    code: number | string;
    message: string;
    details: any;

    constructor({
        url,
        method,
        code,
        message,
        details
    }: {
        url: string;
        method: string;
        code: number | string;
        message: string;
        details: any
    }) {
        super();
        this.url = url;
        this.method = method;
        this.code = code;
        this.message = message;
        this.details = details
    }
}