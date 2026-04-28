 import 'dotenv/config';
import connectDB from './db/index.js';
import app from './app.js';
import { startCron } from './services/cronServices.js';
import { startMessageWorker } from './workers/messageWorker.js'

const PORT = process.env.PORT || 3000;

// 🔍 ENV DEBUG (only for dev)
console.log("ENV CHECK MONGODB_URL:", process.env.MONGODB_URL);
console.log("MONGO VALUE TYPE:", typeof process.env.MONGODB_URL);

// 🚀 START SERVER
connectDB()
  .then(() => {

    console.log("✅ DB connected");

    // 🔥 START CRON
    startCron();

    // 🔥 START QUEUE WORKER (VERY IMPORTANT)
    startMessageWorker();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  })
  .catch((error) => {
    console.error(`❌ MongoDB connection failed:`, error);
    process.exit(1);
  });


