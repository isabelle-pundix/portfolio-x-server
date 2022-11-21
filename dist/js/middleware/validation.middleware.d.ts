import { RequestHandler } from "express";
export declare function validationMiddleware<T>(instanceType: any, skipMissingProperties?: boolean): RequestHandler;
