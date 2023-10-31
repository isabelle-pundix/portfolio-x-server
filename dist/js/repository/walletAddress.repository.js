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
exports.WalletAddressRepository = void 0;
const walletAddress_model_1 = __importDefault(require("../model/walletAddress.model"));
const user_model_1 = __importDefault(require("../model/user.model"));
class WalletAddressRepository {
    constructor() {
        this.WalletAddress = walletAddress_model_1.default;
        this.User = user_model_1.default;
    }
    getWalletAddresses(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const walletAddresses = yield this.WalletAddress.find({ user: userId });
                console.log("userid: ", userId);
                return walletAddresses;
            }
            catch (error) {
                throw error;
            }
        });
    }
    countWalletAddresses(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const walletAddresses = yield this.WalletAddress.find({ user: userId });
                let existingWalletAddressesCount = walletAddresses.length;
                return existingWalletAddressesCount;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addWalletAddress(userId, walletAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.User.findById(userId);
                user.walletAddresses.push(walletAddress);
                yield user.save();
                yield walletAddress.save();
                const newWalletAddress = yield this.WalletAddress.findById(walletAddress._id);
                newWalletAddress.user.notes = user.notes;
                return newWalletAddress;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateUserWalletAddress(userId, walletAddressId, walletAddressData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUserWalletAddress = yield this.User.findByIdAndUpdate({ _id: userId, "walletAddresses.id": walletAddressId }, {
                    $set: {
                        name: walletAddressData.name,
                    }
                });
                const updatedWalletAddress = yield this.WalletAddress.findByIdAndUpdate({ _id: walletAddressId }, {
                    $set: {
                        name: walletAddressData.name,
                    }
                });
                if (updatedUserWalletAddress && updatedWalletAddress) {
                    updatedWalletAddress.user.notes = updatedUserWalletAddress.notes;
                }
                return updatedWalletAddress;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteUserWalletAddress(userId, walletAddressId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedUserWalletAddress = yield this.User.findByIdAndUpdate(userId, {
                    $pull: {
                        walletAddresses: walletAddressId,
                    },
                }, { new: true });
                const deletedWalletAddress = yield this.WalletAddress.findByIdAndDelete(walletAddressId);
                return deletedWalletAddress;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.WalletAddressRepository = WalletAddressRepository;
