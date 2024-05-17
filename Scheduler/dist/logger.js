"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, printf, colorize } = winston_1.format;
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(timestamp(), colorize(), printf(({ timestamp, level, message }) => {
        return `${timestamp} ${level}: ${message}`;
    })),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston_1.transports.File({ filename: 'logs/combined.log' })
    ],
});
exports.default = logger;
