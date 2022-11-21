"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
function errorMiddleware(error, req, res, next) {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    res.status(status).send({
        status,
        message
    });
    //Error-handling middleware always takes four arguments.
    //Function signature must match even if not all are used.
}
exports.errorMiddleware = errorMiddleware;
