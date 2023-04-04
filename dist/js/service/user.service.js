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
exports.UserService = void 0;
const user_repository_1 = require("../repository/user.repository");
const user_model_1 = __importDefault(require("../model/user.model"));
class UserService {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.getUser(id);
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.getUsers();
        });
    }
    addUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            //const body = req.body as Pick<UserInterface, "name" | "email" | "status">;
            const user = new user_model_1.default({
                name: userData.name,
                email: userData.email,
                walletAddress: userData.walletAddress,
                password: userData.password,
                status: userData.status
            });
            const newUser = yield this.userRepository.addUser(user);
            return newUser;
        });
    }
    updateUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { params: { id }, body } = req;
            const field = body.fieldToEdit;
            const updateUser = yield this.userRepository.updateUser(id, field);
            return updateUser;
        });
    }
    deleteUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteUser = yield this.userRepository.deleteUser(req.params.id);
            return deleteUser;
        });
    }
}
exports.UserService = UserService;
