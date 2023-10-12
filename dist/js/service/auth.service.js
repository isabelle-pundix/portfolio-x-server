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
const user_repository_1 = require("../repository/user.repository");
const walletAddress_repository_1 = require("../repository/walletAddress.repository");
const user_model_1 = __importDefault(require("../model/user.model"));
const jwt = __importStar(require("jsonwebtoken"));
const fs = __importStar(require("fs"));
const walletAddress_model_1 = __importDefault(require("../model/walletAddress.model"));
class AuthService {
    constructor() {
        this.privKey = fs.readFileSync("./server.private.key", "utf8");
        this.userRepository = new user_repository_1.UserRepository();
        this.walletAddressRepository = new walletAddress_repository_1.WalletAddressRepository();
        this.User = user_model_1.default;
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
    registerNewUserWithWallet(newAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_model_1.default({
                status: false
            });
            const newUser = yield this.userRepository.addUser(user);
            const userId = newUser.id;
            const accessToken = this.createAccessToken(newUser._id);
            const refreshToken = this.createRefreshToken(newUser._id);
            const walletAddress = new walletAddress_model_1.default({
                walletAddress: newAddress,
                name: "Wallet 1",
                user: newUser
            });
            const newWalletAddress = yield this.walletAddressRepository.addWalletAddress(userId, walletAddress);
            // const cookie: any = this.createCookie(tokenData);
            return { accessToken, newUser, refreshToken };
            //(Oauth2.0??)
        });
    }
    createAccessToken(userId) {
        let signOptions = {
            expiresIn: 60 * 20,
            algorithm: "RS256"
        };
        let payload = {
            _id: userId
        };
        return jwt.sign(payload, this.privKey, signOptions);
    }
    createRefreshToken(userId) {
        const expiresIn = 60 * 60 * 24 * 7; //7days
        let signOptions = {
            expiresIn: expiresIn,
            algorithm: "RS256"
        };
        let payload = {
            _id: userId
        };
        return jwt.sign(payload, this.privKey, signOptions);
    }
}
exports.AuthService = AuthService;
