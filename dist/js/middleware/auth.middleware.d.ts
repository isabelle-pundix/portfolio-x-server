import { Response, NextFunction } from "express";
import { RequestWithUserData } from "../types/requestWithUserData";
export declare function authMiddleware(req: RequestWithUserData, res: Response, next: NextFunction): void;
