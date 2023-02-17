import { Request, Response } from "express";
import * as dotenv from "dotenv";
import axios, { AxiosInstance } from "axios";
dotenv.config();

export class CmcDataController {

    private cmcApi: AxiosInstance;

    constructor() {
        this.cmcApi = axios.create({
            method: "GET",
            baseURL: "Https://pro-api.coinmarketcap.com",
            headers: {
                "X-CMC_PRO_API_KEY": `${process.env.COINMARKETCAP_API}`,
                Accept: "Application/json",
                "Accept-Encoding": "deflate, gzip",
            }
        })
    }

    //info?id="1,2,..." or info?symbol="BTC,ETH,..." or info?address="0xc40..."
    public getMetaData = async (req: Request, res: Response): Promise<void> => {
        try {
            console.log(`/v2/cryptocurrency/info?symbol=${req.body.symbols}`)
            await this.cmcApi(`/v2/cryptocurrency/info?symbol=${req.body.symbols}`)
                .then(res => res.data)
                .then(value => res.json(value.data));
        } catch (error) {
            res.json(error);
        }
    }

    public getLatestData = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.cmcApi("/v1/cryptocurrency/listings/latest?limit=500")
                .then(res => res.data)
                .then(value => res.json(value.data));
        } catch (error) {
            res.json(error);
        }
    }
}