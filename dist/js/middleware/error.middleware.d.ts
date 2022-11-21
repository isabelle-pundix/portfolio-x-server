import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/httpExceptions";
export declare function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction): void;
