import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createMockPrisma } from '../../test-utils/prisma'

let service: any
let mockPrisma: any

beforeEach(async () => {
  vi.resetModules()
  mockPrisma = createMockPrisma()
  vi.doMock('../../lib/prisma', () => ({ prisma: mockPrisma }))
  const module = await import('../../services/tag.service')
  ;(module.TagService as any).instance = undefined
  service = module.TagService.getInstance()
})

describe('TagService', () => {
  it('searches tags', async () => {
    mockPrisma.tag.findMany.mockResolvedValue([{ id: 'cksearchtagid1234567890', name: 'foo', slug: 'foo' }])
    const result = await service.search('foo')
    expect(mockPrisma.tag.findMany).toHaveBeenCalled()
    expect(result[0].name).toBe('foo')
  })

  it('creates a tag', async () => {
    mockPrisma.tag.create.mockResolvedValue({ id: 'ck1234567890abcd12345670', name: 'Bar', slug: 'bar' })
    const tag = await service.create({ name: 'Bar', createdBy: 'u1' })
    expect(tag.slug).toBe('bar')
    expect(mockPrisma.tag.create).toHaveBeenCalled()
  })
})
