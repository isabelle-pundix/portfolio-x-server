"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Session = new mongoose_1.Schema({
    refreshToken: {
        type: String,
        default: "",
    },
});
const averagePriceInfo = new mongoose_1.Schema({
    amount: { type: String },
    averagePrice: { type: String }
});
const UserSchema = new mongoose_1.Schema({
    seq: {
        type: Number
    },
    // name: {
    //     type: String,
    //     // required: true
    // },
    // email: {
    //     type: String,
    //     // required: true
    // },
    walletAddresses: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "WalletAddress",
            required: true
        }],
    // password: {
    //     type: String,
    //     // required: true
    // },
    status: {
        type: Boolean,
        required: true
    },
    notes: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Note"
        }],
    refreshToken: {
        type: [Session],
    },
    delegationsAveragePriceInfo: {
        new: { type: Boolean },
        delegatedValidators: {
            type: Map,
            of: averagePriceInfo
        },
        height: { type: Number }
    }
}, {
    timestamps: true,
    toJSON: {
        getters: true,
        virtuals: true
    }
});
//Remove refreshToken from the response
UserSchema.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.refreshToken;
        return ret;
    },
});
UserSchema.plugin(AutoIncrement, { inc_field: "seq" });
exports.default = (0, mongoose_1.model)("User", UserSchema);
