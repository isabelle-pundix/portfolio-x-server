import winston, { createLogger, format, transports } from "winston";

const logger = createLogger({
    level: "info",
    transports: [
        new transports.Console(),
        //all logs
        new transports.File({
            filename: "src/logs/info.log",
            level: "info",
            format: format.combine(
                format.timestamp({ format: "MMM-DD-YYYY,HH:mm:ss" }),
                format.align(),
                format.printf((info) => `${info.timestamp}|${info.level}|${info.message}`)
            ),
        }),
        //errors only
        new transports.File({
            filename: "src/logs/error.log",
            level: "error",
            format: format.combine(
                format.timestamp({ format: "MMM-DD-YYYY,HH:mm:ss" }),
                format.align(),
                format.printf((info) => `${info.timestamp}|${info.level}|${info.message}`)
            ),
        })
    ]

})

export default logger