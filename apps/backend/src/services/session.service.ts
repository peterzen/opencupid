
import Redis from 'ioredis'

export interface SessionData {
  userId: string
  isDatingActive: boolean
  lang: string
}

export class SessionService {
  constructor(private redis: Redis, private ttlSec = 60 * 60 * 24 * 7) { }

  /** 
   * Fetch or create a session. 
   * If absent, creates it based on the user’s current flag.
   */
  async getOrCreate(sessionId: string, session: SessionData): Promise<SessionData> {
    const key = `session:${sessionId}`
    const exists = await this.redis.exists(key)

    // HSET will create the key if needed; then refresh TTL below
    await this.redis.hset(
      key,
      'userId', session.userId,
      'isDatingActive', String(session.isDatingActive),
      'lang', session.lang
    )
    await this.redis.expire(key, this.ttlSec)

    return session
  }

  async get(sessionId: string) {
    const data = await this.redis.hgetall(`session:${sessionId}`)
    if (!data.userId) return null
    return {
      userId: data.userId,
      isDatingActive: data.isDatingActive === 'true',
      lang: data.lang
    }
  }

  // Call to refresh TTL on each access 
  async refreshTtl(sessionId: string) {
    await this.redis.expire(`session:${sessionId}`, this.ttlSec)
  }
}
