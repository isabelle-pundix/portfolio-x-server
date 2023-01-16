import { Request, Response, NextFunction } from "express";
import * as fs from "fs";
import * as jwt from "jsonwebtoken";
import User from "../model/user.model";
import TokenPayload from "../types/tokenPayload";
import { AuthTokenException } from "../exceptions/authTokenException";
import { UserInterface } from "../types/user";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log(req.cookies);
    const cookies: any = req.cookies;
    if (cookies && cookies.Authorization) {
        const pubKey: string | Buffer = fs.readFileSync("./server.public.key", "utf8");
        try {
            let verifyOptions: any = {
                algorithm: ["RS256"]
            };
            const tokenPayload: TokenPayload = jwt.verify(cookies.Authorization, pubKey, verifyOptions) as unknown as TokenPayload;
            const _id: string = tokenPayload._id;
            const user: UserInterface | null = await User.findById(_id);
            if (user) {
                req.user = user;
                next();
            } else {
                next(new AuthTokenException())
            }
        } catch (error) {
            next(new AuthTokenException());
        }
    } else {
        next(new AuthTokenException());
    }
    //Checks the JWT token that the user sends, before Request reaches controllers
}