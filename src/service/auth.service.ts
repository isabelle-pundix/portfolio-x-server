import { UserRepository } from "../repository/user.repository";
import { RefreshToken, UserInterface } from "../types/user";
import User from "../model/user.model";
import { UserDto } from "../dto/user.dto";
import { LogInDto } from "../dto/logIn.dto";
import { TokenPayload } from "../types/tokenPayload";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as fs from "fs";
import { UserException } from "../exceptions/userException";

export class AuthService {

    private userRepository: UserRepository;
    private User: any;
    private privKey: string | Buffer = fs.readFileSync("./server.private.key", "utf8");

    constructor() {
        this.userRepository = new UserRepository();
        this.User = User;
    }

    // public async matchPassword(logInData: LogInDto, user: UserInterface): Promise<boolean> {
    //     const passwordMatch: boolean = await bcrypt.compare(
    //         logInData.password,
    //         user.password
    //     );
    //     return passwordMatch;
    // }

    // public async registerNewUser(userData: UserDto): Promise<{ accessToken: string, newUser: UserInterface, refreshToken: string }> {
    //     // if (await this.User.findOne({ email: userData.email })) {
    //     //     throw new UserException().alreadyExist();
    //     // }
    //     if (await this.User.getUserByWalletAddress({ walletAddress: userData.walletAddress })) {
    //         throw new UserException().walletAddressUsed();
    //     }

    //     // const bcryptHashedPassword: string = await bcrypt.hash(userData.password, 10);
    //     const user: UserInterface = new User({
    //         name: userData.name,
    //         // email: userData.email,
    //         walletAddress: userData.walletAddress,
    //         // password: bcryptHashedPassword,
    //         status: userData.status
    //     });
    //     const newUser: UserInterface = await this.userRepository.addUser(user);
    //     const accessToken = this.createAccessToken(newUser._id)
    //     const refreshToken = this.createRefreshToken(newUser._id)
    //     // const cookie: any = this.createCookie(tokenData);
    //     return { accessToken, newUser, refreshToken };
    //     //(Oauth2.0??)
    // }

    public async registerNewUserWithWallet(walletAddress: string): Promise<{ accessToken: string, newUser: UserInterface, refreshToken: string }> {
        const user: UserInterface = new User({
            walletAddress: walletAddress,
            status: false
        });
        const newUser: UserInterface = await this.userRepository.addUser(user);
        const accessToken = this.createAccessToken(newUser._id)
        const refreshToken = this.createRefreshToken(newUser._id)
        // const cookie: any = this.createCookie(tokenData);
        return { accessToken, newUser, refreshToken };
        //(Oauth2.0??)
    }

    public createAccessToken(userId: UserInterface["_id"]): string {
        let signOptions: any = {
            expiresIn: 60 * 20, // 15 minutes
            algorithm: "RS256"
        };
        let payload: TokenPayload = {
            _id: userId
        };
        return jwt.sign(payload, this.privKey, signOptions);
    }

    public createRefreshToken(userId: UserInterface["_id"]): string {
        const expiresIn: number = 60 * 60 * 24 * 7; //7days
        let signOptions: any = {
            expiresIn: expiresIn,
            algorithm: "RS256"
        };
        let payload: TokenPayload = {
            _id: userId
        };
        return jwt.sign(payload, this.privKey, signOptions)
    }
}