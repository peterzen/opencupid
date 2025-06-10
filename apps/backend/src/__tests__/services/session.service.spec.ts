import { describe, it, expect, beforeEach } from 'vitest'
import { SessionService } from '../../services/session.service'
import { MockRedis } from '../../test-utils/redis'

let redis: MockRedis
let service: SessionService

beforeEach(() => {
  redis = new MockRedis()
  service = new SessionService(redis as any)
})

describe('SessionService', () => {
  it('creates and retrieves a session', async () => {
    await service.getOrCreate('sid', { userId: 'u1', profileId: 'p1', lang: 'en', roles: ['user'], isOnboarded: false, hasActiveProfile: false })
    const session = await service.get('sid')
    expect(session?.userId).toBe('u1')
    expect(session?.roles).toContain('user')
  })

  it('deletes a session', async () => {
    await service.getOrCreate('sid', { userId: 'u1', profileId: 'p1', lang: 'en', roles: [], isOnboarded: false, hasActiveProfile: false })
    await service.delete('sid')
    const session = await service.get('sid')
    expect(session).toBeNull()
  })
})
