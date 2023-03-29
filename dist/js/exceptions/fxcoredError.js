"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FxcoredError = void 0;
class FxcoredError extends Error {
    constructor({ url, method, code, message, details }) {
        super();
        this.url = url;
        this.method = method;
        this.code = code;
        this.message = message;
        this.details = details;
    }
}
exports.FxcoredError = FxcoredError;
