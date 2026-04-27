import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'

const app = express()

// ✅ FIX: trust proxy (CRITICAL for Railway)
app.set('trust proxy', 1);

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}));

 // ⚠️ IMPORTANT: Twilio ke liye urlencoded FIRST
app.use(express.urlencoded({ extended: true, limit: '20kb' }));
app.use(express.json({ limit: '20kb' }));

app.use(express.static('public'));
app.use(cookieParser());




// Rate limiting middleware
 const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
  message: '⚠️ Bahut zyada requests bhej raha hai , Bsdk thoda ruk ja',
});

 

// whatsapp routes
import whatsappRouter from './Routes/whatsapp.routes.js';

app.use('/api' , whatsappRouter)

app.use('/api', limiter);

 

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

 

 


export default app