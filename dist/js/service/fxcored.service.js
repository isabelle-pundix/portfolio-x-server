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
exports.FxcoredService = void 0;
const axios_1 = __importDefault(require("axios"));
const fxcoredError_1 = require("../exceptions/fxcoredError");
const cp = __importStar(require("child_process"));
class FxcoredService {
    constructor() {
        this.mainnetApi = axios_1.default.create({
            method: "GET",
            baseURL: "https://fx-rest.functionx.io"
        });
    }
    getPoolInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.mainnetApi("/cosmos/staking/v1beta1/pool")
                    .then(res => res.data);
                return result;
            }
            catch (error) {
                throw new fxcoredError_1.FxcoredError({
                    url: error.config.url,
                    method: error.config.method,
                    code: error.response.data.code,
                    message: error.response.data.message,
                    details: error.response.data.details,
                });
            }
        });
    }
    /**
     * Gets the Cosmos address of the given Ethereum address.
     * @param evmAddress An Ethereum hex address to query the equivalent Cosmos address.
     * @returns The cosmos address as a string.
     */
    getCosmosAddress(evmAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            if (evmAddress.slice(0, 2) === "fx") {
                return evmAddress;
            }
            try {
                const result = yield this.mainnetApi(`/ethermint/evm/v1/cosmos_account/${evmAddress}`)
                    .then(res => res.data);
                return result.cosmos_address;
            }
            catch (error) {
                throw new fxcoredError_1.FxcoredError({
                    url: error.config.url,
                    method: error.config.method,
                    code: error.response.data.code,
                    message: error.response.data.message,
                    details: error.response.data.details,
                });
            }
        });
    }
    /**
     * Gets the total rewards accrued by each validator of the delegator.
     * @param cosmosAddress A Cosmos address for querying.
     * @returns A DelegatorTotalRewardsRes object, showing validator(s) that the delegator delegated to,
     * and the total of all rewards.
     */
    getTotalRewards(cosmosAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.mainnetApi(`/cosmos/distribution/v1beta1/delegators/${cosmosAddress}/rewards`)
                    .then(res => res.data);
                return result;
            }
            catch (error) {
                throw new fxcoredError_1.FxcoredError({
                    url: error.config.url,
                    method: error.config.method,
                    code: error.response.data.code,
                    message: error.response.data.message,
                    details: error.response.data.details,
                });
            }
        });
    }
    /**
     * Gets all the validator(s) of the given delegator.
     * @param cosmosAddress A cosmos address for querying.
     * @returns A ValidatorsOfDelegatorRes object, showing an array of validator(s).
     */
    getValidatorsOf(cosmosAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.mainnetApi(`/cosmos/distribution/v1beta1/delegators/${cosmosAddress}/validators`)
                    .then(res => res.data);
                return result;
            }
            catch (error) {
                throw new fxcoredError_1.FxcoredError({
                    url: error.config.url,
                    method: error.config.method,
                    code: error.response.data.code,
                    message: error.response.data.message,
                    details: error.response.data.details,
                });
            }
        });
    }
    /**
     * Gets all delegations of the given delegator.
     * @param cosmosAddress A cosmos address for querying.
     * @returns A DelegatorDelegationsRes object showing all delegations of the delegator,
     * to which validator and the amount.
     */
    getDelegatorDelegations(cosmosAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.mainnetApi(`/cosmos/staking/v1beta1/delegations/${cosmosAddress}`)
                    .then(res => res.data);
                return result;
            }
            catch (error) {
                throw new fxcoredError_1.FxcoredError({
                    url: error.config.url,
                    method: error.config.method,
                    code: error.response.data.code,
                    message: error.response.data.message,
                    details: error.response.data.details,
                });
            }
        });
    }
    /**
     * Gets the full validator(s) info for a given delegator
     * @param cosmosAddress A cosmos address for querying.
     * @returns A ValidatorsInfoFullRes object.
     */
    getValidatorsInfoFullOf(cosmosAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.mainnetApi(`/cosmos/staking/v1beta1/delegators/${cosmosAddress}/validators`)
                    .then(res => res.data);
                return result;
            }
            catch (error) {
                throw new fxcoredError_1.FxcoredError({
                    url: error.config.url,
                    method: error.config.method,
                    code: error.response.data.code,
                    message: error.response.data.message,
                    details: error.response.data.details,
                });
            }
        });
    }
    /**
     * Gets the accumulated commision of the given validator.
     * @param cosmosValAddress A cosmos validator address for querying.
     * @returns A ValidatorCommissionRes object.
     */
    getValidatorCommission(valAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.mainnetApi(`/cosmos/distribution/v1beta1/validators/${valAddress}/commission`)
                    .then(res => res.data);
                return result;
            }
            catch (error) {
                throw new fxcoredError_1.FxcoredError({
                    url: error.config.url,
                    method: error.config.method,
                    code: error.response.data.code,
                    message: error.response.data.message,
                    details: error.response.data.details,
                });
            }
        });
    }
    /**
     * Gets the outstanding rewards of the given validator.
     * @param valAddress A cosmos validator address for querying.
     * @returns A ValidatorOutstandingRewardsRes object.
     */
    getValidatorOutstandingRewards(valAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.mainnetApi(`/cosmos/distribution/v1beta1/validators/${valAddress}/outstanding_rewards`)
                    .then(res => res.data);
                return result;
            }
            catch (error) {
                throw new fxcoredError_1.FxcoredError({
                    url: error.config.url,
                    method: error.config.method,
                    code: error.response.data.code,
                    message: error.response.data.message,
                    details: error.response.data.details,
                });
            }
        });
    }
    /**
     * Through a node, gets transaction by events, filtered by message.sender and message.module.
     * This method requires fxcore binaries to be installed on the system/VM (requires Go).
     * @param msgSender The message.sender cosmos address to filter for.
     * @param msgModule The message.module to filter for. Exmaple of module arg: "distribution", "staking".
     * @param limit The number of transactions per page returned (default to 100).
     * @returns A NodeTxnEventsRes object.
     */
    getNodeTxsEvents(msgSender, msgModule, limit = 1000) {
        try {
            //Execution is blocking
            const result = cp.execSync(`fxcored query txs \
                --events 'message.sender=${msgSender}&message.module=${msgModule}' \
                --node=https://fx-json.functionx.io:26657 \
                --limit ${limit} \
                -o json`, {
                cwd: process.cwd(),
                encoding: "utf-8",
            });
            return JSON.parse(result);
        }
        catch (error) {
            throw error;
        }
        //Non-blocking example (use cp.exec)
        // let test: any;
        // cp.exec("fxcored query txs --events 'message.sender=fx1w68zrjgx0aqzaew5zndr80qtlczje3k0h6w5xk' --node=https://fx-json.functionx.io:26657 -o json",
        //     (error, stdout, stderr) => {
        //         console.log(stdout)
        //         test = stdout
        //         );
        //     }
        // )
    }
    /**
     * Filters a NodeTxnEventsRes object for "withdraw_rewards" type logs, and aggregates them into an array
     * @param txnEvents The response returned from FxcoredService.getNodeTxsEvents.
     * @param val If set to true, includes filter for "withdraw_commission" type logs (for validators).
     * @returns An array of TxnLogsEvent objects
     */
    filterNodeWithdrawals(txnEvents, val) {
        if (val) {
            const res = txnEvents.txs.flatMap(tx => tx.logs.flatMap(log => log.events).filter(events => events.type === "withdraw_rewards" || events.type === "withdraw_commission"));
            return res;
        }
        else {
            const res = txnEvents.txs.flatMap(tx => tx.logs.flatMap(log => log.events).filter(events => events.type === "withdraw_rewards"));
            return res;
        }
    }
    /**
     * Through a REST endpoint, gets transaction by events, filtered by message.sender and message.module.
     * @param msgSender The message.sender cosmos address to filter for.
     * @param msgModule The message.module to filter for. Exmaple of module arg: "distribution", "staking".
     * @param limit The number of transactions per page returned (default to 100).
     * @returns A RestTxnEventsRes object.
     */
    getRestTxsEvents(msgSender, msgModule, limit = 1000) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.mainnetApi(`/cosmos/tx/v1beta1/txs?events=message.sender%3D'${msgSender}'&events=message.module%3D'${msgModule}'&pagination.limit=${limit}`)
                    .then(res => res.data);
                return result;
            }
            catch (error) {
                throw new fxcoredError_1.FxcoredError({
                    url: error.config.url,
                    method: error.config.method,
                    code: error.response.data.code,
                    message: error.response.data.message,
                    details: error.response.data.details,
                });
            }
        });
    }
    /**
     * Filters a RestTxnEventsRes object for "withdraw_rewards" type logs, and aggregates them into an array
     * @param txnEvents The response returned from FxcoredService.getRestTxsEvents
     * @param val If set to true, includes filter for "withdraw_commission" type logs (for validators).
     * @returns An array of TxnLogsEvent objects
     */
    filterRestWithdrawals(txnEvents, val) {
        if (val) {
            const res = txnEvents.tx_responses.flatMap(txresponse => txresponse.logs.flatMap(log => log.events).filter(events => events.type === "withdraw_rewards" || events.type === "withdraw_commission"));
            return res;
        }
        else {
            const res = txnEvents.tx_responses.flatMap(txresponse => txresponse.logs.flatMap(log => log.events).filter(events => events.type === "withdraw_rewards"));
            return res;
        }
    }
}
exports.FxcoredService = FxcoredService;
