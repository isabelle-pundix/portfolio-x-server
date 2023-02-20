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
exports.AuthService = void 0;
const user_service_1 = require("./user.service");
const user_model_1 = __importDefault(require("../model/user.model"));
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const fs = __importStar(require("fs"));
const userException_1 = require("../exceptions/userException");
class AuthService {
    constructor() {
        this.privKey = fs.readFileSync("./server.private.key", "utf8");
        this.userService = new user_service_1.UserService();
        this.User = user_model_1.default;
    }
    matchPassword(logInData, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordMatch = yield bcrypt.compare(logInData.password, user.password);
            return passwordMatch;
        });
    }
    registerNewUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.User.findOne({ email: userData.email })) {
                throw new userException_1.UserException().alreadyExist();
            }
            if (yield this.User.findOne({ walletAddress: userData.walletAddress })) {
                throw new userException_1.UserException().walletAddressUsed();
            }
            const bcryptHashedPassword = yield bcrypt.hash(userData.password, 10);
            const user = new user_model_1.default({
                name: userData.name,
                email: userData.email,
                walletAddress: userData.walletAddress,
                password: bcryptHashedPassword,
                status: userData.status
            });
            const newUser = yield this.userService.addUser(user);
            const tokenData = this.createToken(newUser);
            const cookie = this.createCookie(tokenData);
            return { cookie, newUser };
            //(Oauth2.0??)
        });
    }
    createCookie(token) {
        return `Authorization=${token.token}; Max-Age=${token.expiresIn}`;
    }
    createToken(user) {
        const expiresIn = 60 * 60; //1hr
        let signOptions = {
            expiresIn: expiresIn,
            algorithm: "RS256"
        };
        let payload = {
            _id: user.id
        };
        return { token: jwt.sign(payload, this.privKey, signOptions), expiresIn };
    }
}
exports.AuthService = AuthService;
