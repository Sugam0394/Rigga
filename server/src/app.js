 import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import path from 'path'; // Missing import for static files
import { fileURLToPath } from 'url';
import { errorHandler } from './middlewares/errorHandler.js';


// Routers
import WhatsappRouter from './Routes/whatsapp.routes.js';
import taskRouter from './Routes/taskRoute.js'; // Moved up for cleaner organization
import challengeRouter from './Routes/challengeRoute.js';
import authRouter from './Routes/authRoute.js';
 import paymentRouter from './Routes/paymentRoute.js'; // Importing payment routes

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

 
 
app.set('trust proxy', 1);

// 2. Global Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
 
}));

app.use(express.json({ limit: "16kb" })); // Body limit lagana safe hai
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static(path.join(__dirname, "../public"))); // Static folder for temp files
app.use(cookieParser());

// 3. Rate Limiters Definition (Defines before applying)
const webhookLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Too many requests, slow down champ!' }
});

 
// 4. Routes

app.use('/api', apiLimiter, authRouter);
 
app.use('/api', webhookLimiter, WhatsappRouter); 

app.use('/api', apiLimiter, taskRouter); 

app.use('/api', apiLimiter, challengeRouter);

app.use('/api', apiLimiter, paymentRouter); 

// 5. Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    uptime: process.uptime(),
    message: "Rigga Engine is Purring 🔥" 
  });
});

// 6. Error Handling (MUST be last)
app.use(errorHandler);
export default app;