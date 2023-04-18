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
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
//Initialize middlewares/functions and routes
const corsOptions = {
    origin: "https://localhost:3000",
    //origin: "http://fxportfolio.top:3000",
    methods: "GET, POST, PUT, DELETE, OPTIONS, HEAD",
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
//app.use(bodyParser.json()); //is this needed since its already included in express?
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
app.use(index_1.default);
//initialize error handling middleware
app.use(error_middleware_1.errorMiddleware);
(0, db_config_1.connectDb)(app);
https_1.default
    .createServer({
    key: fs_1.default.readFileSync("./sslcert/fxportfolio.key"),
    cert: fs_1.default.readFileSync("./sslcert/fxportfolio.crt")
}, app).listen(4000, () => {
    console.log("Https server running on port 4000");
});
