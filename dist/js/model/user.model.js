"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const userSchema = new mongoose_1.Schema({
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
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Note"
        }]
}, {
    timestamps: true,
    toJSON: {
        getters: true,
        virtuals: true
    }
});
userSchema.plugin(AutoIncrement, { inc_field: "seq" });
exports.default = (0, mongoose_1.model)("User", userSchema);
