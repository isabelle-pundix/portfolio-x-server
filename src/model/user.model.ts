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

const UserSchema: Schema = new Schema(
    {
        seq: {
            type: Number
        },
        name: {
            type: String,
            // required: true
        },
        email: {
            type: String,
            // required: true
        },
        walletAddress: {
            type: String,
            required: true
        },
        password: {
            type: String,
            // required: true
        },
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