 import { Worker } from 'bullmq';
import { redisConnection } from '../config/redis.js';
import { processWhatsAppMessage } from '../services/twilioServices.js';
import logger from '../utils/logger.js';

export const startMessageWorker = () => {

  console.log("🔥 Worker starting..."); // ✅ ADD THIS

  const worker = new Worker(
    'messageQueue',
    async job => {
      console.log("📩 Job received:", job.name, job.data); // ✅ ADD THIS

      const { to, message } = job.data;
      await processWhatsAppMessage({ to, message });
    },
    {
      connection: redisConnection
    }
  );

  worker.on('ready', () => {
    console.log("✅ Worker is ready and listening...");
  });

  worker.on('completed', job => {
    console.log("✅ Job completed:", job.id);
    logger.info("✅ Job completed", { jobId: job.id });
  });

  worker.on('failed', (job, err) => {
    console.log("❌ Job failed:", err.message);
    logger.error("❌ Job failed", {
      jobId: job?.id,
      error: err.message
    });
  });
};