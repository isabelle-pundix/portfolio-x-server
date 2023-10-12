import { NextFunction, Request, Response } from "express";
import { UserDto } from "../dto/user.dto";
import { AuthService } from "../service/auth.service";
import User from "../model/user.model";
import WalletAddress from "../model/walletAddress.model";
import Token from "../types/token";
import { UserInterface } from "../types/user";
import { CredentialsException } from "./../exceptions/credentialsException";
import * as jwt from "jsonwebtoken";
import * as fs from "fs";
import { TokenPayload } from "../types/tokenPayload";
import logger from "../logs/logger";

const COOKIE_OPTIONS = {
    httpOnly: true,
    // Since localhost is not having https protocol, secure cookies does not work correctly (in postman)
    secure: true, //!(process.env.NODE_ENV !== "production")
    signed: true,
    maxAge: 60 * 60 * 24 * 7 * 1000,
    sameSite: "none" as "none",
};

export class AuthController {

    private authService: AuthService;
    private User: any;
    private WalletAddress: any;

    constructor() {
        this.authService = new AuthService();
        this.User = User;
        this.WalletAddress = WalletAddress;
    }

    // public registerNewUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //     try {
    //         const userData: UserDto = req.body;
    //         const { accessToken, newUser, refreshToken } = await this.authService.registerNewUser(userData);
    //         newUser.refreshToken.push({ refreshToken })
    //         await newUser.save()
    //         logger.info(`New User Registration: ${newUser.walletAddress}`);
    //         res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
    //         res.status(200).json(
    //             {
    //                 message: "New user registered",
    //                 user: newUser,
    //                 accessToken
    //             }
    //         );
    //     } catch (error) {
    //         logger.error(`User registration error`);
    //         next(error);
    //     }
    // }

    // public login = async (req: Request, res: Response, next: NextFunction) => {
    //     const logInData: LogInDto = req.body;
    //     const user: UserInterface = await this.User.find({ wallet: logInData.walletAddress }).populate('notes');
    //     if (user) {
    //         // console.log(user);
    //         const passwordMatch: boolean = await this.authService.matchPassword(logInData, user);
    //         // console.log(passwordMatch);
    //         if (passwordMatch) {
    //             const accessToken: string = this.authService.createAccessToken(user._id);
    //             const refreshToken: string = this.authService.createRefreshToken(user._id)
    //             user.refreshToken.push({ refreshToken })
    //             await user.save()
    //             logger.info(`Login: ${user.walletAddress}`);
    //             res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
    //             res.status(200).json(
    //                 {
    //                     message: "Login success",
    //                     user: user,
    //                     accessToken
    //                 }
    //             );
    //         } else {
    //             logger.info(`Password mismatch: ${user.walletAddress}`);
    //             next(new CredentialsException());
    //         }
    //     } else {
    //         logger.error(`Login error`);
    //         next(new CredentialsException());
    //     }
    // }

    public refreshToken = async (req: Request, res: Response, next: NextFunction) => {
        const { signedCookies = {} } = req;
        const { refreshToken } = signedCookies;

        if (refreshToken) {
            try {
                const pubKey: string | Buffer = fs.readFileSync("./server.public.key", "utf8")
                const verifyOptions: any = { algorithm: ["RS256"] }
                const payload: TokenPayload = jwt.verify(refreshToken, pubKey, verifyOptions) as unknown as TokenPayload
                const userId: string = payload._id;
                const user = await User.findById(userId)
                if (user) {
                    // Find the refresh token against the user record in database
                    const tokenIndex = user.refreshToken.findIndex(
                        (item) => item.refreshToken === refreshToken
                    );

                    if (tokenIndex === -1) {
                        next(new CredentialsException())
                    } else {
                        const accessToken = this.authService.createAccessToken(userId);
                        // If the refresh token exists, then create new one and replace it.
                        const newRefreshToken = this.authService.createRefreshToken(userId);
                        user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
                        await user.save();
                        res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
                        res.send({ success: true, accessToken });
                    }
                } else {
                    next(new CredentialsException())
                }
            } catch (err) {
                logger.error(`Refresh Token error`);
                next(err)
            }
        } else {
            next(new CredentialsException())
        }
    }

    public logout = async (req: Request, res: Response, next: NextFunction) => {
        const { signedCookies = {} } = req;
        const { refreshToken } = signedCookies;
        try {
            if (refreshToken) {
                const pubKey: string | Buffer = fs.readFileSync("./server.public.key", "utf8")
                const verifyOptions: any = { algorithm: ["RS256"] }
                const payload: TokenPayload = jwt.verify(refreshToken, pubKey, verifyOptions) as unknown as TokenPayload
                const userId: string = payload._id;
                const user = await User.findById(userId)

                if (user) {
                    const tokenIndex = user.refreshToken.findIndex(
                        (item) => item.refreshToken === refreshToken
                    );
                    if (tokenIndex !== -1) {
                        await User.findByIdAndUpdate(userId, { $pull: { refreshToken: { refreshToken: refreshToken } } })
                    } else {
                        next(new CredentialsException())
                    }
                    logger.info(`Logout: ${user.walletAddresses}`);
                    res.clearCookie("refreshToken", COOKIE_OPTIONS)
                    res.status(200).json({ success: true })

                } else {
                    next(new CredentialsException())
                }
            } else {
                next(new CredentialsException())
            }
        } catch (err) {
            logger.error(`Logout error`);
            next(err)
        }

    }

    public walletLogin = async (req: Request, res: Response, next: NextFunction) => {
        const { walletAddress } = req.body;

        const walletExist = await this.WalletAddress.findOne({walletAddress});
        if (walletExist != null) {
            const walletAddressData: any = await this.WalletAddress.findOne({walletAddress}).populate('user');
            const user = walletAddressData.user;

            if (user != null) {
                const accessToken: string = this.authService.createAccessToken(user._id);
                const refreshToken: string = this.authService.createRefreshToken(user._id);
                const refreshTokens = user.refreshToken; 
                refreshTokens.push({ refreshToken });
                await user.save();
                logger.info(`Wallet Login: ${user.walletAddresses}`);
                res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
                res.status(200).json(
                    {
                        message: "Login success",
                        user: user,
                        accessToken
                    }
                );
            } 
        } else {
            try {
                const { accessToken, newUser, refreshToken } = await this.authService.registerNewUserWithWallet(walletAddress);
                newUser.refreshToken.push({ refreshToken }); 
                await newUser.save();
                logger.info(`Wallet Registration - New User: ${newUser.walletAddresses}`);
                res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
                res.status(200).json(
                    {
                        message: "New user registered",
                        user: newUser,
                        accessToken
                    }
                );
            } catch (error) {
                logger.error(`Wallet Login/Registration error`);
                next(error);
            }
        }
        // const user: UserInterface = await this.WalletAddress.findOne({walletAddress}).populate('user'); 
        // console.log("What is this user? ", user);
        // console.log("USERID???: ", userId);
        // const user: UserInterface = await this.User.findOne({userId}).populate('notes');
        // console.log("User: ", user);

        // const walletAddress: UserInterface = await this.WalletAddress.findOne({ walletAddress }).id;
        // user.populate('notes');
        
    }
    
    public test = async (req: Request, res: Response, next: NextFunction) => {
        logger.info("test method");
        logger.error("test error");
        res.status(200).json({
            test: "test"
        })
    }
}