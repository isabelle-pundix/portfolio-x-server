"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthTokenException = void 0;
const httpExceptions_1 = require("./httpExceptions");
class AuthTokenException extends httpExceptions_1.HttpException {
    constructor() {
        super(401, "Wrong token");
    }
}
exports.AuthTokenException = AuthTokenException;
