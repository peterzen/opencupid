// src/services/session.service.ts
import Redis from 'ioredis'
import { UserRole } from '@prisma/client'
import { SessionData } from '@zod/db/user.schema'

export class SessionService {
  constructor(
    private redis: Redis,
    private ttlSec = 60 * 60 * 24 * 7 // 7 days
  ) {}

  private sessionKey(id: string) {
    return `session:${id}`
  }
  private rolesKey(id: string) {
    return `session:${id}:roles`
  }

  /**
   * Fetch or create the session hash and roles set
   */
  async getOrCreate(id: string, data: SessionData): Promise<SessionData> {
    const hkey = this.sessionKey(id)
    const rkey = this.rolesKey(id)

    // Store hash fields (userId, lang) and overwrite roles set atomically
    await this.redis
      .multi()
      // Update hash
      .hset(
        hkey,
        'userId',
        data.userId,
        'profileId',
        data.profileId,
        'lang',
        data.lang,
        'isOnboarded',
        data.isOnboarded ? 'true' : 'false',
        'hasActiveProfile',
        data.hasActiveProfile ? 'true' : 'false'
      )
      // Reset TTL on hash
      .expire(hkey, this.ttlSec)
      // Overwrite roles set
      .del(rkey)
      .sadd(rkey, ...data.roles)
      // Reset TTL on set
      .expire(rkey, this.ttlSec)
      .exec()

    return data
  }

  /**
   * Get session data; returns null if none exists
   */
  async get(id: string): Promise<SessionData | null> {
    const hkey = this.sessionKey(id)
    const rkey = this.rolesKey(id)

    const [hash, roles] = await Promise.all([this.redis.hgetall(hkey), this.redis.smembers(rkey)])
    if (!hash.userId) return null

    return {
      userId: hash.userId,
      profileId: hash.profileId,
      lang: hash.lang || 'en',
      roles: roles as UserRole[],
      isOnboarded: hash.isOnboarded === 'true',
      hasActiveProfile: hash.hasActiveProfile === 'true',
    }
  }

  /**
   * Refresh TTL on session data
   */
  async refreshTtl(id: string): Promise<void> {
    const hkey = this.sessionKey(id)
    const rkey = this.rolesKey(id)
    await this.redis.multi().expire(hkey, this.ttlSec).expire(rkey, this.ttlSec).exec()
  }

  /**
   * Delete a session and its roles
   */
  async delete(id: string): Promise<void> {
    const hkey = this.sessionKey(id)
    const rkey = this.rolesKey(id)
    await this.redis.multi().del(hkey).del(rkey).exec()
  }
}
