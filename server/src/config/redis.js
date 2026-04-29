 import IORedis from 'ioredis';

export const redisConnection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,   // BullMQ required
  enableReadyCheck: false,      // Upstash safe
  tls: {},                      // Upstash TLS
});

// ❌ error log
redisConnection.on('error', (err) => {
  console.error('❌ Redis error:', err.message);
});