// src/queues/emailQueue.ts
import { Queue } from 'bullmq'
import IORedis from 'ioredis'

const redisUrl = process.env.REDIS_URL
if (!redisUrl) {
  throw new Error('REDIS_URL environment variable is not defined')
}
const connection = new IORedis(redisUrl, {
  maxRetriesPerRequest: null
})

export const emailQueue = new Queue('emails', { connection })
