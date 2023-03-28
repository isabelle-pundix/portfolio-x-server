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
const UserSchema = new mongoose_1.Schema({
    seq: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    walletAddress: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
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
