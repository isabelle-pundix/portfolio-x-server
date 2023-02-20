const createError = require("http-errors");

export class UserException {
    constructor() {
    }

    public alreadyExist() {
        return createError(400, "User with that email already exists");
    }

    public walletAddressUsed() {
        return createError(400, "Wallet address has already been used");
    }
}