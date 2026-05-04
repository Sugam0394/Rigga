 import winston from 'winston';
import { mkdirSync, existsSync } from 'fs';
import path from 'path';

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

// 📁 Ensure logs folder exists (CRITICAL FIX)
const logDir = path.join(process.cwd(), 'logs');

if (!existsSync(logDir)) {
  mkdirSync(logDir, { recursive: true });
}

// 🔥 Pretty console format (dev ke liye readable)
const consoleFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  return `${timestamp} ${level}: ${stack || message} ${
    Object.keys(meta).length ? JSON.stringify(meta) : ''
  }`;
});

const isProd = process.env.NODE_ENV === 'production';

const logger = winston.createLogger({
  level: 'info',

  format: combine(
    timestamp(),
    errors({ stack: true }), // stack trace support
    json() // structured logs for production tools
  ),

  transports: [
    // ✅ Console (always ON)
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp(),
        consoleFormat
      )
    }),

    // 📁 File logs ONLY in production
    ...(isProd ? [
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error'
      }),
      new winston.transports.File({
        filename: 'logs/combined.log'
      })
    ] : [])
  ],
});

export default logger;