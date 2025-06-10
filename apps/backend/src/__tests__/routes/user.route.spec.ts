import { describe, it, expect, beforeEach, vi } from 'vitest'
import userRoutes from '../../api/routes/user.route'
import { MockFastify, MockReply } from '../../test-utils/fastify'

let fastify: MockFastify
let reply: MockReply
let mockUserService: any
let mockProfileService: any

vi.mock('../../services/user.service', () => ({
  UserService: { getInstance: () => mockUserService }
}))
vi.mock('../../services/profile.service', () => ({
  ProfileService: { getInstance: () => mockProfileService }
}))
vi.mock('../../services/captcha.service', () => ({
  CaptchaService: class { validate() { return true } }
}))
vi.mock('../../queues/emailQueue', () => ({ emailQueue: { add: vi.fn() } }))
vi.mock('@shared/config/appconfig', () => ({ appConfig: { ALTCHA_HMAC_KEY: 'x', SMS_API_KEY: 'k', IMAGE_MAX_SIZE: 1000, FRONTEND_URL: 'http://test' } }))

beforeEach(async () => {
  fastify = new MockFastify()
  reply = new MockReply()
  mockUserService = {
    otpLogin: vi.fn(),
    setUserOTP: vi.fn(),
    generateOTP: vi.fn().mockReturnValue('123456'),
    getUserById: vi.fn()
  }
  mockProfileService = { initializeProfiles: vi.fn() }
  await userRoutes(fastify as any)
})

describe('GET /otp-login', () => {
  it('returns invalid token when user not found', async () => {
    const handler = fastify.routes['GET /otp-login']
    mockUserService.otpLogin.mockResolvedValue({ user: null, isNewUser: false })
    await handler({ query: { userId: 'x', otp: '1' } } as any, reply as any)
    expect(reply.payload.success).toBe(false)
  })
})
