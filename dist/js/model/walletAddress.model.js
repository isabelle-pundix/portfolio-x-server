"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const WalletAddressSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        required: true
    },
    walletAddress: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        getters: true,
        virtuals: true
    }
});
exports.default = (0, mongoose_1.model)("WalletAddress", WalletAddressSchema);
