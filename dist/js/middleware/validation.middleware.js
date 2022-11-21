"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const httpExceptions_1 = require("../exceptions/httpExceptions");
function validationMiddleware(instanceType, skipMissingProperties = false) {
    return (req, res, next) => {
        (0, class_validator_1.validate)((0, class_transformer_1.plainToInstance)(instanceType, req.body), { skipMissingProperties })
            .then((errors) => {
            if (errors.length > 0) {
                console.log(`Validation failed. Errors: `, errors);
                const msg = errors.map((error) => Object.values(error.constraints)).join(", ");
                next(new httpExceptions_1.HttpException(400, msg));
            }
            else {
                next();
            }
        });
    };
    //skipMissingProperties skips validating props that are missing.
    //If updating just parts of the document, will not cause error if required prop is missing.
}
exports.validationMiddleware = validationMiddleware;
