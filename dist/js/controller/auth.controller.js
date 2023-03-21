"use strict";
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
class AuthController {
    constructor() {
        this.registerNewUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const { cookie, newUser } = yield this.authService.registerNewUser(userData);
                res.setHeader("Set-Cookie", [cookie]);
                res.status(200).json({
                    message: "New user registered",
                    user: newUser
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.logIn = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const logInData = req.body;
            const user = yield this.User.findOne({ email: logInData.email }).populate('notes');
            if (user) {
                console.log(user);
                const passwordMatch = yield this.authService.matchPassword(logInData, user);
                console.log(passwordMatch);
                if (passwordMatch) {
                    const token = this.authService.createToken(user);
                    const cookie = this.authService.createCookie(token);
                    res.setHeader("Set-Cookie", [cookie]);
                    res.status(200).json({
                        message: "Login success",
                        user: user
                    });
                }
                else {
                    next(new credentialsException_1.CredentialsException());
                }
            }
            else {
                next(new credentialsException_1.CredentialsException());
            }
        });
        this.logOut = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
            res.status(200).json({
                message: "Logged out"
            });
        });
        this.authService = new auth_service_1.AuthService();
        this.User = user_model_1.default;
    }
}
exports.AuthController = AuthController;
