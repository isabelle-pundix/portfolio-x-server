import { HttpException } from "./httpExceptions";

export class AuthTokenException extends HttpException {
    constructor() {
        super(401, "Wrong token");
    }
}