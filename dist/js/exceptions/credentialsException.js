"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsException = void 0;
const httpExceptions_1 = require("./httpExceptions");
class CredentialsException extends httpExceptions_1.HttpException {
    constructor() {
        super(401, "Wrong credentials provided");
    }
}
exports.CredentialsException = CredentialsException;
