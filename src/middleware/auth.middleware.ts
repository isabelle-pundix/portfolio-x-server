import { Request, Response, NextFunction } from "express";
import * as fs from "fs";
import * as jwt from "jsonwebtoken";
import User from "../model/user.model";
import { TokenPayload } from "../types/tokenPayload";
import { AuthTokenException } from "../exceptions/authTokenException";
import { UserInterface } from "../types/user";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = String(req.headers['authorization'] || '');
    if (authHeader.startsWith('Bearer ')) {
        try {
            const accessToken = authHeader.substring(7, authHeader.length);
            const pubKey: string | Buffer = fs.readFileSync("./server.public.key", "utf8");
            let verifyOptions: any = {
                algorithm: ["RS256"]
            };
            const tokenPayload: TokenPayload = jwt.verify(accessToken, pubKey, verifyOptions) as unknown as TokenPayload;
            const userId: string = tokenPayload._id;
            if (userId) {
                req.user = userId
                next();
            } else {
                next(new AuthTokenException())
            }
        } catch (error) {
            next(error);
        }
    } else {
        next(new AuthTokenException());
    }
    //Checks the JWT token that the user sends, before Request reaches controllers
}