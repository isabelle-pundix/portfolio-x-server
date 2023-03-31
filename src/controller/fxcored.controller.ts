import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import axios, { AxiosInstance, responseEncoding } from "axios";
import * as cp from "child_process";
import { FxcoredService } from "../service/fxcored.service";
import { CosmosAddressRes, DelegatorTotalRewardsRes } from "../types/fxcored";

export class FxcoredController {

    private fxcoredService: FxcoredService;

    constructor() {
        this.fxcoredService = new FxcoredService();
    }

    public getPoolInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const poolInfo = await this.fxcoredService.getPoolInfo();
            res.status(200).json({
                result: poolInfo
            })
        } catch (error: any) {
            res.status(400).json({
                error: error
            });
        }
    }

    public getDelegatorTotalRewards = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const cosmosAddr = await this.fxcoredService.getCosmosAddress(
                req.query.address as string
            );
            const totalRewards = await this.fxcoredService.getTotalRewards(cosmosAddr);
            res.status(200).json({
                result: totalRewards
            })
        } catch (error: any) {
            res.status(400).json({
                error: error
            })
        }
    }

    public getValidatorsLite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const cosmosAddr = await this.fxcoredService.getCosmosAddress(
                req.query.address as string
            );
            const validatorsOf = await this.fxcoredService.getValidatorsOf(cosmosAddr);
            res.status(200).json({
                delegator: cosmosAddr,
                result: validatorsOf,
            })
        } catch (error: any) {
            res.status(400).json({
                error: error
            })
        }
    }

    public getDelegatorDelegations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const cosmosAddr = await this.fxcoredService.getCosmosAddress(
                req.query.address as string
            );
            const delegatorDelegations = await this.fxcoredService.getDelegatorDelegations(cosmosAddr);
            res.status(200).json({
                delegator: cosmosAddr,
                result: delegatorDelegations,
            })
        } catch (error: any) {
            res.status(400).json({
                error: error
            })
        }
    }

    public getValidatorsFull = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const cosmosAddr = await this.fxcoredService.getCosmosAddress(
                req.query.address as string
            );
            const validatorsInfoFull = await this.fxcoredService.getValidatorsInfoFullOf(cosmosAddr);
            res.status(200).json({
                delegator: cosmosAddr,
                result: validatorsInfoFull,
            })
        } catch (error: any) {
            res.status(400).json({
                error: error
            })
        }
    }

    public getValidatorCommission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const valCommission = await this.fxcoredService.getValidatorCommission(
                req.query.address as string
            );
            res.status(200).json({
                result: valCommission,
            })
        } catch (error: any) {
            res.status(400).json({
                error: error
            })
        }
    }

    public getValidatorOutstandingRewards = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const outstandingRewards = await this.fxcoredService.getValidatorOutstandingRewards(
                req.query.address as string
            );
            res.status(200).json({
                result: outstandingRewards,
            })
        } catch (error: any) {
            res.status(400).json({
                error: error
            })
        }
    }

    public getEventsNode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = this.fxcoredService.getNodeTxsEvents(
                await this.fxcoredService.getCosmosAddress(req.query.address as string),
                req.query.module as string
            );
            res.status(200).json({
                result
            })
        } catch (error: any) {
            res.status(400).json({
                error: error
            })
        }
    }

    public getEventsRest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await this.fxcoredService.getRestTxsEvents(
                await this.fxcoredService.getCosmosAddress(req.query.address as string),
                req.query.module as string
            );
            res.status(200).json({
                result
            })
        } catch (error: any) {
            res.status(400).json({
                error: error
            })
        }
    }

    public getWithdrawalsNode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const events = this.fxcoredService.getNodeTxsEvents(
                await this.fxcoredService.getCosmosAddress(req.query.address as string),
                req.query.module as string
            );
            const result = this.fxcoredService.filterNodeWithdrawals(
                events,
                JSON.parse(req.query.v as string)
            );
            res.status(200).json({
                result: result
            })
        } catch (error: any) {
            res.status(400).json({
                error: error
            })
        }
    }

    public getWithdrawalsRest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const events = await this.fxcoredService.getRestTxsEvents(
                await this.fxcoredService.getCosmosAddress(req.query.address as string),
                req.query.module as string
            );
            const result = this.fxcoredService.filterRestWithdrawals(
                events,
                JSON.parse(req.query.v as string)
            );
            res.status(200).json({
                result: result
            })
        } catch (error: any) {
            res.status(400).json({
                error: error
            })
        }
    }

}