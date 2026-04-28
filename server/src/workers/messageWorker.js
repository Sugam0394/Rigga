 import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { processWhatsAppMessage } from '../services/twilioServices.js';
import logger from '../utils/logger.js';

// 🔥 Upstash connection
 const connection = new IORedis(process.env.REDIS_URL, {
  tls: {}, // Upstash ke liye
  maxRetriesPerRequest: null, // 🔥 FIX
});

export const startMessageWorker = () => {

  const worker = new Worker(
    'messageQueue',
    async job => {
      const { to, message } = job.data;

      await processWhatsAppMessage({ to, message });
    },
    {
      connection // ✅ FIXED
    }
  );

  worker.on('completed', job => {
    logger.info("✅ Job completed", { jobId: job.id });
  });

  worker.on('failed', (job, err) => {
    logger.error("❌ Job failed", {
      jobId: job?.id,
      error: err.message
    });
  });
};