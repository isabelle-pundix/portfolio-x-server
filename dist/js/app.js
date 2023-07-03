"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_config_1 = require("./config/db.config");
const index_1 = __importDefault(require("./routes/index"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_middleware_1 = require("./middleware/error.middleware");
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const compression_1 = __importDefault(require("compression"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const prefix = "/api";
const CLIENT_LOCAL_PROD = "http://localhost:3000";
const CLIENT_LOCAL_DEV = "https://localhost:3000";
const CLIENT_PROD = "https://portfolio-x.xyz";
//Initialize middlewares/functions and routes
const corsOptions = {
    origin: CLIENT_PROD,
    methods: "GET, POST, PUT, DELETE, OPTIONS, HEAD",
    credentials: true,
};
app.use((0, compression_1.default)());
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
app.use(prefix, index_1.default);
//initialize error handling middleware
app.use(error_middleware_1.errorMiddleware);
(0, db_config_1.connectDb)(app);
https_1.default
    .createServer({
    key: fs_1.default.readFileSync("./sslcert/fxportfolio.key"),
    cert: fs_1.default.readFileSync("./sslcert/fxportfolio.crt")
}, app).listen(5000, () => {
    console.log("Https server running on port 5000");
});
