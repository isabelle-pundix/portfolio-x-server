const createError = require("http-errors");

export class UserException {
    constructor() {
    }

    public alreadyExist() {
        return createError(400, "User with that email already exists")
    }
}