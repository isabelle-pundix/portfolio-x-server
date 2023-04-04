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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../service/user.service");
class UserController {
    constructor() {
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.user;
                const user = yield this.userService.getUserById(id);
                res.status(200).json({ user });
            }
            catch (error) {
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
                throw error;
            }
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updateUser = yield this.userService.updateUser(req);
                res.status(200).json({
                    message: "User updated",
                    user: updateUser
                });
            }
            catch (error) {
                console.log("Err");
                throw error;
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteUser = yield this.userService.deleteUser(req);
                const allUsers = yield this.userService.getUsers();
                res.status(200).json({
                    message: "User deleted",
                    user: deleteUser,
                    users: allUsers
                });
            }
            catch (error) {
                throw error;
            }
        });
        this.userService = new user_service_1.UserService();
    }
}
exports.UserController = UserController;
