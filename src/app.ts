import express, { Express } from "express";
import cors from "cors";
import { connectDb } from "./config/db.config";
import IndexRoutes from "./routes/index"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.middleware";

const app: Express = express();
const PORT: string | number = process.env.PORT || 4000;

//Initialize middlewares/functions and routes
app.use(cors());
app.use(express.json());
//app.use(bodyParser.json()); //is this needed since its already included in express?
app.use(cookieParser());
app.use(IndexRoutes);

//initialize error handling middleware
app.use(errorMiddleware)

connectDb(app);