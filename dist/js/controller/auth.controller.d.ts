import { NextFunction, Request, Response } from "express";
export declare class AuthController {
    private authService;
    private User;
    constructor();
    registerNewUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    logIn: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    logOut: (req: Request, res: Response) => Promise<void>;
}
