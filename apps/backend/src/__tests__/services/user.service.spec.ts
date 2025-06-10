import { describe, it, expect, beforeEach, vi } from 'vitest'
import { UserService } from '../../services/user.service'
import { createMockPrisma } from '../../test-utils/prisma'

let mockPrisma: any = {}
vi.mock('../../lib/prisma', () => ({
  get prisma() {
    return mockPrisma
  },
}))

let service: UserService

beforeEach(() => {
  Object.assign(mockPrisma, createMockPrisma())
  service = UserService.getInstance()
})

describe('UserService.generateOTP', () => {
  it('generates a 6 digit code', () => {
    const otp = service.generateOTP()
    expect(otp).toMatch(/^\d{6}$/)
  })
})

describe('UserService roles', () => {
  it('adds a role if missing', () => {
    const user = { roles: ['user'] }
    service.addRole(user as any, 'admin' as any)
    expect(user.roles).toContain('admin')
  })

  it('removes a role if present', () => {
    const user = { roles: ['user', 'admin'] }
    service.removeRole(user as any, 'admin' as any)
    expect(user.roles).not.toContain('admin')
  })
})

describe('UserService.otpLogin', () => {
  it('returns null when user not found', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null)
    const result = await service.otpLogin('id', 'otp')
    expect(result).toEqual({ user: null, isNewUser: false })
  })

  it('updates user and returns result', async () => {
    const user = {
      id: 'u1',
      loginToken: 'otp',
      isRegistrationConfirmed: false,
      roles: [],
      profile: { id: 'p1' },
    }
    mockPrisma.user.findUnique.mockResolvedValue(user)
    mockPrisma.user.update.mockResolvedValue({
      ...user,
      isRegistrationConfirmed: true,
      loginToken: null,
      loginTokenExp: null,
    })
    const res = await service.otpLogin('u1', 'otp')
    expect(res.isNewUser).toBe(true)
    expect(mockPrisma.user.update).toHaveBeenCalled()
  })
})
