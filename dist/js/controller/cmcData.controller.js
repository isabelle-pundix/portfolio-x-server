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
exports.CmcDataController = void 0;
const dotenv = __importStar(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv.config();
class CmcDataController {
    constructor() {
        //info?id="1,2,..." or info?symbol="BTC,ETH,..." or info?address="0xc40..."
        //Note that the equivalent for axios.params is express.request.query 
        this.getMetaData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`/v2/cryptocurrency/info?symbol=${req.query.symbol}`);
                yield this.cmcApi(`/v2/cryptocurrency/info?symbol=${req.query.symbol}`)
                    .then(res => res.data)
                    .then(value => res.json(value.data));
            }
            catch (error) {
                res.json(error);
            }
        });
        this.getLatestData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.cmcApi("/v1/cryptocurrency/listings/latest?limit=500")
                    .then(res => res.data)
                    .then(value => res.json(value.data));
            }
            catch (error) {
                res.json(error);
            }
        });
        this.cmcApi = axios_1.default.create({
            method: "GET",
            baseURL: "Https://pro-api.coinmarketcap.com",
            headers: {
                "X-CMC_PRO_API_KEY": `${process.env.COINMARKETCAP_API}`,
                Accept: "Application/json",
                "Accept-Encoding": "deflate, gzip",
            }
        });
    }
}
exports.CmcDataController = CmcDataController;
