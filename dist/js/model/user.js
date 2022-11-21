"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});
//added timestamps to true add createdAt (Date) and UpdatedAt (Date) properties to schema
exports.default = (0, mongoose_1.model)("User", userSchema);
