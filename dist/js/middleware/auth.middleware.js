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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const fs = __importStar(require("fs"));
const jwt = __importStar(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../model/user.model"));
const authTokenException_1 = require("../exceptions/authTokenException");
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const cookies = req.cookies;
        if (cookies && cookies.Authorization) {
            const pubKey = fs.readFileSync("./server.public.key", "utf8");
            try {
                let verifyOptions = {
                    algorithm: ["RS256"]
                };
                const tokenPayload = jwt.verify(cookies.Authorization, pubKey, verifyOptions);
                const _id = tokenPayload._id;
                const user = yield user_model_1.default.findById(_id);
                if (user) {
                    req.user = user;
                    next();
                }
                else {
                    next(new authTokenException_1.AuthTokenException());
                }
            }
            catch (error) {
                next(new authTokenException_1.AuthTokenException());
            }
        }
        else {
            next(new authTokenException_1.AuthTokenException());
        }
        //Checks the JWT token that the user sends, before Request reaches controllers
    });
}
exports.authMiddleware = authMiddleware;
