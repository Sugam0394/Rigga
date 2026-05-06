 import 'dotenv/config';
import connectDB from './db/index.js';
import app from './app.js';
import { startCron } from './services/cronServices.js';
import { startMessageWorker } from './workers/messageWorker.js';
 
 

const PORT = process.env.PORT || 3000;

// 🔥 GLOBAL ERROR HANDLING
process.on("uncaughtException", (err) => {
  console.error("💥 UNCAUGHT EXCEPTION:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("💥 UNHANDLED REJECTION:", err);
  process.exit(1);
});

// 🚀 START SERVER
connectDB()
  .then(async () => {
    console.log("✅ DB connected");

    startCron();              
    startMessageWorker();     

   

  

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  });


