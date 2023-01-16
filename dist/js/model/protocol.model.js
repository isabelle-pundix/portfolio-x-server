"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProtocolSchema = new mongoose_1.Schema({
    note: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Note"
    },
    protocolName: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
    toJSON: {
        getters: true,
        virtuals: true
    }
});
exports.default = (0, mongoose_1.model)("Protocol", ProtocolSchema);
