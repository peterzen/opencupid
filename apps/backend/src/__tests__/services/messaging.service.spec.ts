import { describe, it, expect, beforeEach, vi } from 'vitest'

let service: any
let mockPrisma: any

beforeEach(async () => {
  mockPrisma = {}
  vi.doMock('../../lib/prisma', () => ({ prisma: mockPrisma }))
  const module = await import('../../services/messaging.service')
  ;(module.MessageService as any).instance = undefined
  service = module.MessageService.getInstance()
})

describe('MessageService.sortProfilePair', () => {
  it('sorts profiles lexicographically', () => {
    const [a, b] = service.sortProfilePair('b', 'a')
    expect(a).toBe('a')
    expect(b).toBe('b')
  })
})

describe('MessageService.canSendMessageInConversation', () => {
  it('allows when no conversation', () => {
    expect(service.canSendMessageInConversation(null, 'p1')).toBe(true)
  })

  it('allows when accepted', () => {
    const convo: any = { status: 'ACCEPTED', profileAId: 'p1' }
    expect(service.canSendMessageInConversation(convo, 'p1')).toBe(true)
  })

  it('allows when initiated by other user', () => {
    const convo: any = { status: 'INITIATED', profileAId: 'other' }
    expect(service.canSendMessageInConversation(convo, 'p1')).toBe(true)
  })

  it('rejects when initiated by sender', () => {
    const convo: any = { status: 'INITIATED', profileAId: 'p1' }
    expect(service.canSendMessageInConversation(convo, 'p1')).toBe(false)
  })

  it('rejects when blocked', () => {
    const convo: any = { status: 'BLOCKED', profileAId: 'x' }
    expect(service.canSendMessageInConversation(convo, 'p1')).toBe(false)
  })
})

