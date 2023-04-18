
import { Express } from "express";
import mongoose, { connect, ConnectOptions, Connection, disconnect } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

let db: Connection;
const PORT: string | number = process.env.PORT || 4001;

export const connectDb = (app: Express) => {
    if (db) {
        return;
    }
    const connectionUrl: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@d${process.env.MONGO_DOMAIN}/?retryWrites=true&w=majority`;
    const options = {
        dbName: `portfolio`,
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions;

    mongoose.connect(connectionUrl, options)
        .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
        .catch((error) => console.log(error.message))
    db = mongoose.connection;

    db.once("open", async () => {
        console.log("Database connection established");
    });

    db.on("error", () => {
        console.log("Database connection failed")
    });
}

export const disconnectDb = () => {
    if (!db) {
        return;
    }

    disconnect();

    db.once("close", async () => {
        console.log("Database disconnected");
    });
}