"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../service/auth.service");
const user_model_1 = __importDefault(require("../model/user.model"));
const credentialsException_1 = require("./../exceptions/credentialsException");
const jwt = __importStar(require("jsonwebtoken"));
const fs = __importStar(require("fs"));
const logger_1 = __importDefault(require("../logs/logger"));
const COOKIE_OPTIONS = {
    httpOnly: true,
    // Since localhost is not having https protocol, secure cookies does not work correctly (in postman)
    secure: true,
    signed: true,
    maxAge: 60 * 60 * 24 * 7 * 1000,
    sameSite: "none",
};
class AuthController {
    constructor() {
        this.registerNewUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const { accessToken, newUser, refreshToken } = yield this.authService.registerNewUser(userData);
                newUser.refreshToken.push({ refreshToken });
                yield newUser.save();
                logger_1.default.info(`New User Registration: ${newUser.email}`);
                res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
                res.status(200).json({
                    message: "New user registered",
                    user: newUser,
                    accessToken
                });
            }
            catch (error) {
                logger_1.default.error(`User registration error`);
                next(error);
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const logInData = req.body;
            const user = yield this.User.findOne({ email: logInData.email }).populate('notes');
            if (user) {
                // console.log(user);
                const passwordMatch = yield this.authService.matchPassword(logInData, user);
                // console.log(passwordMatch);
                if (passwordMatch) {
                    const accessToken = this.authService.createAccessToken(user._id);
                    const refreshToken = this.authService.createRefreshToken(user._id);
                    user.refreshToken.push({ refreshToken });
                    yield user.save();
                    logger_1.default.info(`Login: ${user.walletAddress}`);
                    res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
                    res.status(200).json({
                        message: "Login success",
                        user: user,
                        accessToken
                    });
                }
                else {
                    logger_1.default.info(`Password mismatch: ${user.walletAddress}`);
                    next(new credentialsException_1.CredentialsException());
                }
            }
            else {
                logger_1.default.error(`Login error`);
                next(new credentialsException_1.CredentialsException());
            }
        });
        this.refreshToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { signedCookies = {} } = req;
            const { refreshToken } = signedCookies;
            if (refreshToken) {
                try {
                    const pubKey = fs.readFileSync("./server.public.key", "utf8");
                    const verifyOptions = { algorithm: ["RS256"] };
                    const payload = jwt.verify(refreshToken, pubKey, verifyOptions);
                    const userId = payload._id;
                    const user = yield user_model_1.default.findById(userId);
                    if (user) {
                        // Find the refresh token against the user record in database
                        const tokenIndex = user.refreshToken.findIndex((item) => item.refreshToken === refreshToken);
                        if (tokenIndex === -1) {
                            next(new credentialsException_1.CredentialsException());
                        }
                        else {
                            const accessToken = this.authService.createAccessToken(userId);
                            // If the refresh token exists, then create new one and replace it.
                            const newRefreshToken = this.authService.createRefreshToken(userId);
                            user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
                            yield user.save();
                            res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
                            res.send({ success: true, accessToken });
                        }
                    }
                    else {
                        next(new credentialsException_1.CredentialsException());
                    }
                }
                catch (err) {
                    logger_1.default.error(`Refresh Token error`);
                    next(err);
                }
            }
            else {
                next(new credentialsException_1.CredentialsException());
            }
        });
        this.logout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { signedCookies = {} } = req;
            const { refreshToken } = signedCookies;
            try {
                if (refreshToken) {
                    const pubKey = fs.readFileSync("./server.public.key", "utf8");
                    const verifyOptions = { algorithm: ["RS256"] };
                    const payload = jwt.verify(refreshToken, pubKey, verifyOptions);
                    const userId = payload._id;
                    const user = yield user_model_1.default.findById(userId);
                    if (user) {
                        const tokenIndex = user.refreshToken.findIndex((item) => item.refreshToken === refreshToken);
                        if (tokenIndex !== -1) {
                            yield user_model_1.default.findByIdAndUpdate(userId, { $pull: { refreshToken: { refreshToken: refreshToken } } });
                        }
                        else {
                            next(new credentialsException_1.CredentialsException());
                        }
                        logger_1.default.info(`Logout: ${user.walletAddress}`);
                        res.clearCookie("refreshToken", COOKIE_OPTIONS);
                        res.status(200).json({ success: true });
                    }
                    else {
                        next(new credentialsException_1.CredentialsException());
                    }
                }
                else {
                    next(new credentialsException_1.CredentialsException());
                }
            }
            catch (err) {
                logger_1.default.error(`Logout error`);
                next(err);
            }
        });
        this.walletLogin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { walletAddress } = req.body;
            const user = yield this.User.findOne({ walletAddress }).populate('notes');
            if (user) {
                const accessToken = this.authService.createAccessToken(user._id);
                const refreshToken = this.authService.createRefreshToken(user._id);
                user.refreshToken.push({ refreshToken });
                yield user.save();
                logger_1.default.info(`Wallet Login: ${user.walletAddress}`);
                res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
                res.status(200).json({
                    message: "Login success",
                    user: user,
                    accessToken
                });
            }
            else {
                try {
                    const { accessToken, newUser, refreshToken } = yield this.authService.registerNewUserWithWallet(walletAddress);
                    newUser.refreshToken.push({ refreshToken });
                    yield newUser.save();
                    logger_1.default.info(`Wallet Registration - New User: ${newUser.walletAddress}`);
                    res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
                    res.status(200).json({
                        message: "New user registered",
                        user: newUser,
                        accessToken
                    });
                }
                catch (error) {
                    logger_1.default.error(`Wallet Login/Registration error`);
                    next(error);
                }
            }
        });
        this.test = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("test method");
            logger_1.default.error("test error");
            res.status(200).json({
                test: "test"
            });
        });
        this.authService = new auth_service_1.AuthService();
        this.User = user_model_1.default;
    }
}
exports.AuthController = AuthController;
