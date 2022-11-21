import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { RequestHandler } from "express";
import { HttpException } from "../exceptions/httpExceptions";

export function validationMiddleware<T>(instanceType: any, skipMissingProperties: boolean = false): RequestHandler {
    return (req, res, next) => {
        validate(plainToInstance(instanceType, req.body), { skipMissingProperties})
        .then((errors: Array<ValidationError>) => {
            if (errors.length > 0 ) {
                console.log(`Validation failed. Errors: `, errors);
                const msg = errors.map((error: ValidationError) => Object.values(error.constraints!)).join(", ");
                next(new HttpException(400, msg));
            } else {
                next();
            }
        });
    };
    //skipMissingProperties skips validating props that are missing.
    //If updating just parts of the document, will not cause error if required prop is missing.
}