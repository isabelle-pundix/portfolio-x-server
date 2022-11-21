"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserException = void 0;
const createError = require("http-errors");
class UserException {
    constructor() {
    }
    alreadyExist() {
        return createError(400, "User with that email already exists");
    }
}
exports.UserException = UserException;
