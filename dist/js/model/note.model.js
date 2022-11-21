"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NoteSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        required: false
    },
    group: {
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
exports.default = (0, mongoose_1.model)("Note", NoteSchema);
