import { NextFunction, Request, Response } from "express";
import { LogInDto } from "../dto/logIn.dto";
import { UserDto } from "../dto/user.dto";
import { AuthService } from "../service/auth.service";
import User from "../model/user.model";
import Token from "../types/token";
import { UserInterface } from "../types/user";
import { CredentialsException } from "./../exceptions/credentialsException";

export class AuthController {

    private authService: AuthService;
    private User: any;

    constructor() {
        this.authService = new AuthService();
        this.User = User;
    }

    public registerNewUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {   
            const userData: UserDto = req.body;
            const { cookie, newUser } = await this.authService.registerNewUser(userData);
            res.setHeader("Set-Cookie", [cookie]);
            res.status(200).json(
                {
                    message: "New user registered",
                    user: newUser
                }
            );
        } catch (error) {
            next(error);
        }
    }

    public logIn = async (req: Request, res: Response, next: NextFunction) => {
        const logInData: LogInDto = req.body;
        const user: UserInterface = await this.User.findOne({ email: logInData.email }).populate('notes');
        if (user) {
            console.log(user);
            const passwordMatch: boolean = await this.authService.matchPassword(logInData, user);
            console.log(passwordMatch);
            if (passwordMatch) {
                const token: Token = this.authService.createToken(user);
                const cookie: any = this.authService.createCookie(token);
                res.setHeader("Set-Cookie", [cookie]);
                res.status(200).json(
                    {
                        message: "Login success",
                        user: user
                    }
                );
            } else {
                next(new CredentialsException());
            }
        } else {
            next(new CredentialsException());
        }
    }

    public logOut = async (req: Request, res: Response) => {
        res.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
        res.status(200).json(
            {
                message: "Logged out"
            }
        );
    }

    //sessions?
}