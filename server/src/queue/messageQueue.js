 import { Queue } from 'bullmq';
import IORedis from 'ioredis';

// 🔥 REDIS CONNECTION (UPSTASH / RAILWAY SAFE)
const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null, // required for BullMQ
  enableReadyCheck: false,
});

// ❌ ERROR HANDLING (IMPORTANT)
connection.on('error', (err) => {
  console.error('❌ Redis error:', err.message);
});

// ✅ QUEUE
export const messageQueue = new Queue('messageQueue', {
  connection,
  defaultJobOptions: {
    attempts: 3, // retry 3 times
    backoff: {
      type: 'exponential',
      delay: 2000, // 2 sec
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});  