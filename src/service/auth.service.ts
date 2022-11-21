import { NextFunction, Request } from "express";
import { UserService } from "./user.service";
import { UserInterface } from "../types/user";
import User from "../model/user.model";
import { UserDto } from "../dto/user.dto";
import { LogInDto } from "../dto/logIn.dto";
import Token from "../types/token";
import TokenPayload from "../types/tokenPayload";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as fs from "fs";
import { UserException } from "../exceptions/userException";

export class AuthService {

    private userService: UserService
    private User: any;
    private privKey: string | Buffer = fs.readFileSync("./server.private.key", "utf8");

    constructor() {
        this.userService = new UserService();
        this.User = User;
    }

    public async matchPassword(logInData: LogInDto, user: UserInterface): Promise<boolean> {
        const passwordMatch: boolean = await bcrypt.compare(
            logInData.password,
            user.password
        );
        return passwordMatch;
    }

    public async registerNewUser(userData: UserDto): Promise<{ cookie: string, newUser: UserInterface }> {
        if (await this.User.findOne({ email: userData.email })) {
            throw new UserException().alreadyExist();
        }
        const bcryptHashedPassword: string = await bcrypt.hash(userData.password, 10);
        const user: UserDto = new User({
            name: userData.name,
            email: userData.email,
            password: bcryptHashedPassword,
            status: userData.status
        });
        const newUser: UserInterface = await this.userService.addUser(user);
        const tokenData: Token = this.createToken(newUser)
        const cookie: any = this.createCookie(tokenData);
        return { cookie, newUser };
        //(Oauth2.0??)
    }

    public createCookie(token: Token): any {
        return `Authorization=${token.token}; HttpOnly; Max-Age=${token.expiresIn}`;
    }

    public createToken(user: UserInterface): Token {
        const expiresIn: number = 60 * 60; //1hr
        let signOptions: any = {
            expiresIn: expiresIn,
            algorithm: "RS256"
        };
        let payload: TokenPayload = {
            _id: user.id
        };
        return { token: jwt.sign(payload, this.privKey, signOptions), expiresIn };
    }
}