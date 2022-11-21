import { UserInterface } from "../types/user";
import { UserDto } from "../dto/user.dto";
import { LogInDto } from "../dto/logIn.dto";
import Token from "../types/token";
export declare class AuthService {
    private userService;
    private User;
    private privKey;
    constructor();
    matchPassword(logInData: LogInDto, user: UserInterface): Promise<boolean>;
    registerNewUser(userData: UserDto): Promise<{
        cookie: string;
        newUser: UserInterface;
    }>;
    createCookie(token: Token): string;
    createToken(user: UserInterface): Token;
}
