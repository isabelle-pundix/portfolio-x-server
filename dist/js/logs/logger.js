"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const logger = (0, winston_1.createLogger)({
    level: "info",
    transports: [
        new winston_1.transports.Console(),
        //all logs
        new winston_1.transports.File({
            filename: "src/logs/info.log",
            level: "info",
            format: winston_1.format.combine(winston_1.format.timestamp({ format: "MMM-DD-YYYY,HH:mm:ss" }), winston_1.format.align(), winston_1.format.printf((info) => `${info.timestamp}|${info.level}|${info.message}`)),
        }),
        //errors only
        new winston_1.transports.File({
            filename: "src/logs/error.log",
            level: "error",
            format: winston_1.format.combine(winston_1.format.timestamp({ format: "MMM-DD-YYYY,HH:mm:ss" }), winston_1.format.align(), winston_1.format.printf((info) => `${info.timestamp}|${info.level}|${info.message}`)),
        })
    ]
});
exports.default = logger;
