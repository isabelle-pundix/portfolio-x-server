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
exports.WalletAddressService = void 0;
const walletAddress_repository_1 = require("../repository/walletAddress.repository");
const walletAddress_model_1 = __importDefault(require("../model/walletAddress.model"));
class WalletAddressService {
    constructor() {
        this.walletAddressRepository = new walletAddress_repository_1.WalletAddressRepository();
    }
    getUserWalletAddresses(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const walletAddresses = yield this.walletAddressRepository.getWalletAddresses(userId);
            return walletAddresses;
        });
    }
    addUserWalletAddress(userId, walletAddressData) {
        return __awaiter(this, void 0, void 0, function* () {
            let walletAddressCount = yield this.walletAddressRepository.countWalletAddresses(userId);
            let numWallets = new Number(1 + walletAddressCount.valueOf());
            const walletAddress = new walletAddress_model_1.default({
                user: userId,
                name: "Wallet " + numWallets,
                walletAddress: walletAddressData.walletAddress
            });
            const newWalletAddress = yield this.walletAddressRepository.addWalletAddress(userId, walletAddress);
            return newWalletAddress;
        });
    }
    updateUserWalletAddress(userId, walletAddressId, walletAddressData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedWalletAddress = yield this.walletAddressRepository.updateUserWalletAddress(userId, walletAddressId, walletAddressData);
            return updatedWalletAddress;
        });
    }
    deleteUserWalletAddress(userId, walletAddressId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedWalletAddress = yield this.walletAddressRepository.deleteUserWalletAddress(userId, walletAddressId);
            return deletedWalletAddress;
        });
    }
}
exports.WalletAddressService = WalletAddressService;
