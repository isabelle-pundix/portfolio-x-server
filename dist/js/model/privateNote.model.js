"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const privateNoteSchema = new mongoose_1.Schema({});
exports.default = (0, mongoose_1.model)("PrivateNote", privateNoteSchema);
