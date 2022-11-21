import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/httpExceptions";

export function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
    const status: number = error.status || 500;
    const message: string = error.message || "Something went wrong";
    res.status(status).send(
        {
            status,
            message
        }
    );
    //Error-handling middleware always takes four arguments.
    //Function signature must match even if not all are used.
}