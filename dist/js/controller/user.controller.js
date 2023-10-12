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
exports.UserController = void 0;
const user_service_1 = require("../service/user.service");
const logger_1 = __importDefault(require("../logs/logger"));
class UserController {
    constructor() {
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.user;
                const user = yield this.userService.getUserById(id);
                logger_1.default.info(`App loaded with user: ${user.walletAddresses}`);
                res.status(200).json({ user });
            }
            catch (error) {
                logger_1.default.error(`Get User by id error`);
                throw error;
            }
        });
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.getUsers();
                res.status(200).json({
                    users
                });
            }
            catch (error) {
                throw error;
            }
        });
        this.addUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const newUser = yield this.userService.addUser(userData);
                const allUsers = yield this.userService.getUsers();
                res.status(201).json({
                    message: "User added",
                    user: newUser,
                    users: allUsers
                });
            }
            catch (error) {
                logger_1.default.error(`Add user error`);
                throw error;
            }
        });
        this.userService = new user_service_1.UserService();
    }
}
exports.UserController = UserController;
