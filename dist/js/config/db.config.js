"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDb = exports.connectDb = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
let db;
const PORT = process.env.PORT || 4000;
const connectDb = (app) => {
    if (db) {
        return;
    }
    const connectionUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@d${process.env.MONGO_DOMAIN}/?retryWrites=true&w=majority`;
    const options = {
        dbName: `portfolio`,
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    mongoose_1.default.connect(connectionUrl, options)
        .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
        .catch((error) => console.log(error.message));
    db = mongoose_1.default.connection;
    db.once("open", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Database connection established");
    }));
    db.on("error", () => {
        console.log("Database connection failed");
    });
};
exports.connectDb = connectDb;
const disconnectDb = () => {
    if (!db) {
        return;
    }
    (0, mongoose_1.disconnect)();
    db.once("close", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Database disconnected");
    }));
};
exports.disconnectDb = disconnectDb;
