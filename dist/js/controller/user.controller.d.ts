import { Request, Response } from "express";
export declare class UserController {
    private userService;
    constructor();
    getUsers: (req: Request, res: Response) => Promise<void>;
    addUser: (req: Request, res: Response) => Promise<void>;
    updateUser: (req: Request, res: Response) => Promise<void>;
    deleteUser: (req: Request, res: Response) => Promise<void>;
}
