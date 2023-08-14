import express, { Express } from "express";
import cors from "cors";
import { connectDb } from "./config/db.config";
import IndexRoutes from "./routes/index"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.middleware";
import https from "https";
import fs from "fs";
import compression from "compression";
import router from "./routes/index";

const app: Express = express();
const PORT: string | number = process.env.PORT || 5000;

const prefix = "/api";

const CLIENT_LOCAL_PROD: string = "http://localhost:3000";
const CLIENT_LOCAL_DEV: string = "https://localhost:3000";
const CLIENT_PROD: string = "https://portfolio-x.xyz";

//Initialize middlewares/functions and routes
const corsOptions = {
    origin: CLIENT_LOCAL_DEV,
    methods: "GET, POST, PUT, DELETE, OPTIONS, HEAD",
    credentials: true,
}
app.use(compression());
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(prefix, IndexRoutes);

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
    ).listen(5000, () => {
        console.log("Https server running on port 5000")
    });
