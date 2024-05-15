import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    colorize(),
    printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  ],
});

export default logger;