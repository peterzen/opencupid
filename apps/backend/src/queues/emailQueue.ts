import { appConfig } from '@shared/config/appconfig'
import { Queue } from 'bullmq'
import IORedis from 'ioredis'

const redisUrl = appConfig.REDIS_URL
if (!redisUrl) {
  throw new Error('REDIS_URL environment variable is not defined')
}
const connection = new IORedis(redisUrl, {
  maxRetriesPerRequest: null,
})

export const emailQueue = new Queue('emails', { connection })
