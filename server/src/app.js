 import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import { errorHandler } from './middlewares/errorHandler.js';
import WhatsappRouter from './Routes/whatsapp.routes.js';

const app = express();

app.set('trust proxy', 1);

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// ❌ limiter ONLY for normal API
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests'
});

 // ✅ SMART MIDDLEWARE (webhook exclude)
app.use('/api', (req, res, next) => {
  if (req.path === '/webhook') return next(); // ❌ skip limiter for Twilio
  limiter(req, res, next); // ✅ apply limiter for rest
});
 
 // ✅ ROUTES
app.use('/api', WhatsappRouter);

 
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});


app.use(errorHandler);

export default app;