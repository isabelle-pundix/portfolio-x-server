import axios, { AxiosInstance } from "axios";
import { FxcoredError } from "../exceptions/fxcoredError";
import { errorMiddleware } from "../middleware/error.middleware";
import * as cp from "child_process";
import {
    CosmosAddressRes,
    DelegatorDelegationsRes,
    DelegatorTotalRewardsRes,
    NodeTxnEventsRes,
    TxnLogsEvent,
    RestTxnEventsRes,
    ValidatorCommissionRes,
    ValidatorOutstandingRewardsRes,
    ValidatorsInfoFullRes,
    ValidatorsOfDelegatorRes,
    PoolInfo
} from "../types/fxcored";

export class FxcoredService {

    private mainnetApi: AxiosInstance;

    constructor() {
        this.mainnetApi = axios.create({
            method: "GET",
            baseURL: "https://fx-rest.functionx.io"
        });
    }

    public async getPoolInfo(): Promise<PoolInfo> {
        try {
            const result = await this.mainnetApi("/cosmos/staking/v1beta1/pool")
                .then(res => res.data) as PoolInfo;
            return result
        } catch (error: any) {
            throw new FxcoredError({
                url: error.config.url,
                method: error.config.method,
                code: error.response.data.code,
                message: error.response.data.message,
                details: error.response.data.details,
            });
        }
    }

    /**
     * Gets the Cosmos address of the given Ethereum address.
     * @param evmAddress An Ethereum hex address to query the equivalent Cosmos address.
     * @returns The cosmos address as a string.
     */
    public async getCosmosAddress(evmAddress: string): Promise<string> {
        if (evmAddress.slice(0, 2) === "fx") {
            return evmAddress
        }
        try {
            const result = await this.mainnetApi(`/ethermint/evm/v1/cosmos_account/${evmAddress}`)
                .then(res => res.data) as CosmosAddressRes;
            return result.cosmos_address
        } catch (error: any) {
            throw new FxcoredError({
                url: error.config.url,
                method: error.config.method,
                code: error.response.data.code,
                message: error.response.data.message,
                details: error.response.data.details,
            });
        }
    }

    /**
     * Gets the total rewards accrued by each validator of the delegator.
     * @param cosmosAddress A Cosmos address for querying.
     * @returns A DelegatorTotalRewardsRes object, showing validator(s) that the delegator delegated to,
     * and the total of all rewards.
     */
    public async getTotalRewards(cosmosAddress: string): Promise<DelegatorTotalRewardsRes> {
        try {
            const result = await this.mainnetApi(`/cosmos/distribution/v1beta1/delegators/${cosmosAddress}/rewards`)
                .then(res => res.data) as DelegatorTotalRewardsRes;
            return result
        } catch (error: any) {
            throw new FxcoredError({
                url: error.config.url,
                method: error.config.method,
                code: error.response.data.code,
                message: error.response.data.message,
                details: error.response.data.details,
            });
        }
    }

    /**
     * Gets all the validator(s) of the given delegator.
     * @param cosmosAddress A cosmos address for querying.
     * @returns A ValidatorsOfDelegatorRes object, showing an array of validator(s).
     */
    public async getValidatorsOf(cosmosAddress: string): Promise<ValidatorsOfDelegatorRes> {
        try {
            const result = await this.mainnetApi(`/cosmos/distribution/v1beta1/delegators/${cosmosAddress}/validators`)
                .then(res => res.data) as ValidatorsOfDelegatorRes;
            return result
        } catch (error: any) {
            throw new FxcoredError({
                url: error.config.url,
                method: error.config.method,
                code: error.response.data.code,
                message: error.response.data.message,
                details: error.response.data.details,
            });
        }
    }

    /**
     * Gets all delegations of the given delegator.
     * @param cosmosAddress A cosmos address for querying.
     * @returns A DelegatorDelegationsRes object showing all delegations of the delegator,
     * to which validator and the amount.
     */
    public async getDelegatorDelegations(cosmosAddress: string): Promise<DelegatorDelegationsRes> {
        try {
            const result = await this.mainnetApi(`/cosmos/staking/v1beta1/delegations/${cosmosAddress}`)
                .then(res => res.data) as DelegatorDelegationsRes;
            return result
        } catch (error: any) {
            throw new FxcoredError({
                url: error.config.url,
                method: error.config.method,
                code: error.response.data.code,
                message: error.response.data.message,
                details: error.response.data.details,
            });
        }
    }

    /**
     * Gets the full validator(s) info for a given delegator
     * @param cosmosAddress A cosmos address for querying.
     * @returns A ValidatorsInfoFullRes object.
     */
    public async getValidatorsInfoFullOf(cosmosAddress: string): Promise<ValidatorsInfoFullRes> {
        try {
            const result = await this.mainnetApi(`/cosmos/staking/v1beta1/delegators/${cosmosAddress}/validators`)
                .then(res => res.data) as ValidatorsInfoFullRes;
            return result
        } catch (error: any) {
            throw new FxcoredError({
                url: error.config.url,
                method: error.config.method,
                code: error.response.data.code,
                message: error.response.data.message,
                details: error.response.data.details,
            });
        }
    }


