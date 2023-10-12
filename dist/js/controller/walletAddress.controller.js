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
exports.WalletAddressController = void 0;
const walletAddress_service_1 = require("../service/walletAddress.service");
const logger_1 = __importDefault(require("../logs/logger"));
const walletAddress_model_1 = __importDefault(require("../model/walletAddress.model"));
class WalletAddressController {
    constructor() {
        this.walletAddressService = new walletAddress_service_1.WalletAddressService();
        this.getUserWalletAddresseses = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.toString();
                const userWalletAddresses = yield this.walletAddressService.getUserWalletAddresses(userId);
                res.status(200).json({
                    userWalletAddresses,
                });
            }
            catch (error) {
                logger_1.default.error("Wallet addresses retrieval error");
                throw error;
            }
        });
        this.addUserWalletAddress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.toString();
            const walletAddressData = req.body;
            const walletExist = yield this.WalletAddress.findOne({ walletAddress: walletAddressData.walletAddress });
            console.log("Wallet address data: ", walletAddressData);
            console.log("Wallet exist: ", walletExist);
            if (walletExist == null) {
                try {
                    const newWalletAddress = yield this.walletAddressService.addUserWalletAddress(userId, walletAddressData);
                    logger_1.default.info(`New wallet address added: ${newWalletAddress.user.walletAddresses}, ${newWalletAddress.name}: ${newWalletAddress.id}`);
                    res.status(201).json({
                        message: "Wallet address added",
                        walletAddress: newWalletAddress,
                    });
                }
                catch (error) {
                    logger_1.default.error(`Add wallet address error`);
                    throw error;
                }
            }
            else {
                logger_1.default.info(`Wallet address add failed as already exists`);
                res.status(500).json({
                    message: "Wallet address add failed as already exists"
                });
            }
        });
        // try {
        //   if (walletExist == null) {
        //     const newWalletAddress: WalletAddressInterface =
        //       await this.walletAddressService.addUserWalletAddress(
        //         userId,
        //         walletAddressData
        //       );
        //     logger.info(
        //       `New wallet address added: ${newWalletAddress.user.walletAddresses}, ${newWalletAddress.name}: ${newWalletAddress.id}`
        //     );
        //     res.status(201).json({
        //       message: "Wallet address added",
        //       walletAddress: newWalletAddress,
        //     });
        //   } else {
        //     logger.info(`Wallet address add failed as already exists`);
        //     res.status(500).json({
        //       message: "Wallet address add failed as already exists"
        //     })
        //   }
        // } catch (error) {
        //   logger.error(`Add wallet address error`);
        //   throw error;
        // }
        // };
        this.updateUserWalletAddress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.toString();
                const walletAddressId = req.params.walletAddressId;
                const walletAddressData = req.body;
                const updatedWalletName = yield this.walletAddressService.updateUserWalletAddress(userId, walletAddressId, walletAddressData);
                const userWalletAddresses = yield this.walletAddressService.getUserWalletAddresses(userId);
                logger_1.default.info(`Wallet address updated ${updatedWalletName === null || updatedWalletName === void 0 ? void 0 : updatedWalletName.user.walletAddresses} - ${updatedWalletName === null || updatedWalletName === void 0 ? void 0 : updatedWalletName.id}`);
                res.status(201).json({
                    message: "Wallet address name updated",
                    name: updatedWalletName,
                    userWalletAddresses: userWalletAddresses,
                });
            }
            catch (error) {
                logger_1.default.info(`Wallet address update error`);
                throw error;
            }
        });
        this.deleteUserWalletAddress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.toString();
                const walletAddressId = req.params.walletAddressId;
                const deletedWalletAddress = yield this.walletAddressService.deleteUserWalletAddress(userId, walletAddressId);
                const userWalletAddresses = yield this.walletAddressService.getUserWalletAddresses(userId);
                logger_1.default.info(`Wallet address deleted: ${deletedWalletAddress === null || deletedWalletAddress === void 0 ? void 0 : deletedWalletAddress.user.walletAddresses}`);
                res.status(200).json({
                    message: "Wallet address deleted",
                    walletAddress: deletedWalletAddress,
                    userWalletAddresses: userWalletAddresses,
                });
            }
            catch (error) {
                logger_1.default.info(`Wallet address delete error`);
                throw error;
            }
        });
        this.walletAddressService = new walletAddress_service_1.WalletAddressService();
        this.WalletAddress = walletAddress_model_1.default;
    }
}
exports.WalletAddressController = WalletAddressController;
