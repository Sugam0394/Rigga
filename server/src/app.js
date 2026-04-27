 import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

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

// 🔥 IMPORTANT: webhook FIRST (NO limiter)
import whatsappRouter from './Routes/whatsapp.routes.js';
app.use('/api/webhook', whatsappRouter);

// 🔥 limiter AFTER
app.use('/api', limiter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;