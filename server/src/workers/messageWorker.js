 import { Worker } from 'bullmq';
import { redisConnection } from '../config/redis.js';
import { processWhatsAppMessage } from '../services/twilioServices.js';
import logger from '../utils/logger.js';

export const startMessageWorker = () => {

  const worker = new Worker(
    'messageQueue',
    async job => {
      const { to, message } = job.data;
      await processWhatsAppMessage({ to, message });
    },
    {
      connection: redisConnection // ✅ SAME CONNECTION
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