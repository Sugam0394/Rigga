 import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import { errorHandler } from './middlewares/errorHandler.js';
import WhatsappRouter from './Routes/whatsapp.routes.js';
import { startCron } from './services/cronServices.js';

const app = express();

startCron(); // Start the cron job

app.set('trust proxy', 1);

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


// 🔥 1. Webhook limiter (light, Twilio safe)
const webhookLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
});


// 🔥 2. Apply webhook FIRST (important)
app.use('/api', webhookLimiter, WhatsappRouter);

import taskRouter from './Routes/taskRoute.js';
app.use('/api', taskRouter);

 
// 🔥 4. Normal API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests'
});

// 🔥 4. Apply to rest APIs
app.use('/api', apiLimiter);


// ✅ Health route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});


// ✅ Error handler (last)
app.use(errorHandler);

export default app;