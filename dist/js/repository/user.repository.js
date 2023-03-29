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
exports.UserRepository = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
class UserRepository {
    constructor() {
        this.User = user_model_1.default;
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.User.findById(id).populate('notes');
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allUsers = yield this.User.find({}, null, { populate: "notes" });
                return allUsers;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield user.save();
                return newUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateUser(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateUser = yield this.User.findByIdAndUpdate({ _id: id }, body);
                return updateUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteUser = yield this.User.findByIdAndDelete(id);
                return deleteUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserRepository = UserRepository;
