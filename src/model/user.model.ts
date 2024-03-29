import { UserInterface } from "../types/user";
import { model, plugin, Schema } from "mongoose";
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Session = new Schema({
    refreshToken: {
        type: String,
        default: "",
    },
});

const averagePriceInfo = new Schema({
    amount: { type: String },
    averagePrice: { type: String }
})

const UserSchema: Schema = new Schema(
    {
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
            type: Schema.Types.ObjectId,
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
            type: Schema.Types.ObjectId,
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
            height: {type: Number}
        }
    },
    {
        timestamps: true,
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);

//Remove refreshToken from the response
UserSchema.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.refreshToken;
        return ret;
    },
});

UserSchema.plugin(AutoIncrement, { inc_field: "seq" });
export default model<UserInterface>("User", UserSchema);