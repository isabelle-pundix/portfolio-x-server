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
    //Note that the equivalent for axios.params is express.request.query 
    public getMetaData = async (req: Request, res: Response): Promise<void> => {
        try {
            console.log(`/v2/cryptocurrency/info?symbol=${req.query.symbol}`)
            await this.cmcApi(`/v2/cryptocurrency/info?symbol=${req.query.symbol}`)
                .then(res => res.data)
                .then(value => res.json(value.data));
        } catch (error) {
            res.json(error);
        }
    }

    //to get full list, use endpoint: "/v1/cryptocurrency/listings/latest?limit=400"
    //200 currencies = 1 call credit.
    //Otherwise to save credits, use: /v1/cryptocurrency/quotes/latest?symbol=BTC,ETH,...
    public getLatestData = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.cmcApi(`/v1/cryptocurrency/quotes/latest?symbol=${req.query.symbol}`)
                .then(res => res.data)
                .then(value => res.json(value.data));
        } catch (error) {
            res.json(error);
        }
    }
}