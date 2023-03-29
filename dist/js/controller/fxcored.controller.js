"use strict";
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
exports.FxcoredController = void 0;
const axios_1 = __importDefault(require("axios"));
const fxcored_service_1 = require("../service/fxcored.service");
class FxcoredController {
    constructor() {
        this.getDelegatorTotalRewards = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const cosmosAddr = yield this.fxcoredService.getCosmosAddress(req.query.address);
                const totalRewards = yield this.fxcoredService.getTotalRewards(cosmosAddr);
                res.status(200).json({
                    result: totalRewards
                });
            }
            catch (error) {
                res.status(400).json({
                    error: error
                });
            }
        });
        this.getValidatorsLite = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const cosmosAddr = yield this.fxcoredService.getCosmosAddress(req.query.address);
                const validatorsOf = yield this.fxcoredService.getValidatorsOf(cosmosAddr);
                res.status(200).json({
                    delegator: cosmosAddr,
                    result: validatorsOf,
                });
            }
            catch (error) {
                res.status(400).json({
                    error: error
                });
            }
        });
        this.getDelegatorDelegations = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const cosmosAddr = yield this.fxcoredService.getCosmosAddress(req.query.address);
                const delegatorDelegations = yield this.fxcoredService.getDelegatorDelegations(cosmosAddr);
                res.status(200).json({
                    delegator: cosmosAddr,
                    result: delegatorDelegations,
                });
            }
            catch (error) {
                res.status(400).json({
                    error: error
                });
            }
        });
        this.getValidatorsFull = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const cosmosAddr = yield this.fxcoredService.getCosmosAddress(req.query.address);
                const validatorsInfoFull = yield this.fxcoredService.getValidatorsInfoFullOf(cosmosAddr);
                res.status(200).json({
                    delegator: cosmosAddr,
                    result: validatorsInfoFull,
                });
            }
            catch (error) {
                res.status(400).json({
                    error: error
                });
            }
        });
        this.getValidatorCommission = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const valCommission = yield this.fxcoredService.getValidatorCommission(req.query.address);
                res.status(200).json({
                    result: valCommission,
                });
            }
            catch (error) {
                res.status(400).json({
                    error: error
                });
            }
        });
        this.getValidatorOutstandingRewards = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const outstandingRewards = yield this.fxcoredService.getValidatorOutstandingRewards(req.query.address);
                res.status(200).json({
                    result: outstandingRewards,
                });
            }
            catch (error) {
                res.status(400).json({
                    error: error
                });
            }
        });
        this.getEventsNode = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = this.fxcoredService.getNodeTxsEvents(yield this.fxcoredService.getCosmosAddress(req.query.address), req.query.module);
                res.status(200).json({
                    result
                });
            }
            catch (error) {
                res.status(400).json({
                    error: error
                });
            }
        });
        this.getEventsRest = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.fxcoredService.getRestTxsEvents(yield this.fxcoredService.getCosmosAddress(req.query.address), req.query.module);
                res.status(200).json({
                    result
                });
            }
            catch (error) {
                res.status(400).json({
                    error: error
                });
            }
        });
        this.getWithdrawalsNode = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const events = this.fxcoredService.getNodeTxsEvents(yield this.fxcoredService.getCosmosAddress(req.query.address), req.query.module);
                const result = this.fxcoredService.filterNodeWithdrawals(events, JSON.parse(req.query.v));
                res.status(200).json({
                    result: result
                });
            }
            catch (error) {
                res.status(400).json({
                    error: error
                });
            }
        });
        this.getWithdrawalsRest = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield this.fxcoredService.getRestTxsEvents(yield this.fxcoredService.getCosmosAddress(req.query.address), req.query.module);
                const result = this.fxcoredService.filterRestWithdrawals(events, JSON.parse(req.query.v));
                res.status(200).json({
                    result: result
                });
            }
            catch (error) {
                res.status(400).json({
                    error: error
                });
            }
        });
        this.fxcoredService = new fxcored_service_1.FxcoredService();
        this.mainnetApi = axios_1.default.create({
            method: "GET",
            baseURL: "https://fx-rest.functionx.io"
        });
    }
}
exports.FxcoredController = FxcoredController;
