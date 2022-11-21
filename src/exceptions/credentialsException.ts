import { HttpException } from "./httpExceptions";

export class CredentialsException extends HttpException {
    constructor() {
        super(401, "Wrong credentials provided");
    }
}