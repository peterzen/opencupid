import { describe, it, expect, vi } from 'vitest'
import { mapMessageDTO } from '../../api/messaging.mappers'
vi.mock('@shared/config/appconfig', () => ({ appConfig: { IMAGE_URL_BASE: 'http://img' } }))

const msg: any = {
  id: 'm1',
  conversationId: 'c1',
  senderId: 'p1',
  content: 'hi',
  createdAt: new Date(),
}

describe('messaging mappers', () => {
  it('marks message as mine', () => {
    const m = mapMessageDTO(msg, 'p1')
    expect(m.isMine).toBe(true)
  })
})
