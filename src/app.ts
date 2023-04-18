import express, { Express } from "express";
import cors from "cors";
import { connectDb } from "./config/db.config";
import IndexRoutes from "./routes/index"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.middleware";
import https from "https";
import fs from "fs";

const app: Express = express();
const PORT: string | number = process.env.PORT || 4000;

//Initialize middlewares/functions and routes
const corsOptions = {
    //origin: "https://localhost:3000",
    origin: "http://fxportfolio.top:3000",
    methods: "GET, POST, PUT, DELETE, OPTIONS, HEAD",
    credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json());
//app.use(bodyParser.json()); //is this needed since its already included in express?
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(IndexRoutes);

//initialize error handling middleware
app.use(errorMiddleware)

connectDb(app);

https
    .createServer(
        {
            key: fs.readFileSync("./sslcert/fxportfolio.key"),
            cert: fs.readFileSync("./sslcert/fxportfolio.crt")
        },
        app
    ).listen(4000, () => {
        console.log("Https server running on port 4000")
    });