import { describe, it, expect, vi } from 'vitest'
import { mapMessageDTO, mapMessageForMessageList } from '../../api/messaging.mappers'
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
    const m = mapMessageForMessageList(msg, 'p1')
    expect(m.isMine).toBe(true)
  })
})