    /**
     * Gets the accumulated commision of the given validator.
     * @param cosmosValAddress A cosmos validator address for querying.
     * @returns A ValidatorCommissionRes object.
     */
    public async getValidatorCommission(valAddress: string): Promise<ValidatorCommissionRes> {
        try {
            const result = await this.mainnetApi(`/cosmos/distribution/v1beta1/validators/${valAddress}/commission`)
                .then(res => res.data) as ValidatorCommissionRes;
            return result
        } catch (error: any) {
            throw new FxcoredError({
                url: error.config.url,
                method: error.config.method,
                code: error.response.data.code,
                message: error.response.data.message,
                details: error.response.data.details,
            });
        }
    }

    /**
     * Gets the outstanding rewards of the given validator.
     * @param valAddress A cosmos validator address for querying.
     * @returns A ValidatorOutstandingRewardsRes object.
     */
    public async getValidatorOutstandingRewards(valAddress: string): Promise<ValidatorOutstandingRewardsRes> {
        try {
            const result = await this.mainnetApi(`/cosmos/distribution/v1beta1/validators/${valAddress}/outstanding_rewards`)
                .then(res => res.data) as ValidatorOutstandingRewardsRes;
            return result
        } catch (error: any) {
            throw new FxcoredError({
                url: error.config.url,
                method: error.config.method,
                code: error.response.data.code,
                message: error.response.data.message,
                details: error.response.data.details,
            });
        }
    }

    /**
     * Through a node, gets transaction by events, filtered by message.sender and message.module.
     * This method requires fxcore binaries to be installed on the system/VM (requires Go).
     * @param msgSender The message.sender cosmos address to filter for.
     * @param msgModule The message.module to filter for. Exmaple of module arg: "distribution", "staking".
     * @param limit The number of transactions per page returned (default to 100).
     * @returns A NodeTxnEventsRes object.
     */
    public getNodeTxsEvents(msgSender: string, msgModule: string, limit: number = 100): NodeTxnEventsRes {
        try {
            //Execution is blocking
            const result = cp.execSync(
                `fxcored query txs \
                --events 'message.sender=${msgSender}&message.module=${msgModule}' \
                --node=https://fx-json.functionx.io:26657 \
                --limit ${limit} \
                -o json`,
                {
                    cwd: process.cwd(),
                    encoding: "utf-8",
                }
            )
            return JSON.parse(result) as NodeTxnEventsRes
        } catch (error: any) {
            throw error
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
    public filterNodeWithdrawals(txnEvents: NodeTxnEventsRes, val: boolean): TxnLogsEvent[] {
        if (val) {
            const res = txnEvents.txs.flatMap(
                tx => tx.logs.flatMap(
                    log => log.events
                ).filter(
                    events => events.type === "withdraw_rewards" || events.type === "withdraw_commission"
                )
            );
            return res
        } else {
            const res = txnEvents.txs.flatMap(
                tx => tx.logs.flatMap(
                    log => log.events
                ).filter(
                    events => events.type === "withdraw_rewards"
                )
            );
            return res
        }
    }

    /**
     * Through a REST endpoint, gets transaction by events, filtered by message.sender and message.module.
     * @param msgSender The message.sender cosmos address to filter for.
     * @param msgModule The message.module to filter for. Exmaple of module arg: "distribution", "staking".
     * @param limit The number of transactions per page returned (default to 100).
     * @returns A RestTxnEventsRes object.
     */
    public async getRestTxsEvents(msgSender: string, msgModule: string, limit: number = 100): Promise<RestTxnEventsRes> {
        try {
            const result = await this.mainnetApi(
                `/cosmos/tx/v1beta1/txs?events=message.sender%3D'${msgSender}'&events=message.module%3D'${msgModule}'&pagination.limit=${limit}`)
                .then(res => res.data) as RestTxnEventsRes;
            return result
        } catch (error: any) {
            throw new FxcoredError({
                url: error.config.url,
                method: error.config.method,
                code: error.response.data.code,
                message: error.response.data.message,
                details: error.response.data.details,
            });
        }
    }

    /**
     * Filters a RestTxnEventsRes object for "withdraw_rewards" type logs, and aggregates them into an array
     * @param txnEvents The response returned from FxcoredService.getRestTxsEvents
     * @param val If set to true, includes filter for "withdraw_commission" type logs (for validators).
     * @returns An array of TxnLogsEvent objects
     */
    public filterRestWithdrawals(txnEvents: RestTxnEventsRes, val: boolean): TxnLogsEvent[] {
        if (val) {
            const res = txnEvents.tx_responses.flatMap(
                txresponse => txresponse.logs.flatMap(
                    log => log.events
                ).filter(
                    events => events.type === "withdraw_rewards" || events.type === "withdraw_commission"
                )
            );
            return res
        } else {
            const res = txnEvents.tx_responses.flatMap(
                txresponse => txresponse.logs.flatMap(
                    log => log.events
                ).filter(
                    events => events.type === "withdraw_rewards"
                )
            );
            return res
        }
    }
}
