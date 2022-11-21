import { UserInterface } from "../types/user";
import { model, plugin, Schema } from "mongoose";
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema: Schema = new Schema(
    {
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
        password: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            required: true
        },
        notes: [{
            type: Schema.Types.ObjectId,
            ref: "Note"
        }]
    },
    {
        timestamps: true,
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);
userSchema.plugin(AutoIncrement, {inc_field: "seq"});
export default model<UserInterface>("User", userSchema);