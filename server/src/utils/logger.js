 import winston from 'winston';

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

// 🔥 Pretty console format (dev ke liye readable)
const consoleFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  return `${timestamp} ${level}: ${stack || message} ${
    Object.keys(meta).length ? JSON.stringify(meta) : ''
  }`;
});

const logger = winston.createLogger({
  level: 'info',

  format: combine(
    timestamp(),
    errors({ stack: true }), // 🔥 stack trace support
    json() // 🔥 structured logs (important for production tools)
  ),

  transports: [
    // ✅ Console (Railway logs)
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp(),
        consoleFormat
      )
    }),

    // 🔥 OPTIONAL (future scaling)
    // file logs (local debugging)
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),

    new winston.transports.File({
      filename: 'logs/combined.log'
    })
  ],
});

export default logger;